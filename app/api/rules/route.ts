import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { AutomationRule } from "@/app/models/AutomationRule";

export async function POST(req: Request) {
  try {
    await connectDB();

    // Frontend sends replyToDm (lowercase m), model stores replyToDM
    const { mediaId, keyword, replyToComment, replyToDm } = await req.json();

    if (!mediaId || !keyword || !replyToComment || !replyToDm) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const rule = await AutomationRule.create({
      mediaId,
      keyword,
      replyToComment,
      replyToDM: replyToDm,
    });

    return NextResponse.json({ success: true, rule });
  } catch (err) {
    console.error("[POST /api/rules]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const rules = await AutomationRule.find({ isActive: true });
    return NextResponse.json({ rules });
  } catch (err) {
    console.error("[GET /api/rules]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}