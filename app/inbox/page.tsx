import Link from "next/link"
import { redirect } from "next/navigation"
import { AppShell } from "@/components/app-shell/app-shell"
import { InboxThreadList } from "@/components/inbox/inbox-thread-list"
import { InboxThreadDetail } from "@/components/inbox/inbox-thread-detail"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAccountSnapshot } from "@/lib/account-context"
import { canAccessAppPath } from "@/lib/app-shell/navigation"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import { getInboxThreads, getMessagesForThread } from "@/lib/inbox/queries"

type InboxPageProps = {
  searchParams: Promise<{ workspaceId?: string; threadKey?: string }>
}

export default async function InboxPage({ searchParams }: InboxPageProps) {
  const user = await requireAuthenticatedUser("/inbox")
  const snapshot = await getAccountSnapshot(user.id)

  if (!snapshot?.account || !snapshot.membership) {
    redirect("/onboarding")
  }

  if (!canAccessAppPath(snapshot.membership.role, "/inbox")) {
    redirect("/dashboard")
  }

  const params = await searchParams
  const workspaceId = params.workspaceId ?? null
  const threadKey = params.threadKey ?? "default"

  const threads = await getInboxThreads(snapshot.account.id)
  const messages =
    workspaceId && threads.some((t) => t.workspaceId === workspaceId)
      ? await getMessagesForThread(
          snapshot.account.id,
          workspaceId,
          threadKey,
        )
      : []

  const selectedThread = workspaceId
    ? threads.find(
        (t) => t.workspaceId === workspaceId && t.threadKey === threadKey,
      )
    : null

  return (
    <AppShell activePath="/inbox" snapshot={snapshot}>
      <div className="flex flex-col gap-4 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-[420px]">
          <Card>
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <p className="text-sm text-muted-foreground">
                {threads.length} thread
                {threads.length === 1 ? "" : "s"}
              </p>
            </CardHeader>
            <CardContent>
              {threads.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No conversations yet. Send a message from an Event Workspace
                  Messages tab to start a thread.
                </p>
              ) : (
                <InboxThreadList
                  threads={threads}
                  selectedWorkspaceId={workspaceId}
                  selectedThreadKey={threadKey}
                />
              )}
            </CardContent>
          </Card>
        </aside>
        <div className="min-w-0 flex-1">
          {selectedThread && workspaceId ? (
            <InboxThreadDetail
              workspaceId={workspaceId}
              threadKey={threadKey}
              workspaceTitle={selectedThread.workspaceTitle}
              messages={messages}
              accountId={snapshot.account.id}
              profileId={snapshot.profile.id}
            />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <p className="text-center font-medium text-juniper-strong">
                  Select a conversation
                </p>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Open a thread from the list to read messages and reply.
                </p>
                <Link
                  href="/leads"
                  className="mt-4 text-sm font-medium text-juniper hover:underline"
                >
                  Open Leads
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  )
}
