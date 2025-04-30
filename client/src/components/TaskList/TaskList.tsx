"use client";
import { useTaskStore } from "@/store/useTaskStore";
import { useEffect } from "react";
import EmptyList from "../EmptyList";
import TaskListItem from "../TaskListItem";
import style from "./style.module.css";

const TaskList = () => {
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return tasks && tasks.length > 0 ? (
    <div data-testid="task-list" className={style.listWrapper}>
      {tasks.map((task) => (
        <TaskListItem key={task.id} item={task} />
      ))}
    </div>
  ) : (
    <EmptyList />
  );
};

export default TaskList;
