import Link from "next/link"
import { redirect } from "next/navigation"
import { AppShell } from "@/components/app-shell/app-shell"
import { buttonVariants } from "@/components/ui/button-variants"
import { Card, CardContent } from "@/components/ui/card"
import { getAccountSnapshot } from "@/lib/account-context"
import { canAccessAppPath } from "@/lib/app-shell/navigation"
import { requireAuthenticatedUser } from "@/lib/auth/session"

export default async function WorkspacePage() {
  const user = await requireAuthenticatedUser("/workspace")
  const snapshot = await getAccountSnapshot(user.id)

  if (!snapshot?.account || !snapshot.membership) {
    redirect("/onboarding")
  }

  if (!canAccessAppPath(snapshot.membership.role, "/workspace")) {
    redirect("/dashboard")
  }

  return (
    <AppShell activePath="/workspace" snapshot={snapshot}>
      <Card>
        <CardContent className="flex flex-col items-center justify-center px-8 py-16 text-center">
          <h2 className="text-xl font-semibold text-juniper-strong">
            Select a workspace from Leads
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Each lead has its own Event Workspace. Open a lead from the Leads
            page to view its workspace, proposal, timeline, and more.
          </p>
          <Link
            className={buttonVariants({ size: "lg" })}
            href="/leads"
          >
            Open Leads
          </Link>
        </CardContent>
      </Card>
    </AppShell>
  )
}

