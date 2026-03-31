import { NextResponse } from "next/server";
import axios from "axios";
import { connectDB } from "@/lib/mongodb";
import { AutomationRule } from "@/models/AutomationRule";
import { ProcessedComment } from "@/models/ProcessedComment";

const VERIFY_TOKEN = "triggerflow123";
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN!;

// GET — webhook verification (unchanged)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode      = searchParams.get("hub.mode");
  const token     = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge ?? "", { status: 200 });
  }
  return new Response("Verification failed", { status: 403 });
}

// POST — receive and process webhook events
export async function POST(req: Request) {
  const body = await req.json();
  console.log("🔥 Webhook received:", JSON.stringify(body, null, 2));

  if (body.object !== "instagram") {
    return new Response("EVENT_RECEIVED", { status: 200 });
  }

  await connectDB();

  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "comments") continue;

      const comment     = change.value;
      const mediaId     = comment.media?.id;
      const commentText = comment.text?.toLowerCase().trim();
      const commenterId = comment.from?.id;
      const commentId   = comment.id;

      if (!mediaId || !commentText || !commenterId) continue;

      // Find matching rule from MongoDB
      const rule = await AutomationRule.findOne({
        mediaId,
        isActive: true,
        keyword: { $regex: new RegExp(commentText, "i") }
      });

      if (!rule) {
        console.log("⏭️ No matching rule for this reel/keyword");
        continue;
      }

      // Check duplicate
      const dedupKey = `${commenterId}:${mediaId}`;
      const already = await ProcessedComment.findOne({ dedupKey });
      if (already) {
        console.log("⏭️ Already DMed this user, skipping");
        continue;
      }

      // Send DM
      const success = await sendDM(commenterId, rule.message);
      if (success) {
        await ProcessedComment.create({ dedupKey, ruleId: rule._id });
        console.log(`✅ DM sent to ${commenterId}`);
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 });
}

async function sendDM(userId: string, message: string): Promise<boolean> {
  try {
    await axios.post(
      "https://graph.instagram.com/v21.0/me/messages",
      {
        recipient: { id: userId },
        message: { text: message },
        messaging_type: "RESPONSE",
      },
      {
        params: { access_token: INSTAGRAM_ACCESS_TOKEN },
      }
    );
    return true;
  } catch (err: any) {
    console.error("❌ DM failed:", err.response?.data ?? err.message);
    return false;
  }
}