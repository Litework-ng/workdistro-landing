"use client"

import { useState } from "react"
import FormShell from "../components/FormShell"
import type { ApplicationData } from "./types"

import WelcomeStep from "./steps/WelcomeStep"
import BasicInfoStep from "./steps/BasicInfoStep"
import ServicesStep from "./steps/ServicesStep"
import AvailabilityStep from "./steps/AvailabilityStep"
import  RequimentStep from "./steps/RequirementStep"
import BackgroundStep from "./steps/BackgroundStep"
import ReviewStep from "./steps/ReviewStep"
import AgreementStep from "./steps/AgreementStep"
import ApplicationSuccess from "../components/ApplicationSuccess"

const STEPS = [
  {
    id: "basic-info",
    component: BasicInfoStep,
    isValid: (data: ApplicationData) =>
      !!data.fullName && !!data.phone && !!data.city,
  },
  {
  id: "services",
  component: ServicesStep,
  isValid: (data: ApplicationData) => {
    if (!data.services?.length) return false
    if (!data.experienceLevel) return false
    if (!data.experienceDescription) return false
    if (data.services.includes("other") && !data.otherService) return false
    return true
  },
},

  {
  id: "availability",
  component: AvailabilityStep,
  isValid: (data: ApplicationData) => {
    if (!data.availabilityType) return false
    if (!data.workDays?.length) return false
    if (!data.workHours?.length) return false
    return true
  },
},
 {
  id: "requirements",
  component: RequimentStep,
  isValid: (data: ApplicationData) => {
    if (!data.idStatus) return false
    if (!data.hasBankAccount) return false
    if (data.hasSmartphone !== true) return false
    if (!data.transportMode) return false
    return true
  },
},
{
  id: "background",
  component: BackgroundStep,
  isValid: (data: ApplicationData) =>
    !!data.motivation &&
    data.motivation.trim().length >= 20 &&
    !!data.petComfort &&
    !!data.hasConviction &&
    !!data.referenceStatus,
},
{
  id: "background",
  component: BackgroundStep,
  isValid: (data: ApplicationData) =>
    !!data.motivation &&
    data.motivation.trim().length >= 20 &&
    !!data.petComfort &&
    !!data.hasConviction &&
    !!data.referenceStatus &&
    !!data.discoverySource,
},
{
  id: "agreement",
  component: AgreementStep,
  isValid: (data: ApplicationData) => data.agreedToTerms === true,
  },

  {
    id: "review",
    component: ReviewStep,
  },
]

async function submitApplication(data: ApplicationData) {
  const res = await fetch("/.netlify/functions/submitApplication", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result?.error ?? "Submission failed")
  }
}


export default function ApplicationPage() {
  const [data, setData] = useState<ApplicationData>({})

  return (
    <FormShell
  steps={STEPS}
  data={data}
  setData={setData}
  WelcomeComponent={WelcomeStep}
  SuccessComponent={ApplicationSuccess}
  onSubmit={submitApplication}
/>
  )
}
