"use client"

import type { BookingData } from "../types"
import CleaningDetails from "./details/CleaningDetails"
import LaundryDetails from "./details/LaundryDetails"
import GroceryDetails from "./details/GroceryDetails"

export default function ServiceDetailsStep({
  data,
  setData,
}: {
  data: BookingData
  setData: React.Dispatch<React.SetStateAction<BookingData>>
}) {
  if (!data.service) return null

  switch (data.service) {
    case "cleaning":
      return <CleaningDetails data={data} setData={setData} />
    case "laundry":
      return <LaundryDetails data={data} setData={setData} />
    case "grocery":
      return <GroceryDetails data={data} setData={setData} />
    default:
      return null
  }
}
