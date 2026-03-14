import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { SignInForm } from "@/components/auth/sign-in-form"

function getSearchParamValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined
}

type SignInPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = searchParams ? await searchParams : {}
  const nextPath = getSearchParamValue(params.next)
  const errorMessage =
    getSearchParamValue(params.error_description) ??
    getSearchParamValue(params.error) ??
    getSearchParamValue(params.message)

  return (
    <AuthShell
      description="Bring your sales, planning, and operations context back into one shared venue workspace."
      eyebrow="Authentication foundation"
      footer={
        <p>
          Need a new account?{" "}
          <Link
            className="font-semibold text-juniper hover:text-juniper-strong"
            href="/sign-up"
          >
            Create one and start onboarding.
          </Link>
        </p>
      }
      title="Return to the venue command center."
    >
      <SignInForm nextPath={nextPath} serverMessage={errorMessage} />
    </AuthShell>
  )
}
