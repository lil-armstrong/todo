from schemas.task import TaskSchema

class TaskController:
    def __init__(self):
        self.tasks = []

    def create_task(self, task: TaskSchema):
        """
        Create a new task in the database.
        """
        self.tasks.append(task)
        return task

    def read_tasks(self):
        """
        Read all tasks from the database.
        """
        return self.tasks

    def update_task(self, task_id: int, task: TaskSchema):
        """
        Update a task in the database.
        Args:
            task_id (int): The ID of the task to update.
            task (TaskSchema): The updated task data.
        """
        if 0 <= task_id < len(self.tasks):
            self.tasks[task_id] = task
            return task
        else:
            raise IndexError("Task ID out of range")

    def delete_task(self, task_id: int):
        """
        Delete a task from the database.
        Args:
            task_id (int): The ID of the task to delete.
        """
        if 0 <= task_id < len(self.tasks):
            del self.tasks[task_id]
            return True
        else:
            raise IndexError("Task ID out of range")