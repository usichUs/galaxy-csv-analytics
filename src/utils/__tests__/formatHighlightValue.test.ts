import { formatHighlightValue } from "../formatHighlightValue";
import { getDateByIndex } from "../getDate";
import { formatNumber } from "../formatNumber";
import { describe, expect, it, vi } from "vitest";

vi.mock("../getDate", () => ({
  getDateByIndex: vi.fn((index) => `Date-${index}`),
}));

vi.mock("../formatNumber", () => ({
  formatNumber: vi.fn((value) => `Formatted-${value}`),
}));

describe("formatHighlightValue Utility", () => {
  it("returns '-' for undefined or null values", () => {
    expect(formatHighlightValue("any_key", undefined)).toBe("-");
    expect(formatHighlightValue("any_key", null)).toBe("-");
  });

  it("formats date for 'big_spent_at' key", () => {
    const result = formatHighlightValue("big_spent_at", 5);
    expect(result).toBe("Date-5");
    expect(getDateByIndex).toHaveBeenCalledWith(5);
  });

  it("formats date for 'less_spent_at' key", () => {
    const result = formatHighlightValue("less_spent_at", 10);
    expect(result).toBe("Date-10");
    expect(getDateByIndex).toHaveBeenCalledWith(10);
  });

  it("formats number for other keys", () => {
    const result = formatHighlightValue("any_key", 12345);
    expect(result).toBe("Formatted-12345");
    expect(formatNumber).toHaveBeenCalledWith(12345);
  });
});
