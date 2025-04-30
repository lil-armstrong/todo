import Page from "@/app/page";
import { act, render, screen } from "@/lib/test";
import { expect, it, describe } from "vitest";

describe("Page", () => {
  it("renders without crashing", async () => {
    await act(() =>       render(<Page />));
    expect(screen.getByTestId("home-container")).exist
  });

  // it("displays the correct title", async () => {
  //   await act(() => render(<Page />));
  //   expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
  // });

  // it("displays the correct subtitle", async () => {
  //   await act(() => render(<Page />));
  //   expect(screen.getByText(/Manage your tasks efficiently/i)).toBeInTheDocument();
  // });
});
