import { describe, expect, it } from "vitest";
import { formatNumber } from "../formatNumber";

describe("formatNumber Utility", () => {
  it("formats a number by rounding it and converting to string", () => {
    expect(formatNumber(123.456)).toBe("123");
    expect(formatNumber(789.999)).toBe("790");
  });

  it("returns string representation for non-number values", () => {
    expect(formatNumber("test")).toBe("test");
    expect(formatNumber(true)).toBe("true");
    expect(formatNumber(null)).toBe("null");
    expect(formatNumber(undefined)).toBe("undefined");
  });

  it("handles edge cases for numbers", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(-123.456)).toBe("-123");
    expect(formatNumber(Number.MAX_VALUE)).toBe(
      Math.round(Number.MAX_VALUE).toString()
    );
  });
});
