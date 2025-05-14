from datetime import datetime

from pydantic import BaseModel, Field

from schemas.orm import ORM


class TaskBase(BaseModel):
    title: str = Field(..., description="Name of the task")
    description: str | None = Field(description="Description of the task", default=None)
    completed: bool | None = Field(
        description="Completion status of the task", default=False
    )
    start_datetime: str | None = Field(
        description="Start date and time of the task", default=None
    )
    end_datetime: str | None = Field(
        description="End date and time of the task", default=None
    )


class TaskCreate(TaskBase):
    # profile_id: int
    pass


class TaskRead(TaskBase, ORM):
    id: int = Field(
        description="ID of the task",
    )
    created_at: datetime | None = Field(
        description="Creation date of the task", default=None
    )
    updated_at: datetime | None = Field(
        description="Last update date of the task", default=None
    )

    # profile_id: int | None = Field(
    #     description="ID of the profile associated with the task", default=None
    # )


class TaskUpdate(TaskBase, ORM):
    pass
