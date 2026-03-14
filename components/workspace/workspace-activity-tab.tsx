import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatting"

type ActivityRow = {
  id: string
  activityType: string
  entityType: string
  summary: string
  occurredAt: Date
  actorName: string | null
}

type WorkspaceActivityTabProps = {
  activity: ActivityRow[]
}

export function WorkspaceActivityTab({ activity }: WorkspaceActivityTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <p className="text-sm text-muted-foreground">
          Recent changes and events for this workspace.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {activity.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No activity yet.
          </p>
        ) : (
          activity.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 rounded-lg border border-line bg-canvas px-3 py-2"
            >
              <span className="text-xs text-muted-foreground shrink-0">
                {formatDate(item.occurredAt)}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-juniper-strong">{item.summary}</p>
                {item.actorName ? (
                  <p className="text-xs text-muted-foreground">
                    {item.actorName}
                  </p>
                ) : null}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
