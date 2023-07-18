import { connectDB } from "@/lib/db";
import Prompt from "@/models/Prompt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectDB();
    const { userId }: { userId: string } = await req.json();
    await validatePost(userId!, id);

    const prompt = await Prompt.findByIdAndRemove(id);
    if (!prompt) {
      return NextResponse.json({ error: "prompt not found" }, { status: 404 });
    }
    return NextResponse.json(prompt, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: "something went wrong fetching prompts for a user",
    });
  }
}

interface Payload {
  prompt: string;
  tags: string[];
  userId?: string;
}

async function updatePrompt(id: string, data: Payload) {
  if (!data) {
    return NextResponse.json({ error: "invalid data" }, { status: 404 });
  }
  const promptToUpdate = await Prompt.findByIdAndUpdate(
    id,
    { $set: { ...data } },
    { new: true }
  );
  return promptToUpdate;
}

async function validatePost(userId: string, postId: string) {
  const prompt = await Prompt.findById(postId);
  if (!prompt) {
    return NextResponse.json({ error: "prompt not found" }, { status: 404 });
  }
  if (prompt.creator.toString() !== userId) {
    return NextResponse.json(
      { error: "you are not authorized to update this prompt" },
      { status: 401 }
    );
  }
  return true;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectDB();
    const { prompt, tags, userId }: Payload = await req.json();

    await validatePost(userId!, id);

    const promptToUpdate = await updatePrompt(id, { prompt, tags });
    return NextResponse.json(promptToUpdate, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: "something went wrong fetching prompts for a user",
    });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectDB();

    const prompt = await Prompt.findById(id);
    return NextResponse.json(prompt, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: "something went wrong fetching prompts for a user",
    });
  }
}
