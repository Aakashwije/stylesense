from fastapi import APIRouter

from ai_service.api import health

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
