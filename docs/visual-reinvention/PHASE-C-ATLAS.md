# Phase C — The Atlas

A new visual direction for Academic Concept Lab, built as an isolated set of
routes under `/atlas`. Nothing in production was changed.

## What to look at

| Route | What it is for |
| --- | --- |
| `/atlas` | The cover. States the direction in six lines and shows each plate by its own mark. |
| `/atlas/conventions` | How to read a spread: what each kind of mark does, and the four things no mark is allowed to mean. |
| `/atlas/gestalt-principles-in-music` | Plate I. Competing organisations over one set of events. |
| `/atlas/tonal-hierarchy` | Plate II. One probe, four surrounds, on one registration line. |
| `/atlas/predictive-processing-in-music` | Plate III. The same displacement under two uncertainties. |
| `/atlas/hurons-itpra-theory-of-expectation` | Plate IV. The outcome hinge. |

Each plate carries the whole record: every section of the payload, the evidence
x-rays, scope, limitations, qualifications, trail, sources, provenance and
relations. Nothing was cut to make a composition work, and nothing was written
for the visual direction — all of it is read from `content/`.

## The thesis

**Typeset knowledge + drawn thinking.** Two registers share every page and never
merge.

The type carries the scholarship: one measure, one grid, a real hierarchy, an
apparatus column beside the text rather than boxes inside it. Every claim,
citation, boundary and qualification survives with the drawing switched off —
that is the acceptance test, and it is stated on the conventions page.

The drawing appears only where thought is happening: grouping, comparing,
connecting, doubting, bounding, revising. It is pigment and graphite —
accumulated by repetition, overlapping without destroying, occasionally lifted.

Three rules keep the second register honest, and they are the ones worth
arguing with:

1. **Colour is material, not a key.** A pigment is chosen for how it behaves in
   the mass. Each plate has its own character, the same pigment does different
   work on different plates, and no claim class, kind, evidence status or
   provenance mark is encoded by hue.
2. **Density is not evidence.** A darker field is more *worked*, not more true,
   more probable, or more brain. This is the largest hazard the material
   language carries, and the plates were composed around avoiding it — most
   visibly on Plate III, where both conditions deposit exactly the same number
   of marks and only the *spread* changes.
3. **Marks are removable.** Every decorative mark is `aria-hidden` and inert.
   Where a drawing carries an argument, its figure supplies a caption, a
   conditions table, and a linear text equivalent in the document.

## Composition follows the theory

No plate is a re-skin of another, and there is no hero-illustration-per-record.

- **Gestalt** is built out of *overlap*, because its problem is that the same
  events support more than one organisation. The centre of the plate draws both
  readings at once, lets them accumulate where they claim the same span, and
  leaves the bracket over the contested events unclosed.
- **Tonal Hierarchy** is built around *one held mark*. The probe is a single
  glyph instanced four times on one registration line; only the surround
  changes. Its profile is drawn as four ordered registers rather than a curve,
  because the record holds role categories and not rating values. There is no
  ring, spiral or torus, and section 10 says in type why the drawing was
  declined.
- **Predictive Processing** is built on *spread rather than density*, and its
  levels are told apart by how the marks behave rather than by how dark they
  are — the bands are open on the right because the record refuses a fixed
  anatomical map.
- **ITPRA** is built around *one vertical*. Prediction and Reaction share a left
  edge exactly on the outcome onset, in one pigment at opposite hatch angles;
  Appraisal runs off the right of the plate without closing and overdraws an
  earlier lane without erasing it.

## Rhythm

Every section declares a register — `ignition`, `working`, `reading`, `quiet` —
and the register governs how much pigment it may use. Evidence, scope,
limitations, provenance, sources and relations are quiet: type only, with one
exception, the frayed rule under a record's stopping points. A quiet section
keeps the same grid, the same faces and the same apparatus column; what it drops
is colour, not precision.

## Implementation notes

- `app/atlas/atlas.css` is the whole visual system, scoped to `.at-root`. It
  does not extend, override or reference `sketchnote.css`.
- `app/atlas/_lib/marks.ts` generates every mark deterministically from a seed,
  so the server and client agree and a mark that must be *mechanically
  identical* across conditions actually is. The tooth is baked into the
  geometry rather than applied as a filter.
- Type is Newsreader (scholarship), Instrument Sans (apparatus and controls),
  and Caveat, used a handful of times per plate and never more.
- `npm test` passes: the build succeeds and all 44 existing tests still pass.
  `npx eslint app/atlas` is clean. No horizontal overflow at 375 px or on
  desktop, and the wide comparison figures scroll inside their own containers
  so the page never does.

## Deliberately out of scope

Audio playback; the other three record kinds (study, method, mechanism); the
library, atlas navigation and landing page; and the remaining twelve records.
The four plates were chosen because they stress the direction in four different
ways — overlap, a held constant, an uncertainty quantity, and simultaneity.
