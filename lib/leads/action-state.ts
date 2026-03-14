export type CreateLeadActionState = {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Record<string, string[] | undefined>
}

export const initialCreateLeadActionState: CreateLeadActionState = {
  status: "idle",
}
