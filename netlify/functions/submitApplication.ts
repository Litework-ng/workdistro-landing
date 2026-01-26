import { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const handler: Handler = async (event) => {
  try {
    if (!event.body) {
      return { statusCode: 400, body: "Missing request body" }
    }

    const data = JSON.parse(event.body)

    const { error } = await supabase
      .from("applications")
      .insert({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email ?? null,
        city: data.city,
        status: "pending",
        payload: data,
      })

    if (error) {
      console.error("Application insert error:", error)
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
    console.error("submitApplication error:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    }
  }
}
