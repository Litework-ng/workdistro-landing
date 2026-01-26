import type { BookingData } from "../booking/types"

export default function BookingSuccess({
  data,
}: {
  data: BookingData
}) {
  return (
    <div className="w-full text-center space-y-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/10 text-3xl">
        ✅
      </div>

      <h2 className="text-2xl font-semibold text-primary-500">
        Booking confirmed
      </h2>

      <p className="text-gray-600">
        Your{" "}
        <span className="capitalize font-medium">
          {data.service ?? "service"}
        </span>{" "}
        request has been received successfully.
      </p>

      <div className="rounded-2xl border bg-gray-50 p-4 text-left space-y-2">
        <p className="text-sm font-medium text-gray-800">
          What happens next?
        </p>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Our team will review your request</li>
          <li>We’ll contact you shortly to confirm details</li>
          <li>You’ll get pricing and availability before work starts</li>
        </ul>
      </div>
    </div>
  )
}
