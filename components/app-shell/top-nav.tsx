"use client"

import Link from "next/link"
import type { AccountSnapshot } from "@/lib/account-context"
import { APP_ROLE_LABELS } from "@/lib/auth/roles"
import {
  getAppNavItemByPath,
  getVisibleAppNavItems,
  getVisibleAppUtilityLinks,
} from "@/lib/app-shell/navigation"
import { cn } from "@/lib/utils"

type TopNavProps = {
  snapshot: AccountSnapshot
  activePath: string
}

function isActivePath(activePath: string, href: string) {
  return activePath === href || activePath.startsWith(`${href}/`)
}

function formatPlanTier(planTier: string) {
  return planTier.replace(/_/g, " ")
}

export function TopNav({ snapshot, activePath }: TopNavProps) {
  const currentRole = snapshot.membership?.role
  const primaryNavItems = getVisibleAppNavItems(currentRole)
  const utilityLinks = getVisibleAppUtilityLinks(currentRole)
  const planTier = snapshot.account
    ? formatPlanTier(snapshot.account.planTier)
    : "Pending"

  return (
    <header
      className="sticky top-0 z-50 flex h-14 min-h-[var(--nav-height)] w-full items-center border-b border-white/10 bg-[var(--nav-bg)] px-4 text-white shadow-sm sm:px-6"
      style={{ minHeight: "var(--nav-height)" }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="shrink-0 text-sm font-semibold uppercase tracking-widest text-white"
        >
          OpenVenue
        </Link>

        {/* Main nav links */}
        <nav className="flex items-center gap-1">
          {primaryNavItems.map((item) => {
            const active = isActivePath(activePath, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-white/15 text-white underline-offset-4"
                    : "text-white/85 hover:bg-white/10 hover:text-white",
                )}
                title={item.description}
              >
                <span className={active ? "underline" : undefined}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Right: utility, account context, avatar */}
        <div className="flex shrink-0 items-center gap-3">
          {utilityLinks.map((item) => {
            const active = isActivePath(activePath, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-2 py-1.5 text-sm font-medium",
                  active ? "bg-white/15 text-white" : "text-white/85 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            )
          })}

          <span className="hidden text-xs text-white/70 sm:inline">
            {snapshot.account?.name ?? "—"}
          </span>
          {currentRole ? (
            <span
              className="hidden rounded bg-white/15 px-2 py-0.5 text-xs text-white/90 sm:inline"
              title="Your role"
            >
              {APP_ROLE_LABELS[currentRole]}
            </span>
          ) : null}
          <span className="hidden capitalize text-white/70 sm:inline sm:text-xs">
            {planTier}
          </span>

          {/* Avatar / account: use initials or icon */}
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white"
            title={snapshot.profile?.fullName ?? snapshot.profile?.email ?? "Account"}
          >
            {(snapshot.profile?.fullName ?? snapshot.profile?.email ?? "?")
              .slice(0, 1)
              .toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  )
}
