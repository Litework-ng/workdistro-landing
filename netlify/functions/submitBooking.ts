import { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" }
    }

    const payload = JSON.parse(event.body || "{}")

    const { error } = await supabase
      .from("service_request")
      .insert({
        service: payload.service,
        status: "pending",

        customer_name: payload.contact?.name ?? null,
        customer_phone: payload.contact?.phone ?? null,
        customer_address: payload.contact?.address ?? null,

        scheduled_date: payload.schedule?.date ?? null,
        scheduled_time: payload.schedule?.time ?? null,

        estimated_price: payload.estimatedPrice ?? null,

        // 👇 full raw booking snapshot
        payload,
      })

    if (error) {
      console.error("Supabase insert error:", error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    }
  } catch (err) {
    console.error("submitBooking failed:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}
