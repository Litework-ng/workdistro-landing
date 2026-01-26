"use client"

import type { ApplicationData, ServiceType } from "../types"

type Props = {
  data: ApplicationData
  setData: React.Dispatch<React.SetStateAction<ApplicationData>>
}

const SERVICES: { id: ServiceType; label: string; note?: string }[] = [
  { id: "cleaning", label: "Home Cleaning" },
  {
    id: "laundry",
    label: "Laundry Service",
    note: "I have access to a washing machine or laundromat",
  },
  { id: "grocery", label: "Grocery Shopping" },
  { id: "errands", label: "Errands & Deliveries" },
  { id: "other", label: "Other" },
]

export default function ServicesStep({ data, setData }: Props) {
  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"

  const selectedServices = data.services ?? []

  function toggleService(service: ServiceType) {
    setData((prev) => {
      const services = prev.services ?? []
      return {
        ...prev,
        services: services.includes(service)
          ? services.filter((s) => s !== service)
          : [...services, service],
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-primary-500">
          Services you can provide
        </h2>
        <p className="text-sm text-gray-500">
          Select all services you’re comfortable offering
        </p>
      </div>

      {/* Services */}
      <div className="space-y-3">
        {SERVICES.map((service) => {
          const checked = selectedServices.includes(service.id)

          return (
            <label
              key={service.id}
              className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition
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
                onChange={() => toggleService(service.id)}
                className="mt-1"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {service.label}
                </p>
                {service.note && (
                  <p className="text-xs text-gray-500">
                    {service.note}
                  </p>
                )}
              </div>
            </label>
          )
        })}
      </div>

      {/* Other service */}
      {selectedServices.includes("other") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            If you selected “Other”, please specify
          </label>
          <input
            className={inputClass}
            placeholder="Describe the service you offer"
            value={data.otherService ?? ""}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                otherService: e.target.value,
              }))
            }
          />
        </div>
      )}

      {/* Experience level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you have experience in these services? *
        </label>
        <div className="space-y-2">
          {[
            {
              value: "professional",
              label: "Yes, professional experience (1+ years)",
            },
            {
              value: "informal",
              label: "Yes, informally for friends or family",
            },
            {
              value: "some",
              label: "Some experience (less than 1 year)",
            },
            {
              value: "none",
              label: "No experience, but willing to learn",
            },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <input
                type="radio"
                name="experience"
                checked={data.experienceLevel === option.value}
                onChange={() =>
                  setData((prev) => ({
                    ...prev,
                    experienceLevel: option.value as ApplicationData["experienceLevel"],
                  }))
                }
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Experience description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Briefly describe your relevant experience *
        </label>
        <p className="text-xs text-gray-500 mb-2">
          2–3 sentences is perfect
        </p>
        <textarea
          rows={4}
          className={inputClass}
          placeholder="E.g. I worked as a cleaner at Radisson Hotel for 3 years..."
          value={data.experienceDescription ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              experienceDescription: e.target.value,
            }))
          }
        />
      </div>
    </div>
  )
}
