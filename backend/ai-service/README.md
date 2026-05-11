# ai-service

Python + FastAPI service. Owns AI/ML features: recommendations, hair analysis, chatbot, virtual try-on.

## Layout

```
ai-service/
├── src/
│   └── ai_service/
│       ├── __init__.py
│       ├── main.py            # FastAPI app factory + ASGI entrypoint
│       ├── config.py          # Pydantic Settings (env validation)
│       ├── api/               # HTTP routes (presentation layer)
│       ├── domain/            # Business entities and rules (empty)
│       ├── infra/             # DB, cache, external API clients (empty)
│       └── models/            # ML model loaders & inference (empty)
├── tests/                     # Pytest tests
├── scripts/                   # Local dev helpers
├── Dockerfile
├── pyproject.toml
└── requirements.txt
```

## Run locally

```bash
cp .env.example .env
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export PYTHONPATH=$PWD/src
uvicorn ai_service.main:app --reload --port 8000
```

Then:

```bash
curl http://localhost:8000/health
open http://localhost:8000/docs   # Auto-generated OpenAPI UI
```

Or via the helper script:

```bash
bash scripts/dev.sh
```

## Conventions

- All env loading via **pydantic-settings** — fails fast on missing/invalid values.
- All request/response bodies modelled with **Pydantic v2**.
- ML model lifecycle lives in `models/`, called from `domain/` services, exposed via `api/`.
- `infra/` is the only layer that knows about Postgres, Redis, OpenAI, or external services.
- Async-first: handlers should `async def` and use `httpx.AsyncClient` for outbound HTTP.

## Build container

```bash
docker build -t stylesense/ai-service .
docker run -p 8000:8000 --env-file .env stylesense/ai-service
```
