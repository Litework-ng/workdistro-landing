"use client"

import type { ApplicationData } from "../types"

type Props = {
  data: ApplicationData
  setData: React.Dispatch<React.SetStateAction<ApplicationData>>
}

export default function BasicInfoStep({ data, setData }: Props) {
  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-primary-500">
          Basic information
        </h2>
        <p className="text-sm text-gray-500">
          Please provide accurate details as they appear on your ID.
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full name *
        </label>
        <input
          className={inputClass}
          placeholder="As it appears on your ID"
          value={data.fullName ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              fullName: e.target.value,
            }))
          }
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone number (WhatsApp) *
        </label>
        <input
          className={inputClass}
          placeholder="+234 801 234 5678"
          value={data.phone ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
        />
        <p className="mt-1 text-xs text-gray-500">
          We’ll contact you via WhatsApp
        </p>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          type="email"
          className={inputClass}
          placeholder="you@email.com"
          value={data.email ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <p className="mt-1 text-xs text-gray-500">
          Optional – for updates
        </p>
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age *
        </label>
        <select
          className={inputClass}
          value={data.age ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              age: e.target.value as ApplicationData["age"],
            }))
          }
        >
          <option value="">Select age range</option>
          <option value="18-24">18–24</option>
          <option value="25-34">25–34</option>
          <option value="35-44">35–44</option>
          <option value="45-54">45–54</option>
          <option value="55+">55+</option>
        </select>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>
        <div className="space-y-2">
          {["Male", "Female", "Prefer not to say"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <input
                type="radio"
                name="gender"
                value={option}
                checked={data.gender === option}
                onChange={() =>
                  setData((prev) => ({
                    ...prev,
                    gender: option as ApplicationData["gender"],
                  }))
                }
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Which area of Lagos do you live in? *
        </label>
        <input
          className={inputClass}
          placeholder="E.g. Lekki, Yaba, Ikeja, Surulere"
          value={data.city ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              city: e.target.value,
            }))
          }
        />
      </div>
    </div>
  )
}
