import Link from "next/link";
import { DiscoveryCard } from "@/components/discovery-card";
import { toDiscoveryListItem } from "@/lib/content";
import { listPublishedDiscoveries } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const rows = await listPublishedDiscoveries();
  const discoveries = rows
    .map(toDiscoveryListItem)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const featured = discoveries[0];

  return (
    <div>
      <section className="relative overflow-hidden pb-14 pt-4 md:pb-20 md:pt-8">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          <div className="absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-nebula-500/20 blur-3xl" />
        </div>
        <p className="font-display text-4xl text-star-50 md:text-6xl">
          Cosmic Gateway
        </p>
        <p className="mt-4 max-w-2xl font-display text-xl text-star-100/90 md:text-2xl">
          A daily gateway from astronomy discoveries to genuine understanding.
        </p>
        <p className="mt-5 max-w-xl text-base text-star-200/70 md:text-lg">
          Read what happened in astronomy, see the evidence, and follow the
          concepts that make the headline make sense.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/discoveries"
            className="rounded-md bg-nebula-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-nebula-500"
          >
            Explore discoveries
          </Link>
          {featured ? (
            <Link
              href={`/discoveries/${featured.slug}`}
              className="rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-star-50 hover:border-nebula-400/50"
            >
              Today&apos;s featured read
            </Link>
          ) : null}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl text-star-50">Latest discoveries</h2>
          <Link
            href="/discoveries"
            className="text-sm text-nebula-400 hover:underline"
          >
            View all
          </Link>
        </div>
        {discoveries.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {discoveries.map((discovery) => (
              <DiscoveryCard key={discovery.id} discovery={discovery} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-md border border-dashed border-white/20 px-6 py-12 text-center">
      <p className="font-display text-xl text-star-50">No discoveries yet</p>
      <p className="mt-2 text-star-200/70">
        Seed the database or publish from Admin to see content here.
      </p>
      <Link
        href="/admin"
        className="mt-4 inline-block text-nebula-400 hover:underline"
      >
        Open admin
      </Link>
    </div>
  );
}
