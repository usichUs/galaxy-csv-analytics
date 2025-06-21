import { create } from "zustand";
import type { Highlight } from "../Entities/Highlight";

type UploaderStore = {
  file: File | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  highlights: Highlight[];
  progress: number;
  setFile: (file: File | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setIsSuccess: (success: boolean) => void;
  setHighlights: (highlights: Highlight[]) => void;
  setProgress: (value: number) => void;
  reset: () => void;
};

export const useUploaderStore = create<UploaderStore>((set) => ({
  file: null,
  isLoading: false,
  error: null,
  isSuccess: false,
  highlights: [],
  progress: 0,
  setFile: (file) => set({ file }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setIsSuccess: (isSuccess) => set({ isSuccess }),
  setHighlights: (highlights) => set({ highlights }),
  setProgress: (progress) => set({ progress }),
  reset: () =>
    set({
      file: null,
      isLoading: false,
      error: null,
      isSuccess: false,
      highlights: [],
      progress: 0,
    }),
}));
