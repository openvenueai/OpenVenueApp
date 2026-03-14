import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { accounts } from "./accounts"
import { eventWorkspaces } from "./crm"
import {
  auditColumns,
  idColumn,
  metadataColumn,
  tenantColumn,
  timestampColumns,
} from "./common"

export const aiRuns = pgTable(
  "ai_runs",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    runType: varchar("run_type", { length: 80 }).notNull(),
    model: varchar("model", { length: 120 }),
    status: varchar("status", { length: 40 }).default("completed").notNull(),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [index("ai_runs_account_id_idx").on(table.accountId)],
)

export const aiArtifacts = pgTable(
  "ai_artifacts",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    runId: uuid("run_id").references(() => aiRuns.id, { onDelete: "cascade" }),
    artifactType: varchar("artifact_type", { length: 80 }).notNull(),
    content: varchar("content", { length: 10000 }),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [index("ai_artifacts_run_id_idx").on(table.runId)],
)

export const aiSummaries = pgTable(
  "ai_summaries",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    workspaceId: uuid("workspace_id").references(() => eventWorkspaces.id, {
      onDelete: "cascade",
    }),
    summaryType: varchar("summary_type", { length: 80 }).notNull(),
    content: varchar("content", { length: 4000 }).notNull(),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("ai_summaries_workspace_id_idx").on(table.workspaceId),
  ],
)

export const aiSuggestions = pgTable(
  "ai_suggestions",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    workspaceId: uuid("workspace_id").references(() => eventWorkspaces.id, {
      onDelete: "set null",
    }),
    suggestionType: varchar("suggestion_type", { length: 80 }).notNull(),
    content: varchar("content", { length: 2000 }).notNull(),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("ai_suggestions_workspace_id_idx").on(table.workspaceId),
  ],
)
