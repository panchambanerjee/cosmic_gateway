import { z } from "zod";

export const EvidenceStatusSchema = z.enum([
  "official_release",
  "preliminary",
  "preprint",
  "peer_reviewed",
  "confirmed",
  "disputed",
]);

export const DiscoveryStatusSchema = z.enum([
  "draft",
  "science_review",
  "rights_review",
  "ready_to_publish",
  "published",
  "archived",
]);

export const DifficultySchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
]);

export const ReadingDepthSchema = z.enum(["quick", "learn", "deep"]);

export const SourceTypeSchema = z.enum([
  "official_release",
  "paper",
  "dataset",
  "press_release",
  "news",
  "archive",
]);

export const ImageAssetSchema = z.object({
  id: z.string().uuid(),
  sourceUrl: z.string().url(),
  storageUrl: z.string().url().nullable(),
  thumbnailUrl: z.string().url().nullable(),
  altText: z.string(),
  caption: z.string().nullable(),
  creator: z.string().nullable(),
  organization: z.string().nullable(),
  creditLine: z.string(),
  licenseName: z.string().nullable(),
  rightsUrl: z.string().url().nullable(),
  copyrightStatus: z.string().nullable(),
  commercialUseAllowed: z.boolean().nullable(),
  modificationAllowed: z.boolean().nullable(),
  publicationAllowed: z.boolean(),
  width: z.number().int().nullable(),
  height: z.number().int().nullable(),
  mediaType: z.string().nullable(),
});

export const SourceRecordSchema = z.object({
  id: z.string().uuid(),
  sourceType: SourceTypeSchema,
  organization: z.string().nullable(),
  title: z.string(),
  canonicalUrl: z.string().url(),
  externalId: z.string().nullable(),
  publicationDate: z.string().datetime().nullable(),
});

export const TopicSummarySchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
});

export const ConceptSummarySchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  shortDefinition: z.string(),
  difficulty: DifficultySchema,
});

export const LessonSummarySchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  difficulty: DifficultySchema,
  estimatedMinutes: z.number().int(),
});

export const DiscoveryListItemSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().nullable(),
  dek: z.string().nullable(),
  difficulty: DifficultySchema,
  evidenceStatus: EvidenceStatusSchema,
  publishedAt: z.string().datetime().nullable(),
  primaryTopic: TopicSummarySchema.nullable(),
  heroImage: ImageAssetSchema.nullable(),
  readingTimes: z.object({
    quick: z.number().int(),
    learn: z.number().int(),
    deep: z.number().int(),
  }),
});

export const DiscoveryDetailSchema = DiscoveryListItemSchema.extend({
  content: z.object({
    quick: z.string(),
    learn: z.string(),
    deep: z.string(),
  }),
  sections: z.object({
    whatHappened: z.string(),
    whyItMatters: z.string(),
    howMeasured: z.string(),
    priorUnderstanding: z.string(),
    uncertainty: z.string(),
  }),
  sources: z.array(SourceRecordSchema),
  concepts: z.array(ConceptSummarySchema),
  relatedLessons: z.array(LessonSummarySchema),
  versionNumber: z.number().int(),
  changeSummary: z.string().nullable(),
  noImageException: z.boolean(),
  updateHistory: z.array(
    z.object({
      versionNumber: z.number().int(),
      changeSummary: z.string().nullable(),
      createdAt: z.string().datetime(),
    }),
  ),
});

export const ConceptDetailSchema = ConceptSummarySchema.extend({
  explanationMarkdown: z.string(),
});

export const LessonDetailSchema = LessonSummarySchema.extend({
  bodyMarkdown: z.string(),
  includeMath: z.boolean(),
  relatedConcepts: z.array(ConceptSummarySchema),
  relatedDiscoveries: z.array(
    z.object({
      id: z.string().uuid(),
      slug: z.string(),
      title: z.string(),
    }),
  ),
});

export const CreateDiscoveryDraftSchema = z.object({
  title: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  subtitle: z.string().optional(),
  dek: z.string().optional(),
  difficulty: DifficultySchema.default("beginner"),
  evidenceStatus: EvidenceStatusSchema,
  primaryTopicId: z.string().uuid(),
  heroImageId: z.string().uuid().optional().nullable(),
  noImageException: z.boolean().default(false),
  quickMarkdown: z.string().min(1),
  learnMarkdown: z.string().min(1),
  deepMarkdown: z.string().min(1),
  whatHappenedMarkdown: z.string().min(1),
  whyItMattersMarkdown: z.string().min(1),
  howMeasuredMarkdown: z.string().min(1),
  priorUnderstandingMarkdown: z.string().min(1),
  uncertaintyMarkdown: z.string().min(1),
  sourceIds: z.array(z.string().uuid()).default([]),
  conceptIds: z.array(z.string().uuid()).default([]),
  lessonIds: z.array(z.string().uuid()).default([]),
  changeSummary: z.string().optional(),
});

export const PublishDiscoverySchema = z.object({
  discoveryId: z.string().uuid(),
});

export const ApiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
});

export type EvidenceStatus = z.infer<typeof EvidenceStatusSchema>;
export type DiscoveryStatus = z.infer<typeof DiscoveryStatusSchema>;
export type Difficulty = z.infer<typeof DifficultySchema>;
export type ReadingDepth = z.infer<typeof ReadingDepthSchema>;
export type ImageAsset = z.infer<typeof ImageAssetSchema>;
export type SourceRecord = z.infer<typeof SourceRecordSchema>;
export type ConceptSummary = z.infer<typeof ConceptSummarySchema>;
export type LessonSummary = z.infer<typeof LessonSummarySchema>;
export type DiscoveryListItem = z.infer<typeof DiscoveryListItemSchema>;
export type DiscoveryDetail = z.infer<typeof DiscoveryDetailSchema>;
export type ConceptDetail = z.infer<typeof ConceptDetailSchema>;
export type LessonDetail = z.infer<typeof LessonDetailSchema>;
export type CreateDiscoveryDraft = z.infer<typeof CreateDiscoveryDraftSchema>;
