import time
from datetime import datetime, timezone

from fastapi import APIRouter

router = APIRouter()

_started_at = time.monotonic()


@router.get("/health")
def health() -> dict[str, object]:
    return {
        "status": "ok",
        "service": "ai-service",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime": time.monotonic() - _started_at,
    }
