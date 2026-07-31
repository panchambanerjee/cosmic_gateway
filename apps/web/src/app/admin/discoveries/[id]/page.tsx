import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma, discoveryInclude } from "@/lib/db";
import {
  DISCOVERY_STATUS_FLOW,
  latestVersion,
  validatePublishGates,
} from "@/lib/content";
import { AdminTransitionControls } from "@/components/admin-transition-controls";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminDiscoveryDetailPage({ params }: Props) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  const { id } = await params;
  const discovery = await prisma.discovery.findUnique({
    where: { id },
    include: {
      ...discoveryInclude,
      auditLogs: { orderBy: { createdAt: "desc" }, take: 30 },
    },
  });

  if (!discovery) {
    notFound();
  }

  const version = latestVersion(discovery.versions);
  const failures = validatePublishGates({
    title: discovery.title,
    slug: discovery.slug,
    evidenceStatus: discovery.evidenceStatus,
    primaryTopicId: discovery.primaryTopicId,
    heroImage: discovery.heroImage,
    noImageException: discovery.noImageException,
    sourceCount: discovery.sources.length,
    hasReviewedContent: discovery.versions.length > 0,
  });

  return (
    <div className="max-w-3xl">
      <Link href="/admin" className="text-sm text-nebula-400 hover:underline">
        ← Editorial queue
      </Link>
      <h1 className="mt-4 font-display text-3xl text-star-50">
        {discovery.title}
      </h1>
      <p className="mt-2 text-star-200/70">
        Status: {discovery.status.replaceAll("_", " ")} · Evidence:{" "}
        {discovery.evidenceStatus.replaceAll("_", " ")}
      </p>
      {discovery.status === "published" ? (
        <Link
          href={`/discoveries/${discovery.slug}`}
          className="mt-2 inline-block text-sm text-nebula-400 hover:underline"
        >
          View public page
        </Link>
      ) : null}

      <section className="mt-8 rounded-md border border-white/10 bg-void-900/50 p-4">
        <h2 className="font-display text-xl text-star-50">Publish gates</h2>
        {failures.length === 0 ? (
          <p className="mt-2 text-nebula-400">All gates pass.</p>
        ) : (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-signal-400">
            {failures.map((f) => (
              <li key={f.code}>{f.message}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl text-star-50">Advance workflow</h2>
        <p className="mt-1 text-sm text-star-200/60">
          Flow: {DISCOVERY_STATUS_FLOW.map((s) => s.replaceAll("_", " ")).join(" → ")}
        </p>
        <div className="mt-4">
          <AdminTransitionControls
            discoveryId={discovery.id}
            currentStatus={discovery.status}
            canPublish={failures.length === 0}
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl text-star-50">Sources</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {discovery.sources.map((row) => (
            <li key={row.sourceRecordId}>
              <a
                href={row.sourceRecord.canonicalUrl}
                className="text-nebula-400 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {row.sourceRecord.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {version ? (
        <section className="mt-8">
          <h2 className="font-display text-xl text-star-50">
            Current version (v{version.versionNumber})
          </h2>
          <p className="mt-2 text-sm text-star-200/70">{version.changeSummary}</p>
          <pre className="mt-3 max-h-64 overflow-auto rounded-md border border-white/10 bg-void-950 p-3 text-xs text-star-100/80 whitespace-pre-wrap">
            {version.quickMarkdown}
          </pre>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="font-display text-xl text-star-50">Audit log</h2>
        <ol className="mt-3 space-y-2 text-sm text-star-200/70">
          {discovery.auditLogs.map((log) => (
            <li key={log.id}>
              {new Date(log.createdAt).toLocaleString()} · {log.action}
              {log.fromStatus ? ` · ${log.fromStatus}` : ""}
              {log.toStatus ? ` → ${log.toStatus}` : ""}
              {log.message ? ` — ${log.message}` : ""}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
