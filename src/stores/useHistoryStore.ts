import { create } from "zustand";
import type { AnalyticsHistoryItem } from "../Entities/AnalyticsHistoryItem";

type HistoryStore = {
  history: AnalyticsHistoryItem[];
  addToHistory: (item: AnalyticsHistoryItem) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
};

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  history: JSON.parse(localStorage.getItem("analyticsHistory") || "[]"),
  addToHistory: (item) => {
    const newHistory = [...get().history, item];
    set({ history: newHistory });
    localStorage.setItem("analyticsHistory", JSON.stringify(newHistory));
  },
  clearHistory: () => {
    set({ history: [] });
    localStorage.removeItem("analyticsHistory");
  },
  removeFromHistory: (id) => {
    const newHistory = get().history.filter((i) => i.id !== Number(id));
    set({ history: newHistory });
    localStorage.setItem("analyticsHistory", JSON.stringify(newHistory));
  },
}));
