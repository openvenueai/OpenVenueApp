"use client"

import Link from "next/link"
import { useActionState } from "react"
import { ActionNotice } from "@/components/auth/action-notice"
import { SubmitButton } from "@/components/ui/submit-button"
import { initialAuthActionState } from "@/lib/auth/action-state"
import { forgotPasswordAction } from "@/lib/auth/actions"
import {
  fieldErrorClassName,
  inputClassName,
  labelClassName,
} from "@/lib/form-styles"

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(
    forgotPasswordAction,
    initialAuthActionState,
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-juniper">
          Password reset
        </p>
        <h2 className="font-display text-4xl tracking-tight text-juniper-strong">
          Get back into your workspace.
        </h2>
        <p className="text-sm leading-7 text-juniper">
          We&apos;ll send a secure reset link to the email tied to your OpenVenue
          account.
        </p>
      </div>

      <ActionNotice message={state.message} status={state.status} />

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="forgot-password-email">
            Work email
          </label>
          <input
            autoComplete="email"
            className={inputClassName}
            id="forgot-password-email"
            name="email"
            placeholder="team@venue.com"
            type="email"
          />
          {state.fieldErrors?.email?.[0] ? (
            <p className={fieldErrorClassName}>{state.fieldErrors.email[0]}</p>
          ) : null}
        </div>

        <SubmitButton className="w-full rounded-full" pendingLabel="Sending link...">
          Send reset link
        </SubmitButton>
      </form>

      <p className="text-sm leading-7 text-juniper">
        Remembered it?{" "}
        <Link className="font-semibold text-juniper hover:text-juniper-strong" href="/sign-in">
          Return to sign in
        </Link>
      </p>
    </div>
  )
}
