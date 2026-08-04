import type { PrismaClient, EvidenceStatus, Difficulty } from "@prisma/client";

export type SeedImageInput = {
  sourceUrl: string;
  altText: string;
  caption: string;
  creator: string;
  organization: string;
  creditLine: string;
  licenseName: string;
  rightsUrl: string;
  copyrightStatus: string;
  verificationNotes: string;
  width?: number;
  height?: number;
};

export type SeedSourceInput = {
  sourceType: "official_release" | "paper" | "press_release" | "news" | "dataset" | "archive";
  organization: string;
  title: string;
  canonicalUrl: string;
  externalId?: string;
  publicationDate: Date;
};

export type SeedDiscoveryInput = {
  slug: string;
  title: string;
  subtitle: string;
  dek: string;
  evidenceStatus: EvidenceStatus;
  difficulty: Difficulty;
  publishedAt: Date;
  firstSourceDate: Date;
  topicId: string;
  image: SeedImageInput;
  sources: SeedSourceInput[];
  conceptIds: string[];
  lessonIds?: string[];
  quickMarkdown: string;
  learnMarkdown: string;
  deepMarkdown: string;
  whatHappenedMarkdown: string;
  whyItMattersMarkdown: string;
  howMeasuredMarkdown: string;
  priorUnderstandingMarkdown: string;
  uncertaintyMarkdown: string;
  changeSummary: string;
  auditMessage: string;
};

export async function publishSeedDiscovery(
  prisma: PrismaClient,
  input: SeedDiscoveryInput,
) {
  const image = await prisma.imageAsset.create({
    data: {
      sourceUrl: input.image.sourceUrl,
      storageUrl: input.image.sourceUrl,
      thumbnailUrl: input.image.sourceUrl,
      altText: input.image.altText,
      caption: input.image.caption,
      creator: input.image.creator,
      organization: input.image.organization,
      creditLine: input.image.creditLine,
      licenseName: input.image.licenseName,
      rightsUrl: input.image.rightsUrl,
      copyrightStatus: input.image.copyrightStatus,
      commercialUseAllowed: true,
      modificationAllowed: true,
      publicationAllowed: true,
      verificationNotes: input.image.verificationNotes,
      verifiedAt: new Date(),
      width: input.image.width ?? 1280,
      height: input.image.height ?? 720,
      mediaType: "image/jpeg",
    },
  });

  const sourceRecords = [];
  for (const source of input.sources) {
    sourceRecords.push(
      await prisma.sourceRecord.create({
        data: {
          sourceType: source.sourceType,
          organization: source.organization,
          title: source.title,
          canonicalUrl: source.canonicalUrl,
          externalId: source.externalId,
          publicationDate: source.publicationDate,
        },
      }),
    );
  }

  return prisma.discovery.create({
    data: {
      slug: input.slug,
      title: input.title,
      subtitle: input.subtitle,
      dek: input.dek,
      status: "published",
      evidenceStatus: input.evidenceStatus,
      difficulty: input.difficulty,
      publishedAt: input.publishedAt,
      firstSourceDate: input.firstSourceDate,
      lastReviewedAt: input.publishedAt,
      heroImageId: image.id,
      primaryTopicId: input.topicId,
      noImageException: false,
      seoTitle: `${input.title} | Cosmic Gateway`,
      seoDescription: input.dek,
      versions: {
        create: [
          {
            versionNumber: 1,
            quickMarkdown: input.quickMarkdown,
            learnMarkdown: input.learnMarkdown,
            deepMarkdown: input.deepMarkdown,
            whatHappenedMarkdown: input.whatHappenedMarkdown,
            whyItMattersMarkdown: input.whyItMattersMarkdown,
            howMeasuredMarkdown: input.howMeasuredMarkdown,
            priorUnderstandingMarkdown: input.priorUnderstandingMarkdown,
            uncertaintyMarkdown: input.uncertaintyMarkdown,
            changeSummary: input.changeSummary,
          },
        ],
      },
      sources: {
        create: sourceRecords.map((s) => ({ sourceRecordId: s.id })),
      },
      concepts: {
        create: input.conceptIds.map((conceptId) => ({ conceptId })),
      },
      lessons: input.lessonIds?.length
        ? { create: input.lessonIds.map((lessonId) => ({ lessonId })) }
        : undefined,
      auditLogs: {
        create: [
          {
            action: "publish",
            fromStatus: "ready_to_publish",
            toStatus: "published",
            message: input.auditMessage,
          },
        ],
      },
    },
  });
}

/** Undirected editorial links: stores one row per ordered pair (a → b). */
export async function linkRelatedDiscoveries(
  prisma: PrismaClient,
  pairs: Array<{ fromSlug: string; toSlug: string; note?: string }>,
) {
  const slugs = [...new Set(pairs.flatMap((p) => [p.fromSlug, p.toSlug]))];
  const discoveries = await prisma.discovery.findMany({
    where: { slug: { in: slugs } },
    select: { id: true, slug: true },
  });
  const bySlug = new Map(discoveries.map((d) => [d.slug, d.id]));

  let created = 0;
  for (const [index, pair] of pairs.entries()) {
    const discoveryId = bySlug.get(pair.fromSlug);
    const relatedId = bySlug.get(pair.toSlug);
    if (!discoveryId || !relatedId || discoveryId === relatedId) {
      throw new Error(
        `Cannot link related discoveries: ${pair.fromSlug} → ${pair.toSlug}`,
      );
    }
    await prisma.discoveryRelation.upsert({
      where: {
        discoveryId_relatedId: { discoveryId, relatedId },
      },
      create: {
        discoveryId,
        relatedId,
        note: pair.note,
        sortOrder: index,
      },
      update: {
        note: pair.note,
        sortOrder: index,
      },
    });
    created += 1;
  }
  return created;
}
