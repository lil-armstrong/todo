from pydantic import BaseModel, Field


class TaskSchema(BaseModel):
    title: str = Field(..., description="Name of the task")
    description: str | None = Field(description="Description of the task", default=None)
    completed: bool = Field(description="Completion status of the task", default=False)
    created_at: str | None = Field(
        description="Creation date of the task", default=None
    )
    updated_at: str | None = Field(
        description="Last update date of the task", default=None
    )
