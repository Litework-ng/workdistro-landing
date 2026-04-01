"use client"

import { Suspense } from "react"
import ReviewContent from "./ReviewContent"

export default function ReviewPage() {
  return (
    <Suspense fallback={<div />}>
      <ReviewContent />
    </Suspense>
  )
}