import { describe, expect, it } from "vitest";
import { getDateByIndex } from "../getDate";

describe("getDateByIndex Utility", () => {
  it("returns correct date for valid day index", () => {
    expect(getDateByIndex(1)).toBe("1 января");
    expect(getDateByIndex(31)).toBe("31 января");
    expect(getDateByIndex(32)).toBe("1 февраля");
  });

  it("handles edge cases for day index", () => {
    expect(getDateByIndex(0)).toBe("31 декабря");
    expect(getDateByIndex(365)).toBe("31 декабря");
  });

  it("handles invalid day index gracefully", () => {
    expect(getDateByIndex(-1)).toBe("30 декабря");
    expect(getDateByIndex(400)).toBe("4 февраля");
  });
});
