import Link from "next/link";

const principles = [
  "Event Workspace is the central record from lead through execution.",
  "AI is embedded as reviewable support, not a separate chat-first product.",
  "Proposal, timeline, payments, BEO, and collaboration should reuse shared data.",
];

const phases = [
  {
    name: "Phase 0",
    title: "Repository Bootstrap",
    detail: "Next.js scaffold, repo conventions, and environment baseline.",
  },
  {
    name: "Phase 1",
    title: "Platform and Tooling",
    detail: "Supabase, Drizzle, testing, and core utilities.",
  },
  {
    name: "Phase 2",
    title: "Schema and Tenancy",
    detail: "Accounts, venues, memberships, event workspaces, and access rules.",
  },
  {
    name: "Phase 3",
    title: "Auth and Onboarding",
    detail: "Account creation, venue setup, plan selection, and team invites.",
  },
];

const references = [
  "BUILD_PLAN.md",
  "Reference/openvenue-project-overview-and-mvp.md",
  "Reference/openvenue-codex-implementation-roadmap.md",
  "Reference/openvenue-wireframe-07-event-workspace.md",
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="overflow-hidden rounded-[32px] border border-line bg-surface/90 shadow-[0_28px_90px_rgba(28,43,38,0.08)] backdrop-blur">
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.3fr_0.9fr] lg:px-10 lg:py-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-juniper/15 bg-juniper px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white">
                  OpenVenue
                </span>
                <span className="rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-juniper">
                  Phase 3 in progress
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-juniper">
                  AI-native CRM and event operations workspace
                </p>
                <h1 className="max-w-3xl font-display text-5xl leading-none tracking-tight text-juniper-strong sm:text-6xl">
                  Building the operating system for venues.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-juniper sm:text-lg">
                  This repo now holds the first OpenVenue application scaffold,
                  the product reference library, and the execution plan we will
                  build against next.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-line bg-canvas px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-juniper">
                    Connected remote
                  </p>
                  <p className="mt-2 text-lg font-semibold text-juniper-strong">
                    OpenVenueApp
                  </p>
                </div>
                <div className="rounded-3xl border border-line bg-canvas px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-juniper">
                    Current milestone
                  </p>
                  <p className="mt-2 text-lg font-semibold text-juniper-strong">
                    Auth and onboarding
                  </p>
                </div>
                <div className="rounded-3xl border border-line bg-canvas px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-juniper">
                    Next move
                  </p>
                  <p className="mt-2 text-lg font-semibold text-juniper-strong">
                    App shell and CRM core
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center justify-center rounded-full bg-juniper px-5 py-3 text-sm font-semibold text-white transition hover:bg-juniper-strong"
                  href="/sign-up"
                >
                  Create account
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-full border border-line bg-canvas px-5 py-3 text-sm font-semibold text-juniper-strong transition hover:border-juniper/35 hover:text-juniper"
                  href="/sign-in"
                >
                  Sign in
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(70,87,79,0.94),rgba(48,64,57,0.98))] p-6 text-white">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.28em] text-white/65">
                  Core principles
                </p>
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75">
                  Source of truth
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {principles.map((principle) => (
                  <div
                    key={principle}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <p className="text-sm leading-7 text-white/88">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[28px] border border-line bg-surface px-6 py-6 shadow-[0_18px_50px_rgba(28,43,38,0.06)] sm:px-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-juniper">
                  Build sequence
                </p>
                <h2 className="mt-2 font-display text-3xl text-juniper-strong">
                  First four phases
                </h2>
              </div>
              <span className="text-sm text-juniper">Foundation before features</span>
            </div>

            <div className="mt-6 grid gap-4">
              {phases.map((phase) => (
                <div
                  key={phase.name}
                  className="grid gap-3 rounded-3xl border border-line bg-canvas px-4 py-4 sm:grid-cols-[120px_1fr]"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-juniper">
                    {phase.name}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-juniper-strong">
                      {phase.title}
                    </h3>
                    <p className="mt-1 text-sm leading-7 text-juniper">
                      {phase.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[28px] border border-line bg-surface-muted/70 px-6 py-6">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-juniper">
              Working references
            </p>
            <h2 className="mt-2 font-display text-3xl text-juniper-strong">
              Repo guideposts
            </h2>
            <p className="mt-3 text-sm leading-7 text-juniper">
              The docs below define product scope, implementation order, and the
              central event-workspace model we should preserve as we build.
            </p>

            <div className="mt-6 space-y-3">
              {references.map((reference) => (
                <div
                  key={reference}
                  className="rounded-2xl border border-line bg-surface px-4 py-3"
                >
                  <code className="text-sm text-juniper-strong">{reference}</code>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-warm-gold/25 bg-white/70 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-warm-gold">
                Build note
              </p>
              <p className="mt-2 text-sm leading-7 text-juniper">
                We are intentionally sequencing OpenVenue as foundation, tenancy,
                shell, CRM core, commercial workflows, planning, then AI.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
