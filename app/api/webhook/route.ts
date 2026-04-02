import axios from "axios";
import { connectDB } from "@/app/lib/mongodb";
import { AutomationRule } from "@/app/models/AutomationRule";
import { ProcessedComment } from "@/app/models/ProcessedComment";

const VERIFY_TOKEN = "triggerflow123";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN!;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN!;

// GET - webhook verification
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

// POST - receive and process webhook events
export async function POST(req: Request) {
  const body = await req.json();
  console.log("Webhook received:", JSON.stringify(body, null, 2));

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

      console.log("Comment detected:", { mediaId, commentText, commenterId });

      if (!mediaId || !commentText || !commenterId || !commentId) continue;

      // Step 1 - find active rule for this reel in MongoDB
      const rule = await AutomationRule.findOne({ mediaId, isActive: true });
      if (!rule) {
        console.log("No active rule found for media:", mediaId);
        continue;
      }

      // Step 2 - check if comment contains the trigger keyword
      if (!commentText.includes(rule.keyword.toLowerCase())) {
        console.log("Keyword not matched. Expected:", rule.keyword);
        continue;
      }

      // Step 3 - deduplication check using ProcessedComment
      const dedupKey = `${commenterId}:${mediaId}`;
      const already = await ProcessedComment.findOne({ dedupKey });
      if (already) {
        console.log("Already replied to this user on this reel, skipping");
        continue;
      }

      // Step 4 - send public comment reply (always works)
      const commentSuccess = await replyToComment(commentId, rule.message);

      // Step 5 - attempt Instagram DM (works once Meta approves you)
      const dmSuccess = await sendInstagramDM(commenterId, rule.message);

      // Step 6 - save to ProcessedComment if either succeeded
      if (commentSuccess || dmSuccess) {
        await ProcessedComment.create({ dedupKey, ruleId: rule._id });
        console.log(`   Comment reply: ${commentSuccess ? "OK" : "FAILED"}`);
        console.log(`   Instagram DM:  ${dmSuccess ? "OK" : "FAILED (needs approval)"}`);
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 });
}

// Comment reply - works immediately, no approval needed
async function replyToComment(
  commentId: string,
  message: string
): Promise<boolean> {
  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/${commentId}/replies`,
      { message },
      { params: { access_token: PAGE_ACCESS_TOKEN } }
    );
    console.log("Comment reply sent");
    return true;
  } catch (err: any) {
    console.error("Comment reply failed:", err.response?.data ?? err.message);
    return false;
  }
}

// Instagram DM - requires Meta approval, fails silently until then
async function sendInstagramDM(
  userId: string,
  message: string
): Promise<boolean> {
  try {
    await axios.post(
      "https://graph.instagram.com/v21.0/me/messages",
      {
        recipient: { id: userId },
        message: { text: message },
        messaging_type: "RESPONSE",
      },
      { params: { access_token: INSTAGRAM_ACCESS_TOKEN } }
    );
    console.log("Instagram DM sent");
    return true;
  } catch (err: any) {
    console.error("Instagram DM failed:", err.response?.data ?? err.message);
    return false;
  }
}