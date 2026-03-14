import { and, desc, eq } from "drizzle-orm"
import { getDb } from "@/db/client"
import {
  activityLog,
  internalMessages,
  notes,
  profiles,
  tasks,
} from "@/db/schema"

export async function getNotesByWorkspace(workspaceId: string, accountId: string) {
  const db = getDb()
  const rows = await db
    .select({
      id: notes.id,
      title: notes.title,
      body: notes.body,
      noteType: notes.noteType,
      isPinned: notes.isPinned,
      createdAt: notes.createdAt,
      authorName: profiles.fullName,
    })
    .from(notes)
    .leftJoin(profiles, eq(notes.authorProfileId, profiles.id))
    .where(and(eq(notes.workspaceId, workspaceId), eq(notes.accountId, accountId)))
    .orderBy(desc(notes.isPinned), desc(notes.createdAt))
  return rows
}

export async function getMessagesByWorkspace(
  workspaceId: string,
  accountId: string,
) {
  const db = getDb()
  const rows = await db
    .select({
      id: internalMessages.id,
      subject: internalMessages.subject,
      body: internalMessages.body,
      messageType: internalMessages.messageType,
      threadKey: internalMessages.threadKey,
      parentMessageId: internalMessages.parentMessageId,
      createdAt: internalMessages.createdAt,
      authorName: profiles.fullName,
    })
    .from(internalMessages)
    .leftJoin(profiles, eq(internalMessages.authorProfileId, profiles.id))
    .where(
    and(
      eq(internalMessages.workspaceId, workspaceId),
      eq(internalMessages.accountId, accountId),
    ),
  )
    .orderBy(desc(internalMessages.createdAt))
  return rows
}

export async function getActivityByWorkspace(
  workspaceId: string,
  accountId: string,
  limit = 50,
) {
  const db = getDb()
  const rows = await db
    .select({
      id: activityLog.id,
      activityType: activityLog.activityType,
      entityType: activityLog.entityType,
      summary: activityLog.summary,
      occurredAt: activityLog.occurredAt,
      actorName: profiles.fullName,
    })
    .from(activityLog)
    .leftJoin(profiles, eq(activityLog.actorProfileId, profiles.id))
    .where(
    and(eq(activityLog.workspaceId, workspaceId), eq(activityLog.accountId, accountId)),
  )
    .orderBy(desc(activityLog.occurredAt))
    .limit(limit)
  return rows
}

export async function getTasksByWorkspace(workspaceId: string, accountId: string) {
  const db = getDb()
  const rows = await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      priority: tasks.priority,
      dueAt: tasks.dueAt,
      completedAt: tasks.completedAt,
      assignedToName: profiles.fullName,
    })
    .from(tasks)
    .leftJoin(profiles, eq(tasks.assignedToProfileId, profiles.id))
    .where(and(eq(tasks.workspaceId, workspaceId), eq(tasks.accountId, accountId)))
    .orderBy(desc(tasks.dueAt), desc(tasks.createdAt))
  return rows
}
