"use client"

import type { BookingData, ServiceType } from "../types"

const SERVICES: {
  id: ServiceType
  title: string
  description: string
  icon: string
}[] = [
  { id: "cleaning", title: "Home Cleaning", description: "Apartments & houses", icon: "🏠" },
  { id: "laundry", title: "Laundry", description: "Wash, dry & fold", icon: "👕" },
  { id: "grocery", title: "Grocery Shopping", description: "Done for you", icon: "🛒" },
]

export default function ServiceStep({
  data,
  setData,
}: {
  data: BookingData
  setData: React.Dispatch<React.SetStateAction<BookingData>>
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-primary-500">
        What do you need help with?
      </h2>

      <div className="grid gap-4">
        {SERVICES.map((s) => {
          const selected = data.service === s.id
          return (
            <button
              key={s.id}
              onClick={() =>
                setData((prev) => ({ ...prev, service: s.id }))
              }
              className={`p-5 rounded-2xl border flex gap-4 text-left transition ${
                selected
                  ? "border-accent-500 bg-accent-500/10"
                  : "border-gray-200"
              }`}
            >
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="font-medium text-primary-500">
                  {s.title}
                </div>
                <div className="text-sm text-gray-500">
                  {s.description}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
