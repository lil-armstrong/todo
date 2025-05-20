#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from configs.base import get_settings

settings = get_settings()

_DATABASE_URL = (
    settings.live_database_url
    if not settings.is_testing
    else settings.test_database_url
)

engine = create_engine(
    _DATABASE_URL, connect_args={"check_same_thread": False}, echo=True
)

_SessionLocal = sessionmaker(bind=engine, autoflush=False)


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
        raise e
    finally:
        session.close()


__all__ = ["get_db", "engine"]
