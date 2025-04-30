#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

_SQLALCHEMY_DATABASE_URL = "sqlite:///./todo_api.db"

_engine = create_engine(
    _SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

_SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=_engine)

""" 
This function is a dependency that provides a database session to the FastAPI routes.
It creates a new session, yields it to the route, and ensures that the session is closed after use.
This is useful for managing database connections and ensuring that resources are properly released.
The `Depends` function is used to declare that this function should be called to provide a dependency for the route.
The `SessionLocal` is a session factory that creates new sessions for interacting with the database.
The `yield` statement is used to return the session to the route, and the `finally` block ensures that the session is closed after use.
This is important for preventing resource leaks and ensuring that the database connection is properly managed.
"""


def get_db():
    db = _SessionLocal()
    try:
        yield db
    finally:
        db.close()


__all__ = ["get_db"]
