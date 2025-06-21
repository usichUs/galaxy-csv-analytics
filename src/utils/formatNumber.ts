export function formatNumber(value: unknown): string {
  if (typeof value === "number") {
    return Math.round(value).toString();
  }
  return String(value);
}
