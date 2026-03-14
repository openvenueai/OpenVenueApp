import { notFound } from "next/navigation"
import { AppShell } from "@/components/app-shell/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WorkspaceLayout } from "@/components/workspace/workspace-layout"
import { WorkspaceNotesTab } from "@/components/workspace/workspace-notes-tab"
import { WorkspaceMessagesTab } from "@/components/workspace/workspace-messages-tab"
import { WorkspaceActivityTab } from "@/components/workspace/workspace-activity-tab"
import { WorkspaceTasksTab } from "@/components/workspace/workspace-tasks-tab"
import { WorkspaceProposalTab } from "@/components/workspace/workspace-proposal-tab"
import { WorkspacePaymentsTab } from "@/components/workspace/workspace-payments-tab"
import { WorkspaceTimelineTab } from "@/components/workspace/workspace-timeline-tab"
import { WorkspaceBeoTab } from "@/components/workspace/workspace-beo-tab"
import { getAccountSnapshot } from "@/lib/account-context"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import { canAccessAppPath } from "@/lib/app-shell/navigation"
import {
  getNotesByWorkspace,
  getMessagesByWorkspace,
  getActivityByWorkspace,
  getTasksByWorkspace,
} from "@/lib/collaboration/queries"
import {
  getProposalForWorkspace,
  getContractForWorkspace,
} from "@/lib/commercial/queries"
import { getTimelineForWorkspace } from "@/lib/timeline/queries"
import { getBeoForWorkspace } from "@/lib/beo/queries"
import { getWorkspaceByIdAndAccount } from "@/lib/workspace/queries"
import { formatDate } from "@/lib/formatting"

type WorkspacePageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string; created?: string }>
}

export default async function WorkspacePage({
  params,
  searchParams,
}: WorkspacePageProps) {
  const user = await requireAuthenticatedUser("/workspace")
  const snapshot = await getAccountSnapshot(user.id)

  if (!snapshot?.account || !snapshot.membership) {
    notFound()
  }

  if (!canAccessAppPath(snapshot.membership.role, "/workspace")) {
    notFound()
  }

  const { id } = await params
  const { tab, created } = await searchParams
  const activeTab = tab ?? "overview"
  const justCreated = created === "1"

  const data = await getWorkspaceByIdAndAccount(id, snapshot.account.id)
  if (!data) {
    notFound()
  }

  const { workspace, primaryContact } = data

  const collaborationTabs = ["notes", "messages", "activity", "tasks"] as const
  const commercialTabs = ["proposal", "payments"] as const
  const planningTabs = ["timeline", "beo"] as const
  const needsCollaboration = collaborationTabs.includes(activeTab as (typeof collaborationTabs)[number])
  const needsCommercial = commercialTabs.includes(activeTab as (typeof commercialTabs)[number])
  const needsPlanning = planningTabs.includes(activeTab as (typeof planningTabs)[number])
  const [notesList, messagesList, activityList, tasksList, proposalData, contractData, timelineData, beoData] =
    await Promise.all([
      needsCollaboration
        ? getNotesByWorkspace(id, snapshot.account.id)
        : Promise.resolve([]),
      needsCollaboration
        ? getMessagesByWorkspace(id, snapshot.account.id)
        : Promise.resolve([]),
      needsCollaboration
        ? getActivityByWorkspace(id, snapshot.account.id)
        : Promise.resolve([]),
      needsCollaboration
        ? getTasksByWorkspace(id, snapshot.account.id)
        : Promise.resolve([]),
      needsCommercial
        ? getProposalForWorkspace(id, snapshot.account.id)
        : Promise.resolve(null),
      needsCommercial
        ? getContractForWorkspace(id, snapshot.account.id)
        : Promise.resolve(null),
      needsPlanning
        ? getTimelineForWorkspace(id, snapshot.account.id)
        : Promise.resolve(null),
      needsPlanning
        ? getBeoForWorkspace(id, snapshot.account.id)
        : Promise.resolve(null),
    ])
  const notesListTyped = notesList
  const messagesListTyped = messagesList
  const activityListTyped = activityList
  const tasksListTyped = tasksList

  return (
    <AppShell activePath={`/workspace/${id}`} snapshot={snapshot}>
      {justCreated ? (
        <div className="mb-6 rounded-xl border border-moss/30 bg-moss/10 px-4 py-3 text-sm text-juniper-strong">
          Lead created. This workspace is ready for details, proposals, and
          next steps.
        </div>
      ) : null}
      <WorkspaceLayout
        data={data}
        workspaceId={id}
        activeTab={activeTab}
      >
        {activeTab === "overview" ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {workspace.summary ? (
                    <p className="text-muted-foreground">{workspace.summary}</p>
                  ) : (
                    <p className="text-muted-foreground">
                      No summary yet. Add notes or details as the lead progresses.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Key dates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Preferred date:</span>{" "}
                    {workspace.preferredDate
                      ? formatDate(workspace.preferredDate)
                      : "—"}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Event start:</span>{" "}
                    {workspace.eventStartAt
                      ? formatDate(workspace.eventStartAt)
                      : "—"}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Created:</span>{" "}
                    {formatDate(workspace.createdAt)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="font-medium text-juniper-strong">
                    {primaryContact?.fullName ?? "—"}
                  </p>
                  <p className="text-muted-foreground">
                    {primaryContact?.email ?? "—"}
                  </p>
                  <p className="text-muted-foreground">
                    {primaryContact?.phone ?? "—"}
                  </p>
                  {primaryContact?.companyName ? (
                    <p className="text-muted-foreground">
                      {primaryContact.companyName}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </div>

            <Card className="border-dashed">
              <CardContent className="py-8">
                <p className="text-center text-sm text-muted-foreground">
                  Next step and activity preview will appear here as you use
                  Inbox, Proposal, and Tasks.
                </p>
              </CardContent>
            </Card>
          </>
        ) : activeTab === "notes" ? (
          <WorkspaceNotesTab
            workspaceId={id}
            accountId={snapshot.account.id}
            profileId={snapshot.profile.id}
            notes={notesListTyped}
          />
        ) : activeTab === "messages" ? (
          <WorkspaceMessagesTab
            workspaceId={id}
            accountId={snapshot.account.id}
            profileId={snapshot.profile.id}
            messages={messagesListTyped}
          />
        ) : activeTab === "activity" ? (
          <WorkspaceActivityTab activity={activityListTyped} />
        ) : activeTab === "tasks" ? (
          <WorkspaceTasksTab
            workspaceId={id}
            accountId={snapshot.account.id}
            profileId={snapshot.profile.id}
            tasks={tasksListTyped}
          />
        ) : activeTab === "proposal" ? (
          <WorkspaceProposalTab
            workspaceId={id}
            accountId={snapshot.account.id}
            profileId={snapshot.profile.id}
            proposal={proposalData?.proposal ?? null}
            items={proposalData?.items ?? []}
          />
        ) : activeTab === "payments" ? (
          <WorkspacePaymentsTab
            workspaceId={id}
            accountId={snapshot.account.id}
            profileId={snapshot.profile.id}
            contract={contractData?.contract ?? null}
            milestones={contractData?.milestones ?? []}
          />
        ) : activeTab === "timeline" ? (
          <WorkspaceTimelineTab
            workspaceId={id}
            accountId={snapshot.account.id}
            profileId={snapshot.profile.id}
            timeline={timelineData?.timeline ?? null}
            items={timelineData?.items ?? []}
          />
        ) : activeTab === "beo" ? (
          <WorkspaceBeoTab
            workspaceId={id}
            accountId={snapshot.account.id}
            profileId={snapshot.profile.id}
            beo={beoData}
          />
        ) : (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-sm text-muted-foreground">
                Inbox{" "}
                — Coming soon.
              </p>
            </CardContent>
          </Card>
        )}
      </WorkspaceLayout>
    </AppShell>
  )
}
