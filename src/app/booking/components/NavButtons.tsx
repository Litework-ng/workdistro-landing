type Props = {
  index: number
  total: number
  onBack: () => void
  onNext: () => void
  canProceed: boolean
  isLastStep?: boolean
  isSubmitting?: boolean
}

export default function NavButtons({
  index,
  total,
  onBack,
  onNext,
  canProceed,
  isLastStep,
  isSubmitting,
}: Props) {
  return (
    <div className="sticky bottom-0 bg-white border-t px-4 py-4 flex gap-3">
      {index > 0 && (
        <button
          onClick={onBack}
          className="flex-1 border rounded-xl py-3"
        >
          Back
        </button>
      )}

      <button
        onClick={onNext}
        disabled={!canProceed || isSubmitting}
        className={`
          flex-1 rounded-xl py-3 text-white transition
          ${
            !canProceed || isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary-500"
          }
        `}
      >
        {isSubmitting
          ? "Submitting…"
          : isLastStep
          ? "Submit booking"
          : "Continue"}
      </button>
    </div>
  )
}
