"use server"

import { eq, like } from "drizzle-orm"
import { redirect } from "next/navigation"
import { ZodError } from "zod"
import { getDb } from "@/db/client"
import {
  accountMemberships,
  accounts,
  activityLog,
  profiles,
  venueSpaces,
  venues,
} from "@/db/schema"
import { onboardingSchema, type OnboardingInput } from "@/lib/auth/schemas"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import type { OnboardingActionState } from "@/lib/onboarding/action-state"
import { buildSetupChecklist } from "@/lib/onboarding/checklist"
import { slugify } from "@/lib/slugs"

type ActionFieldErrors = Record<string, string[] | undefined>
type ProfileRecord = typeof profiles.$inferSelect

function getPayload(formData: FormData) {
  const payload = formData.get("payload")

  return typeof payload === "string" ? payload : ""
}

function normalizeOptional(value?: string | null) {
  const normalized = value?.trim()

  return normalized ? normalized : null
}

function buildDisplayName(options: {
  firstName?: string | null
  lastName?: string | null
  fullName?: string | null
  email?: string | null
}) {
  const combinedName = `${options.firstName ?? ""} ${options.lastName ?? ""}`.trim()

  if (combinedName) {
    return combinedName
  }

  if (options.fullName?.trim()) {
    return options.fullName.trim()
  }

  return options.email?.split("@")[0] ?? "OpenVenue user"
}

function getValidationErrorState(error: ZodError): OnboardingActionState {
  const fieldErrors: ActionFieldErrors = {}

  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? issue.path.join(".") : "form"
    const existingMessages = fieldErrors[key] ?? []

    fieldErrors[key] = [...existingMessages, issue.message]
  }

  return {
    status: "error",
    message: "Review the setup details and try again.",
    fieldErrors,
  }
}

async function getUniqueAccountSlug(name: string) {
  const db = getDb()
  const baseSlug = slugify(name) || "openvenue-account"
  const existing = await db
    .select({ slug: accounts.slug })
    .from(accounts)
    .where(like(accounts.slug, `${baseSlug}%`))

  if (!existing.some((record) => record.slug === baseSlug)) {
    return baseSlug
  }

  const takenSlugs = new Set(existing.map((record) => record.slug))
  let suffix = 2
  let candidate = `${baseSlug}-${suffix}`

  while (takenSlugs.has(candidate)) {
    suffix += 1
    candidate = `${baseSlug}-${suffix}`
  }

  return candidate
}

function getUniqueLocalSlug(name: string, takenSlugs: Set<string>, fallback: string) {
  const baseSlug = slugify(name) || fallback

  if (!takenSlugs.has(baseSlug)) {
    takenSlugs.add(baseSlug)
    return baseSlug
  }

  let suffix = 2
  let candidate = `${baseSlug}-${suffix}`

  while (takenSlugs.has(candidate)) {
    suffix += 1
    candidate = `${baseSlug}-${suffix}`
  }

  takenSlugs.add(candidate)
  return candidate
}

function buildAccountMetadata(input: OnboardingInput) {
  return {
    eventTypes: input.eventTypes,
    teamSize: input.teamSize,
    migratingFromCrm: input.migratingFromCrm,
    currentCrm: normalizeOptional(input.currentCrm),
    cateringModel: input.cateringModel,
    venueType: input.venueType,
    venueCountChoice: input.venueCountChoice,
    setupStartedAt: new Date().toISOString(),
  }
}

export async function startOnboardingAction(
  _previousState: OnboardingActionState,
  formData: FormData,
): Promise<OnboardingActionState> {
  const user = await requireAuthenticatedUser("/onboarding")
  const rawPayload = getPayload(formData)

  if (!rawPayload) {
    return {
      status: "error",
      message: "Setup data is missing. Refresh the page and try again.",
    }
  }

  let parsedPayload: unknown

  try {
    parsedPayload = JSON.parse(rawPayload)
  } catch {
    return {
      status: "error",
      message: "Setup data could not be read. Refresh the page and try again.",
    }
  }

  const parsed = onboardingSchema.safeParse(parsedPayload)

  if (!parsed.success) {
    return getValidationErrorState(parsed.error)
  }

  if (!user.email) {
    return {
      status: "error",
      message:
        "Your authenticated user is missing an email address. Confirm auth setup and try again.",
    }
  }

  const userEmail = user.email

  let db: ReturnType<typeof getDb>

  try {
    db = getDb()
  } catch {
    return {
      status: "error",
      message:
        "DATABASE_URL is not configured yet. Add it before testing the onboarding submit flow.",
    }
  }

  let existingProfile: ProfileRecord | undefined

  try {
    ;[existingProfile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.authUserId, user.id))
      .limit(1)
  } catch {
    return {
      status: "error",
      message: "We could not read your account profile. Try again in a moment.",
    }
  }

  if (existingProfile?.primaryAccountId) {
    redirect("/setup")
  }

  try {

    const accountSlug = await getUniqueAccountSlug(parsed.data.companyName)
    const now = new Date()
    const accountId = crypto.randomUUID()
    const profileId = existingProfile?.id ?? crypto.randomUUID()
    const venueSlugSet = new Set<string>()
    const venueRecords = parsed.data.venues.map((venue, index) => {
      const venueId = crypto.randomUUID()
      const spaceSlugSet = new Set<string>()

      return {
        id: venueId,
        isPrimary: index === 0,
        name: venue.name,
        slug: getUniqueLocalSlug(venue.name, venueSlugSet, `venue-${index + 1}`),
        legalName: index === 0 ? parsed.data.businessName : venue.name,
        spaces: venue.spaces.map((space, spaceIndex) => ({
          id: crypto.randomUUID(),
          venueId,
          name: space.name,
          slug: getUniqueLocalSlug(
            space.name,
            spaceSlugSet,
            `space-${spaceIndex + 1}`,
          ),
          spaceType: space.spaceType,
          seatedCapacity: space.seatedCapacity,
          cocktailCapacity: space.cocktailCapacity,
          notes: normalizeOptional(space.notes),
        })),
        addressLine1: venue.addressLine1,
        city: venue.city,
        stateRegion: venue.stateRegion,
        postalCode: venue.postalCode,
        country: venue.country,
      }
    })

    const primaryVenue = venueRecords[0]
    const checklist = buildSetupChecklist({
      hasInHouseCatering: parsed.data.cateringModel === "in_house",
      venueCount: venueRecords.length,
    })

    await db.transaction(async (tx) => {
      await tx.insert(accounts).values({
        id: accountId,
        name: parsed.data.companyName,
        slug: accountSlug,
        businessName: parsed.data.businessName,
        websiteUrl: normalizeOptional(parsed.data.websiteUrl),
        businessPhone: parsed.data.businessPhone,
        country: parsed.data.country,
        timezone: parsed.data.timezone,
        currencyCode: parsed.data.currencyCode,
        accountType: parsed.data.venues.length > 1 ? "multi_venue" : "single_venue",
        planTier: parsed.data.planTier,
        venueCount: parsed.data.venues.length,
        onboardingStatus: "in_progress",
        setupChecklist: checklist,
        metadata: buildAccountMetadata(parsed.data),
      })

      if (existingProfile) {
        await tx
          .update(profiles)
          .set({
            primaryAccountId: accountId,
            email: userEmail,
            firstName: normalizeOptional(
              typeof user.user_metadata.first_name === "string"
                ? user.user_metadata.first_name
                : existingProfile.firstName,
            ),
            lastName: normalizeOptional(
              typeof user.user_metadata.last_name === "string"
                ? user.user_metadata.last_name
                : existingProfile.lastName,
            ),
            fullName: buildDisplayName({
              firstName:
                typeof user.user_metadata.first_name === "string"
                  ? user.user_metadata.first_name
                  : existingProfile.firstName,
              lastName:
                typeof user.user_metadata.last_name === "string"
                  ? user.user_metadata.last_name
                  : existingProfile.lastName,
              fullName:
                typeof user.user_metadata.full_name === "string"
                  ? user.user_metadata.full_name
                  : existingProfile.fullName,
              email: userEmail,
            }),
            phone: normalizeOptional(
              typeof user.user_metadata.phone === "string"
                ? user.user_metadata.phone
                : existingProfile.phone,
            ),
            status: "active",
            metadata: {
              ...(existingProfile.metadata ?? {}),
              onboardingSubmittedAt: now.toISOString(),
            },
          })
          .where(eq(profiles.id, existingProfile.id))
      } else {
        await tx.insert(profiles).values({
          id: profileId,
          authUserId: user.id,
          primaryAccountId: accountId,
          firstName: normalizeOptional(
            typeof user.user_metadata.first_name === "string"
              ? user.user_metadata.first_name
              : null,
          ),
          lastName: normalizeOptional(
            typeof user.user_metadata.last_name === "string"
              ? user.user_metadata.last_name
              : null,
          ),
          fullName: buildDisplayName({
            firstName:
              typeof user.user_metadata.first_name === "string"
                ? user.user_metadata.first_name
                : null,
            lastName:
              typeof user.user_metadata.last_name === "string"
                ? user.user_metadata.last_name
                : null,
            fullName:
              typeof user.user_metadata.full_name === "string"
                ? user.user_metadata.full_name
                : null,
            email: userEmail,
          }),
          email: userEmail,
          phone: normalizeOptional(
            typeof user.user_metadata.phone === "string"
              ? user.user_metadata.phone
              : null,
          ),
          status: "active",
          metadata: {
            onboardingSubmittedAt: now.toISOString(),
          },
        })
      }

      await tx.insert(venues).values(
        venueRecords.map((venueRecord) => ({
          id: venueRecord.id,
          accountId,
          name: venueRecord.name,
          slug: venueRecord.slug,
          legalName: venueRecord.legalName,
          venueType: parsed.data.venueType,
          cateringModel: parsed.data.cateringModel,
          timezone: parsed.data.timezone,
          currencyCode: parsed.data.currencyCode,
          isPrimary: venueRecord.isPrimary,
          addressLine1: venueRecord.addressLine1,
          city: venueRecord.city,
          stateRegion: venueRecord.stateRegion,
          postalCode: venueRecord.postalCode,
          country: venueRecord.country,
          metadata: {
            eventTypes: parsed.data.eventTypes,
          },
        })),
      )

      await tx.insert(venueSpaces).values(
        venueRecords.flatMap((venueRecord) =>
          venueRecord.spaces.map((space) => ({
            id: space.id,
            accountId,
            venueId: venueRecord.id,
            name: space.name,
            slug: space.slug,
            spaceType: space.spaceType,
            seatedCapacity: space.seatedCapacity,
            cocktailCapacity: space.cocktailCapacity,
            notes: space.notes,
          })),
        ),
      )

      await tx.insert(accountMemberships).values({
        accountId,
        profileId,
        role: "account_admin",
        status: "active",
        accessScope: "all_venues",
        defaultVenueId: primaryVenue.id,
        selectedVenueIds: venueRecords.map((venueRecord) => venueRecord.id),
        acceptedAt: now,
        metadata: {
          createdDuringOnboarding: true,
        },
      })

      await tx.insert(activityLog).values({
        accountId,
        venueId: primaryVenue.id,
        actorProfileId: profileId,
        activityType: "account_onboarding_completed",
        entityType: "account",
        entityId: accountId,
        summary: "Initial account setup completed.",
        details: {
          venueCount: venueRecords.length,
          planTier: parsed.data.planTier,
        },
      })
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Onboarding could not be completed. Try again in a moment."

    return {
      status: "error",
      message,
    }
  }

  redirect("/setup?created=1")
}
