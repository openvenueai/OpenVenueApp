"use server"

import { and, eq, like } from "drizzle-orm"
import { redirect } from "next/navigation"
import { ZodError, z } from "zod"
import { getAccountSnapshot } from "@/lib/account-context"
import { canAccessAppPath } from "@/lib/app-shell/navigation"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import type { CreateLeadActionState } from "@/lib/leads/action-state"
import { LEAD_EVENT_TYPE_VALUES } from "@/lib/leads/constants"
import { slugify, withNumericSuffix } from "@/lib/slugs"
import { getDb } from "@/db/client"
import { activityLog, contacts, eventWorkspaces, venues } from "@/db/schema"

const createLeadSchema = z.object({
  fullName: z.string().trim().min(1, "Enter the lead's full name.").max(180),
  email: z.union([z.literal(""), z.email("Enter a valid email address.")]),
  phone: z.string().trim().max(40).optional(),
  companyName: z.string().trim().max(160).optional(),
  venueId: z.string().uuid("Choose a venue."),
  eventType: z.enum(LEAD_EVENT_TYPE_VALUES),
  source: z.string().trim().max(120).optional(),
  guestCount: z.preprocess((value) => {
    if (value === "" || value === null || value === undefined) {
      return undefined
    }

    return Number(value)
  }, z.number().int().positive("Guest count must be greater than zero.").max(10000).optional()),
  preferredDate: z
    .string()
    .optional()
    .refine((value) => !value || !Number.isNaN(new Date(value).getTime()), {
      message: "Choose a valid preferred date.",
    }),
  notes: z.string().trim().max(500, "Keep the initial note under 500 characters.").optional(),
})

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key)

  return typeof value === "string" ? value : ""
}

function normalizeOptional(value?: string | null) {
  const normalized = value?.trim()

  return normalized ? normalized : null
}

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/)

  return {
    firstName: parts[0] ?? null,
    lastName: parts.slice(1).join(" ") || null,
  }
}

function toPreferredDate(value?: string) {
  if (!value) {
    return null
  }

  const date = new Date(`${value}T12:00:00`)

  return Number.isNaN(date.getTime()) ? null : date
}

function getValidationErrorState(error: ZodError): CreateLeadActionState {
  return {
    status: "error",
    message: "Check the highlighted lead details and try again.",
    fieldErrors: error.flatten().fieldErrors,
  }
}

async function getUniqueWorkspaceSlug(accountId: string, baseValue: string) {
  const db = getDb()
  const baseSlug = slugify(baseValue) || "lead"
  const existing = await db
    .select({ slug: eventWorkspaces.slug })
    .from(eventWorkspaces)
    .where(
      and(
        eq(eventWorkspaces.accountId, accountId),
        like(eventWorkspaces.slug, `${baseSlug}%`),
      ),
    )

  const takenSlugs = new Set(existing.map((record) => record.slug))

  if (!takenSlugs.has(baseSlug)) {
    return baseSlug
  }

  let index = 1
  let candidate = withNumericSuffix(baseSlug, index)

  while (takenSlugs.has(candidate)) {
    index += 1
    candidate = withNumericSuffix(baseSlug, index)
  }

  return candidate
}

export async function createLeadAction(
  _previousState: CreateLeadActionState,
  formData: FormData,
): Promise<CreateLeadActionState> {
  const user = await requireAuthenticatedUser("/leads")
  const snapshot = await getAccountSnapshot(user.id)

  if (!snapshot?.account || !snapshot.membership) {
    return {
      status: "error",
      message: "Finish onboarding before creating leads.",
    }
  }

  if (!canAccessAppPath(snapshot.membership.role, "/leads")) {
    return {
      status: "error",
      message: "Your role does not have access to create leads.",
    }
  }

  const parsed = createLeadSchema.safeParse({
    fullName: getFormValue(formData, "fullName"),
    email: getFormValue(formData, "email"),
    phone: getFormValue(formData, "phone") || undefined,
    companyName: getFormValue(formData, "companyName") || undefined,
    venueId: getFormValue(formData, "venueId"),
    eventType: getFormValue(formData, "eventType"),
    source: getFormValue(formData, "source") || undefined,
    guestCount: getFormValue(formData, "guestCount"),
    preferredDate: getFormValue(formData, "preferredDate") || undefined,
    notes: getFormValue(formData, "notes") || undefined,
  })

  if (!parsed.success) {
    return getValidationErrorState(parsed.error)
  }

  const db = getDb()
  const [selectedVenue] = await db
    .select({
      id: venues.id,
      name: venues.name,
    })
    .from(venues)
    .where(
      and(
        eq(venues.accountId, snapshot.account.id),
        eq(venues.id, parsed.data.venueId),
      ),
    )
    .limit(1)

  if (!selectedVenue) {
    return {
      status: "error",
      message: "Choose a valid venue for this lead.",
    }
  }

  const now = new Date()
  const contactId = crypto.randomUUID()
  const workspaceId = crypto.randomUUID()
  const preferredDate = toPreferredDate(parsed.data.preferredDate)
  const { firstName, lastName } = splitFullName(parsed.data.fullName)
  const workspaceSlug = await getUniqueWorkspaceSlug(
    snapshot.account.id,
    `${parsed.data.fullName}-${selectedVenue.name}`,
  )
  const workspaceTitle = parsed.data.companyName
    ? `${parsed.data.fullName} · ${parsed.data.companyName}`
    : parsed.data.fullName

  try {
    await db.transaction(async (tx) => {
      await tx.insert(contacts).values({
        id: contactId,
        accountId: snapshot.account!.id,
        venueId: selectedVenue.id,
        ownerProfileId: snapshot.profile.id,
        contactType: "lead",
        firstName,
        lastName,
        fullName: parsed.data.fullName,
        companyName: normalizeOptional(parsed.data.companyName),
        email: normalizeOptional(parsed.data.email),
        phone: normalizeOptional(parsed.data.phone),
        eventType: parsed.data.eventType,
        source: normalizeOptional(parsed.data.source) ?? "manual",
        leadStatus: "new",
        notes: normalizeOptional(parsed.data.notes),
        createdBy: snapshot.profile.id,
        updatedBy: snapshot.profile.id,
        metadata: {
          createdFrom: "leads_index_form",
        },
      })

      await tx.insert(eventWorkspaces).values({
        id: workspaceId,
        accountId: snapshot.account!.id,
        venueId: selectedVenue.id,
        primaryContactId: contactId,
        ownerProfileId: snapshot.profile.id,
        title: workspaceTitle.slice(0, 180),
        slug: workspaceSlug,
        eventName: `${parsed.data.fullName} event`.slice(0, 180),
        eventType: parsed.data.eventType,
        stage: "lead",
        status: "active",
        source: normalizeOptional(parsed.data.source) ?? "manual",
        guestCount: parsed.data.guestCount ?? null,
        preferredDate,
        lastActivityAt: now,
        nextActionDueAt: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        summary: normalizeOptional(parsed.data.notes),
        createdBy: snapshot.profile.id,
        updatedBy: snapshot.profile.id,
        metadata: {
          createdFrom: "leads_index_form",
          venueName: selectedVenue.name,
        },
      })

      await tx.insert(activityLog).values({
        accountId: snapshot.account!.id,
        venueId: selectedVenue.id,
        workspaceId,
        actorProfileId: snapshot.profile.id,
        activityType: "lead_created",
        entityType: "event_workspace",
        entityId: workspaceId,
        summary: `Created a new lead for ${parsed.data.fullName}.`,
        details: {
          contactId,
          eventType: parsed.data.eventType,
          source: normalizeOptional(parsed.data.source) ?? "manual",
        },
      })
    })
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Lead creation failed. Try again in a moment.",
    }
  }

  redirect(`/workspace/${workspaceId}?created=1`)
}
