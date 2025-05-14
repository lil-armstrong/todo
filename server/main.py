from fastapi import FastAPI

from routes import v1_api_router

app = FastAPI()

app.include_router(v1_api_router, prefix="/api/v1",)
