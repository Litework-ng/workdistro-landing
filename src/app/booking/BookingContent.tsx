"use client"

import { useState, useEffect, useRef } from "react" 
import { trackEvent } from "../../lib/analytics"   

import FormShell from "../components/FormShell"
import type { BookingData } from "./types"

import WelcomeStep from "./steps/WelcomeStep"
import ServiceStep from "./steps/ServiceStep"
import CleaningDetails from "./steps/details/CleaningDetails"
import LaundryDetails from "./steps/details/LaundryDetails"
import GroceryDetails from "./steps/details/GroceryDetails"
import ScheduleStep from "./steps/ScheduleStep"
import ContactStep from "./steps/ContactStep"
import ReviewStep from "./steps/ReviewStep"
import BookingSuccess from "../components/BookingSuccess"
import { useSearchParams } from "next/navigation"

const STEPS = [
  {
    id: "service",
    component: ServiceStep,
    isValid: (data: BookingData) => !!data.service,
  },
  {
    id: "cleaning-details",
    component: CleaningDetails,
    condition: (data: BookingData) => data.service === "cleaning",
    isValid: (data: BookingData) => !!data.cleaning?.size,
  },
  {
    id: "laundry-details",
    component: LaundryDetails,
    condition: (data: BookingData) => data.service === "laundry",
    isValid: (data: BookingData) =>
      !!data.laundry?.loadSize &&
      !!data.laundry?.serviceType &&
      !!data.laundry?.deliverySpeed,
  },
  {
    id: "grocery-details",
    component: GroceryDetails,
    condition: (data: BookingData) => data.service === "grocery",
    isValid: (data: BookingData) =>
      !!data.grocery?.list && !!data.grocery?.budget,
  },
  {
    id: "schedule",
    component: ScheduleStep,
    isValid: (data: BookingData) =>
      !!data.schedule?.date && !!data.schedule?.time,
  },
  {
    id: "contact",
    component: ContactStep,
    isValid: (data: BookingData) =>
      !!data.contact?.name &&
      !!data.contact?.phone &&
      !!data.contact?.address,
  },
  {
    id: "review",
    component: ReviewStep,
  },
]

function estimatePrice(data: BookingData): number | null {
  if (!data.service) return null

  switch (data.service) {
    case "cleaning": {
      if (!data.cleaning?.size) return null
      const prices = {
        studio: 5000,
        "1-bedroom": 6000,
        "2-bedroom": 8000,
        "3-bedroom": 10000,
      } as const
      return prices[data.cleaning.size]
    }

    case "laundry": {
      if (!data.laundry?.loadSize) return null
      const loadPrices = {
        small: 3000,
        medium: 4500,
        large: 6000,
      } as const

      const base = loadPrices[data.laundry.loadSize]
      const ironingFee =
        data.laundry.serviceType !== "wash-fold" ? 1000 : 0
      const expressFee =
        data.laundry.deliverySpeed === "express" ? 1000 : 0

      return base + ironingFee + expressFee
    }

    case "grocery":
      return 2250

    default:
      return null
  }
}

export default function BookingPage() {  
  const searchParams = useSearchParams()  
  const workerId = searchParams.get("workerId")  
                  
  const bookingStartedFired = useRef(false)     // ← prevents double-firing

  const [data, setData] = useState<BookingData>({  
    service: null,  
  })

  // Fire booking_started once when the user picks a service  
   useEffect(() => {  
    if (data.service && !bookingStartedFired.current) {  
      bookingStartedFired.current = true  
      trackEvent("booking_started", {  
        service: data.service,  
        worker_id: workerId ?? undefined,  
      })  
    }  
  }, [data.service])

  async function submitBooking(  
    data: BookingData,  
    meta?: { estimatedPrice?: number | null }  
  ) {  
    const res = await fetch("/api/submitBooking", {  
      method: "POST",  
      headers: { "Content-Type": "application/json" },  
      body: JSON.stringify({  
        ...data,  
        workerId,  
        estimatedPrice: meta?.estimatedPrice ?? null,  
      }),  
    })

    const json = await res.json()

    if (!res.ok) {  
      throw new Error(json?.error || "Booking failed")  
    }

    // Fire booking_completed only on confirmed success  
    trackEvent("booking_completed", {  
      service: data.service,  
      estimated_price: meta?.estimatedPrice ?? null,  
      worker_id: workerId ?? undefined,  
    })  
  }

  return (  
    <FormShell  
      steps={STEPS}  
      data={data}  
      setData={setData}  
      WelcomeComponent={WelcomeStep}  
      SuccessComponent={BookingSuccess}  
      onSubmit={submitBooking}  
      estimatePrice={estimatePrice}  
      
    />  
  )  
}  
