import { NextResponse } from "next/server";

// GET request (for testing)
export async function GET() {
  return NextResponse.json({ message: "Webhook working" });
}

// POST request (for receiving data)
export async function POST(req: Request) {
  const body = await req.json();
  
  console.log("Webhook received:", body);

  return NextResponse.json({ success: true });
}