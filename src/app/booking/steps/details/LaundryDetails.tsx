"use client"

import type {
  BookingData,
  LaundryDetails as LaundryDetailsType,
} from "../../types"

export default function LaundryDetails({
  data,
  setData,
}: {
  data: BookingData
  setData: React.Dispatch<React.SetStateAction<BookingData>>
}) {
  const laundry = data.laundry ?? {}

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-primary-500">
          Laundry details 👕
        </h2>
        <p className="text-sm text-gray-500">
          Tell us what you’re sending so we can price it accurately
        </p>
      </div>

      {/* Load size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What’s your load size?
        </label>
        <select
          className={inputClass}
          value={laundry.loadSize ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              laundry: {
                ...laundry,
                loadSize: e.target.value as LaundryDetailsType["loadSize"],
              },
            }))
          }
        >
          <option value="">Select load size</option>
          <option value="small">
            Small (1 bag, ~10 items) – ₦3,000
          </option>
          <option value="medium">
            Medium (2 bags, ~20 items) – ₦4,500
          </option>
          <option value="large">
            Large (3+ bags, 30+ items) – ₦6,000
          </option>
        </select>
      </div>

      {/* Service type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What service do you need?
        </label>
        <select
          className={inputClass}
          value={laundry.serviceType ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              laundry: {
                ...laundry,
                serviceType:
                  e.target.value as LaundryDetailsType["serviceType"],
              },
            }))
          }
        >
          <option value="">Select service</option>
          <option value="wash-fold">Wash & Fold</option>
          <option value="wash-iron">
            Wash & Iron (+ ironing fee)
          </option>
          <option value="iron-only">
            Iron Only (+ ironing fee)
          </option>
        </select>
        <p className="mt-1 text-xs text-gray-500">
          Ironing requires extra handling and is priced separately
        </p>
      </div>

      {/* Delivery speed */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Delivery speed
        </label>
        <select
          className={inputClass}
          value={laundry.deliverySpeed ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              laundry: {
                ...laundry,
                deliverySpeed:
                  e.target.value as LaundryDetailsType["deliverySpeed"],
              },
            }))
          }
        >
          <option value="">Select delivery speed</option>
          <option value="standard">
            Standard (24–48 hours)
          </option>
          <option value="express">
            Express (Same-day delivery + ₦1,000)
          </option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Any delicate items or special instructions?{" "}
          <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea
          rows={3}
          className={inputClass}
          placeholder="E.g. white shirts need gentle wash"
          value={laundry.notes ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              laundry: {
                ...laundry,
                notes: e.target.value,
              },
            }))
          }
        />
      </div>
    </div>
  )
}
