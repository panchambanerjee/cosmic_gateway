import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { toConceptSummary } from "@/lib/content";
import { MarkdownBody } from "@/components/markdown-body";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function ConceptPage({ params }: Props) {
  const { slug } = await params;
  const concept = await prisma.concept.findUnique({
    where: { slug },
    include: {
      discoveries: {
        include: {
          discovery: true,
        },
      },
      lessons: {
        include: { lesson: true },
      },
    },
  });

  if (!concept || concept.status !== "published") {
    notFound();
  }

  const summary = toConceptSummary(concept);

  return (
    <article className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.16em] text-star-300/70">
        Concept · {summary.difficulty}
      </p>
      <h1 className="mt-2 font-display text-4xl text-star-50">{concept.name}</h1>
      <p className="mt-4 text-lg text-star-100/85">{concept.shortDefinition}</p>
      <MarkdownBody markdown={concept.explanationMarkdown} />

      {(concept.wikipediaUrl || concept.externalUrl) && (
        <section className="mt-8 border-t border-white/10 pt-6">
          <h2 className="font-display text-xl text-star-50">Go deeper</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {concept.wikipediaUrl ? (
              <li>
                <a
                  href={concept.wikipediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-nebula-400 hover:underline"
                >
                  Wikipedia
                </a>
              </li>
            ) : null}
            {concept.externalUrl ? (
              <li>
                <a
                  href={concept.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-nebula-400 hover:underline"
                >
                  Further reading
                </a>
              </li>
            ) : null}
          </ul>
        </section>
      )}

      {concept.discoveries.length > 0 ? (
        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="font-display text-2xl text-star-50">
            Related discoveries
          </h2>
          <ul className="mt-4 space-y-2">
            {concept.discoveries
              .filter((row) => row.discovery.status === "published")
              .map((row) => (
                <li key={row.discovery.id}>
                  <Link
                    href={`/discoveries/${row.discovery.slug}`}
                    className="text-nebula-400 hover:underline"
                  >
                    {row.discovery.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ) : null}

      {concept.lessons.length > 0 ? (
        <section className="mt-10 border-t border-white/10 pt-8">
          <h2 className="font-display text-2xl text-star-50">Related lessons</h2>
          <ul className="mt-4 space-y-2">
            {concept.lessons
              .filter((row) => row.lesson.status === "published")
              .map((row) => (
                <li key={row.lesson.id}>
                  <Link
                    href={`/lessons/${row.lesson.slug}`}
                    className="text-nebula-400 hover:underline"
                  >
                    {row.lesson.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
