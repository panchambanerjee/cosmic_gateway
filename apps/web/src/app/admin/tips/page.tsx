import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { TipImportForm } from "@/components/tip-import-form";
import { TipStatusControls } from "@/components/tip-status-controls";

export const dynamic = "force-dynamic";

export default async function AdminTipsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  const tips = await prisma.tipCandidate.findMany({
    orderBy: [{ status: "asc" }, { fetchedAt: "desc" }],
  });

  return (
    <div className="space-y-10">
      <div>
        <Link href="/admin" className="text-sm text-nebula-400 hover:underline">
          ← Editorial
        </Link>
        <h1 className="mt-3 font-display text-3xl text-star-50">Tip queue</h1>
        <p className="mt-2 max-w-2xl text-star-200/70">
          Tips are signals only. Attach primary sources, then write and publish a
          discovery through the normal gates. Never auto-publish tip text.
        </p>
      </div>

      <TipImportForm />

      <section>
        <h2 className="font-display text-2xl text-star-50">Candidates</h2>
        <div className="mt-4 space-y-4">
          {tips.length === 0 ? (
            <p className="text-star-200/70">No tip candidates yet.</p>
          ) : (
            tips.map((tip) => (
              <article
                key={tip.id}
                className="rounded-md border border-white/10 bg-void-900/30 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-star-300/70">
                      {tip.status}
                      {tip.organization ? ` · ${tip.organization}` : ""}
                    </p>
                    <h3 className="mt-1 font-display text-xl text-star-50">
                      {tip.title}
                    </h3>
                    <a
                      href={tip.tipUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block break-all text-sm text-nebula-400 hover:underline"
                    >
                      {tip.tipUrl}
                    </a>
                  </div>
                  <TipStatusControls tipId={tip.id} currentStatus={tip.status} />
                </div>
                {tip.primarySourceUrls.length > 0 ? (
                  <div className="mt-3">
                    <p className="text-xs uppercase tracking-[0.14em] text-star-300/70">
                      Primary sources
                    </p>
                    <ul className="mt-1 space-y-1 text-sm">
                      {tip.primarySourceUrls.map((url) => (
                        <li key={url}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="break-all text-nebula-400 hover:underline"
                          >
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {tip.notes ? (
                  <p className="mt-3 text-sm text-star-200/70">{tip.notes}</p>
                ) : null}
                <Link
                  href="/admin/discoveries/new"
                  className="mt-3 inline-block text-sm text-nebula-400 hover:underline"
                >
                  Open discovery draft form →
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
