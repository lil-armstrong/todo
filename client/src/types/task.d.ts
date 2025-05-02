export namespace Task {
  export interface ITaskItem {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    created_at?: string | null;
    updated_at?: string | null;
    due_time?: string | null;
    due_date?: string | null;
  }

  export interface ITaskItemAdapter {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt?: string;
    updatedAt?: string;
    dueTime?: string;
    dueDate?: string;
  }
}
