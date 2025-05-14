import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

const VALID_SORT_FIELDS = ["title", "description", "dueDate", "createdAt"];
const VALID_SORT_ORDERS = ["asc", "desc"];

export async function POST(request) {
  try {
    const { title, description, dueDate } = await request.json();

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Title is required and must be a string.' }, { status: 400 });
    }

    if (!description || typeof description !== 'string') {
      return NextResponse.json({ error: 'Description is required and must be a string.' }, { status: 400 });
    }

    if (!dueDate || isNaN(Date.parse(dueDate))) {
      return NextResponse.json({ error: 'Due date is required and must be a valid date.' }, { status: 400 });
    }

    await connectMongoDB();
    await Topic.create({ title, description, dueDate });

    return NextResponse.json({ message: 'Topic Created' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/topics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('pageSize')) || 5;

    if (!VALID_SORT_FIELDS.includes(sortBy)) {
      return NextResponse.json(
        { error: `Invalid sortBy field: must be one of ${VALID_SORT_FIELDS.join(", ")}` },
        { status: 400 }
      );
    }
    if (!VALID_SORT_ORDERS.includes(sortOrder)) {
      return NextResponse.json(
        { error: `Invalid sortOrder: must be "asc" or "desc"` },
        { status: 400 }
      );
    }

    const filter = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
    };

    if (!isNaN(Date.parse(search))) {
      const searchDate = new Date(search);
      const nextDate = new Date(searchDate);
      nextDate.setDate(searchDate.getDate() + 1);

      filter.$or.push({
        dueDate: {
          $gte: searchDate,
          $lt: nextDate,
        },
      });
    }

    const totalItemsInDb = await Topic.countDocuments();
    const totalItems = await Topic.countDocuments(filter);
    if (isNaN(pageSize) || pageSize < 1) {
      return NextResponse.json({ error: `Invalid page size (1-${totalItems})` }, { status: 400 });
    }

    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;


    if (totalPages > 0 && (isNaN(page) || page < 1 || page > totalPages)) {
      return NextResponse.json({ error: `Invalid page number (1-${totalPages})` }, { status: 400 });
    }


    const topics = await Topic.find(filter)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(pageSize);

    return NextResponse.json({
      topics,
      totalItemsInDb,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize,
      },
    });
  } catch (error) {
    console.error('GET /api/topics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

