from requests import Session
from unittest.mock import create_autospec
import unittest
import pytest

from fastapi.testclient import TestClient
from utils.db import get_db
from main import app

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from models.base import Base


@pytest.fixture(scope="function")
def db_session():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=engine)

    connection = engine.connect()
    transaction = connection.begin()
    session = sessionmaker(bind=connection)()
    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()


@pytest.fixture
def client(db_session):
    def override_db_session():
        yield db_session
    
    app.dependency_overrides[get_db] = override_db_session

    with TestClient(app) as client:
        yield client

    # Clear overrides after test
    app.dependency_overrides.clear()

class TestBase(unittest.TestCase):
    def setUp(self) -> None:
        self.mock_session = create_autospec(Session, instance=True)
        self.client = TestClient(self.__setup_client())

        return super().setUp()

    def __override_get_db(self):
        yield self.mock_session

    def __setup_client(self):
        """Override the FastAPI get_db dependency"""
        app.dependency_overrides[get_db] = self.__override_get_db

        return app
