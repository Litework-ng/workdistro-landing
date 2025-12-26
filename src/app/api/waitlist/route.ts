import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

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

    // ✅ SEND EMAIL DIRECTLY (no extra API call)
    transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: body.email,
      subject: "You’re in! Let’s Do More, Stress Less 🚀",
      html: `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#0f172a; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table width="100%" style="max-width:600px; background-color:#020617; border-radius:16px; padding:32px; color:#e5e7eb;">

            <tr>
              <td align="center" style="padding-bottom:24px;">
                <img src="https://workdistroapp.com/images/logo.png" width="140" alt="Workdistro" />
              </td>
            </tr>

            <tr>
              <td>
                <h1 style="color:#fff;">You’re in! Let’s Do More, Stress Less 💪</h1>
                <p style="color:#d1d5db;">
                  Hey${body.name ? ` ${body.name}` : ""}! 👋<br /><br />
                  You’ve officially joined the <strong>Workdistro</strong> squad.
                </p>

                <ul style="color:#d1d5db;">
                  <li>🎉 Discount on your first task</li>
                  <li>👥 Access to our members-only community</li>
                </ul>

                <a
                  href="https://chat.whatsapp.com/Hk5JXPsptxn1n4JX7Z9sIM"
                  style="display:inline-block; margin-top:20px; padding:14px 28px; background:#141941; color:#fff; text-decoration:none; border-radius:12px; font-weight:600;"
                >
                  Join the Community
                </a>

                <p style="margin-top:24px; color:#9ca3af;">
                  Do more. Stress less.<br />
                  <strong>The Workdistro Team</strong>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
        `,
    }).catch(err => {
      console.error("Email error:", err);
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
