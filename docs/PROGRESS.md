# Cosmic Gateway — Development Progress

**Motto:** A daily gateway from astronomy discoveries to genuine understanding.  
**Repo:** https://github.com/panchambanerjee/cosmic_gateway  
**Platform focus:** Web first (iOS/Android deferred)

Last updated: 2026-07-31

---

## What we have built

### Foundation
- pnpm monorepo: `apps/web`, `packages/database`, `packages/contracts`
- Docker Compose Postgres + Prisma migrations/seed
- Local README and `.env.example`
- Git remote wired to `panchambanerjee/cosmic_gateway`

### Public web experience
- Home with brand + motto hero
- Discoveries list and detail pages
- Quick / Learn / Deep reading depths
- Evidence-status badges
- Credited hero images (rights metadata required)
- Source lists (primary sources first; news tips labeled secondary)
- Concepts and lessons linked from discoveries
- Markdown rendering for concept/lesson bodies (no raw `##` in UI)
- Learning-term chips + in-body concept links on discovery pages
- Concept “Go deeper” links (Wikipedia / further reading)

### Content model
- Topics, Discoveries + versions, Sources, Image assets
- Concepts (with `wikipediaUrl` / `externalUrl`)
- Lessons, quizzes schema reserved for later
- Publish gates: ≥1 source; image rights or no-image exception
- Editorial workflow states: draft → science review → rights review → ready → published → archived
- Audit log for status transitions

### Admin
- `/admin` discovery queue and draft form
- Status transition controls with publish-gate blocking
- `/admin/tips` tip-candidate queue (URL metadata only — no scrape/auto-publish)
- Tip import API + status updates (`new` / `triaged` / `used` / `rejected`)

### Seeded / published content (local seed)
1. Early galaxies (JWST / SMACS deep field) — with redshift & spectroscopy concepts
2. Betelgeuse companion (ESO + A&A primary; Space.com as tip) — with Betelgeuse, red-supergiant, binary-star, coronagraph concepts
3. Sample tip candidates in the admin tip queue

### APIs (same Next.js app)
- `GET /api/v1/discoveries`
- `GET /api/v1/discoveries/[slug]`
- `GET|POST /api/v1/admin/discoveries`
- `POST /api/v1/admin/discoveries/[id]/transition`
- `GET|POST /api/v1/admin/tips`
- `PATCH /api/v1/admin/tips/[id]`
- `GET /api/health`

---

## Product rules locked in

| Layer | Role |
|-------|------|
| Tip / secondary | Space.com, phys.org — signal only |
| Primary sources | ESO/NASA releases, papers |
| Our article | Quick / Learn / Deep + evidence status + credited image |
| Learning terms | In-app `/concepts/[slug]` |
| Deeper links | Wikipedia + papers / facility pages |

Do **not** scrape news bodies into published content. Do **not** auto-publish. Do **not** ship iOS/Android until web cadence works.

---

## To-dos

### Done
- [x] Web-first monorepo + Postgres + Prisma
- [x] Discovery vertical slice (API + web UI + depths + sources + credits)
- [x] Manual admin publish path with gates
- [x] Concept + lesson links from discoveries
- [x] Fix broken/misassigned hero images
- [x] Expand early-galaxies depth copy
- [x] Betelgeuse pilot (ESO + A&A + Space.com tip)
- [x] Concept Wikipedia/external URLs
- [x] Learning-term chips + concept linking in discovery reader
- [x] TipCandidate queue (admin UI + API)
- [x] Markdown rendering for concepts/lessons
- [x] Layout hydration/syntax fixes for local DX

### Next (recommended order)
- [ ] Re-seed / polish Carina “Cosmic Cliffs” as a third polished discovery if desired
- [ ] Expand Betelgeuse Learn/Deep word counts so reading times diverge more
- [ ] Deploy web (Vercel) + managed Postgres for a shareable URL
- [ ] Optional: email digest or web push after publishing cadence is real
- [ ] Optional: RSS poller that only creates TipCandidates (still human publish)
- [ ] Optional: LLM-assisted draft behind review gates (never public-direct)
- [ ] Later: Expo iOS/Android consuming the same API contracts
- [ ] Later: Today in Astronomy, search index, auth, quizzes

### Explicitly not next
- [ ] Scraping Space.com HTML as canonical text
- [ ] Auto-publish without review
- [ ] Planetarium / AR / unconstrained chatbot
- [ ] NestJS extraction or Kubernetes

---

## How to run locally

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Open http://localhost:3000  
Admin: http://localhost:3000/admin  
Tips: http://localhost:3000/admin/tips

---

## Key paths

| Path | Purpose |
|------|---------|
| [`apps/web`](../apps/web) | Next.js public UI + API routes |
| [`packages/database`](../packages/database) | Prisma schema, migrations, seed |
| [`packages/contracts`](../packages/contracts) | Shared Zod schemas |
| [`docs/product/product-engineering-plan.md`](./product/product-engineering-plan.md) | Full product/engineering plan |
| This file | Living progress + backlog |

---

## Success checks (current)

- Home shows distinct JWST and Betelgeuse imagery
- Discovery pages expose learning terms that open in-app concepts
- Concept pages link out to Wikipedia
- Sources list ESO/paper before news tips
- Tip queue accepts URLs without publishing them automatically
