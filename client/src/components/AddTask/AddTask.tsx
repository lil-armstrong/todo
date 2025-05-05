import { ActionIcon } from "@mantine/core";
import { BiPlus } from "react-icons/bi";
import AddTaskForm from "./AddTaskForm";
import style from "./style.module.css";

const AddTask = () => {
  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <AddTaskForm />
      </div>

      <ActionIcon className={style.toggleButton} size={50}>
        <BiPlus size={24} color="white" width="100%" height="100%" />
      </ActionIcon>
    </div>
  );
};

export default AddTask;
