"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type BookingInfo = {
  customerName: string;
  service: string;
  workerName: string;
} | null;

type SubmitState = "idle" | "loading" | "success" | "error";

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  const labels: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Great",
    5: "Excellent",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110 active:scale-95"
            aria-label={`Rate ${star} stars`}
          >
            <svg
              className="w-10 h-10 transition-colors duration-100"
              fill={(hovered || value) >= star ? "#FEEF3E" : "none"}
              stroke={(hovered || value) >= star ? "#FEEF3E" : "#475569"}
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        ))}
      </div>
      {(hovered || value) > 0 && (
        <p className="text-sm font-semibold text-[#FEEF3E] tracking-wide">
          {labels[hovered || value]}
        </p>
      )}
    </div>
  );
}

export default function ReviewPage(){
 const searchParams = useSearchParams();

  const workerId = searchParams.get("workerId");
  const jobId = searchParams.get("jobId");

  const [booking, setBooking] = useState<BookingInfo>(null);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // ── Fetch booking info to validate and auto-fill ──────────
  useEffect(() => {
    if (!jobId || !workerId) {
      setBookingError("Invalid review link. Please use the link sent to you.");
      setBookingLoading(false);
      return;
    }

    const load = async () => {
      try {
        const res = await fetch(
          `/api/bookingInfo?jobId=${encodeURIComponent(jobId)}&workerId=${encodeURIComponent(workerId)}`
        );
        const data = await res.json();

        if (!res.ok) {
          setBookingError(data.error ?? "Could not load booking details.");
        } else {
          setBooking(data);
        }
      } catch {
        setBookingError("Something went wrong loading this review link.");
      } finally {
        setBookingLoading(false);
      }
    };

    load();
  }, [jobId, workerId]);

  // ── Submit ────────────────────────────────────────────────
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (rating === 0) {
    setErrorMessage("Please select a star rating.");
    return;
  }

  setSubmitState("loading");
  setErrorMessage("");

  try {
    const res = await fetch("/api/submitReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId,
        workerId,
        rating,
        body: comment,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMessage(data.error || "Failed to submit review");
      setSubmitState("error");
    } else {
      setSubmitState("success");
      
    }
  } catch {
    setErrorMessage("Network error. Please try again.");
    setSubmitState("error");
  }
};

  // ── Loading state ─────────────────────────────────────────
  if (bookingLoading) {
    return (
      <main className="min-h-screen bg-[#080C14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          <p className="text-slate-400 text-sm">Verifying your booking…</p>
        </div>
      </main>
    );
  }

  // ── Invalid / error state ─────────────────────────────────
  if (bookingError) {
    return (
      <main className="min-h-screen bg-[#080C14] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">Invalid Review Link</h1>
          <p className="text-slate-400 text-sm">{bookingError}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            ← Back to Workdistro
          </Link>
        </div>
      </main>
    );
  }

  // ── Success state ─────────────────────────────────────────
  if (submitState === "success") {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
          .font-display { font-family: 'Syne', sans-serif; }
          .font-body { font-family: 'DM Sans', sans-serif; }
          @keyframes popIn {
            0% { transform: scale(0.8); opacity: 0; }
            70% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pop { animation: popIn 0.5s ease forwards; }
        `}</style>
        <main className="font-body min-h-screen bg-[#080C14] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-5">
            <div className="animate-pop w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="font-display text-3xl font-bold text-white">
              Thank you{booking?.customerName ? `, ${booking.customerName.split(" ")[0]}` : ""}!
            </h1>
            <p className="text-slate-400">
              Your review for{" "}
              <span className="text-white font-medium">{booking?.workerName ?? "this worker"}</span>{" "}
              has been saved and will appear on their profile.
            </p>
            <div className="flex justify-center gap-1 pt-2">
              {Array.from({ length: rating }).map((_, i) => (
                <svg key={i} className="w-6 h-6" fill="#FEEF3E" viewBox="0 0 24 24">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
            <Link
              href={`/worker/${workerId}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 transition-colors"
            >
              View worker profile
            </Link>
          </div>
        </main>
      </>
    );
  }

  // ── Main form ─────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }

        .grain::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.5s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }

        textarea:focus, textarea:focus-visible {
          outline: none;
          border-color: rgba(52, 211, 153, 0.4);
          box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.08);
        }
      `}</style>

      <main className="grain font-body min-h-screen bg-[#080C14] text-slate-100 relative">

        {/* Atmosphere */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#FEEF3E]/3 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto px-4 py-12 md:py-16">

          {/* Back */}
          <div className="animate-fadeUp mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-400 transition-colors group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7" />
              </svg>
              Workdistro
            </Link>
          </div>

          {/* Header */}
          <div className="animate-fadeUp delay-1 mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-2">
              Job Completed
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
              How did it go,{" "}
              <span className="text-emerald-400">
                {booking?.customerName?.split(" ")[0] ?? "there"}?
              </span>
            </h1>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Your honest feedback helps{" "}
              <span className="text-white font-medium">{booking?.workerName ?? "this worker"}</span>{" "}
              build their reputation on Workdistro.
            </p>
          </div>

          {/* Booking context pill */}
          {booking?.service && (
            <div className="animate-fadeUp delay-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs text-slate-400 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {booking.service} · completed job
            </div>
          )}

          {/* Form card */}
          <form onSubmit={handleSubmit} className="animate-fadeUp delay-2 space-y-6">

            {/* Star rating */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
                Your rating
              </p>
              <StarPicker value={rating} onChange={setRating} />
            </div>

            {/* Comment */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
              <label className="block">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                  Tell others about your experience{" "}
                  <span className="normal-case text-slate-600">(optional)</span>
                </p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder={`What did ${booking?.workerName?.split(" ")[0] ?? "they"} do well? Was the job completed as expected?`}
                  className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 resize-none transition-all"
                />
                <p className="text-xs text-slate-600 mt-2 text-right">
                  {comment.length}/500
                </p>
              </label>
            </div>

            {/* Reviewer context — auto filled, read only */}
            <div className="animate-fadeUp delay-3 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/6">
              <div className="w-8 h-8 rounded-full bg-emerald-900/50 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-emerald-400">
                  {(booking?.customerName ?? "Y")[0].toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Submitting as</p>
                <p className="text-sm font-medium text-white truncate">
                  {booking?.customerName ?? "Verified Customer"}
                </p>
              </div>
              <div className="ml-auto shrink-0">
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <p className="text-sm text-red-400 text-center">{errorMessage}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitState === "loading" || rating === 0}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 text-slate-950 font-display font-bold text-sm hover:bg-emerald-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitState === "loading" ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Review
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-xs text-slate-600 text-center">
              Reviews are public and help build trust on Workdistro
            </p>
          </form>

        </div>
      </main>
    </>
  );
}