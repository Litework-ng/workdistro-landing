import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    console.log("Incoming data:", data)

    const { error } = await supabase.from("service_requests").insert({
      service: data.service,
      status: "pending",

      // ✅ worker gets saved here
      worker_id: data.workerId ?? null,

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
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
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
👷 Worker ID: ${data.workerId ?? "Auto-assigned"}

📅 Date: ${data.schedule?.date ?? "N/A"}
⏰ Time: ${data.schedule?.time ?? "N/A"}
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
      } catch (err) {
        console.warn("⚠️ Telegram failed:", err)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("🔥 Function crashed:", err)
    return NextResponse.json(
      { error: "Function crashed" },
      { status: 500 }
    )
  }
}