# core-api

Node.js + Express + TypeScript service. Owns auth, users, salons, stylists, bookings, payments, CRM, and POS.

## Layout

```
core-api/
├── src/
│   ├── index.ts            # Process entrypoint (boot + signal handling)
│   ├── app.ts              # Express app composition
│   ├── config/             # Env loading + validation (zod)
│   ├── api/                # HTTP route handlers (presentation layer)
│   ├── domain/             # Business entities and rules (empty)
│   ├── infra/              # DB, cache, external API clients (empty)
│   └── middleware/         # Cross-cutting concerns (auth, errors)
├── tests/                  # Vitest tests
├── scripts/                # Local dev helpers
├── Dockerfile
├── package.json
└── tsconfig.json
```

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

Then:

```bash
curl http://localhost:4000/health
```

## Build for production

```bash
npm run build
npm start
```

## Conventions

- All input validated with **zod** at the API boundary.
- All config validated with **zod** at boot — invalid env fails fast.
- HTTP errors thrown as `HttpError` from `middleware/error.ts`.
- No domain logic in `api/` — handlers should call into `domain/` services only.
- `infra/` is the only layer that knows about Postgres, Redis, or external services.
