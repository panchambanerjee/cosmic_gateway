"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TipStatus } from "@cosmic-gateway/contracts";

export function TipStatusControls({
  tipId,
  currentStatus,
}: {
  tipId: string;
  currentStatus: TipStatus;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function setStatus(status: TipStatus) {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/v1/admin/tips/${tipId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error?.message ?? "Update failed");
      return;
    }
    router.refresh();
  }

  const options: TipStatus[] = ["new", "triaged", "used", "rejected"];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {options
          .filter((status) => status !== currentStatus)
          .map((status) => (
            <button
              key={status}
              type="button"
              disabled={loading}
              onClick={() => setStatus(status)}
              className="rounded border border-white/20 px-2 py-1 text-xs text-star-100 hover:border-nebula-400/50 disabled:opacity-50"
            >
              Mark {status}
            </button>
          ))}
      </div>
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
