"use client"

import type {
  ApplicationData,
  IdStatus,
  BankAccountStatus,
  TransportMode,
} from "../types"

type Props = {
  data: ApplicationData
  setData: React.Dispatch<React.SetStateAction<ApplicationData>>
}

export default function RequirementsStep({ data, setData }: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-primary-500">
          Requirements check
        </h2>
        <p className="text-sm text-gray-500">
          Just a few things we need to confirm before moving forward
        </p>
      </div>

      {/* ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you have a valid Nigerian ID? *
        </label>
        <div className="space-y-2">
          {[
            { value: "nin", label: "Yes, I have NIN (National ID Number)" },
            { value: "bvn", label: "Yes, I have BVN (Bank Verification Number)" },
            { value: "both", label: "Yes, I have both NIN and BVN" },
            { value: "none-but-can-get", label: "No, but I can get one" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="idStatus"
                checked={data.idStatus === option.value}
                onChange={() =>
                  setData((prev) => ({
                    ...prev,
                    idStatus: option.value as IdStatus,
                  }))
                }
              />
              {option.label}
            </label>
          ))}
        </div>

        <p className="mt-2 text-xs text-gray-500">
          You must have NIN or BVN to work with Workdistro. We’ll verify this before you start.
        </p>
      </div>

      {/* Bank account */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you have a bank account for payments? *
        </label>
        <div className="space-y-2">
          {[
            { value: "yes", label: "Yes" },
            { value: "no-but-can-open", label: "No, but I can open one" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="bankAccount"
                checked={data.hasBankAccount === option.value}
                onChange={() =>
                  setData((prev) => ({
                    ...prev,
                    hasBankAccount: option.value as BankAccountStatus,
                  }))
                }
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Smartphone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you have a smartphone with WhatsApp? *
        </label>
        <div className="space-y-2">
          {[
            { value: true, label: "Yes (required for job notifications)" },
            { value: false, label: "No" },
          ].map((option) => (
            <label key={String(option.value)} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="smartphone"
                checked={data.hasSmartphone === option.value}
                onChange={() =>
                  setData((prev) => ({
                    ...prev,
                    hasSmartphone: option.value,
                  }))
                }
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Transport */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Can you get to jobs in your area easily? *
        </label>
        <div className="space-y-2">
          {[
            { value: "own-transport", label: "Yes, I have my own transport (car/bike)" },
            { value: "public", label: "Yes, I use public transport" },
            { value: "walking", label: "Yes, I can walk to nearby locations" },
            { value: "depends", label: "Sometimes — depends on location" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="transport"
                checked={data.transportMode === option.value}
                onChange={() =>
                  setData((prev) => ({
                    ...prev,
                    transportMode: option.value as TransportMode,
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
