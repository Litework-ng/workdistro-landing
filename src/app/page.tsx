"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Alert from "@/app/Alert";
import RequirementsModal from "@/app/components/RequirementsModal";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const testimonials = [
  {
    quote: "Workdistro made it easy to book help for my home. The pro arrived on time and the whole process was smooth.",
    name: "Ngozi Anya",
    location: "Lagos, Nigeria",
    image: "/images/testimonialImg1.png",
    mobileImage: "/images/mobileTestimonialsImg1.png",
  },
  {
    quote: "The service is fast, reliable, and exactly what I needed. I will use Workdistro again for future tasks.",
    name: "Ifeoma Chukwu",
    location: "Abuja, Nigeria",
    image: "/images/testimonialImg2.png",
    mobileImage: "/images/mobileTestimonialsImg2.png",
  },
];

const steps = [
  {
    number: "STEP 1",
    title: "Send a list",
    desc: "Tell us what needs to get done — cleaning, laundry, groceries, or other home services.",
    image: "/images/sendList.png",
  },
  {
    number: "STEP 2",
    title: "We match the right professional",
    desc: "Tell us what you need done and we provide the details of your task or project.",
    image: "/images/matchPro.png",
  },
  {
    number: "STEP 3",
    title: "Your space gets handled",
    desc: "The work gets done. Pricing is fixed. Follow-ups are handled. You don't chase anyone.",
    image: "/images/getsHandled.png",
  },
];

const faqs = [
  { question: "What does Workdistro actually do?", answer: "We handle a lot of what needs to get done — from matching to follow-up. Verified professionals. Fixed pricing. No hassle." },
  { question: "How do I request a service?", answer: "Simply send your list through the platform. Include what you need — cleaning, laundry, groceries, or other home services — and we'll take care of the rest." },
  { question: "Do I choose the professional myself?", answer: "No. We match the right professional to your task. Every professional is verified, rated, and accountable." },
  { question: "How is pricing determined?", answer: "Pricing is fixed based on the service. No negotiation at your door, no surprises." },
  { question: "What if something goes wrong?", answer: "We step in. Workdistro handles issues and ensures things are resolved promptly." },
  { question: "Are the professionals verified?", answer: "Yes. Every professional goes through a verification process and builds a track record through ratings and completed jobs." },
  { question: "Can I request recurring services?", answer: "Yes. You can set up recurring tasks and we'll manage consistency and quality." },
  { question: "How do professionals get paid?", answer: "Payments are handled through the platform and processed after successful job completion." },
];

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.0 2.25H8.08l4.253 5.622 5.911-5.622Z" fill="currentColor" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.25 22l4.979-1.374A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9c0-.5.167-.9.5-1.2.334-.3.667-.3.834-.3h.333c.167 0 .334.1.417.3l.666 1.6c.084.2.084.4 0 .6l-.416.667c-.084.2-.084.366 0 .5.333.666.833 1.166 1.5 1.5.133.066.3.066.433 0l.667-.417c.2-.083.4-.083.6 0l1.6.667c.2.083.3.25.3.416v.334c0 .166 0 .5-.3.8-.3.3-.667.533-1.167.533C9.833 15 8.5 13.667 8.5 12c0-.5.083-.95.25-1.366L9 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconVerified() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#31DE9E" />
      <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconIncome() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <rect x="1" y="4" width="14" height="9" rx="1.5" stroke="#31DE9E" strokeWidth="1.4" />
      <path d="M1 7h14" stroke="#31DE9E" strokeWidth="1.4" />
      <path d="M5 10.5h2" stroke="#31DE9E" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconHistory() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="#31DE9E" strokeWidth="1.4" />
      <path d="M8 5v3.5l2 1.5" stroke="#31DE9E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconProtection() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <path d="M8 1.5L2 4v4c0 3 2.5 5.5 6 6 3.5-.5 6-3 6-6V4L8 1.5Z" stroke="#31DE9E" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M5.5 8l1.5 1.5L10.5 6" stroke="#31DE9E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────────── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="w-full flex items-start justify-between gap-4 py-4 text-left group">
        <span className="text-sm font-semibold text-[#141941] leading-snug group-hover:text-[#31DE9E] transition">{question}</span>
        <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180 border-[#31DE9E]" : ""}`}>
          <svg viewBox="0 0 10 6" className={`w-2.5 h-2.5 transition-colors ${open ? "text-[#31DE9E]" : "text-gray-400"}`} fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="overflow-hidden">
            <p className="pb-4 text-sm text-[#4B5563] leading-relaxed pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE — single default export
───────────────────────────────────────────── */
export default function Home() {
  const [activeTab, setActiveTab] = useState<"clients" | "professionals">("clients");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [requirementsModalOpen, setRequirementsModalOpen] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type?: "success" | "error" | "info";
  }>({ show: false, message: "", type: "info" });

  useEffect(() => {
    const onHash = () => setMenuOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);

  return (
    <main className="bg-white text-[#0D1B2A] overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
          <Link href="/" aria-label="Workdistro Home" className="shrink-0">
            <Image src="/images/logo.png" alt="Workdistro" width={160} height={40} priority className="h-9 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#how-it-works" className="text-[#4B5563] hover:text-[#31DE9E] transition">How it works</Link>
            <Link href="/application" className="text-[#4B5563] hover:text-[#31DE9E] transition">Apply as a pro</Link>
            <Link href="/booking" className="px-5 py-2.5 rounded-full bg-[#31DE9E] text-white font-semibold hover:bg-[#16A34A] transition text-sm">Book a service</Link>
          </nav>
          <button aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} className="md:hidden p-2 rounded-lg border border-gray-200">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              {menuOpen
                ? <path d="M6 18L18 6M6 6l12 12" stroke="#0D1B2A" strokeWidth="2" strokeLinecap="round" />
                : <path d="M4 6h16M4 12h16M4 18h16" stroke="#0D1B2A" strokeWidth="2" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="md:hidden overflow-hidden border-t border-gray-100">
              <div className="px-5 py-4 flex flex-col gap-3 bg-white text-sm font-medium">
                <Link href="#how-it-works" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#31DE9E]">How it works</Link>
                <Link href="/application" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#31DE9E]">Apply as a pro</Link>
                <Link href="/booking" onClick={() => setMenuOpen(false)} className="py-2.5 rounded-full bg-[#31DE9E] text-white text-center font-semibold">Book a service</Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-5 pt-12 pb-12 md:pt-16 md:pb-20 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex rounded-full border border-gray-200 p-1 mb-7 bg-[#F7F7F7] text-sm font-medium">
              <button onClick={() => setActiveTab("clients")} className={`px-4 py-1.5 rounded-full transition ${activeTab === "clients" ? "bg-white shadow text-[#1D1D1D] font-semibold" : "text-[#4B5563] hover:text-[#0D1B2A]"}`}>For Clients</button>
              <button onClick={() => setActiveTab("professionals")} className={`px-4 py-1.5 rounded-full transition ${activeTab === "professionals" ? "bg-white shadow text-[#1D1D1D] font-semibold" : "text-[#4B5563] hover:text-[#0D1B2A]"}`}>For Professionals</button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "clients" ? (
                <motion.div key="clients" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                  <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-semibold leading-tight text-[#141941] mb-4">
                    Send a list. We&apos;ll{" "}
                    <span className="inline-flex items-center bg-[#FEEF3E] px-2 py-1 -rotate-1 text-[#0D1B2A] font-semibold">handle</span>{" "}
                    the rest.
                  </h1>
                  <p className="text-[#4B5563] text-base leading-relaxed max-w-md mb-7">Cleaning, laundry, grocery runs, home services handled start to finish by vetted professionals. No price negotiation. No follow-ups. No drama.</p>
                  <div className="flex flex-col sm:flex-row gap-3 mb-10">
                    <Link href="/booking" className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-[#31DE9E] text-white font-semibold hover:bg-[#16A34A] transition text-sm">Book a service</Link>
                    <Link href="/application" className="w-full sm:w-auto text-center flex justify-center items-center gap-1.5 px-6 py-3 rounded-full bg-[#F5F5F5] border border-gray-300 text-[#0D1B2A] font-medium hover:border-[#31DE9E] transition text-sm">Apply as a Professional <span>↗</span></Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="professionals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                  <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-bold leading-[1.1] text-[#141941] mb-5">
                    Work with clients{" "}
                    <br className="hidden sm:block" />
                    who{" "}
                    <span className="inline-flex items-center bg-[#FEEF3E] px-2 py-1 -rotate-1 text-[#141941] font-bold">value</span>{" "}
                    your<br className="hidden sm:block" />{" "}expertise
                  </h1>
                  <p className="text-[#4B5563] text-base leading-relaxed max-w-md mb-7">Workdistro helps you turn their work into a real track record. Your profile becomes your CV and you get access to clients.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-md">
                    {[
                      { icon: <IconVerified />, label: "Verified professional profile" },
                      { icon: <IconIncome />, label: "Structured income opportunities" },
                      { icon: <IconHistory />, label: "Real job history and ratings" },
                      { icon: <IconProtection />, label: "Protection and dispute handling" },
                    ].map(({ icon, label }) => (
                      <span key={label} className="flex w-full items-center gap-2 px-3 py-3 rounded-2xl border border-[#E8E8E8] bg-[#F5F5F5] text-xs font-medium text-[#1D1D1D]">{icon}{label}</span>
                    ))}
                  </div>
                  <Link href="/application" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#31DE9E] text-white font-semibold hover:bg-[#16A34A] transition text-sm">
                    Apply as a Professional <span className="text-base leading-none">↗</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {activeTab === "clients" && (
                <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex gap-8 border-t border-gray-100 pt-7">
                  {[{ value: "30+", label: "Professionals" }, { value: "1500+", label: "Tasks Completed" }, { value: "98%", label: "Satisfaction Rate" }].map((s) => (
                    <div key={s.label}>
                      <p className="text-2xl font-extrabold text-[#141941]">{s.value}</p>
                      <p className="text-xs text-[#141941] mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center md:justify-end">
            <AnimatePresence mode="wait">
              {activeTab === "clients" && (
                <motion.div key="client-img" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4 }} className="relative w-full max-w-[480px]">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/4.5]">
                    <Image src="/images/heroImage.png" alt="Professional at work" fill className="object-cover" />
                  </div>
                </motion.div>
              )}
              {activeTab === "professionals" && (
                <motion.div key="pro-img" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4 }} className="relative w-full max-w-[480px]">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/4.5]">
                    <Image src="/images/heroImage.png" alt="Professional at work" fill className="object-cover" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Dark Banner ── */}
      <section className="relative w-full overflow-hidden py-0">
        <div className="relative w-full h-[220px] sm:h-[230px] md:h-[360px]">
          <Image src="/images/mobileSectionAdditional.png" alt="Workdistro banner" fill className="object-contain sm:hidden" priority sizes="100vw" />
          <Image src="/images/sectionAdditional.png" alt="Workdistro banner" fill className="object-contain hidden sm:block" priority sizes="100vw" />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141941]">
              How Workdistro{" "}
              <span className="inline-flex items-center bg-[#FEEF3E] px-2 py-1 -rotate-1 text-[#0D1B2A]">works</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.12 }} viewport={{ once: true }} className="flex flex-col items-start">
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-gray-50 border border-gray-100 mb-5 overflow-hidden">
                  <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <p className="inline-flex items-center gap-2 rounded-full bg-[#31DE9E1A] px-3 py-1 text-[11px] font-semibold tracking-widest text-[#31DE9E] mb-2">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                  </svg>
                  {step.number}
                </p>
                <h3 className="text-lg font-bold text-[#1D1D1D] mb-2">{step.title}</h3>
                <p className="text-sm text-[#1D1D1D] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="relative w-full overflow-hidden py-0 bg-[#F5F5F5]">
        <div className="relative w-full h-[680px] md:h-[520px] lg:h-[620px]">
          <Image src="/images/mobileServices.png" alt="Workdistro services" fill className="object-cover sm:hidden" priority sizes="100vw" />
          <Image src="/images/services.png" alt="Workdistro services" fill className="object-contain hidden sm:block" priority sizes="100vw" />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141941] mb-2">
              Don&apos;t take <br />our{" "}
              <span className="inline-flex items-center bg-[#FEEF3E] px-2 py-1 -rotate-1 text-[#0D1B2A]">word</span>
              {" "}for it.
            </h2>
            <p className="text-[#4B5563] text-sm">Hear what clients says about Workdistro</p>
          </div>
          <div className="flex justify-center">
            <div className="relative max-w-lg w-full">
              <AnimatePresence mode="wait">
                <motion.div key={testimonialIndex} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }} className="relative">
                  <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px]">
                    <Image src={testimonials[testimonialIndex].mobileImage} alt={`${testimonials[testimonialIndex].name} testimonial`} fill className="object-contain sm:hidden" sizes="100vw" />
                    <Image src={testimonials[testimonialIndex].image} alt={`${testimonials[testimonialIndex].name} testimonial`} fill className="object-contain hidden sm:block" sizes="100vw" />
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center gap-4 mt-8">
                <button onClick={prevTestimonial} aria-label="Previous testimonial" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#31DE9E] hover:text-[#31DE9E] transition text-lg">‹</button>
                <button onClick={nextTestimonial} aria-label="Next testimonial" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#31DE9E] hover:text-[#31DE9E] transition text-lg">›</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="md:sticky md:top-28">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141941] leading-tight">
                We&apos;ve got{" "}
                <span className="inline-flex items-center bg-[#FEEF3E] px-2 py-1 -rotate-1 text-[#0D1B2A]">answers</span>
                <br />to your questions
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

           {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-16 md:pb-20">
        <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[300px]">
          <div className="order-2 md:order-1 bg-[#141941] px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
                Try it once. You{" "}
                <br />
                <span className="inline-flex items-center bg-[#FEEF3E] px-2 py-1 -rotate-1 text-[#0D1B2A]">won&apos;t</span>{" "}
                go back
              </h2>
              <p className="text-white/80 text-sm mb-7">Send your list. We&apos;ll handle the rest.</p>
              <Link href="/booking" className="inline-block sm:w-auto text-center px-6 py-3 rounded-full bg-[#31DE9E] text-white font-semibold hover:bg-[#16A34A] transition text-sm">
                Book a service
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative bg-gray-100 min-h-[240px]">
            <Image src="/images/foldedClothes.png" alt="Laundry service" fill className="object-cover" sizes="100vw" />
          </div>
        </div>
      </section>



      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-[#F5F5F5] pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <p className="text-sm font-bold text-[#1D1D1D] mb-2">Your home is waiting.</p>
              <p className="text-sm sm:text-xs text-[#1D1D1D] leading-relaxed mb-5">All you need to do is send us the list and we&apos;ll handle the rest.</p>
              <div className="flex gap-3">
                {[
                  { href: "https://www.instagram.com/workdistro", label: "Instagram", icon: <IconInstagram /> },
                  { href: "https://x.com/workdistro", label: "X", icon: <IconX /> },
                  { href: "https://chat.whatsapp.com/Hk5JXPsptxn1n4JX7Z9sIM", label: "WhatsApp", icon: <IconWhatsApp /> },
                ].map((s) => (
                  <Link key={s.label} href={s.href} aria-label={s.label} target="_blank" className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-[#1D1D1D] hover:border-[#31DE9E] hover:text-[#31DE9E] transition">
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#1D1D1D] mb-3">Company</p>
              <ul className="space-y-2 text-xs text-[#1D1D1D]">
                <li><Link href="/" className="hover:text-[#31DE9E] transition">About</Link></li>
                <li><Link href="#how-it-works" className="hover:text-[#31DE9E] transition">How It Works</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#1D1D1D] mb-3">Useful links</p>
              <ul className="space-y-2 text-xs text-[#1D1D1D]">
                <li><Link href="/application" className="hover:text-[#31DE9E] transition">Apply as a Professional</Link></li>
                <li>
                  <button
                    onClick={() => setRequirementsModalOpen(true)}
                    className="hover:text-[#31DE9E] transition text-left text-xs"
                  >
                    Professional Requirements
                  </button>
                </li>
                <li><Link href="/booking" className="hover:text-[#31DE9E] transition">Book a Service</Link></li>
                <li><Link href="https://chat.whatsapp.com/Hk5JXPsptxn1n4JX7Z9sIM" className="hover:text-[#31DE9E] transition">Join our community</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#1D1D1D] mb-3">Support</p>
              <ul className="space-y-2 text-xs text-[#1D1D1D]">
                <li><Link href="https://wa.me/2349012791144" target="_blank" className="hover:text-[#31DE9E] transition">Contact Us</Link></li>
                <li><Link href="#faq" className="hover:text-[#31DE9E] transition">FAQs</Link></li>
                <li><Link href="/privacy#terms-of-service" className="hover:text-[#31DE9E] transition">Terms of Service</Link></li>
                <li><Link href="/privacy#privacy-policy" className="hover:text-[#31DE9E] transition">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="w-full py-6 -mx-5 px-5">
            <div className="relative w-full h-[130px] md:h-[180px]">
              <Image src="/images/footerLogo.png" alt="Workdistro" fill className="object-contain object-left" sizes="100vw" />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 flex md:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} Workdistro.</p>
            <p className="text-xs text-gray-400">All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ── Modals ── */}
      <RequirementsModal
        open={requirementsModalOpen}
        onClose={() => setRequirementsModalOpen(false)}
      />
      <Alert
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
      />
    </main>
  );
}