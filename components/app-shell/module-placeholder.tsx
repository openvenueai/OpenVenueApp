import Link from "next/link"
import { AppShell } from "@/components/app-shell/app-shell"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button-variants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { SectionHeader } from "@/components/ui/section-header"
import type { AccountSnapshot } from "@/lib/account-context"

type ModulePlaceholderProps = {
  snapshot: AccountSnapshot
  activePath: string
  eyebrow: string
  title: string
  description: string
  phaseLabel: string
  bullets: string[]
}

export function ModulePlaceholder({
  snapshot,
  activePath,
  eyebrow,
  title,
  description,
  phaseLabel,
  bullets,
}: ModulePlaceholderProps) {
  return (
    <AppShell activePath={activePath} snapshot={snapshot}>
      <Card>
        <CardContent className="px-6 py-6 sm:px-7 sm:py-7">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            actions={
              <Link
                className={buttonVariants({ size: "lg" })}
                href="/dashboard"
              >
                Back to Home
              </Link>
            }
          />
        </CardContent>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader>
            {phaseLabel ? (
              <Badge variant="outline" className="mb-2">
                {phaseLabel}
              </Badge>
            ) : null}
            <CardTitle className="mt-2">What lands here next</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {bullets.map((bullet) => (
              <div
                key={bullet}
                className="rounded-3xl border border-line bg-canvas px-4 py-4"
              >
                <p className="text-sm leading-7 text-juniper-strong">{bullet}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <EmptyState
          action={
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href="/setup"
            >
              Review setup context
            </Link>
          }
          description="This section is not built yet. Use the links above to return to Home or explore other modules."
          eyebrow="Preview"
          title="Coming soon"
        />
      </section>
    </AppShell>
  )
}
