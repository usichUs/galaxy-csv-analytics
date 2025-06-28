import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../ui";
import { describe, expect, it } from "vitest";

describe("Header Component", () => {
  it("renders navigation menu items correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const menuItems = [
      "Межгалактическая аналитика",
      "CSV Генератор",
      "История",
    ];

    menuItems.forEach((item) => {
      expect(screen.getByText(item, { selector: "p" })).toBeInTheDocument();
    });
  });

  it("highlights active menu item based on current route", () => {
    render(
      <MemoryRouter initialEntries={["/generate-csv"]}>
        <Header />
      </MemoryRouter>
    );

    const activeLink = screen.getByText("CSV Генератор").closest("a");
    expect(activeLink).toHaveClass("_active_bba948");

    const inactiveLinks = [
      screen
        .getByText("Межгалактическая аналитика", { selector: "p" })
        .closest("a"),
      screen.getByText("История").closest("a"),
    ];
    inactiveLinks.forEach((link) => {
      expect(link).not.toHaveClass("_active_bba948");
    });
  });

  it("navigates to the correct route when menu item is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const historyLink = screen.getByText("История");
    expect(historyLink.closest("a")).toHaveAttribute("href", "/history");

    const generatorLink = screen.getByText("CSV Генератор");
    expect(generatorLink.closest("a")).toHaveAttribute("href", "/generate-csv");

    const analyticsLink = screen.getByText("Межгалактическая аналитика", {
      selector: "p",
    });
    expect(analyticsLink.closest("a")).toHaveAttribute("href", "/");
  });
});
