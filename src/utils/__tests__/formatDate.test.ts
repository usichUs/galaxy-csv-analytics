import { describe, expect, it } from "vitest";
import { formatDate } from "../formatDate";

describe("formatDate Utility", () => {
  it("formats ISO date string correctly", () => {
    const result = formatDate("2025-06-28T00:00:00.000Z");
    expect(result).toBe("28.06.2025");
  });

  it("handles invalid ISO date string gracefully", () => {
    const result = formatDate("invalid-date");
    expect(result).toBe("NaN.NaN.NaN");
  });

  it("formats date with single-digit day and month correctly", () => {
    const result = formatDate("2025-01-05T00:00:00.000Z");
    expect(result).toBe("05.01.2025");
  });
});
