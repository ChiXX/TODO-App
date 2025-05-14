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
  const paginate = searchParams.get("paginate") !== "false"; // Default to true
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  let topics;
  let total;

  if (paginate) {
    total = await Topic.countDocuments();
    topics = await Topic.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  } else {
    topics = await Topic.find().sort({ createdAt: -1 });
    total = topics.length;
  }

  return NextResponse.json({
    topics,
    currentPage: paginate ? page : 1,
    totalPages: paginate ? Math.ceil(total / limit) : 1,
  });
}


export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
