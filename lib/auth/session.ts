import { cache } from "react"
import { redirect } from "next/navigation"
import { buildSignInRedirectPath } from "@/lib/auth/paths"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export const getCurrentUser = cache(async () => {
  const supabase = await createServerSupabaseClient()

  if (!supabase) {
    return null
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
})

export const getCurrentClaims = cache(async () => {
  const supabase = await createServerSupabaseClient()

  if (!supabase) {
    return null
  }

  const { data } = await supabase.auth.getClaims()

  return data?.claims ?? null
})

export async function requireAuthenticatedUser(nextPath?: string) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(buildSignInRedirectPath(nextPath))
  }

  return user
}
