import { redirect } from "next/navigation"
import { ModulePlaceholder } from "@/components/app-shell/module-placeholder"
import { getAccountSnapshot } from "@/lib/account-context"
import { canAccessAppPath } from "@/lib/app-shell/navigation"
import { requireAuthenticatedUser } from "@/lib/auth/session"

export default async function ReportsPage() {
  const user = await requireAuthenticatedUser("/reports")
  const snapshot = await getAccountSnapshot(user.id)

  if (!snapshot?.account || !snapshot.membership) {
    redirect("/onboarding")
  }

  if (!canAccessAppPath(snapshot.membership.role, "/reports")) {
    redirect("/dashboard")
  }

  return (
    <ModulePlaceholder
      activePath="/reports"
      bullets={[
        "Pipeline and conversion reporting",
        "Upcoming event and workload summaries",
        "Revenue pacing and booking readiness",
        "Role-aware operational scorecards",
      ]}
      description="Reporting is now part of the shell and can grow from the same account, venue, and workspace context used by the rest of the app."
      eyebrow="Analytics"
      phaseLabel="Phase 5+"
      snapshot={snapshot}
      title="Reports"
    />
  )
}

