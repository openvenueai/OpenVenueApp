import { index, jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { accounts } from "./accounts"
import { idColumn } from "./common"

export const onboardingSessions = pgTable(
  "onboarding_sessions",
  {
    id: idColumn(),
    userId: uuid("user_id").notNull(),
    accountId: uuid("account_id").references(() => accounts.id, { onDelete: "set null" }),
    currentStepId: varchar("current_step_id", { length: 80 }).notNull(),
    answersJson: jsonb("answers_json").default({}).notNull(),
    status: varchar("status", { length: 40 }).default("in_progress").notNull(),
    version: varchar("version", { length: 20 }).default("1").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (table) => [
    index("onboarding_sessions_user_id_idx").on(table.userId),
    index("onboarding_sessions_status_idx").on(table.status),
  ],
)

export const onboardingEvents = pgTable(
  "onboarding_events",
  {
    id: idColumn(),
    sessionId: uuid("session_id")
      .references(() => onboardingSessions.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id").notNull(),
    stepId: varchar("step_id", { length: 80 }).notNull(),
    eventType: varchar("event_type", { length: 80 }).notNull(),
    valueJson: jsonb("value_json").default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("onboarding_events_session_id_idx").on(table.sessionId),
    index("onboarding_events_created_at_idx").on(table.createdAt),
  ],
)
