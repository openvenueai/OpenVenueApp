export const LEAD_EVENT_TYPE_VALUES = [
  "wedding",
  "corporate",
  "social",
  "nonprofit",
  "private_dining",
  "holiday_party",
  "other",
] as const

export type LeadEventType = (typeof LEAD_EVENT_TYPE_VALUES)[number]

export const LEAD_EVENT_TYPE_LABELS: Record<LeadEventType, string> = {
  wedding: "Wedding",
  corporate: "Corporate event",
  social: "Social event",
  nonprofit: "Nonprofit fundraiser",
  private_dining: "Private dining",
  holiday_party: "Holiday party",
  other: "Other",
}

export const WORKSPACE_STAGE_LABELS = {
  lead: "New lead",
  qualified: "Qualified",
  proposal_in_progress: "Proposal in progress",
  proposal_sent: "Proposal sent",
  negotiation: "Negotiation",
  contract_pending: "Contract pending",
  booked: "Booked",
  planning: "Planning",
  final_review: "Final review",
  completed: "Completed",
  archived: "Archived",
} as const

export const PROPOSAL_PIPELINE_STAGES = [
  "proposal_in_progress",
  "proposal_sent",
  "negotiation",
  "contract_pending",
] as const

export function formatLeadEventType(eventType: string | null | undefined) {
  if (!eventType) {
    return "—"
  }

  return LEAD_EVENT_TYPE_LABELS[eventType as LeadEventType] ?? eventType
}

export function formatWorkspaceStage(stage: string | null | undefined) {
  if (!stage) {
    return "—"
  }

  return WORKSPACE_STAGE_LABELS[stage as keyof typeof WORKSPACE_STAGE_LABELS] ?? stage
}
