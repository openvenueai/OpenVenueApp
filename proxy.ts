import { NextResponse, type NextRequest } from "next/server"
import { buildSignInRedirectPath, isProtectedPath } from "@/lib/auth/paths"
import { updateSupabaseSession } from "@/lib/supabase/proxy"

export async function proxy(request: NextRequest) {
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
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
