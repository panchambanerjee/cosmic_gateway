# Cosmic Gateway — Development Progress

**Motto:** A daily gateway from astronomy discoveries to genuine understanding.  
**Repo:** https://github.com/panchambanerjee/cosmic_gateway  
**Platform focus:** Web first (iOS/Android deferred)

Last updated: 2026-07-31

---

## Active plan

Public beta / usage validation: [docs/product/public-beta-validation-plan.md](./product/public-beta-validation-plan.md)

Original product/engineering plan: [docs/product/product-engineering-plan.md](./product/product-engineering-plan.md)

Architecture: [docs/architecture.md](./architecture.md)

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
- TipCandidate queue (metadata only)

### Admin
- `/admin` discovery queue and draft form
- Status transition controls with publish-gate blocking
- `/admin/tips` tip-candidate queue
- Tip import API + status updates (`new` / `triaged` / `used` / `rejected`)

### Seeded / published content (local seed)
**14 discoveries** (Quick / Learn / Deep), spanning JWST, stars, exoplanets, black holes / GW, cosmology, and solar system:

1. Early galaxies (JWST / SMACS) — redshift & spectroscopy
2. Betelgeuse companion (ESO + A&A; Space.com tip secondary)
3. Pillars of Creation (Webb)
4. Cosmic Cliffs / Carina (Webb)
5. Cassiopeia A supernova remnant (Webb)
6. Crab Nebula (Webb)
7. WASP-39b atmosphere / photochemistry (Webb)
8. K2-18b atmosphere signals (preliminary — uncertainty emphasized)
9. Sagittarius A* first image (EHT)
10. M87* first black hole image (EHT)
11. Neutron-star merger GW170817 (multi-messenger)
12. Neptune close-up (Webb)
13. Enceladus water plume (Webb)
14. Euclid Perseus cluster / dark universe

Also: **6 topics**, **20 concepts**, **3 lessons**, tip queue samples.

Launch seed lives in `packages/database/prisma/seed-launch-batch.ts` (plus original two in `seed.ts`).

### APIs (same Next.js app)
- `GET /api/v1/discoveries`
- `GET /api/v1/discoveries/[slug]`
- `GET|POST /api/v1/admin/discoveries`
- `POST /api/v1/admin/discoveries/[id]/transition`
- `GET|POST /api/v1/admin/tips`
- `PATCH /api/v1/admin/tips/[id]`
- `GET /api/health`

---

## To-dos

### Done
- [x] Web-first monorepo + Postgres + Prisma
- [x] Discovery vertical slice (API + web UI + depths + sources + credits)
- [x] Manual admin publish path with gates
- [x] Concept + lesson links from discoveries
- [x] Betelgeuse pilot + learning-term / Wikipedia links
- [x] TipCandidate queue (admin UI + API)
- [x] Markdown rendering for concepts/lessons
- [x] Public-beta validation plan filed under `docs/product/`

### In progress — Milestone 1 (public beta)
- [x] Production deploy scripts + env documentation (`db:migrate:deploy`, `vercel.json`, `.env.example`)
- [x] Health check with DB reachability (`GET /api/health`)
- [x] Signed-cookie admin auth for `/admin` and `/api/v1/admin` (+ preview write lock)
- [x] README deployment instructions
- [ ] Deploy to Vercel + managed Postgres (manual account step)

### Next after Milestone 1
- [ ] Milestone 2: analytics + reading progress
- [ ] Milestone 3: end-of-article feedback
- [ ] Milestone 4: sharing, OG, sitemap, privacy
- [ ] Milestone 5: launch content inventory + 4-week beta
- [ ] Milestone 6: Today in Astronomy (only after P0 stable)

### Explicitly not next
- [ ] Scraping Space.com HTML as canonical text
- [ ] Auto-publish without review
- [ ] Native iOS/Android
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
