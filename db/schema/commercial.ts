import { index, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { accounts } from "./accounts"
import { eventWorkspaces } from "./crm"
import {
  auditColumns,
  idColumn,
  metadataColumn,
  tenantColumn,
  timestampColumns,
} from "./common"

export const proposals = pgTable(
  "proposals",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    workspaceId: uuid("workspace_id")
      .references(() => eventWorkspaces.id, { onDelete: "cascade" })
      .notNull(),
    version: integer("version").default(1).notNull(),
    status: varchar("status", { length: 40 }).default("draft").notNull(),
    totalCents: integer("total_cents"),
    clientNotes: varchar("client_notes", { length: 2000 }),
    internalNotes: varchar("internal_notes", { length: 2000 }),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("proposals_account_id_idx").on(table.accountId),
    index("proposals_workspace_id_idx").on(table.workspaceId),
  ],
)

export const proposalItems = pgTable(
  "proposal_items",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    proposalId: uuid("proposal_id")
      .references(() => proposals.id, { onDelete: "cascade" })
      .notNull(),
    lineOrder: integer("line_order").default(0).notNull(),
    description: varchar("description", { length: 500 }).notNull(),
    quantity: integer("quantity").default(1).notNull(),
    unitPriceCents: integer("unit_price_cents").notNull(),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("proposal_items_proposal_id_idx").on(table.proposalId),
  ],
)

export const contracts = pgTable(
  "contracts",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    workspaceId: uuid("workspace_id")
      .references(() => eventWorkspaces.id, { onDelete: "cascade" })
      .notNull(),
    proposalId: uuid("proposal_id").references(() => proposals.id, {
      onDelete: "set null",
    }),
    status: varchar("status", { length: 40 }).default("draft").notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    signedAt: timestamp("signed_at", { withTimezone: true }),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("contracts_account_id_idx").on(table.accountId),
    index("contracts_workspace_id_idx").on(table.workspaceId),
  ],
)

export const paymentMilestones = pgTable(
  "payment_milestones",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    contractId: uuid("contract_id")
      .references(() => contracts.id, { onDelete: "cascade" })
      .notNull(),
    label: varchar("label", { length: 120 }).notNull(),
    amountCents: integer("amount_cents").notNull(),
    dueAt: timestamp("due_at", { withTimezone: true }),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    status: varchar("status", { length: 40 }).default("pending").notNull(),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("payment_milestones_contract_id_idx").on(table.contractId),
  ],
)

// Timeline (planning and day-of run-of-show)
export const timelines = pgTable(
  "timelines",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    workspaceId: uuid("workspace_id")
      .references(() => eventWorkspaces.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar("title", { length: 180 }).notNull(),
    kind: varchar("kind", { length: 40 }).default("day_of").notNull(),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("timelines_workspace_id_idx").on(table.workspaceId),
  ],
)

export const timelineItems = pgTable(
  "timeline_items",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    timelineId: uuid("timeline_id")
      .references(() => timelines.id, { onDelete: "cascade" })
      .notNull(),
    lineOrder: integer("line_order").default(0).notNull(),
    title: varchar("title", { length: 180 }).notNull(),
    startAt: timestamp("start_at", { withTimezone: true }),
    endAt: timestamp("end_at", { withTimezone: true }),
    location: varchar("location", { length: 120 }),
    responsibility: varchar("responsibility", { length: 120 }),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("timeline_items_timeline_id_idx").on(table.timelineId),
  ],
)

// BEO (Banquet Event Order)
export const beos = pgTable(
  "beos",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    workspaceId: uuid("workspace_id")
      .references(() => eventWorkspaces.id, { onDelete: "cascade" })
      .notNull(),
    version: integer("version").default(1).notNull(),
    status: varchar("status", { length: 40 }).default("draft").notNull(),
    content: varchar("content", { length: 10000 }),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("beos_workspace_id_idx").on(table.workspaceId),
  ],
)
