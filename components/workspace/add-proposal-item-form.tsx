"use client"

import { useActionState } from "react"
import { createProposal, addProposalItem } from "@/lib/commercial/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type AddProposalItemFormProps = {
  workspaceId: string
  accountId: string
  profileId: string
  proposalId: string | null
}

export function AddProposalItemForm({
  workspaceId,
  accountId,
  profileId,
  proposalId,
}: AddProposalItemFormProps) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      const description = (formData.get("description") as string)?.trim()
      const quantity = parseInt((formData.get("quantity") as string) || "1", 10)
      const unitPriceCents = Math.round(
        parseFloat((formData.get("unitPrice") as string) || "0") * 100,
      )
      if (!description || unitPriceCents <= 0) return { ok: false }
      let pid = proposalId
      if (!pid) {
        pid = await createProposal({ accountId, workspaceId, profileId })
      }
      if (pid) {
        await addProposalItem({
          accountId,
          proposalId: pid,
          profileId,
          description,
          quantity: isNaN(quantity) ? 1 : quantity,
          unitPriceCents,
        })
      }
      return { ok: true }
    },
    null,
  )

  return (
    <form action={formAction} className="space-y-4">
      <Input name="description" placeholder="Description" required />
      <Input
        name="quantity"
        type="number"
        min={1}
        defaultValue={1}
        placeholder="Qty"
      />
      <Input
        name="unitPrice"
        type="number"
        step="0.01"
        min="0"
        placeholder="Unit price (USD)"
        required
      />
      <Button type="submit" disabled={!proposalId && false}>
        {proposalId ? "Add item" : "Create proposal & add item"}
      </Button>
      {state?.ok ? (
        <p className="text-sm text-muted-foreground">Added.</p>
      ) : null}
    </form>
  )
}
