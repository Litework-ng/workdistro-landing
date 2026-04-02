"use client"

import Image from "next/image"
import { trackEvent } from "../../../lib/analytics"

type Props = {
  onStart: () => void
}

export default function WelcomeStep({ onStart }: Props) {
  const handleStart = () => {
    trackEvent("booking_started")
    onStart()
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');

        .wlc { font-family: 'Manrope', sans-serif; }

        /* Full-bleed scene */
        .wlc-scene {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          overflow: hidden;
        }

        /* Dark overlay — warm tint, not cold grey */
        .wlc-overlay {
          position: absolute;
          inset: 0;
         background: linear-gradient(
            160deg,
            rgba(8, 10, 18, 0.82) 0%,
            rgba(10, 13, 22, 0.75) 50%,
            rgba(8, 10, 18, 0.88) 100%
          );
          z-index: 1;
        }

        /* Content sits above overlay */
        .wlc-content {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* The card — slightly transparent so image bleeds through subtly */
        .wlc-card {
          width: 100%;
          max-width: 380px;
         background: rgba(18, 22, 35, 0.88)
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px 36px 36px;
          position: relative;
          overflow: hidden;
        }

        /* Single emerald accent line — unchanged, still the only decoration */
        .wlc-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 36px;
          right: 36px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #31DE9E 30%,
            #31DE9E 70%,
            transparent
          );
          opacity: 0.7;
        }

        .wlc-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #31DE9E;
          margin-bottom: 20px;
        }

        .wlc-headline {
          font-size: 32px;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #F5F0E8;
          margin-bottom: 16px;
        }

        .wlc-body {
          font-size: 14px;
          font-weight: 400;
          line-height: 1.75;
          color: #ccc;
          margin-bottom: 32px;
        }

        .wlc-body strong {
          color: #fff;
          font-weight: 500;
        }

        .wlc-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 24px;
        }

        .wlc-services {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 36px;
        }

        .wlc-service-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .wlc-service-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #31DE9E;
          opacity: 0.6;
          flex-shrink: 0;
        }

        .wlc-service-label {
          font-size: 13px;
          font-weight: 500;
          color: #ddd;
        }

        /* CTA — cream on dark, premium */
        .wlc-btn {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          background: #F5F0E8;
          color: #0D0A08;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.01em;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .wlc-btn:hover {
          background: #ffffff;
          transform: translateY(-1px);
        }

        .wlc-btn:active {
          transform: translateY(0);
          background: #e8e3da;
        }

        /* Footnote — floats below card, readable against image */
        .wlc-footnote {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          text-align: center;
          margin-top: 16px;
          letter-spacing: 0.04em;
        }

        /* Staggered entrance */
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .wlc-card     { animation: riseIn 0.7s ease forwards; }
        .wlc-eyebrow  { animation: riseIn 0.55s 0.12s ease both; opacity: 0; }
        .wlc-headline { animation: riseIn 0.55s 0.20s ease both; opacity: 0; }
        .wlc-body     { animation: riseIn 0.55s 0.28s ease both; opacity: 0; }
        .wlc-divider  { animation: riseIn 0.4s  0.36s ease both; opacity: 0; }
        .wlc-services { animation: riseIn 0.5s  0.40s ease both; opacity: 0; }
        .wlc-btn      { animation: riseIn 0.5s  0.50s ease both; opacity: 0; }
        .wlc-footnote { animation: riseIn 0.4s  0.58s ease both; opacity: 0; }
      `}</style>

      <div className="wlc wlc-scene">

        {/* Background image — swap src for your chosen image */}
        <Image
          src="/images/booking-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />

        {/* Warm dark overlay */}
        <div className="wlc-overlay" />

        {/* Card + footnote */}
        <div className="wlc-content">
          <div className="wlc-card">

            <p className="wlc-eyebrow">Workdistro</p>

            <h1 className="wlc-headline">
              Reliable help,<br />
              when you need it.
            </h1>

            <p className="wlc-body">
              Finding someone you can actually trust to show
              up and do the job right shouldn&apos;t be this hard.{" "}
              <strong>We&apos;ve made it simple.</strong>
            </p>

            <div className="wlc-divider" />

            <div className="wlc-services">
              {[
                "Home cleaning",
                "Laundry & ironing",
                "Grocery shopping",
              ].map((s) => (
                <div key={s} className="wlc-service-row">
                  <div className="wlc-service-dot" />
                  <span className="wlc-service-label">{s}</span>
                </div>
              ))}
            </div>

            <button className="wlc-btn" onClick={handleStart}>
              Book a Service
            </button>

          </div>

          <p className="wlc-footnote">
            Takes under 2 minutes &nbsp;·&nbsp; No account needed
          </p>
        </div>

      </div>
    </>
  )
}