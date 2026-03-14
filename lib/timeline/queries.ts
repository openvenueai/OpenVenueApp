import { and, eq } from "drizzle-orm"
import { getDb } from "@/db/client"
import { timelineItems, timelines } from "@/db/schema"

export async function getTimelineForWorkspace(
  workspaceId: string,
  accountId: string,
) {
  const db = getDb()
  const [timeline] = await db
    .select()
    .from(timelines)
    .where(
      and(
        eq(timelines.workspaceId, workspaceId),
        eq(timelines.accountId, accountId),
      ),
    )
    .limit(1)
  if (!timeline) return null
  const items = await db
    .select()
    .from(timelineItems)
    .where(eq(timelineItems.timelineId, timeline.id))
    .orderBy(timelineItems.lineOrder)
  return { timeline, items }
}
