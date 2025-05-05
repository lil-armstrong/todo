"use client";

import { Button, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { memo, useCallback } from "react";
import style from "./style.module.css";

const AddTaskForm = memo(() => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: {
      title: (value) =>
        value.length < 2 ? "Title must be at least 2 characters" : null,
      description: (value) =>
        value.length && value.length < 5
          ? "Description must be at least 5 characters"
          : null,
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        form.validate();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    [form]
  );

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Stack gap={"sm"}>
        <Title order={3} className={style.title}>
          Add Task
        </Title>
        <TextInput withAsterisk label="Title" placeholder="Title" {...form.getInputProps('title')} />
        <Textarea
          label="Description"
          placeholder="description"
          {...form.getInputProps('description')}
          classNames={{
            input: style.formDescription,
          }}
        />
      </Stack>

      <Button type="submit" size="md">
        Add Task
      </Button>
    </form>
  );
});

AddTaskForm.displayName = "AddTask/Form";
export default AddTaskForm;
