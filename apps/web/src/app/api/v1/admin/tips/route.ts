import { CreateTipCandidateSchema } from "@cosmic-gateway/contracts";
import { prisma } from "@/lib/db";
import { apiError } from "@/lib/content";
import { isAdminAuthenticated, requireAdminWrite } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return apiError("UNAUTHORIZED", "Admin authentication required.", undefined, 401);
  }

  const tips = await prisma.tipCandidate.findMany({
    orderBy: [{ status: "asc" }, { fetchedAt: "desc" }],
  });

  return Response.json({
    data: tips.map((tip) => ({
      id: tip.id,
      title: tip.title,
      tipUrl: tip.tipUrl,
      primarySourceUrls: tip.primarySourceUrls,
      status: tip.status,
      notes: tip.notes,
      organization: tip.organization,
      fetchedAt: tip.fetchedAt.toISOString(),
    })),
  });
}

export async function POST(request: Request) {
  const gate = await requireAdminWrite();
  if (!gate.ok) return gate.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be JSON.");
  }

  const parsed = CreateTipCandidateSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("VALIDATION_ERROR", "Invalid tip candidate.", parsed.error.flatten());
  }

  try {
    const tip = await prisma.tipCandidate.create({
      data: {
        title: parsed.data.title,
        tipUrl: parsed.data.tipUrl,
        primarySourceUrls: parsed.data.primarySourceUrls,
        notes: parsed.data.notes,
        organization: parsed.data.organization,
        status: "new",
      },
    });

    return Response.json(
      {
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
      },
      { status: 201 },
    );
  } catch {
    return apiError("TIP_CREATE_FAILED", "Could not create tip (URL may already exist).");
  }
}
