from pydantic import BaseModel, Field

class Image(BaseModel):
    url: str = Field(description="URL of the image asset")
    alt: str | None = Field(description="Alternate description of the image")
    width: int = Field(description="")
    height: int = Field(description="")