import nodemailer from "nodemailer";

export const handler = async (event: any) => {
  try {
    const { email, name } = JSON.parse(event.body || "{}");

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing email" }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
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
                  Hey${name ? ` ${name}` : ""}! 👋<br /><br />
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
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }), // non-critical
    };
  }
};
