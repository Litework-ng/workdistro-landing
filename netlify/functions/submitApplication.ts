import { Handler } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function decodeBase64DataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:(image\/[^;]+);base64,(.*)$/)
  if (!match) return null
  return {
    contentType: match[1],
    base64: match[2],
  }
}

async function uploadAvatar(dataUrl: string, fullName?: string) {
  const decoded = decodeBase64DataUrl(dataUrl)
  if (!decoded) return null

  const ext = decoded.contentType.split("/")[1] ?? "png"
  const filename = `avatar-${Date.now()}-${(fullName ?? "worker").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.${ext}`

  const buffer = Buffer.from(decoded.base64, "base64")

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filename, buffer, {
      contentType: decoded.contentType,
      upsert: false,
    })

  if (uploadError) {
    // If object exists, still continue with public URL from same path
    if (uploadError.status !== 409) {
      throw uploadError
    }
  }

  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filename)

  return urlData.publicUrl
}

export const handler: Handler = async (event) => {
  try {
    if (!event.body) {
      return { statusCode: 400, body: "Missing request body" }
    }

    const data = JSON.parse(event.body)
    let avatarUrl: string | null = null

    if (data.avatarUrl) {
      try {
        avatarUrl = await uploadAvatar(data.avatarUrl, data.fullName)
      } catch (err) {
        console.error("Avatar upload failed:", err)
      }
    }

    const insertData: any = {
      full_name: data.fullName,
      phone: data.phone,
      email: data.email ?? null,
      city: data.city,
      status: "pending",
      payload: data,
    }

    if (avatarUrl) {
      insertData.avatar_url = avatarUrl
      insertData.payload = {
        ...data,
        avatarUrl,
      }
    }

    const { error } = await supabase
      .from("applications")
      .insert(insertData)

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
