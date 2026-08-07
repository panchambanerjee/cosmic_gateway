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

Article ↔ concept / lesson links: [docs/content/article-concept-links.md](./content/article-concept-links.md)

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
- Summary / Article reading lengths
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
**25 discoveries** (Summary / Article), each with a **unique** hero image URL — no shared heroes across articles.

Varied across JWST, stars/stellar death, exoplanets/debris disks, black holes/quasars, cosmology/lensing, solar system, and multi-messenger:

**Original + launch batch (14)**  
1. Early galaxies (JWST / SMACS)  
2. Betelgeuse companion (ESO)  
3. Pillars of Creation  
4. Cosmic Cliffs / Carina  
5. Cassiopeia A  
6. Crab Nebula  
7. WASP-39b atmosphere  
8. K2-18b atmosphere signals (preliminary)  
9. Sagittarius A* (EHT)  
10. M87* (EHT)  
11. GW170817 neutron-star merger  
12. Neptune close-up  
13. Enceladus plume  
14. Euclid Perseus cluster  

**Expansion batch (11)** — `seed-expansion-batch.ts`  
15. Beta Pictoris debris disk  
16. HH 46/47 protostellar jets  
17. Stephan’s Quintet interactions  
18. Wolf–Rayet 124 winds  
19. M82 starburst galaxy  
20. Extremely red quasar + companions  
21. Cartwheel Galaxy collision  
22. Pandora’s Cluster lensed galaxies  
23. Ring Nebula  
24. DART asteroid impact  
25. Sagittarius C (galactic center)  

Also: **6 topics**, **~29 concepts**, **3 lessons**, tip queue samples.

**Editorial depth (all 25):** Summary ~110–150 words · Article ~1000–1200 (former Deep), with the same section structure across articles.

**Evidence badges:** `peer_reviewed` only when a paper source is linked (currently: Early galaxies, Betelgeuse, WASP-39b). Most others are `official_release`; K2-18b is `preliminary`; DART is `confirmed`. See [article-concept-links.md](./content/article-concept-links.md).

**Related discoveries:** Discoveries can link to each other; seeded clusters and the public “Related discoveries” section are documented in the same content inventory.

Seed entry: `packages/database/prisma/seed.ts` → launch + expansion batches.

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
