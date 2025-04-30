import { server } from "@/__mock__/server.mock";
import { act, render, screen } from "@/lib/test";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import TaskList from "./TaskList";
import { BASE_URL } from "@/constant/api.constant";

describe("TaskList Component", () => {
  describe("Empty list", () => {
    beforeEach(async () => {
      server.use(
        http.get(
          `${BASE_URL}/tasks`,
          () => {
            return HttpResponse.json([], { status: 200 });
          },
          { once: true }
        )
      );

      await act(() => render(<TaskList />));
    });

    it("renders empty-list with data test id", async () => {
      expect(screen.getByTestId("empty-list")).exist;
    });

    it("displays a message when there are no tasks", async () => {
      expect(screen.getByText(/No task yet/i)).exist;
    });
  });

  describe("With tasks", () => {
    beforeEach(async () => {
      await act(() => render(<TaskList />));
    });

    it("renders a list of tasks", async () => {
      expect(screen.getByText("Task 1")).exist;
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });

    it("renders completed tasks with a specific style", async () => {
      const completedTask = screen.getByTestId("task-2");
      expect(completedTask).exist;
      expect(completedTask).toHaveAttribute("aria-checked", "true");
    });

    it("renders incomplete tasks without the completed style", async () => {
      const incompleteTask = screen.getByTestId("task-1");
      expect(incompleteTask).exist;
      expect(incompleteTask).toHaveAttribute("aria-checked", "false");
    });
  });
});
