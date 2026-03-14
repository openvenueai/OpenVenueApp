import type { AppRole } from "@/lib/auth/roles"

export type MembershipContext = {
  accountId: string
  role: AppRole
  accessScope: "all_venues" | "selected_venues"
  selectedVenueIds?: string[]
}

export function canAccessVenue(
  membership: MembershipContext,
  venueId: string | null | undefined,
) {
  if (!venueId) {
    return true
  }

  if (membership.accessScope === "all_venues") {
    return true
  }

  return membership.selectedVenueIds?.includes(venueId) ?? false
}

export function canManageAccount(role: AppRole) {
  return role === "account_admin"
}

export function canEditWorkspace(role: AppRole) {
  return role !== "read_only"
}

export function canViewOperations(role: AppRole) {
  return ["account_admin", "coordinator", "operations"].includes(role)
}
