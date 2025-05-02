import { server } from "@/__mock__/server.mock";
import { BASE_URL } from "@/constant/api.constant";
import type { Task } from "@/types/task";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import {
  createTask,
  deleteTask,
  fromClientToServer,
  fromServerToClient,
  getTasks,
  patchTask,
} from "./task.api";

describe("fromServerToClient", () => {
  it("should convert a server task object to a client task object", () => {
    const serverTask: Task.ITaskItem = {
      id: "1",
      title: "Server Task",
      description: "Task from server",
      completed: true,
      created_at: "2023-01-01T00:00:00.000Z",
      updated_at: "2023-01-02T00:00:00.000Z",
      due_time: "15:00",
      due_date: "2023-01-10",
    };

    const expectedClientTask: Task.ITaskItemAdapter = {
      id: "1",
      title: "Server Task",
      description: "Task from server",
      completed: true,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-02T00:00:00.000Z",
      dueTime: "15:00",
      dueDate: "2023-01-10",
    };

    const clientTask = fromServerToClient(serverTask);
    expect(clientTask).toEqual(expectedClientTask);
  });

  it("should handle missing optional fields gracefully", () => {
    const serverTask: Task.ITaskItem = {
      id: "2",
      title: "Incomplete Task",
      description: "",
      completed: false,
      created_at: "2023-01-03T00:00:00.000Z",
      updated_at: "2023-01-04T00:00:00.000Z",
      due_time: null,
      due_date: null,
    };

    const expectedClientTask: Task.ITaskItemAdapter = {
      id: "2",
      title: "Incomplete Task",
      description: "",
      completed: false,
      createdAt: "2023-01-03T00:00:00.000Z",
      updatedAt: "2023-01-04T00:00:00.000Z",
      dueTime: undefined,
      dueDate: undefined,
    };

    const clientTask = fromServerToClient(serverTask);
    expect(clientTask).toEqual(expectedClientTask);
  });
});

describe("fromClientToServer", () => {
  it("should convert a client task object to a server task object", () => {
    const clientTask: PartialExcept<Task.ITaskItemAdapter, "title"> & {
      id?: string;
    } = {
      title: "Client Task",
      description: "Task from client",
      completed: true,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-02T00:00:00.000Z",
      dueTime: "15:00",
      dueDate: "2023-01-10",
    };

    const expectedServerTask: Omit<
      PartialExcept<Task.ITaskItem, "title">,
      "id"
    > = {
      title: "Client Task",
      description: "Task from client",
      completed: true,
      created_at: "2023-01-01T00:00:00.000Z",
      updated_at: "2023-01-02T00:00:00.000Z",
      due_time: "15:00",
      due_date: "2023-01-10",
    };

    const serverTask = fromClientToServer(clientTask);
    expect(serverTask).toEqual(expectedServerTask);
  });

  it("should handle missing optional fields gracefully", () => {
    const clientTask: PartialExcept<Task.ITaskItemAdapter, "title"> & {
      id?: string;
    } = {
      title: "Incomplete Client Task",
    };

    const expectedServerTask: Omit<
      PartialExcept<Task.ITaskItem, "title">,
      "id"
    > = {
      title: "Incomplete Client Task",
      description: "",
      completed: false,
      created_at: undefined,
      updated_at: undefined,
      due_time: undefined,
      due_date: undefined,
    };

    const serverTask = fromClientToServer(clientTask);
    expect(serverTask).toEqual(expectedServerTask);
  });

  it("should preserve provided optional fields", () => {
    const clientTask: PartialExcept<Task.ITaskItemAdapter, "title"> & {
      id?: string;
    } = {
      title: "Partially Complete Task",
      completed: false,
      description: "Partial description",
      createdAt: "2023-01-01T00:00:00.000Z",
    };

    const expectedServerTask: Omit<
      PartialExcept<Task.ITaskItem, "title">,
      "id"
    > = {
      title: "Partially Complete Task",
      completed: false,
      description: "Partial description",
      created_at: "2023-01-01T00:00:00.000Z",
      updated_at: undefined,
      due_time: undefined,
      due_date: undefined,
    };

    const serverTask = fromClientToServer(clientTask);
    expect(serverTask).toEqual(expectedServerTask);
  });
});

describe("getTasks", () => {
  it("should fetch tasks and convert them to client format", async () => {
    const mockServerTasks: Task.ITaskItem[] = [
      {
        id: "1",
        title: "Test Task 1",
        description: "Description 1",
        completed: false,
        created_at: "2023-01-01T00:00:00.000Z",
        updated_at: "2023-01-02T00:00:00.000Z",
        due_time: "12:00",
        due_date: "2023-01-10",
      },
      {
        id: "2",
        title: "Test Task 2",
        description: "Description 2",
        completed: true,
        created_at: "2023-01-03T00:00:00.000Z",
        updated_at: "2023-01-04T00:00:00.000Z",
        due_time: "14:00",
        due_date: "2023-01-15",
      },
    ];

    const mockClientTasks: Task.ITaskItemAdapter[] = [
      {
        id: "1",
        title: "Test Task 1",
        description: "Description 1",
        completed: false,
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-02T00:00:00.000Z",
        dueTime: "12:00",
        dueDate: "2023-01-10",
      },
      {
        id: "2",
        title: "Test Task 2",
        description: "Description 2",
        completed: true,
        createdAt: "2023-01-03T00:00:00.000Z",
        updatedAt: "2023-01-04T00:00:00.000Z",
        dueTime: "14:00",
        dueDate: "2023-01-15",
      },
    ];
    server.use(
      http.get(`${BASE_URL}/tasks`, () => {
        return HttpResponse.json(mockServerTasks);
      })
    );

    const tasks = await getTasks();
    expect(tasks).toEqual(mockClientTasks);
  });

  it("should throw an error if the API call fails", async () => {
    server.use(http.get(`${BASE_URL}/tasks`, () => HttpResponse.error()));

    await expect(getTasks()).rejects.toThrow("Network Error");
  });
});

describe("createTask", () => {
  const newTask: Omit<Task.ITaskItemAdapter, "id"> = {
    title: "New Task",
    description: "New Task Description",
    completed: false,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    dueTime: "12:00",
    dueDate: "2023-01-10",
  };

  it("should create a task and return it in client format", async () => {
    const mockServerTask: Task.ITaskItem = {
      id: "1",
      title: "New Task",
      description: "New Task Description",
      completed: false,
      created_at: "2023-01-01T00:00:00.000Z",
      updated_at: "2023-01-01T00:00:00.000Z",
      due_time: "12:00",
      due_date: "2023-01-10",
    };

    const mockClientTask: Task.ITaskItemAdapter = {
      id: "1",
      title: "New Task",
      description: "New Task Description",
      completed: false,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
      dueTime: "12:00",
      dueDate: "2023-01-10",
    };

    server.use(
      http.post(`${BASE_URL}/tasks`, () =>
        HttpResponse.json(mockServerTask, { status: 201 })
      )
    );

    const createdTask = await createTask(newTask);
    expect(createdTask).toEqual(mockClientTask);
  });

  it("should throw an error if the API call fails", async () => {
    server.use(http.post(`${BASE_URL}/tasks`, () => HttpResponse.error()));

    await expect(createTask(newTask)).rejects.toThrow("Network Error");
  });
});

describe("patchTask", () => {
  const updatedTask: Task.ITaskItemAdapter = {
    id: "1",
    title: "Updated Task",
    description: "Updated Task Description",
    completed: true,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-02T00:00:00.000Z",
    dueTime: "12:00",
    dueDate: "2023-01-10",
  };

  it("should update a task and return it in client format", async () => {
    server.use(
      http.put(`${BASE_URL}/tasks/${updatedTask.id}`, () =>
        HttpResponse.json({}, { status: 200 })
      )
    );

    const result = await patchTask(updatedTask);
    expect(result).toEqual(updatedTask);
  });

  it("should throw an error if the API call fails", async () => {
    server.use(
      http.put(`${BASE_URL}/tasks/${updatedTask.id}`, () =>
        HttpResponse.error()
      )
    );

    await expect(patchTask(updatedTask)).rejects.toThrow("Network Error");
  });
});

describe("deleteTask", () => {
  const taskId = "1";

  it("should delete a task successfully", async () => {
    server.use(
      http.delete(`${BASE_URL}/tasks/${taskId}`, () =>
        HttpResponse.json({}, { status: 200 })
      )
    );

    await expect(deleteTask(taskId)).resolves.eq(taskId);
  });

  it("should throw an error if the API call fails", async () => {
    server.use(
      http.delete(`${BASE_URL}/tasks/${taskId}`, () => HttpResponse.error())
    );

    await expect(deleteTask(taskId)).rejects.toThrow("Network Error");
  });
});
