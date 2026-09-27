# Batch 2 — Creative brief and review plan

Status: visual review prepared · Local branch: `codex/batch2-creative-redesign` · Base: `f2bd7964ba8a0dd6db01a38e20b92af2b107f2df`

## Scope and completion test

Redesign three connected Music Psychology records around their different forms
of musical expectation. Keep their canonical content, provenance, evidence,
sources and current useful interactions intact. Each page must have a distinct
knowledge-led composition, expressive authored artwork where it carries an
idea, and accessible live text and controls.

The work is ready for human review when:

- Meyer, ITPRA and IDyOM each read as a different experience within the same
  white-canvas, editorial and drawn language.
- Their existing audio, timing and model interactions still teach their
  original distinctions, work without colour or motion, and operate by
  keyboard and touch.
- Desktop and mobile browser captures show openings, full reading continuity,
  lower scholarship and meaningful states. The screenshots come from the
  actual local browser render, including segmented coverage where full-page
  raster limits apply.
- Routes, metadata, contents navigation, links, provenance, save controls,
  responsive overflow, reduced motion, console output, lint and repository
  tests have been checked.
- The complete branch diff contains no changes to Home, Library Hub or the
  approved Batch 1 records. The work remains local and isolated for review;
  there is no merge, push, Vercel deployment or Production release before the
  human visual review.

## Why these three

These records sit in the expectation-and-prediction branch, but answer
different questions and carry different kinds of knowledge:

| Record | Knowledge to preserve | What the reader should perceive |
| --- | --- | --- |
| Meyer’s Expectancy Theory | A historical aesthetic-psychological account of implication, tendency, learned style, delay, fulfilment and retrospective meaning. | A musical moment can leave several futures open; later continuation can clarify an earlier relation. |
| Huron’s ITPRA Theory | Five functionally distinct response systems around an outcome; this is not a rigid five-stage algorithm or an established physiological trace. | One outcome is a temporal hinge. Different response windows begin before, at, or after it, and may overlap. |
| IDyOM | A computational cognitive model that learns musical regularities and estimates event distributions and information measures; predictive fit does not establish a literal brain mechanism. | The model distributes expectation over possible events. Distributional uncertainty and the information of one realised event are different quantities. |

This set offers three distinct geometries: an unfinished phrase with
retrospective traces, an outcome-centred temporal field, and a model-generated
distribution over possible notes. It builds on the nearby Tonal Hierarchy and
Gestalt records without borrowing their compositions.

## Page-specific design decisions

### Meyer — an unfinished phrase, heard again

- Keep the same short musical setup while the reader auditions strongly
  implied, plausible, and less-implied continuations and compares fulfilment,
  delay and diversion.
- Let the principal field open at a suspended musical hinge. Continuation
  paths should diverge from the same event, then leave a quiet backwards trace
  where later context changes how that event is understood.
- Preserve qualitative relationships. Branch position, pigment and stroke do
  not encode probability, emotional intensity or a universal listener
  response.
- Keep the hypothetical → evident → determinate distinction in readable
  academic text. Later predictive and computational accounts remain later
  developments, not retroactive parts of Meyer’s 1956 account.
- Relevant references: page rhythm and shared vocabulary; applied theory and
  annotation; material, pressure and marks.

### Huron — the outcome as a temporal hinge

- Preserve the same-outcome timing comparison and the selectable response
  lenses.
- Compose the five systems as unequal, overlapping spans around an outcome
  hinge: Imagination can begin earlier; Tension approaches the hinge;
  Prediction and Reaction begin after onset in parallel; Appraisal has a
  longer, revisable tail.
- Use expressive material to distinguish temporal reach and overlap, not to
  claim measured durations, neural amplitude or universal physiology.
- Keep the five live labels and their functional explanations next to the
  field. Name the timeline as Concept Lab synthesis and retain the boundary
  between Huron’s theory, constructed audio, empirical expectancy evidence and
  unresolved system independence.
- Relevant references: page rhythm and shared vocabulary; material, pressure
  and marks; applied theory and annotation.

### IDyOM — a distribution, not a hidden listener

- Preserve the calculated comparison that holds the realised event’s
  information content constant while distributional entropy differs, and
  preserve the early/later local-context example.
- Let the reader inspect a model’s possible continuations as a distribution
  emerging from learned context. Keep long-term corpus history, local piece
  context, event probability, information content and entropy distinguishable
  in live labels.
- Only quantities already grounded in the record’s constructed data may be
  shown numerically. Clearly label the distribution and local-context
  micro-world as teaching constructions, not a published IDyOM run or a
  visitor’s measured expectation.
- Keep the distinction between a model that predicts behaviour and a proven
  account of human memory or neural mechanism explicit.
- Relevant references: material, pressure and marks; chromatic sketch
  vocabulary; predictive-processing concept map, used as vocabulary for
  interacting model parts rather than as a copied diagram.

## Shared identity and boundaries

Use a bright white reading canvas, editorial type, controlled pigment range,
visible hand pressure and quiet scholarship. Let each page find its own scale,
spacing and rhythm. Avoid a repeated title-plus-art opening, the generic
four-quadrant relation plate, and a card sequence that reduces unlike concepts
to equal boxes. Do not add marks without a teaching purpose.

Formal content, control labels, citations, provenance and qualifications stay
live in HTML. Artwork is authored teaching or editorial material, never
empirical evidence. Preserve the glyph model (● source-grounded, ■ faithful
explanation, ▲ constructed example, ✦ editorial synthesis, ? unresolved) and
state what each relevant mark covers.

Do not edit Home, Library Hub, the four approved Batch 1 experiences, shared
global styling, record claims or source citations. Page-level composition and
new page-specific artwork are in scope. Any shared component change must be
needed by these records and must not change a protected experience.

## Work sequence and gates

1. **Baseline and scope** — complete. Confirmed the exact base, selected the three records,
   capture the current openings and record their interaction states.
2. **Art direction** — complete. Made one authored visual field for each page; inspected
   each image at actual display size before integrating it.
3. **Meyer** — complete. Reshaped the opening around the open musical phrase and its
   fulfilment/delay/diversion comparisons. Playing a continuation highlights
   its qualitative route and announces the reading.
4. **ITPRA** — complete. Reshaped the opening around the outcome hinge and overlapping
   response windows; verify timing and each response lens before moving on.
5. **IDyOM** — complete. Reshaped the opening around model context and event distributions;
   verify probability, entropy and information content states before moving on.
6. **Whole-page review** — complete. Inspected desktop/mobile, selected states, sources,
   footer, focus, touch, reduced motion, console and overflow. Capture the
   actual browser renders and prepare the review package.
7. **Release gate** — complete for human review. Lint and repository tests pass;
   the full diff against the approved base is limited to the three Batch 2
   records and their review artifacts. The branch remains local and undeployed.

### Source and evidence basis

The canonical record data, component interactions and provenance arrays in
`content/meyers-expectancy-theory.ts`,
`content/hurons-itpra-theory-of-expectation.ts` and `content/idyom.ts` own the
page claims. The source materials inspected for this art direction include
Meyer’s *Emotion and Meaning in Music*; Huron’s *Sweet Anticipation*; Pearce’s
IDyOM doctoral thesis; Pearce and Wiggins’ computational model papers; and
Pearce’s 2018 synthesis. This work changes presentation and interaction
composition, not their canonical scholarly content.
