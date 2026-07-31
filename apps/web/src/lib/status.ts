import type { DiscoveryStatus } from "@cosmic-gateway/contracts";

export const DISCOVERY_STATUS_FLOW: DiscoveryStatus[] = [
  "draft",
  "science_review",
  "rights_review",
  "ready_to_publish",
  "published",
  "archived",
];

export function canTransition(
  from: DiscoveryStatus,
  to: DiscoveryStatus,
): boolean {
  if (from === to) return true;
  if (to === "archived" && from === "published") return true;
  if (from === "published" && to === "ready_to_publish") return true;

  const fromIndex = DISCOVERY_STATUS_FLOW.indexOf(from);
  const toIndex = DISCOVERY_STATUS_FLOW.indexOf(to);
  if (fromIndex < 0 || toIndex < 0) return false;

  if (to === "draft") return true;
  return toIndex === fromIndex + 1;
}
