from datetime import datetime

from pydantic import BaseModel, Field, ConfigDict, EmailStr

from schemas.orm import ORM


class ProfileBase(BaseModel):
    user_name: str = Field(description="User name of the profile")
    email_address: EmailStr = Field(description="Email address of the profile")
    first_name: str = Field(description="First name of the profile")
    last_name: str = Field(description="Last name of the profile")
   
    model_config = ConfigDict(
        validate_assignment=True,
    )

class ProfileCreate(ProfileBase):
    password: str

class ProfileRead(ProfileBase, ORM):
    id: int = Field(
        ...,
        frozen=True,
        description="ID of the profile",
    )
    created_at: datetime = Field(description="Creation date of the task")
    updated_at: datetime | None = Field(description="Last update date of the task")

class ProfileUpdate(ProfileRead):
    pass