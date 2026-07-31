import { toDiscoveryListItem } from "@/lib/content";
import { listPublishedDiscoveries } from "@/lib/db";
import { apiError } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await listPublishedDiscoveries();
    const data = rows
      .map(toDiscoveryListItem)
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
    return Response.json({ data });
  } catch (error) {
    console.error(error);
    return apiError(
      "DISCOVERIES_LIST_FAILED",
      "Could not load discoveries.",
      undefined,
      500,
    );
  }
}
