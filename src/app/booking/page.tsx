"use client"

import { Suspense } from "react"
import BookingContent from "./BookingContent"

export default function BookingPage() {
  return (
    <Suspense fallback={<div />}>
      <BookingContent />
    </Suspense>
  )
}