import { and, desc, eq } from "drizzle-orm"
import { getDb } from "@/db/client"
import {
  contracts,
  paymentMilestones,
  proposalItems,
  proposals,
} from "@/db/schema"

export async function getProposalForWorkspace(
  workspaceId: string,
  accountId: string,
) {
  const db = getDb()
  const [proposal] = await db
    .select()
    .from(proposals)
    .where(
      and(
        eq(proposals.workspaceId, workspaceId),
        eq(proposals.accountId, accountId),
      ),
    )
    .orderBy(desc(proposals.version))
    .limit(1)
  if (!proposal) return null
  const items = await db
    .select()
    .from(proposalItems)
    .where(eq(proposalItems.proposalId, proposal.id))
    .orderBy(proposalItems.lineOrder)
  return { proposal, items }
}

export async function getContractForWorkspace(
  workspaceId: string,
  accountId: string,
) {
  const db = getDb()
  const [contract] = await db
    .select()
    .from(contracts)
    .where(
      and(
        eq(contracts.workspaceId, workspaceId),
        eq(contracts.accountId, accountId),
      ),
    )
    .limit(1)
  if (!contract) return null
  const milestones = await db
    .select()
    .from(paymentMilestones)
    .where(eq(paymentMilestones.contractId, contract.id))
  return { contract, milestones }
}
