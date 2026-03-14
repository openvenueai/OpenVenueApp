import type { ReactNode } from "react"
import Link from "next/link"

type AuthShellProps = {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}

const focusAreas = [
  "One account becomes the venue's operating system.",
  "Sales, planning, and operations stay attached to the same event record.",
  "AI support stays embedded, reviewable, and grounded in structured data.",
]

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="overflow-hidden rounded-[32px] border border-line bg-[linear-gradient(180deg,rgba(70,87,79,0.96),rgba(41,56,50,0.98))] px-6 py-8 text-white shadow-[0_24px_80px_rgba(28,43,38,0.12)] sm:px-8 sm:py-10">
          <div className="flex h-full flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/82 transition hover:border-white/30 hover:text-white"
                  href="/"
                >
                  OpenVenue
                </Link>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/70">
                  Phase 3
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/65">
                  {eyebrow}
                </p>
                <h1 className="max-w-xl font-display text-5xl leading-none tracking-tight sm:text-6xl">
                  {title}
                </h1>
                <p className="max-w-xl text-base leading-8 text-white/74 sm:text-lg">
                  {description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {focusAreas.map((focusArea) => (
                <div
                  key={focusArea}
                  className="rounded-3xl border border-white/10 bg-white/6 px-4 py-4"
                >
                  <p className="text-sm leading-7 text-white/86">{focusArea}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-line bg-surface/92 px-6 py-8 shadow-[0_22px_70px_rgba(28,43,38,0.08)] sm:px-8 sm:py-10">
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="space-y-6">{children}</div>
            <div className="rounded-3xl border border-line bg-canvas/90 px-4 py-4 text-sm leading-7 text-juniper">
              {footer}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
