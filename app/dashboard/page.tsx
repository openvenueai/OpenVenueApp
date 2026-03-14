import Link from "next/link"
import { AppShell } from "@/components/app-shell/app-shell"
import { PriorityRail } from "@/components/dashboard/priority-rail"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button-variants"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAccountSnapshot } from "@/lib/account-context"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import { getDailyBriefing } from "@/lib/ai"
import { getDashboardData } from "@/lib/dashboard/queries"
import { formatDate } from "@/lib/formatting"
import { formatWorkspaceStage } from "@/lib/leads/constants"

function formatCurrencyCents(cents: number) {
  if (cents === 0) return "—"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

export default async function DashboardPage() {
  const user = await requireAuthenticatedUser("/dashboard")
  const snapshot = await getAccountSnapshot(user.id)

  if (!snapshot?.account) {
    return (
      <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-line bg-surface px-8 py-10 shadow-[0_22px_70px_rgba(28,43,38,0.08)]">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Dashboard
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-tight text-juniper-strong">
            Finish onboarding to unlock the dashboard.
          </h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Complete account and venue setup to see your pipeline, priorities,
            and active events here.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className={buttonVariants({ size: "lg" })}
              href="/onboarding"
            >
              Continue onboarding
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const [dashboardData, briefing] = await Promise.all([
    getDashboardData(snapshot.account.id),
    getDailyBriefing(snapshot.account.id),
  ])

  return (
    <AppShell activePath="/dashboard" snapshot={snapshot}>
      <div className="space-y-6">
        {/* AI daily briefing */}
        <Card className="border-moss/30 bg-moss/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-juniper-strong">
              Daily briefing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{briefing}</p>
            <Link
              href="#priority-rail"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Review priorities
            </Link>
          </CardContent>
        </Card>

        {/* Pipeline summary row */}
        <section className="overflow-x-auto">
          <div className="flex min-w-0 gap-3 pb-2">
            {dashboardData.pipelineStages.slice(0, 7).map((stage) => (
              <Card
                key={stage.stage}
                className="min-w-[120px] shrink-0 border-line"
              >
                <CardContent className="px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {stage.label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-juniper-strong">
                    {stage.count}
                  </p>
                  {stage.valueCents > 0 ? (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatCurrencyCents(stage.valueCents)}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main content: priority rail + active events table */}
        <div
          id="priority-rail"
          className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]"
        >
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <PriorityRail data={dashboardData} />
          </aside>

          <div className="min-w-0">
            <Card>
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle>Active events</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {dashboardData.activeEvents.length} event
                    {dashboardData.activeEvents.length === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/leads"
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    My events
                  </Link>
                  <Link
                    href="/leads"
                    className={buttonVariants({ size: "sm" })}
                  >
                    Add event
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {dashboardData.activeEvents.length === 0 ? (
                  <div className="border-t border-line px-6 py-12 text-center">
                    <p className="font-medium text-juniper-strong">
                      No active events yet.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      When new inquiries are added, they will appear here.
                    </p>
                    <Link
                      href="/leads"
                      className={buttonVariants({ size: "sm", className: "mt-4" })}
                    >
                      Add event
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-line bg-surface-muted/50">
                          <th className="px-4 py-3 font-medium text-juniper-strong">
                            Name
                          </th>
                          <th className="px-4 py-3 font-medium text-juniper-strong">
                            Status
                          </th>
                          <th className="px-4 py-3 font-medium text-juniper-strong">
                            Event date
                          </th>
                          <th className="px-4 py-3 font-medium text-juniper-strong text-right">
                            Size
                          </th>
                          <th className="px-4 py-3 font-medium text-juniper-strong">
                            Space
                          </th>
                          <th className="px-4 py-3 font-medium text-juniper-strong">
                            Last contacted
                          </th>
                          <th className="px-4 py-3 font-medium text-juniper-strong">
                            Owner
                          </th>
                          <th className="px-4 py-3 font-medium text-juniper-strong">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.activeEvents.map((row) => (
                          <tr
                            key={row.workspaceId}
                            className="border-b border-line transition hover:bg-moss/5"
                          >
                            <td className="px-4 py-3">
                              <Link
                                href={`/workspace/${row.workspaceId}`}
                                className="font-medium text-juniper-strong hover:underline"
                              >
                                {row.title}
                              </Link>
                              {row.contactName ? (
                                <p className="text-xs text-muted-foreground">
                                  {row.contactName}
                                </p>
                              ) : null}
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline">
                                {formatWorkspaceStage(row.stage)}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {row.eventStartAt
                                ? formatDate(row.eventStartAt)
                                : row.preferredDate
                                  ? formatDate(row.preferredDate)
                                  : "—"}
                            </td>
                            <td className="px-4 py-3 text-right text-muted-foreground">
                              {row.guestCount ?? "—"}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {row.venueName ?? "—"}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {row.lastActivityAt
                                ? formatDate(row.lastActivityAt)
                                : "—"}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {row.ownerName ?? "—"}
                            </td>
                            <td className="px-4 py-3">
                              <Link
                                href={`/workspace/${row.workspaceId}`}
                                className={buttonVariants({
                                  variant: "ghost",
                                  size: "sm",
                                })}
                              >
                                Open
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
