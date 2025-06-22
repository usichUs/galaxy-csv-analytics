import { formatNumber } from "./formatNumber";
import { getDateByIndex } from "./getDate";

export function formatHighlightValue(key: string, value: unknown) {
  if (value === undefined || value === null) return "-";
  if (key === "big_spent_at" || key === "less_spent_at") {
    return getDateByIndex(Number(value));
  }
  return formatNumber(value);
}
