import { BASE_URL } from "@/constant/api.constant";
import { Task } from "@/types/task";
import { http, HttpResponse } from "msw";

const allTasks = new Map();

const mockTaskList: Task.ITaskItemAdapter[] = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
    description: "",
    createdAt: "",
    updatedAt: "",
  },
];

export const handlers = [
  http.get(`${BASE_URL}/tasks`, () => {
    return HttpResponse.json(mockTaskList, { status: 200 });
  }),

  http.post(`${BASE_URL}/tasks`, ({ request }) => {
    const task = request.json();
    const newTask = {
      ...task,
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    allTasks.set(newTask.id, newTask);

    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.delete(`${BASE_URL}/tasks/:id`, ({ params }) => {
    const { id } = params;

    // Let's attempt to grab the post by its ID.
    const deletedTask = allTasks.get(id);

    // Respond with a "404 Not Found" response if the given
    // task ID does not exist.
    if (!deletedTask) {
      return new HttpResponse(null, { status: 404 });
    }

    // Delete the task from the "allTasks" map.
    allTasks.delete(id);

    // Respond with a "200 OK" response and the deleted task.
    return HttpResponse.json(deletedTask);
  }),
];
