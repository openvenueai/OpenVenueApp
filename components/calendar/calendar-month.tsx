import Link from "next/link"
import type { CalendarDayItem } from "@/lib/calendar/queries"

type CalendarMonthProps = {
  year: number
  month: number
  itemsByDay: Record<string, CalendarDayItem[]>
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function getDaysInMonth(year: number, month: number) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const days: { date: Date; dayOfMonth: number; isCurrentMonth: true }[] = []
  for (let d = 1; d <= last.getDate(); d++) {
    days.push({
      date: new Date(year, month, d),
      dayOfMonth: d,
      isCurrentMonth: true,
    })
  }
  return days
}

function getCalendarGrid(year: number, month: number) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startPadding = first.getDay()
  const days = getDaysInMonth(year, month)
  const padding: { date: null; dayOfMonth: null; isCurrentMonth: false }[] = Array(
    startPadding,
  )
    .fill(null)
    .map(() => ({ date: null, dayOfMonth: null, isCurrentMonth: false as const }))
  return [...padding, ...days]
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function CalendarMonth({
  year,
  month,
  itemsByDay,
}: CalendarMonthProps) {
  const grid = getCalendarGrid(year, month)

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="grid grid-cols-7 border-b border-line bg-surface-muted/50 text-center text-sm font-medium text-muted-foreground">
        {DAY_NAMES.map((day) => (
          <div key={day} className="border-r border-line py-2 last:border-r-0">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {grid.map((cell, i) => {
          if (!cell.isCurrentMonth || !cell.date) {
            return (
              <div
                key={`pad-${i}`}
                className="min-h-[100px] border-b border-r border-line bg-canvas/50 p-2 last:border-r-0"
              />
            )
          }
          const key = dateKey(cell.date)
          const items = itemsByDay[key] ?? []
          return (
            <div
              key={key}
              className="min-h-[100px] border-b border-r border-line p-2 last:border-r-0"
            >
              <p className="text-xs font-medium text-muted-foreground">
                {cell.dayOfMonth}
              </p>
              <ul className="mt-2 space-y-1">
                {items.slice(0, 3).map((item) =>
                  item.type === "event" ? (
                    <li key={item.id}>
                      <Link
                        href={`/workspace/${item.workspaceId}`}
                        className="block truncate rounded bg-moss/20 px-1 py-0.5 text-xs text-juniper-strong hover:bg-moss/30"
                        title={item.title}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ) : (
                    <li key={item.id}>
                      <Link
                        href={
                          item.workspaceId
                            ? `/workspace/${item.workspaceId}?tab=tasks`
                            : "/tasks"
                        }
                        className="block truncate rounded bg-chart-2/20 px-1 py-0.5 text-xs text-warm-gold hover:bg-chart-2/30"
                        title={item.title}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ),
                )}
                {items.length > 3 ? (
                  <li className="text-xs text-muted-foreground">
                    +{items.length - 3} more
                  </li>
                ) : null}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function buildItemsByDay(
  events: CalendarDayItem[],
  taskItems: CalendarDayItem[],
): Record<string, CalendarDayItem[]> {
  const byDay: Record<string, CalendarDayItem[]> = {}
  const add = (key: string, item: CalendarDayItem) => {
    if (!byDay[key]) byDay[key] = []
    byDay[key].push(item)
  }
  events.forEach((e) => {
    const d = e.type === "event" ? e.start : null
    if (d) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
      add(key, e)
    }
  })
  taskItems.forEach((t) => {
    if (t.type === "task") {
      const d = t.dueAt
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
      add(key, t)
    }
  })
  return byDay
}
