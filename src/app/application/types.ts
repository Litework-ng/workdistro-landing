export type ServiceType =
  | "cleaning"
  | "laundry"
  | "grocery"
  | "errands"
  | "other"

export type ExperienceLevel =
  | "professional"
  | "informal"
  | "none"
  | "some"

export type ApplicationData = {
  // Basic info
  fullName?: string
  phone?: string
  email?: string
  age?: "18-24" | "25-34" | "35-44" | "45-54" | "55+"
  gender?: "Male" | "Female" | "Prefer not to say"
  city?: string
  avatarUrl?: string
  shortBio?: string

  // Services
  services?: ServiceType[]
  otherService?: string
  experienceLevel?: ExperienceLevel
  experienceDescription?: string

  // Later sections
  availability?: "weekdays" | "weekends" | "both"
 
  notes?: string

  availabilityType?: AvailabilityType
  workDays?: WorkDay[]
  workHours?: WorkHour[]

  
  idStatus?: IdStatus
  hasBankAccount?: BankAccountStatus
  hasSmartphone?: boolean
  transportMode?: TransportMode

  motivation?: string
  petComfort?: PetComfort
  hasConviction?: ConvictionStatus
  referenceStatus?: ReferenceStatus

  discoverySource?: DiscoverySource
  agreedToTerms?: boolean
}



export type AvailabilityType =
  | "full-time"
  | "part-time"
  | "weekends"
  | "flexible"
  | "evenings"

export type WorkDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

export type WorkHour =
  | "early-morning"
  | "morning"
  | "afternoon"
  | "late-afternoon"
  | "evening"

  export type IdStatus =
  | "nin"
  | "bvn"
  | "both"
  | "none-but-can-get"

export type BankAccountStatus =
  | "yes"
  | "no-but-can-open"

export type TransportMode =
  | "own-transport"
  | "public"
  | "walking"
  | "depends"

  export type PetComfort =
  | "yes"
  | "no"
  | "depends"

export type ConvictionStatus =
  | "no"
  | "yes"

export type ReferenceStatus =
  | "two"
  | "one"
  | "can-get"

  export type DiscoverySource =
  | "friend-family"
  | "social-media"
  | "whatsapp-group"
  | "campus"
  | "job-board"
  | "estate"
  | "other"
