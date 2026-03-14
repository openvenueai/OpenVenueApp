import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { beos } from "@/db/schema"

type BeoRow = typeof beos.$inferSelect

type WorkspaceBeoTabProps = {
  workspaceId: string
  accountId: string
  profileId: string
  beo: BeoRow | null
}

export function WorkspaceBeoTab({
  workspaceId,
  accountId,
  profileId,
  beo,
}: WorkspaceBeoTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>BEO (Banquet Event Order)</CardTitle>
        <p className="text-sm text-muted-foreground">
          {beo
            ? `Version ${beo.version} · ${beo.status}`
            : "No BEO yet. Create one to compile event details for operational handoff."}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!beo ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            BEO compiles proposal, timeline, and event data into role-specific
            views (manager, kitchen, staff). Create a BEO to get started.
          </p>
        ) : (
          <div className="rounded-lg border border-line bg-canvas p-4">
            {beo.content ? (
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                {beo.content}
              </pre>
            ) : (
              <p className="text-sm text-muted-foreground">
                BEO content will be generated from proposal, timeline, and event
                data. Manager, kitchen, and staff views coming next.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
