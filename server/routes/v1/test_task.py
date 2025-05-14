def test_read_task(client):
    """Test the read task endpoint."""
    response = client.get("/api/v1/tasks")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, World!"}

def test_create_task(client):
    """Test the create task endpoint."""
    response = client.post("/api/v1/tasks")
    assert response.status_code == 200
    assert response.json() == {"message": "Task created!"}

def test_update_task(client):
    """Test the update task endpoint."""
    response = client.patch("/api/v1/tasks")
    assert response.status_code == 200
    assert response.json() == {"message": "Task updated!"}

def test_delete_task(client):
    """Test the delete task endpoint."""
    response = client.delete("/api/v1/tasks")
    assert response.status_code == 200
    assert response.json() == {"message": "Task deleted!"}