import { describe, expect, it } from "vitest";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/formatting";

describe("formatting utilities", () => {
  it("formats currency with sensible defaults", () => {
    expect(formatCurrency(125000)).toBe("$125,000.00");
  });

  it("returns a placeholder when currency is missing", () => {
    expect(formatCurrency(undefined)).toBe("—");
  });

  it("formats a date with a deterministic timezone", () => {
    expect(
      formatDate("2027-06-14T18:00:00.000Z", {
        timeZone: "UTC",
      }),
    ).toBe("Jun 14, 2027");
  });

  it("formats a date and time together", () => {
    expect(
      formatDateTime("2027-06-14T18:00:00.000Z", {
        timeZone: "UTC",
      }),
    ).toBe("Jun 14, 2027, 6:00 PM");
  });
});
