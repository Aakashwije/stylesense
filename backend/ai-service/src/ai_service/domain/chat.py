"""Conversational beauty advisor. Maintains conversation history per conversationId."""

from __future__ import annotations

import re
import uuid

from ai_service.domain.schemas import ChatResponse
from ai_service.infra.openai_client import get_openai_client
from ai_service.infra.storage import ChatTurn, get_store

_SYSTEM_PROMPT = (
    "You are StyleSense AI, a friendly and knowledgeable beauty advisor. "
    "Help users with hairstyles, hair care, color trends, and salon services. "
    "Keep responses concise (2-4 sentences). If a user asks about a service we offer "
    "(cuts, color, treatments, blowouts, extensions), encourage them to book. "
    "Never invent salon-specific pricing or stylist names — defer those to the booking flow."
)

_STUB_REPLIES: list[tuple[re.Pattern[str], str]] = [
    (
        re.compile(r"\b(oval|round|square|heart|long)\s*(face|shape)\b", re.I),
        "For an oval face, soft layers, long bobs, and curtain bangs are flattering. "
        "Round faces benefit from height at the crown and side-swept length. "
        "Want to book a consultation to dial in the exact cut?",
    ),
    (
        re.compile(r"\b(low.maintenance|easy|simple)\b.*\b(color|colour)\b", re.I),
        "Balayage and root smudges are the easiest low-maintenance colors — they grow out "
        "without harsh lines and only need touch-ups every 12-16 weeks. Ash or honey tones "
        "are very forgiving. Want me to find a colorist near you?",
    ),
    (
        re.compile(r"\b(deep\s*condition|conditioner|mask)\b", re.I),
        "Once a week is the sweet spot for most hair types. If your hair is fine or oily, "
        "every 10-14 days is enough. Heat-treated or color-treated hair benefits from "
        "twice-weekly masks until it's back to baseline.",
    ),
    (
        re.compile(r"\b(fine|thin)\s+hair\b", re.I),
        "Fine hair loves blunt cuts and chin-length bobs — they create the illusion of "
        "density. Avoid heavy layering, which can thin the ends. A volumizing mousse at the "
        "roots makes a real difference. Want me to suggest stylists who specialise in fine hair?",
    ),
    (
        re.compile(r"\b(curly|curl|coil|coily)\b", re.I),
        "For curls, focus on moisture: a sulfate-free shampoo, a creamy conditioner, and "
        "a curl-defining cream applied to soaking-wet hair. Cut dry, not wet, to preserve "
        "your natural pattern. Want a curl-specialist recommendation?",
    ),
    (
        re.compile(r"\b(damaged|breakage|split)\b", re.I),
        "Start with a protein treatment, then alternate with a deep moisture mask weekly. "
        "Trim every 6-8 weeks while you're recovering. Skip heat tools when you can; "
        "if you can't, use a quality heat protectant first.",
    ),
    (
        re.compile(r"\b(book|appointment|booking)\b", re.I),
        "I can help with that! You can browse stylists by speciality and price on the "
        "Services page, or tell me what you're looking for and I'll narrow it down.",
    ),
]

_FALLBACK_REPLY = (
    "Great question! I'd recommend chatting with one of our specialist stylists — "
    "they can tailor advice to your hair specifically. Would you like to book a consultation?"
)


def _stub_reply(message: str) -> str:
    for pattern, reply in _STUB_REPLIES:
        if pattern.search(message):
            return reply
    return _FALLBACK_REPLY


async def send_chat_message(message: str, conversation_id: str | None) -> ChatResponse:
    store = get_store()
    if not conversation_id:
        conversation_id = uuid.uuid4().hex

    conv = store.get_or_create_conversation(conversation_id)
    store.append_turn(conversation_id, ChatTurn(role="user", content=message))

    client = get_openai_client()
    reply: str | None = None

    if client.enabled:
        try:
            history = [
                {"role": "system", "content": _SYSTEM_PROMPT},
                *[{"role": t.role, "content": t.content} for t in conv.turns],
                {"role": "user", "content": message},
            ]
            reply = await client.chat(messages=history, temperature=0.6)
        except Exception:
            reply = None

    if not reply:
        reply = _stub_reply(message)

    store.append_turn(conversation_id, ChatTurn(role="assistant", content=reply))

    return ChatResponse(reply=reply, conversationId=conversation_id)
