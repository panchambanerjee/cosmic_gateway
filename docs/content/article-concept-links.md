# Article ↔ concept / lesson link inventory

Living tracker of **what each discovery hyperlinks to** in Cosmic Gateway.

**How linking works today**

| Link type | Where it appears | Target |
|-----------|------------------|--------|
| Learning-term chips | Discovery page | In-app `/concepts/[slug]` |
| In-body auto-links | Quick / Learn / Deep text when a linked concept **name** appears | Same `/concepts/[slug]` |
| Concept “Go deeper” | Concept page | `wikipediaUrl` and/or `externalUrl` on the concept |
| Lessons | Discovery page (when attached) | In-app `/lessons/[slug]` |
| Sources | Discovery page | Primary papers / facility releases (not concepts) |

Only concepts **attached to that discovery** are auto-linked in its body. Attaching a concept both creates the chip and enables name-based hyperlinks in the markdown.

Every discovery entry below lists: in-app concept routes, attached lessons, and the full **Go deeper** Wikipedia / facility URLs those concepts expose.

Update this file whenever you add or retarget discovery↔concept / lesson links in seed or admin.

**Editorial depth (all discoveries):** Quick ~110–150 words · Learn ~580–700 · Deep ~1000–1200, with shared section structure (Learn: What happened / Why it matters / How measured / Prior understanding / Uncertainty; Deep: Context / Methods / Interpretations / Prior understanding / How to read sources / Uncertainty).

**Evidence-status rule:** Use `peer_reviewed` only when at least one linked source has `sourceType: paper` (journal or arXiv paper). Facility photo/science releases alone → `official_release`. Unsettled claims → `preliminary`. Independently demonstrated mission results may use `confirmed`.

| Evidence status | Discoveries |
|-----------------|-------------|
| `peer_reviewed` | Early galaxies · Betelgeuse companion · WASP-39b |
| `preliminary` | K2-18b |
| `confirmed` | DART asteroid impact |
| `official_release` | All other seeded discoveries (facility releases without a linked paper yet) |

**Related discoveries:** Articles can link to each other (bidirectional in the UI). Seeded clusters include star formation, stellar remnants, exoplanet atmospheres, black holes, galaxy interactions, cosmology/lensing, and solar-system pairs. See [Related discoveries](#related-discoveries) below.

Last updated: 2026-08-04 · **25 discoveries** · **28 concepts** · **3 lessons**

---

## Discoveries → linked subtopics

### Original seed (`seed.ts`)

#### 1. Early Galaxies Challenge Simple Growth Models
- **Slug:** `early-galaxies-challenge-simple-growth-models` → `/discoveries/early-galaxies-challenge-simple-growth-models`
- **In-app concepts:**
  - [Redshift](/concepts/redshift) (`redshift`)
  - [Spectroscopy](/concepts/spectroscopy) (`spectroscopy`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Redshift → [Wikipedia](https://en.wikipedia.org/wiki/Redshift) · [NASA Imagine spectra](https://imagine.gsfc.nasa.gov/science/toolbox/spectra1.html)
  - Spectroscopy → [Astronomical spectroscopy (Wikipedia)](https://en.wikipedia.org/wiki/Astronomical_spectroscopy)

#### 2. Clearest Image Yet of Betelgeuse's Elusive Companion
- **Slug:** `betelgeuse-companion-clearest-image-yet` → `/discoveries/betelgeuse-companion-clearest-image-yet`
- **In-app concepts:**
  - [Betelgeuse](/concepts/betelgeuse) (`betelgeuse`)
  - [Red supergiant](/concepts/red-supergiant) (`red-supergiant`)
  - [Binary star](/concepts/binary-star) (`binary-star`)
  - [Coronagraph](/concepts/coronagraph) (`coronagraph`)
- **Lessons:** —
- **Go deeper (via concepts):**
  - Betelgeuse → [Wikipedia](https://en.wikipedia.org/wiki/Betelgeuse) · [ESO eso2611](https://www.eso.org/public/news/eso2611/)
  - Red supergiant → [Wikipedia](https://en.wikipedia.org/wiki/Red_supergiant)
  - Binary star → [Wikipedia](https://en.wikipedia.org/wiki/Binary_star)
  - Coronagraph → [Wikipedia](https://en.wikipedia.org/wiki/Coronagraph) · [VLT/SPHERE](https://www.eso.org/public/teles-instr/paranal-observatory/vlt/vlt-instr/sphere/)

### Launch batch (`seed-launch-batch.ts`)

#### 3. Webb's Star-Filled Portrait of the Pillars of Creation
- **Slug:** `pillars-of-creation-webb` → `/discoveries/pillars-of-creation-webb`
- **In-app concepts:**
  - [Star formation](/concepts/star-formation) (`star-formation`)
  - [Infrared astronomy](/concepts/infrared-astronomy) (`infrared-astronomy`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Star formation → [Wikipedia](https://en.wikipedia.org/wiki/Star_formation)
  - Infrared astronomy → [Wikipedia](https://en.wikipedia.org/wiki/Infrared_astronomy)

#### 4. Webb's Cosmic Cliffs in the Carina Nebula
- **Slug:** `cosmic-cliffs-carina` → `/discoveries/cosmic-cliffs-carina`
- **In-app concepts:**
  - [Star formation](/concepts/star-formation) (`star-formation`)
  - [Infrared astronomy](/concepts/infrared-astronomy) (`infrared-astronomy`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Star formation → [Wikipedia](https://en.wikipedia.org/wiki/Star_formation)
  - Infrared astronomy → [Wikipedia](https://en.wikipedia.org/wiki/Infrared_astronomy)

#### 5. Webb Maps Cassiopeia A in Infrared Detail
- **Slug:** `cassiopeia-a-webb` → `/discoveries/cassiopeia-a-webb`
- **In-app concepts:**
  - [Supernova](/concepts/supernova) (`supernova`)
  - [Neutron star](/concepts/neutron-star) (`neutron-star`)
- **Lessons:** —
- **Go deeper (via concepts):**
  - Supernova → [Wikipedia](https://en.wikipedia.org/wiki/Supernova)
  - Neutron star → [Wikipedia](https://en.wikipedia.org/wiki/Neutron_star)

#### 6. Webb's Infrared View of the Crab Nebula
- **Slug:** `crab-nebula-webb` → `/discoveries/crab-nebula-webb`
- **In-app concepts:**
  - [Supernova](/concepts/supernova) (`supernova`)
  - [Pulsar](/concepts/pulsar) (`pulsar`)
- **Lessons:** —
- **Go deeper (via concepts):**
  - Supernova → [Wikipedia](https://en.wikipedia.org/wiki/Supernova)
  - Pulsar → [Wikipedia](https://en.wikipedia.org/wiki/Pulsar)

#### 7. Webb Reveals WASP-39b's Atmosphere in Unprecedented Detail
- **Slug:** `wasp-39b-atmosphere` → `/discoveries/wasp-39b-atmosphere`
- **In-app concepts:**
  - [Exoplanet](/concepts/exoplanet) (`exoplanet`)
  - [Transit spectroscopy](/concepts/transit-spectroscopy) (`transit-spectroscopy`)
- **Lessons:** [How Transit Spectra Reveal Atmospheres](/lessons/how-transit-spectra-reveal-atmospheres)
- **Go deeper (via concepts):**
  - Exoplanet → [Wikipedia](https://en.wikipedia.org/wiki/Exoplanet)
  - Transit spectroscopy → [Astronomical spectroscopy § Exoplanets (Wikipedia)](https://en.wikipedia.org/wiki/Astronomical_spectroscopy#Exoplanets)

#### 8. K2-18b: Intriguing Atmospheric Signals, Unsettled Claims
- **Slug:** `k2-18b-atmosphere-signals` → `/discoveries/k2-18b-atmosphere-signals`
- **In-app concepts:**
  - [Exoplanet](/concepts/exoplanet) (`exoplanet`)
  - [Transit spectroscopy](/concepts/transit-spectroscopy) (`transit-spectroscopy`)
- **Lessons:** [How Transit Spectra Reveal Atmospheres](/lessons/how-transit-spectra-reveal-atmospheres)
- **Go deeper (via concepts):**
  - Exoplanet → [Wikipedia](https://en.wikipedia.org/wiki/Exoplanet)
  - Transit spectroscopy → [Astronomical spectroscopy § Exoplanets (Wikipedia)](https://en.wikipedia.org/wiki/Astronomical_spectroscopy#Exoplanets)

#### 9. First Image of Sagittarius A*, the Milky Way's Black Hole
- **Slug:** `sagittarius-a-star-image` → `/discoveries/sagittarius-a-star-image`
- **In-app concepts:**
  - [Black hole](/concepts/black-hole) (`black-hole`)
  - [Event horizon](/concepts/event-horizon) (`event-horizon`)
- **Lessons:** [What a Black Hole Shadow Means](/lessons/what-a-black-hole-shadow-means)
- **Go deeper (via concepts):**
  - Black hole → [Wikipedia](https://en.wikipedia.org/wiki/Black_hole)
  - Event horizon → [Wikipedia](https://en.wikipedia.org/wiki/Event_horizon)

#### 10. First Image of a Black Hole: M87*
- **Slug:** `m87-black-hole-first-image` → `/discoveries/m87-black-hole-first-image`
- **In-app concepts:**
  - [Black hole](/concepts/black-hole) (`black-hole`)
  - [Event horizon](/concepts/event-horizon) (`event-horizon`)
- **Lessons:** [What a Black Hole Shadow Means](/lessons/what-a-black-hole-shadow-means)
- **Go deeper (via concepts):**
  - Black hole → [Wikipedia](https://en.wikipedia.org/wiki/Black_hole)
  - Event horizon → [Wikipedia](https://en.wikipedia.org/wiki/Event_horizon)

#### 11. GW170817: A Neutron Star Merger Seen in Waves and Light
- **Slug:** `neutron-star-merger-gw170817` → `/discoveries/neutron-star-merger-gw170817`
- **In-app concepts:**
  - [Gravitational wave](/concepts/gravitational-wave) (`gravitational-wave`)
  - [Neutron star](/concepts/neutron-star) (`neutron-star`)
- **Lessons:** —
- **Go deeper (via concepts):**
  - Gravitational wave → [Wikipedia](https://en.wikipedia.org/wiki/Gravitational_wave)
  - Neutron star → [Wikipedia](https://en.wikipedia.org/wiki/Neutron_star)

#### 12. Webb's Close-Up of Neptune and Its Rings
- **Slug:** `webb-neptune-close-up` → `/discoveries/webb-neptune-close-up`
- **In-app concepts:**
  - [Ice giant](/concepts/ice-giant) (`ice-giant`)
- **Lessons:** —
- **Go deeper (via concepts):**
  - Ice giant → [Wikipedia](https://en.wikipedia.org/wiki/Ice_giant)

#### 13. Webb Tracks Water Ice Plumes from Enceladus
- **Slug:** `enceladus-webb-plume` → `/discoveries/enceladus-webb-plume`
- **In-app concepts:**
  - [Ocean world](/concepts/ocean-world) (`ocean-world`)
- **Lessons:** —
- **Go deeper (via concepts):**
  - Ocean world → [Wikipedia](https://en.wikipedia.org/wiki/Ocean_world)

#### 14. Euclid's View of the Perseus Cluster of Galaxies
- **Slug:** `euclid-perseus-cluster` → `/discoveries/euclid-perseus-cluster`
- **In-app concepts:**
  - [Dark matter](/concepts/dark-matter) (`dark-matter`)
  - [Dark energy](/concepts/dark-energy) (`dark-energy`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Dark matter → [Wikipedia](https://en.wikipedia.org/wiki/Dark_matter)
  - Dark energy → [Wikipedia](https://en.wikipedia.org/wiki/Dark_energy)

### Expansion batch (`seed-expansion-batch.ts`)

#### 15. Webb Finds a Dusty Cat's Tail in Beta Pictoris
- **Slug:** `beta-pictoris-debris-disk` → `/discoveries/beta-pictoris-debris-disk`
- **In-app concepts:**
  - [Debris disk](/concepts/debris-disk) (`debris-disk`)
  - [Infrared astronomy](/concepts/infrared-astronomy) (`infrared-astronomy`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Debris disk → [Wikipedia](https://en.wikipedia.org/wiki/Debris_disk)
  - Infrared astronomy → [Wikipedia](https://en.wikipedia.org/wiki/Infrared_astronomy)

#### 16. Webb's Detailed Portrait of Herbig-Haro 46/47
- **Slug:** `hh-46-47-protostellar-jets` → `/discoveries/hh-46-47-protostellar-jets`
- **In-app concepts:**
  - [Star formation](/concepts/star-formation) (`star-formation`)
  - [Herbig–Haro object](/concepts/herbig-haro) (`herbig-haro`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Star formation → [Wikipedia](https://en.wikipedia.org/wiki/Star_formation)
  - Herbig–Haro object → [Wikipedia](https://en.wikipedia.org/wiki/Herbig%E2%80%93Haro_object)

#### 17. Webb's Portrait of Stephan's Quintet
- **Slug:** `stephans-quintet-interactions` → `/discoveries/stephans-quintet-interactions`
- **In-app concepts:**
  - [Galaxy merger](/concepts/galaxy-merger) (`galaxy-merger`)
  - [Infrared astronomy](/concepts/infrared-astronomy) (`infrared-astronomy`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Galaxy merger → [Wikipedia](https://en.wikipedia.org/wiki/Galaxy_merger)
  - Infrared astronomy → [Wikipedia](https://en.wikipedia.org/wiki/Infrared_astronomy)

#### 18. Webb Captures Wolf-Rayet 124's Winds and Dust
- **Slug:** `wolf-rayet-124-winds` → `/discoveries/wolf-rayet-124-winds`
- **In-app concepts:**
  - [Star formation](/concepts/star-formation) (`star-formation`)
  - [Infrared astronomy](/concepts/infrared-astronomy) (`infrared-astronomy`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Star formation → [Wikipedia](https://en.wikipedia.org/wiki/Star_formation)
  - Infrared astronomy → [Wikipedia](https://en.wikipedia.org/wiki/Infrared_astronomy)

#### 19. Webb's Infrared View of Starburst Galaxy M82
- **Slug:** `m82-starburst-galaxy` → `/discoveries/m82-starburst-galaxy`
- **In-app concepts:**
  - [Starburst galaxy](/concepts/starburst-galaxy) (`starburst-galaxy`)
  - [Infrared astronomy](/concepts/infrared-astronomy) (`infrared-astronomy`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Starburst galaxy → [Wikipedia](https://en.wikipedia.org/wiki/Starburst_galaxy)
  - Infrared astronomy → [Wikipedia](https://en.wikipedia.org/wiki/Infrared_astronomy)

#### 20. Webb Finds a Dense Cosmic Knot Around an Extremely Red Quasar
- **Slug:** `extremely-red-quasar-webb` → `/discoveries/extremely-red-quasar-webb`
- **In-app concepts:**
  - [Quasar](/concepts/quasar) (`quasar`)
  - [Black hole](/concepts/black-hole) (`black-hole`)
- **Lessons:** —
- **Go deeper (via concepts):**
  - Quasar → [Wikipedia](https://en.wikipedia.org/wiki/Quasar)
  - Black hole → [Wikipedia](https://en.wikipedia.org/wiki/Black_hole)

#### 21. Webb's New Look at the Cartwheel Galaxy
- **Slug:** `cartwheel-galaxy-collision` → `/discoveries/cartwheel-galaxy-collision`
- **In-app concepts:**
  - [Galaxy merger](/concepts/galaxy-merger) (`galaxy-merger`)
  - [Infrared astronomy](/concepts/infrared-astronomy) (`infrared-astronomy`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Galaxy merger → [Wikipedia](https://en.wikipedia.org/wiki/Galaxy_merger)
  - Infrared astronomy → [Wikipedia](https://en.wikipedia.org/wiki/Infrared_astronomy)

#### 22. Webb Peers Through Pandora's Cluster
- **Slug:** `pandoras-cluster-lensed-galaxies` → `/discoveries/pandoras-cluster-lensed-galaxies`
- **In-app concepts:**
  - [Gravitational lensing](/concepts/gravitational-lensing) (`gravitational-lensing`)
  - [Dark matter](/concepts/dark-matter) (`dark-matter`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Gravitational lensing → [Wikipedia](https://en.wikipedia.org/wiki/Gravitational_lens)
  - Dark matter → [Wikipedia](https://en.wikipedia.org/wiki/Dark_matter)

#### 23. Webb's Detailed Beauty of the Ring Nebula
- **Slug:** `ring-nebula-webb` → `/discoveries/ring-nebula-webb`
- **In-app concepts:**
  - [Planetary nebula](/concepts/planetary-nebula) (`planetary-nebula`)
  - [Infrared astronomy](/concepts/infrared-astronomy) (`infrared-astronomy`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Planetary nebula → [Wikipedia](https://en.wikipedia.org/wiki/Planetary_nebula)
  - Infrared astronomy → [Wikipedia](https://en.wikipedia.org/wiki/Infrared_astronomy)

#### 24. Webb and Hubble Capture the DART Asteroid Impact
- **Slug:** `dart-asteroid-impact` → `/discoveries/dart-asteroid-impact`
- **In-app concepts:**
  - [Asteroid](/concepts/asteroid) (`asteroid`)
  - [Infrared astronomy](/concepts/infrared-astronomy) (`infrared-astronomy`)
- **Lessons:** —
- **Go deeper (via concepts):**
  - Asteroid → [Wikipedia](https://en.wikipedia.org/wiki/Asteroid)
  - Infrared astronomy → [Wikipedia](https://en.wikipedia.org/wiki/Infrared_astronomy)

#### 25. Webb's Infrared View of Sagittarius C
- **Slug:** `sagittarius-c-galactic-center` → `/discoveries/sagittarius-c-galactic-center`
- **In-app concepts:**
  - [Star formation](/concepts/star-formation) (`star-formation`)
  - [Infrared astronomy](/concepts/infrared-astronomy) (`infrared-astronomy`)
- **Lessons:** [Why Infrared Sees the Early Universe](/lessons/why-infrared-sees-the-early-universe)
- **Go deeper (via concepts):**
  - Star formation → [Wikipedia](https://en.wikipedia.org/wiki/Star_formation)
  - Infrared astronomy → [Wikipedia](https://en.wikipedia.org/wiki/Infrared_astronomy)

---

## Related discoveries

Editorial links between articles (`discovery_relations`). The UI shows a **Related discoveries** section; links are treated as undirected for readers (A→B also appears on B).

| Cluster | Linked articles |
|---------|-----------------|
| Star formation | Pillars ↔ Cosmic Cliffs ↔ HH 46/47 ↔ Sagittarius C · HH 46/47 ↔ WR 124 |
| Stellar death | Cas A ↔ Crab ↔ Ring Nebula · Cas A ↔ GW170817 · Betelgeuse ↔ Crab / WR 124 |
| Exoplanets | WASP-39b ↔ K2-18b · Beta Pictoris ↔ WASP-39b |
| Black holes | Sgr A* ↔ M87* · Extremely red quasar ↔ Sgr A* / M87* |
| Galaxy interactions | Stephan’s Quintet ↔ Cartwheel ↔ M82 |
| Cosmology | Early galaxies ↔ Pandora’s Cluster ↔ Euclid Perseus |
| Solar system | Neptune ↔ Enceladus · DART ↔ Neptune |

---

## Concept catalog (Go deeper targets)

| Slug | Name | Wikipedia | Other external |
|------|------|-----------|----------------|
| `redshift` | Redshift | [wiki](https://en.wikipedia.org/wiki/Redshift) | [NASA Imagine](https://imagine.gsfc.nasa.gov/science/toolbox/spectra1.html) |
| `spectroscopy` | Spectroscopy | [wiki](https://en.wikipedia.org/wiki/Astronomical_spectroscopy) | — |
| `betelgeuse` | Betelgeuse | [wiki](https://en.wikipedia.org/wiki/Betelgeuse) | [ESO eso2611](https://www.eso.org/public/news/eso2611/) |
| `red-supergiant` | Red supergiant | [wiki](https://en.wikipedia.org/wiki/Red_supergiant) | — |
| `binary-star` | Binary star | [wiki](https://en.wikipedia.org/wiki/Binary_star) | — |
| `coronagraph` | Coronagraph | [wiki](https://en.wikipedia.org/wiki/Coronagraph) | [SPHERE](https://www.eso.org/public/teles-instr/paranal-observatory/vlt/vlt-instr/sphere/) |
| `star-formation` | Star formation | [wiki](https://en.wikipedia.org/wiki/Star_formation) | — |
| `infrared-astronomy` | Infrared astronomy | [wiki](https://en.wikipedia.org/wiki/Infrared_astronomy) | — |
| `supernova` | Supernova | [wiki](https://en.wikipedia.org/wiki/Supernova) | — |
| `neutron-star` | Neutron star | [wiki](https://en.wikipedia.org/wiki/Neutron_star) | — |
| `pulsar` | Pulsar | [wiki](https://en.wikipedia.org/wiki/Pulsar) | — |
| `exoplanet` | Exoplanet | [wiki](https://en.wikipedia.org/wiki/Exoplanet) | — |
| `transit-spectroscopy` | Transit spectroscopy | [wiki](https://en.wikipedia.org/wiki/Astronomical_spectroscopy#Exoplanets) | — |
| `black-hole` | Black hole | [wiki](https://en.wikipedia.org/wiki/Black_hole) | — |
| `event-horizon` | Event horizon | [wiki](https://en.wikipedia.org/wiki/Event_horizon) | — |
| `gravitational-wave` | Gravitational wave | [wiki](https://en.wikipedia.org/wiki/Gravitational_wave) | — |
| `ice-giant` | Ice giant | [wiki](https://en.wikipedia.org/wiki/Ice_giant) | — |
| `ocean-world` | Ocean world | [wiki](https://en.wikipedia.org/wiki/Ocean_world) | — |
| `dark-matter` | Dark matter | [wiki](https://en.wikipedia.org/wiki/Dark_matter) | — |
| `dark-energy` | Dark energy | [wiki](https://en.wikipedia.org/wiki/Dark_energy) | — |
| `debris-disk` | Debris disk | [wiki](https://en.wikipedia.org/wiki/Debris_disk) | — |
| `herbig-haro` | Herbig–Haro object | [wiki](https://en.wikipedia.org/wiki/Herbig%E2%80%93Haro_object) | — |
| `galaxy-merger` | Galaxy merger | [wiki](https://en.wikipedia.org/wiki/Galaxy_merger) | — |
| `starburst-galaxy` | Starburst galaxy | [wiki](https://en.wikipedia.org/wiki/Starburst_galaxy) | — |
| `quasar` | Quasar | [wiki](https://en.wikipedia.org/wiki/Quasar) | — |
| `gravitational-lensing` | Gravitational lensing | [wiki](https://en.wikipedia.org/wiki/Gravitational_lens) | — |
| `planetary-nebula` | Planetary nebula | [wiki](https://en.wikipedia.org/wiki/Planetary_nebula) | — |
| `asteroid` | Asteroid | [wiki](https://en.wikipedia.org/wiki/Asteroid) | — |

---

## Reverse index: concept → discoveries

| Concept | Linked from discoveries |
|---------|-------------------------|
| Redshift | Early galaxies |
| Spectroscopy | Early galaxies |
| Betelgeuse | Betelgeuse companion |
| Red supergiant | Betelgeuse companion |
| Binary star | Betelgeuse companion |
| Coronagraph | Betelgeuse companion |
| Star formation | Pillars · Cosmic Cliffs · HH 46/47 · WR 124 · Sagittarius C |
| Infrared astronomy | Pillars · Cosmic Cliffs · Beta Pictoris · Stephan’s Quintet · WR 124 · M82 · Cartwheel · Ring Nebula · DART · Sagittarius C |
| Supernova | Cas A · Crab |
| Neutron star | Cas A · GW170817 |
| Pulsar | Crab |
| Exoplanet | WASP-39b · K2-18b |
| Transit spectroscopy | WASP-39b · K2-18b |
| Black hole | Sgr A* · M87* · Extremely red quasar |
| Event horizon | Sgr A* · M87* |
| Gravitational wave | GW170817 |
| Ice giant | Neptune |
| Ocean world | Enceladus |
| Dark matter | Euclid Perseus · Pandora’s Cluster |
| Dark energy | Euclid Perseus |
| Debris disk | Beta Pictoris |
| Herbig–Haro object | HH 46/47 |
| Galaxy merger | Stephan’s Quintet · Cartwheel |
| Starburst galaxy | M82 |
| Quasar | Extremely red quasar |
| Gravitational lensing | Pandora’s Cluster |
| Planetary nebula | Ring Nebula |
| Asteroid | DART |

---

## Lessons

| Slug | Title | In-app route | Linked from |
|------|-------|--------------|-------------|
| `why-infrared-sees-the-early-universe` | Why Infrared Sees the Early Universe | `/lessons/why-infrared-sees-the-early-universe` | Early galaxies · Pillars · Cosmic Cliffs · Euclid · Beta Pictoris · HH 46/47 · Stephan’s Quintet · WR 124 · M82 · Cartwheel · Pandora’s Cluster · Ring Nebula · Sagittarius C |
| `how-transit-spectra-reveal-atmospheres` | How Transit Spectra Reveal Atmospheres | `/lessons/how-transit-spectra-reveal-atmospheres` | WASP-39b · K2-18b |
| `what-a-black-hole-shadow-means` | What a Black Hole Shadow Means | `/lessons/what-a-black-hole-shadow-means` | Sgr A* · M87* |

---

## Maintenance checklist

When adding or editing a discovery:

```text
[ ] Attach the intended concepts in seed/admin (chips + in-body name links)
[ ] Confirm concept names appear in Quick/Learn/Deep where you want auto-links
[ ] Set wikipediaUrl / externalUrl on new concepts
[ ] Attach lessons only when they genuinely extend the discovery
[ ] Set evidenceStatus honestly: peer_reviewed only if a paper source is linked
[ ] Link related discoveries when another article genuinely continues the trail
[ ] Update this document with the same detail level for every discovery:
      slug + route, in-app concept routes, lessons, Go deeper URLs, evidence badge,
      and related-discovery clusters when changed
```

Related: [PROGRESS.md](../PROGRESS.md) · [architecture.md](../architecture.md)
