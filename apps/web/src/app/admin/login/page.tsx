import Link from "next/link";
import { AdminLoginForm } from "@/components/admin-login-form";
import { isAdminAuthConfigured, isOpenAdminMode } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const nextPath =
    params.next && params.next.startsWith("/admin") ? params.next : "/admin";
  const notConfigured = params.error === "not_configured" || !isAdminAuthConfigured();
  const open = isOpenAdminMode();

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-3xl text-star-50">Admin sign in</h1>
      <p className="mt-2 text-star-200/70">
        Editorial tools for Cosmic Gateway. Not a public account system.
      </p>

      {open ? (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-star-200/80">
            Local open-admin mode is on (no credentials configured).{" "}
            <Link href="/admin" className="text-nebula-400 hover:underline">
              Continue to admin
            </Link>
          </p>
        </div>
      ) : notConfigured && process.env.NODE_ENV === "production" ? (
        <p className="mt-6 text-sm text-signal-400">
          Admin auth is not configured. Set AUTH_SECRET, ADMIN_USERNAME, and
          ADMIN_PASSWORD_HASH in the deployment environment.
        </p>
      ) : (
        <div className="mt-6">
          <AdminLoginForm nextPath={nextPath} />
        </div>
      )}
    </div>
  );
}
