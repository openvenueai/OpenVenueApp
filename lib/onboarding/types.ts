export type OnboardingAnswers = {
  primaryGoal?: string
  userName?: string
  companyName?: string
  role?: string
  businessType?: string
  venueCountRange?: string
  currentSystem?: string
  currentCrmName?: string
  crmImportLater?: string
  sheetImportLater?: string
  activationChoice?: string
  firstVenueName?: string
  pipelineName?: string
  leadSource?: string
}

export type OnboardingStepType =
  | "welcome"
  | "text"
  | "single-select"
  | "multi-select"
  | "review"
  | "complete"

export type OnboardingStep = {
  id: string
  type: OnboardingStepType
  title: string
  description?: string
  field?: string
  placeholder?: string
  options?: { label: string; value: string }[]
  isOptional?: boolean
  showIf?: (answers: OnboardingAnswers) => boolean
  nextStep?: (answers: OnboardingAnswers) => string | null
  validate?: (value: unknown, answers: OnboardingAnswers) => string | null
}

export type OnboardingSessionRecord = {
  id: string
  userId: string
  accountId: string | null
  currentStepId: string
  answers: OnboardingAnswers
  status: "in_progress" | "completed" | "abandoned"
  version: string
  startedAt: Date
  updatedAt: Date
  completedAt: Date | null
}
