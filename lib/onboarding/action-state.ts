export type OnboardingActionState = {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Record<string, string[] | undefined>
}

export const initialOnboardingActionState: OnboardingActionState = {
  status: "idle",
}
