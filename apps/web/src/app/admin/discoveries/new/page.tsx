import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { NewDiscoveryForm } from "@/components/new-discovery-form";

export const dynamic = "force-dynamic";

export default async function NewDiscoveryPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  const [topics, sources, images, concepts, lessons] = await Promise.all([
    prisma.topic.findMany({ orderBy: { name: "asc" } }),
    prisma.sourceRecord.findMany({ orderBy: { title: "asc" } }),
    prisma.imageAsset.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.concept.findMany({ orderBy: { name: "asc" } }),
    prisma.lesson.findMany({ orderBy: { title: "asc" } }),
  ]);

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-star-50">New discovery draft</h1>
      <p className="mt-2 text-star-200/70">
        Create a draft, then advance it through review states before publishing.
      </p>
      <div className="mt-8">
        <NewDiscoveryForm
          topics={topics.map((t) => ({ id: t.id, name: t.name }))}
          sources={sources.map((s) => ({ id: s.id, title: s.title }))}
          images={images.map((i) => ({
            id: i.id,
            creditLine: i.creditLine,
            publicationAllowed: i.publicationAllowed,
          }))}
          concepts={concepts.map((c) => ({ id: c.id, name: c.name }))}
          lessons={lessons.map((l) => ({ id: l.id, title: l.title }))}
        />
      </div>
    </div>
  );
}
