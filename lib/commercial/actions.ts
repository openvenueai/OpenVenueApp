"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { getDb } from "@/db/client"
import {
  contracts,
  paymentMilestones,
  proposalItems,
  proposals,
} from "@/db/schema"

export async function createProposal(params: {
  accountId: string
  workspaceId: string
  profileId: string
}) {
  const db = getDb()
  const [proposal] = await db
    .insert(proposals)
    .values({
      accountId: params.accountId,
      workspaceId: params.workspaceId,
      version: 1,
      status: "draft",
      createdBy: params.profileId,
      updatedBy: params.profileId,
    })
    .returning()
  if (proposal) revalidatePath(`/workspace/${params.workspaceId}`)
  return proposal?.id ?? null
}

export async function addProposalItem(params: {
  accountId: string
  proposalId: string
  profileId: string
  description: string
  quantity: number
  unitPriceCents: number
}) {
  const db = getDb()
  const [item] = await db
    .insert(proposalItems)
    .values({
      accountId: params.accountId,
      proposalId: params.proposalId,
      description: params.description.slice(0, 500),
      quantity: params.quantity,
      unitPriceCents: params.unitPriceCents,
      createdBy: params.profileId,
      updatedBy: params.profileId,
    })
    .returning()
  if (item) {
    const [proposal] = await db
      .select({ workspaceId: proposals.workspaceId })
      .from(proposals)
      .where(eq(proposals.id, params.proposalId))
      .limit(1)
    if (proposal?.workspaceId)
      revalidatePath(`/workspace/${proposal.workspaceId}`)
  }
  return item?.id ?? null
}

export async function createContract(params: {
  accountId: string
  workspaceId: string
  profileId: string
  proposalId: string | null
}) {
  const db = getDb()
  const [contract] = await db
    .insert(contracts)
    .values({
      accountId: params.accountId,
      workspaceId: params.workspaceId,
      proposalId: params.proposalId,
      status: "draft",
      createdBy: params.profileId,
      updatedBy: params.profileId,
    })
    .returning()
  if (contract) revalidatePath(`/workspace/${params.workspaceId}`)
  return contract?.id ?? null
}

export async function addPaymentMilestone(params: {
  accountId: string
  contractId: string
  profileId: string
  label: string
  amountCents: number
  dueAt: Date | null
}) {
  const db = getDb()
  const [milestone] = await db
    .insert(paymentMilestones)
    .values({
      accountId: params.accountId,
      contractId: params.contractId,
      label: params.label.slice(0, 120),
      amountCents: params.amountCents,
      dueAt: params.dueAt,
      status: "pending",
      createdBy: params.profileId,
      updatedBy: params.profileId,
    })
    .returning()
  if (milestone) {
    const [c] = await db
      .select({ workspaceId: contracts.workspaceId })
      .from(contracts)
      .where(eq(contracts.id, params.contractId))
      .limit(1)
    if (c?.workspaceId) revalidatePath(`/workspace/${c.workspaceId}`)
  }
  return milestone?.id ?? null
}
