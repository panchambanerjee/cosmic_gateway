import type { PrismaClient } from "@prisma/client";
import {
  publishSeedDiscovery,
  type SeedDiscoveryInput,
} from "./seed-helpers.js";

type ExpansionBatchContext = {
  topics: {
    jwst: string;
    stars: string;
    exoplanets: string;
    blackHoles: string;
    cosmology: string;
    solarSystem: string;
  };
  concepts: Record<string, string>; // slug -> id
  lessons: Record<string, string>; // slug -> id
};

const webbImageRights = {
  creator: "NASA, ESA, CSA, STScI",
  organization: "ESA / Webb",
  creditLine: "NASA, ESA, CSA, STScI",
  licenseName: "ESA/Webb / Creative Commons Attribution 4.0",
  rightsUrl: "https://esawebb.org/copyright/",
  copyrightStatus: "ESA/Webb media guidelines / CC BY 4.0 where applicable",
} as const;

function conceptIds(
  concepts: Record<string, string>,
  slugs: string[],
): string[] {
  return slugs.map((slug) => {
    const id = concepts[slug];
    if (!id) {
      throw new Error(`Missing concept id for slug "${slug}"`);
    }
    return id;
  });
}

function optionalLessonIds(
  lessons: Record<string, string>,
  slugs: string[],
): string[] | undefined {
  const ids = slugs
    .map((slug) => lessons[slug])
    .filter((id): id is string => Boolean(id));
  return ids.length ? ids : undefined;
}

function buildDiscoveries(ctx: ExpansionBatchContext): SeedDiscoveryInput[] {
  const infraredLesson = optionalLessonIds(ctx.lessons, [
    "why-infrared-sees-the-early-universe",
  ]);

  return [
    {
      slug: "beta-pictoris-debris-disk",
      title: "Webb Finds a Dusty Cat's Tail in Beta Pictoris",
      subtitle:
        "Mid-infrared imaging reveals a new debris structure in a nearby planet-forming system.",
      dek: "Webb's MIRI view of Beta Pictoris shows a sharply inclined dust feature resembling a cat's tail, plus compositional clues in its debris disks.",
      evidenceStatus: "official_release",
      difficulty: "intermediate",
      publishedAt: new Date("2026-06-20T16:00:00.000Z"),
      firstSourceDate: new Date("2024-01-10T00:00:00.000Z"),
      topicId: ctx.topics.exoplanets,
      image: {
        sourceUrl:
          "https://cdn.esawebb.org/archives/images/screen/weic2401a.jpg",
        altText:
          "James Webb Space Telescope mid-infrared image of the Beta Pictoris debris disk system showing an inclined dusty feature",
        caption:
          "Webb MIRI view of Beta Pictoris debris disks, including a sharply inclined dusty branch nicknamed the cat's tail.",
        ...webbImageRights,
        verificationNotes:
          "Seed asset: ESA Webb screen-resolution Beta Pictoris MIRI (weic2401a).",
      },
      sources: [
        {
          sourceType: "official_release",
          organization: "ESA / Webb",
          title:
            "Webb discovers dusty cat's tail in Beta Pictoris System",
          canonicalUrl: "https://esawebb.org/news/weic2401/",
          externalId: "weic2401",
          publicationDate: new Date("2024-01-10T00:00:00.000Z"),
        },
      ],
      conceptIds: conceptIds(ctx.concepts, [
        "debris-disk",
        "infrared-astronomy",
      ]),
      lessonIds: infraredLesson,
      summaryMarkdown: `Beta Pictoris is a young planetary system only about 63 light-years away, long famous for hosting the first debris disk imaged around another star. Debris disks are collisional leftovers — dust from asteroids, comets, and planetesimals grinding against one another after planets have begun to form.

Webb observed the system with NIRCam and MIRI. Mid-infrared light revealed a previously unseen, sharply inclined branch of dust extending from the known secondary disk, shaped like a cat's tail. Temperature differences between disk components also point to differences in grain composition.

**Takeaway:** debris disks are dynamic, and mid-infrared astronomy can uncover recent collisional structures invisible at other wavelengths.

**Uncertainty:** the exact age and dynamical origin of the cat's tail remain model-dependent hypotheses.`,

      articleMarkdown: `## Context

Beta Pictoris helped invent modern debris-disk science. Its disk was the first imaged around another star, and decades of optical, infrared, and submillimeter work established that planetesimal collisions continue long after planets begin to assemble. A second, inclined disk from Hubble already signaled that the system is not a flat, settled leftover. Webb's contribution is not "a disk exists," but that mid-infrared sensitivity can reveal a recent-looking branch of dust and compositional temperature contrasts within known structures.

Debris disks remain dynamically active collisional environments; weic2401 shows mid-infrared astronomy can still rewrite nearby maps long after optical discovery.

Beta Pictoris at ~63 light-years remains a debris-disk laboratory where small morphological changes are measurable.

Webb's weic2401 release is an infrared-methods chapter as much as an exoplanet headline.

At ~63 light-years, Beta Pictoris remains one of the few debris disks where mid-infrared branches are angularly resolved.

## Methods and evidence

Debris dust is cold enough that its thermal emission peaks at mid-infrared wavelengths. Near-infrared imaging can still map scattered light and warmer components, but the cat's tail required MIRI. That is a transferable method lesson: if you only look where previous telescopes looked, you may miss the coolest, newest debris. Filter choices and careful subtraction of the bright star are as important as headline resolution numbers.

Credit lines follow ESA/Webb practice (NASA, ESA, CSA, STScI) under CC BY 4.0 where applicable.

Starlight subtraction and MIRI filter choices are as critical as angular resolution when imaging thermal emission from debris disk dust around Beta Pic.

MIRI thermal maps trace cool collisional dust populations that NIRCam scattered-light maps underrepresent.

Guaranteed Time program reductions underpin compositional temperature comparisons between disk components.

Webb's weic2401 data products include calibrated MIRI brightness maps suitable for comparative thermal analysis across disk components.

## Competing interpretations / open questions

Self-stirring, planet perturbation, and recent collision models all remain viable for the cat's tail until spectra and dynamical fits converge.

Warps in the secondary debris disk may channel dust into tail-like projections without a recent giant collision.

Grain blow-out timescales set how long mid-infrared features remain visible after a dynamical event.

Planetesimal grinding continues in debris disks even when no additional planets are directly imaged in the same epoch.

## Prior understanding

Before Webb, Beta Pic was already a benchmark for giant-planet influence, disk warps, and collisional cascades. The secondary disk was known. Optical scattered-light campaigns, ground-based adaptive optics, and earlier space infrared missions had mapped large-scale structure. The advance is morphological and compositional detail in the mid-infrared: an inclined dusty branch and evidence that disk components differ in temperature, likely because their grains differ. Cosmic Gateway prefers that continuous narrative when wavelength choice is the real pedagogical plot.

## How to read sources

ESA/Webb weic2401 is primary for the public image and narrative. Do not treat a named feature as a finished dynamical proof. Ask how old the dust is, whether radiation pressure and stellar winds can stretch a collision plume into a tail-like shape, and which grain models fit the mid-infrared colors. Peer-reviewed analyses of the Guaranteed Time program observations carry the quantitative claims.

If you take one habit from this discovery, make it this: when a nearby planetary system yields a new structure, ask which wavelength made it visible — and which dynamical clock that wavelength is actually timing.

Treat weic2401 as the public door and peer-reviewed Guaranteed Time papers as the workshop for grain temperatures and optical depths.

Peer-reviewed dynamical papers should accompany weic2401 in any quantitative classroom module.

Filter and epoch mismatches can fake novelty when comparing optical and mid-infrared disk images.

Teaching with weic2401 should pair the public narrative with dynamical papers that quantify grain properties and optical depth.

## Uncertainty to preserve

Beta Pictoris remains a nearby classroom for debris-disk physics. Webb's cat's tail shows that mid-infrared astronomy can still rewrite the map of a famous system. Keep weic2401 as the official entry point, keep debris-disk and infrared-astronomy concepts linked, and keep collision-versus-dynamics interpretations provisional until models and spectra converge.
Dynamically, a cat's-tail morphology can arise when a localized dust cloud is sheared by Keplerian motion and pushed by radiation pressure. Different grain sizes separate, so mid-infrared-bright grains may not trace the same orbits as optical scatterers. That differential dynamics is why multiwavelength debris-disk science cannot be collapsed into one color composite.

Compositional temperature contrasts between disks likewise demand caution. Temperature differences can reflect grain size, composition, or local heating geometry. Claiming a unique mineralogy from broadband imaging alone overreaches. Spectroscopy and detailed SED fitting carry those claims.

For Cosmic Gateway's Deep layer, the durable product is a checklist: which bandpass revealed the feature, what dynamical clock is implied, what grain model moves the mass, and which official source documents the public image. ESA/Webb weic2401 satisfies the last item. Peer-reviewed dynamical papers must satisfy the rest. Holding that checklist prevents a nearby celebrity system from teaching vibes instead of methods.

Finally, debris disks connect exoplanet science to planetesimal physics without requiring a detected planet in every frame. Planets can stir disks; disks can also evolve through self-stirring. Keeping both options visible is intellectual hygiene — and it matches how Beta Pictoris research actually proceeds.

Grain optical properties control both temperature and observability. Silicates, carbonaceous grains, and ice mantles emit differently across MIRI bands. Without spectroscopy, compositional claims should stay comparative — warmer versus cooler components — rather than mineralogically absolute.

Keep debris-disk and infrared-astronomy concepts linked so learners ask which bandpass timed which dynamical clock in Beta Pictoris.

Spectroscopy remains the path from comparative temperature claims to mineralogical statements about disk dust.

Learners should ask which dynamical clock mid-infrared morphology is actually timing in Beta Pictoris.

Infrared astronomy reveals morphology quickly; spectra and multi-epoch data are still required to close compositional and timing arguments.

Hold the ESA/Webb weic2401 image as the public door, then treat every collision age and grain-mineral claim as provisional until dynamical models and mid-infrared spectra converge. That discipline is how a nearby debris disk teaches methods instead of mythology. Spectroscopy remains required before comparative temperatures become mineralogy.`,
      whatHappenedMarkdown:
        "Webb's MIRI imaging revealed a sharply inclined dusty 'cat's tail' in the Beta Pictoris debris-disk system, plus temperature contrasts between disk components.",
      whyItMattersMarkdown:
        "It shows that debris disks remain dynamically active and that mid-infrared light can uncover recent collisional structures missed at other wavelengths.",
      howMeasuredMarkdown:
        "NIRCam and MIRI imaged Beta Pictoris; mid-infrared thermal emission made the cat's tail detectable against the known main and secondary disks.",
      priorUnderstandingMarkdown:
        "Beta Pic already had an imaged main debris disk and a Hubble-discovered inclined secondary disk; composition and fine structure were incompletely mapped.",
      uncertaintyMarkdown:
        "The age and dynamical origin of the cat's tail remain model-dependent; grain properties and viewing geometry can reshape the apparent morphology.",
      changeSummary: "Expansion-batch seed: Beta Pictoris debris disk / cat's tail.",
      auditMessage:
        "Seed published from ESA/Webb official release (weic2401).",
    },
    {
      slug: "hh-46-47-protostellar-jets",
      title: "Webb's Detailed Portrait of Herbig-Haro 46/47",
      subtitle:
        "Near-infrared imaging resolves twin jets from a pair of forming stars in Vela.",
      dek: "Webb captures the most detailed near-infrared view yet of HH 46/47, revealing jet history hidden by dusty natal clouds.",
      evidenceStatus: "official_release",
      difficulty: "beginner",
      publishedAt: new Date("2026-06-22T16:00:00.000Z"),
      firstSourceDate: new Date("2023-07-26T00:00:00.000Z"),
      topicId: ctx.topics.stars,
      image: {
        sourceUrl:
          "https://cdn.esawebb.org/archives/images/screen/weic2319a.jpg",
        altText:
          "James Webb Space Telescope near-infrared image of Herbig-Haro 46/47 protostellar jets",
        caption:
          "Webb NIRCam portrait of HH 46/47: bipolar jets from a young stellar pair pierce their dusty birth cloud.",
        ...webbImageRights,
        verificationNotes:
          "Seed asset: ESA Webb screen-resolution HH 46/47 NIRCam (weic2319a).",
      },
      sources: [
        {
          sourceType: "official_release",
          organization: "ESA / Webb",
          title:
            "Webb snaps highly detailed infrared image of actively forming stars",
          canonicalUrl: "https://esawebb.org/news/weic2319/",
          externalId: "weic2319",
          publicationDate: new Date("2023-07-26T00:00:00.000Z"),
        },
      ],
      conceptIds: conceptIds(ctx.concepts, [
        "star-formation",
        "herbig-haro",
      ]),
      lessonIds: infraredLesson,
      summaryMarkdown: `Herbig-Haro 46/47 is a pair of actively forming young stars about 1,470 light-years away in Vela. For thousands of years the protostars have launched jets in opposite directions, slamming into surrounding gas and lighting up shock fronts known as Herbig-Haro objects.

Webb's near-infrared image is the most detailed portrait of this system to date. Infrared light pierces the dusty blue nebula that looks black in visible light, exposing jet knots that record past eruptions as well as present activity.

**Takeaway:** forming stars announce themselves with jets, and infrared astronomy turns those jets into readable histories.

**Uncertainty:** precise mass-loss rates and the three-dimensional orientation of every knot still need spectroscopy and careful modeling.`,

      articleMarkdown: `## Context

Herbig-Haro objects are the glowing shock fronts of jets from young stars. They matter because they convert invisible accretion physics into observable shock chemistry and morphology. HH 46/47 has long been a reference system: bipolar, relatively nearby, and rich in archival data. Webb does not invent the jets; it clarifies their infrared anatomy and the dusty cloud that still cradles the protostars.

Herbig-Haro shocks make star formation visible; HH 46/47 is the reference infrared portrait for accretion-outflow coupling at ~1,470 light-years.

HH 46/47 in Vela shows star formation is loud: accretion and Herbig-Haro shocks coexist in one infrared portrait.

weic2319 makes each knot along the jet a candidate timeline entry when kinematics eventually measure speeds.

Vela hosts numerous star-forming clouds, but HH 46/47 remains the headline Herbig-Haro teaching system in weic2319.

Herbig-Haro 46/47 continues a decades-long arc from ground-based discovery to Webb's weic2319 near-infrared portrait. Learners should treat each knot as a shock front whose brightness reflects local cloud density and shock speed, not as a dated eruption marker without kinematics. Star formation in Vela is widespread; this system is simply oriented for spectacular contrast between jets and natal dust in NIRCam filters. Cosmic Gateway emphasizes infrared astronomy because the blue nebula opaque in optical light becomes a translucent cavity in weic2319, revealing both the engine vicinity and extended Herbig-Haro history. The portrait is therefore a methods demonstration: the same physical outflow requires infrared bandpasses to become legible, and Herbig-Haro object morphology remains incomplete until spectra and proper motions supply the clock.

## Methods and evidence

Near-infrared photons scatter and absorb less in dust than optical photons. That is why the blue nebula that looks black optically becomes a structured envelope in Webb's view. Filter composites assign colors so cavity walls, jet knots, and ambient cloud can be distinguished. The science product is calibrated brightness across bands, not merely a wallpaper.

Rights follow ESA/Webb media guidelines with credit to NASA, ESA, CSA, and STScI.

weic2319 filter composites are interpretive tools encoding shock-heated gas and dust, not arbitrary color choices for outreach only.

Shock-excited emission in Herbig-Haro objects appears differently across NIRCam filters used for weic2319.

Calibrated photometry—not color wallpaper—supports separating jets, cavities, and cloud edges in the field.

Proper-motion programs planned or underway can turn weic2319 knot maps into provisional accretion timelines.

## Competing interpretations / open questions

Variable jets imply variable accretion. Knot spacing encodes eruption history if velocities are known. Interactions with inhomogeneous cloud material can mimic intrinsic variability, so morphology alone is incomplete. Infrared clarity improves the map; spectra finish the clock.

Cloud inhomogeneity versus intrinsic accretion variability both modulate Herbig-Haro knot brightness along the HH 46/47 jets.

Environmental asymmetries from dusty cavities can mimic engine-intrinsic jet variability in HH 46/47.

Atomic and molecular coolants change how infrared lines dominate shock cooling in protostellar outflows.

Shock curvature can indicate local cloud density spikes unrelated to intrinsic jet engine variability.

## Prior understanding

Decades of multiwavelength work already established HH 46/47 as a living timeline of accretion-driven outflow. Optical images outlined a dark cloud; earlier infrared data hinted at jets within. Webb does not invent Herbig-Haro physics; it clarifies near-infrared anatomy of jets, bow shocks, and the dusty envelope that still cradles the protostars. The scientific story is refinement of a reference system with teaching power.

## How to read sources

Read weic2319 for morphology and kinematic papers for timelines — Cosmic Gateway keeps those layers separate on purpose.

weic2319 supplies morphology; proper-motion and spectroscopy papers supply the accretion clock.

Do not export knot-spacing dating to other outflows without matching resolution and signal-to-noise.

weic2319 should be read alongside star-formation concept pages that define accretion, outflow, and shock fronts consistently.

## Uncertainty to preserve

ESA/Webb weic2319 is primary for the public image. Peer-reviewed follow-ups refine excitation conditions and mass-loss estimates. Do not read every bright knot as a separate "eruption date" without kinematics. Ask what dust still hides near the launching region, and how projection affects apparent symmetry.

HH 46/47 teaches that star formation is dynamical: infall, outflow, and cloud feedback run together. Webb's near-infrared portrait makes that simultaneity visible. Keep star-formation and herbig-haro concepts linked, keep weic2319 one click away, and treat jet timelines as measured only when spectra and motions join the image.
Shock physics turns ordered outflow kinetic energy into heat, compression, and line emission. Different Herbig-Haro knots can be dominated by different excitation conditions depending on shock speed and ambient density. Infrared images show where those shocks are; spectra say how fast and how energetic they are. Deep reading therefore refuses to date every knot from spacing alone.

Envelope geometry matters too. A dusty cavity carved by prior outflows can channel later jets, imprinting apparent asymmetries that are environmental rather than engine-intrinsic. Webb's translucent view of the blue nebula helps, but three-dimensional radiative-transfer models still have work to do.

Cosmic Gateway's Deep layer uses HH 46/47 to rehearse a general rule for star-formation imaging: morphology suggests, kinematics confirms, chemistry explains. Official release weic2319 is authoritative for the public portrait. It is not a substitute for proper-motion papers. Readers who internalize that ladder will read the next protostellar jet release with less hype and more skill.

Transfer the lesson to other nurseries. Whether the target is HH 46/47 or a more distant infrared-dark cloud core, the questions repeat: what is accreting, what is ejected, what dust still hides, and which wavelength finally made the engine room legible.

Atomic and molecular coolants determine how shocks radiate. Infrared lines can dominate cooling in certain regimes, which is another reason infrared facilities matter for jet physics beyond pretty continuum images. Deep learners should expect line studies to follow imaging releases.

Close the loop with source discipline: weic2319 for the portrait; kinematic papers for the timeline; concept pages for star formation and Herbig-Haro shocks. That triad is the Cosmic Gateway deep product.

Star formation literacy here means pairing Herbig-Haro morphology with spectroscopy before exporting knot-spacing clocks to other jets.

Mass-loss rates from imaging alone remain provisional until line diagnostics constrain shock speeds.

Star formation concepts here include Herbig-Haro shocks as readable tracers of accretion variability.

Herbig-Haro brightness alone does not measure shock speed; line widths and proper motions carry that physics.`,
      whatHappenedMarkdown:
        "Webb released a high-resolution near-infrared image of HH 46/47, resolving bipolar jets from a young stellar pair through their dusty birth cloud.",
      whyItMattersMarkdown:
        "It turns protostellar jets into a readable history of accretion-driven outflows and shows why infrared light is essential in star-forming clouds.",
      howMeasuredMarkdown:
        "NIRCam multi-filter near-infrared imaging maps jet knots, bow shocks, and the dusty envelope that blocks optical views.",
      priorUnderstandingMarkdown:
        "HH 46/47 has been observed for decades across wavelengths; Webb adds unmatched near-infrared spatial detail.",
      uncertaintyMarkdown:
        "Knot ages, mass-loss rates, and full 3D geometry require spectroscopy and proper-motion studies beyond a single image.",
      changeSummary: "Expansion-batch seed: Herbig-Haro 46/47 protostellar jets.",
      auditMessage:
        "Seed published from ESA/Webb official release (weic2319).",
    },
    {
      slug: "stephans-quintet-interactions",
      title: "Webb's Portrait of Stephan's Quintet",
      subtitle:
        "A compact galaxy group becomes a laboratory for mergers, shocks, and black-hole feedback.",
      dek: "Webb's enormous mosaic of Stephan's Quintet resolves colliding gas, triggered star formation, and AGN-driven outflows in unprecedented infrared detail.",
      evidenceStatus: "official_release",
      difficulty: "intermediate",
      publishedAt: new Date("2026-06-24T16:00:00.000Z"),
      firstSourceDate: new Date("2022-07-12T00:00:00.000Z"),
      topicId: ctx.topics.jwst,
      image: {
        sourceUrl:
          "https://cdn.esawebb.org/archives/images/screen/weic2208a.jpg",
        altText:
          "James Webb Space Telescope infrared mosaic of Stephan's Quintet interacting galaxies",
        caption:
          "Webb's infrared view of Stephan's Quintet, showing interacting galaxies, shocked gas, and dusty star-forming regions.",
        ...webbImageRights,
        verificationNotes:
          "Seed asset: ESA Webb screen-resolution Stephan's Quintet (weic2208a).",
      },
      sources: [
        {
          sourceType: "official_release",
          organization: "ESA / Webb",
          title:
            "Webb Sheds Light on Galaxy Evolution, Black Holes",
          canonicalUrl: "https://esawebb.org/news/weic2208/",
          externalId: "weic2208",
          publicationDate: new Date("2022-07-12T00:00:00.000Z"),
        },
      ],
      conceptIds: conceptIds(ctx.concepts, [
        "galaxy-merger",
        "infrared-astronomy",
      ]),
      lessonIds: infraredLesson,
      summaryMarkdown: `Stephan's Quintet is a compact group of galaxies whose members are close enough on the sky — and mostly close enough in space — to interact violently. One galaxy is a foreground interloper; the others form a dynamical dance of tidal tails, shocks, and shared gas.

Among Webb's early public images was a vast infrared mosaic of the group. It shows how interactions trigger star formation, how gas is disturbed, and how a black hole in one member drives outflows — details previously hard to untangle at this resolution in the infrared.

**Takeaway:** galaxy groups are not quiet neighborhoods; mergers and feedback rewrite gas and stars together.

**Uncertainty:** separating projection effects from true physical association still requires redshifts and careful dynamical modeling for every feature.`,

      articleMarkdown: `## Context

Stephan's Quintet has been a favorite of observers for decades precisely because several members are interacting while one bright spiral is a chance projection. That mix is pedagogically useful: it forces careful thinking about distance before storytelling. Webb's early-release mosaic made the interacting core spectacular in the infrared, revealing dust-obscured star formation and disturbed gas at scales that connect to black-hole fueling.

Stephan's Quintet compresses galaxy merger physics, shocks, and active nuclei into one early Webb mosaic — weic2208 from July 2022 first light.

Stephan's Quintet in weic2208 compresses galaxy merger physics into one July 2022 first-light mosaic.

A foreground spiral interloper keeps redshift discipline central to any interaction narrative in the field.

Stephan's Quintet appears in introductory galaxy courses because it packs mergers, shocks, and AGN into one familiar field.

Stephan's Quintet endures as a galaxy-evolution teaching field because it compresses galaxy merger shocks, tidal debris, and active nuclei into one recognizable mosaic from weic2208. Learners must practice redshift hygiene: the bright foreground spiral is not at the same distance as the interacting group members, and confusing projection with physical association is a common failure mode. Infrared astronomy in this scene highlights dusty star formation and warm gas that optical images underrepresent, connecting merger-driven kinetic energy to observable interstellar responses. Cosmic Gateway pairs galaxy-merger concepts with infrared methods so students ask which wavelengths trace shocks versus stars versus AGN-heated gas. weic2208 is a starting point for IFU and multiwavelength follow-up that quantifies shock velocities and molecular masses rather than replacing those measurements.

## Methods and evidence

Infrared imaging penetrates dust lanes that confuse optical morphology. Mid-infrared emission can highlight polycyclic aromatic hydrocarbons and warm dust in star-forming complexes. Spectroscopy distinguishes shocks from photoionization. Together they turn a famous postcard into a map of energy pathways: orbital kinetic energy into shocks, accretion energy into outflows, and radiative feedback into heated gas.

Credit: NASA, ESA, CSA, STScI under ESA/Webb guidelines.

Infrared imaging in weic2208 penetrates dust that hides star formation triggered by interactions among group galaxies.

Mid-infrared imaging reveals dusty star formation and warm gas heated where group collisions drive shocks.

Spectra in the weic2208 campaign help separate active galactic nucleus emission from shock-traced gas.

Weic2208 imaging supports comparisons between optical tidal features and infrared dust-rich star-forming zones.

## Competing interpretations / open questions

AGN feedback and tidal shocks overlap spatially; spectra disentangle which engine dominates each infrared-bright feature.

Repeated encounters may heat disks and build shared halos over timescales exceeding one epoch image.

Tidal and AGN-driven outflows can overlap spatially in infrared-bright regions of the quintet core.

Some infrared-bright knots may be background sources unrelated to the interacting group if redshifts are missing.

## Prior understanding

Radio and X-ray observations already showed a giant shock where intruder gas slams into the group medium, and optical tails traced stellar debris. One bright spiral was already known as a foreground interloper. Webb's early-release mosaic updates the infrared consequences — where dust and molecules respond — with clarity suited to both research and teaching. Continuity of evidence is a feature: Cosmic Gateway prefers refinement stories that still teach durable methods.

## How to read sources

Demand redshifts before narrative: weic2208 is spectacular but projection hygiene is part of galaxy merger literacy.

weic2208 is the public anchor; IFU studies carry shock velocities omitted from outreach captions.

Check distances before storytelling—projection is a classic error in compact-group astronomy lessons.

Pair weic2208 with galaxy-merger concept material that stresses diversity of outcomes beyond this one field.

## Uncertainty to preserve

Do not flatten the quintet into a single merger event. Multiple encounters over time, projection of overlapping structures, and AGN variability all complicate simple cartoons. Official release weic2208 explains the scene; papers quantify shock velocities, molecular masses, and AGN contribution. Keep galaxy-merger and infrared-astronomy concepts paired so beauty does not outrun method.

Stephan's Quintet is a laboratory for how galaxies grow by interacting. Webb's mosaic shows shocks, star formation, and black-hole-driven gas flows in one frame. Read weic2208 first, then demand redshifts and spectra before accepting any single evolutionary script.
Shock-heated gas in Stephan's Quintet is a multiphase problem. X-rays trace hot plasma; optical lines trace ionized interfaces; infrared molecular emission traces cooler dense gas that somehow survives or reforms downstream of the shock. Webb's contribution to that stack is spatial resolution in the infrared molecular and dusty regimes that connect star formation to large-scale kinetic energy injection.

AGN feedback adds another channel. Outflows powered by accretion can heat and remove gas on scales that overlap tidally driven flows. Disentangling AGN-driven from interaction-driven structures needs spectra and careful spatial association with the nucleus. Deep reading keeps both engines on the table.

Historically, compact groups may resemble common environments at earlier cosmic epochs more than lonely Milky-Way analogs do. That analogy is suggestive, not identical: metallicities, gas fractions, and dark-matter halo concentrations evolve. Use the quintet as a local laboratory, not a perfect high-redshift twin.

Primary source discipline remains simple. ESA/Webb weic2208 for the public mosaic and rights; peer-reviewed IFU and multiwavelength papers for shock velocities and molecular masses. Cosmic Gateway's job is to keep that citation ladder visible beside the spectacle.

Numerical simulations of compact groups show repeated encounters can heat disks and build shared halos of gas. Comparing simulation snapshots to Webb morphology is productive only when redshifts and velocities anchor which galaxies are truly interacting. Deep readers should demand those anchors.

End with the ladder: weic2208, then IFU spectroscopy, then theoretical group-evolution context. Spectacle without that ladder becomes wallpaper.

Pair galaxy-merger concepts with infrared-astronomy methods so Stephan's Quintet teaches physics, not only postcard beauty.

Gas may be heated into a multiphase halo, form stars, or be expelled—models still debate fractions.

Infrared astronomy exposes energy pathways that optical morphology alone cannot fully budget in mergers.

Infrared astronomy clarifies dusty star formation in mergers but does not replace redshift confirmation of physical association.

Keep redshift hygiene beside the spectacle: one interloper already warns that sky proximity is not destiny. Once distances are secure, infrared astronomy becomes the tool that turns Stephan's Quintet from a postcard into a map of shocks, star formation, and feedback tied to galaxy merger physics.`,
      whatHappenedMarkdown:
        "Webb released a large infrared mosaic of Stephan's Quintet resolving interacting galaxies, shocked gas, triggered star formation, and AGN-related outflows.",
      whyItMattersMarkdown:
        "Compact groups illustrate how mergers and feedback reshape galaxies — processes that were likely common in the early Universe.",
      howMeasuredMarkdown:
        "Near- and mid-infrared imaging plus spectroscopy map dusty star formation, shocks, and AGN-powered emission across the group.",
      priorUnderstandingMarkdown:
        "The quintet was already famous optically and in radio/X-ray for shocks and tidal features; one member is a foreground interloper.",
      uncertaintyMarkdown:
        "Dynamical histories, gas fates, and AGN feedback efficiency remain model-dependent; projection can mimic interaction.",
      changeSummary: "Expansion-batch seed: Stephan's Quintet interactions.",
      auditMessage:
        "Seed published from ESA/Webb official release (weic2208).",
    },
    {
      slug: "wolf-rayet-124-winds",
      title: "Webb Captures Wolf-Rayet 124's Winds and Dust",
      subtitle:
        "A rare massive star sheds shells of gas and dust on the road toward a supernova.",
      dek: "Webb's infrared view of WR 124 resolves knotty winds and newly forming dust around a Wolf-Rayet star — a brief prelude to core collapse.",
      evidenceStatus: "official_release",
      difficulty: "intermediate",
      publishedAt: new Date("2026-06-26T16:00:00.000Z"),
      firstSourceDate: new Date("2023-03-14T00:00:00.000Z"),
      topicId: ctx.topics.stars,
      image: {
        sourceUrl:
          "https://cdn.esawebb.org/archives/images/screen/weic2307a.jpg",
        altText:
          "James Webb Space Telescope infrared image of Wolf-Rayet star WR 124 and its surrounding nebula of gas and dust",
        caption:
          "Webb image of WR 124 showing a halo of gas and dust from episodic massive-star winds.",
        ...webbImageRights,
        verificationNotes:
          "Seed asset: ESA Webb screen-resolution WR 124 (weic2307a).",
      },
      sources: [
        {
          sourceType: "official_release",
          organization: "ESA / Webb",
          title: "Webb captures rarely seen prelude to a supernova",
          canonicalUrl: "https://esawebb.org/news/weic2307/",
          externalId: "weic2307",
          publicationDate: new Date("2023-03-14T00:00:00.000Z"),
        },
      ],
      conceptIds: conceptIds(ctx.concepts, [
        "star-formation",
        "infrared-astronomy",
      ]),
      lessonIds: infraredLesson,
      summaryMarkdown: `Wolf-Rayet stars are rare, hot, massive stars that have shed their outer hydrogen envelopes through powerful winds. They are a brief evolutionary prelude to supernova for some of the Galaxy's most massive stars. WR 124, imaged by Webb, is surrounded by a distinctive halo of gas and dust from episodic ejections.

The infrared glow reveals knotty structure — a history of mass loss written in dust that optical light alone does not fully inventory. Even at a scene of impending stellar death, new dust is forming, seeding the interstellar medium with heavy-element building blocks.

**Takeaway:** massive-star winds both destroy and create; infrared astronomy shows the dust they leave behind.

**Uncertainty:** exact ejection timing, dust-mass budgets, and the star's final evolutionary path remain active research topics.`,

      articleMarkdown: `## Context

A Wolf-Rayet phase is brief on stellar timescales — a stripped, hot star driving dense winds before core collapse for many progenitors. WR 124's nebula makes that phase visible. The object is scientifically valuable because mass-loss history is written into surrounding shells, and because dust formation in such hostile winds challenges simple expectations.

Wolf-Rayet stars are brief stripped phases before many core-collapse events; WR 124's nebula records wind history in weic2307.

WR 124 illustrates Wolf-Rayet winds as both destructive stripping and dust factories before core collapse.

weic2307 from March 2023 resolves knotty shells where optical views miss cool ejecta and grains.

WR stars are rare on the sky, which makes WR 124 a precious wind laboratory in weic2307 despite its impending fate.

Wolf-Rayet 124 in weic2307 exemplifies how massive-star winds can be both destructive and creative: the star strips its envelope while condensing dust in clumpy ejecta visible in thermal infrared emission. Learners should connect star formation conceptually through enrichment—future clouds may incorporate grains and metals expelled and processed through WR phases and supernovae—without mislabeling WR 124 itself as a protostar. Infrared astronomy makes the dust chapter readable; ultraviolet and optical spectroscopy remain necessary for terminal wind speeds and surface composition. Knotty shells hint that clumpy mass-loss models may outperform smooth-wind approximations when estimating dust yields from this class of objects. weic2307 is morphology-rich; quantitative wind histories still depend on multiwavelength campaigns beyond the public portrait.

## Methods and evidence

Infrared imaging sees heated dust and some line emission associated with the nebula. Knotty morphology suggests clumpy, time-variable ejection rather than a smooth spherical wind alone. Competing interpretations include eruptive mass-loss episodes and hydrodynamical instabilities sculpting continuous winds. Distinguishing them needs kinematics and multi-epoch comparison.

Credit follows ESA/Webb practice for weic2307.

Infrared imaging sees dust condensing in dense wind clumps — a star formation enrichment story told through infrared astronomy.

Infrared cameras map thermal dust in episodic ejection shells around this massive star.

Ultraviolet and optical spectroscopy remain necessary to constrain wind speeds imaging cannot provide alone.

Thermal infrared emission in weic2307 traces dust that optical surveys of the same field largely miss.

## Competing interpretations / open questions

Smooth versus clumpy mass-loss models change dust yields inferred from knotty structure around WR 124.

Clumpy versus smooth mass-loss models change inferred dust yields from knotty infrared structure.

Whether wind-formed dust survives the eventual supernova reverse shock is still debated for enrichment budgets.

Eruptive mass-loss episodes may produce clumps that smooth-wind models would never predict around WR 124.

## Prior understanding

Ground-based and earlier space infrared observations already knew WR 124 as an ejecta-rich Wolf-Rayet. Evolutionary models already framed the phase as brief stripping before core collapse for many progenitors. Webb's contribution is spatial clarity: the halo's knotty structure and dust glow become sharper tools for mass-loss history and grain physics. The narrative is refinement of winds and dust, not sudden invention of the stellar class.

## How to read sources

weic2307 opens the infrared chapter; ultraviolet and optical spectroscopy finish wind speed and composition claims.

Pair weic2307 with wind spectroscopy papers before stating quantitative mass-loss histories.

Prelude-to-supernova outreach language must not imply a precise remaining lifetime for the star.

Use weic2307 for morphology and wind papers for ejection histories when teaching massive-star evolution.

## Uncertainty to preserve

Do not equate "prelude to a supernova" with a countdown clock. Evolutionary models still debate pathways and binary influence for individual Wolf-Rayet stars. Dust detected today may be destroyed tomorrow in a blast wave. Cosmic Gateway keeps those caveats visible while still using WR 124 to teach winds, dust, and infrared method.

WR 124 shows massive-star winds as both destructive stripping and creative dust factories. Webb's infrared portrait (weic2307) is the public door. Link star-formation only carefully — the connection is enrichment of future clouds, not that WR 124 is itself a protostar — and keep infrared astronomy as the reason the dust is visible at all.
Wind clumping changes everything from mass-loss rate estimates to dust yields. Smooth-wind assumptions can misestimate how much mass a Wolf-Rayet star truly sheds. Knotty infrared structure around WR 124 is therefore not only aesthetic — it is a warning about microphysics. Resolved clumps hint that density contrasts are real; translating them into revised mass-loss histories still needs quantitative modeling.

Nucleosynthesis context belongs here too. Wolf-Rayet winds can release helium-burning products before the supernova. Dust grains may incorporate those metals. Whether such dust contributes substantially to the Galactic dust budget is debated; nearby examples calibrate the possibility without settling extragalactic early-Universe dust puzzles alone.

Deep pedagogy should also separate "rarely seen prelude" language from calendar claims. Evolutionary tracks depend on mass, rotation, metallicity, and binarity. An individual star's remaining lifetime is not stamped on an image. Cosmic Gateway keeps the prelude metaphor while refusing fake precision.

Return to methods: infrared sees the cool condensate; ultraviolet and optical spectroscopy see the hot wind; radio may see ionized mass-loss on larger scales. WR 124 is a multiwavelength object. weic2307 is the infrared chapter title, not the whole book.

Dust-yield uncertainties propagate into galactic chemical-evolution models. If Wolf-Rayet dust is efficiently destroyed in reverse shocks after supernova, the net contribution shrinks. Infrared detections today measure present dust, not guaranteed long-term survival.

Close with weic2307 as the infrared door and multiwavelength wind studies as the required next rooms. Cosmic Gateway deep reading is a floor plan, not a single chamber.

Link star formation only via enrichment pathways — WR 124 is not a protostar, though its dust may feed future clouds.

Dust masses depend on grain models; infrared brightness is not a direct mass scale without assumptions.

Infrared astronomy makes the dust chapter visible in a hostile wind environment around WR 124.

Star formation links here are about future enrichment, not present protostellar activity in the WR 124 field.

Peer-reviewed wind papers still refine clumping factors implied by weic2307 shell morphology.

Treat 'prelude to a supernova' as evolutionary context, not a countdown clock stamped on weic2307. Dust detected in Wolf-Rayet winds today may not survive the eventual blast wave, so infrared astronomy here measures present grains, not guaranteed long-term enrichment of later star formation.`,
      whatHappenedMarkdown:
        "Webb imaged Wolf-Rayet star WR 124 in the infrared, resolving knotty shells of gas and dust from episodic massive-star winds.",
      whyItMattersMarkdown:
        "Wolf-Rayet winds enrich the Galaxy with heavy elements and dust — a brief phase linking massive-star evolution to later star formation.",
      howMeasuredMarkdown:
        "Infrared imaging maps thermal dust and ejected shell structure; prior spectroscopy constrains wind speeds and composition.",
      priorUnderstandingMarkdown:
        "WR 124 was already known as an ejecta-rich Wolf-Rayet; earlier infrared data lacked Webb's spatial clarity.",
      uncertaintyMarkdown:
        "Dust masses, ejection timelines, and the star's exact path to supernova remain model-dependent.",
      changeSummary: "Expansion-batch seed: Wolf-Rayet 124 winds.",
      auditMessage:
        "Seed published from ESA/Webb official release (weic2307).",
    },
    {
      slug: "m82-starburst-galaxy",
      title: "Webb's Infrared View of Starburst Galaxy M82",
      subtitle:
        "A nearby galactic wind laboratory lit by intense star formation.",
      dek: "Webb resolves the dusty heart and outflowing structures of M82, a classic starburst galaxy seen nearly edge-on.",
      evidenceStatus: "official_release",
      difficulty: "intermediate",
      publishedAt: new Date("2026-06-28T16:00:00.000Z"),
      firstSourceDate: new Date("2024-03-11T00:00:00.000Z"),
      topicId: ctx.topics.jwst,
      image: {
        sourceUrl:
          "https://cdn.esawebb.org/archives/images/screen/weic2410a.jpg",
        altText:
          "James Webb Space Telescope infrared image of the starburst galaxy Messier 82",
        caption:
          "Webb infrared portrait of M82, highlighting dust, star clusters, and structures tied to its starburst-driven wind.",
        ...webbImageRights,
        verificationNotes:
          "Seed asset: ESA Webb screen-resolution M82 starburst (weic2410a).",
      },
      sources: [
        {
          sourceType: "official_release",
          organization: "ESA / Webb",
          title: "Webb probes the heart of starburst galaxy Messier 82",
          canonicalUrl: "https://esawebb.org/news/weic2410/",
          externalId: "weic2410",
          publicationDate: new Date("2024-03-11T00:00:00.000Z"),
        },
      ],
      conceptIds: conceptIds(ctx.concepts, [
        "starburst-galaxy",
        "infrared-astronomy",
      ]),
      lessonIds: infraredLesson,
      summaryMarkdown: `Messier 82 is a nearby starburst galaxy — a system forming stars at a rate far above a quiet spiral like the Milky Way. Seen nearly edge-on, its dusty disk and bipolar galactic wind have made it a classic laboratory for how intense star formation drives gas out of galaxies.

Webb's infrared observations resolve clusters, dust lanes, and structures connected to that wind with new clarity. Dust that blocks optical light becomes a tracer rather than only an obstacle.

**Takeaway:** starbursts power galactic winds, and infrared astronomy lets us see the engines inside the dust.

**Uncertainty:** converting infrared brightness into exact star-formation rates still depends on models of dust and stellar populations.`,

      articleMarkdown: `## Context

Few galaxies are as thoroughly studied for feedback as M82. Its proximity, edge-on disk, and luminous wind made it a textbook starburst long before Webb. The scientific question is not whether a wind exists, but how energy and momentum from star formation couple to multiphase gas — cold dust and molecules included.

Messier 82 is the local starburst galaxy archetype with a known M81 interaction trigger and edge-on wind — imaged in weic2410 March 2024.

M82 is the local starburst galaxy archetype with an M81 interaction trigger and edge-on wind geometry.

weic2410 from March 2024 images the dusty disk where the starburst engine burns behind extinction.

Edge-on M82 in weic2410 helps relate disk dust lanes to the bipolar wind seen in other bands for decades.

Messier 82 in weic2410 is the local reference for starburst feedback: an edge-on disk, a likely M81 interaction trigger, and a bipolar wind seen across the electromagnetic spectrum for decades before Webb's March 2024 infrared update. Learners should separate morphology from mass budgets—a spectacular wind shape in an image does not by itself quantify how much gas escapes versus falls back into the disk. Infrared astronomy reveals obscured clusters that optical maps undercount, which is central to defining what a starburst galaxy actually is observationally. Cosmic Gateway uses M82 to teach that feedback is an energy-coupling problem linking young massive stars, dust, and multiphase outflows. weic2410 opens the engine room; cited wind literature still carries mass-loading numbers with explicit assumptions.

## Methods and evidence

Infrared astronomy turns obscuration into signal. Dust continuum and PAH features locate where ultraviolet light from young stars is reprocessed. Resolving those regions matters for testing whether winds are launched widely or from concentrated super star clusters. ESA/Webb weic2410 is primary for the public narrative and image rights (NASA, ESA, CSA, STScI).

Infrared astronomy turns dust obscuration into a tracer of young clusters powering the galactic wind in M82.

Near- and mid-infrared maps locate young clusters and warm dust tied to the galactic wind.

X-ray and H-alpha archives contextualize hot ionized components Webb's infrared layer complements.

Polycyclic aromatic hydrocarbon features in weic2410 trace UV processing in dense star-forming zones of the burst.

## Competing interpretations / open questions

Fountain versus escape scenarios for cold gas entrained in the wind need velocities, not morphology alone from weic2410.

Fountain versus escape scenarios for entrained cold gas need velocities, not morphology alone from weic2410.

Star-formation rate estimates from infrared luminosity inherit IMF and dust assumptions learners should know.

Some wind material may recirculate into the disk rather than escape cleanly from the starburst galaxy halo.

## Prior understanding

Decades of data already established M82's interaction-triggered burst and bipolar outflow. Spitzer, Hubble, Chandra, and ground-based H-alpha maps supplied wind and X-ray context. Webb updates the infrared census of the disk and dusty wind interfaces. The question remains how energy and momentum from star formation couple to multiphase gas — a continuity of research that Cosmic Gateway treats as a teaching strength.

## How to read sources

Use weic2410 for the public starburst portrait and classic wind literature for mass-loading numbers with error bars.

Use weic2410 for the public engine-room portrait and wind literature for mass-loading numbers.

Interaction with M81 belongs in the story so M82 is not taught as a spontaneous isolated burst.

weic2410 is the outreach anchor; starburst-galaxy feedback numbers require cited multiwavelength literature.

## Uncertainty to preserve

Mass-loading factors, dust survival in hot winds, and time variability of the burst complicate single-image conclusions. Edge-on projection blends structures along the line of sight. Keep starburst-galaxy and infrared-astronomy concepts linked so readers ask both "how fast are stars forming?" and "what wavelength proved it?"

M82 teaches galactic feedback at a human-friendly distance. Webb's infrared view (weic2410) opens the dusty engine room. Read the official release first; demand multiwavelength mass budgets before accepting any final wind verdict.
Galactic winds are multiphase: hot X-ray plasma, warm ionized filaments, cold molecular clouds, and dust. Each phase carries different mass and energy. Infrared-bright dust may be entrained from the disk or formed/destroyed in situ within the flow. Deep interpretation therefore asks which phase dominates the mass budget — often the cold gas — even when the hot gas dominates the volume.

Starburst triggering by interaction raises timing questions. How long does the burst last? Is the wind steady or episodic? Edge-on geometry can blend temporal sequences along the line of sight. Webb's resolved infrared clusters help localize where stars are forming now; they do not by themselves yield a full star-formation history.

For learners comparing M82 to high-redshift dusty galaxies, selection and distance matter. M82 is a gift because it is nearby; most starbursts in deep fields are unresolved. Teaching that gap prevents overconfident analogies.

Source ladder: ESA/Webb weic2410 for the public infrared portrait; classic multiwavelength wind literature for mass-loading; interaction studies with M81 for the trigger narrative. Cosmic Gateway holds all three without pretending a single release finishes feedback physics.

Molecular gas entrained in winds may fuel future star formation if it falls back, or enrich the halo if it escapes. Distinguishing fountain from wind requires velocities relative to escape speed — spectroscopy again.

Finish on provenance and humility: weic2410 for the public infrared view; wind mass-loading papers for quantitative claims; interaction studies for the trigger. Deep literacy is knowing which document answers which question.

A starburst galaxy snapshot is not a full feedback history — keep infrared-astronomy method questions beside the bipolar wind image.

Edge-on projection blends structures along the line of sight in any single-epoch starburst image.

Infrared astronomy reveals obscured clusters optical maps undercount in heavily dust-enshrouded bursts.

A single infrared epoch cannot distinguish steady winds from bursty feedback without time-domain follow-up.

When teaching M82, emphasize that starburst galaxies are defined operationally by star-formation rate surface density and inferred feedback power, not by aesthetic wind shapes alone. weic2410 helps learners see obscured clusters, but cited papers still carry the mass-loading debate.

Distinguish fountain from wind with velocities relative to escape speed, and distinguish infrared-bright dust morphology from a finished mass-loading budget. M82 remains the nearby starburst galaxy classroom precisely because multiwavelength papers must finish what one mosaic begins.`,
      whatHappenedMarkdown:
        "Webb imaged starburst galaxy M82 in the infrared, resolving dusty star-forming regions and structures linked to its galactic wind.",
      whyItMattersMarkdown:
        "M82 is a nearby laboratory for how intense star formation drives gas out of galaxies and shapes their growth.",
      howMeasuredMarkdown:
        "Infrared imaging maps dust-obscured clusters and warm dust; multiwavelength archives supply the wind and X-ray context.",
      priorUnderstandingMarkdown:
        "M82 was already a classic starburst with a known bipolar wind, likely triggered by interaction with M81.",
      uncertaintyMarkdown:
        "Star-formation rates, wind mass-loading, and dust survival in the outflow remain model-dependent.",
      changeSummary: "Expansion-batch seed: M82 starburst galaxy.",
      auditMessage:
        "Seed published from ESA/Webb official release (weic2410).",
    },
    {
      slug: "extremely-red-quasar-webb",
      title: "Webb Finds a Dense Cosmic Knot Around an Extremely Red Quasar",
      subtitle:
        "Spectroscopy reveals a forming galaxy cluster core in the early Universe.",
      dek: "Webb uncovers a concentration of massive galaxies assembling around an extremely red quasar, probing how early cosmic nodes grew.",
      evidenceStatus: "official_release",
      difficulty: "advanced",
      publishedAt: new Date("2026-06-30T16:00:00.000Z"),
      firstSourceDate: new Date("2022-10-20T00:00:00.000Z"),
      topicId: ctx.topics.blackHoles,
      image: {
        sourceUrl:
          "https://cdn.esawebb.org/archives/images/screen/weic2217a.jpg",
        altText:
          "James Webb Space Telescope infrared view related to an extremely red quasar and surrounding early-Universe galaxies",
        caption:
          "Webb infrared observations of a dense knot of galaxies assembling around an extremely red quasar in the early Universe.",
        ...webbImageRights,
        verificationNotes:
          "Seed asset: ESA Webb screen-resolution extremely red quasar field (weic2217a).",
      },
      sources: [
        {
          sourceType: "official_release",
          organization: "ESA / Webb",
          title:
            "Webb Uncovers Dense Cosmic Knot In The Early Universe",
          canonicalUrl: "https://esawebb.org/news/weic2217/",
          externalId: "weic2217",
          publicationDate: new Date("2022-10-20T00:00:00.000Z"),
        },
      ],
      conceptIds: conceptIds(ctx.concepts, ["quasar", "black-hole"]),
      summaryMarkdown: `Quasars are luminous galactic nuclei powered by accreting supermassive black holes. An "extremely red" quasar is heavily dust-reddened, so much of its ultraviolet light is absorbed and reprocessed — a sign of a buried, rapidly growing engine.

Using Webb's infrared sensitivity and spectroscopy, astronomers found a dense knot of massive galaxies assembling around such a quasar in the early Universe. The result links black-hole growth to the formation of cosmic-web nodes that will become clusters.

**Takeaway:** early black holes and early galaxy overdensities grow together, and infrared spectroscopy is what makes both measurable through dust and distance.

**Uncertainty:** membership completeness and exact halo masses still depend on redshift confirmation and modeling.`,

      articleMarkdown: `## Context

Extremely red quasars occupy a transitional or dust-obscured mode of black-hole growth. Their redness is not a party trick; it is extinction physics. In the early Universe, such objects may mark galaxies still rich in gas and dust while their central engines shine. Finding a dense galaxy knot around one suggests that luminous accretion and environmental assembly can coincide.

Extremely red quasars mark dust-buried black hole growth; weic2217 finds a dense galaxy knot in the early Universe around one such engine.

Extremely red quasars mark dust-buried black hole growth in gas-rich early-Universe nodes.

weic2217 finds a dense galaxy knot around such a quasar—not an isolated luminous nucleus story.

Early-Universe overdensities are hard to find; dusty red quasars like the weic2217 target act as signposts.

The extremely red quasar field in weic2217 connects black hole growth to environmental assembly during an epoch when dusty engines are easily missed by optical surveys. Learners should keep quasar and black hole vocabulary distinct yet linked: luminosity traces accretion, while neighbor galaxies trace potential fueling environments that may sustain or modulate that accretion. Infrared spectroscopy is not optional here—it recovers redshifts and lines that dust reddening hides from optical selection. Proto-cluster claims require membership discipline; photometric proximity alone can inflate apparent overdensities around bright quasars. weic2217 is a signpost into papers that quantify halo mass and completeness rather than a final cluster catalog by itself.

## Methods and evidence

Infrared astronomy is the enabling layer: rest-frame optical lines redshifted into the near-infrared, continuum shape constraints on dust, and spatial resolution to separate neighbors. Spectroscopy, not imaging alone, makes the cosmic knot a physical association rather than a projection.

Credit: NASA, ESA, CSA, STScI via ESA/Webb weic2217.

Infrared spectroscopy through weic2217 recovers redshifts and lines optical surveys miss in heavily reddened quasar systems.

Infrared spectroscopy recovers redshifts and lines optical surveys lose to dust reddening in this field.

Photometric neighbors require spectroscopic confirmation before proto-cluster membership claims harden.

Rest-frame optical lines shifted into Webb bands make weic2217 spectroscopy central to neighbor confirmation.

## Competing interpretations / open questions

Possible readings include a proto-cluster core fueled by shared large-scale inflows, merger-driven gas delivery to both galaxies and the black hole, or a mix. None is proven by discovery alone. The pedagogical win is keeping black-hole fueling and galaxy overdensity on the same page.

Shared cold inflows, merger-driven fueling, or mixed models can explain quasar-plus-overdensity coincidence without picking one from a image alone.

Cold inflows, mergers, or mixed fueling may explain quasar-plus-overdensity coincidence in weic2217.

Line ratios in dusty high-redshift galaxies remain template-sensitive for separating AGN and star formation.

Some neighbors may be foreground interlopers whose colors mimic high-redshift cluster members.

## Prior understanding

Pre-Webb surveys already flagged dust-reddened quasars and sought overdensities around luminous black holes at high redshift. Color selection was known to be incomplete, and optical spectroscopy struggled with extinction. Webb's infrared sensitivity and spectroscopy enable a sharper census of neighbors and a clearer link between buried accretion and assembling cosmic-web nodes. The class was known; the mapped knot is the update.

## How to read sources

Pair quasar and black hole concept pages with weic2217, then read papers for halo mass — not headlines alone.

Membership and halo mass live in papers beyond weic2217 headline language about cosmic knots.

Bolometric corrections for black hole mass carry systematics outreach summaries rarely emphasize.

Black hole and quasar concept pages should accompany weic2217 so learners separate engine from environment.

Keep quasar and black hole concept links explicit when discussing weic2217 environmental assembly claims.

## Uncertainty to preserve

Selection effects matter: extremely red quasars are not a random draw of all black holes. Completeness of the galaxy census around the quasar will improve with deeper spectroscopy. Cosmic Gateway refuses to upgrade a dense knot into a finished cluster without those steps.

Webb's extremely red quasar field teaches co-evolution: black holes and galaxy nodes grow in dusty, gas-rich environments. Start at weic2217, keep quasar and black-hole concepts linked, and treat membership and halo mass as measured claims only when spectra say so.
Dust-reddened quasars complicate surveys. Color selection can miss them or misclassify them; infrared follow-up recovers them. That survey physics is part of the discovery's Deep meaning: what we know about early black holes depends on how we search. Extremely red objects are a reminder of incompleteness as much as a spotlight on one dramatic system.

Overdensity confirmation is statistical and spectroscopic. Photometric associations can be chance projections. Deep reading asks for redshift histograms, velocity dispersions, and comparisons to field counts. A "cosmic knot" headline is a pointer into that analysis, not a substitute for it.

Black-hole mass and accretion rate estimates bring their own systematics — virial calibrations, bolometric corrections, extinction corrections. Pairing quasar and black-hole concepts should include those caveats so luminosity does not silently become mass.

Official release weic2217 remains the public narrative door. Peer-reviewed spectroscopy papers are where membership and physical association are argued with error bars. Cosmic Gateway's Deep layer exists to keep readers moving through that door into the workshop rather than camping in the headline.

Line diagnostics can separate AGN photoionization from star formation in neighbors, but high redshift and dust complicate templates. Deep analysis treats line ratios as model-dependent, not as instant labels.

Return to weic2217 as the official narrative start, then spectroscopic membership papers, then black-hole demographics context. That order keeps an extremely red spotlight from becoming an unexamined myth.

Do not upgrade a cosmic knot into a finished cluster without redshift histograms and field-count comparisons.

Extremely red quasars are a selected class—not a random draw of all high-redshift black holes.

Duty-cycle and completeness of the galaxy census around the quasar remain open without deeper spectra.

Extremely red selection finds a subset of black hole growth modes, not the full early population.

Advanced learners should compare field galaxy counts around the weic2217 quasar to control fields at similar redshift before accepting proto-cluster labels. Black hole accretion luminosity and neighbor stellar mass assembly can co-evolve without a single simple causal story.

An extremely red quasar is a selection-dependent spotlight on buried black hole growth, not a random draw of all early engines. Membership histograms and extinction-corrected luminosities belong beside weic2217 before any halo-mass number hardens into lore.`,
      whatHappenedMarkdown:
        "Webb spectroscopy uncovered a dense knot of massive galaxies assembling around an extremely red quasar in the early Universe.",
      whyItMattersMarkdown:
        "It links rapid black-hole growth to forming cosmic-web nodes and shows why infrared spectra are essential at high redshift.",
      howMeasuredMarkdown:
        "Infrared imaging plus spectroscopy measure redshifts, dust reddening, and physical association of neighboring galaxies with the quasar.",
      priorUnderstandingMarkdown:
        "Dusty quasars and high-redshift overdensities were known as classes; Webb enabled a sharper spectroscopic census in this field.",
      uncertaintyMarkdown:
        "Member completeness, halo mass, and the quasar's long-term duty cycle remain uncertain without deeper follow-up.",
      changeSummary: "Expansion-batch seed: extremely red quasar / cosmic knot.",
      auditMessage:
        "Seed published from ESA/Webb official release (weic2217).",
    },
    {
      slug: "cartwheel-galaxy-collision",
      title: "Webb's New Look at the Cartwheel Galaxy",
      subtitle:
        "A ring galaxy forged by a head-on collision, seen in infrared dust and star formation.",
      dek: "Webb resolves the Cartwheel's rings and spokes in infrared light, mapping dust and young stars in a classic collisional ring galaxy.",
      evidenceStatus: "official_release",
      difficulty: "beginner",
      publishedAt: new Date("2026-07-02T16:00:00.000Z"),
      firstSourceDate: new Date("2022-08-02T00:00:00.000Z"),
      topicId: ctx.topics.jwst,
      image: {
        sourceUrl:
          "https://cdn.esawebb.org/archives/images/screen/weic2211a.jpg",
        altText:
          "James Webb Space Telescope infrared image of the Cartwheel galaxy showing rings and spokes",
        caption:
          "Webb infrared view of the Cartwheel galaxy, a collisional ring system with dusty spokes and star-forming rings.",
        ...webbImageRights,
        verificationNotes:
          "Seed asset: ESA Webb screen-resolution Cartwheel galaxy (weic2211a).",
      },
      sources: [
        {
          sourceType: "official_release",
          organization: "ESA / Webb",
          title: "Webb captures a spectacular galactic crash in unprecedented detail",
          canonicalUrl: "https://esawebb.org/news/weic2211/",
          externalId: "weic2211",
          publicationDate: new Date("2022-08-02T00:00:00.000Z"),
        },
      ],
      conceptIds: conceptIds(ctx.concepts, [
        "galaxy-merger",
        "infrared-astronomy",
      ]),
      lessonIds: infraredLesson,
      summaryMarkdown: `The Cartwheel galaxy is a collisional ring galaxy: a smaller companion punched nearly head-on through a larger spiral, sending a expanding density wave outward. That wave compresses gas into a bright star-forming ring, while spokes and an inner ring preserve a more complicated dynamical aftermath.

Webb's infrared image resolves dust and young stellar populations across those structures with new clarity. Regions that look like quiet gaps in optical light can still hold warm dust and embedded star formation.

**Takeaway:** galaxy collisions can remake disks into rings, and infrared light shows where dust and newborn stars follow the wave.

**Uncertainty:** exact timing of the impact and the companion's present trajectory continue to be refined with kinematics.`,

      articleMarkdown: `## Context

Ring galaxies are rare and pedagogically precious. They demonstrate that encounter geometry — head-on versus glancing — controls morphology. The Cartwheel's expanding ring is a density wave, not a rigid hoop. Stars and gas respond differently; dust and H-alpha often light up where gas was compressed most recently.

Collisional ring galaxies are rare orbital diagrams; the Cartwheel's expanding wave was already famous before weic2211 infrared detail.

The Cartwheel is a collisional ring galaxy where a galaxy merger launched an expanding density wave.

weic2211 maps dusty star formation along the ring crest that optical views underrepresent.

Ring galaxies are rare; the Cartwheel's visibility makes weic2211 a default merger-geometry lesson in outreach.

The Cartwheel galaxy in weic2211 remains the iconic collisional ring: a galaxy merger geometry that produces an expanding density wave rather than only a smooth elliptical remnant. Learners should remember that stars and gas respond differently to the wave—offset rings and dusty crests in infrared light often track compressed gas where new stars form. Spokes remain an active research topic; treating them as settled highway structures overstates what a single epoch image can prove. Infrared astronomy maps dusty star formation along the ring where optical gaps can misleadingly suggest quiescence. weic2211 pairs with dynamical models and HI maps for impact parameters; the public image alone does not timestamp the collision.

## Methods and evidence

Infrared imaging is ideal for dusty rings. It reveals embedded star formation and the cool ISM that optical bands miss. Multi-band composites are interpretive tools: they encode physical components, not arbitrary beauty filters. ESA/Webb weic2211 carries the public image and credit line (NASA, ESA, CSA, STScI).

Infrared imaging in weic2211 maps dusty star-forming crests where a galaxy merger launched a density wave through the disk.

Near- and mid-infrared cameras trace PAH emission, warm dust, and stellar continuum across rings and spokes.

Hubble optical fame preceded weic2211's sharper infrared inventory of embedded formation in the wave.

Infrared-bright crests in weic2211 mark where the density wave recently compressed gas into stars.

Compare weic2211 infrared crests with optical ring images in class to show where embedded dust-rich star formation persists along the collisional density wave.

## Competing interpretations / open questions

Spoke longevity and companion trajectories remain active morphological puzzles beyond the weic2211 snapshot.

Spokes may be transient structures; treating them as permanent highways overstates current models.

Hydrodynamical models need gas cooling and feedback to match infrared-bright dusty crests Webb emphasizes.

Inner ring and spoke features may trace different phases of the same collisional wave train.

## Prior understanding

Optical and ultraviolet studies already established the Cartwheel as a collisional ring with a companion group, and Spitzer offered earlier infrared context. The density-wave interpretation of the outer star-forming ring was standard. Webb's advance is resolution and sensitivity that sharpen spokes, knots, and dust lanes for research and teaching. Ring galaxies remain rare successful geometries among many merger outcomes — a prior fact Webb does not erase.

## How to read sources

weic2211 supplies the public infrared rings; HI maps and models supply impact parameters for the galaxy merger story.

Cartwheel claims should cite weic2211 plus dynamical models for impact parameters.

Official releases emphasize morphology; kinematic maps supply collision timing constraints.

weic2211 should be paired with galaxy-merger resources that emphasize impact-parameter dependence.

## Uncertainty to preserve

Do not over-read every spoke as a permanent highway. Transient features and projection complicate cartoons. Galaxy-merger concept pages should stress diversity of outcomes; the Cartwheel is one successful geometry, not the only merger fate.

The Cartwheel teaches collisions as creative, not only destructive. Webb's infrared rings and spokes (weic2211) show dust and star formation riding a density wave. Keep galaxy-merger and infrared-astronomy concepts paired, and keep dynamical timelines humble until kinematics lock them down.
Density-wave rings expand; they do not rotate like solid carnival wheels. Stars may pass through the wave while gas shocks and forms new stars in the high-density crest. That differential response explains why stellar and gaseous rings can look offset or differently structured. Infrared dust maps often track the gaseous, star-forming crest most clearly.

Spoke features remain an active morphological puzzle. They may be trailing structures, dust lanes shaped by resonances, or transient debris from the collision geometry. Deep teaching should present spokes as open research rather than settled cartoon arrows.

Comparing the Cartwheel to other collisional rings trains transfer. Not every ring is equally dusty or equally symmetric. Gas fraction and disk stability change outcomes. Galaxy-merger literacy is a family of morphologies, not a single logo.

Rights and provenance for weic2211 follow ESA/Webb practice. Use the official release for the public image; use dynamical models and HI maps for impact parameters. Cosmic Gateway closes the loop by insisting that beauty is allowed and that orbital geometry remains the scientific plot.

Hydrodynamical models must include gas cooling and feedback to predict whether rings stay star-forming or quench. Pure N-body stellar disks cannot capture the infrared-bright dusty crest Webb emphasizes.

Close the Cartwheel loop with weic2211, dynamical models, and a reminder that collisional rings are rare successful geometries among many merger outcomes.

Ring galaxies are one merger geometry among many — infrared astronomy shows dusty fuel, not a universal merger fate.

Stars and gas respond differently to the expanding wave; offset rings are expected, not suspicious.

Infrared astronomy traces dusty fuel along the crest where optical gaps can look like quiet zones.

Galaxy merger outcomes include ellipticals and tidal tails—not every encounter produces a prominent ring.

Assign learners to sketch how a density wave moves through disk gas versus older stars, then compare their sketch to weic2211 infrared morphology. Galaxy merger simulations with gas physics remain essential reading alongside the public ring image.

weic2211 inspires orbital-geometry questions that simulations, not captions alone, can help learners test rigorously.

Remember that collisional rings are rare successful geometries among many galaxy merger outcomes. Webb's infrared rings and spokes show dust riding a density wave; kinematics still set the impact clock that beauty alone cannot provide. Hydrodynamical models that omit cooling and feedback cannot reproduce the infrared-bright dusty crest.`,
      whatHappenedMarkdown:
        "Webb released infrared images of the Cartwheel galaxy resolving dusty rings, spokes, and star-forming structure in this collisional system.",
      whyItMattersMarkdown:
        "It shows how a head-on galaxy collision can reshape a disk into rings and how infrared light traces the dusty star-forming response.",
      howMeasuredMarkdown:
        "Near- and mid-infrared imaging map dust and young stellar populations across the Cartwheel's rings and spokes.",
      priorUnderstandingMarkdown:
        "The Cartwheel was already a classic collisional ring in optical/UV studies; earlier infrared data lacked Webb's detail.",
      uncertaintyMarkdown:
        "Impact timing, companion trajectory, and the longevity of spoke structures remain model-dependent.",
      changeSummary: "Expansion-batch seed: Cartwheel galaxy collision.",
      auditMessage:
        "Seed published from ESA/Webb official release (weic2211).",
    },
    {
      slug: "pandoras-cluster-lensed-galaxies",
      title: "Webb Peers Through Pandora's Cluster",
      subtitle:
        "Gravitational lensing turns a massive cluster into a natural telescope for distant galaxies.",
      dek: "Webb's view of Pandora's Cluster (Abell 2744) uses gravitational lensing to reveal faint background galaxies and map dark matter's pull.",
      evidenceStatus: "official_release",
      difficulty: "advanced",
      publishedAt: new Date("2026-07-04T16:00:00.000Z"),
      firstSourceDate: new Date("2022-11-15T00:00:00.000Z"),
      topicId: ctx.topics.cosmology,
      image: {
        sourceUrl:
          "https://cdn.esawebb.org/archives/images/screen/weic2220a.jpg",
        altText:
          "James Webb Space Telescope infrared image of Pandora's Cluster showing lensed background galaxies",
        caption:
          "Webb infrared view of Pandora's Cluster (Abell 2744), where gravitational lensing magnifies distant background galaxies.",
        ...webbImageRights,
        verificationNotes:
          "Seed asset: ESA Webb screen-resolution Pandora's Cluster (weic2220a).",
      },
      sources: [
        {
          sourceType: "official_release",
          organization: "ESA / Webb",
          title:
            "Webb takes a deep look at Pandora's Cluster",
          canonicalUrl: "https://esawebb.org/news/weic2220/",
          externalId: "weic2220",
          publicationDate: new Date("2022-11-15T00:00:00.000Z"),
        },
      ],
      conceptIds: conceptIds(ctx.concepts, [
        "gravitational-lensing",
        "dark-matter",
      ]),
      lessonIds: infraredLesson,
      summaryMarkdown: `Pandora's Cluster (Abell 2744) is a massive galaxy cluster assembled from multiple colliding subclusters. Its gravity warps spacetime enough to magnify and distort galaxies far behind it — a natural telescope called gravitational lensing.

Webb's infrared imaging resolves faint lensed backgrounds and cluster members with new depth. Because most of a cluster's mass is dark matter, lensing maps are also maps of mass that does not shine.

**Takeaway:** clusters lens the distant Universe and reveal dark matter's distribution through geometry, not glow.

**Uncertainty:** precise mass models and source redshifts require extensive spectroscopy and careful lens modeling.

Lensing magnification is a model output with uncertainties, not a free brightness upgrade for every arc.`,

      articleMarkdown: `## Context

Abell 2744 is not a relaxed, textbook sphere of galaxies. It is a multi-component merger — hence "Pandora's." That complexity is scientifically fertile: it tests whether lensing, X-ray gas, and galaxy kinematics tell a consistent mass story during assembly. Dark matter does not collide electromagnetically like gas, so merging clusters can separate collisionless mass from baryonic plasma — a classic dark-matter argument when data quality allows.

Abell 2744 merges subclusters, complicating lensing optics while strengthening dark matter tests — Pandora's Cluster in weic2220.

Pandora's Cluster Abell 2744 merges subclusters, complicating lens models while testing dark matter.

weic2220 deepens the infrared source catalog feeding both strong and weak lensing inferences.

Abell 2744's chaotic merger history is exactly why lensing models need many constraints from weic2220 arcs.

Pandora's Cluster in weic2220 is scientifically fertile because Abell 2744 is mid-merger: multiple mass peaks complicate lens models while strengthening tests of how dark matter traces collisionless mass. Learners should treat gravitational lensing as both tool and measurement—arcs are beautiful, but their physics is inferential through mass models and redshifts. Infrared depth helps find faint background sources that feed both strong and weak lensing analyses. Magnification is not uniform across the source plane; quoting intrinsic luminosities without magnification uncertainties is a common overreach in popular summaries. weic2220 begins the story; spectroscopic confirmation of multiple-image systems remains the gold standard for precision lensing science.

## Methods and evidence

Strong lensing (arcs, multiple images) constrains the dense core; weak lensing extends the mass map to larger radii. Webb improves the infrared source catalog that feeds both. Gravitational-lensing concept pages should stress that magnification is a model output, not a free luminosity upgrade.

Credit and rights follow ESA/Webb weic2220 (NASA, ESA, CSA, STScI).

Strong lensing arcs in weic2220 constrain mass peaks dominated by dark matter rather than X-ray gas alone.

Arcs and multiple images constrain mass peaks where dark matter dominates over luminous plasma.

X-ray gas traces baryons that can separate from collisionless mass during cluster mergers.

Infrared depth in weic2220 helps find faint lensed sources that optical searches undercount due to color or dust.

Document which arcs in weic2220 have spectroscopic redshifts before using them as strong-lensing constraints in homework problems.

## Competing interpretations / open questions

Different multi-peak lens models can reproduce similar arc positions but predict different magnifications for background sources.

Degeneracies among multi-peak lens models can shift magnifications for the same background galaxy.

Photometric redshift errors misplace sources and bias inferred dark matter maps if unchecked.

Weak-lensing maps and strong-lensing arcs may imply slightly different mass peaks if systematics differ.

## Prior understanding

Hubble Frontier Fields and X-ray observatories already made Pandora's Cluster a lensing workhorse and a testbed for comparing collisionless mass to hot gas during assembly. Strong and weak lensing methods were mature. Webb's update is deeper infrared selection of background sources and sharper morphological detail for cluster and source galaxies alike — more constraints for mass models, not a new physical principle.

## How to read sources

Quote intrinsic brightness only after publishing magnification uncertainties from lens models tied to weic2220 systems.

Quote intrinsic luminosities only with magnification uncertainties from Abell 2744 mass models.

weic2220 is the public deep look; lensing papers are where dark matter claims earn error bars.

Gravitational-lensing and dark-matter concept pages should frame weic2220 as geometry-based mass inference.

## Uncertainty to preserve

Do not quote an intrinsic star-formation rate for a lensed galaxy without publishing the magnification and its uncertainty. Multi-peak mass models can shift those numbers. Keep dark-matter claims tied to lensing geometry and multiwavelength consistency, not to the drama of a single arc.

Pandora's Cluster teaches lensing as measurement and microscope. Webb's infrared deep look (weic2220) supplies the sources; dark matter supplies most of the lens. Start from the official release, then demand redshifts and mass-model error bars before the wonder becomes a false precision.
Lens modeling is an inverse problem with degeneracies. Different mass distributions can reproduce similar image positions if constraints are sparse. Adding spectroscopic redshifts and multiple-image systems breaks degeneracies — which is why deep infrared imaging that finds more systems matters, and why quoting magnification without uncertainty is a red flag.

Merging clusters also test dark-matter collisionality. If dark matter interacted like gas, mass peaks might coincide with X-ray plasma differently during a collision. Pandora's Cluster's multi-clump history makes it informative and complicated: more leverage, more model freedom. Deep reading embraces that tension instead of forcing a one-slide moral.

Background source science is the other half. Magnified galaxies enable spectroscopy otherwise impossible, but only after magnification is modeled. Intrinsic sizes and star-formation rates inherit lens-model errors. Cosmic Gateway states that inheritance explicitly.

Primary source: ESA/Webb weic2220 for the public deep look. Then lensing and dark-matter concept pages. Then the research literature on Abell 2744 mass models. That order keeps wonder attached to method.

Systematic errors in photometric redshifts can misplace sources in the lens model and bias mass. Spectroscopy remains the gold standard for critical image systems.

Deep closure: weic2220 for the public image; lens models for mass; dark-matter interpretations only after baryonic tracers are compared honestly.

Gravitational lensing is both tool and measurement — dark matter maps inherit photometric redshift systematics unless spectra anchor arcs.

Magnification is model output—beauty of arcs does not replace redshift confirmation for sources.

Dark matter interpretations should compare lensing, X-ray, and galaxy kinematics tracers honestly.

Lensed source science inherits magnification uncertainties even when arcs are photogenic in weic2220.

Ask students what evidence would falsify a proposed dark matter peak in Abell 2744 given only weic2220 imaging versus full lens-model constraints. Gravitational lensing literacy means treating arcs as constraints, not as decorative proof of invisible matter by themselves.

Dark matter maps from weic2220 arcs inherit lens-model assumptions learners should inspect in primary papers.

Quote intrinsic luminosities for lensed galaxies only with magnification and its uncertainty attached. Pandora's Cluster teaches gravitational lensing as messy optics and dark matter as the dominant mass that X-ray gas does not fully trace. Spectroscopic redshifts for critical multiple-image systems remain the gold standard. Official release provenance and peer-reviewed follow-up remain co-equal parts of a Cosmic Gateway deep reading for this target.`,
      whatHappenedMarkdown:
        "Webb imaged Pandora's Cluster in the infrared, revealing lensed background galaxies and structures in this complex merging cluster.",
      whyItMattersMarkdown:
        "Gravitational lensing magnifies distant galaxies and maps dark matter in one of the messiest, most informative nearby clusters.",
      howMeasuredMarkdown:
        "Deep infrared imaging finds arcs and multiple images; lens models plus redshifts convert distortions into mass maps and source properties.",
      priorUnderstandingMarkdown:
        "Abell 2744 was already a Frontier Fields lensing target with rich X-ray and optical data; Webb deepens the infrared source census.",
      uncertaintyMarkdown:
        "Mass models for a multi-peak merging cluster are complex; magnifications for individual sources carry significant systematic uncertainty.",
      changeSummary: "Expansion-batch seed: Pandora's Cluster lensed galaxies.",
      auditMessage:
        "Seed published from ESA/Webb official release (weic2220).",
    },
    {
      slug: "ring-nebula-webb",
      title: "Webb's Detailed Beauty of the Ring Nebula",
      subtitle:
        "A nearby planetary nebula resolved into shells, filaments, and molecular structure.",
      dek: "Webb revisits the Ring Nebula (M57) in infrared light, revealing intricate shells from a sun-like star's final mass loss.",
      evidenceStatus: "official_release",
      difficulty: "beginner",
      publishedAt: new Date("2026-07-06T16:00:00.000Z"),
      firstSourceDate: new Date("2023-08-21T00:00:00.000Z"),
      topicId: ctx.topics.stars,
      image: {
        sourceUrl:
          "https://cdn.esawebb.org/archives/images/screen/weic2320a.jpg",
        altText:
          "James Webb Space Telescope infrared image of the Ring Nebula showing detailed shells and filaments",
        caption:
          "Webb infrared portrait of the Ring Nebula (M57), an archetypal planetary nebula about 2,500 light-years away.",
        ...webbImageRights,
        verificationNotes:
          "Seed asset: ESA Webb screen-resolution Ring Nebula (weic2320a).",
      },
      sources: [
        {
          sourceType: "official_release",
          organization: "ESA / Webb",
          title: "Webb captures detailed beauty of the Ring Nebula",
          canonicalUrl: "https://esawebb.org/news/weic2320/",
          externalId: "weic2320",
          publicationDate: new Date("2023-08-21T00:00:00.000Z"),
        },
      ],
      conceptIds: conceptIds(ctx.concepts, [
        "planetary-nebula",
        "infrared-astronomy",
      ]),
      lessonIds: infraredLesson,
      summaryMarkdown: `The Ring Nebula (M57, NGC 6720) is a nearby planetary nebula — the glowing shed envelope of a sun-like star that has exhausted the fuel for stable hydrogen burning in its core and cast off outer layers. Despite the name, planetary nebulae have nothing to do with planets; the historical term stuck.

Webb's infrared images show nested shells, filaments, and molecular material with unprecedented clarity for this classic object, roughly 2,500 light-years away. The familiar optical ring becomes a richer, multi-layered structure.

**Takeaway:** dying sun-like stars sculpt intricate nebulae, and infrared light reveals molecules and dust optical views underplay.

**Uncertainty:** exact three-dimensional geometry and the role of a possible binary companion remain active topics.`,

      articleMarkdown: `## Context

The word "planetary" is a historical accident from telescopic appearance. Physically, these are ionized ejecta around hot post-AGB stars on their way to becoming white dwarfs. The Ring Nebula is close and bright enough to resolve fine structure, making it a calibration object for nebular physics and a teaching object for stellar evolution endpoints.

Planetary nebulae are short-lived recycling stages; M57 at ~2,500 light-years is the heritage optical icon updated by weic2320 infrared shells.

M57 at ~2,500 light-years is the classic planetary nebula updated by weic2320 infrared shells.

Despite the name, planetary nebulae are ionized ejecta from dying sun-like stars, not planets.

M57's popularity makes weic2320 a gateway to planetary-nebula physics for audiences who already know the optical ring.

The Ring Nebula in weic2320 updates a familiar optical icon with infrared stratification: ionized inner zones, dust continuum, and cooler molecular material that together tell a richer mass-loss story for this planetary nebula. Learners should dispel the historical planet misnomer while embracing class membership—sun-like stars shed envelopes and often briefly illuminate planetary nebulae before white dwarf cooling dominates. True three-dimensional geometry remains uncertain; barrel or bipolar shells viewed nearly pole-on can reproduce ring-like silhouettes without being simple hollow spheres. Infrared astronomy reveals molecules and dust optical images understate, which is why M57 remains pedagogically valuable at ~2,500 light-years. weic2320 is one snapshot in a short evolutionary phase; expansion velocities from spectra still anchor physical scales better than morphology alone.

## Methods and evidence

Infrared astronomy reveals molecules (such as H2 in many planetary nebulae) and cool dust that optical emission-line images miss. Nested shells can mark pulsed mass loss. Filaments may trace instabilities or shaping by winds and magnetic fields. Webb's filters help separate those components in M57.

Rights: ESA/Webb weic2320; credit NASA, ESA, CSA, STScI.

Infrared filters in weic2320 separate ionized gas, dust continuum, and molecular zones in this planetary nebula.

Infrared filters separate ionized gas, dust continuum, and cooler molecular zones in the Ring Nebula.

Optical Hubble comparisons remain valuable when teaching stratification in planetary nebula physics.

Molecular hydrogen and dust features in weic2320 highlight cooler material outside the bright ionized ring.

## Competing interpretations / open questions

Barrel versus bipolar geometry viewed nearly pole-on remains an open 3D model question for the Ring Nebula.

Barrel versus bipolar geometry viewed nearly pole-on remains debated without full 3D kinematics.

Binary shaping hypotheses need stellar companions or kinematics, not asymmetry alone in M57 images.

Filamentary substructure may trace instabilities in the ejected shell rather than companion-driven shaping alone.

## Prior understanding

Centuries of observation and modern Hubble imaging already made the Ring iconic, while ground-based infrared and millimeter data found molecules. Planetary nebulae were already understood as ionized ejecta around hot post-AGB stars, despite the misleading historical name. Webb sharpens infrared shell hierarchy and clumpiness so ionization stratification and molecular zones become clearer for pedagogy and follow-up spectroscopy.

## How to read sources

Compare weic2320 to optical frames and demand kinematic models before locking a 3D cartoon of M57.

weic2320 opens the infrared chapter; expansion velocities from spectra finish physical scale estimates.

Abundance claims require emission-line analyses beyond imaging alone in planetary nebulae.

Planetary-nebula concept material should accompany weic2320 to dispel the historical planet naming confusion.

Spectroscopic expansion velocities still anchor physical timelines for M57 beyond weic2320 morphology alone.

## Uncertainty to preserve

Projection is the eternal trap: rings can be tubes. Binary shaping hypotheses need stellar companions or kinematic signatures, not only pretty asymmetry. Keep planetary-nebula and infrared-astronomy concepts linked so readers ask what is ionized, what is molecular, and what is merely line-of-sight pileup.

The Ring Nebula is a familiar doorway into stellar death and recycling. Webb's infrared detail (weic2320) upgrades familiarity into structure. Read the official release, then demand kinematics before locking a 3D cartoon.
Photoionization stratified nebulae are natural laboratories for atomic processes. Inner zones show higher ionization; outer shells can remain neutral or molecular if shielded. Infrared H2 and dust features often live in those shielded clumps. Webb's contribution is resolving that stratification morphologically in a public-favorite target.

Binary shaping hypotheses deserve fair treatment. Many planetary nebulae show bipolarity suggestive of companion influence or rotating outflows. The Ring's appearance can be reconciled with a barrel-like geometry seen nearly pole-on. Proving a companion requires stellar data, not only nebular fashion sense.

Deep pedagogy also corrects the Sun-future shorthand carefully. The Sun will not produce an identical Ring Nebula; mass, metallicity, and possible planets/companions differ. The useful claim is class membership: sun-like stars shed envelopes and leave white dwarfs, often lighting planetary nebulae for a cosmic blink.

weic2320 is the infrared public chapter. Optical Hubble frames remain pedagogically valuable for comparison. Spectra remain mandatory for expansion ages. Cosmic Gateway keeps all three in view so the Ring stays a physics object rather than only heritage branding.

Abundance studies in planetary nebulae constrain dredge-up and mixing in late stellar evolution. Imaging alone cannot replace emission-line abundance work, but morphology identifies which zones to extract spectra from.

End with weic2320, optical comparison frames, and kinematic 3D models as the triad that turns heritage beauty into measured astrophysics.

The Sun will not clone M57 exactly — class membership in planetary nebulae is the durable claim, not identical morphology.

The Sun will not clone M57 exactly—class membership in planetary nebulae is the durable claim.

Infrared astronomy reveals molecular and dusty layers optical rings understate around M57.

Infrared shells in planetary nebulae evolve as the central star fades, so weic2320 is one evolutionary snapshot.

Have learners compare weic2320 infrared shells with classic optical Ring Nebula photos to list which structures appear in both bandpasses and which appear in only one. Planetary nebula evolution continues after a single epoch image, so timelines require spectroscopic expansion data.

Correct the historical name gently: a planetary nebula is not a planet. Webb's infrared shells upgrade a heritage silhouette into stratified ionization and molecular physics that still need expansion velocities before any 3D cartoon locks. Optical Hubble frames remain valuable comparison tools beside weic2320. Official release provenance and peer-reviewed follow-up remain co-equal parts of a Cosmic Gateway deep reading for this target.`,
      whatHappenedMarkdown:
        "Webb imaged the Ring Nebula in infrared light, resolving intricate shells, filaments, and cooler material in this classic planetary nebula.",
      whyItMattersMarkdown:
        "Planetary nebulae show how sun-like stars recycle material; infrared light reveals molecular and dusty layers optical rings understate.",
      howMeasuredMarkdown:
        "Multi-filter infrared imaging maps ionized, dusty, and molecular structures; spectra supply expansion velocities for physical scales.",
      priorUnderstandingMarkdown:
        "M57 was already iconic optically and studied in the infrared from the ground; Webb adds sharper infrared morphology.",
      uncertaintyMarkdown:
        "True 3D geometry and possible binary shaping remain debated without complete kinematic models.",
      changeSummary: "Expansion-batch seed: Ring Nebula Webb.",
      auditMessage:
        "Seed published from ESA/Webb official release (weic2320).",
    },
    {
      slug: "dart-asteroid-impact",
      title: "Webb and Hubble Capture the DART Asteroid Impact",
      subtitle:
        "Infrared and optical views of humanity's first kinetic asteroid deflection test.",
      dek: "Webb and Hubble observed NASA's DART spacecraft slam into Dimorphos, tracking debris and the plume from the first planetary-defense impact test.",
      evidenceStatus: "confirmed",
      difficulty: "beginner",
      publishedAt: new Date("2026-07-08T16:00:00.000Z"),
      firstSourceDate: new Date("2022-09-29T00:00:00.000Z"),
      topicId: ctx.topics.solarSystem,
      image: {
        sourceUrl:
          "https://cdn.esawebb.org/archives/images/screen/weic2215a.jpg",
        altText:
          "James Webb Space Telescope infrared image of the DART impact ejecta around asteroid Dimorphos",
        caption:
          "Webb infrared observations of the Didymos–Dimorphos system after NASA's DART kinetic impact.",
        ...webbImageRights,
        verificationNotes:
          "Seed asset: ESA Webb screen-resolution DART impact (weic2215a).",
      },
      sources: [
        {
          sourceType: "official_release",
          organization: "ESA / Webb",
          title:
            "Webb and Hubble Capture Detailed Views of DART Impact",
          canonicalUrl: "https://esawebb.org/news/weic2215/",
          externalId: "weic2215",
          publicationDate: new Date("2022-09-29T00:00:00.000Z"),
        },
      ],
      conceptIds: conceptIds(ctx.concepts, [
        "asteroid",
        "infrared-astronomy",
      ]),
      summaryMarkdown: `On 26 September 2022, NASA's Double Asteroid Redirection Test (DART) spacecraft intentionally collided with Dimorphos, the small moon of asteroid Didymos. It was the first kinetic-impact planetary-defense test: change an asteroid's orbit by hitting it, then measure the result.

Webb and Hubble observed the aftermath, capturing ejecta and plume evolution. It was also an early joint use of both great observatories on the same celestial target. Infrared data help characterize dust and debris that optical images alone may undercount.

**Takeaway:** asteroid deflection is now an experimentally tested technique, and multiwavelength astronomy measured the debris in real time.

**Uncertainty:** detailed ejecta mass and momentum enhancement (the "beta" factor) require careful modeling beyond a single image.`,

      articleMarkdown: `## Context

DART was not a movie premise; it was a controlled experiment on a binary asteroid chosen so that a period change could be measured from Earth. Didymos–Dimorphos offered a clear dynamical clock. Success meant a statistically robust change in orbital period, not merely a pretty plume.

DART on 26 September 2022 made kinetic asteroid deflection an empirical experiment with a binary orbital clock — imaged in weic2215.

DART impacted Dimorphos on 26 September 2022—the first kinetic asteroid deflection experiment with a binary clock.

weic2215 captures Webb and Hubble views of ejecta from the confirmed planetary-defense test.

Planetary defense now includes an empirical anchor: DART changed Dimorphos's orbit while weic2215 documented ejecta.

The DART impact on Dimorphos, documented in part through weic2215, moved planetary defense from simulation-only to measured orbital change plus multi-observatory debris tracking on 26 September 2022. Learners must hold two results together: ejecta were observed in infrared and optical light, and the binary period changed by an amount consistent with mission success metrics. Plume images are scientifically rich but are not themselves the deflection proof without the dynamical clock provided by Didymos–Dimorphos timing. Infrared astronomy constrains dust in the ejecta; asteroid material diversity means Dimorphos is a calibrated case, not a universal impact template. weic2215 complements NASA mission papers that publish momentum enhancement and period-change analyses with error bars.

## Methods and evidence

Ejecta include a range of particle sizes. Optical telescopes see sunlight scattered by dust; infrared telescopes see thermal emission and can constrain particle populations differently. Using Webb and Hubble together on DART demonstrated coordinated great-observatory planetary science.

Primary public source for this seed: ESA/Webb weic2215. Evidence status is confirmed for the impact occurrence and for the demonstrated orbital change reported by the mission; fine dust microphysics remains research-grade.

Webb infrared plus Hubble optical sampled complementary dust regimes in the Dimorphos ejecta plume after impact.

Infrared and optical imaging tracked plume evolution while ground timing measured orbital period change.

LICIACube flyby data add separate close context from the great-observatory campaign in weic2215.

Infrared photometry of the plume in weic2215 constrains dust temperature and opacity evolution after impact.

## Competing interpretations / open questions

A larger beta (momentum enhancement) means ejecta did useful work beyond the spacecraft's own momentum. That is good for deflection efficiency but depends on material strength, porosity, and impact geometry — properties that vary among asteroids. DART is a calibrated point, not a universal constant for all threats.

Rubble-pile versus monolithic structure models predict different cratering and beta factors for the same weic2215 plume morphology.

Rubble-pile versus monolithic models predict different cratering and momentum enhancement factors.

Long-term ejecta evolution and secondary impacts on Didymos remain active post-impact research topics.

Ejecta curtains may include boulders whose optical and infrared signatures decouple over time.

## Prior understanding

Before September 2022, kinetic impactors were an engineered mitigation concept supported by simulations and lab-scale experiments. Binary asteroids were prized because mutual orbits provide measurable clocks. DART's confirmed impact and period change moved planetary defense from simulation-heavy planning into empirical calibration for one rubble-pile moonlet — a prior-to-posterior shift Cosmic Gateway keeps distinct from claiming universal beta factors for every asteroid.

## How to read sources

Hold weic2215 imaging alongside NASA mission papers for period change — plume beauty is not the deflection proof alone.

Hold weic2215 imaging alongside NASA mission papers for the dynamical success metric together.

Plume images are compelling but not themselves proof of deflection without the orbital clock.

weic2215 is the astronomy release; mission documentation carries the confirmed deflection metric for educators.

Pair weic2215 with asteroid and infrared-astronomy concepts when teaching kinetic deflection observables.

## Uncertainty to preserve

Do not generalize Dimorphos to every near-Earth object. Rubble piles, metal-rich bodies, and different sizes will respond differently. Keep asteroid and infrared-astronomy concepts linked so readers separate dynamical success from incomplete microphysical knowledge.

DART made asteroid deflection empirical. Webb's infrared chapter (weic2215), with Hubble, documented the debris while mission teams measured the orbit change. Start from the official release, celebrate the confirmed test, and keep beta and target diversity as open engineering questions.
Impact experiments on asteroids couple hypervelocity physics to solar-system geology. Strengthless rubble-pile models predict different cratering and ejecta than monolithic rock. Dimorphos's response constrains which family of models fits this particular moonlet. Extrapolation to hazardous asteroids needs a catalog of material types — hence follow-on missions and meteorite analogies.

Observatory coordination is itself a Deep lesson. Webb and Hubble had to be scheduled around a known impact time, demonstrating planetary astronomy as campaign science. Infrared and optical together sample complementary dust regimes. That campaign mindset transfers to cometary outbursts and other time-domain solar-system events.

Confirmed evidence status covers the occurrence of impact and the measured orbital change at the level reported by the mission. Dust microphysics, boulder distribution, and long-term ejecta evolution continue. Cosmic Gateway uses confirmed for the engineering-astronomy headline while leaving microphysical open questions visible.

Return to sources: ESA/Webb weic2215 for the joint observatory imaging narrative; NASA DART mission releases and papers for period-change results. Readers should hold both. Planetary defense communication fails when either the pretty plume or the dynamical metric is omitted.

Secondary impacts of ejecta on Didymos and long-term reaccumulation physics remain research topics after the headline success. Time-domain monitoring continues the experiment beyond impact night.

Deep closure pairs weic2215 with mission period-change papers and a clear statement of confirmed impact plus open microphysical questions.

Confirmed impact does not mean every asteroid responds like Dimorphos; infrared astronomy constrains dust, not universal beta.

Beta depends on backward ejecta momentum; Dimorphos interior structure was unknown before impact.

Infrared astronomy constrains dust in the plume; asteroid material diversity limits generalization.

Asteroid heterogeneity means weic2215 plume morphology is a case study, not a universal impact template.

Discuss why Didymos–Dimorphos was chosen for a measurable orbital clock and how that choice differs from deflection tests on a single asteroid without a binary companion. weic2215 plume evolution informs ejecta models that feed momentum enhancement estimates in mission papers.

Celebrate the confirmed orbital change without generalizing Dimorphos to every near-Earth asteroid. Infrared astronomy helped characterize ejecta; mission timing papers carry the deflection metric that plume beauty cannot replace.`,
      whatHappenedMarkdown:
        "Webb and Hubble imaged the aftermath of NASA's DART kinetic impact on Dimorphos, capturing ejecta from the first asteroid deflection test.",
      whyItMattersMarkdown:
        "It demonstrated that a spacecraft impact can change an asteroid moon's orbit — a foundational planetary-defense experiment.",
      howMeasuredMarkdown:
        "Infrared and optical imaging tracked ejecta; ground-based timing of the Didymos–Dimorphos orbit measured the period change.",
      priorUnderstandingMarkdown:
        "Kinetic impact deflection was modeled extensively; DART provided the first full-scale space demonstration on a real binary asteroid.",
      uncertaintyMarkdown:
        "Ejecta mass, momentum enhancement, and how other asteroid types would respond remain actively modeled.",
      changeSummary: "Expansion-batch seed: DART asteroid impact.",
      auditMessage:
        "Seed published from ESA/Webb official release (weic2215); DART impact confirmed by mission measurements.",
    },
    {
      slug: "sagittarius-c-galactic-center",
      title: "Webb's Infrared View of Sagittarius C",
      subtitle:
        "A star-forming complex near the Milky Way's center, revealed through dust.",
      dek: "Webb resolves Sagittarius C near the Galactic Center, exposing star formation, luminous gas features, and structure in an extreme environment.",
      evidenceStatus: "official_release",
      difficulty: "intermediate",
      publishedAt: new Date("2026-07-10T16:00:00.000Z"),
      firstSourceDate: new Date("2023-11-20T00:00:00.000Z"),
      topicId: ctx.topics.jwst,
      image: {
        sourceUrl:
          "https://cdn.esawebb.org/archives/images/screen/weic2328a.jpg",
        altText:
          "James Webb Space Telescope infrared image of the Sagittarius C star-forming region near the Galactic Center",
        caption:
          "Webb infrared portrait of Sagittarius C, a star-forming region in the Milky Way's central molecular zone.",
        ...webbImageRights,
        verificationNotes:
          "Seed asset: ESA Webb screen-resolution Sagittarius C (weic2328a).",
      },
      sources: [
        {
          sourceType: "official_release",
          organization: "ESA / Webb",
          title:
            "Webb explores the Galactic Center's Sagittarius C region",
          canonicalUrl: "https://esawebb.org/news/weic2328/",
          externalId: "weic2328",
          publicationDate: new Date("2023-11-20T00:00:00.000Z"),
        },
      ],
      conceptIds: conceptIds(ctx.concepts, [
        "star-formation",
        "infrared-astronomy",
      ]),
      lessonIds: infraredLesson,
      summaryMarkdown: `Sagittarius C sits in the Milky Way's Central Molecular Zone, near the Galactic Center — one of the most extreme star-forming environments in the Galaxy. Densities, temperatures, turbulence, and tidal forces differ from quiet disk clouds like Taurus.

Webb's infrared image pierces much of the intervening dust that blocks optical views toward the center, revealing young stars, luminous gas features, and intricate structure in Sagittarius C. The Galactic Center stops being an X-ray/radio-only story and becomes an infrared landscape of ongoing birth.

**Takeaway:** stars form even in extreme galactic centers, and infrared astronomy is how we see those nurseries through the dust.

**Uncertainty:** membership of individual young stars and the energy sources of every bright filament still need spectroscopic confirmation.`,

      articleMarkdown: `## Context

Most public star-formation images come from relatively nearby disk clouds. The Galactic Center is another regime: higher average densities, stronger shear, pervasive turbulence, and a supermassive black hole environment nearby (though Sagittarius C is not the black hole itself). Teaching that distinction prevents readers from assuming all nurseries behave like the Pillars of Creation.

Sagittarius C sits in the Central Molecular Zone where turbulence and extinction differ from disk clouds — mapped in weic2328 November 2023.

Sagittarius C sits in the Central Molecular Zone where turbulence and extinction exceed disk-cloud norms.

weic2328 from November 2023 reveals star formation through dust that blocks most optical light.

The Galactic Center is extreme compared with nearby disk clouds, and Sagittarius C samples that regime in weic2328.

Sagittarius C in weic2328 samples star formation in the Central Molecular Zone, where extinction and turbulence differ sharply from nearby disk clouds like those in Taurus tutorials. Learners should not conflate this complex with Sagittarius A* unless a claim explicitly ties filaments or stars to the central black hole accretion flow—they are adjacent Galactic Center stories, not identical objects. Infrared astronomy is mandatory along this line of sight; optical telescopes are largely blind, so NIRCam maps are discovery tools rather than optional extras. Crowding and line-of-sight confusion demand spectroscopic membership before counting young stellar objects toward the CMZ. weic2328 opens the near-infrared landscape; radio and submillimeter maps still contextualize the dense gas fuel that feeds star formation in this extreme region.

## Methods and evidence

Infrared astronomy is mandatory here. Extinction in the optical is enormous; near-infrared windows make stellar censuses possible. Filter combinations constrain reddening. Still, infrared alone does not yield perfect distances — kinematic and spectroscopic methods remain essential.

ESA/Webb weic2328 is the primary public source for this seed image and narrative. Credit: NASA, ESA, CSA, STScI.

Near-infrared windows through dust make stellar censuses possible in weic2328 where optical telescopes are largely blind.

NIRCam multi-filter imaging maps stars and nebulosity where extinction maps vary across the field.

Radio and submillimeter data show dense gas fuel near this Galactic Center star-forming complex.

Near-infrared imaging in weic2328 complements radio maps that trace dense gas unavailable to optical telescopes.

## Competing interpretations / open questions

Bright filaments may trace surfaces rather than volume-filling star factories until spectroscopy identifies power sources.

Bright filaments may trace illuminated surfaces rather than volume-filling factories without spectroscopy.

Cosmic rays and magnetic fields may alter chemistry and collapse thresholds in the CMZ environment.

Some nebulous features may be externally illuminated rather than internally powered by embedded massive stars.

## Prior understanding

Radio, submillimeter, and earlier infrared surveys already mapped Sagittarius C's dense gas and some young stellar content within the Central Molecular Zone. Extreme extinction already forced infrared strategies. Webb's advance is high-resolution near-infrared imaging that resolves structure and candidate young stars with JWST clarity for teaching and for designing contamination-aware membership catalogs. Central-zone star formation was known; the landscape is newly legible.

## How to read sources

weic2328 is not Sagittarius A* science — keep the star-forming complex distinct from the central black hole accretion story.

Keep Sagittarius C distinct from Sagittarius A* unless a claim explicitly ties them.

Membership filters and spectra should follow weic2328 before counting CMZ young stellar objects.

Star-formation and infrared-astronomy concepts should frame weic2328 as a crowded, high-extinction use case.

## Uncertainty to preserve

Crowding and extinction create false friends: background and foreground interlopers abound. Bright nebulous shapes can be illuminated surfaces rather than volume-filling star factories. Keep star-formation and infrared-astronomy concepts paired, and keep Sgr A* science adjacent but distinct unless a claim explicitly connects them.

Sagittarius C shows star formation surviving in the Galaxy's extreme center. Webb's infrared window (weic2328) makes the nursery visible. Start from the official release, then demand spectra and careful membership cuts before counting every point source as a Central Molecular Zone newborn.
The Central Molecular Zone challenges simple star-formation thresholds. Dense gas is abundant, yet star-formation efficiency per dense-gas mass may differ from disk clouds. Magnetic fields, cosmic rays, and shear are candidate regulators. Infrared young-star censuses are how those hypotheses become empirical — if contamination is controlled.

Sagittarius C specifically offers luminous features whose power sources need identification: embedded massive stars, shocks, or other energetic input. Morphology suggests; spectroscopy decides. Deep reading treats bright arcs as questions.

Galactic Center science also sits next to black-hole science culturally. Cosmic Gateway should prevent automatic conflation. Sagittarius C is a star-forming complex in the central region; Sagittarius A* is the compact radio source associated with the supermassive black hole. Both are "galactic center" stories; they are not the same object. Precision here builds trust.

Official release weic2328 opens the infrared landscape. Radio and submillimeter maps supply the cold fuel. Spectroscopic campaigns supply membership. That three-step ladder is the Deep layer's lasting product for any future Central Molecular Zone image release.

Cosmic-ray ionization and strong magnetic fields may alter chemistry and collapse thresholds in the Central Molecular Zone. Infrared continuum imaging does not measure those directly; specialized tracers do. Deep readers should know which claim needs which tracer.

Close with weic2328 as the window, radio/submillimeter maps as the fuel layer, and spectroscopy as the membership filter — the only honest way to count star formation toward the Galactic Center.

Star formation toward the Galactic Center requires membership filters; infrared astronomy opens the window, spectra count the YSOs.

Line-of-sight confusion mixes distances along crowded sightlines toward the Galactic Center.

Infrared astronomy opens the window; spectra count members and identify energizing sources in filaments.

Without spectra, luminous filaments in weic2328 remain ambiguous between shocks, H II regions, and dust surfaces.

Compare Sagittarius C in weic2328 to a nearby disk cloud tutorial case and list which star-formation diagnostics transfer and which do not under CMZ extinction and shear. Infrared point-source catalogs here are discovery lists until spectroscopy confirms young stellar object membership.

Separate Sagittarius C star formation from Sagittarius A* black-hole lore unless a claim explicitly links them. Crowding and extinction make membership cuts mandatory; infrared astronomy opens the window, spectroscopy decides who lives in the Central Molecular Zone.`,
      whatHappenedMarkdown:
        "Webb imaged Sagittarius C near the Galactic Center in the near-infrared, revealing star formation and structure through heavy dust extinction.",
      whyItMattersMarkdown:
        "It shows how stars form in the extreme Central Molecular Zone and why infrared light is required to study our Galaxy's center.",
      howMeasuredMarkdown:
        "Multi-filter near-infrared imaging maps stars and nebulosity; radio/submillimeter data contextualize dense gas fuel.",
      priorUnderstandingMarkdown:
        "Sagittarius C was known from radio and earlier infrared surveys; optical light is largely blocked by intervening dust.",
      uncertaintyMarkdown:
        "Severe crowding and extinction complicate membership; energetic drivers of individual filaments need spectroscopy.",
      changeSummary: "Expansion-batch seed: Sagittarius C galactic center.",
      auditMessage:
        "Seed published from ESA/Webb official release (weic2328).",
    },
  ];
}

/**
 * Seeds the 11 expansion-batch published discoveries.
 * @returns Seeded discovery slugs, in creation order.
 */
export async function seedExpansionBatch(
  prisma: PrismaClient,
  ctx: ExpansionBatchContext,
): Promise<string[]> {
  const discoveries = buildDiscoveries(ctx);
  const slugs: string[] = [];

  for (const input of discoveries) {
    const discovery = await publishSeedDiscovery(prisma, input);
    console.log(discovery.slug);
    slugs.push(discovery.slug);
  }

  return slugs;
}
