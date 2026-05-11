# realtime-service

Go service. Owns WebSocket connections for live queue updates, booking events, stylist presence, and push notifications. Subscribes to Redis pub/sub for events emitted by `core-api`.

## Layout

```
realtime-service/
├── cmd/
│   └── realtime/
│       └── main.go         # Entrypoint (boot + signal handling)
├── internal/               # Not importable by other modules (Go convention)
│   ├── api/                # HTTP / WebSocket handlers (presentation layer)
│   ├── domain/             # Business entities and rules (empty)
│   ├── infra/              # Redis client, DB, external clients (empty)
│   └── config/             # Env loading + validation
├── pkg/                    # Exportable helpers (empty)
├── tests/                  # Integration tests
├── scripts/                # Local dev helpers
├── Dockerfile
└── go.mod
```

## Run locally

```bash
cp .env.example .env
export $(grep -v '^#' .env | xargs)
go mod tidy
go run ./cmd/realtime
```

Then:

```bash
curl http://localhost:5000/health
```

WebSocket echo for smoke-testing (replace with `wscat` or `websocat`):

```bash
websocat ws://localhost:5000/ws
```

## Conventions

- Layered: `cmd/` boots, `internal/api/` handles transport, `internal/domain/` holds rules, `internal/infra/` talks to Redis/Postgres.
- `internal/` blocks cross-module imports — by Go's rules, nothing outside this service can import it.
- Configuration via env vars only, validated at boot in `internal/config`.
- Graceful shutdown on `SIGINT` / `SIGTERM` with a 10s drain.

## Build container

```bash
docker build -t stylesense/realtime-service .
docker run -p 5000:5000 --env-file .env stylesense/realtime-service
```
