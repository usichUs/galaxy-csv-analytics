import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { HistoryList } from "../ui";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useHistoryStore } from "../../../stores/useHistoryStore";

vi.mock("../../../stores/useHistoryStore", () => ({
  useHistoryStore: vi.fn(),
}));

vi.mock("../../../utils/formatDate", () => ({
  formatDate: vi.fn((date) => `Formatted-${date}`),
}));

describe("HistoryList Component", () => {
  const mockClearHistory = vi.fn();
  const mockRemoveFromHistory = vi.fn();

  beforeEach(() => {
    (useHistoryStore as vi.Mock).mockReturnValue({
      history: [
        {
          id: "1",
          fileName: "test1.csv",
          date: "2025-06-28T00:00:00.000Z",
          status: "success",
          highlights: ["Highlight 1", "Highlight 2"],
        },
        {
          id: "2",
          fileName: "test2.csv",
          date: "2025-06-29T00:00:00.000Z",
          status: "error",
          highlights: null,
        },
      ],
      clearHistory: mockClearHistory,
      removeFromHistory: mockRemoveFromHistory,
    });
  });

  it("renders history items correctly", () => {
    render(
      <MemoryRouter>
        <HistoryList />
      </MemoryRouter>
    );
    const historyItems = screen.getAllByText(/test\d\.csv/i);
    expect(historyItems).toHaveLength(2);
    expect(
      screen.getByText("Formatted-2025-06-28T00:00:00.000Z")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Formatted-2025-06-29T00:00:00.000Z")
    ).toBeInTheDocument();
  });

  it("opens modal on successful item click", () => {
    render(
      <MemoryRouter>
        <HistoryList />
      </MemoryRouter>
    );
    const successItem = screen.getByText("test1.csv");
    fireEvent.click(successItem);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    const highlights = screen.getAllByText("-", {
      selector: "p._highlight_value_d9d02b",
    });
    expect(highlights).toHaveLength(8);
  });

  it("does not open modal on error item click", () => {
    render(
      <MemoryRouter>
        <HistoryList />
      </MemoryRouter>
    );
    const errorItem = screen.getByText("test2.csv");
    fireEvent.click(errorItem);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("removes item from history on delete click", () => {
    render(
      <MemoryRouter>
        <HistoryList />
      </MemoryRouter>
    );
    const deleteIcon = screen.getAllByTestId("delete-icon")[0];
    fireEvent.click(deleteIcon);
    expect(mockRemoveFromHistory).toHaveBeenCalledWith("1");
  });

  it("clears all history on clear button click", () => {
    render(
      <MemoryRouter>
        <HistoryList />
      </MemoryRouter>
    );
    const clearButton = screen.getByText(/очистить все/i);
    fireEvent.click(clearButton);
    expect(mockClearHistory).toHaveBeenCalled();
  });
});
