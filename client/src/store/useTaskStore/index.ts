"use client";

import { create } from "zustand";
import { ITaskState } from "./type";
import { createTask, getTasks } from "@/api/task.api";

export const useTaskStore = create<ITaskState>()((set) => ({
  tasks: [],
  loading: false,
  error: null,
  setTasks: (tasks) => set({ tasks }),
  fetchTasks: async () => {
    set({ loading: true });
    try {
      const tasks = await getTasks();
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  addTask: async (task) => {
    set({ loading: true });

    return createTask(task)
      .then((newTask) => {
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  updateTask: async (task) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    }));
    // Update the task in the backend
  },
  deleteTask: async (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
  toggleTaskCompletion: async (taskId) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  },
}));
