-- AlterTable
ALTER TABLE "discovery_versions" RENAME COLUMN "quick_markdown" TO "summary_markdown";
ALTER TABLE "discovery_versions" RENAME COLUMN "deep_markdown" TO "article_markdown";
ALTER TABLE "discovery_versions" DROP COLUMN "learn_markdown";
