"use server"

import { revalidatePath } from "next/cache"
import { and, eq } from "drizzle-orm"
import { getDb } from "@/db/client"
import {
  activityLog,
  internalMessages,
  notes,
  tasks,
} from "@/db/schema"

export async function createNote(params: {
  accountId: string
  workspaceId: string
  profileId: string
  title: string | null
  body: string
  noteType?: string
}) {
  const db = getDb()
  const [note] = await db
    .insert(notes)
    .values({
      accountId: params.accountId,
      workspaceId: params.workspaceId,
      authorProfileId: params.profileId,
      title: params.title?.slice(0, 180) ?? null,
      body: params.body.slice(0, 4000),
      noteType: (params.noteType as "general") ?? "general",
      createdBy: params.profileId,
      updatedBy: params.profileId,
    })
    .returning({ id: notes.id })
  if (note) {
    await logActivity({
      accountId: params.accountId,
      workspaceId: params.workspaceId,
      actorProfileId: params.profileId,
      activityType: "note.created",
      entityType: "note",
      entityId: note.id,
      summary: "Note added",
    })
    revalidatePath(`/workspace/${params.workspaceId}`)
  }
  return note?.id ?? null
}

export async function createMessage(params: {
  accountId: string
  workspaceId: string
  profileId: string
  subject: string | null
  body: string
  threadKey?: string | null
  parentMessageId?: string | null
}) {
  const db = getDb()
  const threadKey = params.threadKey ?? `thread-${params.workspaceId}-${Date.now()}`
  const [msg] = await db
    .insert(internalMessages)
    .values({
      accountId: params.accountId,
      workspaceId: params.workspaceId,
      authorProfileId: params.profileId,
      subject: params.subject?.slice(0, 180) ?? null,
      body: params.body.slice(0, 4000),
      threadKey,
      parentMessageId: params.parentMessageId ?? null,
      createdBy: params.profileId,
      updatedBy: params.profileId,
    })
    .returning({ id: internalMessages.id })
  if (msg) {
    await logActivity({
      accountId: params.accountId,
      workspaceId: params.workspaceId,
      actorProfileId: params.profileId,
      activityType: "message.sent",
      entityType: "internal_message",
      entityId: msg.id,
      summary: "Internal message sent",
    })
    revalidatePath(`/workspace/${params.workspaceId}`)
  }
  return msg?.id ?? null
}

export async function createTask(params: {
  accountId: string
  workspaceId: string | null
  profileId: string
  assignedToProfileId: string | null
  title: string
  description?: string | null
  dueAt?: Date | null
  priority?: "low" | "medium" | "high" | "urgent"
  source?: "manual" | "note_extraction" | "email_extraction"
  linkedObjectType?: string | null
  linkedObjectId?: string | null
}) {
  const db = getDb()
  const [task] = await db
    .insert(tasks)
    .values({
      accountId: params.accountId,
      workspaceId: params.workspaceId,
      assignedToProfileId: params.assignedToProfileId,
      title: params.title.slice(0, 180),
      description: params.description?.slice(0, 2000) ?? null,
      dueAt: params.dueAt ?? null,
      priority: params.priority ?? "medium",
      source: params.source ?? "manual",
      linkedObjectType: params.linkedObjectType ?? null,
      linkedObjectId: params.linkedObjectId ?? null,
      createdBy: params.profileId,
      updatedBy: params.profileId,
    })
    .returning({ id: tasks.id })
  if (task && params.workspaceId) {
    await logActivity({
      accountId: params.accountId,
      workspaceId: params.workspaceId,
      actorProfileId: params.profileId,
      activityType: "task.created",
      entityType: "task",
      entityId: task.id,
      summary: `Task created: ${params.title.slice(0, 80)}`,
    })
    revalidatePath(`/workspace/${params.workspaceId}`)
  }
  revalidatePath("/tasks")
  revalidatePath("/dashboard")
  return task?.id ?? null
}

export async function createTaskFromNote(params: {
  accountId: string
  workspaceId: string
  profileId: string
  noteId: string
  title: string
  dueAt?: Date | null
}) {
  const taskId = await createTask({
    accountId: params.accountId,
    workspaceId: params.workspaceId,
    profileId: params.profileId,
    assignedToProfileId: params.profileId,
    title: params.title,
    dueAt: params.dueAt,
    source: "note_extraction",
    linkedObjectType: "note",
    linkedObjectId: params.noteId,
  })
  if (taskId) {
    const db = getDb()
    await db
      .update(notes)
      .set({
        linkedTaskId: taskId,
        updatedBy: params.profileId,
        updatedAt: new Date(),
      })
      .where(eq(notes.id, params.noteId))
    revalidatePath(`/workspace/${params.workspaceId}`)
  }
  return taskId
}

export async function updateTaskStatus(params: {
  taskId: string
  accountId: string
  status: "todo" | "in_progress" | "waiting" | "completed" | "cancelled"
  profileId: string
}) {
  const db = getDb()
  const [updated] = await db
    .update(tasks)
    .set({
      status: params.status,
      completedAt: params.status === "completed" ? new Date() : null,
      updatedBy: params.profileId,
      updatedAt: new Date(),
    })
    .where(and(eq(tasks.id, params.taskId), eq(tasks.accountId, params.accountId)))
    .returning({ id: tasks.id, workspaceId: tasks.workspaceId })
  if (updated?.workspaceId) revalidatePath(`/workspace/${updated.workspaceId}`)
  revalidatePath("/tasks")
  revalidatePath("/dashboard")
  return updated?.id ?? null
}

async function logActivity(params: {
  accountId: string
  workspaceId: string
  actorProfileId: string
  activityType: string
  entityType: string
  entityId?: string
  summary: string
}) {
  const db = getDb()
  await db.insert(activityLog).values({
    accountId: params.accountId,
    workspaceId: params.workspaceId,
    actorProfileId: params.actorProfileId,
    activityType: params.activityType,
    entityType: params.entityType,
    entityId: params.entityId ?? null,
    summary: params.summary.slice(0, 255),
  })
}
