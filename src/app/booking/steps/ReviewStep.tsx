"use client"

import type { BookingData } from "../types"

type Props = {
  data: BookingData
  setData: React.Dispatch<React.SetStateAction<BookingData>>
}

export default function ReviewStep({ data }: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-primary">
          Almost done 🎉
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Take a moment to review your request. Everything looks good so far.
        </p>
      </div>

      {/* Service summary */}
      <SummaryCard title="Service selected">
        <p className="capitalize font-medium text-gray-900">
          {data.service}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          You can always change this before submitting
        </p>
      </SummaryCard>

      {/* Cleaning */}
      {data.service === "cleaning" && data.cleaning && (
        <SummaryCard title="Cleaning details 🧼">
          <Row label="Apartment size">
            {humanizeCleaningSize(data.cleaning.size)}
          </Row>

          {data.cleaning.extrasText ? (
            <Row label="Special requirements">
              {data.cleaning.extrasText}
            </Row>
          ) : (
            <Muted>No special requirements added</Muted>
          )}

          {data.cleaning.notes && (
            <Row label="Additional notes">
              {data.cleaning.notes}
            </Row>
          )}
        </SummaryCard>
      )}

      {/* Laundry */}
      {data.service === "laundry" && data.laundry && (
        <SummaryCard title="Laundry details 👕">
          <Row label="Load size">
            {humanizeLaundryLoad(data.laundry.loadSize)}
          </Row>

          <Row label="Delivery speed">
            {data.laundry.deliverySpeed === "express"
              ? "Express (Same day +₦1,000)"
              : "Standard (24–48 hours)"}
          </Row>

          <Row label="Ironing">
            {data.laundry.serviceType ? "Included" : "Not included"}
          </Row>

          {data.laundry.notes ? (
            <Row label="Special instructions">
              {data.laundry.notes}
            </Row>
          ) : (
            <Muted>No special instructions</Muted>
          )}
        </SummaryCard>
      )}

      {/* Grocery */}
      {data.service === "grocery" && data.grocery && (
        <SummaryCard title="Grocery shopping 🛒">
          <Row label="Shopping list">
            {data.grocery.list}
          </Row>

          {data.grocery.budget && (
            <Row label="Estimated item budget">
              ₦{data.grocery.budget.toLocaleString()}
            </Row>
          )}

          {data.grocery.storePreference && (
            <Row label="Preferred store">
              {data.grocery.storePreference}
            </Row>
          )}

          {data.grocery.notes ? (
            <Row label="Substitution notes">
              {data.grocery.notes}
            </Row>
          ) : (
            <Muted>No substitution instructions</Muted>
          )}

          <p className="text-xs text-gray-500 mt-3">
            Service fee of ₦2,250 will be added separately
          </p>
        </SummaryCard>
      )}

      {/* Schedule */}
      {data.schedule && (
        <SummaryCard title="When should we come? 📅">
          <Row label="Date">{data.schedule.date}</Row>
          <Row label="Time">{data.schedule.time}</Row>
        </SummaryCard>
      )}

      {/* Contact */}
      {data.contact && (
        <SummaryCard title="Contact & location 📍">
          <Row label="Name">{data.contact.name}</Row>
          <Row label="Phone">{data.contact.phone}</Row>
          <Row label="Address">
            {data.contact.address}
          </Row>
        </SummaryCard>
      )}

      {/* Confidence message */}
      <div className="rounded-xl bg-accent-50 border border-accent-100 p-4">
        <p className="text-sm text-accent-700">
          ✨ You’re all set. Once you submit, we’ll take it from
          here and keep you updated.
        </p>
      </div>
    </div>
  )
}

/* ---------- Small helpers ---------- */

function SummaryCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 space-y-3">
      <h3 className="font-medium text-primary">{title}</h3>
      {children}
    </div>
  )
}

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm text-gray-800">{children}</p>
    </div>
  )
}

function Muted({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-gray-400">{children}</p>
  )
}

function humanizeCleaningSize(size?: string) {
  switch (size) {
    case "studio":
      return "Studio / Self-contain"
    case "1-bedroom":
      return "1 Bedroom"
    case "2-bedroom":
      return "2 Bedroom"
    case "3-bedroom":
      return "3+ Bedroom"
    default:
      return "Not specified"
  }
}

function humanizeLaundryLoad(
  load?: "small" | "medium" | "large"
) {
  switch (load) {
    case "small":
      return "Small load (1 bag)"
    case "medium":
      return "Medium load (2 bags)"
    case "large":
      return "Large load (3+ bags)"
    default:
      return "Not specified"
  }
}
