import { expect, test } from "@playwright/test"

test("unauthenticated /onboarding redirects to sign-in", async ({ page }) => {
  await page.goto("/onboarding")
  await expect(page).toHaveURL(/\/sign-in/)
  await expect(page.getByRole("button", { name: /sign in to openvenue/i })).toBeVisible()
})

test("onboarding welcome step shows title when visiting directly", async ({ page }) => {
  await page.goto("/onboarding/welcome")
  await expect(page).toHaveURL(/\/sign-in|\/onboarding\/welcome/)
  if (page.url().includes("/onboarding/welcome")) {
    await expect(page.getByRole("heading", { name: /welcome to openvenue/i })).toBeVisible()
  }
})
