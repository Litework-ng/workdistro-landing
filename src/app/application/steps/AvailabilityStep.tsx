"use client"

import type {
  ApplicationData,
  AvailabilityType,
  WorkDay,
  WorkHour,
} from "../types"

type Props = {
  data: ApplicationData
  setData: React.Dispatch<React.SetStateAction<ApplicationData>>
}

const AVAILABILITY_OPTIONS: {
  value: AvailabilityType
  label: string
}[] = [
  { value: "full-time", label: "Full-time (5–7 days/week)" },
  { value: "part-time", label: "Part-time (3–4 days/week)" },
  { value: "weekends", label: "Weekends only" },
  { value: "flexible", label: "Flexible / On-demand" },
  { value: "evenings", label: "Evenings only (after 5pm)" },
]

const DAYS: { value: WorkDay; label: string }[] = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
]

const HOURS: { value: WorkHour; label: string }[] = [
  { value: "early-morning", label: "Early morning (6am–9am)" },
  { value: "morning", label: "Morning (9am–12pm)" },
  { value: "afternoon", label: "Afternoon (12pm–3pm)" },
  { value: "late-afternoon", label: "Late afternoon (3pm–6pm)" },
  { value: "evening", label: "Evening (6pm–9pm)" },
]

export default function AvailabilityStep({ data, setData }: Props) {
  const toggleMulti = <T,>(
    key: "workDays" | "workHours",
    value: T
  ) => {
    setData((prev) => {
      const current = (prev[key] ?? []) as T[]
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-primary-500">
          Your availability
        </h2>
        <p className="text-sm text-gray-500">
          This helps us match you with the right requests
        </p>
      </div>

      {/* Availability type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What’s your availability? *
        </label>
        <div className="space-y-2">
          {AVAILABILITY_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <input
                type="radio"
                name="availability"
                checked={data.availabilityType === option.value}
                onChange={() =>
                  setData((prev) => ({
                    ...prev,
                    availabilityType: option.value,
                  }))
                }
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Work days */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Which days can you typically work? *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {DAYS.map((day) => {
            const checked = data.workDays?.includes(day.value)
            return (
              <label
                key={day.value}
                className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition
                  ${
                    checked
                      ? "border-accent-500 bg-accent-500/10"
                      : "border-gray-200"
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMulti("workDays", day.value)}
                />
                {day.label}
              </label>
            )
          })}
        </div>
      </div>

      {/* Work hours */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred working hours? *
        </label>
        <div className="space-y-2">
          {HOURS.map((hour) => {
            const checked = data.workHours?.includes(hour.value)
            return (
              <label
                key={hour.value}
                className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition
                  ${
                    checked
                      ? "border-accent-500 bg-accent-500/10"
                      : "border-gray-200"
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMulti("workHours", hour.value)}
                />
                {hour.label}
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}
