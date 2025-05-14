import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export async function PUT(request, { params }) {
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid topic ID" }, { status: 400 });
  }

  try {
    const { title, description, dueDate } = await request.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Title is required and must be a string." }, { status: 400 });
    }

    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Description is required and must be a string." }, { status: 400 });
    }

    if (!dueDate || isNaN(Date.parse(dueDate))) {
      return NextResponse.json({ error: "Due date is required and must be a valid date." }, { status: 400 });
    }

    await connectMongoDB();
    const updated = await Topic.findByIdAndUpdate(id, { title, description, dueDate });

    if (!updated) {
      return NextResponse.json({ error: "Topic not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid topic ID" }, { status: 400 });
  }

  try {
    await connectMongoDB();
    const topic = await Topic.findById(id);

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid topic ID" }, { status: 400 });
  }

  try {
    await connectMongoDB();
    const deleted = await Topic.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
