import {
  boolean,
  index,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"
import { accounts, profiles, venues } from "./accounts"
import { eventWorkspaces } from "./crm"
import {
  auditColumns,
  idColumn,
  messageTypeEnum,
  metadataColumn,
  noteTypeEnum,
  taskPriorityEnum,
  taskSourceEnum,
  taskStatusEnum,
  tenantColumn,
  timestampColumns,
  venueColumn,
  visibilityScopeEnum,
} from "./common"

export const tasks = pgTable(
  "tasks",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    venueId: venueColumn().references(() => venues.id, { onDelete: "set null" }),
    workspaceId: uuid("workspace_id").references(() => eventWorkspaces.id, {
      onDelete: "set null",
    }),
    assignedToProfileId: uuid("assigned_to_profile_id").references(
      () => profiles.id,
      {
        onDelete: "set null",
      },
    ),
    title: varchar("title", { length: 180 }).notNull(),
    description: varchar("description", { length: 2000 }),
    status: taskStatusEnum("status").default("todo").notNull(),
    priority: taskPriorityEnum("priority").default("medium").notNull(),
    source: taskSourceEnum("source").default("manual").notNull(),
    dueAt: timestamp("due_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    linkedObjectType: varchar("linked_object_type", { length: 80 }),
    linkedObjectId: uuid("linked_object_id"),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("tasks_account_id_idx").on(table.accountId),
    index("tasks_workspace_id_idx").on(table.workspaceId),
    index("tasks_assigned_to_profile_id_idx").on(table.assignedToProfileId),
    index("tasks_status_idx").on(table.status),
    index("tasks_due_at_idx").on(table.dueAt),
  ],
)

export const notes = pgTable(
  "notes",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    venueId: venueColumn().references(() => venues.id, { onDelete: "set null" }),
    workspaceId: uuid("workspace_id").references(() => eventWorkspaces.id, {
      onDelete: "cascade",
    }),
    authorProfileId: uuid("author_profile_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    noteType: noteTypeEnum("note_type").default("general").notNull(),
    visibility: visibilityScopeEnum("visibility").default("team").notNull(),
    title: varchar("title", { length: 180 }),
    body: varchar("body", { length: 4000 }).notNull(),
    isPinned: boolean("is_pinned").default(false).notNull(),
    linkedTaskId: uuid("linked_task_id").references(() => tasks.id, {
      onDelete: "set null",
    }),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("notes_account_id_idx").on(table.accountId),
    index("notes_workspace_id_idx").on(table.workspaceId),
    index("notes_author_profile_id_idx").on(table.authorProfileId),
    index("notes_note_type_idx").on(table.noteType),
  ],
)

export const internalMessages = pgTable(
  "internal_messages",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    venueId: venueColumn().references(() => venues.id, { onDelete: "set null" }),
    workspaceId: uuid("workspace_id").references(() => eventWorkspaces.id, {
      onDelete: "cascade",
    }),
    authorProfileId: uuid("author_profile_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    parentMessageId: uuid("parent_message_id"),
    threadKey: varchar("thread_key", { length: 120 }),
    messageType: messageTypeEnum("message_type").default("general").notNull(),
    visibility: visibilityScopeEnum("visibility").default("team").notNull(),
    subject: varchar("subject", { length: 180 }),
    body: varchar("body", { length: 4000 }).notNull(),
    linkedObjectType: varchar("linked_object_type", { length: 80 }),
    linkedObjectId: uuid("linked_object_id"),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    index("internal_messages_account_id_idx").on(table.accountId),
    index("internal_messages_workspace_id_idx").on(table.workspaceId),
    index("internal_messages_author_profile_id_idx").on(table.authorProfileId),
    index("internal_messages_thread_key_idx").on(table.threadKey),
  ],
)

export const activityLog = pgTable(
  "activity_log",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    venueId: venueColumn().references(() => venues.id, { onDelete: "set null" }),
    workspaceId: uuid("workspace_id").references(() => eventWorkspaces.id, {
      onDelete: "cascade",
    }),
    actorProfileId: uuid("actor_profile_id").references(() => profiles.id, {
      onDelete: "set null",
    }),
    activityType: varchar("activity_type", { length: 120 }).notNull(),
    entityType: varchar("entity_type", { length: 120 }).notNull(),
    entityId: uuid("entity_id"),
    summary: varchar("summary", { length: 255 }).notNull(),
    details: metadataColumn("details"),
    visibility: visibilityScopeEnum("visibility").default("team").notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    metadata: metadataColumn(),
    ...timestampColumns(),
  },
  (table) => [
    index("activity_log_account_id_idx").on(table.accountId),
    index("activity_log_workspace_id_idx").on(table.workspaceId),
    index("activity_log_occurred_at_idx").on(table.occurredAt),
    index("activity_log_entity_idx").on(table.entityType, table.entityId),
  ],
)
