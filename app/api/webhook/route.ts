import { NextResponse } from "next/server";
import axios from "axios";

const VERIFY_TOKEN = "triggerflow123";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN!;

// Your automation rules — later move this to a database
const RULES: Record<string, { keyword: string; message: string }> = {
  // "instagram_media_id": { keyword: "link", message: "Here's your link: ..." }
  "YOUR_REEL_MEDIA_ID": {
    keyword: "link",
    message: "Hey! Here's the resource you asked for: https://yourlink.com",
  },
};

// Track who already got a DM — replace with DB later
const dmSentLog = new Set<string>();

// GET — webhook verification
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
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

  // Always respond 200 immediately — Meta will retry if you don't
  if (body.object !== "instagram") {
    return new Response("EVENT_RECEIVED", { status: 200 });
  }

  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "comments") continue;

      const comment = change.value;
      const mediaId: string = comment.media?.id;
      const commentText: string = comment.text?.toLowerCase().trim();
      const commenterId: string = comment.from?.id;

      if (!mediaId || !commentText || !commenterId) continue;

      const rule = RULES[mediaId];
      if (!rule) continue;

      // Check if comment contains the trigger keyword
      if (!commentText.includes(rule.keyword.toLowerCase())) continue;

      // Deduplicate — don't DM same person twice for same reel
      const dedupKey = `${commenterId}:${mediaId}`;
      if (dmSentLog.has(dedupKey)) {
        console.log("⏭️ Already DMed this user for this reel, skipping");
        continue;
      }

      // Send the DM
      const success = await sendDM(commenterId, rule.message);
      if (success) {
        dmSentLog.add(dedupKey);
        console.log(`✅ DM sent to ${commenterId} for reel ${mediaId}`);
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 });
}

async function sendDM(userId: string, message: string): Promise<boolean> {
  try {
    await axios.post(
      "https://graph.facebook.com/v19.0/me/messages",
      {
        recipient: { id: userId },
        message: { text: message },
      },
      {
        params: { access_token: PAGE_ACCESS_TOKEN },
      }
    );
    return true;
  } catch (err: any) {
    console.error("❌ DM failed:", err.response?.data ?? err.message);
    return false;
  }
}