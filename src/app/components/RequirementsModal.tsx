"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const requirements = [
  {
    title: "Identity and Verification",
    items: [
      "Valid government-issued ID",
      "Verified phone number (WhatsApp)",
      "Clear profile photo",
      "Accurate personal information",
    ],
  },
  {
    title: "Professional Experience",
    items: [
      "Proven experience in your service area (cleaning, laundry, etc.)",
      "Ability to deliver consistent, high-quality work",
      "Understanding of basic service standards",
      "Willingness to follow Workdistro processes",
    ],
  },
];

export default function RequirementsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  /* Lock body scroll while open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        /* Backdrop */
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label="Professional Requirements"
        >
          {/* Modal panel — stop clicks bubbling to backdrop */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Dark header ── */}
            <div className="relative bg-[#141941] px-6 pt-8 pb-10">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <svg viewBox="0 0 18 18" className="w-4 h-4 text-white" fill="none" aria-hidden="true">
                  <path
                    d="M14 4L4 14M4 4l10 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Heading */}
              <h2 className="text-[1.45rem] font-bold text-white leading-snug pr-10">
                All you need to become a{" "}
                <span className="inline-flex items-center bg-[#FEEF3E] px-1.5 py-0.5 -rotate-1 text-[#141941] font-bold">
                  Professional
                </span>{" "}
                on Workdistro
              </h2>
            </div>

            {/* ── White body ── */}
            <div className="bg-white px-6 pt-7 pb-6">
              <div className="space-y-7">
                {requirements.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-[15px] font-bold text-[#141941] mb-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-[#1D1D1D] leading-snug"
                        >
                          <span
                            className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#1D1D1D] shrink-0"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="h-8" />

              {/* CTA */}
              <Link
                href="/application"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#31DE9E] text-white font-semibold text-base hover:bg-[#16A34A] transition"
              >
                Become a Professional
                <span className="text-lg leading-none" aria-hidden="true">↗</span>
              </Link>

              <p className="text-center text-xs text-gray-400 mt-3">
                Application takes about 3–5 minutes
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}