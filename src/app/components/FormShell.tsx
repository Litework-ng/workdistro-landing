"use client"

import { useState, useEffect } from "react"
import Progress from "./Progress"
import NavButtons from "./NavButtons"
import { trackEvent } from "../../lib/analytics"

type Step<T> = {
  id: string
  component: React.ComponentType<{
    data: T
    setData: React.Dispatch<React.SetStateAction<T>>
  }>
  condition?: (data: T) => boolean
  isValid?: (data: T) => boolean
}

type Props<T> = {
  steps: Step<T>[]
  data: T
  setData: React.Dispatch<React.SetStateAction<T>>
  WelcomeComponent: React.ComponentType<{ onStart: () => void }>
  SuccessComponent: React.ComponentType<{ data: T }>
  onSubmit: (data: T, meta?: { estimatedPrice?: number | null }) => Promise<void>
  estimatePrice?: (data: T) => number | null
  conversionEvent?: string
}

export default function FormShell<T>({
  steps,
  data,
  setData,
  WelcomeComponent,
  SuccessComponent,
  onSubmit,
  estimatePrice,
  conversionEvent,
}: Props<T>) {
  const [index, setIndex] = useState(-1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

  const visibleSteps = steps.filter(
    (step) => !step.condition || step.condition(data)
  )

  const currentStep = visibleSteps[index]
  const isLastStep = index === visibleSteps.length - 1
  const canProceed = currentStep?.isValid ? currentStep.isValid(data) : true

  // Optional live estimate (booking only)
  useEffect(() => {
    if (estimatePrice) {
      setEstimatedPrice(estimatePrice(data))
    }
  }, [data, estimatePrice])

  async function handleSubmit() {
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      await onSubmit(data, { estimatedPrice })
      setSubmitted(true)
      if (conversionEvent) {  
        trackEvent(conversionEvent, {  
          estimated_price: estimatedPrice ?? undefined,  
        })  
      }  
    } catch (err: any) {
      console.error(err)
      setErrorMessage(
        err?.message ?? "Something went wrong. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- Welcome ---
  if (index === -1) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex items-center px-4">
        <WelcomeComponent onStart={() => setIndex(0)} />
      </div>
    )
  }

  // --- Success ---
if (submitted) {
  return (
    <div className="max-w-md mx-auto min-h-screen flex items-center px-4">
      <SuccessComponent data={data} />
    </div>
  )
}


  const StepComponent = currentStep.component

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      <Progress current={index + 1} total={visibleSteps.length} />

      <div className="flex-1 px-4 py-8 pb-48 overflow-y-auto">
        <StepComponent data={data} setData={setData} />

        {estimatedPrice && (
          <p className="mt-4 text-sm font-medium text-gray-700">
            Estimated Price: ₦{estimatedPrice.toLocaleString()}
          </p>
        )}

        {errorMessage && (
          <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>

      <NavButtons
        index={index}
        total={visibleSteps.length}
        canProceed={canProceed}
        isLastStep={isLastStep}
        isSubmitting={isSubmitting}
        onBack={() => setIndex((i) => Math.max(i - 1, 0))}
        onNext={() => {
          if (!canProceed || isSubmitting) return
          if (isLastStep) handleSubmit()
          else setIndex((i) => i + 1)
        }}
      />
    </div>
  )
}
