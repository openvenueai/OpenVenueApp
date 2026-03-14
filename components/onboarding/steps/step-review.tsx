"use client"

import { Button } from "@/components/ui/button"
import type { OnboardingAnswers } from "@/lib/onboarding/types"

type StepReviewProps = {
  title: string
  description?: string
  answers: OnboardingAnswers
  onNext: () => void
  onBack: () => void
  isPending: boolean
}

const LABELS: Record<string, string> = {
  primaryGoal: "Primary goal",
  userName: "Your name",
  companyName: "Company",
  role: "Role",
  businessType: "Business type",
  venueCountRange: "Venue count",
  currentSystem: "Current system",
  currentCrmName: "Current CRM",
  crmImportLater: "Import from CRM later",
  sheetImportLater: "Import spreadsheet later",
  activationChoice: "Set up first",
  firstVenueName: "First venue name",
  pipelineName: "Pipeline name",
  leadSource: "Lead source",
}

export function StepReview({
  title,
  description,
  answers,
  onNext,
  onBack,
  isPending,
}: StepReviewProps) {
  const entries = Object.entries(answers).filter(
    ([_, v]) => v != null && String(v).trim() !== "",
  )

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-base leading-7 text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="rounded-2xl border border-line bg-surface p-5">
        <ul className="space-y-3">
          {entries.map(([key, value]) => (
            <li key={key} className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">{LABELS[key] ?? key}</span>
              <span className="font-medium text-foreground">{String(value)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={onBack} disabled={isPending}>
          Back
        </Button>
        <Button onClick={onNext} disabled={isPending}>
          Finish setup
        </Button>
      </div>
    </div>
  )
}
