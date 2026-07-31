# Astronomy Learning App

## Product and Engineering Build Plan

**Working title:** Cosmic Gateway  
**Platforms:** iOS, Android, Web  
**Primary audience:** Curious adults, students, and astronomy enthusiasts without formal astronomy training  
**Document purpose:** A Cursor-ready specification for product design, architecture, data modeling, API implementation, content operations, testing, and phased delivery.

---

## 1. Product vision

Build a trusted, image-rich astronomy learning platform that turns current discoveries into understandable learning journeys.

The app should help a user answer three questions:

1. What happened in astronomy today?
2. Why does it matter?
3. What do I need to learn to understand it?

The product is not just a news feed. It is a learning gateway in which every discovery connects to concepts, lessons, missions, instruments, astronomical objects, historical events, and original sources.

### Product promise

> Explore what happened in astronomy today, understand why it matters, and build a lasting understanding of the universe.

### Product principles

- **Scientifically trustworthy:** Claims link to authoritative sources and preserve uncertainty.
- **Accessible by default:** Explanations begin with plain language and allow deeper technical detail.
- **Visually led:** Images, diagrams, spectra, timelines, and comparisons are part of the explanation.
- **Learning connected to news:** Current discoveries lead naturally into foundational concepts.
- **Transparent about evidence:** Preprints, peer-reviewed work, press releases, and disputed claims are clearly distinguished.
- **Useful in short sessions:** A user can learn something meaningful in two to five minutes.
- **Expandable:** The MVP should support later additions such as audio, classrooms, sky events, simulations, and localization.

---

## 2. Target users and jobs to be done

### Persona A: Curious explorer

- Reads popular science but lacks formal astronomy training.
- Wants clear explanations without jargon.
- Visits several times per week.
- Values striking imagery and short lessons.

**Job:** “Help me understand important astronomy discoveries without making me read a technical paper.”

### Persona B: Astronomy enthusiast

- Already knows basic terminology.
- Wants more detail, references, mission context, and instrument explanations.
- Saves articles and follows specific topics.

**Job:** “Help me go deeper and connect discoveries across missions and scientific concepts.”

### Persona C: Student

- Wants structured learning paths, quizzes, definitions, and progress tracking.
- May arrive through a teacher, social post, or search result.

**Job:** “Help me learn astronomy in a structured way and test whether I understand it.”

### Initial audience decision

Optimize the default experience for Persona A, while exposing optional intermediate and advanced layers for Personas B and C.

---

## 3. Product scope

### Core navigation

1. **Home**
2. **Discoveries**
3. **Learn**
4. **Today**
5. **Library/Profile**

A later version may add **Sky** as a sixth primary destination.

### Home

The home screen is a curated daily astronomy magazine.

Required modules:

- Featured discovery
- Astronomy image of the day
- Today in Astronomy card
- One recommended lesson
- Latest discoveries feed
- Continue learning
- Saved topics or followed topics
- Upcoming major astronomy event, when available

### Discoveries

A feed and searchable archive of current astronomy and cosmology developments.

Initial categories:

- James Webb Space Telescope
- Exoplanets and astrobiology
- Stars and stellar evolution
- Galaxies and galaxy evolution
- Black holes
- Cosmology and the early universe
- Gravitational waves
- Solar system science
- Missions and observatories
- Instruments and methods

Every discovery page should include:

- Headline
- Hero image with credit
- One-sentence summary
- Reading time
- Difficulty level
- Evidence status
- What happened
- Why it matters
- How it was measured
- What scientists thought before
- What remains uncertain
- Related concepts
- Related lessons
- Mission, instrument, object, and people links
- Original sources and papers
- Publication and update history
- Image credits and rights information

### Learn

Structured paths with short lessons.

Initial learning paths:

1. Astronomy foundations
2. The Solar System
3. Stars and stellar evolution
4. Galaxies
5. Black holes
6. Exoplanets and astrobiology
7. Observational astronomy
8. Cosmology
9. Relativity and gravity
10. Telescopes, detectors, and spectroscopy

Lesson components:

- Learning objectives
- Estimated time
- Prerequisite concepts
- Explanation sections
- Visuals or diagrams
- Vocabulary cards
- Worked intuition or analogy
- Optional mathematics block
- Three- to five-question quiz
- Related current discoveries
- Further reading

### Today in Astronomy

A calendar-based historical feature.

Entry types:

- Discovery anniversaries
- Mission launches and milestones
- Telescope first light
- Births and deaths of notable astronomers
- Publication of landmark results
- Planetary encounters
- Supernova or comet observations
- Major instrument or observatory events

Each entry should answer:

- What happened?
- Why did it matter then?
- What do we know now?
- What related lesson can the user take?

### Library and profile

- Saved discoveries
- Saved lessons
- Followed topics
- Learning progress
- Quiz history
- Notification settings
- Reading level preference
- Mathematics preference
- Theme and accessibility settings

---

## 4. Explanation-depth model

Every discovery supports three progressively deeper renderings built from the same reviewed source package.

### Quick

- 80 to 150 words
- Approximately 30 to 60 seconds
- No unexplained jargon
- One central takeaway

### Learn

- 500 to 900 words
- Approximately 3 to 6 minutes
- Introduces methods and context
- Links to prerequisite concepts

### Deep dive

- 1,200 to 2,500 words
- Approximately 10 to 20 minutes
- Includes methods, uncertainty, competing interpretations, plots, and paper links
- May include mathematics where appropriate

The content system should store these as separate reviewed fields rather than generating them live for each request.

---

## 5. MVP definition

### MVP hypothesis

Users will return regularly when current discoveries are connected to short, understandable lessons and compelling visual material.

### MVP features

- Email and social authentication
- Onboarding and topic selection
- Home feed
- Discoveries feed and detail pages
- JWST topic page
- Today in Astronomy
- Image-of-the-day integration
- Topic and concept pages
- Search
- Bookmarks
- Follow topics
- Learning paths and lessons
- Basic quizzes
- Progress tracking
- Push and email notification preferences
- Responsive web app
- iOS and Android apps
- Editorial admin dashboard
- Source citations
- Image credit and rights tracking
- Basic analytics and error reporting

### Seed content target

- 30 foundational lessons
- 60 concepts
- 75 historical events
- 20 mission, observatory, and instrument profiles
- 20 astronomical object profiles
- 20 reviewed discovery articles before public launch
- Daily or near-daily curated additions after launch

### Explicitly out of scope for MVP

- Full interactive planetarium
- Augmented reality constellations
- Social network or user comments
- User-generated science articles
- Live community rooms
- General-purpose unconstrained chatbot
- Complex achievements and leaderboards
- Classroom management
- Native tablet-specific layouts
- Live telescope control
- Large-scale localization

---

## 6. Success metrics

### North-star metric

**Weekly meaningful learning sessions**, where a meaningful session is one of:

- A discovery read beyond the quick summary
- A lesson completed
- A quiz completed
- Two or more connected concept pages explored

### Product metrics

- Activation: percentage completing onboarding and opening one discovery or lesson
- Day-1, Day-7, and Day-30 retention
- Weekly active learners
- Discovery-to-lesson conversion
- Lesson completion rate
- Quiz completion and retry rate
- Bookmarks per active user
- Topic follows per active user
- Notification open rate
- Search success rate
- Average content depth selected
- Percentage of sessions reaching an original source

### Content-quality metrics

- Correction rate
- Editorial rejection rate
- Time from source ingestion to publication
- Percentage of claims with source provenance
- Percentage of image assets with verified rights metadata
- Reader feedback on clarity and scientific accuracy

---

## 7. Recommended technology stack

### Repository model

Use a TypeScript monorepo with a separate Python service for ingestion and scientific content processing.

```text
cosmic-gateway/
  apps/
    web/                 # Next.js public web application
    mobile/              # Expo React Native iOS and Android
    admin/               # Next.js editorial console
    api/                 # NestJS or Fastify API
  services/
    ingestion/           # Python ingestion and content-processing workers
  packages/
    ui/                  # Shared tokens and selected components
    contracts/           # TypeScript schemas and API contracts
    database/            # ORM schema, migrations, seed helpers
    auth/                # Shared auth helpers
    analytics/           # Event definitions
    config/              # Shared lint, TypeScript, environment validation
  infrastructure/
    docker/
    terraform/           # Add after MVP infrastructure stabilizes
  docs/
    product/
    architecture/
    adr/
    api/
  scripts/
```

### Frontend

- **Web:** Next.js with TypeScript
- **Mobile:** React Native with Expo
- **Styling:** Tailwind-compatible web styling and NativeWind or shared design tokens on mobile
- **Server state:** TanStack Query
- **Client state:** Zustand only where local cross-screen state is necessary
- **Forms:** React Hook Form with schema validation
- **Rendering:** Server-render public discovery, lesson, topic, and historical pages for search visibility

### Backend

- Node.js API using NestJS or Fastify
- PostgreSQL as the canonical database
- Prisma or Drizzle ORM
- Redis for caching, rate limiting, and queues
- S3-compatible object storage for application-owned media derivatives
- Typesense, Meilisearch, or PostgreSQL full-text search for MVP
- Background jobs using BullMQ or a managed queue

### Ingestion and content processing

- Python
- FastAPI for internal endpoints
- Pydantic models
- Feed parsing and source-specific connectors
- Scheduled workers
- Deduplication and entity matching
- LLM-assisted drafting behind review gates
- Deterministic validation rules for sources, claims, dates, links, and image rights

### Infrastructure

A practical MVP deployment:

- Managed PostgreSQL
- Managed Redis
- Object storage plus CDN
- Web and admin deployed on a platform supporting Next.js
- API and Python workers deployed as containers
- GitHub Actions for CI/CD
- Sentry for errors
- PostHog for product analytics and feature flags
- Transactional email provider
- Expo push notifications and web push

Avoid Kubernetes until scale or organizational needs justify it.

---

## 8. High-level architecture

```text
Official sources, papers, and feeds
                |
                v
      Python ingestion workers
                |
       normalize and deduplicate
                |
      create source evidence package
                |
      AI-assisted editorial drafts
                |
                v
       Editorial review workflow
                |
                v
            PostgreSQL
          /      |       \
         /       |        \
      API      Search     Object storage/CDN
       |          |               |
       +----------+---------------+
                  |
          Web, iOS, Android
```

### Architectural rules

- The database stores reviewed content, not only raw generated text.
- Public clients never call model providers directly.
- Raw ingestion records are immutable or versioned.
- Published content is versioned and auditable.
- Image rights metadata is required before publication.
- Every discovery maintains links to source records.
- Time-sensitive content supports corrections and update history.
- Public content pages use stable slugs and canonical URLs.

---

## 9. Domain model

### Primary entities

- User
- UserPreference
- Topic
- Concept
- Discovery
- DiscoveryVersion
- Lesson
- LearningPath
- LearningPathItem
- HistoricalEvent
- Mission
- Instrument
- Observatory
- AstronomicalObject
- Person
- Organization
- Paper
- SourceRecord
- Claim
- ImageAsset
- Quiz
- QuizQuestion
- QuizAttempt
- Bookmark
- Follow
- UserProgress
- NotificationSubscription
- EditorialTask
- AuditLog

### Relationship examples

```text
Discovery -> references -> Paper
Discovery -> supported_by -> SourceRecord
Discovery -> contains -> Claim
Discovery -> teaches -> Concept
Discovery -> related_to -> Lesson
Discovery -> observed_with -> Instrument
Discovery -> produced_by -> Mission
Discovery -> concerns -> AstronomicalObject
Lesson -> requires -> Concept
Lesson -> part_of -> LearningPath
HistoricalEvent -> concerns -> Mission, Person, Object, Observatory
ImageAsset -> used_by -> Discovery, Lesson, Event, Object
```

### Suggested database tables

#### users

- id UUID primary key
- email
- display_name
- avatar_url
- role: user, editor, reviewer, admin
- created_at
- updated_at

#### user_preferences

- user_id
- reading_level: beginner, intermediate, advanced
- preferred_depth: quick, learn, deep
- include_math boolean
- timezone
- locale
- notification_frequency
- onboarding_completed_at

#### topics

- id
- slug
- name
- description
- icon
- parent_topic_id nullable
- status

#### concepts

- id
- slug
- name
- short_definition
- explanation_markdown
- difficulty
- prerequisite_concept_ids represented through a join table
- status

#### discoveries

- id
- slug
- title
- subtitle
- dek
- status: draft, review, scheduled, published, archived
- evidence_status: official_release, preliminary, preprint, peer_reviewed, confirmed, disputed
- difficulty
- published_at
- first_source_date
- last_reviewed_at
- hero_image_id
- primary_topic_id
- seo_title
- seo_description
- created_by
- updated_by
- created_at
- updated_at

#### discovery_versions

- id
- discovery_id
- version_number
- quick_markdown
- learn_markdown
- deep_markdown
- what_happened_markdown
- why_it_matters_markdown
- how_measured_markdown
- prior_understanding_markdown
- uncertainty_markdown
- change_summary
- created_by
- created_at

#### source_records

- id
- source_type: official_release, paper, dataset, press_release, news, archive
- organization
- title
- canonical_url
- external_id
- publication_date
- retrieved_at
- raw_text_location
- metadata_json
- checksum

#### papers

- id
- title
- abstract
- authors_json
- doi nullable
- arxiv_id nullable
- journal nullable
- publication_date
- peer_review_status
- canonical_url

#### claims

- id
- discovery_version_id
- claim_text
- source_record_id
- evidence_excerpt
- confidence: high, medium, low
- verification_status
- reviewer_id
- reviewed_at

#### image_assets

- id
- source_url
- storage_url nullable
- thumbnail_url
- alt_text
- caption
- creator
- organization
- credit_line
- license_name
- rights_url
- copyright_status
- commercial_use_allowed nullable
- modification_allowed nullable
- publication_allowed boolean
- verification_notes
- verified_by
- verified_at
- width
- height
- media_type

#### lessons

- id
- slug
- title
- summary
- body_markdown
- difficulty
- estimated_minutes
- include_math
- status
- hero_image_id
- created_at
- updated_at

#### historical_events

- id
- month
- day
- year nullable
- title
- summary_markdown
- significance_markdown
- modern_context_markdown
- hero_image_id
- status

#### quizzes and questions

- quizzes: id, lesson_id, title, passing_score
- quiz_questions: id, quiz_id, prompt, question_type, choices_json, correct_answer_json, explanation
- quiz_attempts: id, user_id, quiz_id, score, answers_json, completed_at

#### user_progress

- id
- user_id
- entity_type: discovery, lesson, learning_path
- entity_id
- status: started, completed
- progress_percent
- last_position
- started_at
- completed_at
- updated_at

### Database constraints

- Slugs must be unique per public entity type.
- A published discovery must have at least one source.
- A published discovery must have a verified hero image or an explicit no-image exception.
- A published image must have credit and rights metadata.
- Evidence status must be visible to clients.
- Deleting published content should archive it rather than remove it.

---

## 10. API design

Use REST initially. Add GraphQL only if client-query complexity becomes a demonstrated problem.

### Public endpoints

```text
GET    /v1/home
GET    /v1/discoveries
GET    /v1/discoveries/:slug
GET    /v1/topics
GET    /v1/topics/:slug
GET    /v1/concepts/:slug
GET    /v1/learning-paths
GET    /v1/learning-paths/:slug
GET    /v1/lessons/:slug
GET    /v1/today
GET    /v1/today/:month/:day
GET    /v1/search?q=
GET    /v1/images/:id
```

### Authenticated endpoints

```text
GET    /v1/me
PATCH  /v1/me/preferences
GET    /v1/me/library
POST   /v1/bookmarks
DELETE /v1/bookmarks/:entityType/:entityId
POST   /v1/follows/topics/:topicId
DELETE /v1/follows/topics/:topicId
POST   /v1/progress
POST   /v1/quizzes/:quizId/attempts
GET    /v1/me/progress
POST   /v1/notifications/subscriptions
DELETE /v1/notifications/subscriptions/:id
```

### Admin endpoints

```text
POST   /v1/admin/discoveries
PATCH  /v1/admin/discoveries/:id
POST   /v1/admin/discoveries/:id/submit-review
POST   /v1/admin/discoveries/:id/publish
POST   /v1/admin/discoveries/:id/archive
GET    /v1/admin/editorial-queue
POST   /v1/admin/sources/import
POST   /v1/admin/images/verify
POST   /v1/admin/claims/:id/verify
GET    /v1/admin/audit-log
```

### Example discovery response

```json
{
  "id": "uuid",
  "slug": "example-early-galaxy",
  "title": "An Early Galaxy Challenges Simple Growth Models",
  "subtitle": "A Webb observation reveals unexpectedly developed structure.",
  "publishedAt": "2026-07-30T16:00:00Z",
  "difficulty": "beginner",
  "evidenceStatus": "peer_reviewed",
  "readingTimes": {"quick": 1, "learn": 5, "deep": 16},
  "heroImage": {
    "url": "https://cdn.example.com/...",
    "altText": "Infrared image of a distant galaxy field",
    "creditLine": "NASA, ESA, CSA, STScI"
  },
  "content": {
    "quick": "...",
    "learn": "...",
    "deep": "..."
  },
  "sections": {
    "whatHappened": "...",
    "whyItMatters": "...",
    "howMeasured": "...",
    "priorUnderstanding": "...",
    "uncertainty": "..."
  },
  "topics": [],
  "concepts": [],
  "missions": [],
  "instruments": [],
  "objects": [],
  "sources": [],
  "relatedLessons": []
}
```

### API rules

- Cursor-based pagination for feeds.
- ETags or last-modified support for public content.
- Rate limiting for unauthenticated search.
- Schema validation at the boundary.
- Stable error envelope with machine-readable codes.
- Role-based authorization for admin routes.
- Idempotency keys for publish and ingestion actions.

---

## 11. Content ingestion system

### Source categories

Prioritize authoritative sources:

- Space-agency and observatory releases
- Mission science pages
- Peer-reviewed papers
- Preprints
- Research datasets and archives
- University press releases only when linked to original work

### Ingestion stages

1. Fetch source feed or API.
2. Normalize metadata.
3. Store raw immutable source record.
4. Extract links to papers, datasets, images, missions, instruments, and objects.
5. Detect duplicates and updates.
6. Classify topic and scientific domain.
7. Score editorial importance.
8. Build an evidence package.
9. Generate draft summaries and suggested concept links.
10. Send to editorial queue.
11. Verify scientific claims and image rights.
12. Publish or reject.

### Deduplication

Use a combination of:

- Canonical URL
- DOI or preprint identifier
- Normalized title similarity
- Publication date proximity
- Named missions, objects, and instruments
- Abstract similarity embeddings
- Source-to-paper relationships

One scientific result may appear as an official release, institutional press release, paper, and several updates. These should become one discovery with multiple source records, not several duplicate stories.

### Importance scoring

Create a transparent editorial score rather than an opaque ranking.

Possible dimensions:

- Scientific significance
- Strength of evidence
- Public interest
- Visual quality
- Educational value
- Novelty
- Relevance to followed topics
- Availability of original sources

Do not let popularity alone determine placement.

---

## 12. AI-assisted content workflow

### Allowed uses

- Draft summaries at defined reading levels
- Extract candidate claims
- Generate vocabulary lists
- Suggest prerequisite concepts
- Suggest related lessons
- Generate quiz drafts
- Rewrite for clarity
- Produce image alt-text drafts
- Translate reviewed content in later phases

### Prohibited direct-publication uses

- Publishing generated scientific claims without review
- Labeling a result confirmed without evidence
- Creating image-rights metadata from assumptions
- Inventing quotations
- Summarizing a paper that the system did not retrieve
- Presenting a press release as equivalent to peer review

### Drafting prompt contract

Every generation request should include:

- Full source package
- Evidence status
- Defined audience
- Required structure
- Prohibited extrapolation
- Citation mapping instructions
- Output schema
- Explicit instruction to preserve uncertainty

### Structured output example

```json
{
  "quick": "...",
  "learn": "...",
  "deep": "...",
  "claims": [
    {
      "text": "...",
      "sourceId": "...",
      "confidence": "high"
    }
  ],
  "conceptSuggestions": ["redshift", "spectroscopy"],
  "uncertainties": ["..."],
  "reviewWarnings": ["..."],
  "quizDraft": []
}
```

### Editorial states

```text
INGESTED
  -> TRIAGED
  -> DRAFT_GENERATED
  -> SCIENCE_REVIEW
  -> COPY_REVIEW
  -> RIGHTS_REVIEW
  -> READY_TO_PUBLISH
  -> PUBLISHED
  -> UPDATED or CORRECTED
  -> ARCHIVED
```

---

## 13. Image strategy

Images are mandatory for the product experience, but publication rights must be a first-class system concern.

### Asset requirements

Every image record must contain:

- Original source URL
- Creator
- Organization
- Credit line
- Caption
- Alt text
- License or terms link
- Copyright status
- Commercial-use status when known
- Modification status when known
- Verification date and reviewer
- Width, height, format, and derivative variants

### Image processing

Generate:

- Thumbnail
- Feed card variant
- Mobile hero variant
- Desktop hero variant
- Social-share image variant where permitted
- Low-quality placeholder for progressive loading

### User experience

- Always show credit close to the image.
- Support tap-to-zoom.
- Add annotated overlays only when modification is allowed.
- Preserve a link to the original image page.
- Use descriptive alt text rather than repeating the caption.
- Provide optional “What am I looking at?” annotations.

### Publication gate

An image cannot be attached to published content until `publication_allowed = true`, except for an explicitly approved external embed strategy.

---

## 14. Search and discovery

### Searchable entities

- Discoveries
- Lessons
- Concepts
- Topics
- Missions
- Instruments
- Astronomical objects
- Historical events
- People and observatories

### Ranking signals

- Exact title match
- Alias match
- Topic relevance
- Body relevance
- Recency for discoveries
- Editorial importance
- User preference boost
- Learning-level compatibility

### Useful search behavior

- Synonyms: “Webb” and “JWST”
- Aliases: “Andromeda” and “M31”
- Spelling tolerance
- Acronym expansion
- Filter by topic, evidence status, difficulty, date, and content type
- Suggestions for concepts when a query is broad

---

## 15. Personalization

### Onboarding questions

- Experience level
- Favorite topics
- Preferred explanation depth
- Include optional mathematics?
- Notification frequency
- Location permission for future sky events

### MVP personalization

Use explicit preferences and simple rules:

- Followed topics appear higher.
- Continue unfinished lessons.
- Recommend prerequisites based on quiz results.
- Suggest related lessons after discoveries.
- Avoid repeating completed beginner material unless requested.

Do not build a complex recommendation model until there is enough behavioral data and a clearly measured benefit.

---

## 16. Notifications

### Notification types

- Major discovery alert
- Daily astronomy image
- Today in Astronomy
- New article in a followed topic
- Continue-learning reminder
- Upcoming sky event in a later phase

### Rules

- Ask for notification permission after demonstrating value, not immediately on first launch.
- Default to a low frequency.
- Allow topic-specific control.
- Respect quiet hours and timezone.
- Avoid sensational language.
- Deep-link to the relevant content.

---

## 17. Design system and accessibility

### Visual direction

- Dark-first cosmic interface with an equally complete light theme
- High-contrast typography
- Large visual cards without hiding source credits
- Restrained animation
- Scientific diagrams designed for clarity rather than decoration

### Core components

- App shell and navigation
- Discovery card
- Image card with credit
- Evidence-status badge
- Difficulty badge
- Reading-depth switcher
- Concept chip
- Source citation list
- Lesson progress card
- Quiz question
- Timeline entry
- Search result row
- Empty and error states
- Skeleton loaders

### Accessibility requirements

- Screen-reader labels for all controls
- Descriptive image alt text
- Dynamic type support
- Keyboard-accessible web navigation
- Visible focus indicators
- Captions or transcripts for audio/video
- Reduced-motion option
- Color is never the only carrier of meaning
- Minimum contrast compliance
- Quiz controls usable without drag gestures

---

## 18. Security and privacy

### Data minimization

Collect only what is needed:

- Account identity
- Preferences
- Progress
- Bookmarks
- Notification tokens
- Optional approximate location for sky features

Do not store precise location continuously.

### Security controls

- Managed authentication
- Secure, HTTP-only web sessions where applicable
- Rotating secrets
- Encryption in transit and at rest
- Role-based admin access
- Audit logs for publication and rights changes
- Rate limiting
- Input validation
- Content Security Policy on web
- Dependency scanning
- Database backups and restore testing
- Separate production and development environments

### Child-directed use

Do not market the first release as a child-directed app unless the legal and product requirements for children’s privacy, consent, content, and analytics are handled deliberately.

---

## 19. Analytics event contract

Define events centrally in `packages/analytics`.

```text
app_opened
onboarding_started
onboarding_completed
topic_followed
discovery_viewed
depth_changed
source_opened
concept_opened
lesson_started
lesson_completed
quiz_started
quiz_completed
bookmark_added
search_submitted
search_result_opened
notification_opened
image_zoomed
content_feedback_submitted
```

Required common properties:

- user_id or anonymous_id
- session_id
- platform
- app_version
- entity_id
- entity_type
- source_surface
- timestamp

Avoid sending article bodies, search text containing personal data, or unnecessary user attributes to analytics vendors.

---

## 20. Testing strategy

### Unit tests

- Content-status transitions
- Reading-time calculations
- Search normalization
- Date and timezone behavior
- Rights publication gates
- Source deduplication
- Quiz scoring
- Progress calculation
- Authorization rules

### Integration tests

- Ingestion to editorial queue
- Discovery publication flow
- Image verification flow
- Authentication and user preferences
- Bookmark and progress persistence
- Notification subscription lifecycle
- Search indexing

### End-to-end tests

Critical user journeys:

1. New user completes onboarding and opens a discovery.
2. User changes explanation depth.
3. User opens a concept and starts a lesson.
4. User completes a quiz and sees progress.
5. User bookmarks content and retrieves it in Library.
6. Editor imports a source, reviews a draft, verifies an image, and publishes.
7. Published content appears on web and mobile.
8. A correction produces a visible update history.

Use Playwright for web and admin. Use Maestro or Detox for mobile smoke tests.

### Content validation tests

- Published content has at least one source.
- Every image has credit, alt text, and rights status.
- Every external link is syntactically valid.
- No unresolved placeholder tokens exist.
- Evidence status is present.
- Markdown renders without unsupported HTML.
- Claims reference available source records.

---

## 21. CI/CD and environments

### Environments

- Local
- Preview per pull request
- Staging
- Production

### Pull-request checks

- Formatting
- Linting
- Type checking
- Unit tests
- API contract tests
- Database migration validation
- Web build
- Mobile TypeScript build
- Security and dependency scan
- Content-schema validation

### Deployment rules

- Database migrations run before application rollout when backward compatible.
- Destructive migrations require a staged plan.
- Feature flags protect incomplete functionality.
- Admin publishing actions are disabled in preview environments unless seeded.
- Production deploys support rollback.

---

## 22. Twelve-week MVP roadmap

### Weeks 1-2: Foundation and prototype

Deliverables:

- Final information architecture
- Figma or coded prototype for Home, Discovery, Lesson, and Today
- Monorepo setup
- Shared linting, formatting, and TypeScript configuration
- Database and authentication foundation
- Initial design tokens
- Ten representative content records

Acceptance criteria:

- Web, admin, API, and mobile apps run locally from documented commands.
- A developer can sign in and see seeded content.
- CI runs on every pull request.

### Weeks 3-4: Public content experience

Deliverables:

- Home API and screens
- Discovery list and detail
- Reading-depth switcher
- Topic and concept pages
- Image component with credits and alt text
- Responsive web layouts

Acceptance criteria:

- Published seeded discoveries appear on web and mobile.
- Deep links resolve correctly.
- Content is readable with JavaScript disabled on public web pages where practical.

### Weeks 5-6: Learning system

Deliverables:

- Learning paths
- Lesson detail
- Prerequisites
- Quizzes
- Progress tracking
- Continue-learning module

Acceptance criteria:

- A signed-in user can start and complete a lesson.
- Quiz results persist across sessions.
- Home shows the most relevant unfinished lesson.

### Weeks 7-8: Editorial and ingestion

Deliverables:

- Source ingestion worker
- Deduplication
- Editorial queue
- Discovery editor
- Evidence-status control
- Source and claim mapping
- Image-rights review
- Publish workflow

Acceptance criteria:

- An editor can import a source and publish a fully attributed discovery without direct database edits.
- Publication is blocked when required sources or rights metadata are missing.

### Weeks 9-10: Today, search, and library

Deliverables:

- Today in Astronomy calendar
- Search indexing and filters
- Bookmarks
- Followed topics
- Library screen
- Basic notification service

Acceptance criteria:

- Search returns relevant discoveries, lessons, and concepts.
- Bookmarks synchronize across web and mobile.
- The current date resolves correctly in the user’s timezone.

### Weeks 11-12: Beta readiness

Deliverables:

- Accessibility pass
- Performance tuning
- Analytics dashboards
- Error monitoring
- App-store assets
- Privacy policy and terms drafts
- Content and image audit
- Beta feedback channel

Acceptance criteria:

- No critical accessibility failures in primary journeys.
- Error reporting works in all production clients.
- Beta users can install mobile builds and use the same account on web.
- All launch content passes source and image-rights checks.

---

## 23. Backlog after MVP

### Phase 2

- Audio narration
- Downloaded lessons and offline reading
- Location-based sky events
- Better recommendation rules
- Interactive annotated imagery
- Spectrum and wavelength comparisons
- Weekly digest
- Additional learning paths
- Subscription system

### Phase 3

- Interactive sky map
- Classroom and educator accounts
- Localization
- Expert interviews
- Simulations
- Citizen-science integrations
- Museum and planetarium mode
- Carefully constrained source-grounded astronomy assistant

---

## 24. Initial user stories

### Discovery

- As a beginner, I can read a one-minute explanation of a discovery.
- As an enthusiast, I can switch to a technical explanation.
- As a skeptical reader, I can see whether the result is preliminary or peer reviewed.
- As a learner, I can open prerequisite concepts without losing my place.
- As a reader, I can see the original paper and official source.

### Learning

- As a new user, I can choose a learning path appropriate to my level.
- As a learner, I can resume a lesson where I stopped.
- As a learner, I can test myself and understand incorrect answers.
- As a user who likes mathematics, I can reveal optional equations.

### Editorial

- As an editor, I can see newly ingested sources ranked for review.
- As a science reviewer, I can verify individual claims against sources.
- As a rights reviewer, I can block an image from publication.
- As an editor, I can publish a correction with a visible explanation.

---

## 25. Definition of done

A feature is complete when:

- Product acceptance criteria are satisfied.
- Error, loading, empty, and offline states are handled.
- Accessibility has been checked.
- Analytics events are implemented and documented.
- Unit and integration tests cover critical behavior.
- API and schema documentation are updated.
- Mobile and web experiences are both validated where applicable.
- Security and privacy implications are reviewed.
- Content and image-rights requirements are enforced.
- The feature can be enabled or rolled back safely.

---

## 26. Cursor implementation instructions

Place this document at `docs/product/product-engineering-plan.md` in the repository.

### Cursor operating rules

When asking Cursor to implement work:

1. Give it one vertical slice at a time.
2. Ask it to inspect the repository before changing files.
3. Require a file-by-file plan before large changes.
4. Require migrations and tests with data-model changes.
5. Do not let it introduce a second framework that duplicates an existing choice.
6. Ask it to preserve API contracts and explain breaking changes.
7. Require environment variables to be documented in `.env.example`.
8. Require seed data for every new content type.
9. Require accessible loading, error, and empty states.
10. Run lint, typecheck, tests, and builds after each slice.

### Initial Cursor prompt

```text
Read docs/product/product-engineering-plan.md completely. Create a monorepo implementation plan for the first two weeks only. Do not write application code yet.

Use:
- pnpm workspaces and Turborepo
- Next.js for apps/web and apps/admin
- Expo React Native for apps/mobile
- NestJS for apps/api
- PostgreSQL with Prisma in packages/database
- Python FastAPI in services/ingestion
- shared TypeScript contracts in packages/contracts

Produce:
1. Proposed repository tree
2. Dependency boundaries
3. Environment variables
4. Local Docker services
5. Database entities required for the first vertical slice
6. CI workflow
7. Ordered implementation tasks with acceptance criteria
8. Risks and architectural decisions

Do not add Kubernetes, GraphQL, a vector database, or paid infrastructure that is unnecessary for the first release.
```

### Cursor prompt: bootstrap the repository

```text
Implement the approved repository foundation. Before editing, list all files you intend to create or modify.

Requirements:
- pnpm workspace and Turborepo
- apps/web, apps/admin, apps/mobile, apps/api
- services/ingestion
- packages/contracts, packages/database, packages/config, packages/analytics
- strict TypeScript
- ESLint and Prettier
- PostgreSQL and Redis in Docker Compose
- Prisma connection and initial migration
- health endpoints for API and ingestion
- one root command for lint, typecheck, test, and build
- .env.example files
- README with exact local startup instructions
- GitHub Actions CI

After implementation, run the available checks and report failures honestly.
```

### Cursor prompt: first vertical slice

```text
Implement the first end-to-end vertical slice: a published discovery appears in the API, public web application, and mobile application.

Scope:
- Topic, Discovery, DiscoveryVersion, SourceRecord, and ImageAsset models
- migration and seed data
- GET /v1/discoveries
- GET /v1/discoveries/:slug
- web discovery list and detail pages
- mobile discovery list and detail screens
- quick, learn, and deep reading modes
- evidence-status badge
- image credit and alt text
- loading, empty, and error states
- unit, API integration, and web end-to-end tests

Constraints:
- Render reviewed database content only.
- Do not call an LLM.
- Do not implement authentication yet.
- Keep shared contracts in packages/contracts.
- No direct database access from web or mobile.
- Document API examples and local test commands.
```

### Cursor prompt: editorial publishing slice

```text
Implement the minimum editorial workflow for discoveries.

States:
DRAFT -> SCIENCE_REVIEW -> RIGHTS_REVIEW -> READY_TO_PUBLISH -> PUBLISHED -> ARCHIVED

Requirements:
- role-based access for editor, reviewer, and admin
- admin discovery editor
- source attachment
- claim-to-source mapping
- image-rights verification fields
- publish validation rules
- audit-log entries for every transition
- preview before publishing
- visible update history
- tests for invalid state transitions and publication gates

A discovery cannot be published unless it has:
- a title, slug, primary topic, evidence status, and reviewed content
- at least one source
- a verified hero image or approved no-image exception
- no unverified required claims
```

---

## 27. First engineering milestone

The first milestone should be intentionally small:

> A seeded, reviewed discovery can be retrieved from PostgreSQL through the API and displayed beautifully on web and mobile with three explanation depths, evidence status, source links, and an attributed image.

Do not begin ingestion automation, subscriptions, advanced recommendation logic, or a sky map until this vertical slice is stable.

---

## 28. Key risks and mitigations

### Risk: Content becomes a generic AI summary feed

**Mitigation:** Preserve sources, reviewed claims, evidence labels, uncertainty, and human editorial workflow.

### Risk: Image licensing blocks publication

**Mitigation:** Build rights metadata and publication gates from the first schema migration.

### Risk: Three platforms create excessive UI duplication

**Mitigation:** Share contracts, data hooks, design tokens, and content-rendering logic, while allowing platform-specific navigation and presentation.

### Risk: Scope expands into a planetarium app

**Mitigation:** Keep the MVP centered on discovery-to-learning conversion. Treat sky-map features as a later product line.

### Risk: Daily content operations become unsustainable

**Mitigation:** Use ingestion and drafting automation, a clear triage score, repeatable article templates, and a manageable publication cadence.

### Risk: Scientific errors damage trust

**Mitigation:** Require sources, evidence status, reviewer assignment, correction history, and claim-level verification for important assertions.

### Risk: Users consume news but do not learn

**Mitigation:** Measure discovery-to-concept and discovery-to-lesson conversion, and design every article with explicit learning links.

---

## 29. Recommended immediate sequence

1. Create the monorepo and local development environment.
2. Implement the smallest content schema.
3. Seed one polished discovery, one topic, two concepts, one lesson, and one image asset.
4. Build the discovery experience on web and mobile.
5. Add source display and evidence status.
6. Add the minimum admin editing workflow.
7. Add learning progress and quizzes.
8. Add Today in Astronomy.
9. Add ingestion and AI-assisted drafting only after the manual publishing path is reliable.

This sequence ensures that automation is built around a proven content product rather than determining the product prematurely.
