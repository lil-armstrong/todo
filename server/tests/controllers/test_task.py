import unittest
from unittest.mock import MagicMock

from controllers.task import TaskController
from models.task import Task
from schemas.task import TaskCreate, TaskUpdate
from ..conftest import TestBase


class TestTaskController(TestBase):
    controller = TaskController()

    def test_create_task(self):
        with self.mock_session as db:
            assert db is not None
            data = TaskCreate(title="Test", description="Task")
            MagicMock(spec=Task)

            # # db.refresh returns the same model it receives
            db.refresh.side_effect = lambda model: model

            result = self.controller.create(data, db)

            db.add.assert_called_once()
            db.commit.assert_called_once()
            db.refresh.assert_called_once()

            self.assertIsInstance(result, Task)

    def test_read_tasks(self):
        with self.mock_session as db:
            db.execute.return_value.scalars.return_value = ["task1", "task2"]

            result = self.controller.read(db)

            self.assertEqual(result, ["task1", "task2"])
            db.execute.assert_called_once()

    def test_update_task(self):
        with self.mock_session as db:
            task_id = 1
            update_data = TaskUpdate(title="Updated", description="Updated desc")

            mock_task = MagicMock(spec=Task)
            db.get.return_value = mock_task

            result = self.controller.update(task_id, update_data, db)

            self.assertEqual(result, mock_task)
            db.commit.assert_called_once()
            db.refresh.assert_called_once_with(mock_task)

    def test_delete_task(self):
        with self.mock_session as db:
            task_id = 1
            mock_task = MagicMock(spec=Task)
            db.get.return_value = mock_task

            self.controller.delete(task_id, db)

            db.delete.assert_called_once_with(mock_task)
            db.commit.assert_called_once()


if __name__ == "__main__":
    unittest.main()
