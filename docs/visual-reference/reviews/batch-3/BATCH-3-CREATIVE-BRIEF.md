# Batch 3 — Creative brief and review plan

Status: built and verified locally · Ready for human review on a Vercel Preview · Branch: `feature/batch3-creative-redesign` · Base: `e209b3f4ce517f80be52067f87980cc2391f32c1` (Batch 2 closeout)

## Why this batch exists

The Home page was accepted as the standard: knowledge typeset in a white
canvas, thinking drawn beside it, a single authored image that carries the
idea. The record pages behind it did not yet live up to that. Most of them
still poured a record into one shared body template, so a theory of
self-determination, a theory of tonal grouping and a research field on musical
taste all arrived with the same section rhythm, the same cards and the same
generic demo.

Batch 3 replaces that for ten records. Each page is designed from what its
particular knowledge needs the reader to see, manipulate, compare or trace,
not from the nearest page shape. The rule from the design language holds
throughout: **same hand, different mind**. The pencil, the paper, the
typography and the provenance marks are shared; the geometry and the
interaction are not.

## Scope and completion test

Ten records, all `theory` kind, each a bespoke experience under
`app/concept-lab/_experiences/<record>/`:

| Record | Route |
| --- | --- |
| Self-Determination Theory | `/concept-lab/theory/self-determination-theory` |
| Social Exchange Theory | `/concept-lab/theory/social-exchange-theory` |
| Person–Organisation Fit | `/concept-lab/theory/person-organisation-fit` |
| Workplace Design | `/concept-lab/theory/workplace-design` |
| Auditory Scene Analysis | `/concept-lab/theory/auditory-scene-analysis` |
| A Generative Theory of Tonal Music | `/concept-lab/theory/generative-theory-of-tonal-music` |
| Narmour’s Implication–Realization Theory | `/concept-lab/theory/narmours-implication-realization-theory` |
| Statistical Learning of Music | `/concept-lab/theory/statistical-learning-of-music` |
| Predictive Processing in Music | `/concept-lab/theory/predictive-processing-in-music` |
| Music Preference and Person–Music Fit | `/concept-lab/theory/music-preference` |

The work is ready for human review when:

- Each page reads as its own experience within the shared white-canvas,
  editorial and drawn language, with one authored opening image where an idea
  is carried by a picture, code-drawn figures on the same idea for everything
  after, and a quiet scholarly coda.
- Every record string, citation, provenance note, qualification and source is
  still on the page: the repository tests assert this record by record.
- Every interaction has a complete static reading path (all states listed as
  text beside the drawing), works by keyboard and touch, works without colour
  or motion, and respects `prefers-reduced-motion`.
- Routes, metadata, chapter navigation and active tracking, internal links,
  provenance, Save behaviour, desktop and mobile layouts, overflow, console
  output, axe, lint and the repository tests have been checked.
- Home, Library Hub, the approved Batch 1 records and the Batch 2 records are
  unchanged apart from the shared-code changes listed below.
- The work stays on its isolated branch and is deployed as a Vercel Preview.
  Do not merge to `main` or deploy Production.

## The ten, and what each page is for

| Record | Knowledge to preserve | What the reader should perceive |
| --- | --- | --- |
| Self-Determination Theory | Reasons for acting differ in whose they are; regulation types, basic needs, context and reward effects; the mini-theories are a family, not one claim. | The same action moved by a reason that presses from outside, one taken in but not owned, or one the person holds. |
| Social Exchange Theory | An exchange is a strand between two actors; relationships are the history many exchanges weave; power follows dependence and alternatives (Emerson). | What makes what happens next an exchange — and how one word, one rule or one alternative changes only part of the picture. |
| Person–Organisation Fit | Fit is a relation between a person and a particular place; attraction–selection–attrition can produce sameness; what a study calls fit depends on which relation it measured. | The people make the place: a room takes the colour of its people, and the same person can fit four targets differently. |
| Workplace Design | Two literatures answer to the name; the room is several conditions that do not move together; a poorly supportive room makes the same work cost more; opening the plan trades privacy for contact. | The room as a work condition, read one condition at a time, then walked through as a mechanism. |
| Auditory Scene Analysis | The ear receives a sum and the listener hears streams; grouping happens across time and at one moment, and cues compete. A stream is not a source. | One mixture and several possible streams: the same tone events under different connections. |
| A Generative Theory of Tonal Music | Grouping, meter, time-span and prolongational descriptions are related, not the same; reduction changes the level of description and does not delete notes. | One sixteen-note surface, four questions, and reductions that keep the set-aside notes visible. |
| Narmour’s Implication–Realization Theory | An interval implies several expectations at once; a following tone realises some and denies others; denial is not error. | Two tones heard and a third not yet: the leans, the continuations and their verdicts. |
| Statistical Learning of Music | Frequency and transitional probability are different; structure the sound never marks can emerge in the counts as exposure grows; the counter is a teaching representation. | A stream and what a tally of it would show: equal frequency, unequal transitions, units found by dips. |
| Predictive Processing in Music | A broad framework, not a next-note guess; prediction error is information, weighted by precision; the ladder is a teaching hierarchy, not a cortical map. | A ghost of what is expected laid over what arrives, and the same 120 ms displacement weighing very differently in a narrow and a broad expectation. |
| Music Preference and Person–Music Fit | A research field, not a theory; two structures built from different evidence; five levers; preference as function; development; listening at work. “Person–Music Fit” is the page’s own frame. | A crowd of individual tastes and the shape they make — then the strands the record follows, and only at the end a frame marked as ours. |

The page-by-page thesis, geometry, persistent object, interaction, mobile
strategy and “do not flatten into” list live in
`app/concept-lab/_design/experience-manifest.ts`, one entry per experience,
and the authored artwork is described in `art-manifest.ts`.

## Shared decisions

- **Art first, code second.** Each page opens on one authored coloured-pencil
  image (scenes in `scripts/art/scenes/`, rendered offline by
  `scripts/art/render.mjs` to WebP under `public/visual-language/theories/<slug>/`,
  multiplied onto white). Each has a wide, a mid-size and a stacked mobile
  variant, and its labels are live HTML. Nothing is generated at runtime.
- **Code-drawn figures on the same hand.** Figures use the shared
  `hand.ts` helpers (wobbly lines, imperfect rings, braces, arrowheads) and
  the `folio-pencil` filter, so a figure looks pencilled without a raster.
- **A static reading path always exists.** Every state a control can reach is
  also listed as text beside the figure, with the current one marked; the
  chapter map, contents tracking and Save control come from the shared folio.
- **Mobile is recomposed, not shrunk.** Figures are pinned above their
  controls, drawn text sizes step up on narrow screens, and numbered choice
  groups drop their drawn hint while keeping it in their accessible name.
- **Sound is opt-in and safe.** Audio never starts on load. Tone sketches run
  through a compressor, stay quiet, share a single length and close their audio
  context when stopped.
- **Provenance stays honest.** Every constructed drawing is marked as such
  (▲ teaching construction, ✦ Concept Lab synthesis), and each page’s
  provenance chapter says which figures are the record’s own and which were
  drawn for the page.

## Shared code that changed

All other changes are new files under `_experiences/`, `scripts/art/scenes/`
and `public/visual-language/theories/`.

- `app/concept-lab/_folio/coda.module.css` — the `BoundaryMap` divider was
  680px tall on every page that used it (an SVG with an intrinsic ratio); it is
  now filled absolutely to the height of its two sides.
- `app/concept-lab/_folio/Coda.tsx` — `EvidenceLedger` takes an optional
  `start`, so a ledger can continue an earlier count.
- `app/concept-lab/_folio/Choices.tsx`, `folio.module.css` — an additive
  `compact` prop: short numbered choices draw only the numeral on a narrow
  screen and keep the hint in the accessible name.
- `app/concept-lab/_folio/hand.ts`, `useTones.ts` — new shared helpers for
  seeded hand-drawn paths and for short synthesised tones.
- `scripts/art/pencil.js`, `render.mjs` — `stack`, `flop` and `rotate` outputs
  for recomposed mobile crops.
- `app/concept-lab/theory/[slug]/page.tsx` — one dispatch line per record.
- `_design/art-manifest.ts`, `_design/experience-manifest.ts`,
  `scripts/verification-routes.mjs`, `tests/rendered-html.test.mjs`,
  `tests/experience-logic.test.ts`, `package.json` (test script) — contracts,
  probes and tests for the ten pages.

## Things to know before reviewing

- **A correction, not a redesign.** In the old Social Exchange Theory power lab
  the Emerson power–dependence reading was inverted twice over: it counted
  available alternatives as raising a party’s dependence, and it credited
  relational power to whichever party depended more. The new page follows
  Emerson — dependence on a partner rises with what is valued through them and
  falls as alternatives become available, and the partner who is depended on
  holds the power — and `tests/experience-logic.test.ts` guards it.
- **A bug caught in review.** The Predictive Processing ladder was first drawn
  with the higher, slower level at the bottom. It is now drawn the way a
  prediction travels down through it, and a test pins the order.
- **The neighbourhood cap.** The shared relation ledger shows at most four
  neighbours (`MAX_NEIGHBOURS = 4`). Where a record names more, the redesigned
  page renders the remainder in its own “Beside other lenses” block rather than
  losing them.
- **Constructed material.** The Music Preference opening threads, the five
  sound traces and their synthesised sketches, the Predictive Processing
  envelopes and omission example, the Statistical Learning stream and tally,
  the Narmour field and the Person–Organisation room are all teaching
  constructions. They are labelled on the page and none is data.
- **Editorial frames stay editorial.** “Person–Music Fit” is drawn and labelled
  ✦ everywhere it appears: it is the page’s own way of arranging a field, not a
  theory any cited author proposed.

## Review plan

For each page, on the Preview, at desktop and at 390px:

1. Read the opening: does the image alone say what the page is about, and do
   the four captions name what is drawn?
2. Scroll the whole page: does every chapter’s figure change only what the
   record says it changes, and does the reading stay continuous?
3. Operate each control by keyboard and by touch; switch on reduced motion.
4. Read the coda: evidence, boundaries, cautions, open questions, sources and
   provenance should be as complete as the record.

Decisions to record after review: which pages to approve as they are, which to
refine, and whether the Batch 3 shared changes above should be promoted with
the pages.

## Verification

Commands and results are recorded in `BATCH-3-VERIFICATION.md`.
