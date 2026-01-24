"use client"

import type {
  BookingData,
  CleaningDetails as CleaningDetailsType,
} from "../../types"

export default function CleaningDetails({
  data,
  setData,
}: {
  data: BookingData
  setData: React.Dispatch<React.SetStateAction<BookingData>>
}) {
  const cleaning = data.cleaning ?? {}

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-primary-500">
          Cleaning details 🧼
        </h2>
        <p className="text-sm text-gray-500">
          Help us understand your space so we can prepare properly
        </p>
      </div>

      {/* Apartment size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What’s your apartment size?
        </label>
        <select
          className={inputClass}
          value={cleaning.size ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              cleaning: {
                ...cleaning,
                size: e.target.value as CleaningDetailsType["size"],
              },
            }))
          }
        >
          <option value="">Select size</option>
          <option value="studio">
            Studio / Self-Contain (₦5,000)
          </option>
          <option value="1-bedroom">
            1-Bedroom (₦6,000)
          </option>
          <option value="2-bedroom">
            2-Bedroom (₦8,000)
          </option>
          <option value="3-bedroom">
            3+ Bedroom (₦10,000)
          </option>
        </select>
      </div>

      {/* Special requirements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Any special requirements?{" "}
          <span className="text-gray-400">(Optional)</span>
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Deep cleaning, pets, sensitive surfaces, etc.
        </p>
        <textarea
          rows={3}
          className={inputClass}
          value={cleaning.extras?.join(", ") ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              cleaning: {
                ...cleaning,
                extras: e.target.value
                  ? e.target.value
                      .split(",")
                      .map((v) => v.trim())
                  : [],
              },
            }))
          }
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional cleaning notes{" "}
          <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea
          rows={3}
          className={inputClass}
          placeholder="Anything else we should know?"
          value={cleaning.notes ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              cleaning: {
                ...cleaning,
                notes: e.target.value,
              },
            }))
          }
        />
      </div>
    </div>
  )
}
