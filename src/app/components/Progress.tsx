"use client"

type Props = {
  current: number
  total: number
}

export default function Progress({ current, total }: Props) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="w-full p-4">
      <div className="text-sm text-gray-500 mb-2">
        Step {current} of {total}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 rounded-full bg-primary-500 transition-all"
        style={{ width: `${percentage}%` }}
      />

      </div>
    </div>
  )
}
