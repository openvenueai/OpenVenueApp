import {
  boolean,
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"
import {
  accountTypeEnum,
  addressColumns,
  appRoleEnum,
  auditColumns,
  cateringModelEnum,
  checklistJsonColumn,
  idColumn,
  membershipAccessScopeEnum,
  membershipStatusEnum,
  metadataColumn,
  onboardingStatusEnum,
  planTierEnum,
  profileStatusEnum,
  spaceTypeEnum,
  stringArrayJsonColumn,
  tenantColumn,
  timestampColumns,
  venueTypeEnum,
} from "./common"

export const accounts = pgTable(
  "accounts",
  {
    id: idColumn(),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull(),
    businessName: varchar("business_name", { length: 160 }),
    websiteUrl: varchar("website_url", { length: 255 }),
    businessPhone: varchar("business_phone", { length: 40 }),
    country: varchar("country", { length: 120 }),
    timezone: varchar("timezone", { length: 120 }),
    currencyCode: varchar("currency_code", { length: 12 }).default("USD"),
    accountType: accountTypeEnum("account_type")
      .default("single_venue")
      .notNull(),
    planTier: planTierEnum("plan_tier").default("base").notNull(),
    venueCount: integer("venue_count").default(1).notNull(),
    onboardingStatus: onboardingStatusEnum("onboarding_status")
      .default("not_started")
      .notNull(),
    setupChecklist: checklistJsonColumn("setup_checklist"),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    uniqueIndex("accounts_slug_key").on(table.slug),
    index("accounts_plan_tier_idx").on(table.planTier),
    index("accounts_onboarding_status_idx").on(table.onboardingStatus),
  ],
)

export const profiles = pgTable(
  "profiles",
  {
    id: idColumn(),
    authUserId: uuid("auth_user_id").notNull(),
    primaryAccountId: uuid("primary_account_id").references(() => accounts.id, {
      onDelete: "set null",
    }),
    firstName: varchar("first_name", { length: 120 }),
    lastName: varchar("last_name", { length: 120 }),
    fullName: varchar("full_name", { length: 180 }),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 40 }),
    avatarUrl: varchar("avatar_url", { length: 255 }),
    status: profileStatusEnum("status").default("invited").notNull(),
    metadata: metadataColumn(),
    ...timestampColumns(),
  },
  (table) => [
    uniqueIndex("profiles_auth_user_id_key").on(table.authUserId),
    uniqueIndex("profiles_email_key").on(table.email),
    index("profiles_primary_account_idx").on(table.primaryAccountId),
  ],
)

export const venues = pgTable(
  "venues",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull(),
    legalName: varchar("legal_name", { length: 180 }),
    venueType: venueTypeEnum("venue_type").default("other").notNull(),
    cateringModel: cateringModelEnum("catering_model").default("in_house"),
    timezone: varchar("timezone", { length: 120 }),
    currencyCode: varchar("currency_code", { length: 12 }).default("USD"),
    isPrimary: boolean("is_primary").default(false).notNull(),
    ...addressColumns(),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    uniqueIndex("venues_account_slug_key").on(table.accountId, table.slug),
    index("venues_account_id_idx").on(table.accountId),
    index("venues_venue_type_idx").on(table.venueType),
  ],
)

export const venueSpaces = pgTable(
  "venue_spaces",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    venueId: uuid("venue_id")
      .notNull()
      .references(() => venues.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull(),
    spaceType: spaceTypeEnum("space_type").default("other").notNull(),
    seatedCapacity: integer("seated_capacity").default(0).notNull(),
    cocktailCapacity: integer("cocktail_capacity").default(0).notNull(),
    notes: varchar("notes", { length: 500 }),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    uniqueIndex("venue_spaces_venue_slug_key").on(table.venueId, table.slug),
    index("venue_spaces_account_id_idx").on(table.accountId),
    index("venue_spaces_venue_id_idx").on(table.venueId),
  ],
)

export const accountMemberships = pgTable(
  "account_memberships",
  {
    id: idColumn(),
    accountId: tenantColumn().references(() => accounts.id, { onDelete: "cascade" }),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    role: appRoleEnum("role").default("read_only").notNull(),
    status: membershipStatusEnum("status").default("invited").notNull(),
    accessScope: membershipAccessScopeEnum("access_scope")
      .default("all_venues")
      .notNull(),
    defaultVenueId: uuid("default_venue_id").references(() => venues.id, {
      onDelete: "set null",
    }),
    selectedVenueIds: stringArrayJsonColumn("selected_venue_ids"),
    invitedBy: uuid("invited_by").references(() => profiles.id, {
      onDelete: "set null",
    }),
    invitedAt: timestamp("invited_at", { withTimezone: true }).defaultNow().notNull(),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }),
    metadata: metadataColumn(),
    ...timestampColumns(),
    ...auditColumns(),
  },
  (table) => [
    uniqueIndex("account_memberships_account_profile_key").on(
      table.accountId,
      table.profileId,
    ),
    index("account_memberships_account_id_idx").on(table.accountId),
    index("account_memberships_profile_id_idx").on(table.profileId),
    index("account_memberships_role_idx").on(table.role),
    index("account_memberships_status_idx").on(table.status),
  ],
)
