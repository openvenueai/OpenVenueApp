import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      description="Send a secure reset link and pick up where your venue team left off."
      eyebrow="Access recovery"
      footer={
        <p>
          Still blocked?{" "}
          <Link
            className="font-semibold text-juniper hover:text-juniper-strong"
            href="/sign-in"
          >
            Return to sign in.
          </Link>
        </p>
      }
      title="Reset your password."
    >
      <ForgotPasswordForm />
    </AuthShell>
  )
}
