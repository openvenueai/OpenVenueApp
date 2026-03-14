import Link from "next/link"
import { redirect } from "next/navigation"
import { AppShell } from "@/components/app-shell/app-shell"
import { CreateLeadForm } from "@/components/leads/create-lead-form"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button-variants"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { getAccountSnapshot } from "@/lib/account-context"
import { canAccessAppPath } from "@/lib/app-shell/navigation"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import { formatDate } from "@/lib/formatting"
import {
  formatLeadEventType,
  formatWorkspaceStage,
  PROPOSAL_PIPELINE_STAGES,
} from "@/lib/leads/constants"
import { getLeadsIndexData } from "@/lib/leads/queries"

function getSearchParamValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined
}

function getLeadBadgeVariant(stage: string, status: string) {
  if (status === "lost" || status === "cancelled" || stage === "archived") {
    return "warning"
  }

  if (status === "won" || stage === "booked") {
    return "success"
  }

  if (
    PROPOSAL_PIPELINE_STAGES.includes(
      stage as (typeof PROPOSAL_PIPELINE_STAGES)[number],
    )
  ) {
    return "default"
  }

  return "outline"
}

type LeadsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const user = await requireAuthenticatedUser("/leads")
  const snapshot = await getAccountSnapshot(user.id)
  const params = searchParams ? await searchParams : {}

  if (!snapshot?.account || !snapshot.membership) {
    redirect("/onboarding")
  }

  if (!canAccessAppPath(snapshot.membership.role, "/leads")) {
    redirect("/dashboard")
  }

  const leadsData = await getLeadsIndexData(snapshot.account.id)
  const justCreated = getSearchParamValue(params.created) === "1"
  const defaultVenueId =
    snapshot.membership.defaultVenueId ?? snapshot.venues[0]?.id ?? undefined

  return (
    <AppShell activePath="/leads" snapshot={snapshot}>
      <div className="flex flex-col gap-6">
        {justCreated ? (
          <section className="rounded-[28px] border border-moss/30 bg-moss/14 px-5 py-4 text-juniper-strong shadow-[0_18px_40px_rgba(28,43,38,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]">
              Lead created
            </p>
            <p className="mt-2 text-sm leading-7">
              The lead and its Event Workspace are ready. Open the workspace to
              add details, send proposals, and track next steps.
            </p>
          </section>
        ) : null}

        <Card>
          <CardContent className="px-6 py-6 sm:px-7 sm:py-7">
            <SectionHeader
              eyebrow="Leads"
              title="Leads and pipeline"
              description="Track inquiries, proposals, and next steps. Open a lead to work in its Event Workspace."
              actions={null}
            />
          </CardContent>
        </Card>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total leads",
              value: String(leadsData.counts.total),
            },
            {
              label: "New leads",
              value: String(leadsData.counts.new),
            },
            {
              label: "Proposal stage",
              value: String(leadsData.counts.proposal),
            },
            {
              label: "Booked or closed",
              value: String(leadsData.counts.booked + leadsData.counts.closed),
            },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="px-5 py-5">
                <p className="text-xs uppercase tracking-[0.18em] text-juniper">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-juniper-strong">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <CardHeader>
              <CardTitle>Live pipeline index</CardTitle>
              <CardDescription>
                Leads are listed from the same event workspace records that will
                power planning, proposals, and operations later.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {leadsData.leads.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-line bg-canvas px-5 py-8">
                  <p className="text-lg font-semibold text-juniper-strong">
                    No leads yet.
                  </p>
                  <p className="mt-2 text-sm leading-7 text-juniper">
                    Create the first inquiry on the right and OpenVenue will
                    generate both the lead contact and the starting event
                    workspace.
                  </p>
                </div>
              ) : (
                leadsData.leads.map((lead) => (
                  <article
                    key={lead.workspaceId}
                    className="rounded-3xl border border-line bg-canvas px-5 py-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            href={`/workspace/${lead.workspaceId}`}
                            className="text-xl font-semibold text-juniper-strong hover:underline"
                          >
                            {lead.contactName ?? lead.title}
                          </Link>
                          <Badge
                            variant={getLeadBadgeVariant(lead.stage, lead.status)}
                          >
                            {formatWorkspaceStage(lead.stage)}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-juniper">
                          {lead.companyName
                            ? `${lead.companyName} · `
                            : ""}
                          {formatLeadEventType(lead.eventType)}
                          {lead.venueName ? ` · ${lead.venueName}` : ""}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 text-right text-sm leading-7 text-muted-foreground">
                        <p>Created {formatDate(lead.createdAt)}</p>
                        <p>
                          Preferred date{" "}
                          {lead.preferredDate
                            ? formatDate(lead.preferredDate)
                            : "pending"}
                        </p>
                        <Link
                          className={buttonVariants({ size: "sm" })}
                          href={`/workspace/${lead.workspaceId}`}
                        >
                          Open workspace
                        </Link>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      <div className="rounded-2xl border border-line bg-surface px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.16em] text-juniper">
                          Email
                        </p>
                        <p className="mt-2 text-sm font-medium text-juniper-strong">
                          {lead.contactEmail ?? "Pending"}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-line bg-surface px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.16em] text-juniper">
                          Phone
                        </p>
                        <p className="mt-2 text-sm font-medium text-juniper-strong">
                          {lead.contactPhone ?? "Pending"}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-line bg-surface px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.16em] text-juniper">
                          Source
                        </p>
                        <p className="mt-2 text-sm font-medium capitalize text-juniper-strong">
                          {lead.source ?? "Manual"}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-line bg-surface px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.16em] text-juniper">
                          Guests
                        </p>
                        <p className="mt-2 text-sm font-medium text-juniper-strong">
                          {lead.guestCount ?? "Pending"}
                        </p>
                      </div>
                    </div>

                    {lead.summary ? (
                      <p className="mt-4 text-sm leading-7 text-juniper">
                        {lead.summary}
                      </p>
                    ) : null}
                  </article>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="bg-surface-muted/72">
            <CardHeader>
              <CardTitle>Create lead</CardTitle>
              <CardDescription>
                This intake flow creates the lead contact and the first event
                workspace record in one step.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-3xl border border-line bg-surface px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-juniper">
                  Current venue footprint
                </p>
                <p className="mt-2 text-sm leading-7 text-juniper-strong">
                  {snapshot.venues.length} venue
                  {snapshot.venues.length === 1 ? "" : "s"} available for new
                  leads.
                </p>
              </div>

              <CreateLeadForm
                defaultVenueId={defaultVenueId}
                venues={snapshot.venues.map((venue) => ({
                  id: venue.id,
                  name: venue.name,
                }))}
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  )
}
