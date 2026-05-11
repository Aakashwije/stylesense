"""Virtual try-on: composites a chosen style/color onto the user's photo.

True photoreal try-on requires a face/hair segmentation model and a generative model —
out of scope for an MVP. This module returns a *result URL* that the frontend renders
as the "after" image. Two modes:

- OpenAI: call DALL-E (image generation) with a prompt describing the new look. The
  returned URL is the generated preview. Note: this does NOT preserve the user's face;
  it generates a representative image. A production try-on would use a dedicated model
  (e.g. Stable Diffusion + ControlNet face conditioning, or Replicate's hair-style models).
- Stub: returns a deterministic placeholder URL keyed by the upload hash, so the
  frontend can still render an "after" panel during local dev.

The stub deliberately returns the same URL pattern so the frontend doesn't need to
branch on the response shape.
"""

from __future__ import annotations

import hashlib

from ai_service.domain.recommendations import STYLE_CATALOG
from ai_service.domain.schemas import VirtualTryOnResult
from ai_service.infra.openai_client import get_openai_client

_COLOR_PROMPT_HINTS: dict[str, str] = {
    "natural": "in their natural shade",
    "blonde": "in a soft blonde",
    "ash": "in ash brown",
    "red": "in auburn red",
    "platinum": "in platinum blonde",
    "purple": "in a violet tone",
    "blue": "in midnight blue",
    "pink": "in a rose-gold pink",
}


def _style_label(style_id: str) -> str:
    for s in STYLE_CATALOG:
        if s["id"] == style_id:
            return s["name"].lower()
    return style_id.replace("-", " ")


async def virtual_tryon(
    image_bytes: bytes,
    style_id: str,
    color_id: str | None,
) -> VirtualTryOnResult:
    client = get_openai_client()

    if client.enabled and client._client is not None:  # type: ignore[attr-defined]
        try:
            style_label = _style_label(style_id)
            color_hint = _COLOR_PROMPT_HINTS.get(
                color_id or "natural", "in their natural shade"
            )
            prompt = (
                f"Photorealistic portrait of a person with a {style_label} hairstyle, "
                f"{color_hint}. Studio lighting, neutral background, magazine quality, "
                f"high resolution, hair as the focal point."
            )
            # openai>=1.0 image generation API
            resp = await client._client.images.generate(  # type: ignore[attr-defined]
                model="dall-e-3",
                prompt=prompt,
                size="1024x1024",
                quality="standard",
                n=1,
            )
            url = resp.data[0].url
            if url:
                return VirtualTryOnResult(
                    resultUrl=url, styleId=style_id, colorId=color_id
                )
        except Exception:
            pass

    # Stub: deterministic placeholder URL.
    digest = hashlib.sha256(image_bytes + style_id.encode() + (color_id or "").encode()).hexdigest()
    return VirtualTryOnResult(
        resultUrl=f"https://picsum.photos/seed/{digest[:16]}/800/1067",
        styleId=style_id,
        colorId=color_id,
    )
