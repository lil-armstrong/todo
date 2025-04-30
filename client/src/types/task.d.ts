export namespace Task {
  export interface ITaskItem {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
  }

  export interface ITaskItemAdapter {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }
}
