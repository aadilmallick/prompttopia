import { connectDB } from "@/lib/db";
import Prompt from "@/models/Prompt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectDB();
    const prompts = await Prompt.find({ creator: id }).populate("creator");
    return NextResponse.json(prompts);
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: "something went wrong fetching prompts for a user",
    });
  }
}
