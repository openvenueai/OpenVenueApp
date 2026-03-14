const PROTECTED_PATH_PREFIXES = [
  "/onboarding",
  "/setup",
  "/dashboard",
  "/leads",
  "/workspace",
  "/inbox",
  "/express-book",
  "/calendar",
  "/tasks",
  "/reports",
  "/settings",
]

const PUBLIC_PATH_PREFIXES = [
  "/",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/auth",
]

export const DEFAULT_POST_AUTH_PATH = "/onboarding"

export function isProtectedPath(pathname: string) {
  return PROTECTED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export function isPublicPath(pathname: string) {
  return PUBLIC_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export function buildSignInRedirectPath(nextPath?: string | null) {
  const safeNextPath = sanitizeRedirectPath(nextPath)

  if (!safeNextPath || safeNextPath === "/") {
    return "/sign-in"
  }

  return `/sign-in?next=${encodeURIComponent(safeNextPath)}`
}

export function sanitizeRedirectPath(
  nextPath?: string | null,
  fallbackPath = DEFAULT_POST_AUTH_PATH,
) {
  if (!nextPath) {
    return fallbackPath
  }

  if (!nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return fallbackPath
  }

  return nextPath
}
