from fastapi import APIRouter, status

from utils.app import db_session
from schemas.task import TaskCreate, TaskRead, TaskUpdate
from controllers.task import TaskController

router = APIRouter()

controller = TaskController()


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    summary="Create a new task",
    name="create_task",
    description="This endpoint handles the creation of a new task.",
    response_description="A dictionary containing the created task details.",
    responses={
        400: {
            "description": "Invalid input data.",
            "content": {
                "application/json": {"example": {"detail": "Invalid input data."}}
            },
        },
        409: {
            "description": "Task already exists.",
            "content": {
                "application/json": {"example": {"detail": "Task already exists."}}
            },
        },
        500: {
            "description": "Internal server error.",
            "content": {
                "application/json": {"example": {"detail": "Internal server error."}}
            },
        },
    },
)
async def create_task(payload: TaskCreate, db=db_session):
    """Create a new task."""
    return controller.create(payload, db)


@router.get(
    "/",
    summary="Read all tasks",
    name="read_tasks",
    description="This endpoint handles the reading of tasks.",
    response_description="A list of dictionary containing a confirmation of the read operation.",
    response_model=list[TaskRead],
)
async def read_tasks(db=db_session):
    return controller.read(db)


@router.patch(
    "/{task_id}",
    summary="Update a task",
    name="update_task",
    description="This endpoint handles the updating of a task.",
    response_description="A dictionary containing a confirmation of the update operation.",
    response_model=TaskRead,
)
async def update_tasks(task_id: int, payload: TaskUpdate, db=db_session):
    return controller.update(task_id, payload, db)


@router.delete(
    "/{task_id}",
    summary="Delete a task",
    name="delete_task",
    description="This endpoint handles the deletion of a task.",
    response_description="A dictionary containing a confirmation of the delete operation.",
)
async def delete_tasks(task_id: int, db=db_session):
    return controller.delete(task_id, db)
