import type { ReactNode } from "react"
import { TopNav } from "@/components/app-shell/top-nav"
import type { AccountSnapshot } from "@/lib/account-context"
import { getAppNavItemByPath } from "@/lib/app-shell/navigation"

type AppShellProps = {
  snapshot: AccountSnapshot
  activePath: string
  children: ReactNode
}

export function AppShell({ snapshot, activePath, children }: AppShellProps) {
  const activeItem =
    getAppNavItemByPath(activePath) ??
    (activePath.startsWith("/workspace/")
      ? {
          label: "Event Workspace",
          description:
            "The shared record that carries a lead into planning, handoff, and execution.",
        }
      : null)

  return (
    <main className="min-h-screen bg-background">
      <TopNav snapshot={snapshot} activePath={activePath} />

      {/* Optional compact context strip: page title + short description */}
      {activeItem ? (
        <div className="border-b border-line bg-surface/80 px-4 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <h1 className="text-lg font-semibold tracking-tight text-juniper-strong sm:text-xl">
              {activeItem.label}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {activeItem.description}
            </p>
          </div>
        </div>
      ) : null}

      {/* Main content: full width with max-width and padding per wireframes */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">{children}</div>
      </div>
    </main>
  )
}
