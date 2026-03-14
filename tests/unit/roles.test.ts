import { describe, expect, it } from "vitest";
import {
  APP_ROLE_LABELS,
  APP_ROLES,
  hasAnyRole,
  isAppRole,
} from "@/lib/auth/roles";

describe("role helpers", () => {
  it("exposes the supported app roles", () => {
    expect(APP_ROLES).toContain("account_admin");
    expect(APP_ROLE_LABELS.coordinator).toBe("Coordinator");
  });

  it("validates role strings", () => {
    expect(isAppRole("sales_manager")).toBe(true);
    expect(isAppRole("owner")).toBe(false);
  });

  it("checks access against an allow list", () => {
    expect(hasAnyRole("operations", ["operations", "account_admin"])).toBe(true);
    expect(hasAnyRole("read_only", ["operations", "account_admin"])).toBe(false);
  });
});
