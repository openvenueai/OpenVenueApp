import Link from "next/link"
import { InboxReplyForm } from "@/components/inbox/inbox-reply-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatting"
import type { InboxMessageRow } from "@/lib/inbox/queries"

type InboxThreadDetailProps = {
  workspaceId: string
  threadKey: string
  workspaceTitle: string
  messages: InboxMessageRow[]
  accountId: string
  profileId: string
}

export function InboxThreadDetail({
  workspaceId,
  threadKey,
  workspaceTitle,
  messages,
  accountId,
  profileId,
}: InboxThreadDetailProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-line">
        <div>
          <CardTitle className="text-lg">{workspaceTitle}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Internal thread · {messages.length} message
            {messages.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href={`/workspace/${workspaceId}?tab=messages`}
          className="text-sm font-medium text-juniper hover:underline"
        >
          Open workspace
        </Link>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No messages in this thread.
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-lg border border-line bg-canvas p-4"
              >
                <p className="font-medium text-juniper-strong">
                  {msg.subject ?? "No subject"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDate(msg.createdAt)}
                  {msg.authorName ? ` · ${msg.authorName}` : ""}
                </p>
                <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
                  {msg.body}
                </p>
              </div>
            ))
          )}
        </div>
        <InboxReplyForm
          accountId={accountId}
          workspaceId={workspaceId}
          profileId={profileId}
          threadKey={threadKey}
        />
      </CardContent>
    </Card>
  )
}
