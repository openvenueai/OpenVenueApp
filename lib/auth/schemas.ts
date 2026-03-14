import { z } from "zod"

export const VENUE_TYPE_VALUES = [
  "wedding_venue",
  "restaurant_private_events",
  "hotel_resort",
  "winery_brewery_distillery",
  "barn_farm",
  "loft_industrial",
  "garden_outdoor",
  "corporate_event_center",
  "other",
] as const

export const CATERING_MODEL_VALUES = [
  "in_house",
  "preferred_partners",
  "outside_allowed",
  "outside_not_allowed",
] as const

export const SPACE_TYPE_VALUES = [
  "ballroom",
  "garden",
  "patio",
  "rooftop",
  "dining_room",
  "private_room",
  "ceremony_space",
  "reception_space",
  "other",
] as const

export const PLAN_TIER_VALUES = ["base", "pro", "pro_plus"] as const

export const TEAM_SIZE_VALUES = ["just_me", "2_5", "6_15", "16_plus"] as const

export const EVENT_TYPE_VALUES = [
  "weddings",
  "corporate_events",
  "social_events",
  "nonprofit_fundraising",
  "private_dining",
  "holiday_parties",
  "other",
] as const

export const signInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Enter your password."),
  next: z.string().optional(),
})

export const signUpSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name."),
  lastName: z.string().trim().min(1, "Enter your last name."),
  email: z.email("Enter a valid work email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  phone: z.string().trim().optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address."),
})

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your new password."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    error: "Passwords must match.",
    path: ["confirmPassword"],
  })

export const venueSpaceSchema = z.object({
  name: z.string().trim().min(1, "Enter a space name."),
  spaceType: z.enum(SPACE_TYPE_VALUES),
  seatedCapacity: z.coerce.number().int().min(0),
  cocktailCapacity: z.coerce.number().int().min(0),
  notes: z.string().trim().optional(),
})

export const onboardingVenueSchema = z.object({
  name: z.string().trim().min(1, "Enter a venue name."),
  addressLine1: z.string().trim().min(1, "Enter a street address."),
  city: z.string().trim().min(1, "Enter a city."),
  stateRegion: z.string().trim().min(1, "Enter a state or region."),
  postalCode: z.string().trim().min(1, "Enter a postal code."),
  country: z.string().trim().min(1, "Enter a country."),
  spaces: z.array(venueSpaceSchema).min(1, "Add at least one space."),
})

export const onboardingSchema = z
  .object({
    companyName: z.string().trim().min(1, "Enter your company name."),
    businessName: z.string().trim().min(1, "Enter your primary business name."),
    businessPhone: z.string().trim().min(1, "Enter a business phone number."),
    websiteUrl: z.string().trim().optional(),
    country: z.string().trim().min(1, "Select a country."),
    timezone: z.string().trim().min(1, "Select a timezone."),
    currencyCode: z.string().trim().min(1, "Select a currency."),
    venueCountChoice: z.enum(["one", "multiple"]),
    venues: z.array(onboardingVenueSchema).min(1, "Add at least one venue."),
    cateringModel: z.enum(CATERING_MODEL_VALUES),
    venueType: z.enum(VENUE_TYPE_VALUES),
    eventTypes: z
      .array(z.enum(EVENT_TYPE_VALUES))
      .min(1, "Select at least one event type."),
    teamSize: z.enum(TEAM_SIZE_VALUES),
    migratingFromCrm: z.boolean(),
    currentCrm: z.string().trim().optional(),
    planTier: z.enum(PLAN_TIER_VALUES),
  })
  .superRefine((value, ctx) => {
    if (value.venueCountChoice === "one" && value.venues.length !== 1) {
      ctx.addIssue({
        code: "custom",
        path: ["venues"],
        message: "Single-venue setup should contain exactly one venue.",
      })
    }

    if (value.venueCountChoice === "multiple" && value.venues.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["venues"],
        message: "Multi-venue setup needs at least two venues.",
      })
    }

    if (value.venueCountChoice === "multiple" && value.planTier === "base") {
      ctx.addIssue({
        code: "custom",
        path: ["planTier"],
        message: "Base is available for single-venue accounts only.",
      })
    }

    if (value.migratingFromCrm && !value.currentCrm) {
      ctx.addIssue({
        code: "custom",
        path: ["currentCrm"],
        message: "Enter the CRM you are moving from.",
      })
    }
  })

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type OnboardingInput = z.infer<typeof onboardingSchema>
export type OnboardingVenueInput = z.infer<typeof onboardingVenueSchema>
export type OnboardingSpaceInput = z.infer<typeof venueSpaceSchema>
