"use client";

import { ActionIcon } from "@mantine/core";
import { BiMinus, BiPlus } from "react-icons/bi";
import AddTaskForm from "./AddTaskForm";
import style from "./style.module.css";
import { useMemo, useState } from "react";
import clsx from "clsx";

const AddTask = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleToggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  const icon = useMemo(
    () =>
      !isFormVisible ? (
        <BiPlus size={24} color="white" width="100%" height="100%" />
      ) : (
        <BiMinus size={24} color="white" width="100%" height="100%" />
      ),
    [isFormVisible]
  );

  return (
    <div className={style.container}>
      <div
        className={clsx(style.formContainer, { [style.show]: isFormVisible })}
      >
        <AddTaskForm />
      </div>

      <ActionIcon
        onClick={handleToggleForm}
        className={style.toggleButton}
        size={50}
      >
        {icon}
      </ActionIcon>
    </div>
  );
};

export default AddTask;
