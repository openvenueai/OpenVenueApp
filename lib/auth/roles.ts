export const APP_ROLES = [
  "account_admin",
  "sales_manager",
  "coordinator",
  "operations",
  "read_only",
] as const;

export type AppRole = (typeof APP_ROLES)[number];

export const APP_ROLE_LABELS: Record<AppRole, string> = {
  account_admin: "Admin",
  sales_manager: "Sales Manager",
  coordinator: "Coordinator",
  operations: "Operations",
  read_only: "Read Only",
};

export function isAppRole(value: string): value is AppRole {
  return APP_ROLES.includes(value as AppRole);
}

export function hasAnyRole(
  currentRole: AppRole | null | undefined,
  allowedRoles: readonly AppRole[],
) {
  if (!currentRole) {
    return false;
  }

  return allowedRoles.includes(currentRole);
}
