import { and, eq } from "drizzle-orm"
import { getDb } from "@/db/client"
import { contacts, eventWorkspaces, profiles, venues } from "@/db/schema"

export type WorkspaceWithDetails = {
  workspace: typeof eventWorkspaces.$inferSelect
  primaryContact: typeof contacts.$inferSelect | null
  venue: typeof venues.$inferSelect | null
  owner: typeof profiles.$inferSelect | null
}

export async function getWorkspaceOptionsForAccount(accountId: string) {
  const db = getDb()
  const rows = await db
    .select({ id: eventWorkspaces.id, title: eventWorkspaces.title })
    .from(eventWorkspaces)
    .where(eq(eventWorkspaces.accountId, accountId))
    .orderBy(eventWorkspaces.title)
  return rows
}

export async function getWorkspaceByIdAndAccount(
  workspaceId: string,
  accountId: string,
): Promise<WorkspaceWithDetails | null> {
  const db = getDb()

  const [row] = await db
    .select({
      workspace: eventWorkspaces,
      primaryContact: contacts,
      venue: venues,
      owner: profiles,
    })
    .from(eventWorkspaces)
    .leftJoin(contacts, eq(eventWorkspaces.primaryContactId, contacts.id))
    .leftJoin(venues, eq(eventWorkspaces.venueId, venues.id))
    .leftJoin(profiles, eq(eventWorkspaces.ownerProfileId, profiles.id))
    .where(
      and(
        eq(eventWorkspaces.id, workspaceId),
        eq(eventWorkspaces.accountId, accountId),
      ),
    )
    .limit(1)

  if (!row?.workspace) {
    return null
  }

  return {
    workspace: row.workspace,
    primaryContact: row.primaryContact ?? null,
    venue: row.venue ?? null,
    owner: row.owner ?? null,
  }
}
