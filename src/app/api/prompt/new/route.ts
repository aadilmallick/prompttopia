import { Payload } from "@/app/create-prompt/CreatePromptForm";
import { connectDB } from "@/lib/db";
import Prompt from "@/models/Prompt";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, prompt, tags }: Payload = await req.json();
  console.log(email, prompt, tags);
  if (!email || !prompt || !tags) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await connectDB();
    const creator = await User.findOne({ email });
    console.log(creator);
    if (!creator) {
      throw new Error("User not found");
    }
    const p = await Prompt.create({ creator: creator.id, prompt, tags });
    console.log(p);
    return NextResponse.json({ prompt: p }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}

// You are a professional web developer. I'm going to give you a snippet of code, and you can give me some advice on how to make it cleaner, more readable, and more efficient. Is that understood?
