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

      {/* Profile photo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profile photo (upload) *
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (!file) return
            const reader = new FileReader()
            reader.onload = () => {
              const result = reader.result
              if (typeof result === "string") {
                setData((prev) => ({
                  ...prev,
                  avatarUrl: result,
                }))
              }
            }
            reader.readAsDataURL(file)
          }}
          className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
        />
        {data.avatarUrl && (
          <div className="mt-2 flex items-center gap-2">
            <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-300">
              <img src={data.avatarUrl} alt="Uploaded preview" className="h-full w-full object-cover" />
            </div>
            <p className="text-xs text-gray-500">Preview uploaded profile photo</p>
          </div>
        )}
        <p className="mt-1 text-xs text-gray-500">Clients see this when booking you.</p>
      </div>

      {/* Short bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Short bio (make clients comfortable) *
        </label>
        <textarea
          rows={3}
          className={inputClass}
          placeholder="Good with details and punctual, I give 100% to every task."
          value={data.shortBio ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              shortBio: e.target.value,
            }))
          }
        />
        <p className="mt-1 text-xs text-gray-500">At least 20 characters for trust.</p>
      </div>
    </div>
  )
}
