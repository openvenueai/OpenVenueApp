import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { SignUpForm } from "@/components/auth/sign-up-form"

export default function SignUpPage() {
  return (
    <AuthShell
      description="Create the account owner login that will launch your first venue setup, plan selection, and internal checklist."
      eyebrow="Phase 3 launch"
      footer={
        <p>
          Already have access?{" "}
          <Link
            className="font-semibold text-juniper hover:text-juniper-strong"
            href="/sign-in"
          >
            Sign in instead.
          </Link>
        </p>
      }
      title="Create your OpenVenue workspace."
    >
      <SignUpForm />
    </AuthShell>
  )
}
