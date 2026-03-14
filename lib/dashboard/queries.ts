import { and, desc, eq, sql } from "drizzle-orm"
import { getDb } from "@/db/client"
import { contacts, eventWorkspaces, profiles, tasks, venues } from "@/db/schema"
import { PROPOSAL_PIPELINE_STAGES } from "@/lib/leads/constants"

export type PipelineStageCount = {
  stage: string
  label: string
  count: number
  valueCents: number
}

export type ActiveEventRow = {
  workspaceId: string
  title: string
  stage: string
  status: string
  eventType: string | null
  contactName: string | null
  eventStartAt: Date | null
  preferredDate: Date | null
  guestCount: number | null
  venueName: string | null
  lastActivityAt: Date | null
  createdAt: Date
  ownerName: string | null
}

export type NeedsResponseItem = {
  workspaceId: string
  title: string
  contactName: string | null
  stage: string
}

export type OverdueTaskItem = {
  taskId: string
  title: string
  dueAt: Date | null
  workspaceId: string | null
  workspaceTitle: string | null
}

export type DashboardData = {
  pipelineStages: PipelineStageCount[]
  activeEvents: ActiveEventRow[]
  needsResponse: NeedsResponseItem[]
  overdueTasks: OverdueTaskItem[]
  upcomingToday: OverdueTaskItem[]
  paymentAlerts: { workspaceId: string; title: string; message: string }[]
}

const STAGE_LABELS: Record<string, string> = {
  lead: "Lead",
  qualified: "Qualified",
  proposal_in_progress: "Proposal in progress",
  proposal_sent: "Proposal sent",
  negotiation: "Negotiation",
  contract_pending: "Contract pending",
  booked: "Confirmed",
  planning: "Planning",
  final_review: "Final review",
  completed: "Completed YTD",
  archived: "Archived",
}

export async function getDashboardData(
  accountId: string,
): Promise<DashboardData> {
  const db = getDb()
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  )

  const [workspaces, taskRows] = await Promise.all([
    db
      .select({
        id: eventWorkspaces.id,
        title: eventWorkspaces.title,
        stage: eventWorkspaces.stage,
        status: eventWorkspaces.status,
        eventType: eventWorkspaces.eventType,
        guestCount: eventWorkspaces.guestCount,
        preferredDate: eventWorkspaces.preferredDate,
        eventStartAt: eventWorkspaces.eventStartAt,
        lastActivityAt: eventWorkspaces.lastActivityAt,
        createdAt: eventWorkspaces.createdAt,
        budgetMinCents: eventWorkspaces.budgetMinCents,
        budgetMaxCents: eventWorkspaces.budgetMaxCents,
        primaryContactId: eventWorkspaces.primaryContactId,
        venueId: eventWorkspaces.venueId,
        ownerProfileId: eventWorkspaces.ownerProfileId,
        contactName: contacts.fullName,
        venueName: venues.name,
        ownerName: profiles.fullName,
      })
      .from(eventWorkspaces)
      .leftJoin(contacts, eq(eventWorkspaces.primaryContactId, contacts.id))
      .leftJoin(venues, eq(eventWorkspaces.venueId, venues.id))
      .leftJoin(profiles, eq(eventWorkspaces.ownerProfileId, profiles.id))
      .where(eq(eventWorkspaces.accountId, accountId))
      .orderBy(
        desc(
          sql`coalesce(${eventWorkspaces.lastActivityAt}, ${eventWorkspaces.createdAt})`,
        ),
      ),
    db
      .select({
        taskId: tasks.id,
        title: tasks.title,
        dueAt: tasks.dueAt,
        workspaceId: tasks.workspaceId,
        workspaceTitle: eventWorkspaces.title,
      })
      .from(tasks)
      .leftJoin(eventWorkspaces, eq(tasks.workspaceId, eventWorkspaces.id))
      .where(
        and(
          eq(tasks.accountId, accountId),
          eq(tasks.status, "todo"),
        ),
      ),
  ])

  const activeWorkspaces = workspaces.filter(
    (w) =>
      w.status !== "lost" &&
      w.status !== "cancelled",
  )
  let totalValueCents = 0
  const activeByStage = activeWorkspaces.reduce<
    Record<string, { count: number; valueCents: number }>
  >((acc, w) => {
    const stage = w.stage ?? "lead"
    if (!acc[stage]) acc[stage] = { count: 0, valueCents: 0 }
    acc[stage].count += 1
    const value =
      ((Number(w.budgetMinCents ?? 0) + Number(w.budgetMaxCents ?? 0)) / 2) || 0
    acc[stage].valueCents += value
    totalValueCents += value
    return acc
  }, {})

  const pipelineStages: PipelineStageCount[] = [
    {
      stage: "active",
      label: "Active events",
      count: activeWorkspaces.length,
      valueCents: totalValueCents,
    },
    ...Object.entries(activeByStage).map(([stage, { count, valueCents }]) => ({
      stage,
      label: STAGE_LABELS[stage] ?? stage,
      count,
      valueCents,
    })),
  ]

  const activeEvents: ActiveEventRow[] = activeWorkspaces.map((w) => ({
    workspaceId: w.id,
    title: w.title,
    stage: w.stage ?? "lead",
    status: w.status ?? "active",
    eventType: w.eventType,
    contactName: w.contactName,
    eventStartAt: w.eventStartAt,
    preferredDate: w.preferredDate,
    guestCount: w.guestCount,
    venueName: w.venueName,
    lastActivityAt: w.lastActivityAt,
    createdAt: w.createdAt,
    ownerName: w.ownerName,
  }))

  const needsResponse: NeedsResponseItem[] = activeWorkspaces
    .filter((w) => w.stage === "lead" || w.stage === "proposal_sent")
    .slice(0, 5)
    .map((w) => ({
      workspaceId: w.id,
      title: w.title,
      contactName: w.contactName,
      stage: w.stage ?? "lead",
    }))

  const overdueTasks: OverdueTaskItem[] = taskRows
    .filter((t) => t.dueAt && t.dueAt < startOfToday)
    .slice(0, 5)
    .map((t) => ({
      taskId: t.taskId,
      title: t.title,
      dueAt: t.dueAt,
      workspaceId: t.workspaceId ?? null,
      workspaceTitle: t.workspaceTitle ?? null,
    }))

  const upcomingToday: OverdueTaskItem[] = taskRows
    .filter(
      (t) =>
        t.dueAt && t.dueAt >= startOfToday && t.dueAt < endOfToday,
    )
    .slice(0, 5)
    .map((t) => ({
      taskId: t.taskId,
      title: t.title,
      dueAt: t.dueAt,
      workspaceId: t.workspaceId ?? null,
      workspaceTitle: t.workspaceTitle ?? null,
    }))

  const paymentAlerts: { workspaceId: string; title: string; message: string }[] = []

  return {
    pipelineStages,
    activeEvents,
    needsResponse,
    overdueTasks,
    upcomingToday,
    paymentAlerts,
  }
}
