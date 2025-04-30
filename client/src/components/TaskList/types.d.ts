import { Task } from "@/types/task";
import { PropsWithChildren } from "react";

export interface ITaskListProps extends PropsWithChildren {
  items?: Task.ITaskItemAdapter[];
}
