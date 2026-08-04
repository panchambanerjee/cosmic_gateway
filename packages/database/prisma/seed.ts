import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { resolve } from "node:path";
import { seedLaunchBatch } from "./seed-launch-batch.js";
import { seedExpansionBatch } from "./seed-expansion-batch.js";

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

  const exoplanetsTopic = await prisma.topic.create({
    data: {
      slug: "exoplanets",
      name: "Exoplanets",
      description: "Worlds around other stars, from hot giants to temperate candidates.",
      icon: "planet",
    },
  });

  const blackHolesTopic = await prisma.topic.create({
    data: {
      slug: "black-holes-and-extreme-gravity",
      name: "Black holes and extreme gravity",
      description: "Event horizons, mergers, and multi-messenger extremes.",
      icon: "black-hole",
    },
  });

  const cosmologyTopic = await prisma.topic.create({
    data: {
      slug: "cosmology",
      name: "Cosmology",
      description: "The large-scale universe: expansion, dark matter, and dark energy.",
      icon: "cosmos",
    },
  });

  const solarSystemTopic = await prisma.topic.create({
    data: {
      slug: "solar-system",
      name: "Solar system",
      description: "Planets, moons, and nearby worlds we can study in detail.",
      icon: "solar-system",
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

  const launchConcepts = await Promise.all(
    [
      {
        slug: "star-formation",
        name: "Star formation",
        shortDefinition:
          "The process by which dense clouds of gas and dust collapse under gravity to form new stars.",
        explanationMarkdown: `## Star formation

Stars form inside cold, dense molecular clouds. Gravity pulls material inward while pressure, magnetic fields, and radiation push back. When a dense core collapses and heats enough to fuse hydrogen, a star is born.

Infrared telescopes matter because dust that blocks optical light still glows — or becomes translucent — at longer wavelengths, revealing embedded protostars and jets.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Star_formation",
        difficulty: "beginner" as const,
      },
      {
        slug: "infrared-astronomy",
        name: "Infrared astronomy",
        shortDefinition:
          "Observing the universe in infrared light to see cool dust, embedded stars, and redshifted galaxies.",
        explanationMarkdown: `## Infrared astronomy

Infrared light sits beyond the red end of the rainbow. Cool dust emits infrared, and expansion stretches ancient starlight into infrared. That is why missions like Webb unlock both nearby star nurseries and the early universe.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Infrared_astronomy",
        difficulty: "beginner" as const,
      },
      {
        slug: "supernova",
        name: "Supernova",
        shortDefinition:
          "A catastrophic stellar explosion that can outshine a galaxy for weeks and leave behind a remnant and compact object.",
        explanationMarkdown: `## Supernovae

Massive stars can explode as core-collapse supernovae; white dwarfs in binaries can explode as Type Ia events. The debris becomes a supernova remnant, enriching space with heavy elements that later form planets and people.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Supernova",
        difficulty: "beginner" as const,
      },
      {
        slug: "neutron-star",
        name: "Neutron star",
        shortDefinition:
          "An extremely dense remnant of a massive star's core, packed mostly with neutrons after a supernova.",
        explanationMarkdown: `## Neutron stars

A neutron star packs more than the Sun's mass into a city-sized sphere. Some spin rapidly and beam radio waves as pulsars. Mergers of neutron stars produce gravitational waves and heavy elements.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Neutron_star",
        difficulty: "intermediate" as const,
      },
      {
        slug: "pulsar",
        name: "Pulsar",
        shortDefinition:
          "A rotating neutron star that emits beams of radiation, appearing to pulse when a beam sweeps past Earth.",
        explanationMarkdown: `## Pulsars

Pulsars are cosmic lighthouses powered by spinning neutron stars and strong magnetic fields. The Crab Pulsar powers the Crab Nebula's glowing wind.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Pulsar",
        difficulty: "intermediate" as const,
      },
      {
        slug: "exoplanet",
        name: "Exoplanet",
        shortDefinition: "A planet that orbits a star other than the Sun.",
        explanationMarkdown: `## Exoplanets

Thousands of exoplanets are known, spanning hot Jupiters, mini-Neptunes, and rocky worlds. Atmosphere studies ask what they are made of — not just that they exist.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Exoplanet",
        difficulty: "beginner" as const,
      },
      {
        slug: "transit-spectroscopy",
        name: "Transit spectroscopy",
        shortDefinition:
          "Measuring a planet's atmosphere by watching starlight filter through it during a transit.",
        explanationMarkdown: `## Transit spectroscopy

When a planet crosses its star, a tiny fraction of starlight passes through the atmosphere. Molecules imprint absorption features. Webb's infrared sensitivity makes this method powerful for many worlds.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Astronomical_spectroscopy#Exoplanets",
        difficulty: "intermediate" as const,
      },
      {
        slug: "black-hole",
        name: "Black hole",
        shortDefinition:
          "A region of spacetime where gravity is so strong that nothing, not even light, can escape from inside the event horizon.",
        explanationMarkdown: `## Black holes

Stellar-mass black holes form from collapsing stars; supermassive ones sit in galaxy centers. We infer them from orbits, accretion light, gravitational waves, and — for the largest nearby ones — horizon-scale images.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Black_hole",
        difficulty: "beginner" as const,
      },
      {
        slug: "event-horizon",
        name: "Event horizon",
        shortDefinition:
          "The boundary around a black hole beyond which light cannot escape to the outside universe.",
        explanationMarkdown: `## Event horizon

The event horizon is not a solid surface. Crossing it is a one-way trip in classical general relativity. Horizon-scale images show a larger "shadow" shaped by light bending near the hole.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Event_horizon",
        difficulty: "intermediate" as const,
      },
      {
        slug: "gravitational-wave",
        name: "Gravitational wave",
        shortDefinition:
          "A ripple in spacetime produced by accelerating massive objects, detected on Earth by laser interferometers.",
        explanationMarkdown: `## Gravitational waves

Merging black holes and neutron stars shake spacetime. LIGO, Virgo, and KAGRA detect those ripples. When light arrives too, the event becomes multi-messenger astronomy.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Gravitational_wave",
        difficulty: "intermediate" as const,
      },
      {
        slug: "ice-giant",
        name: "Ice giant",
        shortDefinition:
          "A giant planet rich in water, ammonia, and methane ices beneath a hydrogen-helium atmosphere — like Uranus and Neptune.",
        explanationMarkdown: `## Ice giants

Ice giants differ from gas giants like Jupiter. Their interiors hold more "ices," and their atmospheres show methane absorption that shapes how they look in different wavelengths.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Ice_giant",
        difficulty: "beginner" as const,
      },
      {
        slug: "ocean-world",
        name: "Ocean world",
        shortDefinition:
          "A moon or planet with a substantial liquid water ocean, often under an icy crust.",
        explanationMarkdown: `## Ocean worlds

Enceladus and Europa are leading examples. Subsurface oceans plus chemistry and energy make them high-priority targets in the search for habitable environments — without equating habitability with inhabited.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Ocean_world",
        difficulty: "beginner" as const,
      },
      {
        slug: "dark-matter",
        name: "Dark matter",
        shortDefinition:
          "Invisible matter inferred from gravity that outweighs ordinary atoms in galaxies and clusters.",
        explanationMarkdown: `## Dark matter

Galaxy rotation curves, gravitational lensing, and cluster dynamics imply far more mass than stars and gas alone. Dark matter does not emit light we detect, but it shapes the cosmic web.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Dark_matter",
        difficulty: "beginner" as const,
      },
      {
        slug: "dark-energy",
        name: "Dark energy",
        shortDefinition:
          "The unknown component driving the accelerated expansion of the universe.",
        explanationMarkdown: `## Dark energy

Distant supernovae revealed acceleration. Surveys like Euclid map how structure grows over time to test whether dark energy is a cosmological constant or something that evolves.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Dark_energy",
        difficulty: "intermediate" as const,
      },
      {
        slug: "debris-disk",
        name: "Debris disk",
        shortDefinition:
          "A belt of dust and planetesimals around a star, leftover from planet formation or refreshed by collisions.",
        explanationMarkdown: `## Debris disks

Debris disks are the dusty leftovers of planet building. Collisions grind rocks into dust that shines in infrared light. Structures in the disk can hint at planets sculpting the material.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Debris_disk",
        difficulty: "beginner" as const,
      },
      {
        slug: "herbig-haro",
        name: "Herbig–Haro object",
        shortDefinition:
          "Bright knots and shocks formed where jets from a young star slam into surrounding gas.",
        explanationMarkdown: `## Herbig–Haro objects

When a newborn star launches jets, the outflow hits the cloud and lights up shock fronts called Herbig–Haro objects. They are signposts of ongoing star formation.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Herbig%E2%80%93Haro_object",
        difficulty: "intermediate" as const,
      },
      {
        slug: "galaxy-merger",
        name: "Galaxy merger",
        shortDefinition:
          "The gravitational encounter and eventual coalescence of two or more galaxies.",
        explanationMarkdown: `## Galaxy mergers

Gravity can pull galaxies together. Interactions trigger star formation, reshape disks into rings or tails, and can feed central black holes. Many large galaxies today grew through mergers.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Galaxy_merger",
        difficulty: "beginner" as const,
      },
      {
        slug: "starburst-galaxy",
        name: "Starburst galaxy",
        shortDefinition:
          "A galaxy forming stars at an exceptionally high rate for a short cosmic interval.",
        explanationMarkdown: `## Starburst galaxies

Starbursts pack intense star formation into a small region, often driven by interactions or gas inflows. Infrared and radio light reveal dust-obscured activity optical views can miss.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Starburst_galaxy",
        difficulty: "beginner" as const,
      },
      {
        slug: "quasar",
        name: "Quasar",
        shortDefinition:
          "An extremely luminous galactic nucleus powered by a rapidly accreting supermassive black hole.",
        explanationMarkdown: `## Quasars

Quasars outshine their host galaxies. Matter spiraling into a supermassive black hole forms a hot accretion disk that radiates across the spectrum. Dust can redden and obscure that light.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Quasar",
        difficulty: "beginner" as const,
      },
      {
        slug: "gravitational-lensing",
        name: "Gravitational lensing",
        shortDefinition:
          "The bending of light by mass, which can magnify and distort background galaxies.",
        explanationMarkdown: `## Gravitational lensing

Mass bends spacetime, so light from distant galaxies can be stretched into arcs or multiple images. Clusters act as natural telescopes and map dark matter through the distortion pattern.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Gravitational_lens",
        difficulty: "intermediate" as const,
      },
      {
        slug: "planetary-nebula",
        name: "Planetary nebula",
        shortDefinition:
          "Glowing shells of gas ejected by a dying Sun-like star, lit by the hot stellar remnant.",
        explanationMarkdown: `## Planetary nebulae

Despite the name, they have nothing to do with planets. Aging stars shed outer layers; ultraviolet light from the exposed core ionizes the shells into colorful nebulae before the remnant cools as a white dwarf.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Planetary_nebula",
        difficulty: "beginner" as const,
      },
      {
        slug: "asteroid",
        name: "Asteroid",
        shortDefinition:
          "A rocky body orbiting the Sun, leftover from solar-system formation.",
        explanationMarkdown: `## Asteroids

Asteroids range from rubble piles to solid rock. Missions like DART test whether we can change an asteroid's path — planetary defense grounded in orbital mechanics, not science fiction.`,
        wikipediaUrl: "https://en.wikipedia.org/wiki/Asteroid",
        difficulty: "beginner" as const,
      },
    ].map((c) => prisma.concept.create({ data: c })),
  );

  const launchConceptBySlug = Object.fromEntries(
    launchConcepts.map((c) => [c.slug, c.id]),
  );

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

That does not mean cosmology is broken. It means the earliest chapter of galaxy assembly was more efficient — or more bursty — than the simplest textbook sketches suggested. Infrared sensitivity is what made the census possible: expansion stretches ancient starlight into wavelengths Webb was built to collect, so deep fields become catalogs of early systems rather than only postcard images.

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

  const betelgeuseQuick = `Astronomers using ESO's Very Large Telescope have captured the clearest image yet of a faint companion near Betelgeuse, the famous red supergiant in Orion. After roughly a century of suspicion that the star might not be alone, the new high-contrast view makes Betelgeuse look less like a loner and more like a binary star system.

The detection used SPHERE, an instrument with a coronagraph originally built to find exoplanets by blocking a bright star's glare. Timing mattered: the team observed near a predicted maximum elongation, when the companion should sit farthest from the primary in projection. Follow-up is still needed to confirm orbital motion, but the visual case has narrowed doubt sharply.

**Takeaway:** Betelgeuse likely has a companion, and high-contrast imaging made the case visual rather than only statistical.`;

  const betelgeuseLearn = `## What happened

A team led by Miguel Montargès used the SPHERE instrument on ESO's Very Large Telescope to image a faint source consistent with Betelgeuse B, a companion orbiting the red supergiant Betelgeuse. The observation was timed for a predicted maximum elongation, when the companion should be easiest to separate from the primary's overwhelming glare.

The result, reported through an ESO release and a peer-reviewed Astronomy & Astrophysics paper, is the clearest visual evidence yet that Betelgeuse is part of a binary star system. For about a century, astronomers had suspected a companion from long brightness cycles and other clues. This campaign turns that suspicion into a resolved point source next to one of the sky's most familiar stars.

The candidate sits close enough that ordinary imaging would drown it. SPHERE's coronagraph and adaptive optics suppress Betelgeuse's light so a much fainter neighbor can emerge. That technical leap is why the same exoplanet-hunting toolkit now answers a classical stellar puzzle.

## Why it matters

Betelgeuse's brightness changes for more than one reason. Dust ejections and pulsations explained dramatic dimming episodes in recent years, but a longer secondary period kept the companion idea alive. A gravitationally bound partner could help shape that longer cycle and may influence the red supergiant's wind, surface activity, and late evolution.

The discovery also matters pedagogically. It shows that instruments built for one frontier — imaging exoplanets — can reopen older questions about nearby giants. Learning terms such as Betelgeuse, red supergiant, binary star, and coronagraph make the measurement intelligible.

For Cosmic Gateway readers, the story is also a source lesson. Space.com and similar outlets can tip you to a result. The durable account lives in the facility release and the journal paper, where methods, significance, and caveats are stated carefully.

## How it was measured

SPHERE combines extreme adaptive optics with a coronagraph that blocks most of Betelgeuse's light. High-contrast post-processing then searches for a faint point source at the predicted separation and position angle. The published analysis reports a detection at high significance, with an estimated companion mass of roughly two to three solar masses if the stars formed together and share an age.

That mass estimate is model-dependent. It assumes coevality and uses brightness plus evolutionary tracks. The key observational claim is simpler: a compact source appears where a companion should be when elongation is favorable. Timing relative to earlier predictions strengthens the interpretation beyond a random speck in residual starlight.

Readers should separate the imaging detection from later dynamical proof. Seeing a source once at the right place is powerful. Watching it move to the other side of the orbit is how astronomers cement that the source is gravitationally bound rather than a chance alignment or residual artifact.

## What scientists thought before

For decades, Betelgeuse was treated as a solitary red supergiant whose variability came from pulsations, convection, and dust. The companion hypothesis never fully died because some photometric and spectroscopic patterns looked hard to explain with a single star alone. Earlier work around 2024 sharpened the case by predicting when a putative companion would reach favorable separation for direct imaging — roughly late 2024.

That forecast set up the VLT/SPHERE campaign. In other words, this was not a lucky snapshot. It was a planned observation guided by orbital expectations. The prior understanding was therefore mixed: dust and pulsations were established for short-term dimming, while a binary explanation remained plausible for longer cycles and awaited a decisive visual test.

## What remains uncertain

The team still wants a second-epoch observation on the other side of the orbit to confirm that the source moves as a bound companion should. Until then, the evidence is strong but not absolute. Chance alignments and residual speckles can still be debated in good faith.

Uncertainty also remains about how strongly the companion shapes Betelgeuse's future — including mass loss and the path toward a supernova. Responsible reading keeps those open questions visible while still explaining why the image is a breakthrough. If you leave this Learn layer with one habit, ask what was imaged, what still needs orbital confirmation, and which concept unlocks the next sentence.`;

  const betelgeuseDeep = `## Context: why Betelgeuse's companion became a flashpoint

Betelgeuse is among the best-studied red supergiants in the sky. Naked-eye observers have watched its brightness change for centuries, and modern campaigns tracked dramatic dimming episodes that dust ejections and pulsations can explain. A longer secondary period, however, kept alive an older idea: that Betelgeuse might not be alone.

That idea is scientifically sticky because companions can alter winds, mass loss, and late stellar evolution. A binary star interpretation also offers a physical clock for some photometric cycles that a single star struggles to produce. For roughly a century, the companion remained inferred rather than seen. The glare of Betelgeuse itself was the obstacle.

Earlier modeling and observations around 2024 predicted that a putative companion would reach favorable projected separation around December 2024. That forecast transformed a century-old suspicion into an observing plan. When a team led by Miguel Montargès pointed ESO's Very Large Telescope and the SPHERE instrument at Betelgeuse near that window, the goal was explicit: catch Betelgeuse B where it should be easiest to pull out of the primary's light.

Cosmic Gateway frames the result as a learning gateway, not only a viral image. The hero frame from ESO shows the candidate after glare suppression. Credits, the ESO release, and the Astronomy & Astrophysics paper stay one click away because astronomy communication depends on both the picture and the methods behind it.

## Methods and evidence, without the jargon wall

High-contrast imaging is usually associated with exoplanets. The logic is the same next to a red supergiant: stabilize the wavefront with adaptive optics, block the bright core with a coronagraph, and search the residual field for a faint point source. SPHERE was built for that workflow. Using it on Betelgeuse is a reminder that instrument categories are less rigid than press categories.

The published analysis reports a candidate detection at high significance at the predicted location. If the stars are coeval, the companion's brightness implies a mass of roughly two to three solar masses — a substantial star in its own right, still vastly outshone by Betelgeuse's extended atmosphere and luminosity. Mass estimates depend on distance, extinction, age assumptions, and evolutionary tracks. The imaging detection and the mass number are related but not identical claims.

Evidence quality improves when prediction and detection align. Observing at predicted maximum elongation is not cosmetic timing; it increases the chance that a real companion is separable and that a null result would have been informative. Post-processing must still convince readers that the source is not a leftover speckle or processing artifact. That is why papers spend pages on significance tests that headlines compress into a single adjective.

When you read this discovery on Cosmic Gateway, ask:

- Was the observation timed to a predicted elongation?
- Is the claim an imaging detection, a full orbit, or both?
- How model-dependent is the companion mass?
- Which sources are primary (ESO, A&A) versus tip-level news?
- Does the evidence status match what has actually been confirmed?

## Competing interpretations / open questions

The leading interpretation is a gravitationally bound companion — Betelgeuse B — consistent with long-standing binary hypotheses. Remaining work includes confirming orbital motion with a later epoch on the other side of the orbit. Until that second-epoch confirmation lands, careful language keeps a candidate label even when the first-epoch image is compelling.

Alternative worries are familiar from high-contrast imaging: residual speckles, imperfect subtraction, and chance alignment with an unrelated background source. Each alternative becomes less likely when location matches prediction and significance is high, but none is dismissed by rhetoric alone. Follow-up motion is the cleanest discriminator.

Open scientific questions go beyond existence. How does the companion interact with Betelgeuse's wind and convective surface? Does it help drive the long secondary period? Will it change mass-loss history enough to matter for the eventual core-collapse supernova? Those questions remain active research even if the companion's presence becomes settled.

A burst of coverage can also inflate certainty. Space.com and similar outlets are useful discovery signals that point non-specialists to a result. They are not substitutes for the ESO release or the journal methods section. Cosmic Gateway keeps that ladder visible on purpose.

## Prior understanding versus current tension

Before this image, the mainstream picture already accepted that Betelgeuse's short-term dimming can arise from dust and pulsations. The unresolved tension was the longer cycle and whether a companion was required. Hierarchical storytelling that jumps from "dimming explained" to "no companion needed" oversimplified a literature that kept both dust physics and binary hypotheses in play.

The current result does not erase dust and pulsation physics. It adds a spatially resolved companion candidate that earlier photometry could only hint at. The productive tension is therefore narrow and healthy: how much of Betelgeuse's behavior belongs to the red supergiant alone, and how much belongs to the binary architecture?

Historically, astronomy often resolves such tensions with better angular resolution and better prediction. Interferometry, photometry, and spectroscopy built the case; a coronagraphic imager delivered the visual breakthrough. That sequence — hypothesis, forecast, targeted observation — is itself the lesson worth preserving.

## How to read sources like a scientist

Official releases explain why a result matters and often highlight a striking image. Papers contain reduction steps, detection significance, and caveats. News tips accelerate awareness but may compress uncertainty. Peer review raises confidence without freezing truth. When Cosmic Gateway labels evidence status, it is mapping that ladder, not decorating the page.

A practical reading order for this topic:

1. Look at the ESO image and credit line.
2. Read the Quick takeaway.
3. Check evidence status.
4. Skim What happened and How measured in Learn.
5. Open linked concepts — Betelgeuse, red supergiant, binary star, coronagraph — if a term blocks understanding.
6. Visit the ESO release and A&A paper before sharing a strong claim; treat Space.com as the tip that started the trail.

## Uncertainty to preserve

A responsible reading distinguishes a high-significance first-epoch detection from fully confirmed orbital motion. It also distinguishes "companion likely influences long-term variability" from a finished theory of every Betelgeuse light curve. Peer-reviewed papers, facility releases, and news tips are not interchangeable.

Uncertainty is not a failure of explanation. It is part of the explanation. The team has been explicit that a second-epoch observation is still needed to cement the companion interpretation. Until that confirmation arrives, Cosmic Gateway keeps the caveat next to the excitement.

The image on this page is an invitation, not a conclusion. Credits and rights remain visible because trust depends on both the data and the people who obtained it. When the next claim about Betelgeuse's fate or brightness appears tomorrow, you will already know which questions to ask first: what was measured, what remains unconfirmed, and which primary source carries the methods.

If you take one learning habit from this discovery, make it this: every dramatic stellar-companion claim deserves a method sentence, an uncertainty sentence, and a path into the concepts that make the measurement possible. From there, the gateway continues — into what a red supergiant is, why binary stars matter, and how a coronagraph turns glare into evidence.`;

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

  const howSpectraWork = await prisma.lesson.create({
    data: {
      slug: "how-transit-spectra-reveal-atmospheres",
      title: "How Transit Spectra Reveal Atmospheres",
      summary:
        "Learn why a tiny dip in starlight during transit can expose molecules in an exoplanet's air.",
      bodyMarkdown: `## Learning goal

Explain transit spectroscopy in plain language and know why infrared wavelengths help.

## Steps

1. A planet crosses its star (transit).
2. A sliver of starlight filters through the atmosphere.
3. Molecules absorb specific wavelengths.
4. Comparing in-transit and out-of-transit spectra reveals atmospheric fingerprints.

Webb's infrared range is especially useful for water, carbon dioxide, and other key molecules.
`,
      difficulty: "beginner",
      estimatedMinutes: 6,
      includeMath: false,
      concepts: {
        create: [
          { conceptId: launchConceptBySlug.exoplanet },
          { conceptId: launchConceptBySlug["transit-spectroscopy"] },
        ],
      },
    },
  });

  const blackHoleLesson = await prisma.lesson.create({
    data: {
      slug: "what-a-black-hole-shadow-means",
      title: "What a Black Hole Shadow Means",
      summary:
        "Separate the event horizon from the larger shadow seen in Event Horizon Telescope images.",
      bodyMarkdown: `## Learning goal

Distinguish the event horizon from the observed black-hole shadow.

## Key idea

Light bends near a black hole. The dark central region in EHT images is a shadow shaped by photon orbits and the horizon — larger than the horizon itself. The bright ring is emission from hot plasma around the hole, distorted by gravity.
`,
      difficulty: "beginner",
      estimatedMinutes: 5,
      includeMath: false,
      concepts: {
        create: [
          { conceptId: launchConceptBySlug["black-hole"] },
          { conceptId: launchConceptBySlug["event-horizon"] },
        ],
      },
    },
  });

  const launchSlugs = await seedLaunchBatch(prisma, {
    topics: {
      jwst: topic.id,
      stars: starsTopic.id,
      exoplanets: exoplanetsTopic.id,
      blackHoles: blackHolesTopic.id,
      cosmology: cosmologyTopic.id,
      solarSystem: solarSystemTopic.id,
    },
    concepts: {
      redshift: redshift.id,
      spectroscopy: spectroscopy.id,
      ...launchConceptBySlug,
    },
    lessons: {
      "why-infrared-sees-the-early-universe": lesson.id,
      "how-transit-spectra-reveal-atmospheres": howSpectraWork.id,
      "what-a-black-hole-shadow-means": blackHoleLesson.id,
    },
  });

  const expansionSlugs = await seedExpansionBatch(prisma, {
    topics: {
      jwst: topic.id,
      stars: starsTopic.id,
      exoplanets: exoplanetsTopic.id,
      blackHoles: blackHolesTopic.id,
      cosmology: cosmologyTopic.id,
      solarSystem: solarSystemTopic.id,
    },
    concepts: {
      redshift: redshift.id,
      spectroscopy: spectroscopy.id,
      ...launchConceptBySlug,
    },
    lessons: {
      "why-infrared-sees-the-early-universe": lesson.id,
      "how-transit-spectra-reveal-atmospheres": howSpectraWork.id,
      "what-a-black-hole-shadow-means": blackHoleLesson.id,
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

  const discoveryCount = await prisma.discovery.count();
  const conceptCount = await prisma.concept.count();
  const lessonCount = await prisma.lesson.count();
  const topicCount = await prisma.topic.count();

  console.log("Secondary image for admin tests:", secondaryImage.id);
  console.log("Seeded Betelgeuse discovery:", betelgeuseDiscovery.slug);
  console.log("Launch batch discoveries:", launchSlugs);
  console.log("Expansion batch discoveries:", expansionSlugs);
  console.log("Inventory:", {
    discoveries: discoveryCount,
    concepts: conceptCount,
    lessons: lessonCount,
    topics: topicCount,
  });
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
