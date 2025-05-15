from pydantic import ValidationError
from sqlalchemy.orm import Session
from sqlalchemy import select

from schemas.task import TaskCreate, TaskUpdate
from models.task import Task


class TaskController:
    def __init__(self):
        pass

    def create(self, task: TaskCreate, db: Session):
        """
        Create a new task in the database.
        """
        try:
            model = Task(**task.model_dump())
            db.add(model)
            db.commit()
            db.refresh(model)

            return model

        except ValidationError as e:
            print(e)

    def read(self, db: Session):
        """
        Read all tasks from the database.
        """
        try:
            result = db.execute(select(Task)).scalars()

            return result
        except Exception as e:
            print(e)

    def update(self, task_id: int, task: TaskUpdate, db: Session):
        """
        Update a task in the database.
        Args:
            task_id (int): The ID of the task to update.
            task (Task): The updated task data.
        """
        try:
            model = task.model_dump()
            row = db.get(Task, task_id)
            if row:
                for key, value in model.items():
                    setattr(row, key, value)
                db.commit()
                db.refresh(row)

                return row
        except Exception as e:
            print(e)

    def delete(self, task_id: int, db: Session):
        """
        Delete a task from the database.
        Args:
            task_id (int): The ID of the task to delete.
        """
        try:
            row = db.get(Task, task_id)

            if row:
                db.delete(row)
                db.commit()
        except Exception as e:
            raise e
