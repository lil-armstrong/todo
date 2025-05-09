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
export function fromClientToServer(
  task: PartialExcept<Task.ITaskItemAdapter, "title"> & { id?: string }
): Omit<PartialExcept<Task.ITaskItem, "title">, "id"> {
  return {
    completed: task.completed || false,
    description: task.description || "",
    title: task.title,
    created_at: task.createdAt,
    updated_at: task.updatedAt,
    due_time: task.dueTime,
    due_date: task.dueDate,
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
export function fromServerToClient(
  task: Task.ITaskItem
): Task.ITaskItemAdapter {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    createdAt: task.created_at || undefined,
    updatedAt: task.updated_at || undefined,
    dueTime: task.due_time || undefined,
    dueDate: task.due_date || undefined,
  };
}

export async function getTasks() {
  return await axiosInstance
    .get<Task.ITaskItem[]>("/tasks")
    .then(({ data }) => data.map((task) => fromServerToClient(task)));
}

export async function createTask(
  task: PartialExcept<Omit<Task.ITaskItemAdapter, "id">, "title">
) {
  return axiosInstance
    .post<Task.ITaskItem>(`/tasks`, fromClientToServer(task))
    .then(({ data }) => fromServerToClient(data));
}

export async function patchTask(task: Task.ITaskItemAdapter) {
  return await axiosInstance
    .put<Task.ITaskItem>(`/tasks/${task.id}`, fromClientToServer(task))
    .then(() => task);
}

export async function deleteTask(taskId: string) {
  return await axiosInstance.delete(`/tasks/${taskId}`).then(() => taskId);
}
