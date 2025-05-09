"use client";

import { useTaskStore } from "@/store/useTaskStore";
import {
  Button,
  Notification,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { memo, useState } from "react";
import { BiX } from "react-icons/bi";
import style from "./style.module.css";
import { IFormVar } from "./type";

const AddTaskForm = memo(() => {
  const xIcon = <BiX size={20} />;
  const { addTask, loading } = useTaskStore();
  const [notification, setNotification] = useState<
    | {
        title: string;
        description: string;
      }
    | undefined
  >();

  const form = useForm<IFormVar>({
    mode: "controlled",
    name: "add-task-form", 
    validateInputOnBlur: true,
    validateInputOnChange: true,
    initialValues: {
      title: "",
      description: "",
    },
    validate: {
      title: (value) =>
        value.length < 2 ? "Title must be at least 2 characters" : null,
      description: (value) =>
        hasLength(
          { min: value ? 5 : 0 },
          "Description must be at least 5 characters and at most 100 characters"
        )(value),
    },
  });

  const handleReset = () => {
    form.reset();
    form.resetDirty()
    setNotification(undefined);
  };

  const handleSubmit = async (values: IFormVar) => {
    try {
      return await addTask({
        title: values.title,
        description: values.description,
        completed: false,
      }).then(() => {
        handleReset();
      });
    } catch (error: unknown) {
      setNotification({
        title: "Bummer 😞",
        description: (error as Error).message,
      });
    }
  };

  return (
    <>
      {notification && (
        <Notification
          icon={xIcon}
          className={style.notification}
          withBorder
          color="red"
          title={notification.title}
          onClose={handleReset}
        >
          {notification.description}
        </Notification>
      )}
      <form className={style.form} onSubmit={form.onSubmit(handleSubmit)}>
        <Stack w={"100%"} gap={"sm"}>
          <Title order={3} className={style.title}>
            Add Task
          </Title>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Title"
        
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Description"
            placeholder="description"
            {...form.getInputProps("description")}
            classNames={{
              input: style.formDescription,
            }}
          />
        </Stack>

        <Button type="submit" size="md" loading={loading} disabled={form.isDirty() && loading}>
          Add Task
        </Button>
      </form>
    </>
  );
});

AddTaskForm.displayName = "AddTask/Form";
export default AddTaskForm;
