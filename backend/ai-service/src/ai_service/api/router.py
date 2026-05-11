from fastapi import APIRouter

from ai_service.api import ai, health

# Top-level router — health lives at /health for liveness probes,
# everything else is namespaced under /api/v1 to match the frontend's NEXT_PUBLIC_API_URL.
api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])

v1_router = APIRouter(prefix="/api/v1")
v1_router.include_router(ai.router)
api_router.include_router(v1_router)
