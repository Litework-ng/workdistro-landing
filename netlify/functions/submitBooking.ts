import { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

export const handler: Handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing request body" }),
      }
    }

    const data = JSON.parse(event.body)

    // --- Supabase (server-side, service role) ---
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // --- Insert booking ---
    const { error } = await supabase.from("service_requests").insert({
      service: data.service,
      status: "pending",

      customer_name: data.contact?.name ?? null,
      customer_phone: data.contact?.phone ?? null,
      customer_address: data.contact?.address ?? null,

      scheduled_date: data.schedule?.date ?? null,
      scheduled_time: data.schedule?.time ?? null,

      estimated_price: data.estimatedPrice ?? null,
      payload: data,
    })

    if (error) {
      console.error("❌ Supabase insert error:", error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Database insert failed" }),
      }
    }

    // --- Telegram notification ---
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (botToken && chatId) {
      const message = `
🔔 *New Booking*

🛎 Service: *${data.service}*
👤 Name: ${data.contact?.name ?? "N/A"}
📞 Phone: ${data.contact?.phone ?? "N/A"}
📅 Date: ${data.schedule?.date ?? "N/A"}
⏰ Time: ${data.schedule?.time ?? "N/A"}

Open Supabase to view full details.
      `.trim()

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
          }),
        })
      } catch (notifyError) {
        // IMPORTANT: booking should NOT fail because notification failed
        console.warn("⚠️ Telegram notification failed:", notifyError)
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    }
  } catch (err) {
    console.error("🔥 Function crashed:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Function crashed" }),
    }
  }
}