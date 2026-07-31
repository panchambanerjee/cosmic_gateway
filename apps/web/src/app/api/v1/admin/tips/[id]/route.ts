import { UpdateTipCandidateSchema } from "@cosmic-gateway/contracts";
import { prisma } from "@/lib/db";
import { apiError } from "@/lib/content";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Props) {
  if (!(await isAdminAuthenticated())) {
    return apiError("UNAUTHORIZED", "Admin authentication required.", undefined, 401);
  }

  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be JSON.");
  }

  const parsed = UpdateTipCandidateSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", "Invalid tip update.", parsed.error.flatten());
  }

  const existing = await prisma.tipCandidate.findUnique({ where: { id } });
  if (!existing) {
    return apiError("NOT_FOUND", "Tip candidate not found.", undefined, 404);
  }

  const tip = await prisma.tipCandidate.update({
    where: { id },
    data: {
      status: parsed.data.status,
      primarySourceUrls: parsed.data.primarySourceUrls,
      notes: parsed.data.notes,
    },
  });

  return Response.json({
    data: {
      id: tip.id,
      title: tip.title,
      tipUrl: tip.tipUrl,
      primarySourceUrls: tip.primarySourceUrls,
      status: tip.status,
      notes: tip.notes,
      organization: tip.organization,
      fetchedAt: tip.fetchedAt.toISOString(),
    },
  });
}
