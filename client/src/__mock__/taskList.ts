import type { Task } from "@/types/task";

export const taskList = (count: number): Task.ITaskItemAdapter[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index.toString(),
    title: `Task ${index + 1}`,
    description: `Description for Task ${index + 1}`,
    completed: index % 2 === 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
