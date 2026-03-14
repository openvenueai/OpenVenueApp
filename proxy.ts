import { NextResponse, type NextRequest } from "next/server"
import { buildSignInRedirectPath, isProtectedPath } from "@/lib/auth/paths"
import { updateSupabaseSession } from "@/lib/supabase/proxy"

export async function proxy(request: NextRequest) {
  try {
    const { response, user } = await updateSupabaseSession(request)

    if (!isProtectedPath(request.nextUrl.pathname) || user) {
      return response
    }

    const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`
    const redirectResponse = NextResponse.redirect(
      new URL(buildSignInRedirectPath(nextPath), request.url),
    )

    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie)
    })

    return redirectResponse
  } catch {
    return NextResponse.next({ request })
  }
}

// Run proxy only for protected app routes. Exclude "/" so the homepage is served
// directly by the app (avoids Vercel edge 404 on root when proxy runs).
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/auth/callback",
    "/onboarding",
    "/onboarding/:path*",
    "/setup",
    "/setup/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/leads",
    "/leads/:path*",
    "/workspace",
    "/workspace/:path*",
    "/inbox",
    "/inbox/:path*",
    "/express-book",
    "/express-book/:path*",
    "/calendar",
    "/calendar/:path*",
    "/tasks",
    "/tasks/:path*",
    "/reports",
    "/reports/:path*",
    "/settings",
    "/settings/:path*",
  ],
}
