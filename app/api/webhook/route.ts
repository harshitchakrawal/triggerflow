import { NextResponse } from "next/server";

// GET request (for testing)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // your custom verify token (you decide this)
  const VERIFY_TOKEN = "triggerflow123";

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Verification failed", { status: 403 });
}

// POST request (for receiving data)
export async function POST(req: Request) {
  const body = await req.json();
  
  console.log("Webhook received:", body);

  return NextResponse.json({ success: true });
}