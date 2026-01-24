"use client"

import { useState, useEffect } from "react"
import type { BookingData } from "../types"
import Progress from "./Progress"
import NavButtons from "./NavButtons"
import WelcomeStep from "../steps/WelcomeStep"

type Step = {
  id: string
  component: React.ComponentType<{
    data: BookingData
    setData: React.Dispatch<React.SetStateAction<BookingData>>
  }>
  condition?: (data: BookingData) => boolean
  isValid?: (data: BookingData) => boolean
}

type Props = {
  steps: Step[]
  data: BookingData
  setData: React.Dispatch<React.SetStateAction<BookingData>>
}

export default function FormShell({ steps, data, setData }: Props) {
  const [index, setIndex] = useState(-1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

  // Filter visible steps based on conditions
  const visibleSteps = steps.filter(
    (step) => !step.condition || step.condition(data)
  )

  const currentStep = visibleSteps[index]
  const isLastStep = index === visibleSteps.length - 1
  const canProceed = currentStep?.isValid ? currentStep.isValid(data) : true

  // Live estimate
  useEffect(() => {
    setEstimatedPrice(estimatePrice(data))
  }, [data])

  // Price estimation
  function estimatePrice(data: BookingData): number | null {
    if (!data.service) return null

    switch (data.service) {
      case "cleaning": {
        const size = data.cleaning?.size
        if (!size) return null
        const priceMap: Record<"studio" | "1-bedroom" | "2-bedroom" | "3-bedroom", number> = {
          studio: 5000,
          "1-bedroom": 6000,
          "2-bedroom": 8000,
          "3-bedroom": 10000,
        }
        return priceMap[size]
      }

      case "laundry": {
        const loadSize = data.laundry?.loadSize
        if (!loadSize) return null
        const loadPriceMap: Record<"small" | "medium" | "large", number> = {
          small: 3000,
          medium: 4500,
          large: 6000,
        }
        const base = loadPriceMap[loadSize]
        const ironingFee = data.laundry?.serviceType && data.laundry.serviceType !== "wash-fold" ? 1000 : 0
        const expressFee = data.laundry?.deliverySpeed === "express" ? 1000 : 0
        return base + ironingFee + expressFee
      }

      case "grocery":
        return 2250

      default:
        return null
    }
  }

  // Handle submission via Netlify function
 async function handleSubmit() {
  setErrorMessage(null)
  setIsSubmitting(true)

  try {
    const response = await fetch("/.netlify/functions/submitBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, estimatedPrice }),
    })

    // 🔐 Netlify-safe content check
    const contentType = response.headers.get("content-type")
    const isJson = contentType?.includes("application/json")

    const result = isJson ? await response.json() : null

    if (!response.ok) {
      console.error("Submission failed:", result)
      setErrorMessage(
        result?.error ??
          "Submission failed. Please try again in a moment."
      )
      return
    }

    setSubmitted(true)
  } catch (err) {
    console.error("Network / function error:", err)
    setErrorMessage("Network error. Please check your connection.")
  } finally {
    setIsSubmitting(false)
  }
}


  // --- Render welcome step ---
  if (index === -1) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex items-center px-4">
        <WelcomeStep onStart={() => setIndex(0)} />
      </div>
    )
  }

  // --- Render success step ---
  if (submitted) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex items-center px-4">
        <div className="w-full text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/10 text-3xl">
            ✅
          </div>
          <h2 className="text-2xl font-semibold text-primary-500">Booking confirmed</h2>
          <p className="text-gray-600">
            Your <span className="capitalize font-medium">{data.service}</span> request has been received successfully.
          </p>
          <div className="rounded-2xl border bg-gray-50 p-4 text-left space-y-2">
            <p className="text-sm font-medium text-gray-800">What happens next?</p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Our team will review your request</li>
              <li>We’ll contact you shortly to confirm details</li>
              <li>You’ll get pricing and availability before work starts</li>
            </ul>
          </div>
          <p className="text-xs text-gray-500">
            Need to make a change? You can reply directly when we contact you.
          </p>
        </div>
      </div>
    )
  }

  // --- Render current step ---
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
