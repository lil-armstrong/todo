def test_create_task():
    """Test the create task controller."""
    from server.controller.task import TaskController
    from server.schemas.task import TaskSchema

    task = TaskController()
    task_data = TaskSchema(
        title="Test Task",
        description="This is a test task.",
    )
    result = task.create_task(task_data)
    assert result == {}
