import type { Task } from "@/types/task";

export interface ITaskState {
  tasks: Task.ITaskItemAdapter[];
  loading: boolean;
  error: string | null;
  setTasks: (tasks: Task.ITaskItemAdapter[]) => void;
  fetchTasks: () => Promise<void>;
  addTask: (
    task: PartialExcept<Omit<Task.ITaskItemAdapter, "id">, "title">
  ) => Promise<void>;
  updateTask: (task: Task.ITaskItemAdapter) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTaskCompletion: (taskId: string) => Promise<void>;
}
