from pydantic import BaseModel, Field

class TaskBase(BaseModel):
    title: str = Field(..., description="Name of the task")
    description: str = Field(..., description="Description of the task")
    completed: bool = Field(..., description="Completion status of the task")
    created_at: str = Field(..., description="Creation date of the task")
    updated_at: str = Field(..., description="Last update date of the task")