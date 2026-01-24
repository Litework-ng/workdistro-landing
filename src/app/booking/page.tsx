"use client"

import { useState } from "react"
import FormShell from "./components/FormShell"
import type { BookingData } from "./types"

import ServiceStep from "./steps/ServiceStep"
import CleaningDetails from "./steps/details/CleaningDetails"
import LaundryDetails from "./steps/details/LaundryDetails"
import GroceryDetails from "./steps/details/GroceryDetails"
import ScheduleStep from "./steps/ScheduleStep"
import ContactStep from "./steps/ContactStep"
import ReviewStep from "./steps/ReviewStep"

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
    isValid: (data: BookingData) => !!data.schedule?.date,
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
    isValid: () => true,
  },
]

export default function BookingPage() {
  const [data, setData] = useState<BookingData>({
    service: null,
  })

  return <FormShell steps={STEPS} data={data} setData={setData} />
}
