"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Alert from "@/app/Alert";


type WaitlistResult = { success: true } | { success: false; message: string };

/* ----------------------------- Hero Slides ------------------------------ */
const slides = [
  {
    id: "clients",
    badge: "For Clients",
    title: "Get Work Done Faster",
    text: "Workdistro connects you with vetted professionals you can trust. Save time, reduce risk, and stay focused on what matters while reliable experts handle your tasks.",
    primaryCta: { label: "Book a Service →", href: "/booking" },
    secondaryCta: { label: "Join Waitlist", href: "#waitlist" },
    image: "/images/heroImg1.jpg",
  },
  {
    id: "workers",
    badge: "For Professionals",
    title: "Work With Clients Who Value Your Expertise",
    text: "Join Workdistro as a verified professional and get access to serious clients, quality jobs, and a trusted platform to grow your portfolio and income.",
    primaryCta: { label: "Apply Now →", href: "/application" },
    secondaryCta: { label: "Join Waitlist", href: "#waitlist" },
    image: "/images/heroImg2.jpg",
  },
];


/* ------------------------------- Variants ------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};


async function submitWaitlist(data: {
  name?: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
  phone_number?: FormDataEntryValue | null;
  interest?: FormDataEntryValue | null;
}): Promise<WaitlistResult> {
  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        interest: data.interest,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Something went wrong",
      };
    }

    return { success: true };
  } catch {
    return { success: false, message: "Network error" };
  }
}



export default function Home() {
  const [index, setIndex] = useState(0);
  const [waitlistLoading, setWaitlistLoading] = useState(false);   
  const [menuOpen, setMenuOpen] = useState(false);
  const [alert, setAlert] = useState<{
  show: boolean;
  message: string;
  type?: "success" | "error" | "info";
}>({ show: false, message: "", type: "info" });

  // Auto-rotate every 8s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Close mobile menu on route hash change (anchor nav)
  useEffect(() => {
    const onHash = () => setMenuOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <main className="bg-slate-950 text-gray-200 font-sans">
      {/* Decorative background lights */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-3 focus:py-2 focus:rounded-lg focus:bg-white focus:text-slate-900"
      >
        Skip to content
      </a>

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 bg-slate-950/90 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" aria-label="Workdistro Home" className="shrink-0 flex items-center">
            <Image
              src="/images/logowhite.png"
              alt="Workdistro Logo"
              width={240}
              height={72}
              priority
              className="h-12 sm:h-14 md:h-16 lg:h-28 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-3">
            <Link
              href="/booking"
              className="px-4 py-2 rounded-full border border-white/20 hover:border-emerald-400/70 transition text-sm"
            >
              Book a Service
            </Link>

            <Link
              href="/application"
              className="px-4 py-2 rounded-full border border-white/20 hover:border-emerald-400/70 transition text-sm"
            >
              Apply as a Pro
            </Link>

            <Link
              href="#waitlist"
              className="px-4 py-2 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition focus-visible:ring-2 focus-visible:ring-emerald-400 text-sm"
            >
              Join Waitlist
            </Link>

            <Link
              href="https://chat.whatsapp.com/Hk5JXPsptxn1n4JX7Z9sIM"
              className="px-4 py-2 rounded-full border border-white/20 hover:border-emerald-400/70 transition text-sm"
            >
              Join Community
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 border border-white/15 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav Panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className="px-4 py-3 grid gap-2 bg-slate-950/95">
                <Link
                  href="/booking"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/20 text-center hover:border-emerald-400/70 transition text-sm"
                >
                  Book a Service
                </Link>

                <Link
                  href="/application"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/20 text-center hover:border-emerald-400/70 transition text-sm"
                >
                  Apply as a Pro
                </Link>

                <Link
                  href="#waitlist"
                  className="px-4 py-2 rounded-full bg-emerald-500 text-white font-semibold text-center hover:bg-emerald-400 transition focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Join Waitlist
                </Link>

                <Link
                  href="https://chat.whatsapp.com/Hk5JXPsptxn1n4JX7Z9sIM"
                  className="px-4 py-2 rounded-full border border-white/20 text-center hover:border-emerald-400/70 transition"
                >
                  Join Community
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero Section ───────────────────────────────────────────── */}
      <section
        id="main"
        className="max-w-6xl mx-auto px-4 pt-14 pb-16 md:pt-20 md:pb-20 grid md:grid-cols-2 gap-10 items-center min-h-[70vh]"
      >
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <span className="inline-block px-3 py-1 text-xs md:text-sm font-medium rounded-full bg-white/10 border border-white/20">
                {slides[index].badge}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white">
                {slides[index].title}
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-md">
                {slides[index].text}
              </p>

              {/* Hero CTAs — wired up to booking / application */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={slides[index].primaryCta.href}
                  className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  {slides[index].primaryCta.label}
                </Link>
                <Link
                  href={slides[index].secondaryCta.href}
                  className="px-6 py-3 rounded-xl border border-white/20 hover:border-emerald-400/70 transition"
                >
                  {slides[index].secondaryCta.label}
                </Link>
              </div>

              {/* Slide dots */}
              <div className="flex gap-2 pt-1">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === index ? "bg-emerald-500 w-5" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center">
          <AnimatePresence initial={false}>
            <motion.div
              key={slides[index].id + "-img"}
              variants={fadeScale}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="relative w-full max-w-[480px] aspect-square"
            >
              <Image
                src={slides[index].image}
                alt={slides[index].title}
                fill
                className="rounded-2xl object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Get Started Split-Path Section ─────────────────────────── */}
      <motion.section
        id="get-started"
        className="border-t border-white/10 py-16 md:py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Ready to get started?
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Whether you need something done or want to offer your skills — we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Client card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-emerald-500/50 transition group overflow-hidden"
            >
              {/* Subtle glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition" />

              <div className="relative">
                <div className="text-4xl mb-4">🏠</div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100 mb-2">
                  For Clients
                </p>
                <h3 className="text-xl font-bold text-white mb-3">
                  Need something done?
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Book trusted help for cleaning, laundry, grocery shopping and more. 
                  Fast, reliable, and stress-free.
                </p>

                <ul className="space-y-2 text-sm text-gray-300 mb-8">
                  {["Home cleaning", "Laundry & ironing", "Grocery shopping"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition focus-visible:ring-2 focus-visible:ring-emerald-400 w-full justify-center"
                >
                  Book a Service
                  <span aria-hidden="true">→</span>
                </Link>
                <p className="text-xs text-gray-500 text-center mt-3">Takes under 2 minutes</p>
              </div>
            </motion.div>

            {/* Pro card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-yellow-300/50 transition group overflow-hidden"
            >
              {/* Subtle glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-2xl group-hover:bg-yellow-300/20 transition" />

              <div className="relative">
                <div className="text-4xl mb-4">💼</div>
                <p className="text-xs font-semibold uppercase tracking-widest text-yellow-200 mb-2">
                  For Professionals
                </p>
                <h3 className="text-xl font-bold text-white mb-3">
                  Want to earn with your skills?
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Join our vetted network of service providers. Get matched with clients 
                  in your area and grow your income on your own schedule.
                </p>

                <ul className="space-y-2 text-sm text-gray-300 mb-8">
                  {["Flexible hours", "Keep 85% of every job", "WhatsApp job notifications"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/application"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 hover:border-yellow-300/50 transition focus-visible:ring-2 focus-visible:ring-yellow-300 w-full justify-center"
                >
                  Apply as a Pro
                  <span aria-hidden="true">→</span>
                </Link>
                <p className="text-xs text-gray-500 text-center mt-3">Free to apply · Takes 3–5 mins</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── About Section ──────────────────────────────────────────── */}
      <motion.section
        className="border-t border-white/10 py-16 md:py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
            {/* Left copy */}
            <motion.div
              className="max-w-prose"
              variants={fadeUp}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                About Us
              </h2>
              <p className="text-gray-400 mb-8">
                Workdistro is an efficient and innovative marketplace where you can outsource
                tasks to skilled service professionals and connect with new clients for job
                opportunities.
              </p>

              <ul className="space-y-3 text-gray-300">
                {[
                  { title: "Reliable", desc: "Verified professionals, timely delivery." },
                  { title: "Secure", desc: "Safe transactions & data security." },
                  { title: "Value-based", desc: "Transparent pricing, clear deliverables." },
                  { title: "Diverse", desc: "Wide range of services across industries and skill sets." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-emerald-500" />
                    <span>
                      <span className="font-semibold">{item.title}:</span>{" "}
                      <span className="text-gray-400">{item.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Community & Support",
                  desc: "Connect, share and grow with our active network.",
                  icon: "👥",
                },
                {
                  title: "Wide Range of Services",
                  desc: "Find providers for nearly any task or project.",
                  icon: "🛠️",
                },
                {
                  title: "Continuous Improvement",
                  desc: "We evolve with feedback to serve you better.",
                  icon: "⚡",
                },
                {
                  title: "Flexibility & Convenience",
                  desc: "Hire on your own terms, wherever you are.",
                  icon: "📱",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 hover:border-emerald-500/70 transition"
                >
                  <div className="text-2xl mb-3">{card.icon}</div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Waitlist Section ───────────────────────────────────────── */}
      <motion.section
        id="waitlist"
        className="border-t border-white/10 py-16 md:py-20 scroll-mt-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
            Join Our Waitlist
          </h2>
          <p className="text-gray-400 mb-8">
            Be among the first to access vetted professionals and high-quality work.
          </p>

          <form
            className="space-y-4 text-left"
            onSubmit={async (e) => {
              e.preventDefault();
              setWaitlistLoading(true);
              const form = e.currentTarget as HTMLFormElement;
              const formData = new FormData(form);

              const data = {
                name: formData.get("name"),
                email: formData.get("email"),
                phone_number: formData.get("phone_number"),
                interest: formData.get("interest"),
              };

              const result = await submitWaitlist(data);
              if (result.success) {
                setAlert({
                  show: true,
                  message:
                    "🎉 You're on the waitlist! Join our WhatsApp community to get updates first.",
                  type: "success",
                });

                form.reset();

                setTimeout(() => {
                  window.open(
                    "https://chat.whatsapp.com/Hk5JXPsptxn1n4JX7Z9sIM",
                    "_blank"
                  );
                }, 3000);
              } else {
                setAlert({ show: true, message: `❌ Error: ${result.message}`, type: "error" });
              }
              setWaitlistLoading(false);
            }}
          >
            <label className="block">
              <span className="sr-only">Full name</span>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              />
            </label>

            <label className="block">
              <span className="sr-only">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              />
            </label>

            <label className="block">
              <span className="sr-only">Phone number</span>
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              />
            </label>

            <label className="block">
              <span className="sr-only">Interest (optional)</span>
              <input
                type="text"
                name="interest"
                placeholder="Your Interest (Optional)"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              />
            </label>

            <button
              type="submit"
              disabled={waitlistLoading}
              className={`w-full px-6 py-3 rounded-xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                waitlistLoading
                  ? "bg-emerald-400/60 text-white cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 text-white"
              }`}
            >
              {waitlistLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                  Joining…
                </span>
              ) : (
                "Join Waitlist"
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </motion.section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer id="community" className="border-t border-white/10 py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2">
          <div>
            <Link href="/" aria-label="Workdistro Home" className="shrink-0 inline-block">
              <Image
                src="/images/logowhite.png"
                alt="Workdistro Logo"
                width={200}
                height={40}
                priority
                className="h-12 sm:h-7 md:h-12 lg:h-24 w-auto mb-3"
              />
            </Link>

            <p className="text-sm text-gray-400 mt-1 max-w-sm leading-relaxed">
              Workdistro is a skill-based services marketplace that makes it easy for people
              to find trusted professionals for tasks and for service providers to connect
              with new clients.
            </p>

            {/* Quick links in footer */}
            <div className="flex gap-4 mt-4">
              <Link href="/booking" className="text-sm text-emerald-400 hover:text-emerald-300 transition">
                Book a Service
              </Link>
              <Link href="/application" className="text-sm text-emerald-400 hover:text-emerald-300 transition">
                Apply as a Pro
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">Join our community</h3>
            <p className="text-sm text-gray-400">
              Get updates, early access announcements, and connect with other early users.
            </p>
            <Link
              href="https://chat.whatsapp.com/Hk5JXPsptxn1n4JX7Z9sIM"
              target="_blank"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition"
            >
              Join Community
            </Link>

            <p className="text-xs text-gray-500">
              No spam. Real conversations only.
            </p>
            <div className="flex gap-4 pt-2 text-sm text-gray-400">
              <Link className="hover:text-white" href="https://x.com/workdistro">
                X
              </Link>
              <Link className="hover:text-white" href="https://www.facebook.com/share/1TG9cKNsYF/?mibextid=wwXIfr">
                Facebook
              </Link>
              <Link className="hover:text-white" href="https://www.instagram.com/workdistro">
                Instagram
              </Link>
              <Link className="hover:text-white" href="https://www.linkedin.com/company/workdistro/">
                LinkedIn
              </Link>
              <Link
                className="hover:text-white"
                href="https://www.tiktok.com/@workdistro"
                target="_blank"
              >
                TikTok
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Workdistro. All rights reserved.
        </p>
      </footer>

      <Alert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
      />
    </main>
  );
}