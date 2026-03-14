import type { OnboardingAnswers, OnboardingStep } from "./types"

const STEP_WELCOME = "welcome"
const STEP_PRIMARY_GOAL = "primary_goal"
const STEP_NAME = "name"
const STEP_COMPANY = "company_name"
const STEP_ROLE = "role"
const STEP_BUSINESS_TYPE = "business_type"
const STEP_VENUE_SCOPE = "venue_scope"
const STEP_CURRENT_SYSTEM = "current_system"
const STEP_CRM_NAME = "current_crm_name"
const STEP_CRM_IMPORT = "crm_import_later"
const STEP_SHEET_IMPORT = "sheet_import_later"
const STEP_ACTIVATION = "activation_choice"
const STEP_FIRST_VENUE = "first_venue_name"
const STEP_PIPELINE = "pipeline_name"
const STEP_LEAD_SOURCE = "lead_source"
const STEP_REVIEW = "review"
const STEP_COMPLETE = "complete"

export const ONBOARDING_STEP_IDS = {
  STEP_WELCOME,
  STEP_PRIMARY_GOAL,
  STEP_NAME,
  STEP_COMPANY,
  STEP_ROLE,
  STEP_BUSINESS_TYPE,
  STEP_VENUE_SCOPE,
  STEP_CURRENT_SYSTEM,
  STEP_CRM_NAME,
  STEP_CRM_IMPORT,
  STEP_SHEET_IMPORT,
  STEP_ACTIVATION,
  STEP_FIRST_VENUE,
  STEP_PIPELINE,
  STEP_LEAD_SOURCE,
  STEP_REVIEW,
  STEP_COMPLETE,
} as const

function showIfCrm(a: OnboardingAnswers) {
  return a.currentSystem === "Another CRM"
}
function showIfSpreadsheets(a: OnboardingAnswers) {
  return a.currentSystem === "Spreadsheets"
}
function showIfFirstVenue(a: OnboardingAnswers) {
  return a.activationChoice === "First venue"
}
function showIfPipeline(a: OnboardingAnswers) {
  return a.activationChoice === "Sales pipeline"
}
function showIfLeadWorkflow(a: OnboardingAnswers) {
  return a.activationChoice === "Lead workflow"
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: STEP_WELCOME,
    type: "welcome",
    title: "Welcome to OpenVenue",
    description: "Let's get your workspace set up in a few quick steps.",
  },
  {
    id: STEP_PRIMARY_GOAL,
    type: "single-select",
    title: "What would you like to do first in OpenVenue?",
    field: "primaryGoal",
    options: [
      { label: "Manage venues", value: "Manage venues" },
      { label: "Track leads", value: "Track leads" },
      { label: "Organize pipeline", value: "Organize pipeline" },
      { label: "Just explore", value: "Just explore" },
    ],
    validate: (v) => (v ? null : "Please choose an option."),
  },
  {
    id: STEP_NAME,
    type: "text",
    title: "What should we call you?",
    field: "userName",
    placeholder: "Your name",
    validate: (v) => {
      const s = typeof v === "string" ? v.trim() : ""
      return s.length > 0 ? null : "Please enter your name."
    },
  },
  {
    id: STEP_COMPANY,
    type: "text",
    title: "What company are you setting up?",
    field: "companyName",
    placeholder: "Company name",
    validate: (v) => {
      const s = typeof v === "string" ? v.trim() : ""
      return s.length > 0 ? null : "Please enter your company name."
    },
  },
  {
    id: STEP_ROLE,
    type: "single-select",
    title: "What best describes your role?",
    field: "role",
    options: [
      { label: "Founder / Owner", value: "Founder / Owner" },
      { label: "Sales", value: "Sales" },
      { label: "Operations", value: "Operations" },
      { label: "Venue Manager", value: "Venue Manager" },
      { label: "Other", value: "Other" },
    ],
    validate: (v) => (v ? null : "Please choose an option."),
  },
  {
    id: STEP_BUSINESS_TYPE,
    type: "single-select",
    title: "What kind of business are you running?",
    field: "businessType",
    options: [
      { label: "Venue operator", value: "Venue operator" },
      { label: "Agency / representation", value: "Agency / representation" },
      { label: "Hospitality group", value: "Hospitality group" },
      { label: "Events business", value: "Events business" },
      { label: "Other", value: "Other" },
    ],
    validate: (v) => (v ? null : "Please choose an option."),
  },
  {
    id: STEP_VENUE_SCOPE,
    type: "single-select",
    title: "How many venues are you managing right now?",
    field: "venueCountRange",
    options: [
      { label: "1", value: "1" },
      { label: "2–5", value: "2–5" },
      { label: "6+", value: "6+" },
    ],
    validate: (v) => (v ? null : "Please choose an option."),
  },
  {
    id: STEP_CURRENT_SYSTEM,
    type: "single-select",
    title: "How are you managing this today?",
    field: "currentSystem",
    options: [
      { label: "Spreadsheets", value: "Spreadsheets" },
      { label: "Another CRM", value: "Another CRM" },
      { label: "Email and notes", value: "Email and notes" },
      { label: "Starting from scratch", value: "Starting from scratch" },
    ],
    validate: (v) => (v ? null : "Please choose an option."),
  },
  {
    id: STEP_CRM_NAME,
    type: "text",
    title: "Which CRM are you using now?",
    field: "currentCrmName",
    placeholder: "HubSpot, Salesforce, Pipedrive, etc.",
    showIf: showIfCrm,
    validate: (v, a) => {
      if (!showIfCrm(a)) return null
      const s = typeof v === "string" ? v.trim() : ""
      return s.length > 0 ? null : "Please enter the CRM name."
    },
  },
  {
    id: STEP_CRM_IMPORT,
    type: "single-select",
    title: "Would you like to import your data later?",
    field: "crmImportLater",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
    showIf: showIfCrm,
    validate: (v, a) => (!showIfCrm(a) || v ? null : "Please choose an option."),
  },
  {
    id: STEP_SHEET_IMPORT,
    type: "single-select",
    title: "Would you like to import a spreadsheet later?",
    field: "sheetImportLater",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
    showIf: showIfSpreadsheets,
    validate: (v, a) => (!showIfSpreadsheets(a) || v ? null : "Please choose an option."),
  },
  {
    id: STEP_ACTIVATION,
    type: "single-select",
    title: "What should we help you set up first?",
    field: "activationChoice",
    options: [
      { label: "First venue", value: "First venue" },
      { label: "Sales pipeline", value: "Sales pipeline" },
      { label: "Lead workflow", value: "Lead workflow" },
    ],
    validate: (v, a) => {
      if (a.primaryGoal === "Just explore") return null
      return v ? null : "Please choose an option."
    },
  },
  {
    id: STEP_FIRST_VENUE,
    type: "text",
    title: "What's the name of your first venue?",
    field: "firstVenueName",
    placeholder: "Venue name",
    showIf: showIfFirstVenue,
    validate: (v, a) => {
      if (!showIfFirstVenue(a)) return null
      const s = typeof v === "string" ? v.trim() : ""
      return s.length > 0 ? null : "Please enter the venue name."
    },
  },
  {
    id: STEP_PIPELINE,
    type: "text",
    title: "What should we call your pipeline?",
    field: "pipelineName",
    placeholder: "Default Pipeline",
    showIf: showIfPipeline,
    validate: (v, a) => {
      if (!showIfPipeline(a)) return null
      const s = typeof v === "string" ? v.trim() : ""
      return s.length > 0 ? null : "Please enter a pipeline name."
    },
  },
  {
    id: STEP_LEAD_SOURCE,
    type: "single-select",
    title: "Where do most of your leads come from today?",
    field: "leadSource",
    options: [
      { label: "Website", value: "Website" },
      { label: "Email", value: "Email" },
      { label: "Referrals", value: "Referrals" },
      { label: "Multiple sources", value: "Multiple sources" },
      { label: "Other", value: "Other" },
    ],
    showIf: showIfLeadWorkflow,
    validate: (v, a) => (!showIfLeadWorkflow(a) || v ? null : "Please choose an option."),
  },
  {
    id: STEP_REVIEW,
    type: "review",
    title: "Review your setup",
    description: "Confirm and finish.",
  },
  {
    id: STEP_COMPLETE,
    type: "complete",
    title: "Your workspace is ready",
    description: "You're all set.",
  },
]

export function getStepById(id: string): OnboardingStep | undefined {
  return ONBOARDING_STEPS.find((s) => s.id === id)
}

export function getStepIndex(stepId: string): number {
  const i = ONBOARDING_STEPS.findIndex((s) => s.id === stepId)
  return i >= 0 ? i : 0
}

export function getVisibleSteps(answers: OnboardingAnswers): OnboardingStep[] {
  return ONBOARDING_STEPS.filter((step) => {
    if (step.showIf && !step.showIf(answers)) return false
    return true
  })
}

export function getNextStepId(currentStepId: string, answers: OnboardingAnswers): string | null {
  const visible = getVisibleSteps(answers)
  const currentIndex = visible.findIndex((s) => s.id === currentStepId)
  if (currentIndex < 0) return visible[0]?.id ?? null
  const next = visible[currentIndex + 1]
  return next?.id ?? null
}

export function getPreviousStepId(currentStepId: string, answers: OnboardingAnswers): string | null {
  const visible = getVisibleSteps(answers)
  const currentIndex = visible.findIndex((s) => s.id === currentStepId)
  if (currentIndex <= 0) return null
  return visible[currentIndex - 1]?.id ?? null
}

export function getProgress(stepId: string, answers: OnboardingAnswers): { current: number; total: number } {
  const visible = getVisibleSteps(answers)
  const current = visible.findIndex((s) => s.id === stepId) + 1
  return { current: current || 1, total: visible.length }
}

export function validateStep(step: OnboardingStep, value: unknown, answers: OnboardingAnswers): string | null {
  if (step.validate) return step.validate(value, answers)
  return null
}
