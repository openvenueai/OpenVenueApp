import { AddProposalItemForm } from "@/components/workspace/add-proposal-item-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { proposalItems, proposals } from "@/db/schema"

type ProposalRow = typeof proposals.$inferSelect
type ItemRow = typeof proposalItems.$inferSelect

type WorkspaceProposalTabProps = {
  workspaceId: string
  accountId: string
  profileId: string
  proposal: ProposalRow | null
  items: ItemRow[]
}

function formatCents(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

export function WorkspaceProposalTab({
  workspaceId,
  accountId,
  profileId,
  proposal,
  items,
}: WorkspaceProposalTabProps) {
  const totalCents =
    proposal?.totalCents ??
    items.reduce((sum, i) => sum + i.quantity * i.unitPriceCents, 0)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader>
          <CardTitle>Proposal</CardTitle>
          <p className="text-sm text-muted-foreground">
            {proposal
              ? `Version ${proposal.version} · ${proposal.status}`
              : "No proposal yet. Create one to add line items."}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No line items. Add items using the form on the right.
            </p>
          ) : (
            <>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="pb-2 font-medium">Description</th>
                    <th className="pb-2 text-right">Qty</th>
                    <th className="pb-2 text-right">Unit price</th>
                    <th className="pb-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((i) => (
                    <tr key={i.id} className="border-b border-line">
                      <td className="py-2">{i.description}</td>
                      <td className="py-2 text-right">{i.quantity}</td>
                      <td className="py-2 text-right">
                        {formatCents(i.unitPriceCents)}
                      </td>
                      <td className="py-2 text-right">
                        {formatCents(i.quantity * i.unitPriceCents)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-right font-semibold text-juniper-strong">
                Total: {formatCents(totalCents)}
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add line item</CardTitle>
        </CardHeader>
        <CardContent>
          <AddProposalItemForm
            workspaceId={workspaceId}
            accountId={accountId}
            profileId={profileId}
            proposalId={proposal?.id ?? null}
          />
        </CardContent>
      </Card>
    </div>
  )
}
