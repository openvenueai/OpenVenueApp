import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { getSupabasePublicConfig } from "@/lib/supabase/config"

export async function createServerSupabaseClient() {
  const config = getSupabasePublicConfig()

  if (!config) {
    return null
  }

  const cookieStore = await cookies()

  return createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server components may not be allowed to write cookies.
          // Session refresh is handled in proxy.ts for request lifecycles.
        }
      },
    },
  })
}
