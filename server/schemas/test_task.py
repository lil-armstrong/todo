from schemas.task import TaskBase

def test_task_schema():
    """Test the task schema."""

    task = TaskBase(
        title="Test Task",
        description="This is a test task.",
        completed=False,
        created_at="2023-10-01T00:00:00Z",
        updated_at="2023-10-01T00:00:00Z",
    )

    assert task.title == "Test Task"
    assert task.description == "This is a test task."
    assert task.completed is False
    assert task.created_at == "2023-10-01T00:00:00Z"
    assert task.updated_at == "2023-10-01T00:00:00Z"