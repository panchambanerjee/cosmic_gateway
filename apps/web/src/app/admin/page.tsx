import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listAllDiscoveriesForAdmin } from "@/lib/db";
import { latestVersion, validatePublishGates } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const discoveries = await listAllDiscoveriesForAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-star-50">Editorial</h1>
          <p className="mt-2 text-star-200/70">
            Manual publish path — sources and image rights required.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AdminLogoutButton />
          <Link
            href="/admin/tips"
            className="rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-star-50 hover:border-nebula-400/50"
          >
            Tip queue
          </Link>
          <Link
            href="/admin/discoveries/new"
            className="rounded-md bg-nebula-600 px-4 py-2 text-sm font-semibold text-white hover:bg-nebula-500"
          >
            New discovery
          </Link>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-white/15 text-star-200/70">
            <tr>
              <th className="py-2 pr-4 font-medium">Title</th>
              <th className="py-2 pr-4 font-medium">Status</th>
              <th className="py-2 pr-4 font-medium">Sources</th>
              <th className="py-2 pr-4 font-medium">Gates</th>
              <th className="py-2 font-medium">Open</th>
            </tr>
          </thead>
          <tbody>
            {discoveries.map((d) => {
              const failures = validatePublishGates({
                title: d.title,
                slug: d.slug,
                evidenceStatus: d.evidenceStatus,
                primaryTopicId: d.primaryTopicId,
                heroImage: d.heroImage,
                noImageException: d.noImageException,
                sourceCount: d.sources.length,
                hasReviewedContent: d.versions.length > 0,
              });
              return (
                <tr key={d.id} className="border-b border-white/10">
                  <td className="py-3 pr-4 text-star-50">{d.title}</td>
                  <td className="py-3 pr-4 text-star-200/80">
                    {d.status.replaceAll("_", " ")}
                    <div className="text-xs text-star-200/50">
                      v{latestVersion(d.versions)?.versionNumber ?? 0}
                    </div>
                  </td>
                  <td className="py-3 pr-4">{d.sources.length}</td>
                  <td className="py-3 pr-4">
                    {failures.length === 0 ? (
                      <span className="text-nebula-400">Ready</span>
                    ) : (
                      <span className="text-signal-400">
                        {failures.length} issue
                        {failures.length === 1 ? "" : "s"}
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/admin/discoveries/${d.id}`}
                      className="text-nebula-400 hover:underline"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
