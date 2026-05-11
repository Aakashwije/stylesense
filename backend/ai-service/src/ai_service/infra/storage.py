"""In-memory storage for conversations and hair analyses.

Intentionally simple: replace with Postgres-backed repositories in `infra/db.py`
when persistence is wired up. The interface here is the contract the domain layer depends on.
"""

from __future__ import annotations

import threading
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any


@dataclass
class ChatTurn:
    role: str  # "user" | "assistant"
    content: str
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))


@dataclass
class Conversation:
    id: str
    turns: list[ChatTurn] = field(default_factory=list)
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))


@dataclass
class AnalysisRecord:
    id: str
    user_id: str | None
    result: dict[str, Any]
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))


class InMemoryStore:
    def __init__(self) -> None:
        self._conversations: dict[str, Conversation] = {}
        self._analyses: dict[str, AnalysisRecord] = {}
        self._latest_by_user: dict[str, str] = {}  # user_id -> analysis_id
        self._lock = threading.Lock()

    # --- conversations ---
    def get_or_create_conversation(self, conversation_id: str) -> Conversation:
        with self._lock:
            conv = self._conversations.get(conversation_id)
            if conv is None:
                conv = Conversation(id=conversation_id)
                self._conversations[conversation_id] = conv
            return conv

    def append_turn(self, conversation_id: str, turn: ChatTurn) -> None:
        with self._lock:
            conv = self._conversations.setdefault(
                conversation_id, Conversation(id=conversation_id)
            )
            conv.turns.append(turn)

    def get_conversation(self, conversation_id: str) -> Conversation | None:
        with self._lock:
            return self._conversations.get(conversation_id)

    # --- analyses ---
    def save_analysis(self, record: AnalysisRecord) -> None:
        with self._lock:
            self._analyses[record.id] = record
            if record.user_id:
                self._latest_by_user[record.user_id] = record.id

    def get_analysis(self, analysis_id: str) -> AnalysisRecord | None:
        with self._lock:
            return self._analyses.get(analysis_id)

    def get_latest_for_user(self, user_id: str) -> AnalysisRecord | None:
        with self._lock:
            analysis_id = self._latest_by_user.get(user_id)
            if analysis_id is None:
                return None
            return self._analyses.get(analysis_id)


_singleton: InMemoryStore | None = None


def get_store() -> InMemoryStore:
    global _singleton
    if _singleton is None:
        _singleton = InMemoryStore()
    return _singleton
