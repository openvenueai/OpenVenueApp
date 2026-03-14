import process from "node:process"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { eq } from "drizzle-orm"
import * as schema from "../db/schema"
import {
  accountMemberships,
  accounts,
  activityLog,
  contacts,
  eventWorkspaces,
  internalMessages,
  notes,
  profiles,
  tasks,
  venueSpaces,
  venues,
} from "../db/schema"

process.loadEnvFile?.(".env.local")
process.loadEnvFile?.(".env")

const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@127.0.0.1:54322/postgres"

const sql = postgres(databaseUrl, {
  max: 1,
  prepare: false,
})

const db = drizzle(sql, { schema })

const seedIds = {
  account: "4fcf1f1a-7308-44bf-bf58-b08b1ecf1f11",
  venue: "0e102b0c-c9d4-49d6-8e8a-9847cc691201",
  space: "1c9a48dd-90e5-4382-b09b-6a6bd7f7d301",
  salesProfile: "24e6efcb-5819-47ca-86df-4c948b72d401",
  coordinatorProfile: "c7cc5366-b9cf-4e7c-b67f-b6d81857d402",
  contact: "e2bde9fd-92f7-4f14-8d4f-764ba239d501",
  workspace: "e54479d7-0fab-4095-9226-e3c3544f6601",
  task: "520a7dfc-2c82-4044-8eb6-4032ca4fec01",
  note: "8f4d8db7-b6f7-46ce-b549-5eaabb54dd01",
  message: "bb46b357-17fe-4146-97ba-778dc3943101",
  activity: "1c9e895d-3008-44d4-8e14-dc38aa31e001",
}

async function main() {
  await db.delete(activityLog)
  await db.delete(internalMessages)
  await db.delete(notes)
  await db.delete(tasks)
  await db.delete(eventWorkspaces)
  await db.delete(contacts)
  await db.delete(accountMemberships)
  await db.delete(venueSpaces)
  await db.delete(venues)
  await db.delete(profiles)
  await db.delete(accounts)

  await db.insert(accounts).values({
    id: seedIds.account,
    name: "OpenVenue Demo Group",
    slug: "openvenue-demo-group",
    businessName: "OpenVenue Hospitality Group",
    businessPhone: "(555) 210-4488",
    country: "United States",
    timezone: "America/New_York",
    currencyCode: "USD",
    accountType: "single_venue",
    planTier: "pro",
    onboardingStatus: "completed",
    createdBy: seedIds.salesProfile,
    updatedBy: seedIds.salesProfile,
  })

  await db.insert(profiles).values([
    {
      id: seedIds.salesProfile,
      authUserId: "c71b37f9-c4db-4e0e-9b31-f8c091f7d401",
      primaryAccountId: seedIds.account,
      firstName: "Avery",
      lastName: "Stone",
      fullName: "Avery Stone",
      email: "avery@openvenue.test",
      phone: "(555) 201-8800",
      status: "active",
    },
    {
      id: seedIds.coordinatorProfile,
      authUserId: "9c4a2fd0-b0ee-4e6b-9c7e-6be1e54f9402",
      primaryAccountId: seedIds.account,
      firstName: "Maya",
      lastName: "Brooks",
      fullName: "Maya Brooks",
      email: "maya@openvenue.test",
      phone: "(555) 201-8801",
      status: "active",
    },
  ])

  await db.insert(venues).values({
    id: seedIds.venue,
    accountId: seedIds.account,
    name: "Cedar Hall Events",
    slug: "cedar-hall-events",
    legalName: "Cedar Hall Events LLC",
    venueType: "wedding_venue",
    cateringModel: "in_house",
    timezone: "America/New_York",
    currencyCode: "USD",
    addressLine1: "125 Cedar Lane",
    city: "Hudson",
    stateRegion: "New York",
    postalCode: "12534",
    country: "United States",
    createdBy: seedIds.salesProfile,
    updatedBy: seedIds.salesProfile,
  })

  await db.insert(venueSpaces).values({
    id: seedIds.space,
    accountId: seedIds.account,
    venueId: seedIds.venue,
    name: "Grand Hall",
    slug: "grand-hall",
    spaceType: "reception_space",
    seatedCapacity: 180,
    cocktailCapacity: 240,
    notes: "Primary reception room with adjacent bar staging.",
    createdBy: seedIds.salesProfile,
    updatedBy: seedIds.salesProfile,
  })

  await db.insert(accountMemberships).values([
    {
      id: "d10e32f1-1b33-4185-8da8-c82670ea6101",
      accountId: seedIds.account,
      profileId: seedIds.salesProfile,
      role: "sales_manager",
      status: "active",
      accessScope: "all_venues",
      defaultVenueId: seedIds.venue,
      selectedVenueIds: [],
      invitedBy: seedIds.salesProfile,
      createdBy: seedIds.salesProfile,
      updatedBy: seedIds.salesProfile,
    },
    {
      id: "9a187d12-3878-4c84-b4d2-3501c6ae6102",
      accountId: seedIds.account,
      profileId: seedIds.coordinatorProfile,
      role: "coordinator",
      status: "active",
      accessScope: "all_venues",
      defaultVenueId: seedIds.venue,
      selectedVenueIds: [],
      invitedBy: seedIds.salesProfile,
      createdBy: seedIds.salesProfile,
      updatedBy: seedIds.salesProfile,
    },
  ])

  await db.insert(contacts).values({
    id: seedIds.contact,
    accountId: seedIds.account,
    venueId: seedIds.venue,
    ownerProfileId: seedIds.salesProfile,
    contactType: "lead",
    firstName: "Jordan",
    lastName: "Rivera",
    fullName: "Jordan Rivera",
    email: "jordan.rivera@example.com",
    phone: "(555) 410-8811",
    eventType: "wedding",
    source: "Website inquiry",
    leadStatus: "Awaiting proposal",
    createdBy: seedIds.salesProfile,
    updatedBy: seedIds.salesProfile,
  })

  await db.insert(eventWorkspaces).values({
    id: seedIds.workspace,
    accountId: seedIds.account,
    venueId: seedIds.venue,
    primarySpaceId: seedIds.space,
    primaryContactId: seedIds.contact,
    ownerProfileId: seedIds.salesProfile,
    coordinatorProfileId: seedIds.coordinatorProfile,
    title: "Rivera Wedding — June 14, 2027",
    slug: "rivera-wedding-june-14-2027",
    eventName: "Rivera Wedding",
    eventType: "wedding",
    stage: "proposal_sent",
    status: "active",
    source: "Website inquiry",
    guestCount: 140,
    budgetMinCents: 2200000,
    budgetMaxCents: 2800000,
    preferredDate: new Date("2027-06-14T18:00:00.000Z"),
    eventStartAt: new Date("2027-06-14T21:00:00.000Z"),
    eventEndAt: new Date("2027-06-15T03:00:00.000Z"),
    lastActivityAt: new Date("2026-03-14T15:00:00.000Z"),
    nextActionDueAt: new Date("2026-03-16T14:00:00.000Z"),
    summary:
      "Wedding lead with strong date intent, 140 guests, and interest in a full-service reception package.",
    internalSummary:
      "Proposal sent yesterday. Waiting on response to menu upgrade and ceremony add-on pricing.",
    createdBy: seedIds.salesProfile,
    updatedBy: seedIds.salesProfile,
  })

  await db.insert(tasks).values({
    id: seedIds.task,
    accountId: seedIds.account,
    venueId: seedIds.venue,
    workspaceId: seedIds.workspace,
    assignedToProfileId: seedIds.salesProfile,
    title: "Follow up on proposal questions",
    description: "Send a reply covering ceremony fee and bar package options.",
    status: "todo",
    priority: "high",
    source: "manual",
    dueAt: new Date("2026-03-16T14:00:00.000Z"),
    createdBy: seedIds.salesProfile,
    updatedBy: seedIds.salesProfile,
  })

  await db.insert(notes).values({
    id: seedIds.note,
    accountId: seedIds.account,
    venueId: seedIds.venue,
    workspaceId: seedIds.workspace,
    authorProfileId: seedIds.coordinatorProfile,
    noteType: "planning",
    visibility: "team",
    title: "Family preference",
    body: "Client mentioned wanting a quiet room for grandparents during dancing.",
    isPinned: true,
    linkedTaskId: seedIds.task,
    createdBy: seedIds.coordinatorProfile,
    updatedBy: seedIds.coordinatorProfile,
  })

  await db.insert(internalMessages).values({
    id: seedIds.message,
    accountId: seedIds.account,
    venueId: seedIds.venue,
    workspaceId: seedIds.workspace,
    authorProfileId: seedIds.salesProfile,
    threadKey: "rivera-wedding-internal",
    messageType: "question",
    visibility: "team",
    subject: "Confirm ceremony setup option",
    body: "Can we hold the indoor backup space until Jordan confirms outdoor preference?",
    createdBy: seedIds.salesProfile,
    updatedBy: seedIds.salesProfile,
  })

  await db.insert(activityLog).values({
    id: seedIds.activity,
    accountId: seedIds.account,
    venueId: seedIds.venue,
    workspaceId: seedIds.workspace,
    actorProfileId: seedIds.salesProfile,
    activityType: "proposal.sent",
    entityType: "proposal",
    summary: "Proposal version 1 was sent to Jordan Rivera.",
    details: {
      version: 1,
      totalCents: 2495000,
    },
    visibility: "team",
    createdAt: new Date("2026-03-14T14:30:00.000Z"),
    updatedAt: new Date("2026-03-14T14:30:00.000Z"),
  })

  const workspace = await db.query.eventWorkspaces.findFirst({
    where: eq(eventWorkspaces.id, seedIds.workspace),
  })

  console.log("Seed complete for workspace:", workspace?.title ?? seedIds.workspace)
}

main()
  .catch((error) => {
    console.error("Seed failed:", error)
    process.exitCode = 1
  })
  .finally(async () => {
    await sql.end()
  })
