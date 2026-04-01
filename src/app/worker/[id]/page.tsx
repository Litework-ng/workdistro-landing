import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ImageModal from "@/app/components/ImageModal";

type WorkerData = {
  id: string;
  display_name?: string;
  title?: string;
  avatar_url?: string;
  city?: string;
  bio?: string;
  services?: string;
  skills?: string;
  completed_jobs?: number;
  rating?: number;
  rating_count?: number;
  experience_description?: string;
};

type Review = {
  id: number;
  rating?: number;
  title?: string;
  body?: string;
  created_at?: string;
};

async function getWorkerProfile(workerId: string) {

  
  // ── 1. Get worker ────────────────────────────────────────
  const { data: workerData, error: workerError } = await supabase
    .from("workers")
    .select("*")
    .eq("id", workerId)
    .single();

  if (workerError || !workerData) return null;

  // ── 2. Get latest reviews ────────────────────────────────
  const { data: reviewsData, error: reviewError } = await supabase
    .from("reviews")
    .select("*")
    .eq("worker_id", workerId)
    .eq("visible", true)
    .order("created_at", { ascending: false })
    .limit(5);

  const reviews = reviewError || !reviewsData ? [] : reviewsData;

  // ── 3. Get completed jobs count ─────────────────────────
const { count, error: jobsError } = await supabase
  .from("service_requests")
  .select("id", { count: "exact", head: true })
  .eq("worker_id", workerId)
  .eq("status", "completed");

const completedJobs = count ?? 0;

  // ── 4. Get ratings aggregation ──────────────────────────
  const { data: ratingData, error: ratingError } = await supabase
    .from("reviews")
    .select("rating")
    .eq("worker_id", workerId)
    .eq("visible", true);

  const reviewCount = ratingError ? 0 : ratingData?.length ?? 0;

  const avgRating =
    reviewCount > 0
      ? ratingData!.reduce((sum, r) => sum + Number(r.rating), 0) / reviewCount
      : 0;

      console.log("workerId:", workerId);
console.log("jobs count:", count);
console.log("jobs error:", jobsError);
    return {
      worker: workerData as WorkerData,
      reviews,
      stats: {
        completedJobs: completedJobs ?? 0,
        avgRating,
        reviewCount,
      },
    };

}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? "text-[#FEEF3E]" : "text-slate-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ServiceTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      {label}
    </span>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

export default async function WorkerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: workerId } = await params;
  const profile = await getWorkerProfile(workerId);

  if (!profile) notFound();

  const { worker, reviews, stats } = profile;

  const avgRating = stats.avgRating;
  const reviewCount = stats.reviewCount;
  const completedJobs = stats.completedJobs;

  const splitCsv = (value?: string | string[]) => {
    if (Array.isArray(value)) return value.filter(Boolean).map((s) => s.toString().trim());
    if (typeof value === "string") return value.split(",").map((s) => s.trim()).filter(Boolean);
    return [];
  };

  const serviceList = splitCsv(worker.services);
  const bio = worker.bio ?? worker.experience_description ?? "Reliable and detail-oriented service provider committed to delivering quality work on every task.";
  const initials = (worker.display_name ?? "W")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

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

        .glow-emerald {
          box-shadow: 0 0 60px -10px rgba(52, 211, 153, 0.15);
        }

        .review-card:hover {
          border-color: rgba(52, 211, 153, 0.3);
          background: rgba(52, 211, 153, 0.03);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.6s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .delay-4 { animation-delay: 0.4s; opacity: 0; }
      `}</style>

      <main className="grain font-body min-h-screen bg-[#080C14] text-slate-100 relative">

        {/* Background atmosphere */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#FEEF3E]/3 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 md:py-16">

          {/* Back nav */}
          <div className="animate-fadeUp mb-10">
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

          {/* ── Profile Hero ─────────────────────────────────── */}
          <div className="animate-fadeUp delay-1 glow-emerald rounded-3xl border border-white/8 bg-white/[0.03] p-8 md:p-10 mb-6">

            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="shrink-0 relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/10 bg-slate-800">
                  {worker.avatar_url ? (
                    <ImageModal
                      src={worker.avatar_url}
                      alt={worker.display_name ?? "Worker"}
                    />
                  ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-900/60 to-slate-800">
                      <span className="font-display text-2xl font-bold text-emerald-400">{initials}</span>
                    </div>
                  )}
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#080C14]" />
              </div>

              {/* Name + meta */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-1">
                  Verified Worker
                </p>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight truncate">
                  {worker.display_name ?? `Worker ${workerId}`}
                </h1>
                <p className="mt-1 text-slate-400 text-sm">
                  {worker.title ?? "On-Demand Service Professional"}
                </p>
                {worker.city && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {worker.city}
                  </div>
                )}
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-8 pt-8 border-t border-white/6 grid grid-cols-3 gap-6">
              <StatCard
                label="Jobs Done"
                value={completedJobs > 0 ? `${completedJobs}+` : "—"}
              />
              <StatCard
                label="Rating"
                value={avgRating > 0 ? avgRating.toFixed(1) : "—"}
                sub={reviewCount > 0 ? `${reviewCount} review${reviewCount !== 1 ? "s" : ""}` : "No reviews yet"}
              />
              <StatCard
                label="Status"
                value="Active"
              />
            </div>

            {/* Rating stars */}
            {avgRating > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <StarRating rating={avgRating} />
                <span className="text-xs text-slate-500">{avgRating.toFixed(1)} out of 5</span>
              </div>
            )}
          </div>

          {/* ── About ─────────────────────────────────────────── */}
          <div className="animate-fadeUp delay-2 rounded-2xl border border-white/6 bg-white/[0.02] p-6 mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">About</p>
            <p className="text-slate-300 text-sm leading-relaxed">{bio}</p>
          </div>

          {/* ── Services ──────────────────────────────────────── */}
          {serviceList.length > 0 && (
            <div className="animate-fadeUp delay-2 rounded-2xl border border-white/6 bg-white/[0.02] p-6 mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Services Offered</p>
              <div className="flex flex-wrap gap-2">
                {serviceList.map((service) => (
                  <ServiceTag key={service} label={service} />
                ))}
              </div>
            </div>
          )}

          {/* ── Reviews ───────────────────────────────────────── */}
          <div className="animate-fadeUp delay-3 rounded-2xl border border-white/6 bg-white/[0.02] p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Client Reviews
              </p>
              {reviewCount > 0 && (
                <span className="text-xs text-emerald-400 font-medium">
                  {reviewCount} total
                </span>
              )}
            </div>

            {reviews.length > 0 ? (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="review-card rounded-xl border border-white/6 bg-white/[0.02] p-4 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-900/50 border border-emerald-500/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-emerald-400">
                            {(review.title ?? "C")[0].toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-white">
                          {review.title ?? "Client"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <StarRating rating={review.rating ?? 0} />
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed pl-9">
                      {review.body ?? "Great service."}
                    </p>
                    {review.created_at && (
                      <p className="text-xs text-slate-600 mt-2 pl-9">
                        {new Date(review.created_at).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-white/6 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </div>
                <p className="text-sm text-slate-500">New on Workdistro</p>
                <p className="text-xs text-slate-600 mt-1">Book this worker and be the first to review</p>
              </div>
            )}
          </div>

          {/* ── CTA ───────────────────────────────────────────── */}
          <div className="animate-fadeUp delay-4 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/booking?workerId=${encodeURIComponent(workerId)}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-display font-semibold text-sm hover:bg-emerald-400 transition-colors"
            >
              Book {worker.display_name?.split(" ")[0] ?? "this worker"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/booking"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-slate-300 font-medium text-sm hover:border-white/20 hover:text-white transition-colors"
            >
              Browse other workers
            </Link>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-slate-600 mt-8">
            All workers on Workdistro are vetted and verified ·{" "}
            <Link href="/" className="text-slate-500 hover:text-emerald-400 transition-colors">
              Learn more
            </Link>
          </p>

        </div>
      </main>
    </>
  );
}