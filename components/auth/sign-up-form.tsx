"use client"

import Link from "next/link"
import { useActionState } from "react"
import { ActionNotice } from "@/components/auth/action-notice"
import { SubmitButton } from "@/components/ui/submit-button"
import { initialAuthActionState } from "@/lib/auth/action-state"
import { signUpAction } from "@/lib/auth/actions"
import {
  fieldErrorClassName,
  inputClassName,
  labelClassName,
} from "@/lib/form-styles"

function getFieldError(
  fieldErrors: Record<string, string[] | undefined> | undefined,
  path: string,
) {
  return fieldErrors?.[path]?.[0]
}

export function SignUpForm() {
  const [state, formAction] = useActionState(signUpAction, initialAuthActionState)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-juniper">
          Create account
        </p>
        <h2 className="font-display text-4xl tracking-tight text-juniper-strong">
          Start a fresh OpenVenue workspace.
        </h2>
        <p className="text-sm leading-7 text-juniper">
          We&apos;ll use this first login to launch your venue setup and plan
          selection flow.
        </p>
      </div>

      <ActionNotice message={state.message} status={state.status} />

      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className={labelClassName} htmlFor="sign-up-first-name">
              First name
            </label>
            <input
              autoComplete="given-name"
              className={inputClassName}
              id="sign-up-first-name"
              name="firstName"
              placeholder="Avery"
              type="text"
            />
            {getFieldError(state.fieldErrors, "firstName") ? (
              <p className={fieldErrorClassName}>
                {getFieldError(state.fieldErrors, "firstName")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="sign-up-last-name">
              Last name
            </label>
            <input
              autoComplete="family-name"
              className={inputClassName}
              id="sign-up-last-name"
              name="lastName"
              placeholder="Morgan"
              type="text"
            />
            {getFieldError(state.fieldErrors, "lastName") ? (
              <p className={fieldErrorClassName}>
                {getFieldError(state.fieldErrors, "lastName")}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClassName} htmlFor="sign-up-email">
            Work email
          </label>
          <input
            autoComplete="email"
            className={inputClassName}
            id="sign-up-email"
            name="email"
            placeholder="events@venuegroup.com"
            type="email"
          />
          {getFieldError(state.fieldErrors, "email") ? (
            <p className={fieldErrorClassName}>
              {getFieldError(state.fieldErrors, "email")}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_0.8fr]">
          <div className="space-y-2">
            <label className={labelClassName} htmlFor="sign-up-password">
              Password
            </label>
            <input
              autoComplete="new-password"
              className={inputClassName}
              id="sign-up-password"
              name="password"
              placeholder="At least 8 characters"
              type="password"
            />
            {getFieldError(state.fieldErrors, "password") ? (
              <p className={fieldErrorClassName}>
                {getFieldError(state.fieldErrors, "password")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className={labelClassName} htmlFor="sign-up-phone">
              Phone
            </label>
            <input
              autoComplete="tel"
              className={inputClassName}
              id="sign-up-phone"
              name="phone"
              placeholder="Optional"
              type="tel"
            />
          </div>
        </div>

        <SubmitButton className="mt-2 w-full rounded-full" pendingLabel="Creating account...">
          Create account
        </SubmitButton>
      </form>

      <p className="text-sm leading-7 text-juniper">
        Already have a workspace?{" "}
        <Link className="font-semibold text-juniper hover:text-juniper-strong" href="/sign-in">
          Sign in
        </Link>
      </p>
    </div>
  )
}
