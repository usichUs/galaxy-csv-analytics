import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCSVGeneratorStore } from "../../../stores/useCSVGeneratorStore";

vi.mock("../../../stores/useCSVGeneratorStore", () => ({
  useCSVGeneratorStore: vi.fn(),
}));

import { CSVGenerator } from "../ui";

describe("CSVGenerator Component", () => {
  let mockSetIsLoading: vi.Mock;
  let mockSetIsStarted: vi.Mock;
  let mockSetError: vi.Mock;
  let mockSetIsSuccess: vi.Mock;
  let mockReset: vi.Mock;

  beforeEach(() => {
    mockSetIsLoading = vi.fn();
    mockSetIsStarted = vi.fn();
    mockSetError = vi.fn();
    mockSetIsSuccess = vi.fn();
    mockReset = vi.fn();

    (useCSVGeneratorStore as vi.Mock).mockReturnValue({
      isLoading: false,
      setIsLoading: mockSetIsLoading,
      error: null,
      setError: mockSetError,
      isStarted: false,
      setIsStarted: mockSetIsStarted,
      isSuccess: false,
      setIsSuccess: mockSetIsSuccess,
      reset: mockReset,
    });
  });

  it("renders initial state correctly", () => {
    render(<CSVGenerator />);
    expect(
      screen.getByText("Сгенерируйте готовый csv-файл нажатием одной кнопки")
    ).toBeInTheDocument();
    expect(screen.getByText("Начать генерацию")).toBeInTheDocument();
  });

  it("starts generation process on button click", () => {
    render(<CSVGenerator />);
    const button = screen.getByText("Начать генерацию");
    fireEvent.click(button);

    expect(mockSetIsStarted).toHaveBeenCalledWith(true);
    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
  });

  it("displays success message after successful generation", () => {
    (useCSVGeneratorStore as vi.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      isStarted: true,
      isSuccess: true,
      reset: mockReset,
      setIsLoading: mockSetIsLoading,
      setIsStarted: mockSetIsStarted,
      setError: mockSetError,
      setIsSuccess: mockSetIsSuccess,
    });

    render(<CSVGenerator />);
    expect(screen.getByText("Done!")).toBeInTheDocument();
    expect(screen.getByText("файл сгенерирован")).toBeInTheDocument();
  });

  it("displays error message if generation fails", () => {
    (useCSVGeneratorStore as vi.Mock).mockReturnValue({
      isLoading: false,
      error: "Ошибка генерации",
      isStarted: true,
      isSuccess: false,
      reset: mockReset,
      setIsLoading: mockSetIsLoading,
      setIsStarted: mockSetIsStarted,
      setError: mockSetError,
      setIsSuccess: mockSetIsSuccess,
    });

    render(<CSVGenerator />);
    expect(screen.getByText("Ошибка")).toBeInTheDocument();
    expect(screen.getByText("упс, не то...")).toBeInTheDocument();
  });

  it("displays loading state during generation", () => {
    (useCSVGeneratorStore as vi.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      isStarted: true,
      isSuccess: false,
      reset: mockReset,
      setIsLoading: mockSetIsLoading,
      setIsStarted: mockSetIsStarted,
      setError: mockSetError,
      setIsSuccess: mockSetIsSuccess,
    });

    render(<CSVGenerator />);
    expect(screen.getByText("идет процесс генерации")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("resets state on cancel button click", () => {
    (useCSVGeneratorStore as vi.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      isStarted: true,
      isSuccess: true,
      reset: mockReset,
      setIsLoading: mockSetIsLoading,
      setIsStarted: mockSetIsStarted,
      setError: mockSetError,
      setIsSuccess: mockSetIsSuccess,
    });

    render(<CSVGenerator />);
    const cancelButton = screen.getByTestId("cancel-button");
    fireEvent.click(cancelButton);
    expect(mockReset).toHaveBeenCalled();
  });
});
