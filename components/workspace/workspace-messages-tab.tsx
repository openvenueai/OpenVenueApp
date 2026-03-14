import { CreateMessageForm } from "@/components/workspace/create-message-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatting"

type MessageRow = {
  id: string
  subject: string | null
  body: string
  messageType: string | null
  threadKey: string | null
  parentMessageId: string | null
  createdAt: Date
  authorName: string | null
}

type WorkspaceMessagesTabProps = {
  workspaceId: string
  accountId: string
  profileId: string
  messages: MessageRow[]
}

export function WorkspaceMessagesTab({
  workspaceId,
  accountId,
  profileId,
  messages,
}: WorkspaceMessagesTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Internal messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {messages.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No internal messages yet. Send a message to coordinate with the
                team.
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-xl border border-line bg-canvas p-4"
                >
                  <p className="font-medium text-juniper-strong">
                    {msg.subject ?? "No subject"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(msg.createdAt)}
                    {msg.authorName ? ` · ${msg.authorName}` : ""}
                    {msg.messageType ? ` · ${msg.messageType}` : ""}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
                    {msg.body}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Send message</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateMessageForm
            accountId={accountId}
            workspaceId={workspaceId}
            profileId={profileId}
          />
        </CardContent>
      </Card>
    </div>
  )
}
