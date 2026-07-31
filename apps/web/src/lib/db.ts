import { prisma } from "@cosmic-gateway/database";

export const discoveryInclude = {
  primaryTopic: true,
  heroImage: true,
  versions: true,
  sources: { include: { sourceRecord: true } },
  concepts: { include: { concept: true } },
  lessons: { include: { lesson: true } },
} as const;

export async function listPublishedDiscoveries() {
  return prisma.discovery.findMany({
    where: { status: "published" },
    include: discoveryInclude,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
}

export async function getDiscoveryBySlug(slug: string) {
  return prisma.discovery.findUnique({
    where: { slug },
    include: discoveryInclude,
  });
}

export async function listAllDiscoveriesForAdmin() {
  return prisma.discovery.findMany({
    include: {
      primaryTopic: true,
      heroImage: true,
      versions: true,
      sources: { include: { sourceRecord: true } },
      auditLogs: { orderBy: { createdAt: "desc" }, take: 20 },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export { prisma };
