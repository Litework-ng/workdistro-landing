"use client"

import type { BookingData } from "../types"

type Props = {
  data: BookingData
  setData: React.Dispatch<React.SetStateAction<BookingData>>
}

export default function ContactStep({ data, setData }: Props) {
  const contact = data.contact ?? {}
  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary">
        Your contact details
      </h2>

      {/* Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Full name
        </label>

        <input
          type="text"
          value={contact.name ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              contact: {
                ...prev.contact,
                name: e.target.value,
              },
            }))
          }
          className={inputClass}
          placeholder="John Doe"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Phone number (WhatsApp)
        </label>

        <input
          type="tel"
          value={contact.phone ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              contact: {
                ...prev.contact,
                phone: e.target.value,
              },
            }))
          }
          className={inputClass}
          placeholder="0801 234 5678"
        />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Service address
        </label>

        <textarea
          value={contact.address ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              contact: {
                ...prev.contact,
                address: e.target.value,
              },
            }))
          }
          className={inputClass}
          rows={3}
          placeholder="Street, estate, nearest landmark"
        />
      </div>
    </div>
  )
}
