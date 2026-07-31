-- CreateEnum
CREATE TYPE "TipStatus" AS ENUM ('new', 'triaged', 'used', 'rejected');

-- AlterTable
ALTER TABLE "concepts" ADD COLUMN     "external_url" TEXT,
ADD COLUMN     "wikipedia_url" TEXT;

-- CreateTable
CREATE TABLE "tip_candidates" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "tip_url" TEXT NOT NULL,
    "primary_source_urls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "TipStatus" NOT NULL DEFAULT 'new',
    "notes" TEXT,
    "organization" TEXT,
    "fetched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tip_candidates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tip_candidates_tip_url_key" ON "tip_candidates"("tip_url");
