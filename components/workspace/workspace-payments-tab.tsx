import { AddPaymentMilestoneForm } from "@/components/workspace/add-payment-milestone-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatting"
import type { contracts, paymentMilestones } from "@/db/schema"

type ContractRow = typeof contracts.$inferSelect
type MilestoneRow = typeof paymentMilestones.$inferSelect

type WorkspacePaymentsTabProps = {
  workspaceId: string
  accountId: string
  profileId: string
  contract: ContractRow | null
  milestones: MilestoneRow[]
}

function formatCents(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

export function WorkspacePaymentsTab({
  workspaceId,
  accountId,
  profileId,
  contract,
  milestones,
}: WorkspacePaymentsTabProps) {
  const totalCents = milestones.reduce((sum, m) => sum + m.amountCents, 0)
  const paidCents = milestones
    .filter((m) => m.status === "paid")
    .reduce((sum, m) => sum + m.amountCents, 0)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader>
          <CardTitle>Payments & Contract</CardTitle>
          <p className="text-sm text-muted-foreground">
            {contract
              ? `Status: ${contract.status}`
              : "No contract yet. Create one to add payment milestones."}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {milestones.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No payment milestones. Add one using the form on the right.
            </p>
          ) : (
            <>
              <ul className="space-y-3">
                {milestones.map((m) => (
                  <li
                    key={m.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-canvas p-3"
                  >
                    <div>
                      <p className="font-medium text-juniper-strong">
                        {m.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {m.dueAt ? formatDate(m.dueAt) : "—"} · {m.status}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatCents(m.amountCents)}
                      {m.status === "paid" && m.paidAt ? (
                        <span className="ml-2 text-xs text-muted-foreground">
                          Paid {formatDate(m.paidAt)}
                        </span>
                      ) : null}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="text-right text-sm text-muted-foreground">
                Total: {formatCents(totalCents)} · Paid: {formatCents(paidCents)}
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add milestone</CardTitle>
        </CardHeader>
        <CardContent>
          <AddPaymentMilestoneForm
            workspaceId={workspaceId}
            accountId={accountId}
            profileId={profileId}
            contractId={contract?.id ?? null}
          />
        </CardContent>
      </Card>
    </div>
  )
}
