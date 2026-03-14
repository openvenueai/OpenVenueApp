import { and, eq, sql } from "drizzle-orm"
import { getDb } from "@/db/client"
import {
  accountMemberships,
  accounts,
  eventWorkspaces,
  profiles,
  tasks,
  venues,
} from "@/db/schema"

export type AccountSnapshot = {
  profile: typeof profiles.$inferSelect
  membership: typeof accountMemberships.$inferSelect | null
  account: typeof accounts.$inferSelect | null
  venues: Array<typeof venues.$inferSelect>
  workspaceCount: number
  taskCount: number
}

export async function getAccountSnapshot(authUserId: string) {
  try {
    const db = getDb()
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.authUserId, authUserId))
      .limit(1)

    if (!profile) {
      return null
    }

    const [membership] = await db
      .select()
      .from(accountMemberships)
      .where(
        profile.primaryAccountId
          ? and(
              eq(accountMemberships.profileId, profile.id),
              eq(accountMemberships.accountId, profile.primaryAccountId),
            )
          : eq(accountMemberships.profileId, profile.id),
      )
      .limit(1)

    if (!membership) {
      return {
        profile,
        membership: null,
        account: null,
        venues: [],
        workspaceCount: 0,
        taskCount: 0,
      } satisfies AccountSnapshot
    }

    const [account] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, membership.accountId))
      .limit(1)

    if (!account) {
      return {
        profile,
        membership,
        account: null,
        venues: [],
        workspaceCount: 0,
        taskCount: 0,
      } satisfies AccountSnapshot
    }

    const [venueRecords, workspaceCountResult, taskCountResult] = await Promise.all([
      db.select().from(venues).where(eq(venues.accountId, account.id)),
      db
        .select({
          count: sql<number>`count(*)::int`,
        })
        .from(eventWorkspaces)
        .where(eq(eventWorkspaces.accountId, account.id)),
      db
        .select({
          count: sql<number>`count(*)::int`,
        })
        .from(tasks)
        .where(eq(tasks.accountId, account.id)),
    ])

    return {
      profile,
      membership,
      account,
      venues: venueRecords,
      workspaceCount: workspaceCountResult[0]?.count ?? 0,
      taskCount: taskCountResult[0]?.count ?? 0,
    } satisfies AccountSnapshot
  } catch {
    return null
  }
}
