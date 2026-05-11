from __future__ import annotations

from typing import Any

from openai import AsyncOpenAI

from ai_service.config import get_settings


class OpenAIClient:
    """Thin wrapper around the OpenAI SDK. Returns None when no API key is configured,
    letting domain services fall back to deterministic stubs.
    """

    def __init__(self) -> None:
        settings = get_settings()
        self._api_key = settings.openai_api_key
        self._model = settings.openai_model
        self._client: AsyncOpenAI | None = (
            AsyncOpenAI(api_key=self._api_key) if self._api_key else None
        )

    @property
    def enabled(self) -> bool:
        return self._client is not None

    @property
    def model(self) -> str:
        return self._model

    async def chat(
        self,
        messages: list[dict[str, Any]],
        *,
        response_format: dict[str, Any] | None = None,
        temperature: float = 0.7,
    ) -> str | None:
        if self._client is None:
            return None
        kwargs: dict[str, Any] = {
            "model": self._model,
            "messages": messages,
            "temperature": temperature,
        }
        if response_format is not None:
            kwargs["response_format"] = response_format
        completion = await self._client.chat.completions.create(**kwargs)
        return completion.choices[0].message.content

    async def chat_with_image(
        self,
        system_prompt: str,
        user_prompt: str,
        image_data_url: str,
        *,
        response_format: dict[str, Any] | None = None,
    ) -> str | None:
        if self._client is None:
            return None
        messages: list[dict[str, Any]] = [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": user_prompt},
                    {"type": "image_url", "image_url": {"url": image_data_url}},
                ],
            },
        ]
        return await self.chat(messages, response_format=response_format, temperature=0.3)


_singleton: OpenAIClient | None = None


def get_openai_client() -> OpenAIClient:
    global _singleton
    if _singleton is None:
        _singleton = OpenAIClient()
    return _singleton
