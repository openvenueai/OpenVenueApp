import type { AppRole } from "@/lib/auth/roles"
import { hasAnyRole } from "@/lib/auth/roles"

type AppNavItem = {
  href: string
  label: string
  description: string
  allowedRoles: readonly AppRole[]
}

const ALL_APP_ROLES = [
  "account_admin",
  "sales_manager",
  "coordinator",
  "operations",
  "read_only",
] as const

export const APP_NAV_ITEMS: AppNavItem[] = [
  {
    href: "/dashboard",
    label: "Home",
    description: "Daily priorities, pipeline movement, and the venue team's current focus.",
    allowedRoles: [...ALL_APP_ROLES],
  },
  {
    href: "/leads",
    label: "Leads",
    description: "Capture inquiries, review pipeline health, and open each event workspace.",
    allowedRoles: ["account_admin", "sales_manager", "coordinator", "read_only"],
  },
  {
    href: "/inbox",
    label: "Inbox",
    description: "Conversations and threads linked to events.",
    allowedRoles: [...ALL_APP_ROLES],
  },
  {
    href: "/calendar",
    label: "Calendar",
    description: "Venue dates, milestones, and schedule visibility across active events.",
    allowedRoles: [...ALL_APP_ROLES],
  },
  {
    href: "/tasks",
    label: "Tasks",
    description: "Track assignments, follow-ups, and internal next steps by venue and event.",
    allowedRoles: [...ALL_APP_ROLES],
  },
  {
    href: "/express-book",
    label: "Express Book",
    description: "Quick booking and availability.",
    allowedRoles: [...ALL_APP_ROLES],
  },
  {
    href: "/reports",
    label: "Reports",
    description: "Measure pipeline, conversion, and venue performance over time.",
    allowedRoles: ["account_admin", "sales_manager", "coordinator", "read_only"],
  },
  {
    href: "/settings",
    label: "Settings",
    description: "Manage account controls, access, and system-level configuration.",
    allowedRoles: ["account_admin"],
  },
]

export const APP_UTILITY_LINKS: AppNavItem[] = [
  {
    href: "/setup",
    label: "Setup",
    description: "Complete onboarding details, venue profile setup, and account readiness tasks.",
    allowedRoles: [
      "account_admin",
      "sales_manager",
      "coordinator",
      "operations",
      "read_only",
    ],
  },
]

export function getVisibleAppNavItems(currentRole: AppRole | null | undefined) {
  return APP_NAV_ITEMS.filter((item) => hasAnyRole(currentRole, item.allowedRoles))
}

export function getVisibleAppUtilityLinks(
  currentRole: AppRole | null | undefined,
) {
  return APP_UTILITY_LINKS.filter((item) =>
    hasAnyRole(currentRole, item.allowedRoles),
  )
}

export function canAccessAppPath(
  currentRole: AppRole | null | undefined,
  href: string,
) {
  const item = [...APP_NAV_ITEMS, ...APP_UTILITY_LINKS].find(
    (candidate) => candidate.href === href,
  )

  if (!item) {
    return true
  }

  return hasAnyRole(currentRole, item.allowedRoles)
}

export function getAppNavItemByPath(href: string) {
  return [...APP_NAV_ITEMS, ...APP_UTILITY_LINKS].find(
    (item) => href === item.href || href.startsWith(`${item.href}/`),
  )
}
