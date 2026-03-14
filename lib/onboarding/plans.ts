export const PLAN_OPTIONS = [
  {
    id: "base",
    name: "Base",
    description: "Single-venue foundation for getting OpenVenue up and running.",
    venues: "Single venue only",
    highlights: [
      "Lead and event workspace foundation",
      "Proposal and planning workflow support",
      "Small team setup",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Operational CRM for venues that need more team and venue flexibility.",
    venues: "Single or multi-venue",
    highlights: [
      "Multi-user collaboration",
      "Expanded workflow coverage",
      "Multi-venue support",
    ],
  },
  {
    id: "pro_plus",
    name: "Pro+",
    description: "Best fit for larger hospitality groups and more advanced operational complexity.",
    venues: "Single or multi-venue",
    highlights: [
      "Everything in Pro",
      "Best fit for larger venue groups",
      "Future-ready for deeper automation",
    ],
  },
] as const

export type PlanTierOption = (typeof PLAN_OPTIONS)[number]["id"]

export function getEligiblePlans(venueCount: number) {
  if (venueCount <= 1) {
    return PLAN_OPTIONS.map((plan) => ({
      ...plan,
      eligible: true,
    }))
  }

  return PLAN_OPTIONS.map((plan) => ({
    ...plan,
    eligible: plan.id !== "base",
  }))
}

export function isPlanEligible(planTier: PlanTierOption, venueCount: number) {
  if (venueCount <= 1) {
    return true
  }

  return planTier !== "base"
}

export function getRecommendedPlan(venueCount: number) {
  return venueCount > 1 ? "pro" : "base"
}
