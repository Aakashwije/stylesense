"""Minimal Bearer-token extraction.

Auth in this MVP is best-effort: we accept a Bearer token if present and use the
subject as user_id, but endpoints don't require it. core-api owns issuing/revoking
tokens. Once it's online and we share JWT_SECRET, we can verify signatures here.
"""

from __future__ import annotations

import base64
import json

from fastapi import Header


def _decode_jwt_subject_unsafe(token: str) -> str | None:
    """Decode the JWT payload WITHOUT verifying — only used for the optional user_id.

    Replace with full signature verification once core-api's JWT issuer is wired in.
    """
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None
        payload_b64 = parts[1]
        padding = "=" * (-len(payload_b64) % 4)
        payload_bytes = base64.urlsafe_b64decode(payload_b64 + padding)
        payload = json.loads(payload_bytes)
        sub = payload.get("sub") or payload.get("userId") or payload.get("user_id")
        return str(sub) if sub is not None else None
    except Exception:
        return None


async def get_optional_user_id(
    authorization: str | None = Header(default=None),
) -> str | None:
    if not authorization:
        return None
    if not authorization.lower().startswith("bearer "):
        return None
    token = authorization[7:].strip()
    return _decode_jwt_subject_unsafe(token)
