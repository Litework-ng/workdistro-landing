import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
    
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");
  const workerId = searchParams.get("workerId");

  
  
  if (!jobId || !workerId) {
    return NextResponse.json(
      { error: "Missing jobId or workerId" },
      { status: 400 }
    );
  }

  // Fetch the booking
  const { data: booking, error } = await supabase
  
    .from("service_requests")
    .select("id, worker_id, customer_name, service, status")
    .eq("id", jobId)
    .single();

        console.log("jobId:", jobId);
    console.log("workerId:", workerId);
    console.log("booking:", booking);
    console.log("error:", error);

  if (error || !booking) {
    console.log("❌ Booking not found", { error, jobId });
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  }

  if (booking.worker_id !== workerId) {
    
    return NextResponse.json(
      { error: "This booking does not belong to this worker" },
      { status: 403 }
    );
  }

  if (booking.status !== "completed") {
    return NextResponse.json(
      { error: "This job hasn't been completed yet" },
      { status: 400 }
    );
  }

  // Check if already reviewed
  const { data: existing } = await supabase
    .from("reviews")
    .select("id")
    .eq("job_id", jobId)
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "You've already left a review for this job" },
      { status: 409 }
    );
  }

  // Fetch worker display name
  const { data: worker } = await supabase
    .from("workers")
    .select("display_name")
    .eq("id", workerId)
    .single();
    

  return NextResponse.json({
    customerName: booking.customer_name,
    service: booking.service,
    workerName: worker?.display_name ?? "your worker",
  });
  
}