import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { MarkdownBody } from "@/components/markdown-body";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { slug },
    include: {
      concepts: { include: { concept: true } },
      discoveries: { include: { discovery: true } },
    },
  });

  if (!lesson || lesson.status !== "published") {
    notFound();
  }

  return (
    <article className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.16em] text-star-300/70">
        Lesson · {lesson.difficulty} · {lesson.estimatedMinutes} min
      </p>
      <h1 className="mt-2 font-display text-4xl text-star-50">{lesson.title}</h1>
      <p className="mt-4 text-lg text-star-100/85">{lesson.summary}</p>
      <MarkdownBody markdown={lesson.bodyMarkdown} />

      {lesson.concepts.length > 0 ? (
        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="font-display text-2xl text-star-50">Concepts</h2>
          <ul className="mt-4 space-y-2">
            {lesson.concepts.map((row) => (
              <li key={row.concept.id}>
                <Link
                  href={`/concepts/${row.concept.slug}`}
                  className="text-nebula-400 hover:underline"
                >
                  {row.concept.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {lesson.discoveries.some((row) => row.discovery.status === "published") ? (
        <section className="mt-10 border-t border-white/10 pt-8">
          <h2 className="font-display text-2xl text-star-50">
            Seen in discoveries
          </h2>
          <ul className="mt-4 space-y-2">
            {lesson.discoveries
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
    </article>
  );
}
