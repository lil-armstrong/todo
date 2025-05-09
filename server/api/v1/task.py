from fastapi import APIRouter, status
from schemas.task import TaskSchema
from controller.task import TaskController

router = APIRouter()

task = TaskController()

@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    summary="Create a new task",
    name="create_task",
    description="This endpoint handles the creation of a new task.",
    response_description="A dictionary containing the created task details.",
    response_model=TaskSchema,
)
async def create_task(_task: TaskSchema):
    """Create a new task."""
    return task.create_task(_task)


@router.get(
    "/",
    summary="Read all tasks",
    name="read_tasks",
    description="This endpoint handles the reading of tasks.",
    response_description="A list of dictionary containing a confirmation of the read operation.",
    response_model=list[TaskSchema],
)
async def read_tasks():
    return task.read_tasks()


@router.patch(
    "/{task_id}",
    summary="Update a task",
    name="update_task",
    description="This endpoint handles the updating of a task.",
    response_description="A dictionary containing a confirmation of the update operation.",
    response_model=TaskSchema,
)
async def update_tasks(task_id: int, _task: TaskSchema):
    return task.update_task(task_id, _task)


@router.delete(
    "/{task_id}",
    summary="Delete a task",
    name="delete_task",
    description="This endpoint handles the deletion of a task.",
    response_description="A dictionary containing a confirmation of the delete operation.",
)
async def delete_tasks(task_id: int):
    return task.delete_task(task_id)
