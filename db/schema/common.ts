import { sql } from "drizzle-orm"
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export const accountTypeEnum = pgEnum("account_type", [
  "single_venue",
  "multi_venue",
])

export const planTierEnum = pgEnum("plan_tier", ["base", "pro", "pro_plus"])

export const onboardingStatusEnum = pgEnum("onboarding_status", [
  "not_started",
  "in_progress",
  "completed",
])

export const profileStatusEnum = pgEnum("profile_status", [
  "active",
  "invited",
  "inactive",
])

export const membershipStatusEnum = pgEnum("membership_status", [
  "invited",
  "active",
  "suspended",
])

export const membershipAccessScopeEnum = pgEnum("membership_access_scope", [
  "all_venues",
  "selected_venues",
])

export const appRoleEnum = pgEnum("app_role", [
  "account_admin",
  "sales_manager",
  "coordinator",
  "operations",
  "read_only",
])

export const venueTypeEnum = pgEnum("venue_type", [
  "wedding_venue",
  "restaurant_private_events",
  "hotel_resort",
  "winery_brewery_distillery",
  "barn_farm",
  "loft_industrial",
  "garden_outdoor",
  "corporate_event_center",
  "other",
])

export const cateringModelEnum = pgEnum("catering_model", [
  "in_house",
  "preferred_partners",
  "outside_allowed",
  "outside_not_allowed",
])

export const spaceTypeEnum = pgEnum("space_type", [
  "ballroom",
  "garden",
  "patio",
  "rooftop",
  "dining_room",
  "private_room",
  "ceremony_space",
  "reception_space",
  "other",
])

export const contactTypeEnum = pgEnum("contact_type", [
  "lead",
  "client",
  "planner",
  "vendor",
  "guest_contact",
  "other",
])

export const workspaceStageEnum = pgEnum("workspace_stage", [
  "lead",
  "qualified",
  "proposal_in_progress",
  "proposal_sent",
  "negotiation",
  "contract_pending",
  "booked",
  "planning",
  "final_review",
  "completed",
  "archived",
])

export const workspaceStatusEnum = pgEnum("workspace_status", [
  "active",
  "on_hold",
  "won",
  "lost",
  "cancelled",
])

export const eventTypeEnum = pgEnum("event_type", [
  "wedding",
  "corporate",
  "social",
  "nonprofit",
  "private_dining",
  "holiday_party",
  "other",
])

export const taskStatusEnum = pgEnum("task_status", [
  "todo",
  "in_progress",
  "waiting",
  "completed",
  "cancelled",
])

export const taskPriorityEnum = pgEnum("task_priority", [
  "low",
  "medium",
  "high",
  "urgent",
])

export const taskSourceEnum = pgEnum("task_source", [
  "manual",
  "ai_suggested",
  "email_extraction",
  "note_extraction",
  "workflow_automation",
  "calendar_prep",
])

export const noteTypeEnum = pgEnum("note_type", [
  "general",
  "client_context",
  "planning",
  "operations",
  "financial",
  "vip_sensitivity",
  "vendor",
  "post_event",
])

export const visibilityScopeEnum = pgEnum("visibility_scope", [
  "private",
  "team",
  "operations",
  "leadership",
])

export const messageTypeEnum = pgEnum("message_type", [
  "general",
  "decision",
  "handoff",
  "question",
  "alert",
])

export function idColumn(name = "id") {
  return uuid(name).defaultRandom().primaryKey()
}

export function tenantColumn() {
  return uuid("account_id").notNull()
}

export function venueColumn() {
  return uuid("venue_id")
}

export function auditColumns() {
  return {
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
  }
}

export function timestampColumns() {
  return {
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }
}

export function metadataColumn(name = "metadata") {
  return jsonb(name).$type<Record<string, unknown>>().default(sql`'{}'::jsonb`)
}

export function stringArrayJsonColumn(name: string) {
  return jsonb(name).$type<string[]>().default(sql`'[]'::jsonb`)
}

export function checklistJsonColumn(name: string) {
  return jsonb(name)
    .$type<
      Array<{
        id: string
        label: string
        complete: boolean
      }>
    >()
    .default(sql`'[]'::jsonb`)
}

export function addressColumns() {
  return {
    addressLine1: varchar("address_line_1", { length: 255 }),
    addressLine2: varchar("address_line_2", { length: 255 }),
    city: varchar("city", { length: 120 }),
    stateRegion: varchar("state_region", { length: 120 }),
    postalCode: varchar("postal_code", { length: 40 }),
    country: varchar("country", { length: 120 }),
  }
}

export function moneyColumns(prefix: string) {
  return {
    [`${prefix}AmountCents`]: integer(`${prefix}_amount_cents`),
  } as const
}

export const defaultBoolean = boolean("is_active").default(true).notNull()
export const defaultText = text
