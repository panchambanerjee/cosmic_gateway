"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function TipImportForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [tipUrl, setTipUrl] = useState("");
  const [primarySourceUrls, setPrimarySourceUrls] = useState("");
  const [organization, setOrganization] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      tipUrl,
      organization: organization || undefined,
      notes: notes || undefined,
      primarySourceUrls: primarySourceUrls
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };

    const res = await fetch("/api/v1/admin/tips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error?.message ?? "Could not import tip");
      return;
    }

    setTitle("");
    setTipUrl("");
    setPrimarySourceUrls("");
    setOrganization("");
    setNotes("");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-md border border-white/10 bg-void-900/40 p-4">
      <h2 className="font-display text-xl text-star-50">Import tip URL</h2>
      <p className="text-sm text-star-200/70">
        Store metadata only. Do not paste scraped article bodies. Attach primary
        ESO/NASA/paper URLs when known.
      </p>
      <label className="block text-sm">
        Title
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-md border border-white/15 bg-void-950 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Tip URL
        <input
          required
          type="url"
          value={tipUrl}
          onChange={(e) => setTipUrl(e.target.value)}
          className="mt-1 w-full rounded-md border border-white/15 bg-void-950 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Primary source URLs (one per line)
        <textarea
          rows={3}
          value={primarySourceUrls}
          onChange={(e) => setPrimarySourceUrls(e.target.value)}
          className="mt-1 w-full rounded-md border border-white/15 bg-void-950 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Organization
        <input
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="mt-1 w-full rounded-md border border-white/15 bg-void-950 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Notes
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 w-full rounded-md border border-white/15 bg-void-950 px-3 py-2"
        />
      </label>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-nebula-600 px-3 py-2 text-sm font-semibold text-white hover:bg-nebula-500 disabled:opacity-60"
      >
        {loading ? "Saving…" : "Add tip candidate"}
      </button>
    </form>
  );
}
