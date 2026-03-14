import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

function getSearchParamValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined
}

type ResetPasswordPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = searchParams ? await searchParams : {}
  const errorMessage =
    getSearchParamValue(params.error_description) ??
    getSearchParamValue(params.error)

  return (
    <AuthShell
      description="Once your reset session is active, choose a new password and continue into setup."
      eyebrow="Password reset"
      footer={
        <p>
          Need another link?{" "}
          <Link
            className="font-semibold text-juniper hover:text-juniper-strong"
            href="/forgot-password"
          >
            Request a fresh reset email.
          </Link>
        </p>
      }
      title="Choose a new password."
    >
      <ResetPasswordForm serverMessage={errorMessage} />
    </AuthShell>
  )
}
