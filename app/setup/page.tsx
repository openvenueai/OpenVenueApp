import Link from "next/link"
import { AppShell } from "@/components/app-shell/app-shell"
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
import { requireAuthenticatedUser } from "@/lib/auth/session"

function getSearchParamValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined
}

type SetupPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function SetupPage({ searchParams }: SetupPageProps) {
  const user = await requireAuthenticatedUser("/setup")
  const snapshot = await getAccountSnapshot(user.id)
  const params = searchParams ? await searchParams : {}
  const justCreated = getSearchParamValue(params.created) === "1"

  if (!snapshot?.account) {
    return (
      <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-line bg-surface px-8 py-10 shadow-[0_22px_70px_rgba(28,43,38,0.08)]">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-juniper">
            Setup checkpoint
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-tight text-juniper-strong">
            Your account setup has not been created yet.
          </h1>
          <p className="mt-4 text-base leading-8 text-juniper">
            Finish onboarding first so OpenVenue can create the shared account,
            venue records, and initial checklist.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-juniper px-5 py-3 text-sm font-semibold text-white transition hover:bg-juniper-strong"
              href="/onboarding"
            >
              Continue onboarding
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const checklist = snapshot.account.setupChecklist ?? []
  const completedCount = checklist.filter((item) => item.complete).length
  const remainingCount = checklist.length - completedCount

  return (
    <AppShell activePath="/setup" snapshot={snapshot}>
      <div className="flex flex-col gap-6">
        {justCreated ? (
          <section className="rounded-[28px] border border-moss/30 bg-moss/14 px-5 py-4 text-juniper-strong shadow-[0_18px_40px_rgba(28,43,38,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]">
              Setup created
            </p>
            <p className="mt-2 text-sm leading-7">
              Your account, venues, and initial membership are live. Use the
              checklist below to keep moving through the rest of setup.
            </p>
          </section>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardContent className="px-6 py-6 sm:px-7 sm:py-7">
              <SectionHeader
                actions={
                  <Link
                    className={buttonVariants({ variant: "outline", size: "lg" })}
                    href="/dashboard"
                  >
                    Open dashboard
                  </Link>
                }
                description="Phase 3 created the tenant and venue foundation. Phase 4 puts that setup inside the shared shell so the rest of the product can build on consistent account context."
                eyebrow="Account setup"
                title={snapshot.account.name}
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-line bg-canvas px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-juniper">Plan</p>
                <p className="mt-2 text-lg font-semibold text-juniper-strong">
                  {snapshot.account.planTier.replace(/_/g, " ")}
                </p>
              </div>
              <div className="rounded-3xl border border-line bg-canvas px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-juniper">Venues</p>
                <p className="mt-2 text-lg font-semibold text-juniper-strong">
                  {snapshot.venues.length}
                </p>
              </div>
              <div className="rounded-3xl border border-line bg-canvas px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-juniper">
                  Checklist remaining
                </p>
                <p className="mt-2 text-lg font-semibold text-juniper-strong">
                  {remainingCount}
                </p>
              </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface-muted/72">
            <CardHeader>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-juniper">
              Venue footprint
              </p>
              <CardDescription className="mt-3">
                The shared shell now keeps venue context close to the checklist
                and setup actions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {snapshot.venues.map((venue) => (
                <div
                  key={venue.id}
                  className="rounded-3xl border border-line bg-surface px-4 py-4"
                >
                  <p className="text-lg font-semibold text-juniper-strong">{venue.name}</p>
                  <p className="mt-1 text-sm leading-7 text-juniper">
                    {[venue.city, venue.stateRegion, venue.country]
                      .filter(Boolean)
                      .join(", ") || "Location pending"}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-juniper">
                  Setup checklist
                </p>
                <CardTitle className="mt-2">
                  Complete the remaining foundation work.
                </CardTitle>
              </div>
              <p className="text-sm text-juniper">
                {completedCount} of {checklist.length} items complete
              </p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-2">
            {checklist.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-line bg-canvas px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`size-3 rounded-full ${
                      item.complete ? "bg-moss" : "bg-warm-gold"
                    }`}
                  />
                  <p className="text-sm font-semibold text-juniper-strong">
                    {item.label}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-7 text-juniper">
                  {item.complete
                    ? "Completed during account creation."
                    : "Planned for the next implementation passes."}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
