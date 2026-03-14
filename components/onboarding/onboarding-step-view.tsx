"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { completeOnboarding, goBackOnboardingStep, saveOnboardingStep } from "@/lib/onboarding/session-actions"
import type { OnboardingAnswers, OnboardingStep } from "@/lib/onboarding/types"
import { getNextStepId, getPreviousStepId } from "@/lib/onboarding/steps"
import { StepWelcome } from "@/components/onboarding/steps/step-welcome"
import { StepText } from "@/components/onboarding/steps/step-text"
import { StepChoiceCards } from "@/components/onboarding/steps/step-choice-cards"
import { StepReview } from "@/components/onboarding/steps/step-review"
import { StepComplete } from "@/components/onboarding/steps/step-complete"
import { useState } from "react"

type OnboardingStepViewProps = {
  step: OnboardingStep
  sessionId: string
  answers: OnboardingAnswers
  isReview: boolean
  isComplete: boolean
}

export function OnboardingStepView({
  step,
  sessionId,
  answers,
  isReview,
  isComplete,
}: OnboardingStepViewProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const nextStepId = getNextStepId(step.id, answers)
  const previousStepId = getPreviousStepId(step.id, answers)

  const handleNext = (value?: unknown) => {
    setError(null)
    startTransition(async () => {
      const result = await saveOnboardingStep(sessionId, step.id, value ?? null)
      if (!result.success) {
        setError(result.error ?? "Something went wrong.")
        return
      }
      if (result.nextStepId) {
        router.push(`/onboarding/${result.nextStepId}`)
      }
    })
  }

  const handleBack = () => {
    setError(null)
    startTransition(async () => {
      const result = await goBackOnboardingStep(sessionId, step.id)
      if (!result.success) {
        setError(result.error ?? "Something went wrong.")
        return
      }
      if (result.previousStepId) {
        router.push(`/onboarding/${result.previousStepId}`)
      }
    })
  }

  const handleComplete = () => {
    setError(null)
    startTransition(async () => {
      const result = await completeOnboarding(sessionId)
      if (result && result.success === false && result.error) {
        setError(result.error)
      }
    })
  }

  const handleReviewNext = () => {
    if (nextStepId) router.push(`/onboarding/${nextStepId}`)
  }

  if (step.type === "welcome") {
    return (
      <StepWelcome
        title={step.title}
        description={step.description}
        onNext={() => handleNext()}
        isPending={isPending}
        error={error}
      />
    )
  }

  if (step.type === "text") {
    const value = (step.field && (answers as Record<string, unknown>)[step.field]) as string | undefined
    return (
      <StepText
        title={step.title}
        description={step.description}
        placeholder={step.placeholder}
        defaultValue={value ?? ""}
        onNext={(v) => handleNext(v)}
        onBack={previousStepId ? handleBack : undefined}
        isOptional={step.isOptional}
        isPending={isPending}
        error={error}
      />
    )
  }

  if (step.type === "single-select") {
    const value = (step.field && (answers as Record<string, unknown>)[step.field]) as string | undefined
    return (
      <StepChoiceCards
        title={step.title}
        description={step.description}
        options={step.options ?? []}
        defaultValue={value}
        onNext={(v) => handleNext(v)}
        onBack={previousStepId ? handleBack : undefined}
        isOptional={step.isOptional}
        isPending={isPending}
        error={error}
      />
    )
  }

  if (isReview) {
    return (
      <StepReview
        title={step.title}
        description={step.description}
        answers={answers}
        onNext={handleReviewNext}
        onBack={handleBack}
        isPending={isPending}
      />
    )
  }

  if (isComplete) {
    return (
      <StepComplete
        title={step.title}
        description={step.description}
        onOpenWorkspace={handleComplete}
        isPending={isPending}
        error={error}
      />
    )
  }

  return null
}
