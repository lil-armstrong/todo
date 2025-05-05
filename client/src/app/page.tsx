import TaskList from "@/components/TaskList";
import style from "./page.module.css";

export default function Home() {
  return (
    <div data-testid="home-container" className={style.container}>
      <TaskList />
    </div>
  );
}
