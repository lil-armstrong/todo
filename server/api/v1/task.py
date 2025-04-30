from fastapi import APIRouter, status

router = APIRouter()

"""
Handle the creation of a new task.

Returns:
    dict: A dictionary containing the created task details.
"""


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_task():
    """Create a new task."""
    return {"task": "create"}


@router.get(
    "/",
    summary="Read all tasks",
    name="read_tasks",
    description="This endpoint handles the reading of tasks.",
    response_description="A dictionary containing a confirmation of the read operation.",
)
async def read_tasks():
    return []



@router.patch("/{task_id}")
async def update_tasks(task_id: int):
    """
    Update a task.
    Args:
        task_id (int): The ID of the task to update.
    Returns:
        dict: A dictionary containing a confirmation of the update operation.
    """
    return {"task": "patch", "task_id": task_id}



@router.delete("/")
async def delete_tasks():
    return {"task": "delete"}
