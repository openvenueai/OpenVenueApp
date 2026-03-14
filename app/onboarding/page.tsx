import { redirect } from "next/navigation"
import { getAccountSnapshot } from "@/lib/account-context"

export const dynamic = "force-dynamic"

function isRedirectError(e: unknown): boolean {
  if (e instanceof Error) return e.message === "NEXT_REDIRECT"
  return (e as { digest?: string })?.digest?.includes?.("REDIRECT") === true
}
import { getOrCreateOnboardingSession } from "@/lib/onboarding/session-actions"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import { ONBOARDING_STEP_IDS } from "@/lib/onboarding/steps"

export default async function OnboardingIndexPage() {
  try {
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
  } catch (e) {
    if (isRedirectError(e)) throw e
    console.error("[onboarding] index error:", e)
    redirect("/sign-in?next=/onboarding&error=server")
  }
}
