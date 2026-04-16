"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Alert from "@/app/Alert";

/* ─────────────────────────────────────────────
   CONTENT
───────────────────────────────────────────── */
const privacyContent = `At Workdistro, your data is part of how we deliver a service that actually works. Every piece of information we collect exists to make sure your experience is reliable, structured, and handled from start to finish — not left to chance.

When you use Workdistro, we collect information such as your name, phone number, email address, location, and details about the services you request. We also collect information related to how you use the platform, including communication, preferences, and transaction history. Payment information is processed securely through trusted providers and is never stored in a way that exposes sensitive details.

This information allows us to match you with the right professional, coordinate service delivery, manage scheduling, and ensure that every task is completed properly. It also helps us maintain accountability across the platform — from tracking job history to resolving issues when they arise. Without this structure, the service would fall back into the same uncertainty we are designed to eliminate.

We do not collect information we don't need, and we do not sell your personal data. Workdistro is not built on data exploitation — it is built on trust and reliability. Any data we collect is used strictly to improve the service, maintain quality, and support both clients and professionals on the platform.

Your information is stored securely, and access is limited to what is necessary to operate the service effectively. We use industry-standard safeguards to protect your data from unauthorised access, misuse, or loss. Where we work with third-party providers — such as payment processors or operational tools — they are carefully selected and only given access to what is required to perform their function.

We also use data to improve how Workdistro works over time. This includes understanding common service requests, improving matching accuracy, reducing delays, and identifying ways to make the overall experience smoother and more reliable. These improvements are always made with your privacy in mind.

You remain in control of your information. At any time, you can request to access your data, update your details, or delete your account. We believe transparency is part of trust, and you should always know what information is held and how it is used.

Workdistro is designed to take the stress out of home services — not introduce new concerns. That includes how your data is handled. Your home is handled. Your data is respected.`;

const tosContent = {
  introduction: `Workdistro is a managed home-services platform built to make everyday tasks reliable. By using this platform, you agree to how the service operates — from how requests are handled to how professionals are assigned and how issues are resolved. These terms exist to make sure the experience stays consistent, structured, and fair for everyone involved.`,

  howItWorks: `Workdistro handles the full service process. When a request is made, we take responsibility for matching the right professional, setting the pricing, coordinating delivery, and stepping in if anything goes wrong.
Pricing is fixed based on the service type. Clients are protected from open profiles or negotiate directly. The system is designed to remove that uncertainty and replace it with a managed, reliable process.
Using Workdistro means agreeing to this structure — where the platform manages the outcome, not just the connection.`,

  userAccounts: `To use Workdistro, you may be required to create an account and provide accurate information. This includes your name, contact details, and any information needed to deliver services properly.
You are responsible for maintaining the accuracy of your account and keeping your login details secure. Any activity carried out through your account is considered your responsibility.
Workdistro reserves the right to suspend or remove accounts that misuse the platform or violate these terms.`,

  serviceRequests: `When submitting a request, you are expected to provide clear and accurate details about the task. This helps us match the right professional and ensure the work is completed correctly.
You are also responsible for ensuring that the environment is suitable for the service to be delivered. This includes providing access where necessary and communicating any specific requirements in advance.
Workdistro may decline or adjust requests if the details provided are incomplete or fall outside the scope of supported services.`,

  professionals: `Professionals on Workdistro are verified service providers who operate within a structured system. They are expected to deliver services to a high standard, maintain professionalism, and follow platform guidelines at all times.
Their performance is tracked through ratings, job history, and accountability measures. This ensures that every professional on the platform is part of a system that prioritises reliability and consistency.`,

  pricing: `Pricing on Workdistro is fixed based on the type of service requested. This removes the need for negotiation and ensures clarity from the start.
All payments are processed through the platform using secure payment systems. Clients are expected to complete payments as required for services to be delivered.
Payments to professionals are handled after successful job completion, in line with platform processes.`,

  cancellations: `Plans change, and we plan for that. However, cancellations or changes to a request should be made within the appropriate timeframe.
Late cancellations may result in charges, depending on how close the request is to the scheduled service time and the resources already allocated.
Repeated cancellations or misuse of the system may lead to restrictions on your account.`,

  disputes: `If something doesn't go as expected, Workdistro steps in.
We review the situation based on available information, including communication, job details, and platform records. Our goal is to resolve issues fairly and maintain trust on both sides of the platform.
By using Workdistro, you agree to allow the platform to manage and make decisions on disputes where necessary.`,

  platformUse: `Workdistro is designed to operate as a complete system. Users are expected to engage with services through the platform and not use it as a starting point for arrangements outside Workdistro.
Any attempt to take transactions or service relationships off-platform undermines accountability and may result in account suspension.`,

  liability: `Workdistro is built to deliver reliable outcomes, but there may be situations beyond our control. While we work to ensure service quality and proper resolution of issues, Workdistro is not liable for indirect or unforeseen damages outside the scope of the service provided.
Our responsibility is to manage the process and resolve issues fairly within the system.`,

  updates: `As Workdistro evolves, these terms may be updated to reflect improvements to the service, changes in operations, or new features. When updates are made, they will be reflected on this page. Continued use of the platform means acceptance of the updated terms.`,

  closing: `Workdistro exists to make home services reliable — not uncertain, not stressful, not left to chance.
These terms are part of how that reliability is built and maintained.
Your home is waiting.`,
};

const faqs = [
  { question: "What does Workdistro actually do?", answer: "We handle a lot of what needs to get done. We handle the rest — from matching to follow-up. Verified professionals. Fixed pricing. No back and forth." },
  { question: "How do I request a service?", answer: "Simply send your list through the platform. Include what you need — cleaning, laundry, groceries, or other home services — and we'll take it from there." },
  { question: "Do I choose the professional myself?", answer: "No. We match the right professional to your task. Every professional is verified, rated, and accountable." },
  { question: "How is pricing determined?", answer: "Pricing is fixed based on the service. No negotiation at your door, no surprises." },
  { question: "What if something goes wrong?", answer: "We step in. Workdistro handles issues and ensures things are resolved promptly." },
  { question: "Are the professionals verified?", answer: "Yes. Every professional goes through a verification process and builds a track record through ratings and completed jobs." },
  { question: "Can I request recurring services?", answer: "Yes. You can set up recurring tasks and we'll manage consistency and quality." },
  { question: "How do professionals get paid?", answer: "Payments are handled through the platform and processed after successful job completion." },
];

const sidebarSections = [
  { id: "privacy-policy", label: "Privacy Policy" },
  { id: "terms-of-service", label: "Terms of Service" },
  { id: "tos-introduction", label: "Introduction", indent: true },
  { id: "tos-how-it-works", label: "How Workdistro Works", indent: true },
  { id: "tos-user-accounts", label: "User Accounts", indent: true },
  { id: "tos-service-requests", label: "Service Requests", indent: true },
  { id: "tos-professionals", label: "Professionals on the Platform", indent: true },
  { id: "tos-pricing", label: "Pricing and Payments", indent: true },
  { id: "tos-cancellations", label: "Cancellations and Changes", indent: true },
  { id: "tos-disputes", label: "Disputes and Issue Resolution", indent: true },
  { id: "tos-platform-use", label: "Platform Use", indent: true },
  { id: "tos-liability", label: "Limitation of Liability", indent: true },
  { id: "tos-updates", label: "Updates to These Terms", indent: true },
  { id: "tos-closing", label: "Closing", indent: true },
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
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

function ContentSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-28 mb-10">
      <h3 className="text-base font-bold text-[#141941] mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para, i) => (
        <p key={i} className="text-sm text-[#4B5563] leading-relaxed mb-4 last:mb-0">
          {para}
        </p>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function PrivacyTermsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("privacy-policy");
  const [alert, setAlert] = useState<{ show: boolean; message: string; type?: "success" | "error" | "info" }>({ show: false, message: "", type: "info" });

  useEffect(() => {
    const ids = sidebarSections.map((s) => s.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-white text-[#0D1B2A] overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
          <Link href="/" aria-label="Workdistro Home" className="shrink-0">
            <Image src="/images/logo.png" alt="Workdistro" width={160} height={40} priority className="h-9 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/#how-it-works" className="text-[#4B5563] hover:text-[#31DE9E] transition">How it works</Link>
            <Link href="/application" className="text-[#4B5563] hover:text-[#31DE9E] transition">Apply as a pro</Link>
            <Link href="/booking" className="px-5 py-2.5 rounded-full bg-[#31DE9E] text-white font-semibold hover:bg-[#16A34A] transition text-sm">Book a service</Link>
          </nav>
          <button aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} className="md:hidden p-2 rounded-lg border border-gray-200">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12" stroke="#0D1B2A" strokeWidth="2" strokeLinecap="round" /> : <path d="M4 6h16M4 12h16M4 18h16" stroke="#0D1B2A" strokeWidth="2" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="md:hidden overflow-hidden border-t border-gray-100">
              <div className="px-5 py-4 flex flex-col gap-3 bg-white text-sm font-medium">
                <Link href="/#how-it-works" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#31DE9E]">How it works</Link>
                <Link href="/application" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#31DE9E]">Apply as a pro</Link>
                <Link href="/booking" onClick={() => setMenuOpen(false)} className="py-2.5 rounded-full bg-[#31DE9E] text-white text-center font-semibold">Book a service</Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── Page Hero ── */}
      <section className="relative bg-[#141941] overflow-hidden">
        {/* PATTERN IMAGE – exactly as in the design (green wave graphic) */}
        <Image
          src="/images/pattern.png"  
          alt=""
          fill
          priority
          className="absolute top-0 right-0 h-full w-auto object-contain object-right-top pointer-events-none z-0"
          style={{ opacity: 0.95 }}
        />

        <div className="max-w-6xl mx-auto px-5 py-12 md:py-16 relative z-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition mb-6">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            Privacy &nbsp;
            <span className="inline-flex items-center bg-[#FEEF3E] px-2 py-1 -rotate-1 text-[#141941] font-bold">Terms</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed mb-3">
            Everything you need to know about how Workdistro works and how your data is handled.
          </p>
          <p className="text-xs text-gray-500">Last updated: April 2026</p>
        </div>
      </section>

      {/* ── Main Content: Sidebar + Body ── */}
      <section className="max-w-6xl mx-auto px-5 py-12 md:py-16">
        <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-14 items-start">

          <aside className="hidden md:block md:sticky md:top-28 self-start">
            <nav aria-label="Page sections">
              <ul className="space-y-0.5">
                {sidebarSections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollTo(section.id)}
                      className={`w-full text-left text-xs py-1.5 transition rounded ${section.indent ? "pl-4" : "font-semibold"} ${activeSection === section.id ? "text-[#31DE9E] font-semibold" : "text-[#4B5563] hover:text-[#141941]"}`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="min-w-0">
            <section id="privacy-policy" className="scroll-mt-28 mb-14">
              <h2 className="text-2xl font-bold text-[#141941] mb-6 pb-3 border-b border-gray-100">Privacy Policy</h2>
              <Prose text={privacyContent} />
            </section>

            <section id="terms-of-service" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-[#141941] mb-8 pb-3 border-b border-gray-100">Terms of Service</h2>

              <ContentSection id="tos-introduction" title="Introduction">
                <Prose text={tosContent.introduction} />
              </ContentSection>

              <ContentSection id="tos-how-it-works" title="How Workdistro Works">
                <Prose text={tosContent.howItWorks} />
              </ContentSection>

              <ContentSection id="tos-user-accounts" title="User Accounts">
                <Prose text={tosContent.userAccounts} />
              </ContentSection>

              <ContentSection id="tos-service-requests" title="Service Requests">
                <Prose text={tosContent.serviceRequests} />
              </ContentSection>

              <ContentSection id="tos-professionals" title="Professionals on the Platform">
                <Prose text={tosContent.professionals} />
              </ContentSection>

              <ContentSection id="tos-pricing" title="Pricing and Payments">
                <Prose text={tosContent.pricing} />
              </ContentSection>

              <ContentSection id="tos-cancellations" title="Cancellations and Changes">
                <Prose text={tosContent.cancellations} />
              </ContentSection>

              <ContentSection id="tos-disputes" title="Disputes and Issue Resolution">
                <Prose text={tosContent.disputes} />
              </ContentSection>

              <ContentSection id="tos-platform-use" title="Platform Use">
                <Prose text={tosContent.platformUse} />
              </ContentSection>

              <ContentSection id="tos-liability" title="Limitation of Liability">
                <Prose text={tosContent.liability} />
              </ContentSection>

              <ContentSection id="tos-updates" title="Updates to These Terms">
                <Prose text={tosContent.updates} />
              </ContentSection>

              <ContentSection id="tos-closing" title="Closing">
                <Prose text={tosContent.closing} />
              </ContentSection>
            </section>
          </article>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="md:sticky md:top-28">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141941] leading-tight">
                Still have questions? <br />
                We&apos;ve got <span className="inline-flex items-center bg-[#FEEF3E] px-2 py-1 -rotate-1 text-[#0D1B2A]">answers</span>
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

      <section className="max-w-6xl mx-auto px-5 pb-16 md:pb-20">
        <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[300px]">
          <div className="order-2 md:order-1 bg-[#141941] px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
                Try it once. You <br />
                <span className="inline-flex items-center bg-[#FEEF3E] px-2 py-1 -rotate-1 text-[#0D1B2A]">won&apos;t</span> go back
              </h2>
              <p className="text-white/80 text-sm mb-7">Send your list. We&apos;ll handle the rest.</p>
              <Link href="/booking" className="inline-block text-center px-6 py-3 rounded-full bg-[#31DE9E] text-white font-semibold hover:bg-[#16A34A] transition text-sm">
                Book a service
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative bg-gray-100 min-h-[240px]">
            <Image src="/images/foldedClothes.png" alt="Laundry service" fill className="object-cover" sizes="100vw" />
          </div>
        </div>
      </section>

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
                {['About', 'How It Works', 'Services', 'Contact'].map((l) => (
                  <li key={l}><Link href="#" className="hover:text-[#31DE9E] transition">{l}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#1D1D1D] mb-3">Useful links</p>
              <ul className="space-y-2 text-xs text-[#1D1D1D]">
                {[
                  { label: "Apply as a Professional", href: "/application" },
                  { label: "Professional Requirements", href: "#" },
                  { label: "Book a Service", href: "/booking" },
                  { label: "Join our community", href: "https://chat.whatsapp.com/Hk5JXPsptxn1n4JX7Z9sIM" },
                ].map((l) => (
                  <li key={l.label}><Link href={l.href} className="hover:text-[#31DE9E] transition">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#1D1D1D] mb-3">Support</p>
              <ul className="space-y-2 text-xs text-[#1D1D1D]">
                {[
                  { label: "Help Center", href: "#" },
                  { label: "FAQs", href: "#" },
                  { label: "Terms of Service", href: "/privacy" },
                  { label: "Privacy & Terms", href: "/privacy" },
                ].map((l) => (
                  <li key={l.label}><Link href={l.href} className="hover:text-[#31DE9E] transition">{l.label}</Link></li>
                ))}
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

      <Alert show={alert.show} message={alert.message} type={alert.type} onClose={() => setAlert((prev) => ({ ...prev, show: false }))} />
    </main>
  );
}