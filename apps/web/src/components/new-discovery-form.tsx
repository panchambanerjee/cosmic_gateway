"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Option = { id: string; name?: string; title?: string; creditLine?: string; publicationAllowed?: boolean };

const emptyContent = {
  summaryMarkdown: "",
  articleMarkdown: "",
  whatHappenedMarkdown: "",
  whyItMattersMarkdown: "",
  howMeasuredMarkdown: "",
  priorUnderstandingMarkdown: "",
  uncertaintyMarkdown: "",
};

export function NewDiscoveryForm({
  topics,
  sources,
  images,
  concepts,
  lessons,
}: {
  topics: Option[];
  sources: Option[];
  images: Option[];
  concepts: Option[];
  lessons: Option[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    subtitle: "",
    dek: "",
    difficulty: "beginner",
    evidenceStatus: "preliminary",
    primaryTopicId: topics[0]?.id ?? "",
    heroImageId: images[0]?.id ?? "",
    noImageException: false,
    sourceIds: [] as string[],
    conceptIds: [] as string[],
    lessonIds: [] as string[],
    ...emptyContent,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleId(key: "sourceIds" | "conceptIds" | "lessonIds", id: string) {
    setForm((prev) => {
      const set = new Set(prev[key]);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...prev, [key]: Array.from(set) };
    });
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...form,
      heroImageId: form.noImageException || !form.heroImageId ? null : form.heroImageId,
    };

    const res = await fetch("/api/v1/admin/discoveries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error?.message ?? "Could not create draft");
      return;
    }

    const data = await res.json();
    router.push(`/admin/discoveries/${data.data.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {(
        [
          ["title", "Title"],
          ["slug", "Slug"],
          ["subtitle", "Subtitle"],
          ["dek", "Dek"],
        ] as const
      ).map(([key, label]) => (
        <label key={key} className="block text-sm text-star-100/80">
          {label}
          <input
            required={key === "title" || key === "slug"}
            value={form[key]}
            onChange={(e) => update(key, e.target.value)}
            className="mt-1 w-full rounded-md border border-white/15 bg-void-900 px-3 py-2 text-star-50 outline-none focus:border-nebula-400"
          />
        </label>
      ))}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-star-100/80">
          Difficulty
          <select
            value={form.difficulty}
            onChange={(e) => update("difficulty", e.target.value)}
            className="mt-1 w-full rounded-md border border-white/15 bg-void-900 px-3 py-2 text-star-50"
          >
            <option value="beginner">beginner</option>
            <option value="intermediate">intermediate</option>
            <option value="advanced">advanced</option>
          </select>
        </label>
        <label className="block text-sm text-star-100/80">
          Evidence status
          <select
            value={form.evidenceStatus}
            onChange={(e) => update("evidenceStatus", e.target.value)}
            className="mt-1 w-full rounded-md border border-white/15 bg-void-900 px-3 py-2 text-star-50"
          >
            <option value="official_release">official_release</option>
            <option value="preliminary">preliminary</option>
            <option value="preprint">preprint</option>
            <option value="peer_reviewed">peer_reviewed</option>
            <option value="confirmed">confirmed</option>
            <option value="disputed">disputed</option>
          </select>
        </label>
      </div>

      <label className="block text-sm text-star-100/80">
        Primary topic
        <select
          required
          value={form.primaryTopicId}
          onChange={(e) => update("primaryTopicId", e.target.value)}
          className="mt-1 w-full rounded-md border border-white/15 bg-void-900 px-3 py-2 text-star-50"
        >
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm text-star-100/80">
        <input
          type="checkbox"
          checked={form.noImageException}
          onChange={(e) => update("noImageException", e.target.checked)}
        />
        Approved no-image exception
      </label>

      {!form.noImageException ? (
        <label className="block text-sm text-star-100/80">
          Hero image
          <select
            value={form.heroImageId}
            onChange={(e) => update("heroImageId", e.target.value)}
            className="mt-1 w-full rounded-md border border-white/15 bg-void-900 px-3 py-2 text-star-50"
          >
            <option value="">None</option>
            {images.map((i) => (
              <option key={i.id} value={i.id}>
                {i.creditLine}
                {i.publicationAllowed ? "" : " (not publication-allowed)"}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <fieldset className="space-y-2">
        <legend className="text-sm text-star-100/80">Sources</legend>
        {sources.map((s) => (
          <label key={s.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.sourceIds.includes(s.id)}
              onChange={() => toggleId("sourceIds", s.id)}
            />
            {s.title}
          </label>
        ))}
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm text-star-100/80">Concepts</legend>
        {concepts.map((c) => (
          <label key={c.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.conceptIds.includes(c.id)}
              onChange={() => toggleId("conceptIds", c.id)}
            />
            {c.name}
          </label>
        ))}
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm text-star-100/80">Lessons</legend>
        {lessons.map((l) => (
          <label key={l.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.lessonIds.includes(l.id)}
              onChange={() => toggleId("lessonIds", l.id)}
            />
            {l.title}
          </label>
        ))}
      </fieldset>

      {(
        [
          ["summaryMarkdown", "Summary"],
          ["articleMarkdown", "Article"],
          ["whatHappenedMarkdown", "What happened"],
          ["whyItMattersMarkdown", "Why it matters"],
          ["howMeasuredMarkdown", "How measured"],
          ["priorUnderstandingMarkdown", "Prior understanding"],
          ["uncertaintyMarkdown", "Uncertainty"],
        ] as const
      ).map(([key, label]) => (
        <label key={key} className="block text-sm text-star-100/80">
          {label}
          <textarea
            required
            rows={4}
            value={form[key]}
            onChange={(e) => update(key, e.target.value)}
            className="mt-1 w-full rounded-md border border-white/15 bg-void-900 px-3 py-2 text-star-50 outline-none focus:border-nebula-400"
          />
        </label>
      ))}

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-nebula-600 px-4 py-2 text-sm font-semibold text-white hover:bg-nebula-500 disabled:opacity-60"
      >
        {loading ? "Saving…" : "Create draft"}
      </button>
    </form>
  );
}
