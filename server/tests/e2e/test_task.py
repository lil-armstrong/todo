from datetime import datetime

from schemas.task import TaskCreate, TaskUpdate, TaskRead


def test_read_task(client):
    """Test the read task endpoint."""
    response = client.get("/api/v1/tasks")

    assert response.status_code == 200
    assert response.json() == []


def test_create_task(client):
    """Test the create task endpoint."""
    mock_response = TaskCreate(title="New Task")

    created_task = client.post("/api/v1/tasks", json=mock_response.model_dump())
    assert created_task.status_code == 201

    response = client.get("/api/v1/tasks")

    assert response.status_code == 200
    assert response.json() == [created_task.json()]


def test_update_task(client):
    """Test the update task endpoint."""
    title = "Test 1"
    mock_task = TaskCreate(title="New Task")

    created_task = client.post("/api/v1/tasks", json=mock_task.model_dump())
    id = created_task.json()["id"]
    assert created_task.status_code == 201

    mock_update = TaskUpdate(title=title)
    response = client.patch(f"/api/v1/tasks/{id}", json=mock_update.model_dump())
    now = datetime.now()
    assert response.status_code == 200

    expected_response = TaskRead(**created_task.json()).model_copy(
        update={"id": id, "title": title, "updated_at": now}
    )

    assert expected_response.model_validate_json(response.content)


def test_delete_task(client):
    """Test the delete task endpoint."""
    title = "New Task"
    mock_task = TaskCreate(title=title)

    create_task = client.post("/api/v1/tasks", json=mock_task.model_dump())
    id = create_task.json()["id"]
    assert create_task.status_code == 201

    read_task = client.get("/api/v1/tasks")
    assert read_task.status_code == 200

    updated_task = read_task.json()[0]
    assert updated_task is not None
    assert updated_task["title"] == title
    assert updated_task["created_at"] is not None
    assert updated_task["updated_at"] is None
    assert updated_task["description"] is None
    assert updated_task["completed"] is False
    assert updated_task["start_datetime"] is None
    assert updated_task["end_datetime"] is None

    delete_task = client.delete(f"/api/v1/tasks/{id}")
    assert delete_task.status_code == 200

    read_task = client.get("/api/v1/tasks")
    assert read_task.json() == []
