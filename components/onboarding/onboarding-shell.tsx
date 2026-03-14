"use client"

import Link from "next/link"
import type { ReactNode } from "react"

type OnboardingShellProps = {
  progress: { current: number; total: number }
  children: ReactNode
}

export function OnboardingShell({ progress, children }: OnboardingShellProps) {
  return (
    <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-8">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            OpenVenue
          </Link>
          <span className="text-sm text-muted-foreground">
            Step {progress.current} of {progress.total}
          </span>
        </header>
        <section className="flex flex-1 flex-col gap-8">{children}</section>
      </div>
    </main>
  )
}
