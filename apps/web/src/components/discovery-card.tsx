import Link from "next/link";
import type { DiscoveryListItem } from "@cosmic-gateway/contracts";
import { EvidenceBadge } from "./evidence-badge";
import { CreditedImage } from "./credited-image";

export function DiscoveryCard({ discovery }: { discovery: DiscoveryListItem }) {
  return (
    <article className="group overflow-hidden border-b border-white/10 py-8 first:pt-0">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <EvidenceBadge status={discovery.evidenceStatus} />
            {discovery.primaryTopic ? (
              <span className="text-xs uppercase tracking-[0.16em] text-star-300/70">
                {discovery.primaryTopic.name}
              </span>
            ) : null}
          </div>
          <h2 className="font-display text-2xl text-star-50 md:text-3xl">
            <Link
              href={`/discoveries/${discovery.slug}`}
              className="hover:text-nebula-400"
            >
              {discovery.title}
            </Link>
          </h2>
          {discovery.subtitle ? (
            <p className="mt-2 text-base text-star-100/80 md:text-lg">
              {discovery.subtitle}
            </p>
          ) : null}
          <p className="mt-4 text-sm text-star-200/60">
            Quick {discovery.readingTimes.quick} · Learn{" "}
            {discovery.readingTimes.learn} · Deep {discovery.readingTimes.deep}{" "}
            min
          </p>
        </div>
        {discovery.heroImage ? (
          <CreditedImage
            image={discovery.heroImage}
            size="card"
            className="rounded-sm border border-white/10"
          />
        ) : null}
      </div>
    </article>
  );
}
