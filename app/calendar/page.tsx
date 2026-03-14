import Link from "next/link"
import { redirect } from "next/navigation"
import { AppShell } from "@/components/app-shell/app-shell"
import { CalendarMonth, buildItemsByDay } from "@/components/calendar/calendar-month"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAccountSnapshot } from "@/lib/account-context"
import { canAccessAppPath } from "@/lib/app-shell/navigation"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import { getCalendarItemsForMonth } from "@/lib/calendar/queries"

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

type CalendarPageProps = {
  searchParams: Promise<{ month?: string; year?: string }>
}

export default async function CalendarPage({ searchParams }: CalendarPageProps) {
  const user = await requireAuthenticatedUser("/calendar")
  const snapshot = await getAccountSnapshot(user.id)

  if (!snapshot?.account || !snapshot.membership) {
    redirect("/onboarding")
  }

  if (!canAccessAppPath(snapshot.membership.role, "/calendar")) {
    redirect("/dashboard")
  }

  const params = await searchParams
  const now = new Date()
  const year = params.year ? parseInt(params.year, 10) : now.getFullYear()
  const month = params.month ? parseInt(params.month, 10) - 1 : now.getMonth()
  const safeMonth = Math.max(0, Math.min(11, month))
  const safeYear = year

  const { events, tasks } = await getCalendarItemsForMonth(
    snapshot.account.id,
    safeYear,
    safeMonth,
  )
  const itemsByDay = buildItemsByDay(events, tasks)

  const prevMonth = safeMonth === 0 ? 11 : safeMonth - 1
  const prevYear = safeMonth === 0 ? safeYear - 1 : safeYear
  const nextMonth = safeMonth === 11 ? 0 : safeMonth + 1
  const nextYear = safeMonth === 11 ? safeYear + 1 : safeYear

  return (
    <AppShell activePath="/calendar" snapshot={snapshot}>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
            <CardTitle>
              Calendar — {MONTH_NAMES[safeMonth]} {safeYear}
            </CardTitle>
            <nav className="flex gap-2">
              <Link
                href={`/calendar?year=${prevYear}&month=${prevMonth + 1}`}
                className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium hover:bg-surface-muted"
              >
                Previous
              </Link>
              <Link
                href={`/calendar?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}`}
                className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium hover:bg-surface-muted"
              >
                Today
              </Link>
              <Link
                href={`/calendar?year=${nextYear}&month=${nextMonth + 1}`}
                className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium hover:bg-surface-muted"
              >
                Next
              </Link>
            </nav>
          </CardHeader>
          <CardContent>
            <CalendarMonth
              year={safeYear}
              month={safeMonth}
              itemsByDay={itemsByDay}
            />
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground">
          Events link to Event Workspace. Tasks link to workspace Tasks tab or
          Tasks page.
        </p>
      </div>
    </AppShell>
  )
}
