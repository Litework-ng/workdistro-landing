"use client"

import type { BookingData } from "../types"

type Props = {
  data: BookingData
  setData: React.Dispatch<React.SetStateAction<BookingData>>
}

export default function ScheduleStep({ data, setData }: Props) {
  const schedule = data.schedule ?? {}
const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary">
        When do you need this?
      </h2>

      {/* Date */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Preferred date
        </label>

        <input
          type="date"
          value={schedule.date ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              schedule: {
                ...prev.schedule,
                date: e.target.value,
              },
            }))
          }
          className={inputClass}
        />
      </div>

      {/* Time */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Preferred time
        </label>

        <select
          value={schedule.time ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              schedule: {
                ...prev.schedule,
                time: e.target.value,
              },
            }))
          }
          className={inputClass}
        >
          <option value="">Select time</option>
          <option value="morning">Morning (9am – 12pm)</option>
          <option value="afternoon">Afternoon (12pm – 3pm)</option>
          <option value="evening">Evening (3pm – 6pm)</option>
        </select>
      </div>
    </div>
  )
}
