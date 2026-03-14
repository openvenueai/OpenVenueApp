"use client"

import { useActionState } from "react"
import { createContract, addPaymentMilestone } from "@/lib/commercial/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type AddPaymentMilestoneFormProps = {
  workspaceId: string
  accountId: string
  profileId: string
  contractId: string | null
}

export function AddPaymentMilestoneForm({
  workspaceId,
  accountId,
  profileId,
  contractId,
}: AddPaymentMilestoneFormProps) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      const label = (formData.get("label") as string)?.trim()
      const amountCents = Math.round(
        parseFloat((formData.get("amount") as string) || "0") * 100,
      )
      const dueStr = formData.get("dueAt") as string
      const dueAt = dueStr ? new Date(dueStr) : null
      if (!label || amountCents <= 0) return { ok: false }
      let cid = contractId
      if (!cid) {
        cid = await createContract({
          accountId,
          workspaceId,
          profileId,
          proposalId: null,
        })
      }
      if (cid) {
        await addPaymentMilestone({
          accountId,
          contractId: cid,
          profileId,
          label,
          amountCents,
          dueAt,
        })
      }
      return { ok: true }
    },
    null,
  )

  return (
    <form action={formAction} className="space-y-4">
      <Input name="label" placeholder="e.g. Deposit" required />
      <Input
        name="amount"
        type="number"
        step="0.01"
        min="0"
        placeholder="Amount (USD)"
        required
      />
      <Input name="dueAt" type="date" />
      <Button type="submit" disabled={!contractId && false}>
        {contractId ? "Add milestone" : "Create contract & add milestone"}
      </Button>
      {state?.ok ? (
        <p className="text-sm text-muted-foreground">Added.</p>
      ) : null}
    </form>
  )
}
