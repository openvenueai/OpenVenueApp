"use server"

import { redirect } from "next/navigation"
import { ZodError } from "zod"
import {
  DEFAULT_POST_AUTH_PATH,
  sanitizeRedirectPath,
} from "@/lib/auth/paths"
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/auth/schemas"
import type { AuthActionState } from "@/lib/auth/action-state"
import { getAppUrl } from "@/lib/site"
import { createServerSupabaseClient } from "@/lib/supabase/server"

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key)

  return typeof value === "string" ? value : ""
}

function getValidationErrorState(error: ZodError): AuthActionState {
  return {
    status: "error",
    message: "Check the highlighted fields and try again.",
    fieldErrors: error.flatten().fieldErrors,
  }
}

function getConfigurationErrorState(): AuthActionState {
  return {
    status: "error",
    message:
      "Supabase is not configured yet. Add the public URL and publishable key before testing auth.",
  }
}

function buildCallbackUrl(nextPath = DEFAULT_POST_AUTH_PATH) {
  const appUrl = getAppUrl()
  const safeNextPath = sanitizeRedirectPath(nextPath)

  return `${appUrl}/auth/callback?next=${encodeURIComponent(safeNextPath)}`
}

export async function signInAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signInSchema.safeParse({
    email: getFormValue(formData, "email"),
    password: getFormValue(formData, "password"),
    next: getFormValue(formData, "next") || undefined,
  })

  if (!parsed.success) {
    return getValidationErrorState(parsed.error)
  }

  const supabase = await createServerSupabaseClient()

  if (!supabase) {
    return getConfigurationErrorState()
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    return {
      status: "error",
      message: error.message,
    }
  }

  redirect(sanitizeRedirectPath(parsed.data.next))
}

export async function signUpAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signUpSchema.safeParse({
    firstName: getFormValue(formData, "firstName"),
    lastName: getFormValue(formData, "lastName"),
    email: getFormValue(formData, "email"),
    password: getFormValue(formData, "password"),
    phone: getFormValue(formData, "phone") || undefined,
  })

  if (!parsed.success) {
    return getValidationErrorState(parsed.error)
  }

  const supabase = await createServerSupabaseClient()

  if (!supabase) {
    return getConfigurationErrorState()
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: buildCallbackUrl(DEFAULT_POST_AUTH_PATH),
      data: {
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
        full_name: `${parsed.data.firstName} ${parsed.data.lastName}`.trim(),
        phone: parsed.data.phone ?? null,
      },
    },
  })

  if (error) {
    return {
      status: "error",
      message: error.message,
    }
  }

  if (session) {
    redirect(DEFAULT_POST_AUTH_PATH)
  }

  return {
    status: "success",
    message:
      "Your account is almost ready. Check your inbox to confirm your email, then continue onboarding.",
  }
}

export async function signInWithGoogleAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const nextPath = sanitizeRedirectPath(getFormValue(formData, "next"))
  const supabase = await createServerSupabaseClient()

  if (!supabase) {
    return getConfigurationErrorState()
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: buildCallbackUrl(nextPath),
    },
  })

  if (error) {
    return {
      status: "error",
      message: error.message,
    }
  }

  if (!data.url) {
    return {
      status: "error",
      message: "Google sign-in could not start. Try again in a moment.",
    }
  }

  redirect(data.url)
}

export async function forgotPasswordAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: getFormValue(formData, "email"),
  })

  if (!parsed.success) {
    return getValidationErrorState(parsed.error)
  }

  const supabase = await createServerSupabaseClient()

  if (!supabase) {
    return getConfigurationErrorState()
  }

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: buildCallbackUrl("/reset-password"),
  })

  if (error) {
    return {
      status: "error",
      message: error.message,
    }
  }

  return {
    status: "success",
    message:
      "If that email belongs to an OpenVenue account, a reset link is on the way.",
  }
}

export async function resetPasswordAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = resetPasswordSchema.safeParse({
    password: getFormValue(formData, "password"),
    confirmPassword: getFormValue(formData, "confirmPassword"),
  })

  if (!parsed.success) {
    return getValidationErrorState(parsed.error)
  }

  const supabase = await createServerSupabaseClient()

  if (!supabase) {
    return getConfigurationErrorState()
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      status: "error",
      message:
        "Your reset session is missing or expired. Request a fresh password reset link and try again.",
    }
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  })

  if (error) {
    return {
      status: "error",
      message: error.message,
    }
  }

  return {
    status: "success",
    message: "Password updated. You can continue into OpenVenue now.",
  }
}
