import { and, eq, gte, lte, or } from "drizzle-orm"
import { getDb } from "@/db/client"
import { eventWorkspaces, tasks } from "@/db/schema"

export type CalendarEventItem = {
  id: string
  type: "event"
  workspaceId: string
  title: string
  start: Date
  end: Date | null
  eventType: string | null
}

export type CalendarTaskItem = {
  id: string
  type: "task"
  taskId: string
  workspaceId: string | null
  workspaceTitle: string | null
  title: string
  dueAt: Date
}

export type CalendarDayItem = CalendarEventItem | CalendarTaskItem

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999)
}

export async function getCalendarItemsForMonth(
  accountId: string,
  year: number,
  month: number,
) {
  const db = getDb()
  const start = startOfMonth(new Date(year, month, 1))
  const end = endOfMonth(new Date(year, month, 1))

  const [workspaces, taskRows] = await Promise.all([
    db
      .select({
        id: eventWorkspaces.id,
        title: eventWorkspaces.title,
        eventStartAt: eventWorkspaces.eventStartAt,
        eventEndAt: eventWorkspaces.eventEndAt,
        preferredDate: eventWorkspaces.preferredDate,
        eventType: eventWorkspaces.eventType,
      })
      .from(eventWorkspaces)
      .where(
        and(
          eq(eventWorkspaces.accountId, accountId),
          or(
            and(
              gte(eventWorkspaces.eventStartAt, start),
              lte(eventWorkspaces.eventStartAt, end),
            ),
            and(
              gte(eventWorkspaces.preferredDate, start),
              lte(eventWorkspaces.preferredDate, end),
            ),
          ),
        ),
      ),
    db
      .select({
        id: tasks.id,
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
          gte(tasks.dueAt, start),
          lte(tasks.dueAt, end),
        ),
      ),
  ])

  const events: CalendarEventItem[] = workspaces
    .filter((w) => {
      const d = w.eventStartAt ?? w.preferredDate
      return d && d >= start && d <= end
    })
    .map((w) => {
      const startDate = w.eventStartAt ?? w.preferredDate!
      return {
        id: w.id,
        type: "event" as const,
        workspaceId: w.id,
        title: w.title,
        start: startDate,
        end: w.eventEndAt ?? null,
        eventType: w.eventType,
      }
    })

  const taskItems: CalendarTaskItem[] = taskRows.map((t) => ({
    id: `task-${t.id}`,
    type: "task" as const,
    taskId: t.id,
    workspaceId: t.workspaceId,
    workspaceTitle: t.workspaceTitle,
    title: t.title,
    dueAt: t.dueAt!,
  }))

  return { events, tasks: taskItems }
}
