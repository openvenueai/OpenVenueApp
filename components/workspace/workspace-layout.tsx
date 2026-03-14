import Link from "next/link"
import type { WorkspaceWithDetails } from "@/lib/workspace/queries"
import { formatDate } from "@/lib/formatting"
import { formatLeadEventType, formatWorkspaceStage } from "@/lib/leads/constants"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

type WorkspaceLayoutProps = {
  data: WorkspaceWithDetails
  workspaceId: string
  activeTab?: string
  children: React.ReactNode
}

const WORKSPACE_TABS = [
  { id: "overview", label: "Overview", href: (id: string) => `/workspace/${id}` },
  { id: "inbox", label: "Inbox", href: (id: string) => `/workspace/${id}?tab=inbox` },
  { id: "proposal", label: "Proposal", href: (id: string) => `/workspace/${id}?tab=proposal` },
  {
    id: "timeline",
    label: "Timeline",
    href: (id: string) => `/workspace/${id}?tab=timeline`,
  },
  {
    id: "payments",
    label: "Payments & Contract",
    href: (id: string) => `/workspace/${id}?tab=payments`,
  },
  { id: "beo", label: "BEO", href: (id: string) => `/workspace/${id}?tab=beo` },
  { id: "notes", label: "Notes", href: (id: string) => `/workspace/${id}?tab=notes` },
  {
    id: "messages",
    label: "Messages",
    href: (id: string) => `/workspace/${id}?tab=messages`,
  },
  { id: "tasks", label: "Tasks", href: (id: string) => `/workspace/${id}?tab=tasks` },
] as const

function formatEventDate(
  workspace: WorkspaceWithDetails["workspace"],
) {
  const date = workspace.eventStartAt ?? workspace.preferredDate
  if (!date) return "—"
  return formatDate(date)
}

function formatBudgetRange(
  workspace: WorkspaceWithDetails["workspace"],
) {
  const min = workspace.budgetMinCents
  const max = workspace.budgetMaxCents
  if (min != null && max != null) {
    return `${(min / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })} – ${(max / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}`
  }
  if (min != null) {
    return `From ${(min / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}`
  }
  if (max != null) {
    return `Up to ${(max / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}`
  }
  return "—"
}

export function WorkspaceLayout({
  data,
  workspaceId,
  activeTab = "overview",
  children,
}: WorkspaceLayoutProps) {
  const { workspace, primaryContact, venue, owner } = data

  return (
    <div className="space-y-6">
      {/* Zone A + B + C: Persistent header card */}
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        {/* Zone A — Identity */}
        <div className="border-b border-line/80 px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-juniper-strong sm:text-3xl">
                {workspace.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="outline">
                  {formatWorkspaceStage(workspace.stage)}
                </Badge>
                <Badge variant="outline">
                  {formatLeadEventType(workspace.eventType)}
                </Badge>
                {venue ? (
                  <Badge variant="outline" className="font-normal">
                    {venue.name}
                  </Badge>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatEventDate(data.workspace)} ·{" "}
                {data.workspace.guestCount != null
                  ? `${data.workspace.guestCount} guests`
                  : "Guests TBD"}
                {" · "}
                {formatBudgetRange(data.workspace)}
              </p>
            </div>
            {/* Zone C — Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={buttonVariants({ variant: "outline", size: "sm" })}>
                Send Email
              </span>
              <span className={buttonVariants({ variant: "outline", size: "sm" })}>
                Build Proposal
              </span>
              <span className={buttonVariants({ variant: "outline", size: "sm" })}>
                Schedule
              </span>
              <span className={buttonVariants({ size: "sm" })}>Add Task</span>
            </div>
          </div>
        </div>

        {/* Zone B — Status strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line/80 px-5 py-3 text-sm text-muted-foreground sm:px-6">
          <span>Owner: {owner?.fullName ?? owner?.email ?? "—"}</span>
          <span>Source: {workspace.source ?? "—"}</span>
          <span>
            Last activity:{" "}
            {workspace.lastActivityAt
              ? formatDate(workspace.lastActivityAt)
              : "—"}
          </span>
          <span>
            Next action:{" "}
            {workspace.nextActionDueAt
              ? formatDate(workspace.nextActionDueAt)
              : "—"}
          </span>
          <span>Contract: —</span>
          <span>Payment: —</span>
        </div>

        {/* Tabs */}
        <nav className="flex gap-1 overflow-x-auto px-5 py-2 sm:px-6" aria-label="Workspace sections">
          {WORKSPACE_TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <Link
                key={tab.id}
                href={tab.href(workspaceId)}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-juniper/10 text-juniper-strong"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Active tab content */}
      <div className="min-w-0">{children}</div>
    </div>
  )
}
