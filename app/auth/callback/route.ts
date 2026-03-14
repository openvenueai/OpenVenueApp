import { NextResponse, type NextRequest } from "next/server"
import {
  DEFAULT_POST_AUTH_PATH,
  sanitizeRedirectPath,
} from "@/lib/auth/paths"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const errorDescription = requestUrl.searchParams.get("error_description")
  const nextPath = sanitizeRedirectPath(
    requestUrl.searchParams.get("next"),
    DEFAULT_POST_AUTH_PATH,
  )

  if (error) {
    const redirectUrl = new URL("/sign-in", request.url)
    redirectUrl.searchParams.set("error", error)

    if (errorDescription) {
      redirectUrl.searchParams.set("error_description", errorDescription)
    }

    return NextResponse.redirect(redirectUrl)
  }

  const supabase = await createServerSupabaseClient()

  if (!supabase) {
    const redirectUrl = new URL("/sign-in", request.url)
    redirectUrl.searchParams.set(
      "error",
      "Supabase is not configured yet. Add auth environment variables first.",
    )
    return NextResponse.redirect(redirectUrl)
  }

  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      const redirectUrl = new URL("/sign-in", request.url)
      redirectUrl.searchParams.set("error", exchangeError.message)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.redirect(new URL(nextPath, request.url))
}
