# Cosmic Gateway — Public Beta and Usage Validation Plan

**Status:** Ready for implementation  
**Audience:** Cursor / engineering contributors  
**Product:** Cosmic Gateway  
**Repository:** `panchambanerjee/cosmic_gateway`  
**Platform:** Web first  
**Document date:** 2026-07-31

---

## 1. Purpose

This document defines the next implementation phase for Cosmic Gateway.

The existing application already proves the core technical vertical slice:

- discoveries can be authored and published;
- every discovery supports Quick, Learn, and Deep reading depths;
- sources, evidence status, image rights, and credits are represented;
- discoveries connect to concepts and lessons;
- publication is controlled by human review gates;
- tip candidates are separated from canonical sources and published content.

The next phase is **not an architecture expansion**. It is a public validation phase designed to answer:

> Will curious adults repeatedly use Cosmic Gateway to understand astronomy discoveries?

Engineering work in this phase must prioritize:

1. making the application safely accessible on the public web;
2. measuring meaningful learning behavior;
3. collecting lightweight user feedback;
4. supporting a sustainable manual publishing cadence;
5. avoiding features that do not help validate repeated use.

---

## 2. Product hypothesis

### Primary hypothesis

Curious adults will return at least weekly to understand current astronomy discoveries when each discovery is explained at an appropriate depth and connected to approachable foundational concepts.

### Supporting hypotheses

1. Readers will use more than one reading depth.
2. A meaningful percentage of readers will follow discovery-to-concept links.
3. Readers will prefer scientifically qualified content over unsupported news aggregation.
4. A changing homepage and regular publishing cadence will create return behavior.
5. Readers will share pages that explain a difficult discovery clearly.

### Non-goals of this phase

This phase does not attempt to prove:

- willingness to pay;
- native mobile demand;
- demand for a planetarium or AR experience;
- demand for an unconstrained astronomy chatbot;
- demand for classroom administration;
- the scalability of automatic article generation;
- fully automated news ingestion or publishing.

---

## 3. Success definition

The beta should run for four weeks with an initial cohort of approximately 25–50 testers.

### Primary metric: Weekly Engaged Learners

A visitor counts as a Weekly Engaged Learner when, during a calendar week, they perform at least one of the following:

- reach 60% reading progress on a discovery;
- reach the completion threshold on a discovery;
- open an in-app concept from a discovery;
- complete a lesson;
- share a discovery;
- submit end-of-article feedback;
- return on a separate day and open another content item.

Anonymous visitors may be measured using the analytics provider's anonymous identifier. Authentication is not required for this phase.

### Directional beta signals

These thresholds are experiment targets, not universal product benchmarks.

| Metric | Encouraging signal |
|---|---:|
| Visitors reaching 60% of one discovery | 50% |
| Discovery readers opening a concept | 25% |
| Seven-day return rate | 20% |
| Readers opening at least two discoveries | 25% |
| Feedback marked “About right” | 70% |
| Readers sharing a page | 5–10% |
| Repeat requests for additional topics | Qualitative signal |

### Strong qualitative signals

Comments such as these matter more than visual compliments:

- “I finally understand what redshift means.”
- “The uncertainty section made the result feel more trustworthy.”
- “I came back to understand the next discovery.”
- “I clicked through because I wanted to learn the prerequisite concept.”

---

## 4. Current-state assumptions

The implementation may assume the following already exist:

```text
apps/web
packages/database
packages/contracts
```

The application uses:

- Next.js App Router;
- TypeScript;
- Prisma;
- PostgreSQL;
- pnpm workspaces;
- discovery list and detail pages;
- concept and lesson pages;
- an admin discovery workflow;
- a tip-candidate workflow;
- shared Zod contracts.

Before implementing any task, Cursor must inspect the current repository rather than assuming exact file names or schema fields.

Do not duplicate existing utilities, Prisma clients, UI components, enums, or API response contracts.

---

## 5. Phase scope

### P0 — Public beta blockers

1. Production deployment
2. Production-safe database workflow
3. Admin protection
4. Product analytics
5. Reading-progress tracking
6. End-of-article feedback
7. Social sharing and Open Graph metadata
8. SEO metadata, sitemap, robots rules, and canonical URLs
9. Basic privacy and feedback pages
10. Launch-quality content inventory

### P1 — During beta

1. Today in Astronomy
2. Topic browsing
3. Homepage latest-content improvements
4. Publication and update dates
5. Editorial preview
6. Source link-health checks
7. Lightweight weekly reporting

### P2 — Only after usage evidence

1. Email digest
2. RSS-to-TipCandidate polling
3. Search
4. Accounts and bookmarks
5. Topic following
6. Quizzes
7. LLM-assisted drafting behind existing review gates

### Explicitly excluded

- scraping news article bodies into canonical content;
- automatic publication;
- native iOS or Android applications;
- Kubernetes;
- extracting the API into NestJS;
- planetarium functionality;
- augmented reality;
- social networking;
- unrestricted generative chat;
- payment or subscription infrastructure.

---

# Part I — Production deployment

## 6. Deployment architecture

Use a deliberately simple deployment topology:

```text
GitHub repository
       |
       v
Vercel: Next.js web + route handlers
       |
       v
Managed PostgreSQL
```

Recommended production services:

- Vercel for the Next.js application;
- managed PostgreSQL compatible with Prisma;
- PostHog for product analytics;
- Sentry for runtime error monitoring, if added during this phase;
- the existing image source strategy unless application-owned image storage is already present.

The database vendor may be Prisma Postgres, Neon, Supabase, or another managed PostgreSQL service. Do not introduce vendor-specific database features unless required.

## 7. Environment separation

Support three environments:

| Environment | Purpose | Database |
|---|---|---|
| Local | Development | Docker Compose PostgreSQL |
| Preview | Pull request and branch previews | Isolated preview DB or read-only/safe shared strategy |
| Production | Public beta | Production managed PostgreSQL |

Minimum environment variables:

```bash
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=
ADMIN_USERNAME=
ADMIN_PASSWORD_HASH=
AUTH_SECRET=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

Optional:

```bash
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
VERCEL_ENV=
```

Do not commit production values.

Update `.env.example` with descriptions but no secrets.

## 8. Prisma deployment rules

1. Generate Prisma Client during installation or build.
2. Use `prisma migrate deploy` for production migrations.
3. Never use `prisma migrate dev` against production.
4. Do not run the local demo seed automatically during production deploys.
5. Separate demo/test seed behavior from production content initialization.
6. A failed migration must fail the deployment rather than leaving the application partially deployed.

Suggested scripts, adapted to the existing package structure:

```json
{
  "scripts": {
    "db:generate": "pnpm --filter @cosmic-gateway/database prisma generate",
    "db:migrate:deploy": "pnpm --filter @cosmic-gateway/database prisma migrate deploy",
    "build": "pnpm db:generate && pnpm --filter web build"
  }
}
```

Do not copy these scripts blindly. Inspect current package names and existing scripts first.

## 9. Production health checks

Extend `/api/health` to return a non-sensitive response:

```json
{
  "status": "ok",
  "service": "cosmic-gateway-web",
  "database": "reachable",
  "timestamp": "2026-07-31T16:00:00.000Z"
}
```

Requirements:

- perform a minimal database query;
- do not expose connection strings, database version, stack traces, or secrets;
- return HTTP 200 when healthy;
- return HTTP 503 when the database is unavailable;
- log the underlying error server-side.

## 10. Deployment acceptance criteria

- The public homepage loads from a shareable HTTPS URL.
- Public discovery, concept, and lesson pages work against production data.
- `/api/health` verifies database connectivity.
- admin pages are not publicly accessible without authentication.
- preview deployments cannot publish or modify production content.
- production deploys run Prisma Client generation.
- production migrations use `migrate deploy`.
- the public site does not reveal stack traces or environment variables.

---

# Part II — Admin protection

## 11. Authentication scope

Authentication in this phase is only for admin routes and write APIs.

Do not add general user accounts.

A simple implementation is acceptable provided that:

- credentials are not stored in plaintext;
- sessions are signed and use secure cookies;
- all admin pages are protected server-side;
- all admin mutation routes independently enforce authorization;
- unauthenticated requests receive a redirect or HTTP 401/403;
- production admin credentials come from environment variables or a secure datastore.

Possible approaches:

1. Auth.js credentials provider;
2. a small signed-cookie admin session;
3. identity-provider login restricted to an allowlisted email.

Prefer the smallest approach compatible with the current application.

## 12. Protected paths

Protect at minimum:

```text
/admin
/admin/**
/api/v1/admin/**
```

Do not rely only on hiding links in the UI.

## 13. Admin security requirements

- Use an HTTP-only session cookie.
- Set `secure` in production.
- Use `sameSite=lax` or stricter.
- Apply a reasonable session lifetime.
- Ensure logout invalidates the session.
- Use constant-time password/hash comparison where applicable.
- Never expose password hashes to client components.
- Return generic authentication failures.
- Preserve the existing audit log for editorial transitions.

## 14. Admin acceptance criteria

- An unauthenticated user cannot view `/admin`.
- An unauthenticated caller cannot invoke any admin mutation API.
- A logged-in admin can use the existing discovery and tip workflows.
- Logout removes admin access.
- Public read APIs continue to work without authentication.

---

# Part III — Analytics and event contracts

## 15. Analytics principles

Analytics exists to measure learning behavior, not to maximize surveillance.

Rules:

- do not capture article bodies, free-text feedback, email addresses, or secrets as generic event properties;
- avoid capturing full URLs when they may contain sensitive query parameters;
- do not enable session replay by default;
- keep event names stable and versioned through shared contracts;
- analytics failures must never break reading or publishing;
- use a clear opt-out path if legally or operationally required.

## 16. Analytics package

Create a small analytics abstraction rather than importing the vendor SDK throughout the UI.

Suggested location:

```text
apps/web/src/lib/analytics/
  client.ts
  events.ts
  properties.ts
  server.ts          # only if server events are needed
```

Suggested API:

```ts
export type AnalyticsEventName =
  | "home_viewed"
  | "discovery_opened"
  | "reading_depth_selected"
  | "discovery_progress"
  | "discovery_completed"
  | "concept_chip_clicked"
  | "concept_opened"
  | "source_clicked"
  | "image_credit_clicked"
  | "discovery_shared"
  | "feedback_submitted"
  | "return_visit";

export function captureEvent<T extends AnalyticsEventName>(
  event: T,
  properties: AnalyticsEventProperties[T]
): void;
```

Prefer compile-time property contracts over arbitrary `Record<string, unknown>` calls.

## 17. Shared event properties

Use a reusable content context:

```ts
export interface DiscoveryAnalyticsContext {
  discoveryId: string;
  discoverySlug: string;
  topicSlugs: string[];
  evidenceStatus: string;
  readingDepth?: "quick" | "learn" | "deep";
  publishedAt?: string;
}
```

Common properties may include:

```ts
export interface CommonAnalyticsProperties {
  route: string;
  referrerDomain?: string;
  deviceClass?: "mobile" | "tablet" | "desktop";
  appVersion?: string;
}
```

Do not send user-agent strings if the analytics SDK already derives device data.

## 18. Required events

### `home_viewed`

Trigger once per home-page view.

Properties:

```ts
{
  featuredDiscoverySlug?: string;
  latestDiscoveryCount: number;
}
```

### `discovery_opened`

Trigger after a published discovery renders successfully.

Properties:

```ts
DiscoveryAnalyticsContext & {
  entryPoint?: "home" | "discoveries" | "concept" | "external" | "unknown";
}
```

### `reading_depth_selected`

Trigger when the user changes between Quick, Learn, and Deep.

Properties:

```ts
DiscoveryAnalyticsContext & {
  previousDepth: "quick" | "learn" | "deep";
  selectedDepth: "quick" | "learn" | "deep";
}
```

### `discovery_progress`

Trigger only at milestone thresholds to avoid event spam.

Thresholds:

```text
25
60
90
```

Properties:

```ts
DiscoveryAnalyticsContext & {
  threshold: 25 | 60 | 90;
}
```

Each threshold should fire at most once per page view and depth.

### `discovery_completed`

Trigger when the reader reaches either:

- at least 90% of the content container; or
- the end-of-article section becomes visible for a stable interval.

Properties:

```ts
DiscoveryAnalyticsContext & {
  completionMethod: "scroll_90" | "end_section_visible";
  elapsedSeconds?: number;
}
```

Do not use time alone as completion.

### `concept_chip_clicked`

Trigger when a learning-term chip is clicked.

Properties:

```ts
DiscoveryAnalyticsContext & {
  conceptSlug: string;
  conceptLabel: string;
  placement: "chip" | "inline" | "related";
}
```

### `concept_opened`

Trigger on a concept detail page.

Properties:

```ts
{
  conceptId: string;
  conceptSlug: string;
  sourceDiscoverySlug?: string;
}
```

### `source_clicked`

Properties:

```ts
DiscoveryAnalyticsContext & {
  sourceType: "primary" | "secondary";
  sourceKind?: string;
  sourceDomain: string;
  sourcePosition: number;
}
```

Do not send full source URLs unless required.

### `image_credit_clicked`

Properties:

```ts
DiscoveryAnalyticsContext & {
  creditOrganization?: string;
  rightsStatus?: string;
}
```

### `discovery_shared`

Properties:

```ts
DiscoveryAnalyticsContext & {
  method: "native_share" | "copy_link" | "linkedin" | "x" | "facebook" | "email";
}
```

### `feedback_submitted`

Properties:

```ts
DiscoveryAnalyticsContext & {
  helpfulness: "yes" | "somewhat" | "no";
  level?: "too_basic" | "about_right" | "too_technical";
  hasComment: boolean;
}
```

The comment itself must be stored through the application API, not sent as an analytics property.

## 19. Return-visit definition

Record the last meaningful visit date in local storage or a first-party cookie.

A return visit occurs when:

- the user opens a content page on a calendar date later than the last meaningful visit;
- at least 12 hours have elapsed, to avoid midnight edge cases;
- the event is emitted no more than once per day.

The analytics provider's native retention tools may also be used. The local event is intended to make the product definition explicit.

## 20. Analytics acceptance criteria

- Events use a centralized typed API.
- No analytics vendor imports appear directly in random UI components.
- Scroll milestones fire once per depth and page view.
- analytics calls fail silently without affecting the reader.
- free-text feedback is not sent to analytics.
- a test or development mode makes events inspectable without polluting production analytics.
- the team can create a dashboard for weekly engaged learners, completion, concept click-through, depth use, return visits, and feedback levels.

---

# Part IV — Reading progress

## 21. Reading container requirements

Each discovery depth must expose a stable content container:

```html
<article data-reading-depth="learn" data-discovery-slug="...">
  ...
</article>
```

Measure progress relative to the article content, not the full document body. The footer, related content, and feedback form should not distort the calculation.

## 22. Scroll calculation

A reasonable calculation is:

```ts
const viewportBottom = window.scrollY + window.innerHeight;
const articleTop = article.offsetTop;
const articleHeight = article.offsetHeight;
const progress = (viewportBottom - articleTop) / articleHeight;
```

Clamp to `[0, 1]`.

Use throttling or `requestAnimationFrame`; do not perform expensive work for every raw scroll event.

Intersection observers may be used for end-of-article visibility.

## 23. Local reading state

Without authentication, optionally store lightweight local state:

```ts
interface LocalDiscoveryProgress {
  discoverySlug: string;
  depth: "quick" | "learn" | "deep";
  maxProgress: number;
  completed: boolean;
  lastReadAt: string;
}
```

Use this only to support future “continue reading” UI and deduplicate events. Do not treat local storage as authoritative server data.

## 24. Reading progress acceptance criteria

- Progress is calculated against the selected depth's article body.
- Switching depths resets milestone tracking for the new depth.
- Returning to an already-fired threshold does not create duplicate events in the same page view.
- keyboard navigation and browser zoom do not break the page.
- progress tracking does not cause visible layout shifts.

---

# Part V — Reader feedback

## 25. User experience

Place the feedback component after the discovery body and before or near related content.

### Step 1

**Did this help you understand the discovery?**

- Yes
- Somewhat
- Not really

### Step 2

**How was the level?**

- Too basic
- About right
- Too technical

### Optional comment

**What was still unclear?**

Maximum length: 1,000 characters.

The component should:

- require only the first answer;
- accept the second answer and comment optionally;
- show a simple success state;
- prevent accidental duplicate submissions;
- remain usable without authentication;
- be keyboard and screen-reader accessible.

## 26. Prisma model

Adapt names and enums to the current schema.

```prisma
model DiscoveryFeedback {
  id               String   @id @default(cuid())
  discoveryId      String
  discovery        Discovery @relation(fields: [discoveryId], references: [id], onDelete: Cascade)
  discoveryVersionId String?
  readingDepth     ReadingDepth
  helpfulness      FeedbackHelpfulness
  level            FeedbackLevel?
  comment          String?
  anonymousIdHash  String?
  userAgentClass   String?
  referrerDomain   String?
  createdAt        DateTime @default(now())

  @@index([discoveryId, createdAt])
  @@index([createdAt])
}

enum FeedbackHelpfulness {
  YES
  SOMEWHAT
  NO
}

enum FeedbackLevel {
  TOO_BASIC
  ABOUT_RIGHT
  TOO_TECHNICAL
}
```

Notes:

- `anonymousIdHash` is optional and should use a one-way hash if used for rate limiting or duplicate detection.
- Do not store raw IP addresses unless there is a clearly documented need and retention policy.
- Associating feedback with the published discovery version is strongly preferred when versioning already exists.

## 27. API contract

Suggested endpoint:

```text
POST /api/v1/discoveries/[slug]/feedback
```

Request:

```json
{
  "readingDepth": "learn",
  "helpfulness": "somewhat",
  "level": "about_right",
  "comment": "A diagram of the spectrum would help."
}
```

Response:

```json
{
  "data": {
    "accepted": true
  }
}
```

Validation requirements:

- discovery must exist and be published;
- values must match shared Zod enums;
- comment is trimmed and length-limited;
- reject unknown fields if that is consistent with current contracts;
- rate-limit obvious abuse;
- sanitize output when comments are rendered in admin;
- never render comments as Markdown or HTML.

## 28. Admin feedback summary

Add a small read-only beta dashboard or section in the discovery admin page showing:

- total feedback count;
- helpfulness distribution;
- level distribution;
- recent comments;
- breakdown by reading depth.

This does not need advanced charting. A table and counts are enough.

## 29. Feedback acceptance criteria

- Feedback can be submitted anonymously.
- Invalid enum values and oversized comments return HTTP 400.
- Feedback is linked to a published discovery and preferably a version.
- comments are displayed as plain text in admin.
- submitting feedback emits `feedback_submitted` without sending comment text.
- the reader sees a success state without a full-page reload.

---

# Part VI — Sharing and metadata

## 30. Canonical site URL

Add a required `NEXT_PUBLIC_SITE_URL` value such as:

```text
https://cosmic-gateway.example
```

Normalize it without a trailing slash in a single utility.

Do not infer canonical production URLs from request headers when a configured production URL is available.

## 31. Page metadata

Use Next.js metadata APIs.

For every discovery, generate:

- title;
- concise description based on Quick copy or a dedicated SEO description;
- canonical URL;
- Open Graph type `article`;
- published time;
- modified time;
- hero image URL when rights allow its use in previews;
- image dimensions and alt text where available;
- topic tags;
- Twitter/X card metadata.

Example shape:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const discovery = await getPublishedDiscovery(params.slug);

  return {
    title: `${discovery.title} | Cosmic Gateway`,
    description: discovery.seoDescription ?? discovery.quickSummary,
    alternates: {
      canonical: `/discoveries/${discovery.slug}`
    },
    openGraph: {
      type: "article",
      title: discovery.title,
      description: discovery.seoDescription ?? discovery.quickSummary,
      url: `/discoveries/${discovery.slug}`,
      publishedTime: discovery.publishedAt?.toISOString(),
      modifiedTime: discovery.updatedAt.toISOString(),
      images: discovery.shareImage ? [discovery.shareImage] : []
    }
  };
}
```

Adapt to the existing data-access layer and Next.js version.

## 32. Image rights and social previews

A hero image must not automatically become a social preview.

Add or derive a field indicating whether the image may be used in generated link previews.

Possible schema addition:

```prisma
socialPreviewAllowed Boolean @default(false)
```

If preview use is not allowed:

- generate a branded text-based Cosmic Gateway OG image;
- include the discovery title, topic, and evidence status;
- do not embed the restricted image.

## 33. Share controls

Place share controls near the title and/or end of the article.

Support:

1. Web Share API when available;
2. copy link fallback;
3. optionally LinkedIn, X, Facebook, and email links.

The default shared text should be factual and restrained:

```text
Understand [Discovery Title] on Cosmic Gateway.
```

Do not generate sensationalized share copy.

## 34. Sitemap

Create `app/sitemap.ts` or the equivalent supported by the current Next.js version.

Include:

- home;
- discoveries index;
- every published discovery;
- every published concept;
- every published lesson;
- Today in Astronomy pages when implemented.

Exclude:

- admin pages;
- drafts;
- preview-only routes;
- API routes;
- login pages unless intentionally indexed.

## 35. Robots rules

Create `app/robots.ts`.

Allow public pages and disallow:

```text
/admin/
/api/v1/admin/
```

Reference the sitemap.

Do not use robots rules as a security mechanism; admin authentication remains mandatory.

## 36. Structured data

Add JSON-LD where practical.

Discovery pages may use `Article` or `NewsArticle` depending on content semantics. Include only properties supported by the actual content.

Potential properties:

- headline;
- description;
- image, only when preview rights allow;
- datePublished;
- dateModified;
- author or publisher;
- mainEntityOfPage;
- about topics.

Do not claim review, authorship, or organization details that are not represented.

## 37. Metadata acceptance criteria

- Every published discovery has a unique title and description.
- Canonical URLs use the production site URL.
- share previews work with either an allowed discovery image or a branded fallback.
- unpublished content does not appear in the sitemap.
- admin paths are excluded from indexing.
- share actions emit `discovery_shared`.

---

# Part VII — Privacy, accessibility, and trust

## 38. Privacy page

Add a plain-language `/privacy` page stating:

- what analytics are collected;
- whether cookies or local storage are used;
- whether session replay is enabled;
- what feedback data is stored;
- that comments should not include personal information;
- how a user can request deletion if applicable;
- the contact method for privacy questions.

Do not copy a generic policy that describes features the application does not use.

## 39. Accessibility requirements

The beta must preserve:

- semantic heading hierarchy;
- descriptive link text;
- image alt text;
- visible keyboard focus;
- full keyboard access to depth controls and feedback buttons;
- form labels and error messages;
- sufficient contrast;
- reduced-motion preferences;
- no information communicated by color alone.

Evidence-status badges must have readable text, not only color.

## 40. Trust requirements

Every published discovery must continue to show:

- evidence status;
- primary sources before secondary tips;
- image credit and rights information;
- publication date;
- updated date when materially revised;
- uncertainty or limitations where applicable.

Do not weaken existing publish gates to increase cadence.

---

# Part VIII — Launch content

## 41. Minimum launch inventory

Before actively recruiting testers, target:

- 8–12 polished discoveries;
- 15–20 concepts;
- 3–5 lessons;
- 3 topic landing pages;
- one featured item on the homepage;
- enough content that a visitor can follow at least three discovery-to-concept paths.

Suggested discovery distribution:

| Area | Count |
|---|---:|
| JWST and early galaxies | 3 |
| Stars and stellar evolution | 2 |
| Exoplanets | 2 |
| Black holes or gravitational waves | 2 |
| Cosmology | 2 |
| Solar system or mission science | 1 |

## 42. Reading-depth editorial contract

### Quick

- target 100–180 words;
- one central finding;
- no assumed specialist knowledge;
- one explicit uncertainty or qualification;
- one main image where rights permit.

### Learn

- target 500–900 words;
- explain discovery method;
- explain why the result matters;
- link prerequisite concepts;
- include a clear uncertainty section;
- use diagrams or annotations when genuinely helpful.

### Deep

- target 1,500–2,500 words;
- observational setup;
- instrument and method;
- evidence chain;
- alternative interpretations;
- limitations;
- primary paper, data, and facility links.

These are editorial targets, not hard database validators.

## 43. Content quality checklist

For every launch discovery:

```text
[ ] Title is accurate and not sensationalized
[ ] Quick, Learn, and Deep are meaningfully distinct
[ ] Evidence status is correct
[ ] At least one primary source is present
[ ] Secondary sources are labeled as tips/secondary
[ ] Image rights and attribution are complete
[ ] Social-preview rights are separately verified
[ ] In-app concept links work
[ ] External links are valid
[ ] Uncertainty is explained
[ ] Markdown renders correctly
[ ] Mobile layout is readable
[ ] Metadata and share preview are correct
```

---

# Part IX — Today in Astronomy

## 44. Feature purpose

Today in Astronomy gives the homepage a daily-changing reason to visit without requiring a new major discovery every day.

Keep the first version small and editorially controlled.

## 45. Data model

Adapt to existing enums and naming conventions:

```prisma
model HistoricalEvent {
  id               String   @id @default(cuid())
  slug             String   @unique
  month            Int
  day              Int
  year             Int?
  title            String
  quickSummary     String
  bodyMarkdown     String
  significance     String?
  evidenceStatus   EvidenceStatus
  editorialStatus  EditorialStatus
  imageAssetId     String?
  imageAsset       ImageAsset? @relation(fields: [imageAssetId], references: [id])
  publishedAt      DateTime?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  sources          HistoricalEventSource[]
  concepts         HistoricalEventConcept[]

  @@index([month, day, editorialStatus])
}
```

Join models should follow the repository's existing source and concept relation patterns.

## 46. Public routes

```text
/today
/today/[month]-[day]
```

The home page should show one published event matching the visitor's current date. Use a deterministic fallback when multiple events exist, such as:

1. featured flag;
2. editorial priority;
3. earliest published ID.

Do not randomly change the event during the same day.

## 47. Initial scope

Seed 30–50 manually reviewed historical events.

Each event should answer:

- What happened?
- Why did it matter?
- What changed afterward?
- Which concept can the reader learn next?

Do not build automatic historical-event generation in this phase.

## 48. Today in Astronomy acceptance criteria

- The home page shows a deterministic event for the current month and day.
- Event pages show sources, evidence status, and image credits.
- Events support concept links.
- Draft events are never public.
- Events appear in the sitemap only when published.

---

# Part X — Beta operations

## 49. Publishing cadence

Run a four-week manual beta cadence:

| Day | Publication |
|---|---|
| Monday | Major discovery |
| Wednesday | Concept or lesson |
| Friday | Short discovery or historical feature |
| Weekend | Social recap or tester outreach |

The exact days may change. Consistency matters more than volume.

## 50. Tester recruitment

Recruit approximately 25–50 people across:

- curious non-specialists;
- university students;
- amateur astronomers;
- science communicators;
- technical readers outside astronomy;
- a small number of astronomy professionals for accuracy feedback.

Do not recruit only astrophysicists.

## 51. Tester feedback process

In addition to in-product feedback, conduct at least five short interviews.

Ask:

1. What did you think Cosmic Gateway was for after your first visit?
2. Which discovery did you choose and why?
3. Did you switch reading depths?
4. Did you open a concept? Why or why not?
5. What remained unclear?
6. What would make you return next week?
7. Would you share this with anyone? Who?
8. Was any evidence or uncertainty label confusing?

Do not lead with monetization questions.

## 52. Weekly beta report

Create a repeatable report containing:

```text
Week:
Visitors:
Weekly Engaged Learners:
Discovery opens:
60% completion rate:
Full completion rate:
Concept click-through rate:
Depth distribution:
Seven-day return rate:
Feedback helpfulness:
Feedback level distribution:
Top discovery:
Top concept:
Main qualitative insight:
Main product problem:
Decision for next week:
```

A Markdown file under `docs/beta/` is sufficient.

---

# Part XI — Implementation order

## 53. Milestone 1 — Public deployment and security

Tasks:

```text
[ ] Inspect monorepo build and package names
[ ] Configure production database
[ ] Add safe Prisma deploy scripts
[ ] Add production environment variables
[ ] Deploy Next.js app
[ ] Extend health check
[ ] Protect /admin and /api/v1/admin/**
[ ] Confirm preview/production data isolation
[ ] Update README deployment instructions
```

Exit criteria:

- public URL works;
- admin is protected;
- production data can be published safely.

## 54. Milestone 2 — Analytics and progress

Tasks:

```text
[ ] Add analytics provider and application wrapper
[ ] Define typed event contracts
[ ] Capture home and discovery opens
[ ] Capture depth changes
[ ] Implement article-relative progress milestones
[ ] Capture discovery completion
[ ] Capture concept and source clicks
[ ] Add local return-visit marker
[ ] Build initial analytics dashboard
[ ] Add tests for deduplication and event properties
```

Exit criteria:

- the team can measure the primary beta behaviors.

## 55. Milestone 3 — Feedback

Tasks:

```text
[ ] Add Prisma feedback model and migration
[ ] Add Zod request/response contracts
[ ] Add public feedback API
[ ] Add accessible two-step feedback component
[ ] Add optional plain-text comment
[ ] Add basic abuse protection
[ ] Add admin feedback summary
[ ] Emit privacy-safe feedback event
```

Exit criteria:

- every discovery can collect structured feedback.

## 56. Milestone 4 — Shareability and discovery

Tasks:

```text
[ ] Add configured canonical site URL
[ ] Add page-level generateMetadata
[ ] Add social-preview rights field or derivation
[ ] Add branded OG fallback image
[ ] Add share controls
[ ] Add sitemap
[ ] Add robots rules
[ ] Add JSON-LD
[ ] Add privacy page
[ ] Verify link previews on representative services
```

Exit criteria:

- discoveries are shareable, indexable, and rights-safe.

## 57. Milestone 5 — Launch content and beta

Tasks:

```text
[ ] Publish 8–12 polished discoveries
[ ] Publish 15–20 concepts
[ ] Publish 3–5 lessons
[ ] Add topic browsing or landing pages
[ ] Recruit first tester cohort
[ ] Run four-week publishing cadence
[ ] Produce weekly beta reports
[ ] Conduct five interviews
[ ] Make continue/pivot decisions from evidence
```

Exit criteria:

- four weeks of user behavior and qualitative evidence exist.

## 58. Milestone 6 — Today in Astronomy

This milestone can run during beta after P0 is stable.

Tasks:

```text
[ ] Add historical-event schema and migration
[ ] Add admin CRUD and review workflow
[ ] Add public today routes
[ ] Add homepage card
[ ] Add concept/source/image relations
[ ] Seed 30–50 reviewed events
[ ] Add sitemap support
```

---

# Part XII — Testing strategy

## 59. Unit tests

Cover:

- analytics event property builders;
- progress threshold calculation;
- duplicate-threshold suppression;
- canonical URL builder;
- feedback validation;
- social-preview eligibility;
- Today in Astronomy date selection;
- publish visibility filters.

## 60. Integration tests

Cover:

- published discovery feedback submission;
- draft discovery feedback rejection;
- admin authorization on write APIs;
- health check with reachable/unreachable database;
- sitemap excludes drafts and admin routes;
- metadata generation for image-allowed and image-disallowed cases.

## 61. End-to-end tests

Representative flows:

### Reader flow

```text
Open home
→ open discovery
→ switch from Quick to Learn
→ scroll past 60%
→ open a concept
→ return to discovery
→ submit feedback
→ copy share link
```

### Admin flow

```text
Open /admin while logged out
→ authenticate
→ open discovery queue
→ preview a draft
→ attempt invalid publish and see gate failure
→ complete requirements
→ publish successfully
```

### Rights fallback flow

```text
Open a discovery whose hero image cannot be used socially
→ verify hero credit remains visible on page
→ verify page metadata uses branded fallback OG image
```

## 62. Performance checks

- Optimize hero images through the existing Next.js image strategy.
- Avoid loading analytics synchronously before meaningful content.
- Avoid shipping the admin bundle to public pages where possible.
- Keep feedback interaction client-side without turning entire discovery pages into client components.
- Avoid re-fetching full discovery data for metadata and rendering when the data layer can cache safely.

---

# Part XIII — Definition of done

A task is done only when:

- code follows existing monorepo conventions;
- contracts are shared where appropriate;
- Prisma migrations are included;
- authorization is enforced server-side;
- accessibility is considered;
- error and empty states are implemented;
- tests are added or updated;
- README or relevant docs are updated;
- no existing publishing or image-rights gate is bypassed;
- `pnpm lint`, `pnpm typecheck`, tests, and production build pass using repository-supported commands.

---

# Part XIV — Cursor operating instructions

## 63. Rules for Cursor

When implementing this plan:

1. Inspect the repository before proposing changes.
2. Reuse existing components, enums, schemas, and data-access patterns.
3. Do not invent package names or aliases without verifying them.
4. Keep public and admin concerns separated.
5. Prefer server components for data-heavy public pages.
6. Use client components only for interaction such as depth controls, analytics milestones, sharing, and feedback.
7. Keep analytics vendor calls behind an application abstraction.
8. Add migrations; do not edit an already-applied migration.
9. Do not alter scientific or editorial content unless explicitly asked.
10. Never weaken source, image-rights, evidence-status, or publishing gates.
11. Do not introduce auth for public users.
12. Do not add RSS, LLM drafting, mobile apps, payments, or unrelated infrastructure during P0.
13. Finish one vertical slice at a time.
14. After each slice, run the repository's lint, typecheck, test, and build commands.
15. Summarize changed files, migrations, environment variables, and manual setup steps.

---

# Part XV — Ready-to-paste Cursor prompts

## 64. Prompt 1 — Repository audit

```text
Read docs/product/public-beta-validation-plan.md and inspect the current Cosmic Gateway repository.

Do not modify code yet.

Produce a repository-specific implementation map for Milestone 1 only:
- identify the actual package names and build scripts;
- identify the Prisma schema and client setup;
- identify all /admin pages and /api/v1/admin routes;
- identify current middleware/auth code, if any;
- identify current environment variables;
- identify the current /api/health implementation;
- identify deployment blockers for Vercel and managed PostgreSQL.

Return:
1. current-state findings;
2. exact files likely to change;
3. proposed implementation order;
4. risks or conflicts with existing code;
5. verification commands.

Do not invent paths. Cite actual repository paths in your answer.
```

## 65. Prompt 2 — Deployment and admin protection

```text
Implement Milestone 1 from docs/product/public-beta-validation-plan.md using the current repository conventions.

Requirements:
- make the pnpm monorepo deployable to Vercel;
- ensure Prisma Client is generated during production builds;
- use prisma migrate deploy for production migrations;
- do not run demo seed data automatically in production;
- extend /api/health with a minimal safe database reachability check;
- protect /admin/** and /api/v1/admin/** server-side;
- use the smallest secure admin-only authentication approach compatible with the repo;
- use HTTP-only signed/secure cookies;
- update .env.example and README;
- preserve all existing editorial workflows and publish gates.

Before editing, briefly state the exact implementation approach based on the code you inspected. Then implement it.

After implementation:
- run lint;
- run typecheck;
- run tests;
- run production build;
- report changed files, new environment variables, migration impact, and manual deployment steps.
```

## 66. Prompt 3 — Analytics vertical slice

```text
Implement Milestone 2 from docs/product/public-beta-validation-plan.md.

First inspect the current discovery reader, depth selector, concept links, source links, and application providers.

Implement a typed analytics abstraction and PostHog integration without scattering vendor imports across UI components.

Required events:
- home_viewed
- discovery_opened
- reading_depth_selected
- discovery_progress at 25, 60, and 90
- discovery_completed
- concept_chip_clicked
- concept_opened
- source_clicked
- image_credit_clicked
- discovery_shared
- return_visit

Requirements:
- progress is measured against the active article container, not document body;
- each threshold fires once per page view and depth;
- analytics failure never breaks reading;
- development events are inspectable without polluting production;
- do not send article text, personal information, or full sensitive URLs;
- preserve server-component rendering where possible;
- add unit tests for progress and event-property logic.

Run repository verification commands and summarize the analytics dashboard queries needed for Weekly Engaged Learners, completion, concept click-through, depth use, and return visits.
```

## 67. Prompt 4 — Reader feedback vertical slice

```text
Implement Milestone 3 from docs/product/public-beta-validation-plan.md.

Inspect the existing Prisma enums, discovery versioning, shared Zod contracts, public route-handler patterns, and admin UI before editing.

Build:
- a DiscoveryFeedback Prisma model associated with the published discovery and version when possible;
- enums for helpfulness and content level, reusing existing naming conventions;
- a migration;
- shared request/response Zod contracts;
- POST /api/v1/discoveries/[slug]/feedback;
- an accessible end-of-article feedback component;
- optional plain-text comments limited to 1,000 characters;
- duplicate/abuse protection that does not require public user accounts;
- an admin feedback summary with counts and recent comments;
- feedback_submitted analytics without sending comment text.

Do not render comments as HTML or Markdown. Do not store raw IP addresses.

Add tests for valid submission, invalid enums, oversized comments, draft discovery rejection, and plain-text admin rendering.

Run lint, typecheck, tests, and production build. Report changed files and migration commands.
```

## 68. Prompt 5 — SEO, metadata, and sharing

```text
Implement Milestone 4 from docs/product/public-beta-validation-plan.md using the current Next.js App Router conventions.

Build:
- a single canonical site URL utility using NEXT_PUBLIC_SITE_URL;
- page metadata for home, discoveries, concepts, and lessons;
- discovery-specific generateMetadata with canonical URL, article dates, topic information, and share image;
- a social-preview eligibility field or safe derivation that is independent from normal page-display rights;
- a branded generated OG fallback when a discovery image cannot be used for previews;
- accessible share controls with Web Share API and copy-link fallback;
- sitemap.ts containing only published public content;
- robots.ts excluding admin paths;
- accurate JSON-LD for discovery pages;
- analytics for share actions;
- tests for image-allowed and image-disallowed metadata.

Do not assume that a displayable hero image may be used in social previews. Preserve visible image attribution on the page.

Run verification commands and provide instructions for testing link previews.
```

## 69. Prompt 6 — Today in Astronomy

```text
Implement Milestone 6 from docs/product/public-beta-validation-plan.md after inspecting the existing Discovery, Source, ImageAsset, Concept, editorial-status, and audit-log models.

Add a small human-curated Today in Astronomy feature:
- HistoricalEvent schema and join models following existing repository patterns;
- source, concept, evidence-status, image-rights, and editorial workflow support;
- Prisma migration and shared contracts;
- admin list/create/edit/review/publish flow;
- /today and /today/[month]-[day] public routes;
- deterministic daily event selection;
- homepage card;
- sitemap inclusion for published events only;
- seed structure for manually reviewed events.

Do not add automatic content generation or automatic publication.

Add tests for date selection, draft exclusion, publish gates, and source/image requirements. Run all repository verification commands and summarize changed files.
```

## 70. Prompt 7 — Launch readiness audit

```text
Audit Cosmic Gateway against docs/product/public-beta-validation-plan.md without making changes first.

Check:
- production deployment configuration;
- production migration safety;
- admin authorization on pages and APIs;
- health check behavior;
- analytics event coverage and privacy;
- progress threshold deduplication;
- feedback validation and admin rendering;
- canonical metadata and share previews;
- social-preview image rights;
- sitemap and robots behavior;
- accessibility of depth controls, feedback, and share controls;
- public visibility filters for drafts;
- launch content inventory;
- README and environment setup.

Return a prioritized launch-blocker report with:
1. P0 blockers;
2. P1 issues;
3. exact repository evidence;
4. proposed patches;
5. verification steps.

Do not recommend mobile apps, payments, RSS ingestion, or LLM drafting unless all public-beta requirements are complete.
```

---

# Part XVI — Final go/no-go review

## 71. Continue criteria

After four weeks, continue investing when several of these are true:

- at least 20% seven-day return rate among the recruited cohort;
- readers regularly open linked concepts;
- more than one reading depth receives meaningful usage;
- feedback is predominantly “Yes” or “Somewhat” and “About right”;
- multiple users request more discoveries or topics;
- publishing cadence is operationally sustainable;
- users describe learning outcomes, not only visual appeal.

## 72. Pivot criteria

Reconsider the experience when:

- visitors consistently view images but do not read;
- concept click-through is negligible;
- return use remains low despite regular publishing;
- Quick/Learn/Deep is confusing or redundant;
- content production is unsustainably expensive in time;
- evidence-status and source structure overwhelm the intended audience.

Potential pivots should remain close to observed behavior, for example:

- shorter daily explainers;
- a weekly deep-dive publication;
- topic-specific learning tracks;
- educator-curated collections;
- a newsletter-first experience.

## 73. Monetization decision

Do not add monetization during this phase.

After demonstrated recurring use, possible non-intrusive models include:

- voluntary donations;
- memberships supporting the project;
- grants or educational sponsorships;
- institutional partnerships;
- premium advanced learning tracks.

The product may also remain free and mission-driven. Monetization is not required to validate usefulness.

---

## 74. Immediate next action

Begin with **Prompt 1 — Repository audit**, then implement Milestone 1.

Do not start Today in Astronomy, RSS polling, LLM drafting, quizzes, or native mobile work until the public deployment, admin protection, analytics, and feedback loop are functioning.
