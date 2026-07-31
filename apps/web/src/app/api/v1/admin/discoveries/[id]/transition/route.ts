import { z } from "zod";
import { prisma, discoveryInclude } from "@/lib/db";
import { apiError, toDiscoveryDetail, validatePublishGates } from "@/lib/content";
import { canTransition } from "@/lib/status";
import { requireAdminWrite } from "@/lib/admin-auth";
import type { DiscoveryStatus } from "@cosmic-gateway/contracts";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

const TransitionSchema = z.object({
  toStatus: z.enum([
    "draft",
    "science_review",
    "rights_review",
    "ready_to_publish",
    "published",
    "archived",
  ]),
  message: z.string().optional(),
});

export async function POST(request: Request, { params }: Props) {
  const gate = await requireAdminWrite();
  if (!gate.ok) return gate.response;

  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be JSON.");
  }

  const parsed = TransitionSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", "Invalid transition.", parsed.error.flatten());
  }

  const discovery = await prisma.discovery.findUnique({
    where: { id },
    include: discoveryInclude,
  });

  if (!discovery) {
    return apiError("NOT_FOUND", "Discovery not found.", undefined, 404);
  }

  const toStatus = parsed.data.toStatus as DiscoveryStatus;
  if (!canTransition(discovery.status, toStatus)) {
    return apiError(
      "INVALID_TRANSITION",
      `Cannot transition from ${discovery.status} to ${toStatus}.`,
    );
  }

  if (toStatus === "published") {
    const failures = validatePublishGates({
      title: discovery.title,
      slug: discovery.slug,
      evidenceStatus: discovery.evidenceStatus,
      primaryTopicId: discovery.primaryTopicId,
      heroImage: discovery.heroImage,
      noImageException: discovery.noImageException,
      sourceCount: discovery.sources.length,
      hasReviewedContent: discovery.versions.length > 0,
    });

    if (failures.length) {
      return apiError(
        "PUBLISH_GATES_FAILED",
        "Discovery cannot be published until gates pass.",
        failures,
      );
    }
  }

  const updated = await prisma.discovery.update({
    where: { id },
    data: {
      status: toStatus,
      publishedAt:
        toStatus === "published"
          ? discovery.publishedAt ?? new Date()
          : discovery.publishedAt,
      lastReviewedAt: new Date(),
      auditLogs: {
        create: {
          action: toStatus === "published" ? "publish" : "status_transition",
          fromStatus: discovery.status,
          toStatus,
          message: parsed.data.message ?? `Status changed to ${toStatus}`,
        },
      },
    },
    include: discoveryInclude,
  });

  return Response.json({ data: toDiscoveryDetail(updated) });
}
