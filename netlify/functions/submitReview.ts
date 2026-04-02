import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body: { jobId?: string; workerId?: string; rating?: number; title?: string; body?: string };

  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { jobId, workerId, rating, title = "", body: comment = "" } = body;

  // ── 1. Basic input validation ────────────────────────────
  if (!jobId || !workerId || !rating) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "jobId, workerId and rating are required" }),
    };
  }

  if (rating < 1 || rating > 5) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Rating must be between 1 and 5" }),
    };
  }

  // ── 2. Check the booking exists, belongs to this worker, and is completed ──
  const { data: booking, error: bookingError } = await supabase
    .from("service_requests")
    .select("id, worker_id, customer_name, status")
    .eq("id", jobId)
    .single();

  if (bookingError || !booking) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Booking not found" }),
    };
  }

  if (booking.worker_id !== workerId) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "This booking does not belong to this worker" }),
    };
  }

  if (booking.status !== "completed") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "This booking has not been completed yet" }),
    };
  }

  // ── 3. Prevent duplicate reviews ────────────────────────
  const { data: existing } = await supabase
    .from("reviews")
    .select("id")
    .eq("job_id", jobId)
    .single();

  if (existing) {
    return {
      statusCode: 409,
      body: JSON.stringify({ error: "A review for this booking already exists" }),
    };
  }

  // ── 4. Write the review ──────────────────────────────────
  const { error: insertError } = await supabase.from("reviews").insert({
    job_id: jobId,
    worker_id: workerId,
    customer_id: null,           // will add proper auth later
    rating,
    title: title || `Review by ${booking.customer_name}`,
    body: comment,
    visible: true,
  });

  if (insertError) {
    console.error("Insert error:", insertError);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save review" }),
    };
  }

  // ── 5. Recalculate worker rating ──────────────────────────
const { data: allReviews, error: reviewsError } = await supabase
  .from("reviews")
  .select("rating")
  .eq("worker_id", workerId);

if (!reviewsError && allReviews && allReviews.length > 0) {
  const avg =
    allReviews.reduce((sum, r) => sum + r.rating, 0) /
    allReviews.length;

  const { error: updateError } = await supabase
    .from("workers")
    .update({
      rating: avg,
      rating_count: allReviews.length,
    })
    .eq("id", workerId);

  if (updateError) {
    console.error("Worker update error:", updateError);
  }
}

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      reviewerName: booking.customer_name,
    }),
  };
};