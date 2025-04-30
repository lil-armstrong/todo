# app/api/v1/__init__.py
from fastapi import APIRouter
from .task import router

api_router = APIRouter()

api_router.include_router(router, prefix="/tasks", tags=["Tasks"])
