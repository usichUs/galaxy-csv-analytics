import { create } from "zustand";

type CSVGeneratorStore = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isStarted: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setIsStarted: (isStarted: boolean) => void;
  reset: () => void;
};

export const useCSVGeneratorStore = create<CSVGeneratorStore>((set) => ({
  isLoading: false,
  error: null,
  isSuccess: false,
  isStarted: false,
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
  setError: (error) => set({ error }),
  setIsSuccess: (isSuccess) => set({ isSuccess }),
  setIsStarted: (isStarted) => set({ isStarted }),
  reset: () =>
    set({
      isLoading: false,
      error: null,
      isSuccess: false,
      isStarted: false,
    }),
}));
