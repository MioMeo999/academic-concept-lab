# Source-of-truth map

## Authority order

When sources disagree, use this order:

1. The current record data in `content/` for claims, boundaries, sources,
   relations named by the record, and interaction constants.
2. The shared types in `content/types.ts` for what a field means and whether it
   is required or optional.
3. The registry and Atlas metadata for identity, routing, classification, and
   approved record-to-record relations.
4. Body components for what is currently surfaced, what a control changes, and
   what accessibility fallback exists.
5. Tests for route, metadata, provenance, contents, and rendered-content
   invariants.

Components and styles cannot authorize an academic claim that is absent from
the record data.

## Semantic sources

| Source | Authority | What it establishes |
| --- | --- | --- |
| `content/types.ts` | Primary model contract | Record kinds; provenance; source fields; evidence X-rays; theory-specific payloads; interaction data shapes. |
| `content/records.ts` | Canonical registry | Which records exist, their kind, their route vocabulary, and registry-backed related-record resolution. |
| `content/atlas/branches.ts` | Canonical branch metadata | The three music-psychology branches and their descriptions. |
| `content/atlas/knowledgeForms.ts` | Canonical classification labels | The controlled knowledge-form vocabulary. |
| `content/atlas/relations.ts` | Canonical relation metadata | Direction, relation type, provenance, and whether a relation is source-grounded, editorial, or proposed. |
| `content/atlas/learningPaths.ts` | Canonical learning routes | The approved question-led routes and their order. |
| `content/atlas/validation.ts` | Integrity constraints | Registry-backed branch, form, relation, and learning-path validation. |
| `content/gestalt-principles-in-music.ts` | Primary record content | Gestalt identity, grouping concepts, evidence boundaries, scope, sources, provenance, and constructed audio conditions. |
| `content/tonal-hierarchy.ts` | Primary record content | Context-dependent tonal function, probe-tone logic, profile/process distinction, evidence, scope, sources, and provenance. |
| `content/predictive-processing-in-music.ts` | Primary record content | Generative models, message passing, prediction error, precision, omission, PCM, evidence, critical boundaries, scope, sources, and provenance. |
| `content/hurons-itpra-theory-of-expectation.ts` | Primary record content | Five response functions, temporal hinge, expectation sources, mixed valence, evidence limits, scope, sources, and provenance. |
| `docs/ACADEMIC-CONCEPT-LAB-PROTOCOL.md` | Project protocol | Required reading, extraction fields, evidence chain, provenance taxonomy, teaching design, and verification obligations. |

## Functional presentation sources

These files are useful only for recovering what the current implementation
surfaces and how an interaction behaves. They are not sources of academic
meaning or future visual direction.

| Source | Functional evidence to retain |
| --- | --- |
| `app/concept-lab/_components/GestaltBody.tsx` | The record’s current semantic block order; two controlled audio comparisons; evidence X-rays; scope; trail; sources; related records; provenance. |
| `app/concept-lab/_components/TonalBody.tsx` | Probe-tone selection and optional rating; same-note/context comparison; progressive key-space view; profile/process distinction; evidence and provenance blocks. |
| `app/concept-lab/_components/PredictiveProcessingBody.tsx` | Precision comparison with held constants; omission comparison; message-passing caption; evidence X-rays; critical boundary; final model; provenance. |
| `app/concept-lab/_components/HuronBody.tsx` | Timing comparison; outcome-centred response timeline; fixed-event lens switch; source channels; evidence; source trail; provenance. |
| `app/concept-lab/_components/RecordShell.tsx` | Shared record identity, breadcrumbs, kind label, save control, topics, first four reading-route links, related records, and consistent shell framing. |
| `app/concept-lab/_components/ContentsNav.tsx` | The section heading list is the navigation source; active-section tracking; mobile fold-out fallback; keyboard-equivalent anchor navigation. |
| `app/concept-lab/_components/ProbeToneLab.tsx` | Audio/context/probe action model, optional local ratings, role reveal, static method fallback, and the explicit non-diagnostic wording. |
| `app/concept-lab/_components/ContextualRoleCompare.tsx` | One physical probe held constant while the tonal context changes; static comparison fallback. |
| `app/concept-lab/_components/KeyNeighbourhood.tsx` | Progressive key-space levels and a text fallback. |
| `app/concept-lab/_components/AudioPresetCompare.tsx` | Controlled preset selection, manipulated/held-constant metadata, audio fallback. |
| `tests/atlas-metadata.test.ts` | Stable classifications, relation provenance, learning-path order, route vocabulary, and registry integrity. |
| `tests/rendered-html.test.mjs` | Provenance presence, section/contents parity, mobile contents fallback, internal links, and selected record wording. |

## Presentation sources quarantined from semantic extraction

The following are implementation sources, not knowledge sources:

- `app/concept-lab/sketchnote.css` and other CSS: appearance, spacing,
  responsive layout, motion, and surface treatment.
- `app/concept-lab/_components/Sketch.tsx`, `TheoryPatterns.tsx`,
  `VisualAtlas.tsx`, `Reveal.tsx`, and other visual primitives: rendering
  vocabulary and decorative/structural mechanisms.
- The desktop reference-image folder named in the request: explicitly out of
  scope and not inspected for this phase.

No palette, typeface, composition, mockup, screenshot, or visual motif from
these sources is carried into this package.

## Known source gaps

- This phase extracts the repository’s claims; it does not independently
  re-read every cited primary paper.
- Exact numerical probe-tone profiles are intentionally not promoted into the
  handoff because the record says exact values require direct source
  verification.
- Current presentation labels can reveal a content block that is not present
  in the typed record payload. Those cases are recorded as implementation
  evidence or open questions rather than silently promoted to canonical facts.

