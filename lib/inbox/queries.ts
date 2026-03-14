import { and, desc, eq, isNull, or } from "drizzle-orm"
import { getDb } from "@/db/client"
import { eventWorkspaces, internalMessages, profiles } from "@/db/schema"

export type InboxThread = {
  workspaceId: string
  threadKey: string
  workspaceTitle: string
  lastMessageAt: Date
  preview: string
  messageCount: number
}

export async function getInboxThreads(accountId: string): Promise<InboxThread[]> {
  const db = getDb()
  const rows = await db
    .select({
      workspaceId: internalMessages.workspaceId,
      threadKey: internalMessages.threadKey,
      workspaceTitle: eventWorkspaces.title,
      lastMessageAt: internalMessages.createdAt,
      body: internalMessages.body,
    })
    .from(internalMessages)
    .innerJoin(
      eventWorkspaces,
      eq(internalMessages.workspaceId, eventWorkspaces.id),
    )
    .where(eq(internalMessages.accountId, accountId))
    .orderBy(desc(internalMessages.createdAt))

  const byThread = new Map<string, InboxThread>()
  for (const r of rows) {
    const key = `${r.workspaceId}:${r.threadKey ?? "default"}`
    if (!byThread.has(key)) {
      byThread.set(key, {
        workspaceId: r.workspaceId!,
        threadKey: r.threadKey ?? "default",
        workspaceTitle: r.workspaceTitle ?? "—",
        lastMessageAt: r.lastMessageAt,
        preview: (r.body ?? "").slice(0, 120),
        messageCount: 0,
      })
    }
    const t = byThread.get(key)!
    t.messageCount += 1
    if (r.lastMessageAt > t.lastMessageAt) {
      t.lastMessageAt = r.lastMessageAt
      t.preview = (r.body ?? "").slice(0, 120)
    }
  }
  return Array.from(byThread.values()).sort(
    (a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime(),
  )
}

export type InboxMessageRow = {
  id: string
  subject: string | null
  body: string
  messageType: string
  createdAt: Date
  authorName: string | null
}

export async function getMessagesForThread(
  accountId: string,
  workspaceId: string,
  threadKey: string,
): Promise<InboxMessageRow[]> {
  const db = getDb()
  const rows = await db
    .select({
      id: internalMessages.id,
      subject: internalMessages.subject,
      body: internalMessages.body,
      messageType: internalMessages.messageType,
      createdAt: internalMessages.createdAt,
      authorName: profiles.fullName,
    })
    .from(internalMessages)
    .leftJoin(profiles, eq(internalMessages.authorProfileId, profiles.id))
    .where(
      and(
        eq(internalMessages.accountId, accountId),
        eq(internalMessages.workspaceId, workspaceId),
        threadKey === "default"
          ? or(
              isNull(internalMessages.threadKey),
              eq(internalMessages.threadKey, "default"),
            )
          : eq(internalMessages.threadKey, threadKey),
      ),
    )
    .orderBy(internalMessages.createdAt)
  return rows as InboxMessageRow[]
}
