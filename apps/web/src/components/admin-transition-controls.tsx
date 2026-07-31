"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DiscoveryStatus } from "@cosmic-gateway/contracts";
import { DISCOVERY_STATUS_FLOW } from "@/lib/status";

export function AdminTransitionControls({
  discoveryId,
  currentStatus,
  canPublish,
}: {
  discoveryId: string;
  currentStatus: DiscoveryStatus;
  canPublish: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const currentIndex = DISCOVERY_STATUS_FLOW.indexOf(currentStatus);
  const next =
    currentIndex >= 0 && currentIndex < DISCOVERY_STATUS_FLOW.length - 1
      ? DISCOVERY_STATUS_FLOW[currentIndex + 1]
      : null;

  async function transition(toStatus: DiscoveryStatus) {
    setLoading(toStatus);
    setError(null);
    const res = await fetch(
      `/api/v1/admin/discoveries/${discoveryId}/transition`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toStatus }),
      },
    );
    setLoading(null);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const details = data?.error?.details;
      const detailText = Array.isArray(details)
        ? details.map((d: { message: string }) => d.message).join(" ")
        : "";
      setError(
        `${data?.error?.message ?? "Transition failed"}${detailText ? `: ${detailText}` : ""}`,
      );
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {next ? (
          <button
            type="button"
            disabled={Boolean(loading) || (next === "published" && !canPublish)}
            onClick={() => transition(next)}
            className="rounded-md bg-nebula-600 px-3 py-2 text-sm font-semibold text-white hover:bg-nebula-500 disabled:opacity-50"
          >
            {loading === next
              ? "Working…"
              : `Advance to ${next.replaceAll("_", " ")}`}
          </button>
        ) : null}
        {currentStatus !== "draft" ? (
          <button
            type="button"
            disabled={Boolean(loading)}
            onClick={() => transition("draft")}
            className="rounded-md border border-white/20 px-3 py-2 text-sm text-star-50 hover:border-nebula-400/50 disabled:opacity-50"
          >
            Return to draft
          </button>
        ) : null}
        {currentStatus === "published" ? (
          <button
            type="button"
            disabled={Boolean(loading)}
            onClick={() => transition("archived")}
            className="rounded-md border border-red-400/40 px-3 py-2 text-sm text-red-300 hover:bg-red-400/10 disabled:opacity-50"
          >
            Archive
          </button>
        ) : null}
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
