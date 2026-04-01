import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing server Supabase env vars", { supabaseUrl, serviceRoleKey: !!serviceRoleKey })
}

console.log("submitApplication API env", { supabaseUrl, hasServiceRole: !!serviceRoleKey })

const serverSupabase = createClient(
  supabaseUrl ?? "",
  serviceRoleKey ?? ""
)

function decodeBase64DataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:(image\/[^^;]+);base64,(.*)$/)
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

  const { error: uploadError } = await serverSupabase.storage
    .from("avatars")
    .upload(filename, buffer, {
      contentType: decoded.contentType,
      upsert: false,
    })

  if (uploadError) {
    throw uploadError
  }

  const { data: urlData } = serverSupabase.storage
    .from("avatars")
    .getPublicUrl(filename)

  return urlData.publicUrl
}

export async function POST(request: Request) {
  try {
    let data: Record<string, unknown>
    try {
      data = (await request.json()) as Record<string, unknown>
    } catch {
      const text = await request.text()
      console.warn("submitApplication received non-JSON body; trying fallback:", text)
      // Accept simple query-like payload from legacy clients (e.g. {fullName:Test})
      const fix = text
        .replace(/\s+/g, "")
        .replace(/\{(.*?)\}/, (m, g) =>
          "{" + g.replace(/([A-Za-z0-9_]+):/g, '"$1":').replace(/:([^,}]+)/g, ':"$1"') + "}"
        )
      data = JSON.parse(fix)
    }
    let avatarUrl: string | null = null

    const avatarSource = typeof data.avatarUrl === "string" ? data.avatarUrl : null
    const fullName = typeof data.fullName === "string" ? data.fullName : undefined
    if (avatarSource) {
      try {
        avatarUrl = await uploadAvatar(avatarSource, fullName)
      } catch (err) {
        console.error("Avatar upload failed:", err)
      }
    }

    const insertData: Record<string, unknown> = {
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

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("submitApplication missing server env vars")
      return NextResponse.json({ error: "Server not configured" }, { status: 500 })
    }

    const { error } = await serverSupabase.from("applications").insert(insertData)
    if (error) {
      console.error("Application insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("submitApplication API error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
