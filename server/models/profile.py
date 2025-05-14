from __future__ import annotations
from typing import List
from datetime import datetime

from sqlalchemy import String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    user_name: Mapped[str] = mapped_column(String, nullable=False)
    email_address: Mapped[str] = mapped_column(
        String, unique=True, index=True, nullable=False
    )
    password: Mapped[str] = mapped_column(String, nullable=False)
    first_name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(insert_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(onupdate=func.now())

    tasks: Mapped[List["Task"]] = relationship( # type: ignore[name-defined]  # noqa: F821
        back_populates="profile", cascade="all, delete-orphan"
    )  

    def __repr__(self) -> str:
        return f"Profile(id={self.id!r}, first_name={self.first_name!r}, last_name={self.last_name!r}, created_at={self.created_at!r}, updated_at={self.updated_at!r})"
