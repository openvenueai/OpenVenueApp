import Link from "next/link"
import type { DashboardData } from "@/lib/dashboard/queries"
import { formatDate } from "@/lib/formatting"
import { buttonVariants } from "@/components/ui/button-variants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type PriorityRailProps = {
  data: DashboardData
}

export function PriorityRail({ data }: PriorityRailProps) {
  const {
    needsResponse,
    overdueTasks,
    upcomingToday,
    paymentAlerts,
  } = data

  return (
    <div className="space-y-6">
      {/* Needs response */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Needs response
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {needsResponse.length === 0 ? (
            <p className="text-sm text-muted-foreground">None right now.</p>
          ) : (
            needsResponse.map((item) => (
              <Link
                key={item.workspaceId}
                href={`/workspace/${item.workspaceId}`}
                className="block rounded-lg border border-line bg-canvas px-3 py-2 text-sm transition hover:border-juniper/30 hover:bg-surface-muted/50"
              >
                <p className="font-medium text-juniper-strong">
                  {item.contactName ?? item.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.title} · {item.stage}
                </p>
                <span className="mt-2 inline-block text-xs font-medium text-juniper">
                  Draft follow-up
                </span>
              </Link>
            ))
          )}
          {needsResponse.length > 0 ? (
            <Link
              href="/leads"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              View all
            </Link>
          ) : null}
        </CardContent>
      </Card>

      {/* Overdue tasks */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Overdue tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {overdueTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">None.</p>
          ) : (
            overdueTasks.map((task) => (
              <Link
                key={task.taskId}
                href={task.workspaceId ? `/workspace/${task.workspaceId}?tab=tasks` : "/tasks"}
                className="block rounded-lg border border-line bg-canvas px-3 py-2 text-sm transition hover:border-juniper/30"
              >
                <p className="font-medium text-juniper-strong">{task.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Due {task.dueAt ? formatDate(task.dueAt) : "—"}
                  {task.workspaceTitle ? ` · ${task.workspaceTitle}` : ""}
                </p>
              </Link>
            ))
          )}
          {overdueTasks.length > 0 ? (
            <Link
              href="/tasks"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              View all
            </Link>
          ) : null}
        </CardContent>
      </Card>

      {/* Upcoming today */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Upcoming today
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {upcomingToday.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing scheduled.</p>
          ) : (
            upcomingToday.map((task) => (
              <Link
                key={task.taskId}
                href={task.workspaceId ? `/workspace/${task.workspaceId}?tab=tasks` : "/tasks"}
                className="block rounded-lg border border-line bg-canvas px-3 py-2 text-sm transition hover:border-juniper/30"
              >
                <p className="font-medium text-juniper-strong">{task.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {task.dueAt ? formatDate(task.dueAt) : "—"}
                  {task.workspaceTitle ? ` · ${task.workspaceTitle}` : ""}
                </p>
              </Link>
            ))
          )}
        </CardContent>
      </Card>

      {/* Payment / contract alerts */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Payment / contract alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paymentAlerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">None.</p>
          ) : (
            <ul className="space-y-2">
              {paymentAlerts.map((alert) => (
                <li key={alert.workspaceId}>
                  <Link
                    href={`/workspace/${alert.workspaceId}?tab=payments`}
                    className="text-sm font-medium text-juniper-strong hover:underline"
                  >
                    {alert.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {alert.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
