import { CreateDiscoveryDraftSchema } from "@cosmic-gateway/contracts";
import { prisma } from "@/lib/db";
import {
  apiError,
  latestVersion,
  toDiscoveryDetail,
  validatePublishGates,
} from "@/lib/content";
import { discoveryInclude } from "@/lib/db";
import { isAdminAuthenticated, requireAdminWrite } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const gate = await requireAdminWrite();
  if (!gate.ok) return gate.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be JSON.");
  }

  const parsed = CreateDiscoveryDraftSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", "Invalid discovery draft.", parsed.error.flatten());
  }

  const input = parsed.data;

  const topic = await prisma.topic.findUnique({ where: { id: input.primaryTopicId } });
  if (!topic) {
    return apiError("TOPIC_NOT_FOUND", "Primary topic not found.", undefined, 404);
  }

  const existing = await prisma.discovery.findUnique({ where: { slug: input.slug } });
  if (existing) {
    return apiError("SLUG_TAKEN", "Slug already exists.");
  }

  if (input.heroImageId) {
    const image = await prisma.imageAsset.findUnique({ where: { id: input.heroImageId } });
    if (!image) {
      return apiError("IMAGE_NOT_FOUND", "Hero image not found.", undefined, 404);
    }
  }

  if (input.sourceIds.length) {
    const sources = await prisma.sourceRecord.findMany({
      where: { id: { in: input.sourceIds } },
    });
    if (sources.length !== input.sourceIds.length) {
      return apiError("SOURCE_NOT_FOUND", "One or more sources were not found.");
    }
  }

  const discovery = await prisma.discovery.create({
    data: {
      title: input.title,
      slug: input.slug,
      subtitle: input.subtitle,
      dek: input.dek,
      difficulty: input.difficulty,
      evidenceStatus: input.evidenceStatus,
      primaryTopicId: input.primaryTopicId,
      heroImageId: input.heroImageId ?? null,
      noImageException: input.noImageException,
      status: "draft",
      versions: {
        create: {
          versionNumber: 1,
          quickMarkdown: input.quickMarkdown,
          learnMarkdown: input.learnMarkdown,
          deepMarkdown: input.deepMarkdown,
          whatHappenedMarkdown: input.whatHappenedMarkdown,
          whyItMattersMarkdown: input.whyItMattersMarkdown,
          howMeasuredMarkdown: input.howMeasuredMarkdown,
          priorUnderstandingMarkdown: input.priorUnderstandingMarkdown,
          uncertaintyMarkdown: input.uncertaintyMarkdown,
          changeSummary: input.changeSummary ?? "Initial draft",
        },
      },
      sources: {
        create: input.sourceIds.map((sourceRecordId) => ({ sourceRecordId })),
      },
      concepts: {
        create: input.conceptIds.map((conceptId) => ({ conceptId })),
      },
      lessons: {
        create: input.lessonIds.map((lessonId) => ({ lessonId })),
      },
      auditLogs: {
        create: {
          action: "create_draft",
          toStatus: "draft",
          message: "Discovery draft created.",
        },
      },
    },
    include: discoveryInclude,
  });

  return Response.json(
    { data: toDiscoveryDetail(discovery) },
    { status: 201 },
  );
}

export async function GET() {
  // Admin list helper — public list is /api/v1/discoveries without drafts
  if (!(await isAdminAuthenticated())) {
    return apiError("UNAUTHORIZED", "Admin authentication required.", undefined, 401);
  }

  const rows = await prisma.discovery.findMany({
    include: discoveryInclude,
    orderBy: { updatedAt: "desc" },
  });

  return Response.json({
    data: rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      status: row.status,
      evidenceStatus: row.evidenceStatus,
      sourceCount: row.sources.length,
      version: latestVersion(row.versions)?.versionNumber ?? 0,
      publishGateFailures: validatePublishGates({
        title: row.title,
        slug: row.slug,
        evidenceStatus: row.evidenceStatus,
        primaryTopicId: row.primaryTopicId,
        heroImage: row.heroImage,
        noImageException: row.noImageException,
        sourceCount: row.sources.length,
        hasReviewedContent: row.versions.length > 0,
      }),
    })),
  });
}
