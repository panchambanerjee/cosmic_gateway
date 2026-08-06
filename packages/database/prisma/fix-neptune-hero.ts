/**
 * One-shot: point the Neptune discovery hero at ESA weic2214d (wide-field).
 *
 *   DATABASE_URL="…" pnpm --filter @cosmic-gateway/database exec tsx prisma/fix-neptune-hero.ts
 */
import { PrismaClient } from "@prisma/client";

const WIDE_FIELD = {
  sourceUrl: "https://cdn.esawebb.org/archives/images/screen/weic2214d.jpg",
  altText:
    "James Webb Space Telescope wide-field near-infrared image of Neptune, its rings, and nearby moons including bright Triton",
  caption:
    "Wide-field NIRCam view of Neptune and its rings; Triton appears as the bright spiked point of light.",
  verificationNotes:
    "Updated to ESA Webb screen-resolution Neptune wide-field (weic2214d).",
};

async function main() {
  const prisma = new PrismaClient();
  const discovery = await prisma.discovery.findUnique({
    where: { slug: "webb-neptune-close-up" },
    select: { id: true, heroImageId: true, title: true },
  });

  if (!discovery?.heroImageId) {
    throw new Error("Discovery webb-neptune-close-up or its hero image not found.");
  }

  const image = await prisma.imageAsset.update({
    where: { id: discovery.heroImageId },
    data: {
      sourceUrl: WIDE_FIELD.sourceUrl,
      storageUrl: WIDE_FIELD.sourceUrl,
      thumbnailUrl: WIDE_FIELD.sourceUrl,
      altText: WIDE_FIELD.altText,
      caption: WIDE_FIELD.caption,
      verificationNotes: WIDE_FIELD.verificationNotes,
    },
  });

  console.log(`Updated hero for "${discovery.title}" → ${image.sourceUrl}`);
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
