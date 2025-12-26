import { NextResponse } from "next/server";




export async function POST(req: Request) {
  const body = await req.json();

  await fetch("/.netlify/functions/send-waitlist-email", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return NextResponse.json({ success: true });
}

