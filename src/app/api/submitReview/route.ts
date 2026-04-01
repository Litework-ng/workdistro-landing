import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { jobId, workerId, rating, title = "", body: comment = "" } = body

    if (!jobId || !workerId || !rating) {
      return NextResponse.json(
        { error: "jobId, workerId and rating are required" },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Check booking
    const { data: booking, error: bookingError } = await supabase
      .from("service_requests")
      .select("id, worker_id, customer_name, status")
      .eq("id", jobId)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    if (booking.worker_id !== workerId) {
      return NextResponse.json(
        { error: "This booking does not belong to this worker" },
        { status: 403 }
      )
    }

    if (booking.status !== "completed") {
      return NextResponse.json(
        { error: "This booking has not been completed yet" },
        { status: 400 }
      )
    }

    // Prevent duplicate
    const { data: existing } = await supabase
      .from("reviews")
      .select("id")
      .eq("job_id", jobId)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "A review already exists" },
        { status: 409 }
      )
    }

    // Insert review
    const { error: insertError } = await supabase.from("reviews").insert({
      job_id: jobId,
      worker_id: workerId,
      rating,
      title: title || `Review by ${booking.customer_name}`,
      body: comment,
      visible: true,
    })

    if (insertError) {
      console.error(insertError)
      return NextResponse.json(
        { error: "Failed to save review" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}