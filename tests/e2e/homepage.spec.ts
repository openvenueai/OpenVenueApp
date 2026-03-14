import { expect, test } from "@playwright/test";

test("loads the OpenVenue starter shell", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /building the operating system for venues/i,
    }),
  ).toBeVisible();

  await expect(page.getByText(/phase 1 in progress/i)).toBeVisible();
});
