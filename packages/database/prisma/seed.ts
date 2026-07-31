import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), "../../.env") });
config({ path: resolve(process.cwd(), ".env") });

const prisma = new PrismaClient();

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

async function main() {
  await prisma.auditLog.deleteMany();
  await prisma.discoveryLesson.deleteMany();
  await prisma.discoveryConcept.deleteMany();
  await prisma.lessonConcept.deleteMany();
  await prisma.discoverySource.deleteMany();
  await prisma.discoveryVersion.deleteMany();
  await prisma.discovery.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.concept.deleteMany();
  await prisma.sourceRecord.deleteMany();
  await prisma.imageAsset.deleteMany();
  await prisma.topic.deleteMany();

  const topic = await prisma.topic.create({
    data: {
      slug: "james-webb-space-telescope",
      name: "James Webb Space Telescope",
      description:
        "Infrared discoveries from NASA/ESA/CSA's flagship observatory.",
      icon: "telescope",
    },
  });

  const heroImage = await prisma.imageAsset.create({
    data: {
      sourceUrl:
        "https://stsci-opo.org/STScI-01GA76SG8D461EN1V5E6F0C2PV.png",
      storageUrl:
        "https://stsci-opo.org/STScI-01GA76SG8D461EN1V5E6F0C2PV.png",
      thumbnailUrl:
        "https://stsci-opo.org/STScI-01GA76SG8D461EN1V5E6F0C2PV.png",
      altText:
        "Infrared image of a distant galaxy field observed by the James Webb Space Telescope",
      caption:
        "A deep infrared view from Webb, illustrating how early galaxies appear in the distant universe.",
      creator: "NASA, ESA, CSA, STScI",
      organization: "Space Telescope Science Institute",
      creditLine: "NASA, ESA, CSA, STScI",
      licenseName: "NASA Media Usage Guidelines",
      rightsUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
      copyrightStatus: "NASA public domain / media guidelines",
      commercialUseAllowed: true,
      modificationAllowed: true,
      publicationAllowed: true,
      verificationNotes: "Seed asset verified against NASA/STScI credit line.",
      verifiedAt: new Date(),
      width: 2000,
      height: 1200,
      mediaType: "image/png",
    },
  });

  const sourceRelease = await prisma.sourceRecord.create({
    data: {
      sourceType: "official_release",
      organization: "NASA",
      title: "NASA's Webb Delivers Deepest Infrared Image of Universe Yet",
      canonicalUrl:
        "https://www.nasa.gov/image-article/nasas-webb-delivers-deepest-infrared-image-of-universe-yet/",
      publicationDate: new Date("2022-07-12T00:00:00.000Z"),
    },
  });

  const sourcePaper = await prisma.sourceRecord.create({
    data: {
      sourceType: "paper",
      organization: "arXiv / peer-reviewed literature",
      title: "Early galaxy formation in the JWST era (illustrative seed source)",
      canonicalUrl: "https://arxiv.org/abs/2207.09434",
      externalId: "2207.09434",
      publicationDate: new Date("2022-07-19T00:00:00.000Z"),
    },
  });

  const redshift = await prisma.concept.create({
    data: {
      slug: "redshift",
      name: "Redshift",
      shortDefinition:
        "A stretching of light toward longer wavelengths as the universe expands, used to measure cosmic distance and look-back time.",
      explanationMarkdown: `## What redshift means

When light from a distant galaxy travels across an expanding universe, its wavelength stretches. Astronomers call this **redshift**.

Higher redshift means the light left earlier and traveled farther. That is why Webb's infrared vision matters: highly redshifted ultraviolet and optical light from early galaxies arrives on Earth as infrared.

## Why it matters for discoveries

A single redshift estimate helps answer:

- How far away is this galaxy?
- How old was the universe when the light left?
- Is the object unexpectedly bright or massive for that era?
`,
      difficulty: "beginner",
    },
  });

  const spectroscopy = await prisma.concept.create({
    data: {
      slug: "spectroscopy",
      name: "Spectroscopy",
      shortDefinition:
        "Splitting light into wavelengths to measure composition, motion, and redshift of astronomical objects.",
      explanationMarkdown: `## Spectroscopy in one minute

A spectrum is light sorted by wavelength. Emission and absorption features act like fingerprints for elements and physical conditions.

For distant galaxies, spectroscopy is how astronomers confirm redshift rather than relying only on colors or imaging estimates.
`,
      difficulty: "beginner",
    },
  });

  const lesson = await prisma.lesson.create({
    data: {
      slug: "why-infrared-sees-the-early-universe",
      title: "Why Infrared Sees the Early Universe",
      summary:
        "Learn how cosmic expansion shifts ancient starlight into infrared wavelengths that Webb is built to collect.",
      bodyMarkdown: `## Learning goal

After this short lesson you should be able to explain why an infrared telescope is essential for studying the earliest galaxies.

## The short story

1. Early galaxies emitted a lot of ultraviolet and optical light.
2. Expansion of space stretched that light toward longer wavelengths.
3. By the time the light reaches us, much of it is infrared.
4. Webb's mirrors and instruments are optimized for that infrared window.

## Connect it to today's discovery

When you read a Webb headline about an unexpectedly mature early galaxy, ask two questions:

- What redshift (look-back time) is claimed?
- Was the redshift estimated from imaging colors, or confirmed with spectroscopy?
`,
      difficulty: "beginner",
      estimatedMinutes: 5,
      includeMath: false,
      concepts: {
        create: [{ conceptId: redshift.id }, { conceptId: spectroscopy.id }],
      },
    },
  });

  const quickMarkdown = `Webb's infrared images revealed surprisingly developed galaxies in the early universe. Instead of only faint, immature systems, astronomers found objects with more structure and starlight than many simple growth models expected at such early times.

**Takeaway:** the early universe formed complex galaxies faster than many textbooks assumed.`;

  const learnMarkdown = `## What happened

Observations with the James Webb Space Telescope uncovered distant galaxies that appear more mature than expected for the first few hundred million years after the Big Bang. Their brightness and structure challenge the simplest versions of early galaxy growth.

## Why it matters

If galaxies assembled stars and structure quickly, models of dark matter halos, gas cooling, and feedback need refinement. This is not just a pretty picture story; it is a test of how cosmic structure forms.

## How it was measured

Webb observes in infrared, where highly redshifted light from early galaxies arrives. Imaging identifies candidates; spectroscopy is the gold standard for confirming distance.

## What remains uncertain

Some early claims relied on photometric redshift estimates. Follow-up spectra, contamination checks, and larger samples decide which surprises survive.`;

  const deepMarkdown = `## Context

Before Webb, Hubble and ground-based surveys sketched an early universe of relatively small, messy star-forming systems. Hierarchical models predicted gradual assembly: small clumps merge into larger galaxies over time.

Webb's first deep fields immediately expanded the census of high-redshift candidates. Several systems appeared luminous and morphologically advanced at redshifts corresponding to the universe's first few hundred million years.

## Methods and evidence

Infrared imaging selects candidates by color. Photometric redshifts are powerful but imperfect. Spectroscopic confirmation measures spectral features shifted by cosmic expansion and remains the decisive check.

Instrument context matters: NIRCam imaging finds the candidates; NIRSpec and other spectrographs test them. Selection effects, gravitational lensing, and active galactic nuclei can all inflate apparent maturity.

## Competing interpretations

Possible explanations include:

- Faster-than-expected star formation efficiency in early dark matter halos
- Bursty star formation that temporarily brightens galaxies
- Incomplete dust corrections
- Redshift misestimates awaiting spectroscopic revision

## Uncertainty to preserve

A responsible reading distinguishes **candidate** early galaxies from **confirmed** ones, and distinguishes unexpected brightness from fully settled challenges to cosmology. Evidence status and original papers should stay one click away.`;

  const discovery = await prisma.discovery.create({
    data: {
      slug: "early-galaxies-challenge-simple-growth-models",
      title: "Early Galaxies Challenge Simple Growth Models",
      subtitle:
        "Webb's infrared view finds unexpectedly developed structure soon after the Big Bang.",
      dek: "A daily gateway from a headline image to the physics of redshift, spectroscopy, and galaxy assembly.",
      status: "published",
      evidenceStatus: "peer_reviewed",
      difficulty: "beginner",
      publishedAt: new Date("2026-07-30T16:00:00.000Z"),
      firstSourceDate: new Date("2022-07-12T00:00:00.000Z"),
      lastReviewedAt: new Date("2026-07-30T16:00:00.000Z"),
      heroImageId: heroImage.id,
      primaryTopicId: topic.id,
      noImageException: false,
      seoTitle: "Early Galaxies Challenge Simple Growth Models | Cosmic Gateway",
      seoDescription:
        "Understand why Webb's early galaxy findings matter, with sources, evidence status, and linked lessons.",
      versions: {
        create: [
          {
            versionNumber: 1,
            quickMarkdown,
            learnMarkdown,
            deepMarkdown,
            whatHappenedMarkdown:
              "Webb identified distant galaxies that look more luminous and structured than many early-universe models anticipated.",
            whyItMattersMarkdown:
              "It pressures theories of how quickly stars and structure can assemble after the Big Bang.",
            howMeasuredMarkdown:
              "Infrared imaging finds candidates; spectroscopy confirms redshift and physical conditions.",
            priorUnderstandingMarkdown:
              "Earlier surveys suggested smaller, messier systems assembling more gradually.",
            uncertaintyMarkdown:
              "Some candidates still need spectroscopic confirmation; brightness can have multiple causes.",
            changeSummary: "Initial published version for seed content.",
          },
        ],
      },
      sources: {
        create: [
          { sourceRecordId: sourceRelease.id },
          { sourceRecordId: sourcePaper.id },
        ],
      },
      concepts: {
        create: [
          { conceptId: redshift.id },
          { conceptId: spectroscopy.id },
        ],
      },
      lessons: {
        create: [{ lessonId: lesson.id }],
      },
      auditLogs: {
        create: [
          {
            action: "publish",
            fromStatus: "ready_to_publish",
            toStatus: "published",
            message: "Seed discovery published.",
          },
        ],
      },
    },
  });

  console.log("Seeded discovery:", discovery.slug);
  console.log("Reading times (approx minutes):", {
    quick: estimateReadingMinutes(quickMarkdown),
    learn: estimateReadingMinutes(learnMarkdown),
    deep: estimateReadingMinutes(deepMarkdown),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
