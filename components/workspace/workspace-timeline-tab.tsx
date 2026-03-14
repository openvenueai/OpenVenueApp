import { AddTimelineItemForm } from "@/components/workspace/add-timeline-item-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatting"
import type { timelineItems, timelines } from "@/db/schema"

type TimelineRow = typeof timelines.$inferSelect
type ItemRow = typeof timelineItems.$inferSelect

type WorkspaceTimelineTabProps = {
  workspaceId: string
  accountId: string
  profileId: string
  timeline: TimelineRow | null
  items: ItemRow[]
}

export function WorkspaceTimelineTab({
  workspaceId,
  accountId,
  profileId,
  timeline,
  items,
}: WorkspaceTimelineTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <p className="text-sm text-muted-foreground">
            {timeline
              ? "Day-of run-of-show and planning milestones."
              : "Create a timeline to add items."}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No timeline items yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-canvas p-3"
                >
                  <p className="font-medium text-juniper-strong">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.startAt ? formatDate(item.startAt) : "—"}
                    {item.endAt ? ` – ${formatDate(item.endAt)}` : ""}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add item</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTimelineItemForm
            workspaceId={workspaceId}
            accountId={accountId}
            profileId={profileId}
            timelineId={timeline?.id ?? null}
          />
        </CardContent>
      </Card>
    </div>
  )
}
