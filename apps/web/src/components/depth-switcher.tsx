"use client";

import type { ReadingDepth } from "@cosmic-gateway/contracts";

const OPTIONS: Array<{ id: ReadingDepth; label: string; hint: string }> = [
  { id: "quick", label: "Quick", hint: "~1 min" },
  { id: "learn", label: "Learn", hint: "~5 min" },
  { id: "deep", label: "Deep dive", hint: "~15 min" },
];

export function DepthSwitcher({
  value,
  onChange,
  readingTimes,
}: {
  value: ReadingDepth;
  onChange: (depth: ReadingDepth) => void;
  readingTimes: { quick: number; learn: number; deep: number };
}) {
  return (
    <div
      className="inline-flex rounded-lg border border-white/15 bg-void-900/80 p-1"
      role="tablist"
      aria-label="Reading depth"
    >
      {OPTIONS.map((option) => {
        const selected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.id)}
            className={`rounded-md px-3 py-2 text-left transition ${
              selected
                ? "bg-nebula-600 text-white shadow"
                : "text-star-100/70 hover:text-star-50"
            }`}
          >
            <div className="text-sm font-semibold">{option.label}</div>
            <div className="text-[11px] opacity-80">
              {readingTimes[option.id]} min
            </div>
          </button>
        );
      })}
    </div>
  );
}
