from __future__ import annotations
from datetime import datetime

from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped

from .base import Base
from utils.db import engine


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True, unique=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    start_datetime: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    end_datetime: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), insert_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), onupdate=func.now()
    )
    completed: Mapped[bool] = mapped_column(default=False, nullable=False)

    # Foreign key to Profile
    # profile_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"), ondelete="CASCADE", nullable=False)

    # Relationship back to Profile
    # profile: Mapped["Profile"] = relationship(back_populates="tasks") # type: ignore  # noqa: F821
