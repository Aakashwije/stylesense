# StyleSense Backend

Polyglot microservices powering StyleSense. Each service owns a bounded context, exposes HTTP (and WebSocket where needed), and is independently buildable, runnable, and deployable.

## Services

| Service              | Language          | Port (default) | Purpose                                                       |
| -------------------- | ----------------- | -------------- | ------------------------------------------------------------- |
| **core-api**         | Node.js + Express | `4000`         | Auth, users, salons, stylists, bookings, payments, CRM, POS   |
| **ai-service**       | Python + FastAPI  | `8000`         | Recommendations, hair analysis, chatbot, virtual try-on       |
| **realtime-service** | Go + Gorilla WS   | `5000`         | WebSocket live queue, booking events, stylist presence, notifications |

Shared data plane: **PostgreSQL** (primary store) and **Redis** (cache, sessions, pub/sub).

## Layout

```
backend/
├── docker-compose.yml           # Orchestrates services + Postgres + Redis
├── .env.example                 # Shared env template (copy to .env)
├── core-api/                    # Node.js service
├── ai-service/                  # Python service
└── realtime-service/            # Go service
```

Each service follows the same high-level shape so they're easy to navigate:

```
<service>/
├── README.md           # Service-specific docs
├── Dockerfile          # Container build
├── .env.example        # Service env template
├── src/ (or cmd+internal for Go)
│   ├── api/            # HTTP / WS handlers (presentation layer)
│   ├── domain/         # Business entities & rules
│   ├── infra/          # DB, cache, external clients
│   └── config/         # Config loaders
├── tests/
└── scripts/
```

## Quickstart

```bash
cp .env.example .env
docker compose up --build
```

Once up, hit the health endpoints:

```bash
curl http://localhost:4000/health   # core-api
curl http://localhost:8000/health   # ai-service
curl http://localhost:5000/health   # realtime-service
```

## Local development (without Docker)

Each service has its own `README.md` with native dev instructions. In short:

- `core-api`: `npm install && npm run dev`
- `ai-service`: `pip install -r requirements.txt && uvicorn ai_service.main:app --reload`
- `realtime-service`: `go run ./cmd/realtime`

## Service-to-service communication

- **Sync**: HTTP/JSON over the internal network. No direct DB sharing — each service talks to others through their public APIs.
- **Async**: Redis pub/sub for events the realtime service broadcasts to connected clients.
- **Auth**: `core-api` issues JWTs. `ai-service` and `realtime-service` verify them via shared secret (see `.env.example`).

## Status

All three services are scaffolded with a working `/health` endpoint and a clean layered structure. Domain logic, persistence, and integrations are intentionally empty — fill them in feature by feature.
