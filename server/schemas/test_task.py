from .task import TaskBase


def test_task_schema():
    """Test the task schema."""

    task = TaskBase(
        title="Test Task",
        description="This is a test task.",
        completed=False,
    )

    assert task.title == "Test Task"
    assert task.description == "This is a test task."
    assert task.completed is False
