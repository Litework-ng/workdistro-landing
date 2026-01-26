import { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

export const handler: Handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing body" }),
      }
    }

    const data = JSON.parse(event.body)

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

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
      console.error("Supabase insert error:", error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Database insert failed" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    }
  } catch (err) {
    console.error("Function crash:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Function crashed" }),
    }
  }
}
