import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { error } = await supabase.from("waitlist").insert({
      name: body.name,
      email: body.email,
      phone_number: body.phone_number,
      interest: body.interest,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { success: false, message: "This email is already on the waitlist." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    // 🔥 Trigger email (fire-and-forget)
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-waitlist-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: body.email,
        name: body.name,
      }),
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
