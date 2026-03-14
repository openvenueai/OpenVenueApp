import { redirect } from "next/navigation"
import { OnboardingStepView } from "@/components/onboarding/onboarding-step-view"
import { OnboardingShell } from "@/components/onboarding/onboarding-shell"
import { getAccountSnapshot } from "@/lib/account-context"
import { getOrCreateOnboardingSession } from "@/lib/onboarding/session-actions"
import { requireAuthenticatedUser } from "@/lib/auth/session"
import {
  getProgress,
  getStepById,
  getVisibleSteps,
  ONBOARDING_STEP_IDS,
} from "@/lib/onboarding/steps"

type Props = { params: Promise<{ step: string }> }

export default async function OnboardingStepPage({ params }: Props) {
  const { step: stepParam } = await params
  const user = await requireAuthenticatedUser("/onboarding")
  const snapshot = await getAccountSnapshot(user.id)

  if (snapshot?.account) {
    redirect("/setup")
  }

  const session = await getOrCreateOnboardingSession()
  if (!session) {
    redirect("/setup")
  }

  const currentStepId = session.currentStepId || ONBOARDING_STEP_IDS.STEP_WELCOME
  const visibleSteps = getVisibleSteps(session.answers)
  const stepIds = visibleSteps.map((s) => s.id)

  if (!stepIds.includes(stepParam)) {
    redirect(`/onboarding/${currentStepId}`)
  }

  if (stepParam !== currentStepId) {
    redirect(`/onboarding/${currentStepId}`)
  }

  const stepConfig = getStepById(stepParam)
  if (!stepConfig) {
    redirect("/onboarding")
  }

  const progress = getProgress(stepParam, session.answers)

  return (
    <OnboardingShell progress={progress}>
      <OnboardingStepView
        step={stepConfig}
        sessionId={session.id}
        answers={session.answers}
        isReview={stepParam === ONBOARDING_STEP_IDS.STEP_REVIEW}
        isComplete={stepParam === ONBOARDING_STEP_IDS.STEP_COMPLETE}
      />
    </OnboardingShell>
  )
}
