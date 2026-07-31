# Cosmic Gateway

**Motto:** A daily gateway from astronomy discoveries to genuine understanding.

Web-first astronomy learning product. Discoveries connect to concepts, lessons, sources, and evidence status.

## Stack (Phase 0)

- pnpm workspace monorepo
- Next.js (`apps/web`) — public UI + `/api/v1` route handlers
- PostgreSQL (Docker Compose)
- Prisma (`packages/database`)
- Shared Zod contracts (`packages/contracts`)

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) 9+ (`corepack enable && corepack prepare pnpm@9.15.9 --activate`)
- Docker Desktop running

## Local setup

```bash
# 1. Clone
git clone https://github.com/panchambanerjee/cosmic_gateway.git
cd cosmic_gateway

# 2. Environment
cp .env.example .env

# 3. Start Postgres
docker compose up -d

# 4. Install dependencies
pnpm install

# 5. Migrate + seed
pnpm db:migrate
pnpm db:seed

# 6. Run the web app
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

API examples:

- `GET http://localhost:3000/api/v1/discoveries`
- `GET http://localhost:3000/api/v1/discoveries/<slug>`

Admin (same app): [http://localhost:3000/admin](http://localhost:3000/admin)

Optional: set `ADMIN_PASSWORD` in `.env` to require a simple cookie gate for admin routes.

## Useful commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Next.js |
| `pnpm db:migrate` | Apply Prisma migrations |
| `pnpm db:seed` | Seed sample discovery + concept + lesson |
| `pnpm db:studio` | Prisma Studio |
| `pnpm typecheck` | TypeScript across packages |
| `pnpm lint` | Lint |
| `pnpm build` | Production build |

## Git remote

Repository: [https://github.com/panchambanerjee/cosmic_gateway](https://github.com/panchambanerjee/cosmic_gateway)

```bash
git remote -v
# origin  https://github.com/panchambanerjee/cosmic_gateway.git
```

After local commits:

```bash
git push -u origin main
```

Never commit `.env`. Only `.env.example` is tracked.

## Product plan

See [docs/product/product-engineering-plan.md](docs/product/product-engineering-plan.md).
