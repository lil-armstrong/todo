# app/api/v1/__init__.py
from fastapi import APIRouter
from .task import router as task
from .profile import router as profile

api_router = APIRouter()

api_router.include_router(task, prefix="/tasks", tags=["Tasks"])
api_router.include_router(profile, prefix="/profiles", tags=["Profiles"])
