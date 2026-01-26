"use client"

import type {
  ApplicationData,
  PetComfort,
  ConvictionStatus,
  ReferenceStatus,
} from "../types"

type Props = {
  data: ApplicationData
  setData: React.Dispatch<React.SetStateAction<ApplicationData>>
}

export default function BackgroundStep({ data, setData }: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-primary-500">
          Background & commitment
        </h2>
        <p className="text-sm text-gray-500">
          Help us understand your motivation and work preferences
        </p>
      </div>

      {/* Motivation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Why do you want to work with Workdistro? *
        </label>
        <textarea
          rows={4}
          placeholder="2–3 sentences about your goals and availability"
          value={data.motivation ?? ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              motivation: e.target.value,
            }))
          }
          className="w-full rounded-xl border px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          Example: I need flexible work that fits around my studies. I'm reliable and hardworking.
        </p>
      </div>

      {/* Pets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Are you comfortable working with pets? *
        </label>
        <div className="space-y-2">
          {[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "depends", label: "Depends on the pet" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="pets"
                checked={data.petComfort === option.value}
                onChange={() =>
                  setData((prev) => ({
                    ...prev,
                    petComfort: option.value as PetComfort,
                  }))
                }
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Conviction */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Have you ever been convicted of a crime? *
        </label>
        <div className="space-y-2">
          {[
            { value: "no", label: "No" },
            {
              value: "yes",
              label: "Yes (this won’t automatically disqualify you)",
            },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="conviction"
                checked={data.hasConviction === option.value}
                onChange={() =>
                  setData((prev) => ({
                    ...prev,
                    hasConviction: option.value as ConvictionStatus,
                  }))
                }
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* References */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Can you provide references? *
        </label>
        <div className="space-y-2">
          {[
            {
              value: "two",
              label: "Yes, I have 2 people who can vouch for me",
            },
            {
              value: "one",
              label: "Yes, I have 1 reference",
            },
            {
              value: "can-get",
              label: "No, but I can get references",
            },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="references"
                checked={data.referenceStatus === option.value}
                onChange={() =>
                  setData((prev) => ({
                    ...prev,
                    referenceStatus: option.value as ReferenceStatus,
                  }))
                }
              />
              {option.label}
            </label>
          ))}
        </div>

        <p className="mt-2 text-xs text-gray-500">
          References can be employers, teachers, or community members.
        </p>
      </div>

          {/* Discovery Source */}      
          {/* Discovery source */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    How did you hear about this opportunity? *
  </label>

  <div className="space-y-2">
    {[
      { value: "friend-family", label: "Friend / Family" },
      {
        value: "social-media",
        label: "Social media (Instagram, Twitter, Facebook)",
      },
      { value: "whatsapp-group", label: "WhatsApp group" },
      { value: "campus", label: "University / Campus notice board" },
      {
        value: "job-board",
        label: "Online job board (Nairaland, etc.)",
      },
      { value: "estate", label: "Estate / Neighborhood" },
      { value: "other", label: "Other" },
    ].map((option) => (
      <label
        key={option.value}
        className="flex items-center gap-3 text-sm"
      >
        <input
          type="radio"
          name="discoverySource"
          checked={data.discoverySource === option.value}
          onChange={() =>
            setData((prev) => ({
              ...prev,
              discoverySource: option.value as any,
            }))
          }
        />
        {option.label}
      </label>
    ))}
  </div>
</div>

    </div>
  )
}
