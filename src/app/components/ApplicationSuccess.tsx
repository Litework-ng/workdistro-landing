export default function ApplicationSuccess() {
  return (
    <div className="w-full text-center space-y-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/10 text-3xl">
        🎉
      </div>

      <h2 className="text-2xl font-semibold text-primary-500">
        Application received
      </h2>

      <p className="text-gray-600">
        Thank you for applying to work with <strong>Workdistro</strong>.
      </p>

      <div className="rounded-2xl border bg-gray-50 p-4 text-left space-y-2">
        <p className="text-sm font-medium text-gray-800">
          What happens next?
        </p>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Our team will review your application</li>
          <li>We’ll verify your details (ID & availability)</li>
          <li>If approved, we’ll contact you via WhatsApp</li>
          <li>You’ll start receiving job opportunities</li>
        </ul>
      </div>

      <p className="text-xs text-gray-500">
        This usually takes 24–72 hours.
      </p>

      <div className="rounded-xl bg-primary-500/10 p-3 text-sm text-primary-700">
        We appreciate your interest in building with us 💙
      </div>
    </div>
  )
}
