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
  await prisma.tipCandidate.deleteMany();
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

  const starsTopic = await prisma.topic.create({
    data: {
      slug: "stars-and-stellar-evolution",
      name: "Stars and stellar evolution",
      description: "How stars live, change brightness, and end their lives.",
      icon: "star",
    },
  });

  const heroImage = await prisma.imageAsset.create({
    data: {
      sourceUrl: "https://cdn.esawebb.org/archives/images/screen/weic2209a.jpg",
      storageUrl: "https://cdn.esawebb.org/archives/images/screen/weic2209a.jpg",
      thumbnailUrl: "https://cdn.esawebb.org/archives/images/screen/weic2209a.jpg",
      altText:
        "Webb's first deep field: thousands of galaxies in the cluster SMACS 0723, including distant early-universe systems",
      caption:
        "Webb's First Deep Field (SMACS 0723). Infrared light reveals distant galaxies whose ultraviolet glow has been stretched by cosmic expansion.",
      creator: "NASA, ESA, CSA, STScI",
      organization: "ESA / Webb",
      creditLine: "NASA, ESA, CSA, STScI",
      licenseName: "ESA/Webb / Creative Commons Attribution 4.0",
      rightsUrl: "https://esawebb.org/copyright/",
      copyrightStatus: "ESA/Webb media guidelines / CC BY 4.0 where applicable",
      commercialUseAllowed: true,
      modificationAllowed: true,
      publicationAllowed: true,
      verificationNotes:
        "Seed asset: ESA Webb screen-resolution First Deep Field SMACS 0723 (weic2209a).",
      verifiedAt: new Date(),
      width: 1280,
      height: 720,
      mediaType: "image/jpeg",
    },
  });

  const secondaryImage = await prisma.imageAsset.create({
    data: {
      sourceUrl:
        "https://www.nasa.gov/wp-content/uploads/2023/03/main_image_star-forming_region_carina_nircam_final-5mb.jpg",
      storageUrl:
        "https://www.nasa.gov/wp-content/uploads/2023/03/main_image_star-forming_region_carina_nircam_final-5mb.jpg",
      thumbnailUrl:
        "https://www.nasa.gov/wp-content/uploads/2023/03/main_image_star-forming_region_carina_nircam_final-5mb.jpg",
      altText:
        "James Webb Space Telescope NIRCam image of the Cosmic Cliffs in the Carina Nebula",
      caption:
        "Cosmic Cliffs in the Carina Nebula, imaged by Webb's NIRCam — a showcase of star formation sculpted by radiation.",
      creator: "NASA, ESA, CSA, STScI",
      organization: "NASA",
      creditLine: "NASA, ESA, CSA, STScI",
      licenseName: "NASA Media Usage Guidelines",
      rightsUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
      copyrightStatus: "NASA public domain / media guidelines",
      commercialUseAllowed: true,
      modificationAllowed: true,
      publicationAllowed: true,
      verificationNotes: "Seed secondary asset for admin publishing tests.",
      verifiedAt: new Date(),
      width: 2000,
      height: 1200,
      mediaType: "image/jpeg",
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
      wikipediaUrl: "https://en.wikipedia.org/wiki/Redshift",
      externalUrl: "https://imagine.gsfc.nasa.gov/science/toolbox/spectra1.html",
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
      wikipediaUrl: "https://en.wikipedia.org/wiki/Astronomical_spectroscopy",
      difficulty: "beginner",
    },
  });

  const betelgeuseConcept = await prisma.concept.create({
    data: {
      slug: "betelgeuse",
      name: "Betelgeuse",
      shortDefinition:
        "A bright red supergiant star in Orion, famous for changing brightness and nearing the end of its life.",
      explanationMarkdown: `## What Betelgeuse is

Betelgeuse is a red supergiant in the constellation Orion. It is close enough and large enough that telescopes can study its atmosphere and surroundings in unusual detail.

## Why it keeps making news

Its brightness varies. Sometimes those changes are explained by dust and pulsations. For about a century, astronomers have also asked whether a companion star could help explain longer cycles in its light.
`,
      wikipediaUrl: "https://en.wikipedia.org/wiki/Betelgeuse",
      externalUrl: "https://www.eso.org/public/news/eso2611/",
      difficulty: "beginner",
    },
  });

  const redSupergiant = await prisma.concept.create({
    data: {
      slug: "red-supergiant",
      name: "Red supergiant",
      shortDefinition:
        "A huge, cool, evolved star that has swollen after burning through much of its hydrogen fuel.",
      explanationMarkdown: `## Red supergiants

Red supergiants are among the largest stars by radius. They are cooler at the surface than the Sun, which is why they look red, but they are enormously luminous because of their size.

They are late evolutionary stages for massive stars and often end as core-collapse supernovae.
`,
      wikipediaUrl: "https://en.wikipedia.org/wiki/Red_supergiant",
      difficulty: "beginner",
    },
  });

  const binaryStar = await prisma.concept.create({
    data: {
      slug: "binary-star",
      name: "Binary star",
      shortDefinition:
        "A system of two stars orbiting a shared center of mass, bound by gravity.",
      explanationMarkdown: `## Binary stars

Many stars are not alone. In a binary, two stars orbit each other. Companions can exchange mass, shape stellar winds, and change how a star ends its life.

Finding a faint companion next to a bright giant is hard because the primary can drown the secondary in glare.
`,
      wikipediaUrl: "https://en.wikipedia.org/wiki/Binary_star",
      difficulty: "beginner",
    },
  });

  const coronagraph = await prisma.concept.create({
    data: {
      slug: "coronagraph",
      name: "Coronagraph",
      shortDefinition:
        "An optical device that blocks a bright star's light so fainter nearby objects can be seen.",
      explanationMarkdown: `## Why coronagraphs exist

A coronagraph suppresses the blinding light of a star, similar in spirit to covering the Sun to see its corona. Instruments such as SPHERE use this approach to hunt exoplanets — and, in the Betelgeuse case, a faint stellar companion.
`,
      wikipediaUrl: "https://en.wikipedia.org/wiki/Coronagraph",
      externalUrl: "https://www.eso.org/public/teles-instr/paranal-observatory/vlt/vlt-instr/sphere/",
      difficulty: "intermediate",
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

  const quickMarkdown = `Webb's infrared deep fields revealed galaxies that look surprisingly developed for the universe's first few hundred million years. Instead of only faint, immature clumps, astronomers found systems with more starlight and structure than many simple growth models expected.

That does not mean cosmology is broken. It means the earliest chapter of galaxy assembly was more efficient — or more bursty — than the simplest textbook sketches suggested.

**Takeaway:** the early universe built complex galaxies faster than many people assumed, and infrared telescopes are the reason we can finally see it.`;

  const learnMarkdown = `## What happened

Observations with the James Webb Space Telescope uncovered distant galaxies that appear more mature than expected for cosmic dawn. In deep infrared images, some systems are luminous enough — and structured enough — that they challenge the most naive versions of early galaxy growth.

Webb sees this population because cosmic expansion stretches ancient ultraviolet and optical light into the infrared. What once required heroic guesses from Hubble and ground-based surveys is now a systematic infrared census. Deep fields such as SMACS 0723 are not just postcard images; they are dense catalogs of galaxies across cosmic time, stacked into a single frame.

The surprise is quantitative as well as visual. Some candidates imply stellar masses or star-formation rates that press against simple expectations for how quickly gas could cool and form stars so soon after the Big Bang. That pressure is scientifically useful only when distance and luminosity are measured carefully.

## Why it matters

Galaxy formation is a bridge between dark matter, gas physics, and star formation. If stars assembled quickly in early dark matter halos, then cooling, feedback, and chemical enrichment timelines need revision. This is not only a pretty-picture story. It is a stress test of how cosmic structure forms.

For learners, the discovery is also a gateway into three durable ideas: redshift as look-back time, spectroscopy as distance confirmation, and the difference between a candidate and a confirmed high-redshift galaxy. Once those ideas click, future headlines become easier to evaluate instead of easier to overreact to.

Public understanding also benefits from patience. Early Webb papers and press releases arrived quickly. Follow-up spectra, larger samples, and independent teams then sorted durable results from temporary surprises. A learning product should teach that process, not hide it.

## How it was measured

Webb's NIRCam imaging identifies color-selected candidates. Photometric redshifts estimate distance from those colors by comparing observed brightness across filters with model galaxy templates. Spectroscopy — with instruments such as NIRSpec — confirms redshift by measuring spectral features shifted by expansion.

That pipeline matters for reading headlines. An exciting candidate can become less extreme after a spectrum, or remain surprising after confirmation. Evidence status on Cosmic Gateway is meant to keep that distinction visible. When a claim rests on photometry alone, uncertainty should be louder than the headline.

Additional complications include gravitational lensing, which can magnify background galaxies behind massive clusters, and dust, which can hide or reshape the light we use to infer stellar mass. Active galactic nuclei can also dominate an object's brightness and complicate interpretations framed purely in terms of stars.

## What scientists thought before

Before Webb, hierarchical models and earlier surveys sketched an early universe of relatively small, messy star-forming systems assembling gradually through mergers. Extremely luminous galaxies at the highest redshifts were expected to be rare. Hubble had already found remarkable distant objects, but the infrared window remained incomplete.

The prior picture was not wrong so much as incomplete. Cosmology still expects structure to grow from small to large. The open question is the efficiency and timing of star formation inside the earliest dark matter halos — how fast baryons convert into stars, and how feedback regulates that conversion.

## What remains uncertain

Some early claims relied on photometric estimates alone. Dust, gravitational lensing, active nuclei, and redshift errors can all inflate apparent maturity. Larger spectroscopic samples decide which surprises survive. Responsible reading preserves uncertainty while still explaining why the result is interesting.

If you leave this Learn layer with one habit, make it this: ask how distance was measured, what could fake the signal, and which concept you need next. From here, open the redshift and spectroscopy concept pages, then try the linked lesson on why infrared sees the early universe.`;

  const deepMarkdown = `## Context: why early galaxies became a Webb flashpoint

Before the James Webb Space Telescope, Hubble Space Telescope and ground-based surveys sketched the first billion years of cosmic history as a messy construction site. Hierarchical models predicted gradual assembly: small clumps of dark matter and gas merge into larger galaxies over time. Extremely luminous, morphologically advanced systems at the highest redshifts were expected to be rare.

Webb's first deep fields immediately expanded the census of high-redshift candidates. Infrared sensitivity matters because expansion stretches early starlight. Ultraviolet light emitted when the universe was young arrives today at longer wavelengths. A telescope optimized for infrared is therefore a time machine for galaxy assembly.

Several systems appeared luminous and structured at redshifts corresponding to the universe's first few hundred million years. Headlines understandably emphasized surprise. The scientific task is more careful: separate selection effects from genuine physical tension with models. Cosmic Gateway keeps that task visible by pairing explanations with evidence status and original sources.

It also helps to remember what a deep field is. Point a sensitive telescope at a tiny patch of sky for a long time and faint galaxies pile up. Nearby objects, intermediate-redshift systems, and extremely distant candidates share the frame. The drama of early galaxies lives in the subset whose light has traveled nearly the entire age of the universe.

## Methods and evidence, without the jargon wall

Infrared imaging selects candidates by color. Photometric redshifts are powerful because they work for large samples, but they are imperfect. Spectroscopic confirmation measures spectral features shifted by cosmic expansion and remains the decisive check for distance.

Instrument context matters. NIRCam finds many of the candidates. Spectrographs test them. Gravitational lensing can magnify background galaxies behind massive clusters, making faint objects look brighter. Active galactic nuclei can dominate light and mimic extreme star formation. Dust corrections change inferred stellar mass. Each of these effects can make a galaxy look more "mature" than it is.

Stellar mass estimates depend on assumptions about the star-formation history, the initial mass function, metallicity, and dust. Two teams can analyze the same photometry and report different masses if their model grids differ. That does not make the measurements meaningless; it means headline numbers deserve error bars and method notes.

When you read a discovery on Cosmic Gateway, ask:

- Is the redshift photometric or spectroscopic?
- Is the object lensed?
- Are stellar mass and star-formation rate model-dependent?
- Has the claim survived independent follow-up?
- Does the evidence status match the strength of the claim?

## Competing interpretations

Possible explanations for surprisingly bright early galaxies include:

- Faster-than-expected star formation efficiency in early dark matter halos
- Bursty star formation that temporarily brightens galaxies without requiring permanently large stellar masses
- Incomplete dust corrections that misestimate intrinsic luminosity
- Redshift misestimates awaiting spectroscopic revision
- Contribution from accreting black holes that boost observed light
- Selection biases that preferentially surface the rarest luminous systems in deep fields

None of these explanations is automatically correct. The point of an evidence-aware learning product is to keep the menu of interpretations visible while linking readers to original sources. A bursty star-formation model and a high-efficiency model can both fit a bright snapshot for different physical reasons.

Theory also has room to move without abandoning cosmology's broad framework. Adjusting how feedback suppresses or permits early star formation can change predicted number densities of luminous systems. Comparing those predictions with spectroscopically confirmed samples is where the lasting progress happens.

## Prior understanding versus current tension

Earlier surveys already found luminous distant galaxies, but Webb widened the window and improved sensitivity in the infrared. The tension is not that hierarchical cosmology failed overnight. The tension is that the simplest calibrations of early star formation may underpredict how quickly baryons converted into stars in some environments.

That is scientifically exciting precisely because it is bounded. Better spectra, larger samples, and more careful modeling either reduce the anomalies or force theory to improve. Both outcomes are progress. Science communication fails when it turns a productive tension into a false catastrophe, or when it sandbags uncertainty until readers feel misled.

Historically, astronomy has seen similar cycles: unexpected quasars, surprisingly early enrichment, and rapid black-hole growth all forced refinements. Early galaxies in the Webb era belong to that tradition. The durable learning outcome is not a single viral fact. It is a transferable method for reading future claims.

## How to read sources like a scientist

Official releases explain why a result matters and often highlight a striking image. Papers contain methods, selection criteria, and caveats. Preprints can be important and still provisional. Peer review improves confidence but does not freeze truth. When Cosmic Gateway labels evidence status, it is mapping that ladder, not decorating the page.

A practical reading order for this topic:

1. Look at the image and credit line.
2. Read the Quick takeaway.
3. Check evidence status.
4. Skim What happened and How measured.
5. Open linked concepts if a term blocks understanding.
6. Visit at least one original source before sharing a strong claim.

## Uncertainty to preserve

A responsible reading distinguishes **candidate** early galaxies from **confirmed** ones, and distinguishes unexpected brightness from fully settled challenges to cosmology. Peer-reviewed papers, official releases, and preprints are not interchangeable. Evidence status and original papers should stay one click away.

Uncertainty is not a failure of explanation. It is part of the explanation. The early universe is hard to observe, models are approximate, and rare objects can dominate first impressions from deep fields. As spectroscopic confirmation grows, some dramatic candidates fade and some remain. That sorting process is the science.

The image on this page is an invitation, not a conclusion. Credits and rights remain visible because astronomy communication depends on trust in both the data and the people who obtained it. When the next surprising early-galaxy claim arrives tomorrow, you will already know which questions to ask first.

If you take one learning habit from this discovery, make it this: every dramatic early-universe claim deserves a redshift method, an uncertainty sentence, and a path into the concepts that make the measurement possible. From there, the gateway continues — into redshift, spectroscopy, and the short lesson on why infrared light reveals cosmic dawn.`;

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

  const betelgeuseImage = await prisma.imageAsset.create({
    data: {
      sourceUrl: "https://cdn.eso.org/images/screen/eso2611b.jpg",
      storageUrl: "https://cdn.eso.org/images/screen/eso2611b.jpg",
      thumbnailUrl: "https://cdn.eso.org/images/screen/eso2611b.jpg",
      altText:
        "VLT/SPHERE image showing the candidate companion of Betelgeuse with Betelgeuse's glare removed",
      caption:
        "Clearest image yet of the candidate companion Betelgeuse B, obtained with ESO's VLT/SPHERE.",
      creator: "ESO/M. Montargès et al.",
      organization: "European Southern Observatory",
      creditLine: "ESO/M. Montargès et al.",
      licenseName: "ESO Creative Commons Attribution 4.0",
      rightsUrl: "https://www.eso.org/public/outreach/copyright/",
      copyrightStatus: "ESO copyright / CC BY 4.0 where applicable",
      commercialUseAllowed: true,
      modificationAllowed: true,
      publicationAllowed: true,
      verificationNotes: "Seed asset from ESO image eso2611b.",
      verifiedAt: new Date(),
      width: 1009,
      height: 1006,
      mediaType: "image/jpeg",
    },
  });

  const esoRelease = await prisma.sourceRecord.create({
    data: {
      sourceType: "official_release",
      organization: "ESO",
      title:
        "Astronomers find strongest evidence yet that Betelgeuse has a companion",
      canonicalUrl: "https://www.eso.org/public/news/eso2611/",
      externalId: "eso2611",
      publicationDate: new Date("2026-07-28T14:00:00.000Z"),
    },
  });

  const aaPaper = await prisma.sourceRecord.create({
    data: {
      sourceType: "paper",
      organization: "Astronomy & Astrophysics",
      title: "VLT/SPHERE images of the candidate companion of Betelgeuse",
      canonicalUrl:
        "https://www.aanda.org/articles/aa/full_html/2026/07/aa61023-26/aa61023-26.html",
      externalId: "10.1051/0004-6361/202661023",
      publicationDate: new Date("2026-07-28T00:00:00.000Z"),
    },
  });

  const spaceComTip = await prisma.sourceRecord.create({
    data: {
      sourceType: "news",
      organization: "Space.com",
      title:
        "Betelgeuse, Betelgeuse! Astronomers capture clearest image yet of famous star's elusive companion",
      canonicalUrl:
        "https://www.space.com/astronomy/stars/betelgeuse-betelgeuse-astronomers-capture-clearest-image-yet-of-famous-stars-elusive-companion",
      publicationDate: new Date("2026-07-28T00:00:00.000Z"),
    },
  });

  const betelgeuseQuick = `Astronomers using ESO's Very Large Telescope have captured the clearest image yet of a faint companion near Betelgeuse, the famous red supergiant in Orion. After roughly a century of suspicion, the star looks less like a loner and more like a binary star system.

The detection used SPHERE, an instrument with a coronagraph originally built to find exoplanets. Follow-up is still needed, but doubt has narrowed sharply.

**Takeaway:** Betelgeuse likely has a companion, and high-contrast imaging made the case visual.`;

  const betelgeuseLearn = `## What happened

A team led by Miguel Montargès used the SPHERE instrument on ESO's VLT to image a source consistent with Betelgeuse B, a companion orbiting the red supergiant Betelgeuse. The observation timed for a predicted maximum elongation, when the companion should be easiest to separate from the primary's glare.

## Why it matters

Betelgeuse's long brightness cycles have been debated for decades. A binary companion could help explain some of that behavior and may influence how the red supergiant evolves. The result also shows how exoplanet-hunting tools can solve classical stellar mysteries.

## How it was measured

SPHERE combines adaptive optics with a coronagraph that blocks most of Betelgeuse's light so fainter nearby sources can emerge. Advanced post-processing then isolates the candidate companion.

## What remains uncertain

The team still wants a second-epoch observation on the other side of the orbit to cement the companion interpretation. Evidence is strong, not absolute.`;

  const betelgeuseDeep = `## Context

Betelgeuse is among the best-studied red supergiants in the sky. Naked-eye observers have watched its brightness change for centuries. In recent years, dust ejections and pulsations explained dramatic dimming episodes, but a longer secondary period kept the companion hypothesis alive.

Earlier work in 2024 predicted that a putative companion would reach favorable separation around December 2024. That forecast set up the VLT/SPHERE campaign.

## Methods and evidence

High-contrast imaging is usually associated with exoplanets. Here, the same logic applies: suppress the primary, stabilize the optics, and search for a faint point source at the predicted location. The candidate detection is reported at high significance in the published analysis, with an estimated companion mass of roughly two to three solar masses if the stars are coeval.

## Competing interpretations and open questions

The leading interpretation is a gravitationally bound companion. Remaining work includes confirming orbital motion with a later epoch and assessing how the companion might affect Betelgeuse's wind, surface, and eventual fate. Responsible communication keeps the candidate label until that follow-up lands.

## How Cosmic Gateway treats the tip

Space.com and similar outlets are useful discovery signals. The primary account remains the ESO release and the Astronomy & Astrophysics paper. Learning terms on this page — Betelgeuse, red supergiant, binary star, coronagraph — open short in-app explainers and deeper Wikipedia or facility links.`;

  const betelgeuseDiscovery = await prisma.discovery.create({
    data: {
      slug: "betelgeuse-companion-clearest-image-yet",
      title: "Clearest Image Yet of Betelgeuse's Elusive Companion",
      subtitle:
        "VLT/SPHERE captures strong visual evidence that the red supergiant is not alone.",
      dek: "From a Space.com tip to ESO and the A&A paper — with learning terms that unlock the physics.",
      status: "published",
      evidenceStatus: "peer_reviewed",
      difficulty: "beginner",
      publishedAt: new Date("2026-07-28T16:00:00.000Z"),
      firstSourceDate: new Date("2026-07-28T14:00:00.000Z"),
      lastReviewedAt: new Date("2026-07-31T16:00:00.000Z"),
      heroImageId: betelgeuseImage.id,
      primaryTopicId: starsTopic.id,
      noImageException: false,
      seoTitle: "Betelgeuse Companion Image | Cosmic Gateway",
      seoDescription:
        "Understand the Betelgeuse B detection with Quick/Learn/Deep explanations, concepts, and primary sources.",
      versions: {
        create: [
          {
            versionNumber: 1,
            quickMarkdown: betelgeuseQuick,
            learnMarkdown: betelgeuseLearn,
            deepMarkdown: betelgeuseDeep,
            whatHappenedMarkdown:
              "VLT/SPHERE imaged a faint source consistent with Betelgeuse B near the red supergiant Betelgeuse.",
            whyItMattersMarkdown:
              "A binary companion could help explain long brightness cycles and affect Betelgeuse's evolution.",
            howMeasuredMarkdown:
              "A coronagraph and high-contrast imaging suppressed Betelgeuse's glare to reveal the companion candidate.",
            priorUnderstandingMarkdown:
              "Astronomers suspected a companion for about a century; recent work predicted a favorable 2024 elongation.",
            uncertaintyMarkdown:
              "A second-epoch observation is still needed to fully confirm orbital motion of the companion.",
            changeSummary: "Initial Betelgeuse pilot discovery.",
          },
        ],
      },
      sources: {
        create: [
          { sourceRecordId: esoRelease.id },
          { sourceRecordId: aaPaper.id },
          { sourceRecordId: spaceComTip.id },
        ],
      },
      concepts: {
        create: [
          { conceptId: betelgeuseConcept.id },
          { conceptId: redSupergiant.id },
          { conceptId: binaryStar.id },
          { conceptId: coronagraph.id },
        ],
      },
      auditLogs: {
        create: [
          {
            action: "publish",
            fromStatus: "ready_to_publish",
            toStatus: "published",
            message: "Betelgeuse pilot published from ESO + A&A primary sources.",
          },
        ],
      },
    },
  });

  await prisma.tipCandidate.createMany({
    data: [
      {
        title:
          "Betelgeuse companion — Space.com tip (used for pilot discovery)",
        tipUrl:
          "https://www.space.com/astronomy/stars/betelgeuse-betelgeuse-astronomers-capture-clearest-image-yet-of-famous-stars-elusive-companion",
        primarySourceUrls: [
          "https://www.eso.org/public/news/eso2611/",
          "https://www.aanda.org/articles/aa/full_html/2026/07/aa61023-26/aa61023-26.html",
        ],
        status: "used",
        organization: "Space.com",
        notes:
          "Pilot tip. Canonical text came from ESO + A&A, not the Space.com body.",
      },
      {
        title: "ESO release queue example — ready for triage",
        tipUrl: "https://www.eso.org/public/news/eso2611/",
        primarySourceUrls: [
          "https://www.eso.org/public/news/eso2611/",
          "https://www.aanda.org/articles/aa/full_html/2026/07/aa61023-26/aa61023-26.html",
        ],
        status: "new",
        organization: "ESO",
        notes: "Example tip candidate for the admin queue UI.",
      },
    ],
  });

  console.log("Secondary image for admin tests:", secondaryImage.id);
  console.log("Seeded Betelgeuse discovery:", betelgeuseDiscovery.slug);
  console.log("Reading times (approx minutes):", {
    earlyGalaxies: {
      quick: estimateReadingMinutes(quickMarkdown),
      learn: estimateReadingMinutes(learnMarkdown),
      deep: estimateReadingMinutes(deepMarkdown),
    },
    betelgeuse: {
      quick: estimateReadingMinutes(betelgeuseQuick),
      learn: estimateReadingMinutes(betelgeuseLearn),
      deep: estimateReadingMinutes(betelgeuseDeep),
    },
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
