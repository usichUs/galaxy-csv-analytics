import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { SubmitButton } from "../ui";
import { describe, expect, it } from "vitest";

describe("SubmitButton Component", () => {
  it("renders with correct text", () => {
    render(<SubmitButton text="Отправить" isActive={true} />);
    const button = screen.getByRole("button", { name: /отправить/i });
    expect(button).toBeInTheDocument();
  });

  it("is active when isActive is true", () => {
    const { container } = render(
      <SubmitButton text="Отправить" isActive={true} />
    );
    const button = within(container).getByRole("button", {
      name: /отправить/i,
    });
    expect(button).not.toBeDisabled();
    expect(button.className).toContain("_active_");
  });

  it("is disabled when isActive is false", () => {
    const { container } = render(
      <SubmitButton text="Отправить" isActive={false} />
    );
    const button = within(container).getByRole("button", {
      name: /отправить/i,
    });
    expect(button).toBeDisabled();
    expect(button.className).not.toContain("_active_");
  });
});
