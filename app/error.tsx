"use client"

import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground">
          A server error occurred. This can happen if the database or environment
          is not fully configured. Try again or return home.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-muted transition"
          >
            Go home
          </Link>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-lg border border-juniper bg-juniper px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  )
}
