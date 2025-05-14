#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pathlib import Path
from contextlib import asynccontextmanager

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine

db_path = Path(__file__).cwd() / "todo.db"
_DATABASE_URL = f"sqlite:///{db_path.absolute()}"

engine = create_engine(
    _DATABASE_URL, connect_args={"check_same_thread": False}, echo=True
)

_SessionLocal = sessionmaker(
    bind=engine, class_=Session
)


def get_db():
    """
    This function is a dependency that provides a database session to the FastAPI routes.
    It creates a new session, yields it to the route, and ensures that the session is closed after use.
    This is useful for managing database connections and ensuring that resources are properly released.

    The `yield` statement is used to return the session to the route, and the `finally` block ensures that the session is closed after use.
    This is important for preventing resource leaks and ensuring that the database connection is properly managed.
    """
    session = _SessionLocal()
    try:
        yield session
    except SQLAlchemyError as e:
        session.rollback()
        raise
    finally:
        session.close()


__all__ = ["get_db", "engine"]
