"use client"

import type { ApplicationData } from "../types"

export default function AgreementStep({
  data,
  setData,
}: {
  data: ApplicationData
  setData: React.Dispatch<React.SetStateAction<ApplicationData>>
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-primary-500">
          Agreement & confirmation
        </h2>
        <p className="text-sm text-gray-500">
          Please review and confirm before continuing
        </p>
      </div>

      {/* Terms list */}
      <div className="rounded-2xl border bg-gray-50 p-4 space-y-3 text-sm text-gray-700">
        <p>I confirm that:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>All information provided is truthful and accurate</li>
          <li>I will undergo background verification (NIN/BVN check)</li>
          <li>I will maintain professional standards at all times</li>
          <li>
            Payment is <strong>85%</strong> of each job fee (Workdistro keeps
            15%)
          </li>
          <li>All bookings must go through the Workdistro platform</li>
          <li>I can be removed for poor performance or misconduct</li>
          <li>I will have valid ID documents available upon request</li>
          <li>I will provide references when requested</li>
        </ul>
      </div>

      {/* Agreement checkbox */}
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={data.agreedToTerms === true}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              agreedToTerms: e.target.checked,
            }))
          }
          className="mt-1"
        />
        <span className="text-sm text-gray-700">
          I understand and agree to these terms *
        </span>
      </label>

      {!data.agreedToTerms && (
        <p className="text-xs text-gray-500">
          You must agree before continuing.
        </p>
      )}
    </div>
  )
}
