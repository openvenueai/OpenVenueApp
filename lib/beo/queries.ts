import { and, eq } from "drizzle-orm"
import { getDb } from "@/db/client"
import { beos } from "@/db/schema"

export async function getBeoForWorkspace(
  workspaceId: string,
  accountId: string,
) {
  const db = getDb()
  const [beo] = await db
    .select()
    .from(beos)
    .where(
      and(
        eq(beos.workspaceId, workspaceId),
        eq(beos.accountId, accountId),
      ),
    )
    .limit(1)
  return beo ?? null
}
