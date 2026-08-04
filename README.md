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
- `GET http://localhost:3000/api/health`

Admin (same app): [http://localhost:3000/admin](http://localhost:3000/admin)

### Local admin auth

- With empty `AUTH_SECRET` / password vars, development uses **open admin** (no login).
- To require login locally, generate credentials and put them in `.env`:

```bash
pnpm hash-admin-password -- "your-strong-password"
# paste AUTH_SECRET, ADMIN_PASSWORD_HASH, ADMIN_USERNAME into .env
```

Prefer `ADMIN_PASSWORD_HASH` over plaintext `ADMIN_PASSWORD`.

## Production / Vercel deploy

1. Create a managed Postgres database (Neon, Supabase, Vercel Postgres, etc.).
2. In Vercel, import the GitHub repo (`panchambanerjee/cosmic_gateway`).
3. Configure build settings:

| Setting | Value |
|---------|--------|
| Root Directory | `apps/web` |
| Framework Preset | Next.js |
| Install / Build | Prefer defaults — `apps/web/vercel.json` runs `db:generate`, `db:migrate:deploy`, then the web build |

If you override Install/Build in the Vercel UI, they **must** start with `cd ../.. &&`. Without that, cwd is `apps/web` and you get `db:migrate:deploy` not found.

Do **not** leave Project Settings Build Command as `pnpm db:migrate:deploy && …` alone — that matches the old root `vercel.json` failure mode.

Environment variables (Production):

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | yes | Production Postgres connection string |
| `AUTH_SECRET` | yes | Long random string (from hash script) |
| `ADMIN_USERNAME` | yes | Default `admin` |
| `ADMIN_PASSWORD_HASH` | yes | From `pnpm hash-admin-password` |
| `NEXT_PUBLIC_SITE_URL` | yes | `https://your-domain` |
| `ALLOW_ADMIN_WRITES_ON_PREVIEW` | no | Defaults to blocked writes on Vercel preview |

Do **not** run `pnpm db:seed` against production automatically. Seed is for local demo content only.

After deploy:

- Public site should load over HTTPS
- `GET /api/health` should return `database: "reachable"` with HTTP 200
- `/admin` should redirect to `/admin/login` until signed in
- Preview deployments reject admin mutations unless `ALLOW_ADMIN_WRITES_ON_PREVIEW=true`

## Useful commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Next.js |
| `pnpm db:migrate` | Apply Prisma migrations (dev) |
| `pnpm db:migrate:deploy` | Apply migrations (production) |
| `pnpm db:seed` | Seed sample discovery + concept + lesson |
| `pnpm db:studio` | Prisma Studio |
| `pnpm hash-admin-password -- "pw"` | Generate admin hash + AUTH_SECRET |
| `pnpm typecheck` | TypeScript across packages |
| `pnpm lint` | Lint |
| `pnpm build` | Generate Prisma client + production build |

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

Public beta / validation plan: [docs/product/public-beta-validation-plan.md](docs/product/public-beta-validation-plan.md).

Architecture: [docs/architecture.md](docs/architecture.md).

Content link inventory (articles → concepts / lessons / Wikipedia): [docs/content/article-concept-links.md](docs/content/article-concept-links.md).

## Progress and backlog

See [docs/PROGRESS.md](docs/PROGRESS.md) for what is built, what is done, and what is next.
