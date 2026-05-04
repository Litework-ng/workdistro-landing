export type ServiceType = "cleaning" | "laundry" | "grocery"

/* ---------- Cleaning ---------- */
export type CleaningDetails = {
  size?: "studio" | "1-bedroom" | "2-bedroom" | "3-bedroom"
  extrasText?: string
  extras?: string[]          // e.g. deep clean, pets
  notes?: string             // free text
}

/* ---------- Laundry ---------- */
export type LaundryDetails = {
  loadSize?: "small" | "medium" | "large"

  serviceType?:
    | "wash-fold"
    | "wash-iron"
    | "iron-only"

  deliverySpeed?: "standard" | "express"

  notes?: string
}

/* ---------- Grocery ---------- */
export type GroceryDetails = {
  serviceType?: "local-errands" | "market-shopping" | "supermarket-run"
  list?: string              // shopping list (textarea)
  budget?: number            // numeric for pricing logic
  storePreference?: string
  notes?: string             // brands / substitutions
}

/* ---------- Core booking ---------- */
export type BookingData = {
  service: ServiceType | null

  cleaning?: CleaningDetails
  laundry?: LaundryDetails
  grocery?: GroceryDetails

  schedule?: {
    date?: string
    time?: string
  }

  contact?: {
    name?: string
    phone?: string
    address?: string
  }
}
