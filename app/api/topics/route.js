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
  const topics = await Topic.find().sort({ createdAt: -1 });

  return NextResponse.json(topics);
}
