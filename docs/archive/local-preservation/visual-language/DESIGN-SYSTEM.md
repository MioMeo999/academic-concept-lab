# Academic Concept Lab — working visual system

**Typeset knowledge + drawn thinking. Clarity before decoration.**

The accepted Home Hero is the visual benchmark: live type occupies quiet
regions of a materially rich drawing. Preserve its composition. Inherit the
relationship between scholarship and art, not its layout or scale.

## Visual reference library

Before a major visual design or redesign, read the visual-language documents
and inspect `docs/visual-language/references/README.md` plus the relevant
reference group. The images are references for material vocabulary and visual
rhythm, not runtime assets, page templates or mandatory artwork. Let the
content determine the geometry; learn the graphite, pigment, paper, annotation
and diagram language without copying a reference composition.

## Approved benchmark roles

The benchmarks share visual DNA while expressing different conceptual
geometries:

- **Home** is the site-level benchmark: a knowledge atlas with an expansive
  opening and a deliberate rich-to-quiet density rhythm.
- **Gestalt** is the Music Psychology benchmark: grouping, whole/part,
  relational perception and perceptual fields.
- **JD–R** is the Organisational Behaviour benchmark: workplace conditions,
  parallel currents, effort, support and changed relationships.
- **Person–Environment Fit** is the Organisational Behaviour benchmark for
  persistent authored-world / relational correspondence; see
  `INTERACTION-GRAMMAR.md` for the transferable “drawn once · read many ways”
  strategy.
- **Library** is the knowledge-discovery benchmark: **ONE LIBRARY · THREE
  READING INTENTIONS** — one canonical collection recomposed around
  **Explore** (space), **Find** (speed) and **Enter a field** (structure).
- **Saved** is the personal working-set benchmark: **A SMALL WORKING SET ·
  RETURN WITH ALMOST NO FRICTION**. It prioritises recognition, direct return,
  reversible removal and truthful persistence without becoming a second Library.
- **About** is the epistemic-transparency benchmark: **SHOW HOW WE KNOW**.
  It makes knowledge kinds, source-to-record transformation, provenance,
  explanatory boundaries and legitimate uncertainty visible through a
  reflective editorial research-desk composition.

These are reference roles, not reusable layouts. Future theory pages inherit
the shell, type, spacing, material language, provenance language, art-intensity
logic and quiet-scholarship behaviour, then discover their own geometry from
the theory. About adds a meta-content lesson: epistemic transparency can itself
be a visual experience. Provenance should explain kinds of knowing, visual
explanation must remain bounded by evidence, uncertainty deserves designed
space, and live HTML, typography, fragments and traces can create an authored
research atmosphere without automatically generating artwork. The Library adds
a discovery lesson: information architecture and intentional density can be
the visual expression when the collection itself is the content; major authored
artwork is not required on every important page.

### Reflexive Thematic Analysis — frozen method benchmark

**Status:** frozen benchmark
**Route:** `/reflexive-ta-target`
**Identity:** **REFLEXIVE THEMATIC ANALYSIS → REFLEXIVE / REVISABLE
KNOWLEDGE**
**Core thesis:** **ANALYSIS LEAVES TRACES.**
**Supporting principle:** **THE PAGE REMEMBERS THE ANALYSIS.**

The page-specific architecture is:

1. Positioned interpretation — Hero
2. Theme as organising meaning — Essence
3. Analysis as revisable history — Worktable
4. Researcher within analysis — Reflexivity
5. Theme construction — Theme-not-bucket
6. Interpretive divergence — Different readings
7. Methodological stance — Commitments / coding
8. Methodological critique — Misreadings
9. Inspectable quality — Proof sheet
10. Scholarly resolution — Sources / provenance

This is an RTA-specific expression of reflexive, revisable knowledge, not a
reusable theory-page template. Its transferable lessons are **meaningful marks
over decorative texture**, visual history as evidence of revision, one object
teaching a process through transformation, authored artwork as a material layer,
and section geometry changing with intellectual function. Page-level density and
rhythm matter as much as individual sections; mobile may re-sequence the
argument; handwriting is a thinking voice; and quiet scholarship is part of the
visual rhythm. Synthetic data and generated imagery remain teaching material,
while claims, qualifications, evidence, limitations, sources and provenance
stay live HTML.

### Affective Events Theory — frozen benchmark

**Status:** frozen benchmark
**Route:** `/aet-visual-rebuild`
**Identity:** **AET → TEMPORAL / EVENT-DRIVEN KNOWLEDGE**

The page remembers what happened. Its theory-specific geometry is **one person
· one workday · many moments**: a stable field becomes an event, a reaction,
residue, and later evaluation or action. This is a benchmark for event-driven
knowledge, not a universal theory-page template.

Its primary interaction is **READ THE MAP → READ UNDER IT**. The illustrated
workplace carries experiential understanding; the live Relationship Ledger
preserves the canonical structure. Time is material rather than a boxed node:
sequence, timestamps, changing crops, residue and later scenes carry temporal
order. Mobile may re-sequence the visual argument vertically while preserving
the theory.

The approved authored Section 07 artwork is
`public/aet-visual-rebuild-assets/aet-macrostructure-illustrated-workday-cinematography.png`.
It supplies stable workplace context, a concrete event, affective reaction,
situated response, quieter evaluation and later deliberate behaviour. The
raster contains no canonical theory labels and is authored teaching material,
not a reported case, measurement or empirical result; canonical meaning stays
live HTML.

## Implementation entry points

- `docs/visual-language/INTERACTION-GRAMMAR.md`: source of truth for
  theory-specific state, residual traces, accessible controls and conceptual
  motion. Read it before building an interactive theory surface.
- `app/concept-lab/sketchnote.css`: opt-in `.acl-system` foundation tokens.
- `app/concept-lab/_design/system.module.css`: typography, section rhythm,
  reading measures, lists, links, controls, art placement and density levels.
- `app/concept-lab/_design/ResearchSurface.tsx`: semantic section headings and
  authored-art fragments. These are server components; no animation runtime.
- `app/concept-lab/_design/art-library.ts`: curated source regions and their
  intellectual roles. Crop coordinates refer to the original artwork.
- `app/concept-lab/page.tsx`: first system application after the frozen Hero.

Wrap migrated content in `.acl-system` and import the module. Nothing opts an
existing record, library or navigation into a visual migration automatically.
The existing palette, fonts, record registry and provenance glyphs remain the
authority. Do not copy numeric token values into another stylesheet or guide.

## Foundation

Newsreader carries titles and scholarship. Use its italic for a short framing
phrase, not every heading. Instrument Sans carries metadata, navigation and
controls. Caveat is reserved for short editorial observations anchored to a
specific idea. Body text uses a comfortable reading measure and generous line
height. Avoid tiny uppercase academic prose.

Use the shared spacing scale, responsive page gutter, twelve-column grid and
bounded reading measure. Columns describe relationships; they are not card
slots. Hairlines separate information without enclosing everything. Keep the
canvas white. Colour may identify a record kind, but always retain its label;
art colours carry no automatic evidential meaning. Kind colours come from
`content/records.ts`, not a second palette.

Text links are underlined on hover/focus, navigation exposes `aria-current`,
buttons have visible boundaries, and controls retain comfortable touch targets.
Focus is always visible. On narrow screens reflow the argument in source order;
do not squeeze prose around art. Interactive comparisons may scroll locally
with a labelled, keyboard-focusable container. Never hide essential content.

Motion communicates a state change. Use short colour/border transitions, no
parallax, perpetual drawing, image zoom or scroll choreography. Reduced motion
and no JavaScript receive the complete static composition.

An authored image is not automatically a finished interface. When a surface is
interactive, keep scholarship live in HTML, let authored art carry material
and spatial meaning, and use code for the relationship the reader must explore.

## Art grammar

Set `data-art-level` on a section using the shared `section` class. Each section
has at most one dominant artistic gesture. Intensity is a budget, not a request
to add art. Crops, small identifiers and empty white space are valid outcomes.

| Level | Name | Use |
| --- | --- | --- |
| 0 | Quiet | Typeset scholarship and interface; no art required. |
| 1 | Trace | One small annotation or visual identifier. |
| 2 | Fragment | A selected figure, waveform, book or structure. |
| 3 | Territory | Art and type share a larger field, with protected text regions. |
| 4 | Immersive | Rare opening environment; the accepted Hero is the benchmark. |

The CSS gives artwork a size budget at each level. Choose placement deliberately:
inline in the reading flow, at the outer edge, or in a continuous field. Only
Levels 3–4 should normally layer art with text. No essential label is rasterised.

## Section archetypes

| Archetype | Structure / behaviour | Usual level |
| --- | --- | --- |
| Opening Canvas | Establish the world; one dominant art field and a quiet live entry. | 3–4 |
| Intellectual Territory | Different spatial logic for each field; optional fragment. | 1–2 |
| Concept Explanation | Definition, relation, boundary; drawing only when it explains. | 0–2 |
| Editorial Record List | Kind, title, question, reason to read, metadata, separate actions. | 0–1 |
| Mechanism / Process | Ordered causal steps; show boundaries and conditions in HTML. | 1–2 |
| Comparison | Aligned responsibilities or dimensions; retain labels at every width. | 0–2 |
| Evidence / Study | Question → design → evidence → result → claim → limitation. | 0–1 |
| Provenance | Authoritative glyph + description attached to the claim it covers. | 0–1 |
| References | Conventional citations, source links and optional contribution notes. | 0 |
| Quiet Scholarship | Bounded prose, restrained rules, visible uncertainties. | 0–1 |
| Interactive Conceptual Surface | Semantic controls, live labels and explicit state. | 1–3 |

These are compositional choices, not eleven mandatory React templates. Use the
existing record bodies, content navigation and interaction components for their
semantics. Share measures, labels, spacing and artwork placement; let each record
determine its geometry.

## Artwork behaviour

Use whole artwork only when its entire relationship is needed. Prefer a crop
when a section concerns one relationship; omit the image when prose is enough.
`ArtFragment` clips a documented region in CSS while preserving aspect ratio.
The source files remain intact. Optional edge fades only return a crop boundary
to the white canvas; they must not wash out text or disguise a poor composition.
Do not add global paper textures, random marks or pseudo-pencil SVG/CSS.

The current library offers group/organisation, sound/notation, knowledge-form
and source-book details. A future dedicated listening/expectation scene is an
**art asset need** if a music record needs a larger territory. Do not reuse the
atlas head as a substitute. Illustrations are editorial visual analogies, never
evidence or literal scientific models.

When expressive materiality is central to a conceptual moment, prefer an
authored or generated artwork. Do not approximate an important art moment with
pseudo-pencil SVG/CSS just to keep it procedural; reserve code for layout,
state, accessibility and genuine interaction.

## Home rhythm and review

Immersive Hero → exploratory discipline fragments → structured four-form
comparison → quiet curated records → source-oriented provenance. The current
Home tests these primitives without migrating other routes.

Review at desktop, tablet and narrow widths. Confirm that text never crosses
dense pigment, all counts/links remain registry-backed, Save still works,
essential content survives without JavaScript, and the Hero benchmark has not
changed. Then apply `REVIEW-CHECKLIST.md`.
