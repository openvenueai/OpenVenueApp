import { desc, eq, sql } from "drizzle-orm"
import { getDb } from "@/db/client"
import { contacts, eventWorkspaces, venues } from "@/db/schema"
import { PROPOSAL_PIPELINE_STAGES } from "@/lib/leads/constants"

type WorkspaceRecord = typeof eventWorkspaces.$inferSelect

export type LeadListItem = {
  workspaceId: string
  title: string
  stage: WorkspaceRecord["stage"]
  status: WorkspaceRecord["status"]
  eventType: WorkspaceRecord["eventType"]
  source: string | null
  guestCount: number | null
  preferredDate: Date | null
  createdAt: Date
  lastActivityAt: Date | null
  contactId: string | null
  contactName: string | null
  contactEmail: string | null
  contactPhone: string | null
  companyName: string | null
  venueName: string | null
  summary: string | null
}

export type LeadsIndexData = {
  leads: LeadListItem[]
  counts: {
    total: number
    new: number
    proposal: number
    booked: number
    closed: number
  }
}

export async function getLeadsIndexData(accountId: string): Promise<LeadsIndexData> {
  const db = getDb()
  const rows = await db
    .select({
      workspaceId: eventWorkspaces.id,
      title: eventWorkspaces.title,
      stage: eventWorkspaces.stage,
      status: eventWorkspaces.status,
      eventType: eventWorkspaces.eventType,
      source: eventWorkspaces.source,
      guestCount: eventWorkspaces.guestCount,
      preferredDate: eventWorkspaces.preferredDate,
      createdAt: eventWorkspaces.createdAt,
      lastActivityAt: eventWorkspaces.lastActivityAt,
      summary: eventWorkspaces.summary,
      contactId: contacts.id,
      contactName: contacts.fullName,
      contactEmail: contacts.email,
      contactPhone: contacts.phone,
      companyName: contacts.companyName,
      venueName: venues.name,
    })
    .from(eventWorkspaces)
    .leftJoin(contacts, eq(eventWorkspaces.primaryContactId, contacts.id))
    .leftJoin(venues, eq(eventWorkspaces.venueId, venues.id))
    .where(eq(eventWorkspaces.accountId, accountId))
    .orderBy(
      desc(sql`coalesce(${eventWorkspaces.lastActivityAt}, ${eventWorkspaces.createdAt})`),
    )

  return {
    leads: rows,
    counts: {
      total: rows.length,
      new: rows.filter((row) => row.stage === "lead").length,
      proposal: rows.filter((row) =>
        PROPOSAL_PIPELINE_STAGES.includes(
          row.stage as (typeof PROPOSAL_PIPELINE_STAGES)[number],
        ),
      ).length,
      booked: rows.filter(
        (row) => row.stage === "booked" || row.status === "won",
      ).length,
      closed: rows.filter(
        (row) => row.status === "lost" || row.status === "cancelled",
      ).length,
    },
  }
}
