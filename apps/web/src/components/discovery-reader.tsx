"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { DiscoveryDetail, ReadingDepth } from "@cosmic-gateway/contracts";
import { DepthSwitcher } from "./depth-switcher";
import { EvidenceBadge } from "./evidence-badge";
import { CreditedImage } from "./credited-image";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function linkConceptsInText(
  text: string,
  concepts: DiscoveryDetail["concepts"],
) {
  if (!concepts.length) return [<span key="t">{text}</span>];

  const sorted = [...concepts].sort((a, b) => b.name.length - a.name.length);
  const pattern = new RegExp(
    `\\b(${sorted.map((c) => escapeRegExp(c.name)).join("|")})\\b`,
    "gi",
  );
  const slugByName = new Map(
    sorted.map((c) => [c.name.toLowerCase(), c.slug] as const),
  );

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    const matched = match[1];
    const slug = slugByName.get(matched.toLowerCase());
    if (slug) {
      parts.push(
        <Link
          key={key++}
          href={`/concepts/${slug}`}
          className="text-nebula-400 underline decoration-nebula-400/40 underline-offset-2 hover:decoration-nebula-400"
        >
          {matched}
        </Link>,
      );
    } else {
      parts.push(<span key={key++}>{matched}</span>);
    }
    lastIndex = match.index + matched.length;
  }

  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  return parts.length ? parts : [<span key="empty">{text}</span>];
}

function renderMarkdownLite(
  markdown: string,
  concepts: DiscoveryDetail["concepts"],
) {
  return markdown.split("\n\n").map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={index} className="font-display text-xl text-star-50 mt-8 mb-3">
          {trimmed.replace(/^##\s+/, "")}
        </h2>
      );
    }
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter((line) => line.startsWith("- "));
      return (
        <ul key={index} className="list-disc space-y-2 pl-5">
          {items.map((item) => (
            <li key={item}>
              {linkConceptsInText(item.replace(/^-+\s*/, ""), concepts)}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="text-base md:text-lg leading-relaxed">
        {trimmed.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={i}>
                {linkConceptsInText(part.slice(2, -2), concepts)}
              </strong>
            );
          }
          return <span key={i}>{linkConceptsInText(part, concepts)}</span>;
        })}
      </p>
    );
  });
}

function sourceLabel(sourceType: string) {
  if (sourceType === "news") return "Secondary tip / news";
  if (sourceType === "official_release") return "Primary · official release";
  if (sourceType === "paper") return "Primary · paper";
  return sourceType.replaceAll("_", " ");
}

export function DiscoveryReader({ discovery }: { discovery: DiscoveryDetail }) {
  const [depth, setDepth] = useState<ReadingDepth>("learn");
  const body = useMemo(() => discovery.content[depth], [discovery.content, depth]);

  return (
    <article>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <EvidenceBadge status={discovery.evidenceStatus} />
        <span className="text-xs uppercase tracking-[0.16em] text-star-300/70">
          {discovery.difficulty}
        </span>
        {discovery.primaryTopic ? (
          <span className="text-xs text-star-200/60">
            {discovery.primaryTopic.name}
          </span>
        ) : null}
      </div>

      <h1 className="font-display text-3xl leading-tight text-star-50 md:text-5xl">
        {discovery.title}
      </h1>
      {discovery.subtitle ? (
        <p className="mt-4 max-w-3xl text-lg text-star-100/80 md:text-xl">
          {discovery.subtitle}
        </p>
      ) : null}

      {discovery.concepts.length > 0 ? (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.14em] text-star-300/70">
            Learning terms
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {discovery.concepts.map((concept) => (
              <Link
                key={concept.id}
                href={`/concepts/${concept.slug}`}
                className="rounded-md border border-nebula-500/30 bg-nebula-500/10 px-2.5 py-1 text-sm text-nebula-400 hover:border-nebula-400/60"
              >
                {concept.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {discovery.heroImage ? (
        <CreditedImage
          image={discovery.heroImage}
          priority
          className="mt-8 max-h-[28rem] rounded-sm border border-white/10"
        />
      ) : discovery.noImageException ? (
        <p className="mt-6 text-sm text-star-200/60">
          No hero image (approved exception).
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <DepthSwitcher
          value={depth}
          onChange={setDepth}
          readingTimes={discovery.readingTimes}
        />
        <p className="text-sm text-star-200/60">
          Version {discovery.versionNumber}
          {discovery.changeSummary ? ` · ${discovery.changeSummary}` : ""}
        </p>
      </div>

      <div className="prose-cosmo mt-8 max-w-3xl">
        {renderMarkdownLite(body, discovery.concepts)}
      </div>

      <section className="mt-12 max-w-3xl border-t border-white/10 pt-8">
        <h2 className="font-display text-2xl text-star-50">Key sections</h2>
        <dl className="mt-4 space-y-5">
          {(
            [
              ["What happened", discovery.sections.whatHappened],
              ["Why it matters", discovery.sections.whyItMatters],
              ["How it was measured", discovery.sections.howMeasured],
              ["Prior understanding", discovery.sections.priorUnderstanding],
              ["What remains uncertain", discovery.sections.uncertainty],
            ] as const
          ).map(([label, text]) => (
            <div key={label}>
              <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-nebula-400">
                {label}
              </dt>
              <dd className="mt-1 text-star-100/85">
                {linkConceptsInText(text, discovery.concepts)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {discovery.concepts.length > 0 ? (
        <section className="mt-12 max-w-3xl border-t border-white/10 pt-8">
          <h2 className="font-display text-2xl text-star-50">
            Build understanding
          </h2>
          <ul className="mt-4 space-y-3">
            {discovery.concepts.map((concept) => (
              <li key={concept.id}>
                <Link
                  href={`/concepts/${concept.slug}`}
                  className="text-nebula-400 hover:underline"
                >
                  {concept.name}
                </Link>
                <p className="text-sm text-star-200/70">
                  {concept.shortDefinition}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {discovery.relatedLessons.length > 0 ? (
        <section className="mt-12 max-w-3xl border-t border-white/10 pt-8">
          <h2 className="font-display text-2xl text-star-50">Related lesson</h2>
          <ul className="mt-4 space-y-3">
            {discovery.relatedLessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/lessons/${lesson.slug}`}
                  className="text-nebula-400 hover:underline"
                >
                  {lesson.title}
                </Link>
                <p className="text-sm text-star-200/70">{lesson.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-12 max-w-3xl border-t border-white/10 pt-8">
        <h2 className="font-display text-2xl text-star-50">Sources</h2>
        <p className="mt-1 text-sm text-star-200/60">
          Primary sources first. News tips are secondary signals, not the
          canonical account.
        </p>
        <ul className="mt-4 space-y-3">
          {discovery.sources.map((source) => (
            <li key={source.id}>
              <a
                href={source.canonicalUrl}
                target="_blank"
                rel="noreferrer"
                className="text-nebula-400 hover:underline"
              >
                {source.title}
              </a>
              <p className="text-xs text-star-200/60">
                {sourceLabel(source.sourceType)}
                {source.organization ? ` · ${source.organization}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {discovery.updateHistory.length > 1 ? (
        <section className="mt-12 max-w-3xl border-t border-white/10 pt-8">
          <h2 className="font-display text-2xl text-star-50">Update history</h2>
          <ol className="mt-4 space-y-2 text-sm text-star-200/70">
            {discovery.updateHistory.map((entry) => (
              <li key={entry.versionNumber}>
                v{entry.versionNumber} ·{" "}
                {new Date(entry.createdAt).toLocaleString()}
                {entry.changeSummary ? ` — ${entry.changeSummary}` : ""}
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </article>
  );
}
