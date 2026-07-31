import { DiscoveryCard } from "@/components/discovery-card";
import { toDiscoveryListItem } from "@/lib/content";
import { listPublishedDiscoveries } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Discoveries",
  description: "Current astronomy discoveries with sources and evidence status.",
};

export default async function DiscoveriesPage() {
  const rows = await listPublishedDiscoveries();
  const discoveries = rows
    .map(toDiscoveryListItem)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div>
      <h1 className="font-display text-3xl text-star-50 md:text-4xl">
        Discoveries
      </h1>
      <p className="mt-3 max-w-2xl text-star-100/75">
        Every story links to evidence, concepts, and lessons — a gateway from
        headlines to understanding.
      </p>

      {discoveries.length === 0 ? (
        <div className="mt-10 rounded-md border border-dashed border-white/20 px-6 py-12 text-center text-star-200/70">
          No published discoveries yet.
        </div>
      ) : (
        <div className="mt-8">
          {discoveries.map((discovery) => (
            <DiscoveryCard key={discovery.id} discovery={discovery} />
          ))}
        </div>
      )}
    </div>
  );
}
