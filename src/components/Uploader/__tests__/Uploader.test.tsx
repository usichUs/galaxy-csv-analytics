import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Uploader } from "../ui";
import { useUploaderStore } from "../../../stores/useUploaderStore";

vi.mock("../../../stores/useUploaderStore", () => ({
  useUploaderStore: vi.fn(),
}));

describe("Uploader Component", () => {
  let mockSetFile: vi.Mock;
  let mockSetIsLoading: vi.Mock;
  let mockSetError: vi.Mock;
  let mockSetIsSuccess: vi.Mock;
  let mockSetHighlights: vi.Mock;
  let mockSetProgress: vi.Mock;
  let mockReset: vi.Mock;

  beforeEach(() => {
    mockSetFile = vi.fn();
    mockSetIsLoading = vi.fn();
    mockSetError = vi.fn();
    mockSetIsSuccess = vi.fn();
    mockSetHighlights = vi.fn();
    mockSetProgress = vi.fn();
    mockReset = vi.fn();

    (useUploaderStore as vi.Mock).mockReturnValue({
      file: null,
      isLoading: false,
      error: null,
      isSuccess: false,
      progress: 0,
      setFile: mockSetFile,
      setIsLoading: mockSetIsLoading,
      setError: mockSetError,
      setIsSuccess: mockSetIsSuccess,
      setHighlights: mockSetHighlights,
      setProgress: mockSetProgress,
      reset: mockReset,
    });
  });

  it("renders initial state correctly", () => {
    const { container } = render(<Uploader />);
    expect(container.textContent).toContain(
      "Загрузите csv файл и получите полную информацию о нём за сверхнизкое время"
    );
    expect(screen.getByText("Загрузить файл")).toBeInTheDocument();
  });

  it("handles file upload correctly", () => {
    render(<Uploader />);
    const fileInput = screen.getByLabelText("Загрузить файл");
    const file = new File(["test content"], "test.csv", { type: "text/csv" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockSetFile).toHaveBeenCalledWith(file);
    expect(mockSetError).toHaveBeenCalledWith("");
    expect(mockSetIsSuccess).toHaveBeenCalledWith(false);
  });

  it("displays progress during file aggregation", () => {
    (useUploaderStore as vi.Mock).mockReturnValue({
      file: { name: "test.csv" },
      isLoading: true,
      progress: 75,
      error: null,
      isSuccess: false,
      setFile: mockSetFile,
      setIsLoading: mockSetIsLoading,
      setError: mockSetError,
      setIsSuccess: mockSetIsSuccess,
      setHighlights: mockSetHighlights,
      setProgress: mockSetProgress,
      reset: mockReset,
    });

    render(<Uploader />);

    const loader = screen.getByRole("img", { hidden: true });
    expect(loader).toBeInTheDocument();

    const circle = loader.querySelector("circle:nth-child(2)");
    expect(circle).toHaveAttribute("stroke-dashoffset", "28.27433388230814");
  });

  it("displays error message for invalid file format", () => {
    render(<Uploader />);
    const fileInput = screen.getByLabelText("Загрузить файл");
    const file = new File(["test content"], "test.txt", { type: "text/plain" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockSetError).toHaveBeenCalledWith("Недопустимый формат файла");
  });

  it("resets state on cancel button click", () => {
    (useUploaderStore as vi.Mock).mockReturnValue({
      file: { name: "test.csv" },
      isLoading: false,
      error: null,
      isSuccess: false,
      progress: 0,
      reset: mockReset,
      setFile: mockSetFile,
      setIsLoading: mockSetIsLoading,
      setError: mockSetError,
      setIsSuccess: mockSetIsSuccess,
      setHighlights: mockSetHighlights,
      setProgress: mockSetProgress,
    });

    render(<Uploader />);
    const cancelButton = screen.getByTestId("cancel-button");
    fireEvent.click(cancelButton);
    expect(mockReset).toHaveBeenCalled();
  });
});
