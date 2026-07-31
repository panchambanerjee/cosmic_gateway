import type {
  Concept,
  Discovery,
  DiscoveryVersion,
  ImageAsset,
  Lesson,
  SourceRecord,
  Topic,
} from "@cosmic-gateway/database";
import type {
  ConceptSummary,
  DiscoveryDetail,
  DiscoveryListItem,
  ImageAsset as ImageAssetDto,
  LessonSummary,
  SourceRecord as SourceRecordDto,
} from "@cosmic-gateway/contracts";

export { DISCOVERY_STATUS_FLOW, canTransition } from "./status";

type DiscoveryWithRelations = Discovery & {
  primaryTopic: Topic | null;
  heroImage: ImageAsset | null;
  versions: DiscoveryVersion[];
  sources?: Array<{ sourceRecord: SourceRecord }>;
  concepts?: Array<{ concept: Concept }>;
  lessons?: Array<{ lesson: Lesson }>;
};

export function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function latestVersion(versions: DiscoveryVersion[]): DiscoveryVersion | null {
  if (!versions.length) return null;
  return [...versions].sort((a, b) => b.versionNumber - a.versionNumber)[0] ?? null;
}

export function toImageDto(image: ImageAsset): ImageAssetDto {
  return {
    id: image.id,
    sourceUrl: image.sourceUrl,
    storageUrl: image.storageUrl,
    thumbnailUrl: image.thumbnailUrl,
    altText: image.altText,
    caption: image.caption,
    creator: image.creator,
    organization: image.organization,
    creditLine: image.creditLine,
    licenseName: image.licenseName,
    rightsUrl: image.rightsUrl,
    copyrightStatus: image.copyrightStatus,
    commercialUseAllowed: image.commercialUseAllowed,
    modificationAllowed: image.modificationAllowed,
    publicationAllowed: image.publicationAllowed,
    width: image.width,
    height: image.height,
    mediaType: image.mediaType,
  };
}

export function toSourceDto(source: SourceRecord): SourceRecordDto {
  return {
    id: source.id,
    sourceType: source.sourceType,
    organization: source.organization,
    title: source.title,
    canonicalUrl: source.canonicalUrl,
    externalId: source.externalId,
    publicationDate: source.publicationDate?.toISOString() ?? null,
  };
}

export function toConceptSummary(concept: Concept): ConceptSummary {
  return {
    id: concept.id,
    slug: concept.slug,
    name: concept.name,
    shortDefinition: concept.shortDefinition,
    difficulty: concept.difficulty,
  };
}

export function toLessonSummary(lesson: Lesson): LessonSummary {
  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    summary: lesson.summary,
    difficulty: lesson.difficulty,
    estimatedMinutes: lesson.estimatedMinutes,
  };
}

export function toDiscoveryListItem(
  discovery: DiscoveryWithRelations,
): DiscoveryListItem | null {
  const version = latestVersion(discovery.versions);
  if (!version) return null;

  return {
    id: discovery.id,
    slug: discovery.slug,
    title: discovery.title,
    subtitle: discovery.subtitle,
    dek: discovery.dek,
    difficulty: discovery.difficulty,
    evidenceStatus: discovery.evidenceStatus,
    publishedAt: discovery.publishedAt?.toISOString() ?? null,
    primaryTopic: discovery.primaryTopic
      ? {
          id: discovery.primaryTopic.id,
          slug: discovery.primaryTopic.slug,
          name: discovery.primaryTopic.name,
          description: discovery.primaryTopic.description,
        }
      : null,
    heroImage: discovery.heroImage ? toImageDto(discovery.heroImage) : null,
    readingTimes: {
      quick: estimateReadingMinutes(version.quickMarkdown),
      learn: estimateReadingMinutes(version.learnMarkdown),
      deep: estimateReadingMinutes(version.deepMarkdown),
    },
  };
}

export function toDiscoveryDetail(
  discovery: DiscoveryWithRelations,
): DiscoveryDetail | null {
  const version = latestVersion(discovery.versions);
  const list = toDiscoveryListItem(discovery);
  if (!version || !list) return null;

  return {
    ...list,
    content: {
      quick: version.quickMarkdown,
      learn: version.learnMarkdown,
      deep: version.deepMarkdown,
    },
    sections: {
      whatHappened: version.whatHappenedMarkdown,
      whyItMatters: version.whyItMattersMarkdown,
      howMeasured: version.howMeasuredMarkdown,
      priorUnderstanding: version.priorUnderstandingMarkdown,
      uncertainty: version.uncertaintyMarkdown,
    },
    sources: (discovery.sources ?? []).map((row) => toSourceDto(row.sourceRecord)),
    concepts: (discovery.concepts ?? []).map((row) => toConceptSummary(row.concept)),
    relatedLessons: (discovery.lessons ?? []).map((row) =>
      toLessonSummary(row.lesson),
    ),
    versionNumber: version.versionNumber,
    changeSummary: version.changeSummary,
    noImageException: discovery.noImageException,
    updateHistory: [...discovery.versions]
      .sort((a, b) => b.versionNumber - a.versionNumber)
      .map((v) => ({
        versionNumber: v.versionNumber,
        changeSummary: v.changeSummary,
        createdAt: v.createdAt.toISOString(),
      })),
  };
}

export type PublishGateFailure = {
  code: string;
  message: string;
};

export function validatePublishGates(input: {
  title: string;
  slug: string;
  evidenceStatus: string;
  primaryTopicId: string | null;
  heroImage: ImageAsset | null;
  noImageException: boolean;
  sourceCount: number;
  hasReviewedContent: boolean;
}): PublishGateFailure[] {
  const failures: PublishGateFailure[] = [];

  if (!input.title.trim()) {
    failures.push({ code: "TITLE_REQUIRED", message: "Title is required." });
  }
  if (!input.slug.trim()) {
    failures.push({ code: "SLUG_REQUIRED", message: "Slug is required." });
  }
  if (!input.primaryTopicId) {
    failures.push({
      code: "TOPIC_REQUIRED",
      message: "Primary topic is required.",
    });
  }
  if (!input.evidenceStatus) {
    failures.push({
      code: "EVIDENCE_STATUS_REQUIRED",
      message: "Evidence status is required.",
    });
  }
  if (!input.hasReviewedContent) {
    failures.push({
      code: "CONTENT_REQUIRED",
      message: "Reviewed content version is required.",
    });
  }
  if (input.sourceCount < 1) {
    failures.push({
      code: "SOURCE_REQUIRED",
      message: "At least one source is required before publication.",
    });
  }

  const imageOk =
    input.noImageException ||
    (input.heroImage?.publicationAllowed === true &&
      Boolean(input.heroImage.creditLine?.trim()));

  if (!imageOk) {
    failures.push({
      code: "IMAGE_RIGHTS_REQUIRED",
      message:
        "Hero image must have credit and publicationAllowed=true, or an approved no-image exception.",
    });
  }

  return failures;
}

export function apiError(
  code: string,
  message: string,
  details?: unknown,
  status = 400,
) {
  return Response.json(
    { error: { code, message, details } },
    { status },
  );
}
