import { and, desc, eq, lt } from "drizzle-orm"
import { getDb } from "@/db/client"
import { eventWorkspaces, profiles, tasks } from "@/db/schema"

export type TaskListItem = {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  dueAt: Date | null
  completedAt: Date | null
  workspaceId: string | null
  workspaceTitle: string | null
  assignedToName: string | null
  createdAt: Date
}

export async function getTasksForAccount(
  accountId: string,
  options?: { assignedToProfileId?: string; overdueOnly?: boolean },
) {
  const db = getDb()
  const conditions = [eq(tasks.accountId, accountId)]
  if (options?.assignedToProfileId) {
    conditions.push(eq(tasks.assignedToProfileId, options.assignedToProfileId))
  }
  if (options?.overdueOnly) {
    conditions.push(eq(tasks.status, "todo"))
    conditions.push(lt(tasks.dueAt, new Date()))
  }

  const rows = await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      priority: tasks.priority,
      dueAt: tasks.dueAt,
      completedAt: tasks.completedAt,
      workspaceId: tasks.workspaceId,
      workspaceTitle: eventWorkspaces.title,
      assignedToName: profiles.fullName,
      createdAt: tasks.createdAt,
    })
    .from(tasks)
    .leftJoin(eventWorkspaces, eq(tasks.workspaceId, eventWorkspaces.id))
    .leftJoin(profiles, eq(tasks.assignedToProfileId, profiles.id))
    .where(and(...conditions))
    .orderBy(desc(tasks.dueAt), desc(tasks.createdAt))

  return rows as TaskListItem[]
}
