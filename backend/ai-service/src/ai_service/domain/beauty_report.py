"""Beauty report: returns the user's most recent hair analysis with a report date.

A real implementation would aggregate multiple analyses over time and produce trends.
For the MVP we return the latest analysis on file (in-memory) decorated with `reportDate`.
"""

from __future__ import annotations

from fastapi import HTTPException

from ai_service.domain.schemas import BeautyReport, HairMetrics
from ai_service.infra.storage import get_store


async def get_beauty_report(user_id: str | None) -> BeautyReport:
    store = get_store()
    record = store.get_latest_for_user(user_id) if user_id else None

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="No analysis on file. Upload a photo via /ai/analyze to generate a report.",
        )

    r = record.result
    return BeautyReport(
        id=record.id,
        overallScore=int(r["overallScore"]),
        metrics=HairMetrics(**r["metrics"]),
        hairType=str(r["hairType"]),
        recommendations=list(r["recommendations"]),
        concerns=list(r.get("concerns", [])),
        reportDate=record.created_at.isoformat(),
    )
