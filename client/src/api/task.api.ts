import { axiosInstance } from "@/lib/api.lib";
import type { Task } from "@/types/task";

/**
 * Converts a task object from the client-side format to the server-side format.
 *
 * @param task - The task object in the client-side format, adhering to the `Task.ITaskItemAdapter` interface.
 * @returns A new task object in the server-side format, adhering to the `Task.ITaskItem` interface.
 *
 * @remarks
 * This function adds `created_at` and `updated_at` timestamps to the task object,
 * using the current date and time in ISO 8601 format.
 */
function fromClientToServer(task: Task.ITaskItemAdapter): Task.ITaskItem {
  return {
    ...task,
    created_at: task.createdAt,
    updated_at: task.updatedAt,
  };
}

/**
 * Converts a task object from the server format to the client format.
 *
 * @param task - The task object received from the server, adhering to the `Task.ITaskItem` interface.
 * @returns A new task object adapted to the client format, adhering to the `Task.ITaskItemAdapter` interface.
 *          The `created_at` and `updated_at` fields from the server are converted to ISO string dates
 *          and assigned to `createdAt` and `updatedAt` respectively.
 */
function fromServerToClient(task: Task.ITaskItem): Task.ITaskItemAdapter {
  return {
    ...task,
    createdAt: task.created_at,
    updatedAt: task.updated_at,
  };
}

export const getTasks = async () =>
  await axiosInstance
    .get<Task.ITaskItem[]>("/tasks")
    .then((response) => response.data.map((task) => fromServerToClient(task)));

export const patchTask = async (task: Task.ITaskItemAdapter) =>
  await axiosInstance
    .patch<Task.ITaskItem>(`/tasks/${task.id}`, fromClientToServer(task))
    .then(() => task);
