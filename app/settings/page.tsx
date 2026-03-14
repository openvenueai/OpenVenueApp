import { redirect } from "next/navigation"
import { ModulePlaceholder } from "@/components/app-shell/module-placeholder"
import { getAccountSnapshot } from "@/lib/account-context"
import { canAccessAppPath } from "@/lib/app-shell/navigation"
import { requireAuthenticatedUser } from "@/lib/auth/session"

export default async function SettingsPage() {
  const user = await requireAuthenticatedUser("/settings")
  const snapshot = await getAccountSnapshot(user.id)

  if (!snapshot?.account || !snapshot.membership) {
    redirect("/onboarding")
  }

  if (!canAccessAppPath(snapshot.membership.role, "/settings")) {
    redirect("/dashboard")
  }

  return (
    <ModulePlaceholder
      activePath="/settings"
      bullets={[
        "Account, venue, and membership management",
        "Plan and billing controls",
        "Default pricing, templates, and preferences",
        "Future security and integration settings",
      ]}
      description="Admin-only configuration now has a protected destination in the shell, ready for the settings layer to grow into."
      eyebrow="Admin surface"
      phaseLabel="Phase 4+"
      snapshot={snapshot}
      title="Settings"
    />
  )
}
