import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    const jobId = payload?.record?.id
    if (!jobId) {
      return NextResponse.json({ error: "Missing job id" }, { status: 400 })
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
      .from("service_requests")
      .select("id, service, customer_name, worker_id")
      .eq("id", jobId)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    const reviewUrl = `${process.env.BASE_URL}/review?jobId=${data.id}&workerId=${data.worker_id}`

    const message = `
✅ *Job Completed Successfully*

Hi ${data.customer_name || "there"} 👋

Your *${data.service}* request has been completed.

⭐ *Leave a quick review:*
${reviewUrl}

Thank you for choosing us 💙
`.trim()

    const res = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    )

    const result = await res.json()
    console.log("Telegram:", result)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}