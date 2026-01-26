"use client"

type Props = {
  onStart: () => void
}

export default function WelcomeStep({ onStart }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Brand line */}
        <p className="text-sm font-medium text-primary-500 tracking-wide">
          Do More. Stress Less.
        </p>

        {/* Headline */}
        <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
          Apply to work with Workdistro
        </h1>

        {/* Value prop */}
        <p className="text-gray-600 text-base leading-relaxed">
          We connect reliable service providers with real customers —
          cleaning, laundry, grocery shopping, and more.
        </p>

        {/* What to expect */}
        <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3">
          <p className="text-sm font-medium text-gray-800">
            What to expect:
          </p>

          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Takes about 3–5 minutes</li>
            <li>• No payments required</li>
            <li>• We’ll review and contact you shortly</li>
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full rounded-xl bg-primary-500 py-3 text-white font-medium hover:bg-primary-600 transition"
        >
          Start application
        </button>

        {/* Trust footer */}
        <p className="text-xs text-gray-400">
          We only accept providers we can trust — and we respect your time.
        </p>
      </div>
    </div>
  )
}
