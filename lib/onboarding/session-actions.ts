"use server"

import { eq, like } from "drizzle-orm"
import { redirect } from "next/navigation"

function isRedirectError(e: unknown): boolean {
  if (e instanceof Error) return e.message === "NEXT_REDIRECT"
  return (e as { digest?: string })?.digest?.includes?.("REDIRECT") === true
}
import { getDb } from "@/db/client"
import {
  accountMemberships,
  accounts,
  activityLog,
  onboardingEvents,
  onboardingSessions,
  profiles,
  venueSpaces,
  venues,
} from "@/db/schema"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import { buildSetupChecklist } from "@/lib/onboarding/checklist"
import {
  getNextStepId,
  getPreviousStepId,
  getStepById,
  ONBOARDING_STEP_IDS,
  validateStep,
} from "@/lib/onboarding/steps"
import type { OnboardingAnswers, OnboardingSessionRecord } from "@/lib/onboarding/types"
import { slugify } from "@/lib/slugs"
import { randomUUID } from "crypto"

const ONBOARDING_VERSION = "1"

function normalizeAnswers(raw: unknown): OnboardingAnswers {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as OnboardingAnswers
  }
  return {}
}

export async function getOrCreateOnboardingSession(): Promise<OnboardingSessionRecord | null> {
  try {
    const user = await requireAuthenticatedUser("/onboarding")
    const db = getDb()

    const existing = await db
      .select()
      .from(onboardingSessions)
      .where(eq(onboardingSessions.userId, user.id))
      .limit(1)

    const row = existing[0]
    if (row && row.status === "in_progress") {
      return {
        id: row.id,
        userId: row.userId,
        accountId: row.accountId,
        currentStepId: row.currentStepId,
        answers: normalizeAnswers(row.answersJson),
        status: row.status as "in_progress" | "completed" | "abandoned",
        version: row.version,
        startedAt: row.startedAt,
        updatedAt: row.updatedAt,
        completedAt: row.completedAt,
      }
    }

    if (row && row.status === "completed") {
      return null
    }

    const id = randomUUID()
    await db.insert(onboardingSessions).values({
      id,
      userId: user.id,
      currentStepId: ONBOARDING_STEP_IDS.STEP_WELCOME,
      answersJson: {},
      status: "in_progress",
      version: ONBOARDING_VERSION,
    })

    const inserted = await db
      .select()
      .from(onboardingSessions)
      .where(eq(onboardingSessions.id, id))
      .limit(1)

    const newRow = inserted[0]
    if (!newRow) return null

    return {
      id: newRow.id,
      userId: newRow.userId,
      accountId: newRow.accountId,
      currentStepId: newRow.currentStepId,
      answers: normalizeAnswers(newRow.answersJson),
      status: "in_progress",
      version: newRow.version,
      startedAt: newRow.startedAt,
      updatedAt: newRow.updatedAt,
      completedAt: newRow.completedAt,
    }
  } catch (err) {
    if (isRedirectError(err)) throw err
    console.error("[getOrCreateOnboardingSession]", err)
    return null
  }
}

function toFriendlyDbError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err)
  if (msg.includes("DATABASE_URL") || msg.includes("not configured")) {
    return "Database is not configured. Please add DATABASE_URL in your deployment environment."
  }
  if (msg.includes("relation") && msg.includes("does not exist")) {
    return "Onboarding setup is not complete. Run the onboarding_sessions migration (RUN #4) in Supabase SQL Editor."
  }
  return "A temporary error occurred. Please try again."
}

export async function saveOnboardingStep(
  sessionId: string,
  stepId: string,
  value: unknown,
): Promise<{ success: boolean; error?: string; nextStepId?: string | null }> {
  try {
    const user = await requireAuthenticatedUser("/onboarding")
    const db = getDb()

    const rows = await db
      .select()
      .from(onboardingSessions)
      .where(eq(onboardingSessions.id, sessionId))
      .limit(1)

    const session = rows[0]
    if (!session || session.userId !== user.id || session.status !== "in_progress") {
      return { success: false, error: "Session not found or not in progress." }
    }

    const step = getStepById(stepId)
    if (!step) return { success: false, error: "Unknown step." }

    const answers = normalizeAnswers(session.answersJson)
    const field = step.field
    const newAnswers = { ...answers }
    if (field) {
      ;(newAnswers as Record<string, unknown>)[field] = value
    }

    const validationError = validateStep(step, value, newAnswers)
    if (validationError) return { success: false, error: validationError }

    const nextStepId = getNextStepId(stepId, newAnswers)
    const now = new Date()

    await db
      .update(onboardingSessions)
      .set({
        answersJson: newAnswers,
        currentStepId: nextStepId ?? stepId,
        updatedAt: now,
      })
      .where(eq(onboardingSessions.id, sessionId))

    await db.insert(onboardingEvents).values({
      sessionId,
      userId: user.id,
      stepId,
      eventType: "step_completed",
      valueJson: field ? { [field]: value } : {},
    })

    return { success: true, nextStepId }
  } catch (err) {
    if (isRedirectError(err)) throw err
    console.error("[saveOnboardingStep]", err)
    return { success: false, error: toFriendlyDbError(err) }
  }
}

export async function goBackOnboardingStep(
  sessionId: string,
  currentStepId: string,
): Promise<{ success: boolean; error?: string; previousStepId?: string | null }> {
  try {
    const user = await requireAuthenticatedUser("/onboarding")
    const db = getDb()

    const rows = await db
      .select()
      .from(onboardingSessions)
      .where(eq(onboardingSessions.id, sessionId))
      .limit(1)

    const session = rows[0]
    if (!session || session.userId !== user.id || session.status !== "in_progress") {
      return { success: false, error: "Session not found or not in progress." }
    }

    const answers = normalizeAnswers(session.answersJson)
    const previousStepId = getPreviousStepId(currentStepId, answers)
    if (!previousStepId) return { success: true, previousStepId: null }

    await db
      .update(onboardingSessions)
      .set({
        currentStepId: previousStepId,
        updatedAt: new Date(),
      })
      .where(eq(onboardingSessions.id, sessionId))

    return { success: true, previousStepId }
  } catch (err) {
    if (isRedirectError(err)) throw err
    console.error("[goBackOnboardingStep]", err)
    return { success: false, error: toFriendlyDbError(err) }
  }
}

export async function recordOnboardingEvent(
  sessionId: string,
  stepId: string,
  eventType: string,
  valueJson?: Record<string, unknown>,
): Promise<{ success: boolean }> {
  const user = await requireAuthenticatedUser("/onboarding")
  const db = getDb()

  const rows = await db
    .select({ userId: onboardingSessions.userId })
    .from(onboardingSessions)
    .where(eq(onboardingSessions.id, sessionId))
    .limit(1)

  if (!rows[0] || rows[0].userId !== user.id) return { success: false }

  await db.insert(onboardingEvents).values({
    sessionId,
    userId: user.id,
    stepId,
    eventType,
    valueJson: valueJson ?? {},
  })
  return { success: true }
}

async function getUniqueAccountSlug(name: string): Promise<string> {
  const db = getDb()
  const baseSlug = slugify(name) || "openvenue-account"
  const existing = await db
    .select({ slug: accounts.slug })
    .from(accounts)
    .where(like(accounts.slug, `${baseSlug}%`))

  if (!existing.some((r) => r.slug === baseSlug)) return baseSlug
  const taken = new Set(existing.map((r) => r.slug))
  let suffix = 2
  while (taken.has(`${baseSlug}-${suffix}`)) suffix++
  return `${baseSlug}-${suffix}`
}

function buildDisplayName(firstName: string | null, lastName: string | null, email: string): string {
  const combined = [firstName, lastName].filter(Boolean).join(" ").trim()
  if (combined) return combined
  return email.split("@")[0] ?? "OpenVenue user"
}

export async function completeOnboarding(sessionId: string): Promise<{ success?: boolean; error?: string }> {
  try {
    const user = await requireAuthenticatedUser("/onboarding")
    const db = getDb()

    const rows = await db
    .select()
    .from(onboardingSessions)
    .where(eq(onboardingSessions.id, sessionId))
    .limit(1)

  const session = rows[0]
  if (!session || session.userId !== user.id || session.status !== "in_progress") {
    return { success: false, error: "Session not found or already completed." }
  }

  const answers = normalizeAnswers(session.answersJson)
  const companyName = (answers.companyName ?? "").trim() || "My Company"
  const userName = (answers.userName ?? "").trim() || (user.email?.split("@")[0] ?? "User")
  const firstVenueName = (answers.firstVenueName ?? "").trim() || "Main venue"

  const accountSlug = await getUniqueAccountSlug(companyName)
  const accountId = randomUUID()
  const profileId = randomUUID()
  const venueId = randomUUID()
  const spaceId = randomUUID()
  const now = new Date()

  const venueCount = firstVenueName ? 1 : 0
  const checklist = buildSetupChecklist({ hasInHouseCatering: true, venueCount: venueCount || 1 })

  const existingProfile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.authUserId, user.id))
    .limit(1)

  const nameParts = userName.split(/\s+/)
  const firstName = nameParts[0] ?? null
  const lastName = nameParts.slice(1).join(" ") || null
  const fullName = buildDisplayName(firstName, lastName, user.email ?? "")

  await db.transaction(async (tx) => {
    await tx.insert(accounts).values({
      id: accountId,
      name: companyName,
      slug: accountSlug,
      accountType: venueCount > 1 ? "multi_venue" : "single_venue",
      planTier: "base",
      venueCount: venueCount || 1,
      onboardingStatus: "in_progress",
      setupChecklist: checklist,
      metadata: {
        primaryGoal: answers.primaryGoal,
        role: answers.role,
        businessType: answers.businessType,
        venueCountRange: answers.venueCountRange,
        currentSystem: answers.currentSystem,
        conversationalOnboardingCompletedAt: now.toISOString(),
      },
    })

    if (existingProfile[0]) {
      await tx
        .update(profiles)
        .set({
          primaryAccountId: accountId,
          firstName,
          lastName,
          fullName,
          email: user.email ?? existingProfile[0].email,
          status: "active",
          metadata: {
            ...(existingProfile[0].metadata ?? {}),
            onboardingSubmittedAt: now.toISOString(),
          },
        })
        .where(eq(profiles.id, existingProfile[0].id))
    } else {
      await tx.insert(profiles).values({
        id: profileId,
        authUserId: user.id,
        primaryAccountId: accountId,
        firstName,
        lastName,
        fullName,
        email: user.email ?? "",
        status: "active",
        metadata: { onboardingSubmittedAt: now.toISOString() },
      })
    }

    const profileIdToUse = existingProfile[0]?.id ?? profileId

    const venueSlug = slugify(firstVenueName) || "main-venue"
    await tx.insert(venues).values({
      id: venueId,
      accountId,
      name: firstVenueName,
      slug: venueSlug,
      isPrimary: true,
      venueType: "other",
      cateringModel: "in_house",
    })

    await tx.insert(venueSpaces).values({
      id: spaceId,
      accountId,
      venueId,
      name: "Main space",
      slug: "main-space",
    })

    await tx.insert(accountMemberships).values({
      accountId,
      profileId: profileIdToUse,
      role: "account_admin",
      status: "active",
      accessScope: "all_venues",
      defaultVenueId: venueId,
      selectedVenueIds: [venueId],
      acceptedAt: now,
      metadata: { createdDuringOnboarding: true },
    })

    await tx.insert(activityLog).values({
      accountId,
      venueId,
      actorProfileId: profileIdToUse,
      activityType: "account_onboarding_completed",
      entityType: "account",
      entityId: accountId,
      summary: "Initial account setup completed (conversational onboarding).",
      details: { venueCount: 1 },
    })

    await tx
      .update(onboardingSessions)
      .set({
        status: "completed",
        accountId,
        currentStepId: ONBOARDING_STEP_IDS.STEP_COMPLETE,
        completedAt: now,
        updatedAt: now,
      })
      .where(eq(onboardingSessions.id, sessionId))

    await tx.insert(onboardingEvents).values({
      sessionId,
      userId: user.id,
      stepId: ONBOARDING_STEP_IDS.STEP_COMPLETE,
      eventType: "onboarding_completed",
      valueJson: { accountId },
    })
  })

    redirect("/setup?created=1")
  } catch (err) {
    if (isRedirectError(err)) throw err
    console.error("[completeOnboarding]", err)
    return { success: false, error: toFriendlyDbError(err) }
  }
}
