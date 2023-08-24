import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Prompt from "@/models/Prompt";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const prompts = await Prompt.find().populate("creator");
    // console.log(prompts);
    return NextResponse.json({ prompts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
