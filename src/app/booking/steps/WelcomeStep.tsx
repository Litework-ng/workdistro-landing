"use client"

import { motion } from "framer-motion"

type Props = {
  onStart: () => void
}

export default function WelcomeStep({ onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <div className="rounded-3xl border border-white/10 bg-primary-500 p-8 shadow-xl">
        {/* Badge */}
        <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium
          bg-white/10 text-accent-500 border border-white/20">
          Welcome to Workdistro
        </span>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Do More.
          <span className="text-accent-500"> Stress Less.</span>
        </h1>

        {/* One-liner */}
        <p className="mt-4 text-gray-300 text-base">
          Book trusted help in minutes — without the stress.
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          className="mt-8 w-full rounded-xl bg-accent-500 px-6 py-4
            font-semibold text-primary-500 transition
            hover:bg-accent-500/90
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        >
          Start booking
        </button>

        {/* Micro reassurance */}
        <p className="mt-4 text-center text-xs text-gray-400">
          Takes under 2 minutes
        </p>
      </div>
    </motion.div>
  )
}
