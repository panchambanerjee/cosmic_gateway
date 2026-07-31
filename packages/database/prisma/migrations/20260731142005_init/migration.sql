-- CreateEnum
CREATE TYPE "EvidenceStatus" AS ENUM ('official_release', 'preliminary', 'preprint', 'peer_reviewed', 'confirmed', 'disputed');

-- CreateEnum
CREATE TYPE "DiscoveryStatus" AS ENUM ('draft', 'science_review', 'rights_review', 'ready_to_publish', 'published', 'archived');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('beginner', 'intermediate', 'advanced');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('official_release', 'paper', 'dataset', 'press_release', 'news', 'archive');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateTable
CREATE TABLE "topics" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'published',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_assets" (
    "id" UUID NOT NULL,
    "source_url" TEXT NOT NULL,
    "storage_url" TEXT,
    "thumbnail_url" TEXT,
    "alt_text" TEXT NOT NULL,
    "caption" TEXT,
    "creator" TEXT,
    "organization" TEXT,
    "credit_line" TEXT NOT NULL,
    "license_name" TEXT,
    "rights_url" TEXT,
    "copyright_status" TEXT,
    "commercial_use_allowed" BOOLEAN,
    "modification_allowed" BOOLEAN,
    "publication_allowed" BOOLEAN NOT NULL DEFAULT false,
    "verification_notes" TEXT,
    "verified_at" TIMESTAMP(3),
    "width" INTEGER,
    "height" INTEGER,
    "media_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source_records" (
    "id" UUID NOT NULL,
    "source_type" "SourceType" NOT NULL,
    "organization" TEXT,
    "title" TEXT NOT NULL,
    "canonical_url" TEXT NOT NULL,
    "external_id" TEXT,
    "publication_date" TIMESTAMP(3),
    "retrieved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "raw_text_location" TEXT,
    "metadata_json" JSONB,
    "checksum" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "source_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discoveries" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "dek" TEXT,
    "status" "DiscoveryStatus" NOT NULL DEFAULT 'draft',
    "evidence_status" "EvidenceStatus" NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'beginner',
    "published_at" TIMESTAMP(3),
    "first_source_date" TIMESTAMP(3),
    "last_reviewed_at" TIMESTAMP(3),
    "hero_image_id" UUID,
    "primary_topic_id" UUID,
    "no_image_exception" BOOLEAN NOT NULL DEFAULT false,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discoveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discovery_versions" (
    "id" UUID NOT NULL,
    "discovery_id" UUID NOT NULL,
    "version_number" INTEGER NOT NULL,
    "quick_markdown" TEXT NOT NULL,
    "learn_markdown" TEXT NOT NULL,
    "deep_markdown" TEXT NOT NULL,
    "what_happened_markdown" TEXT NOT NULL,
    "why_it_matters_markdown" TEXT NOT NULL,
    "how_measured_markdown" TEXT NOT NULL,
    "prior_understanding_markdown" TEXT NOT NULL,
    "uncertainty_markdown" TEXT NOT NULL,
    "change_summary" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discovery_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discovery_sources" (
    "discovery_id" UUID NOT NULL,
    "source_record_id" UUID NOT NULL,

    CONSTRAINT "discovery_sources_pkey" PRIMARY KEY ("discovery_id","source_record_id")
);

-- CreateTable
CREATE TABLE "concepts" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "short_definition" TEXT NOT NULL,
    "explanation_markdown" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'beginner',
    "status" "ContentStatus" NOT NULL DEFAULT 'published',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "concepts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discovery_concepts" (
    "discovery_id" UUID NOT NULL,
    "concept_id" UUID NOT NULL,

    CONSTRAINT "discovery_concepts_pkey" PRIMARY KEY ("discovery_id","concept_id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "body_markdown" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'beginner',
    "estimated_minutes" INTEGER NOT NULL DEFAULT 5,
    "include_math" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'published',
    "hero_image_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_concepts" (
    "lesson_id" UUID NOT NULL,
    "concept_id" UUID NOT NULL,

    CONSTRAINT "lesson_concepts_pkey" PRIMARY KEY ("lesson_id","concept_id")
);

-- CreateTable
CREATE TABLE "discovery_lessons" (
    "discovery_id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,

    CONSTRAINT "discovery_lessons_pkey" PRIMARY KEY ("discovery_id","lesson_id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "discovery_id" UUID,
    "action" TEXT NOT NULL,
    "from_status" TEXT,
    "to_status" TEXT,
    "message" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "topics_slug_key" ON "topics"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "discoveries_slug_key" ON "discoveries"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "discovery_versions_discovery_id_version_number_key" ON "discovery_versions"("discovery_id", "version_number");

-- CreateIndex
CREATE UNIQUE INDEX "concepts_slug_key" ON "concepts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_slug_key" ON "lessons"("slug");

-- AddForeignKey
ALTER TABLE "discoveries" ADD CONSTRAINT "discoveries_hero_image_id_fkey" FOREIGN KEY ("hero_image_id") REFERENCES "image_assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discoveries" ADD CONSTRAINT "discoveries_primary_topic_id_fkey" FOREIGN KEY ("primary_topic_id") REFERENCES "topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovery_versions" ADD CONSTRAINT "discovery_versions_discovery_id_fkey" FOREIGN KEY ("discovery_id") REFERENCES "discoveries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovery_sources" ADD CONSTRAINT "discovery_sources_discovery_id_fkey" FOREIGN KEY ("discovery_id") REFERENCES "discoveries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovery_sources" ADD CONSTRAINT "discovery_sources_source_record_id_fkey" FOREIGN KEY ("source_record_id") REFERENCES "source_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovery_concepts" ADD CONSTRAINT "discovery_concepts_discovery_id_fkey" FOREIGN KEY ("discovery_id") REFERENCES "discoveries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovery_concepts" ADD CONSTRAINT "discovery_concepts_concept_id_fkey" FOREIGN KEY ("concept_id") REFERENCES "concepts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_hero_image_id_fkey" FOREIGN KEY ("hero_image_id") REFERENCES "image_assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_concepts" ADD CONSTRAINT "lesson_concepts_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_concepts" ADD CONSTRAINT "lesson_concepts_concept_id_fkey" FOREIGN KEY ("concept_id") REFERENCES "concepts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovery_lessons" ADD CONSTRAINT "discovery_lessons_discovery_id_fkey" FOREIGN KEY ("discovery_id") REFERENCES "discoveries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovery_lessons" ADD CONSTRAINT "discovery_lessons_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_discovery_id_fkey" FOREIGN KEY ("discovery_id") REFERENCES "discoveries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
