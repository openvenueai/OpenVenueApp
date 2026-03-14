"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { getDb } from "@/db/client"
import { timelineItems, timelines } from "@/db/schema"

export async function createTimeline(params: {
  accountId: string
  workspaceId: string
  profileId: string
  title: string
}) {
  const db = getDb()
  const [timeline] = await db
    .insert(timelines)
    .values({
      accountId: params.accountId,
      workspaceId: params.workspaceId,
      title: params.title.slice(0, 180),
      kind: "day_of",
      createdBy: params.profileId,
      updatedBy: params.profileId,
    })
    .returning()
  if (timeline) revalidatePath(`/workspace/${params.workspaceId}`)
  return timeline?.id ?? null
}

export async function addTimelineItem(params: {
  accountId: string
  timelineId: string
  profileId: string
  title: string
  startAt?: Date | null
  endAt?: Date | null
  location?: string | null
}) {
  const db = getDb()
  const [item] = await db
    .insert(timelineItems)
    .values({
      accountId: params.accountId,
      timelineId: params.timelineId,
      title: params.title.slice(0, 180),
      startAt: params.startAt ?? null,
      endAt: params.endAt ?? null,
      location: params.location?.slice(0, 120) ?? null,
      createdBy: params.profileId,
      updatedBy: params.profileId,
    })
    .returning()
  if (item) {
    const [t] = await db
      .select({ workspaceId: timelines.workspaceId })
      .from(timelines)
      .where(eq(timelines.id, params.timelineId))
      .limit(1)
    if (t?.workspaceId) revalidatePath(`/workspace/${t.workspaceId}`)
  }
  return item?.id ?? null
}
