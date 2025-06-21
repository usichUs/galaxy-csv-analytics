import type { Highlight } from "./Highlight";

export type AnalyticsHistoryItem = {
  id: number;
  date: string;
  highlights: Highlight | null;
  fileName: string;
  status: "success" | "error";
};
