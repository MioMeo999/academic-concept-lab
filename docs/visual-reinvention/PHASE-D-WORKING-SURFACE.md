# Phase D — The Working Surface

A new visual direction for Academic Concept Lab, built as an isolated set of
routes under `/surface`. Nothing in production was changed, and `npm test`
passes with all 44 existing tests green.

## What to look at

Run `npm run dev`, then:

| Route | What it is for |
| --- | --- |
| `/surface` | The cover. The thesis in one line, the three rules, and the index of plates. |
| `/surface/conventions` | The material library. Every pigment, the six mark behaviours, the four registers, and the four things no mark is allowed to mean. |
| `/surface/gestalt-principles-in-music` | Plate I. Built out of overlap. |
| `/surface/tonal-hierarchy` | Plate II. Built around one held mark. |
| `/surface/bench/g1` … `/t4` | A working bench: one figure at a time, alone and at width. Not part of the argument — a tool for the next round of refinement. |

Each plate carries the whole record: every section of the payload, the evidence
x-rays, scope, oversimplifications, qualifications, the trail, sources,
provenance and relations. Nothing was cut to make a composition work, and
nothing was written for the visual direction — all of it is read from
`content/`.

## The thesis

**Typeset knowledge + drawn thinking.** Two registers share every page and
never merge.

The type carries the scholarship: one measure, one grid, a real hierarchy, an
apparatus rail beside the text rather than boxes inside it. The drawing appears
only where thought is happening — grouping, comparing, connecting, doubting,
bounding, revising — and never to fill a space that looked empty.

### Rhythm is structural, not tonal

This is the part that is genuinely new. A section declares a register, and the
register moves **the spine itself**, not merely the amount of colour. Measured
on the Gestalt plate at 1440 px:

| Register | Measure | Drawing column |
| --- | --- | --- |
| ignition | 486 px | **669 px** |
| working | 558 px | 597 px |
| reading | **648 px** | 314 px |
| quiet | **720 px** | 209 px |

At ignition the drawing is wider than the text. At quiet it has collapsed to an
apparatus rail and the measure has opened by half again. The page changes shape
as the argument changes temperature, rather than changing only its colour.

Quiet does not mean generic: a quiet band keeps the same grid, the same faces
and the same rail. What it drops is colour, not precision. The one mark allowed
in a quiet band is the boundary that will not close, under a record's stopping
points.

## Three rules that keep the second register honest

1. **Colour is material, not a key.** A pigment is chosen for how it behaves in
   the mass. No claim class, record kind, evidence status, provenance glyph or
   confidence level is encoded by hue anywhere in the exploration. On Plate II
   all four tonal contexts are drawn in *one* pigment, because they are the same
   kind of object and differ only in which pitches they contain — giving each
   its own hue would have quietly turned colour into a key.
2. **Density is not evidence.** A darker field is more *worked*, not more true.
   This is the largest hazard the material language carries. Where it costs
   something, it is paid: on Plate II, Figure 4 has to show one tonal reading
   gaining support over another, and draws that as the **extent** a band
   occupies at constant ink. A reading that gains support becomes wider, never
   darker. It is the less immediate picture and the honest one.
3. **Marks are removable.** Every decorative mark is `aria-hidden` and inert.
   Where a drawing carries an argument, its figure supplies a `<title>`, a
   caption, and a full conditions table in type.

### The acceptance test, run

Strip every `.sf-mass`, `.sf-mark`, `.sf-smudge` and `<svg>` from a plate and
read what is left. On Gestalt, 27,351 of 29,118 characters survive; everything
lost is a label that is also stated in the prose. Verified as still present with
the drawing gone: every citation, every DOI, the held constants
(`160-ms triangle tones`), every condition label (`Gap after event 04`,
`time favours X`), every hierarchy level, and all five provenance classes. The
same holds on Tonal Hierarchy.

## Composition follows the theory

No plate is a re-skin of another, and there is no hero-illustration-per-record.

**Gestalt is built out of overlap**, because its problem is that one set of
events supports more than one organisation. Figure 3 is the only place on the
surface where two pigments occupy one span: proximity proposes boundary X,
register proposes boundary Y, and the strip between them is worked in both
pigments at once so that it genuinely darkens rather than one reading covering
the other. Exactly one event falls inside that strip, and which group it belongs
to is what is in dispute. The bracket over it is left unclosed.

**Tonal Hierarchy is built around one held mark.** The probe is generated once,
from one seed, and instanced four times; because the pitch mapping is shared it
lands at the same coordinate in every panel, forming a literal vertical column
down the plate. That column is the argument — the record's claim is that the
*surround* changes and the pitch does not, so the drawing must not let the probe
drift. Two refusals are implemented rather than described:

- The profile is drawn as four **ordered registers**, not a curve or a bar
  chart. The record states that no exact empirical profile values are shown; a
  height axis would supply the numbers it declines to give. Every pitch class is
  drawn with the same mark at the same ink density, so the ordering is carried
  by position alone.
- **The torus is not drawn at all.** It is the most recognisable image the
  Krumhansl tradition produced and the easiest thing the plate could have drawn.
  Section 09 says in type why it was declined: a four-dimensional solution
  rendered as a surface would need to be flattened, shaded and oriented, and
  every one of those choices adds information the analysis does not contain.

## The pigment engine

`app/surface/_lib/pigment.ts`. A coloured pencil does not lay down a colour, it
lays down *a number of passes* of one. So nothing in the engine draws a shape
and fills it — everything deposits strokes that are expected to be stacked,
crossed and overlapped until the mass reaches the density the page wants.

Five properties do most of the work:

- **`mix-blend-mode: multiply`** on every mark group. Two pigments that cross
  darken each other instead of the later one covering the earlier. This single
  property is most of what separates the result from vector illustration.
- **Deterministic geometry.** Everything comes from a seed, never
  `Math.random()`, so the server and client agree and a mark that must be
  *mechanically identical* across conditions actually is.
- **`coverage`** — how far across a field one stroke runs. This is the control
  that decides whether a mass reads as pencil or as woven cloth: at 1 every
  stroke spans the field and, once clipped, no stroke end is ever visible, so
  the eye reads a textile. Below about 0.5 the runs land in different places and
  ends accumulate inside the mass.
- **Aspect-aware run length.** Stroke length is measured against the field's
  diagonal, which is right for a square mass and badly wrong for a long thin
  one; an elongated field shortens its own runs so a band reads as a band rather
  than as scatter.
- **A length-aware ink budget.** A stroke covers roughly its own length times
  the row spacing, so halving the run length halves what each stroke deposits.
  Budgeting on area alone starves every thin band and over-inks every fat one.

Grain lives in the mark, not the paper: there is no paper texture, no overlay,
no displacement filter, and no simulated notebook stock. The canvas is white.

## Known costs

- **Page weight.** A plate serialises 2–3 MB of path data (≈1,400–1,900 `<path>`
  elements after bucketing merges strokes by quantised pressure and width).
  That is the price of real accumulation, and it is the first thing to attack in
  the next round — the budget constants in `hatch()` are the single lever.
- Figures were tuned against the columns they sit in, so a figure moved to a
  different register will need its geometry revisited.
- Audio is out of scope here; the conditions tables carry the stimulus
  descriptions that the production audio presets use.

## Deliberately out of scope

The other three record kinds (study, method, mechanism); the library, atlas
navigation and landing page; the remaining sixteen records; audio playback. Two
plates were chosen because they stress the direction in opposite ways — one
where two readings must share a span, and one where a single mark must not move
at all.
