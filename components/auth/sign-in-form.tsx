"use client"

import Link from "next/link"
import { useActionState } from "react"
import { ActionNotice } from "@/components/auth/action-notice"
import { SubmitButton } from "@/components/ui/submit-button"
import { initialAuthActionState } from "@/lib/auth/action-state"
import {
  signInAction,
  signInWithGoogleAction,
} from "@/lib/auth/actions"
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

type SignInFormProps = {
  nextPath?: string
  serverMessage?: string
}

export function SignInForm({ nextPath, serverMessage }: SignInFormProps) {
  const [state, formAction] = useActionState(signInAction, initialAuthActionState)
  const [googleState, googleAction] = useActionState(
    signInWithGoogleAction,
    initialAuthActionState,
  )

  const activeState = googleState.status !== "idle" ? googleState : state

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-juniper">
          Sign in
        </p>
        <h2 className="font-display text-4xl tracking-tight text-juniper-strong">
          Welcome back.
        </h2>
        <p className="text-sm leading-7 text-juniper">
          Pick up where the venue team left off across leads, planning, and
          operations.
        </p>
      </div>

      <ActionNotice message={serverMessage} status="error" />
      <ActionNotice message={activeState.message} status={activeState.status} />

      <form action={googleAction}>
        <input name="next" type="hidden" value={nextPath ?? ""} />
        <SubmitButton
          className="w-full rounded-full border border-line bg-white text-juniper-strong hover:bg-canvas"
          pendingLabel="Redirecting..."
          variant="outline"
        >
          Continue with Google
        </SubmitButton>
      </form>

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-juniper">
        <span className="h-px flex-1 bg-line" />
        <span>or continue with email</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form action={formAction} className="space-y-4">
        <input name="next" type="hidden" value={nextPath ?? ""} />

        <div className="space-y-2">
          <label className={labelClassName} htmlFor="sign-in-email">
            Work email
          </label>
          <input
            autoComplete="email"
            className={inputClassName}
            id="sign-in-email"
            name="email"
            placeholder="team@venue.com"
            type="email"
          />
          {getFieldError(activeState.fieldErrors, "email") ? (
            <p className={fieldErrorClassName}>
              {getFieldError(activeState.fieldErrors, "email")}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <label className={labelClassName} htmlFor="sign-in-password">
              Password
            </label>
            <Link className="text-sm text-juniper hover:text-juniper-strong" href="/forgot-password">
              Forgot password?
            </Link>
          </div>
          <input
            autoComplete="current-password"
            className={inputClassName}
            id="sign-in-password"
            name="password"
            placeholder="Enter your password"
            type="password"
          />
          {getFieldError(activeState.fieldErrors, "password") ? (
            <p className={fieldErrorClassName}>
              {getFieldError(activeState.fieldErrors, "password")}
            </p>
          ) : null}
        </div>

        <SubmitButton className="mt-2 w-full rounded-full" pendingLabel="Signing in...">
          Sign in to OpenVenue
        </SubmitButton>
      </form>
    </div>
  )
}
