import { redirect } from "next/navigation"
import { ModulePlaceholder } from "@/components/app-shell/module-placeholder"
import { getAccountSnapshot } from "@/lib/account-context"
import { requireAuthenticatedUser } from "@/lib/auth/session"

export default async function ExpressBookPage() {
  const user = await requireAuthenticatedUser("/express-book")
  const snapshot = await getAccountSnapshot(user.id)

  if (!snapshot?.account || !snapshot.membership) {
    redirect("/onboarding")
  }

  return (
    <ModulePlaceholder
      activePath="/express-book"
      bullets={[
        "Quick availability check",
        "Express booking flow",
        "Link to Event Workspace",
      ]}
      description="Quick booking and availability will be available here in a future release."
      eyebrow="Express Book"
      phaseLabel="Coming soon"
      snapshot={snapshot}
      title="Express Book"
    />
  )
}
