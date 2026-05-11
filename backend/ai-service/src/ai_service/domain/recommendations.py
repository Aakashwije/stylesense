"""Style recommendations: given a hair analysis, suggest a ranked list of styles.

Strategy:
- A curated style catalog drives both the OpenAI prompt (as candidate options)
  and the stub fallback. This guarantees stable IDs even when the LLM is talking.
- When OpenAI is available, GPT-4o ranks the catalog by fit-to-analysis and writes
  one-line descriptions.
- When OpenAI isn't available, scores are derived from analysis metrics + hair type.
"""

from __future__ import annotations

import hashlib
import json
from typing import Any

from ai_service.domain.schemas import StyleRecommendation
from ai_service.infra.openai_client import get_openai_client
from ai_service.infra.storage import get_store

STYLE_CATALOG: list[dict[str, str]] = [
    {"id": "soft-bob", "name": "Soft Bob", "category": "Short"},
    {"id": "pixie", "name": "Pixie Cut", "category": "Short"},
    {"id": "lob", "name": "Long Bob", "category": "Medium"},
    {"id": "layered-lob", "name": "Layered Lob", "category": "Medium"},
    {"id": "curtain", "name": "Curtain Bangs", "category": "Medium"},
    {"id": "waves", "name": "Beach Waves", "category": "Medium"},
    {"id": "blowout", "name": "Blowout", "category": "Long"},
    {"id": "braids", "name": "Box Braids", "category": "Long"},
    {"id": "curls", "name": "Natural Curls", "category": "Long"},
]


def _stub_recommendations(analysis: dict[str, Any]) -> list[StyleRecommendation]:
    metrics = analysis.get("metrics", {})
    hair_type: str = analysis.get("hairType", "")
    digest = hashlib.sha256(json.dumps(analysis, sort_keys=True).encode()).digest()

    moisture = int(metrics.get("moisture", 70))
    strength = int(metrics.get("strength", 70))
    is_curly = "Curl" in hair_type or "Coil" in hair_type
    is_wavy = "Wavy" in hair_type

    results: list[StyleRecommendation] = []
    for idx, style in enumerate(STYLE_CATALOG):
        base = 60 + ((digest[idx % len(digest)]) % 25)

        if is_curly and style["id"] in {"curls", "braids", "lob"}:
            base += 12
        elif is_wavy and style["id"] in {"waves", "layered-lob", "curtain"}:
            base += 12
        elif not (is_curly or is_wavy) and style["id"] in {"soft-bob", "blowout", "pixie"}:
            base += 8

        if moisture < 65 and style["id"] == "blowout":
            base -= 10  # heat-heavy styles penalised when moisture is low
        if strength < 65 and style["id"] in {"braids", "blowout"}:
            base -= 8

        score = max(40, min(99, base))
        description = _stub_description(style["name"], hair_type, moisture)

        results.append(
            StyleRecommendation(
                id=style["id"],
                name=style["name"],
                category=style["category"],
                description=description,
                matchScore=score,
                imageUrl=None,
            )
        )

    results.sort(key=lambda r: r.matchScore, reverse=True)
    return results


def _stub_description(style_name: str, hair_type: str, moisture: int) -> str:
    if moisture < 65:
        return f"Pairs well with {hair_type}; choose this for a low-heat, hydrating routine."
    return f"Complements {hair_type} with balanced movement and volume."


_RANKING_PROMPT = (
    "You are a senior hairstylist. Given a hair analysis and a fixed catalog of styles, "
    "score each style 0-100 for how well it fits this client. Higher = better fit. "
    "Write a one-sentence description tailored to their analysis. "
    "Return JSON ONLY in this exact shape: "
    '{"items": [{"id": "<catalog id>", "matchScore": <0-100>, "description": "<one sentence>"}]} '
    "Include every catalog id exactly once."
)


def _extract_json(text: str) -> dict[str, Any]:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        first_nl = cleaned.find("\n")
        if first_nl >= 0:
            cleaned = cleaned[first_nl + 1 :]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
    return json.loads(cleaned.strip())


async def get_recommendations(analysis_id: str | None) -> list[StyleRecommendation]:
    store = get_store()
    analysis: dict[str, Any] | None = None
    if analysis_id:
        rec = store.get_analysis(analysis_id)
        if rec is not None:
            analysis = rec.result

    if analysis is None:
        # No analysis on file — recommend a neutral default ordering of the catalog.
        analysis = {
            "metrics": {"moisture": 75, "strength": 75, "shine": 75, "scalpHealth": 80},
            "hairType": "Type 2B Wavy",
        }

    client = get_openai_client()
    if client.enabled:
        try:
            catalog_json = json.dumps(STYLE_CATALOG)
            user_prompt = (
                f"Analysis: {json.dumps(analysis)}\n"
                f"Catalog: {catalog_json}\n"
                "Rank and describe."
            )
            response = await client.chat(
                messages=[
                    {"role": "system", "content": _RANKING_PROMPT},
                    {"role": "user", "content": user_prompt},
                ],
                response_format={"type": "json_object"},
                temperature=0.4,
            )
            if response:
                parsed = _extract_json(response)
                by_id = {s["id"]: s for s in STYLE_CATALOG}
                merged: list[StyleRecommendation] = []
                for item in parsed.get("items", []):
                    style = by_id.get(item.get("id"))
                    if style is None:
                        continue
                    merged.append(
                        StyleRecommendation(
                            id=style["id"],
                            name=style["name"],
                            category=style["category"],
                            description=str(item.get("description", "")),
                            matchScore=int(item.get("matchScore", 70)),
                            imageUrl=None,
                        )
                    )
                if merged:
                    merged.sort(key=lambda r: r.matchScore, reverse=True)
                    return merged
        except Exception:
            pass

    return _stub_recommendations(analysis)
