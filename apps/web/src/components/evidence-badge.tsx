import type { EvidenceStatus } from "@cosmic-gateway/contracts";

const LABELS: Record<EvidenceStatus, string> = {
  official_release: "Official release",
  preliminary: "Preliminary",
  preprint: "Preprint",
  peer_reviewed: "Peer reviewed",
  confirmed: "Confirmed",
  disputed: "Disputed",
};

const TONES: Record<EvidenceStatus, string> = {
  official_release: "border-nebula-500/40 bg-nebula-500/10 text-nebula-400",
  preliminary: "border-signal-400/40 bg-signal-400/10 text-signal-400",
  preprint: "border-star-300/40 bg-star-300/10 text-star-200",
  peer_reviewed: "border-nebula-400/50 bg-nebula-400/15 text-nebula-400",
  confirmed: "border-nebula-400/60 bg-nebula-400/20 text-nebula-400",
  disputed: "border-red-400/40 bg-red-400/10 text-red-300",
};

export function EvidenceBadge({ status }: { status: EvidenceStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium tracking-wide ${TONES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
