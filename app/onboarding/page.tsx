import { redirect } from "next/navigation"
import { getAccountSnapshot } from "@/lib/account-context"
import { getOrCreateOnboardingSession } from "@/lib/onboarding/session-actions"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import { ONBOARDING_STEP_IDS } from "@/lib/onboarding/steps"

export default async function OnboardingIndexPage() {
  const user = await requireAuthenticatedUser("/onboarding")
  const snapshot = await getAccountSnapshot(user.id)

  if (snapshot?.account) {
    redirect("/setup")
  }

  const session = await getOrCreateOnboardingSession()
  if (!session) {
    redirect("/setup")
  }

  const stepId = session.currentStepId || ONBOARDING_STEP_IDS.STEP_WELCOME
  redirect(`/onboarding/${stepId}`)
}
