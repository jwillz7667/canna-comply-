## CannaComply — Compliance & Operations SaaS (Monorepo)

CannaComply is a minimal but production-grade demo for a Cannabis Dispensary Compliance & Operations app. It includes a Next.js 14 frontend, a NestJS + TypeORM backend, Postgres via Docker, and an Nginx reverse proxy.

### Quickstart

1. From repo root:

```
cp .env.example .env
docker compose up --build
```

2. Open the services:

- Frontend: http://localhost:3000
- API: http://localhost:4000

3. In the frontend:

- Visit `/inventory` and click "Sync METRC" once to seed demo rows
- Visit `/compliance` to see demo alerts, use "Re-validate" and "Apply Fix"
- Visit `/dashboard` for health and recent activity
- Visit `/delivery` to view (stub) routes

### Architecture

- Frontend: Next.js 14 (App Router) + Tailwind + NextAuth (provider only) + Zustand
- Backend: NestJS + TypeORM (Postgres) with entities: Tenant, User, Membership, InventoryItem, ComplianceEvent
- Infra: Docker Compose for Postgres, Backend, Frontend, and Nginx reverse proxy
- CI: GitHub Actions to build

### Environment

Copy `.env.example` to `.env`. Defaults are set for local development:

- Database: Postgres on service `postgres` with db `cannacomply`, user `app`, pass `app_password`
- Frontend public: `NEXT_PUBLIC_API_URL=http://localhost:4000`, `NEXT_PUBLIC_TENANT_SLUG=demo`
- Backend CORS: `ALLOWED_ORIGINS=http://localhost:3000`

### Acceptance Checks

- Build completes with `docker compose up --build`
- API responds: `GET /inventory/list`
- Inventory sync: `POST /inventory/sync` populates 3 items; they appear in `/inventory`
- Compliance endpoints return data: `GET /compliance/health`, `GET /compliance/alerts`
- Frontend pages render without runtime errors: `/dashboard`, `/inventory`, `/compliance`, `/delivery`

### Notes

- Backend is permissive for demo: requests are accepted without validating JWT
- All requests should set `X-Tenant: demo` (frontend helper adds this header automatically)


