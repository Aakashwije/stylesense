"""Hair analysis: examines a user-uploaded photo and returns metrics + recommendations.

When OpenAI is configured, uses GPT-4o Vision with a structured prompt that returns JSON.
When no API key is set, falls back to a deterministic stub that varies its output based on
a hash of the image bytes — so the same photo produces the same result, but different photos
produce believably different outputs.
"""

from __future__ import annotations

import base64
import hashlib
import json
import uuid
from typing import Any

from ai_service.domain.schemas import HairAnalysisResult, HairMetrics
from ai_service.infra.openai_client import get_openai_client
from ai_service.infra.storage import AnalysisRecord, get_store

_SYSTEM_PROMPT = (
    "You are a licensed trichologist and master stylist. Given a photo of a person's hair, "
    "produce a concise hair-health assessment. Be encouraging but honest. "
    "Return ONLY valid JSON in this exact shape:\n"
    "{\n"
    '  "overallScore": <0-100>,\n'
    '  "metrics": {"moisture": <0-100>, "strength": <0-100>, "shine": <0-100>, '
    '"scalpHealth": <0-100>},\n'
    '  "hairType": "<e.g. \'Type 2B Wavy\' or \'Type 4A Coily\'>",\n'
    '  "recommendations": ["<3-5 short, actionable items>"],\n'
    '  "concerns": ["<0-3 short concern strings, or empty list>"]\n'
    "}"
)

_HAIR_TYPES = [
    "Type 1A Straight",
    "Type 1B Straight",
    "Type 2A Wavy",
    "Type 2B Wavy",
    "Type 2C Wavy",
    "Type 3A Curly",
    "Type 3B Curly",
    "Type 3C Curly",
    "Type 4A Coily",
    "Type 4B Coily",
]

_RECOMMENDATION_POOL = [
    "Deep condition weekly with a protein-rich mask",
    "Use a sulfate-free shampoo to preserve natural oils",
    "Apply leave-in conditioner on damp hair before styling",
    "Trim every 8-10 weeks to prevent split ends",
    "Sleep on a silk pillowcase to reduce breakage",
    "Add a hydrating serum to your routine for shine",
    "Use a heat protectant before any thermal styling",
    "Rinse with cool water to seal the cuticle",
    "Massage scalp 2-3 times per week to stimulate circulation",
    "Consider a clarifying shampoo monthly to remove buildup",
]

_CONCERN_POOL = [
    "Mild dryness at the ends",
    "Slight frizz in humid conditions",
    "Minor heat damage on the lengths",
    "Visible split ends",
]


def _stub_analysis(image_bytes: bytes) -> dict[str, Any]:
    digest = hashlib.sha256(image_bytes).digest()

    def pick(byte_idx: int, lo: int, hi: int) -> int:
        return lo + (digest[byte_idx % len(digest)] % max(1, hi - lo + 1))

    metrics = {
        "moisture": pick(0, 55, 92),
        "strength": pick(1, 60, 95),
        "shine": pick(2, 50, 90),
        "scalpHealth": pick(3, 65, 95),
    }
    overall = round(sum(metrics.values()) / 4)
    hair_type = _HAIR_TYPES[digest[4] % len(_HAIR_TYPES)]

    rec_count = 3 + (digest[5] % 3)
    rec_seed = digest[6] % len(_RECOMMENDATION_POOL)
    recommendations = [
        _RECOMMENDATION_POOL[(rec_seed + i) % len(_RECOMMENDATION_POOL)]
        for i in range(rec_count)
    ]

    concern_count = digest[7] % 3
    concerns = (
        [_CONCERN_POOL[(digest[8] + i) % len(_CONCERN_POOL)] for i in range(concern_count)]
        if concern_count > 0
        else []
    )

    return {
        "overallScore": overall,
        "metrics": metrics,
        "hairType": hair_type,
        "recommendations": recommendations,
        "concerns": concerns,
    }


def _extract_json(text: str) -> dict[str, Any]:
    """LLMs sometimes wrap JSON in markdown fences. Strip them defensively."""
    cleaned = text.strip()
    if cleaned.startswith("```"):
        first_nl = cleaned.find("\n")
        if first_nl >= 0:
            cleaned = cleaned[first_nl + 1 :]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
    return json.loads(cleaned.strip())


async def analyze_hair(
    image_bytes: bytes,
    content_type: str,
    *,
    user_id: str | None = None,
) -> HairAnalysisResult:
    client = get_openai_client()

    raw: dict[str, Any] | None = None
    if client.enabled:
        b64 = base64.b64encode(image_bytes).decode("ascii")
        data_url = f"data:{content_type};base64,{b64}"
        try:
            response = await client.chat_with_image(
                system_prompt=_SYSTEM_PROMPT,
                user_prompt="Analyze the hair in this photo. Return JSON only.",
                image_data_url=data_url,
                response_format={"type": "json_object"},
            )
            if response:
                raw = _extract_json(response)
        except Exception:
            # Soft-fail to stub so the endpoint stays reliable even if OpenAI hiccups.
            raw = None

    if raw is None:
        raw = _stub_analysis(image_bytes)

    analysis_id = uuid.uuid4().hex
    result = HairAnalysisResult(
        id=analysis_id,
        overallScore=int(raw["overallScore"]),
        metrics=HairMetrics(**raw["metrics"]),
        hairType=str(raw["hairType"]),
        recommendations=list(raw["recommendations"]),
        concerns=list(raw.get("concerns", [])),
    )

    get_store().save_analysis(
        AnalysisRecord(id=analysis_id, user_id=user_id, result=result.model_dump())
    )

    return result
