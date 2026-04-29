"use client";

import Image from "next/image";
import Link from "next/link";

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

export default function Footer({ onOpenRequirements }: { onOpenRequirements: () => void }) {
  return (
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
                  onClick={onOpenRequirements}
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
  );
}