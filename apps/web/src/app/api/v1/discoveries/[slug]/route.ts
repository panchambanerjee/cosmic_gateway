import { apiError, toDiscoveryDetail } from "@/lib/content";
import { getDiscoveryBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  try {
    const { slug } = await params;
    const discovery = await getDiscoveryBySlug(slug);

    if (!discovery || discovery.status !== "published") {
      return apiError("NOT_FOUND", "Discovery not found.", undefined, 404);
    }

    const detail = toDiscoveryDetail(discovery);
    if (!detail) {
      return apiError("NOT_FOUND", "Discovery content missing.", undefined, 404);
    }

    return Response.json({ data: detail });
  } catch (error) {
    console.error(error);
    return apiError(
      "DISCOVERY_FETCH_FAILED",
      "Could not load discovery.",
      undefined,
      500,
    );
  }
}
