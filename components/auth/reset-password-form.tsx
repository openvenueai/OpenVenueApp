"use client"

import Link from "next/link"
import { useActionState } from "react"
import { ActionNotice } from "@/components/auth/action-notice"
import { SubmitButton } from "@/components/ui/submit-button"
import { initialAuthActionState } from "@/lib/auth/action-state"
import { resetPasswordAction } from "@/lib/auth/actions"
import {
  fieldErrorClassName,
  inputClassName,
  labelClassName,
} from "@/lib/form-styles"

type ResetPasswordFormProps = {
  serverMessage?: string
}

export function ResetPasswordForm({ serverMessage }: ResetPasswordFormProps) {
  const [state, formAction] = useActionState(
    resetPasswordAction,
    initialAuthActionState,
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-juniper">
          Set new password
        </p>
        <h2 className="font-display text-4xl tracking-tight text-juniper-strong">
          Reset your OpenVenue password.
        </h2>
        <p className="text-sm leading-7 text-juniper">
          Choose a new password, then continue into setup and day-to-day venue
          operations.
        </p>
      </div>

      <ActionNotice message={serverMessage} status="error" />
      <ActionNotice message={state.message} status={state.status} />

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="reset-password-password">
            New password
          </label>
          <input
            autoComplete="new-password"
            className={inputClassName}
            id="reset-password-password"
            name="password"
            placeholder="At least 8 characters"
            type="password"
          />
          {state.fieldErrors?.password?.[0] ? (
            <p className={fieldErrorClassName}>{state.fieldErrors.password[0]}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className={labelClassName} htmlFor="reset-password-confirm-password">
            Confirm password
          </label>
          <input
            autoComplete="new-password"
            className={inputClassName}
            id="reset-password-confirm-password"
            name="confirmPassword"
            placeholder="Re-enter your new password"
            type="password"
          />
          {state.fieldErrors?.confirmPassword?.[0] ? (
            <p className={fieldErrorClassName}>
              {state.fieldErrors.confirmPassword[0]}
            </p>
          ) : null}
        </div>

        <SubmitButton className="w-full rounded-full" pendingLabel="Updating password...">
          Update password
        </SubmitButton>
      </form>

      <p className="text-sm leading-7 text-juniper">
        Need a fresh link?{" "}
        <Link
          className="font-semibold text-juniper hover:text-juniper-strong"
          href="/forgot-password"
        >
          Request another reset email
        </Link>
      </p>
    </div>
  )
}
