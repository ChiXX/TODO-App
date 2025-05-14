import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description, dueDate } = await request.json();  
  await connectMongoDB();
  await Topic.create({ title, description, dueDate });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}


export async function GET(request) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') === 'desc' ? -1 : 1;
  const page = parseInt(searchParams.get('page')) || 1;
  const pageSize = parseInt(searchParams.get('pageSize')) || 5;
  

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

  const totalItems = await Topic.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / pageSize);
  const skip = (page - 1) * pageSize;
  
  const topics = await Topic.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(pageSize);

  return NextResponse.json({
    topics,
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      pageSize,
    },
  });
}

