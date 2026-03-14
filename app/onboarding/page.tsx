import { redirect } from "next/navigation"
import { OnboardingForm } from "@/components/onboarding/onboarding-form"
import { getAccountSnapshot } from "@/lib/account-context"
import { requireAuthenticatedUser } from "@/lib/auth/session"

export default async function OnboardingPage() {
  const user = await requireAuthenticatedUser("/onboarding")
  const snapshot = await getAccountSnapshot(user.id)

  if (snapshot?.account) {
    redirect("/setup")
  }

  return (
    <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <OnboardingForm userEmail={user.email} />
      </div>
    </main>
  )
}
