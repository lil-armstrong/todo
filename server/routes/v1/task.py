from fastapi import APIRouter, status

from utils.app import db_session
from schemas.task import TaskCreate, TaskRead, TaskUpdate
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
)
async def create_task(_task: TaskCreate, db=db_session):
    """Create a new task."""
    return task.create_task(task=_task, db=db)


@router.get(
    "/",
    summary="Read all tasks",
    name="read_tasks",
    description="This endpoint handles the reading of tasks.",
    response_description="A list of dictionary containing a confirmation of the read operation.",
    response_model=list[TaskRead],
)
async def read_tasks(db=db_session):
    return task.read_tasks(db)


@router.patch(
    "/{task_id}",
    summary="Update a task",
    name="update_task",
    description="This endpoint handles the updating of a task.",
    response_description="A dictionary containing a confirmation of the update operation.",
    response_model=TaskRead,
)
async def update_tasks(task_id: int, _task: TaskUpdate, db=db_session):
    return task.update_task(task_id, _task, db)


@router.delete(
    "/{task_id}",
    summary="Delete a task",
    name="delete_task",
    description="This endpoint handles the deletion of a task.",
    response_description="A dictionary containing a confirmation of the delete operation.",
)
async def delete_tasks(task_id: int, db=db_session):
    return task.delete_task(task_id, db)
