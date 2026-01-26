"use client"

import type {
  BookingData,
  GroceryDetails as GroceryDetailsType,
} from "../../types"

export default function GroceryDetails({
  data,
  setData,
}: {
  data: BookingData
  setData: React.Dispatch<React.SetStateAction<BookingData>>
}) {
  const grocery = data.grocery ?? {}

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"

    function formatNumber(value: string) {
  const digitsOnly = value.replace(/\D/g, "")
  if (!digitsOnly) return ""
  return Number(digitsOnly).toLocaleString("en-NG")
}

function parseNumber(value: string) {
  const digitsOnly = value.replace(/\D/g, "")
  return digitsOnly ? Number(digitsOnly) : undefined
}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-primary-500">
          Grocery shopping details 🛒
        </h2>
        <p className="text-sm text-gray-500">
          Service fee is ₦2,250. This helps us estimate your total cost.
        </p>
      </div>

      {/* Shopping list */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What’s your shopping list?
        </label>
        <textarea
          rows={4}
          className={inputClass}
          placeholder="Milk, rice, tomatoes..."
          value={grocery.list ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              grocery: {
                ...grocery,
                list: e.target.value,
              },
            }))
          }
        />
      </div>

      {/* Budget */}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estimated budget for items
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Not including service fee
        </p>

        <input
          type="text"
          inputMode="numeric"
          className={inputClass}
          placeholder="₦10,000"
          value={
            grocery.budget !== undefined
              ? formatNumber(String(grocery.budget))
              : ""
          }
          onChange={(e) => {
            const rawValue = e.target.value

            setData((prev) => ({
              ...prev,
              grocery: {
                ...grocery,
                budget: parseNumber(rawValue),
              },
            }))
          }}
        />
      </div>

      {/* Store preference */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shopping location preference
        </label>
        <input
          className={inputClass}
          placeholder="Market, supermarket, or store name"
          value={grocery.storePreference ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              grocery: {
                ...grocery,
                storePreference: e.target.value,
              },
            }))
          }
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Any specific brands or substitution instructions?{" "}
          <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea
          rows={3}
          className={inputClass}
          placeholder="If unavailable, substitute with..."
          value={grocery.notes ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              grocery: {
                ...grocery,
                notes: e.target.value,
              },
            }))
          }
        />
      </div>
    </div>
  )
}
