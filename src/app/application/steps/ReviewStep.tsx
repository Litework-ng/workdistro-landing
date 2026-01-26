"use client"

import type { ApplicationData } from "../types"

export default function ApplicationReviewStep({
  data,
}: {
  data: ApplicationData
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-primary-500">
          Review your application
        </h2>
        <p className="text-sm text-gray-500">
          Please confirm everything looks correct before submitting
        </p>
      </div>

      {/* Basic info */}
      <ReviewSection title="Personal details">
        <p><strong>Name:</strong> {data.fullName}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        {data.email && <p><strong>Email:</strong> {data.email}</p>}
        <p><strong>City:</strong> {data.city}</p>
        {data.age && <p><strong>Age range:</strong> {data.age}</p>}
        {data.gender && <p><strong>Gender:</strong> {data.gender}</p>}
      </ReviewSection>

      {/* Services */}
      <ReviewSection title="Services you can provide">
        <ul className="list-disc list-inside">
          {data.services?.map((service) => (
            <li key={service} className="capitalize">
              {service.replace("-", " ")}
            </li>
          ))}
        </ul>

        {data.otherService && (
          <p className="text-sm text-gray-600 mt-1">
            Other: {data.otherService}
          </p>
        )}

        {data.experienceLevel && (
          <p className="mt-2 text-sm">
            <strong>Experience level:</strong>{" "}
            {humanizeExperience(data.experienceLevel)}
          </p>
        )}

        {data.experienceDescription && (
          <p className="text-sm text-gray-700 mt-1">
            “{data.experienceDescription}”
          </p>
        )}
      </ReviewSection>

      {/* Availability */}
      <ReviewSection title="Availability">
        {data.availabilityType && (
          <p className="capitalize">
            {humanizeAvailability(data.availabilityType)}
          </p>
        )}

        {data.workDays?.length && (
          <p className="text-sm">
            <strong>Days:</strong>{" "}
            {data.workDays.map(capitalize).join(", ")}
          </p>
        )}

        {data.workHours?.length && (
          <p className="text-sm">
            <strong>Hours:</strong>{" "}
            {data.workHours.map(humanizeHour).join(", ")}
          </p>
        )}
      </ReviewSection>

      {/* Requirements */}
      <ReviewSection title="Requirements check">
        <ul className="list-disc list-inside">
          {data.idStatus && (
            <li>Valid ID: {humanizeIdStatus(data.idStatus)}</li>
          )}
          {data.hasBankAccount && (
            <li>Bank account: {humanizeBank(data.hasBankAccount)}</li>
          )}
          {data.hasSmartphone !== undefined && (
            <li>Smartphone with WhatsApp: {data.hasSmartphone ? "Yes" : "No"}</li>
          )}
          {data.transportMode && (
            <li>Transport: {humanizeTransport(data.transportMode)}</li>
          )}
        </ul>
      </ReviewSection>

      {/* Background & commitment */}
      <ReviewSection title="Background & commitment">
        {data.motivation && (
          <p className="text-gray-700">
            “{data.motivation}”
          </p>
        )}

        <ul className="list-disc list-inside mt-2 text-sm">
          {data.petComfort && (
            <li>Comfortable with pets: {humanizePet(data.petComfort)}</li>
          )}
          {data.hasConviction && (
            <li>Criminal record: {data.hasConviction === "no" ? "No" : "Yes"}</li>
          )}
          {data.referenceStatus && (
            <li>References: {humanizeReference(data.referenceStatus)}</li>
          )}
        </ul>
      </ReviewSection>

      {/* Discovery */}
      {data.discoverySource && (
        <ReviewSection title="How you heard about Workdistro">
          <p className="capitalize">
            {humanizeDiscovery(data.discoverySource)}
          </p>
        </ReviewSection>
      )}

      {/* Reassurance */}
      <div className="rounded-2xl bg-accent-500/10 p-4 text-sm text-gray-700">
        <p className="font-medium">You’re all set 🎉</p>
        <p className="mt-1">
          Once submitted, our team will review your application and contact you
          via WhatsApp if you’re approved.
        </p>
      </div>
    </div>
  )
}

/* ---------- Helpers ---------- */

function ReviewSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border p-4 space-y-1">
      <h3 className="font-medium text-primary-600">{title}</h3>
      {children}
    </div>
  )
}

const capitalize = (v: string) => v.charAt(0).toUpperCase() + v.slice(1)

const humanizeExperience = (v: string) =>
  ({
    professional: "Professional experience (1+ years)",
    informal: "Informal experience (friends or family)",
    none: "No experience, willing to learn",
    some: "Some experience (less than 1 year)",
  } as const)[v]

const humanizeAvailability = (v: string) =>
  ({
    "full-time": "Full-time (5–7 days/week)",
    "part-time": "Part-time (3–4 days/week)",
    weekends: "Weekends only",
    flexible: "Flexible / on-demand",
    evenings: "Evenings only",
  } as const)[v]

const humanizeHour = (v: string) =>
  ({
    "early-morning": "Early morning (6am–9am)",
    morning: "Morning (9am–12pm)",
    afternoon: "Afternoon (12pm–3pm)",
    "late-afternoon": "Late afternoon (3pm–6pm)",
    evening: "Evening (6pm–9pm)",
  } as const)[v]

const humanizeIdStatus = (v: string) =>
  ({
    nin: "NIN",
    bvn: "BVN",
    both: "NIN & BVN",
    "none-but-can-get": "Will obtain NIN/BVN",
  } as const)[v]

const humanizeBank = (v: string) =>
  ({
    yes: "Yes",
    "no-but-can-open": "Can open one",
  } as const)[v]

const humanizeTransport = (v: string) =>
  ({
    "own-transport": "Own transport",
    public: "Public transport",
    walking: "Walking distance",
    depends: "Depends on location",
  } as const)[v]

const humanizePet = (v: string) =>
  ({
    yes: "Yes",
    no: "No",
    depends: "Depends on the pet",
  } as const)[v]

const humanizeReference = (v: string) =>
  ({
    two: "2 references",
    one: "1 reference",
    "can-get": "Can provide references",
  } as const)[v]

const humanizeDiscovery = (v: string) =>
  ({
    "friend-family": "Friend or family",
    "social-media": "Social media",
    "whatsapp-group": "WhatsApp group",
    campus: "Campus notice board",
    "job-board": "Online job board",
    estate: "Estate / neighborhood",
    other: "Other",
  } as const)[v]
