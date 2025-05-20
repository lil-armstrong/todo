from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import v1_api_router
from models.base import Base
from utils.db import engine, settings

if not settings.is_testing:
    Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(
    v1_api_router,
    prefix="/api/v1",
)
