"use server"

import { revalidatePath } from "next/cache"
import { getDb } from "@/db/client"
import { beos } from "@/db/schema"

export async function createBeo(params: {
  accountId: string
  workspaceId: string
  profileId: string
}) {
  const db = getDb()
  const [beo] = await db
    .insert(beos)
    .values({
      accountId: params.accountId,
      workspaceId: params.workspaceId,
      version: 1,
      status: "draft",
      content: "",
      createdBy: params.profileId,
      updatedBy: params.profileId,
    })
    .returning()
  if (beo) revalidatePath(`/workspace/${params.workspaceId}`)
  return beo?.id ?? null
}
