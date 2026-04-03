import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { AutomationRule } from "@/app/models/AutomationRule";
import { error } from "console";


export async function POST(req: Request) {
  await connectDB();
    const { mediaId, reelUrl, keyword, replyToComment, replyToDM } = await req.json();

  if (!mediaId || !keyword || !replyToComment || !replyToDM) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const rule = await AutomationRule.create({ mediaId, reelUrl, keyword, replyToComment, replyToDM });
  return NextResponse.json({ success: true, rule });
}

export async function GET() {
  await connectDB();
  const rules = await AutomationRule.find({ isActive: true });
  return NextResponse.json({ rules });
}