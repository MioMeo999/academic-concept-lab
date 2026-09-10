# Project knowledge architecture

## Purpose

Academic Concept Lab is an editorial research-learning environment. Its job is
to make difficult academic knowledge easier to understand while preserving
accuracy, traceability, uncertainty, and the difference between a source claim
and a teaching arrangement.

The future redesign may change how knowledge is encountered. It may not change
what kind of knowledge a record is, what the evidence supports, or what the
reader is allowed to infer.

## Ontology

The project distinguishes four record kinds:

| Kind | Meaning | Phase A consequence |
| --- | --- | --- |
| Theory | A lens that helps explain why or how a phenomenon should be understood. | The four selected records are routed as `theory`, even when their `knowledgeForm` is `framework` or `perceptual-tradition`. |
| Study | An argument showing what a specific investigation did, found, and can reasonably claim. | Evidence X-rays inside theory records do not turn those records into studies. |
| Method | A practice showing how a research approach is used. | A teaching reconstruction of a method must remain labelled as a reconstruction. |
| Mechanism | A pathway showing through what process something happens. | A mechanism must not be added merely because a theory page needs a convenient shape. |

`TheoryRecord` supplies the shared theory/mechanism data shape. Its
`knowledgeForm` metadata refines the object without replacing the ontology:
`theory`, `framework`, `formal-model`, `computational-model`, and
`perceptual-tradition`.

## Registry and routing

The canonical registry is `content/records.ts`. It supplies the four selected
records and the route vocabulary through `KIND` and `recordHref`.

| Record | Kind | Knowledge form | Branch | Route |
| --- | --- | --- | --- | --- |
| Gestalt Principles in Music | theory | perceptual-tradition | perception-organisation | `/concept-lab/theory/gestalt-principles-in-music` |
| Tonal Hierarchy | theory | framework | musical-structure-grammar | `/concept-lab/theory/tonal-hierarchy` |
| Predictive Processing in Music | theory | framework | expectation-prediction | `/concept-lab/theory/predictive-processing-in-music` |
| Huron’s ITPRA Theory of Expectation | theory | theory | expectation-prediction | `/concept-lab/theory/hurons-itpra-theory-of-expectation` |

The Atlas adds branch labels, knowledge-form labels, relations, and learning
paths. Those are metadata about how records relate and are presented; they do
not replace the record content.

## Semantic layers on a record

Every selected record has a common semantic spine:

1. Identity: `id`, `kind`, `slug`, `title`, `hook`, `oneSentence`, discipline,
   branch, knowledge form, standing, topics, and facts.
2. Historical and intellectual trail: `origins`, `trailLede`, and source
   contributions.
3. Record-specific knowledge: the `gestalt`, `tonal`, `predictiveProcessing`,
   or `huron` payload.
4. Boundaries: `oversimplifications`, `qualifications`, and scope/stopping
   statements.
5. Scholarly apparatus: `minimumReading`, `fullSources`, evidence X-rays,
   related-record explanations, and `provenance`.

The future presentation must preserve the distinction among these layers. A
teaching synthesis may connect them, but it must not make a synthesis look like
an original source diagram or a measured result.

## Current music-psychology map

The repository currently groups the discipline into three branches:

- Perception & Organisation — how listeners organise sound into groups,
  streams, and perceptual wholes.
- Musical Structure & Grammar — how tonal and formal structure makes musical
  relations available to a listener.
- Expectation & Prediction — how learned, formal, and predictive accounts
  explain musical expectation.

The three approved learning paths are question-led routes, not claims that all
records form one historical chain:

- Organise sound: Gestalt → Auditory Scene Analysis → Tonal Hierarchy → GTTM.
- Musical expectation: Meyer → Narmour → Huron.
- Learn, model, predict: Statistical Learning → IDyOM → Predictive Processing.

## Semantic invariants

- Context is part of meaning. A pitch, event, cue, or prediction cannot be
  detached from the context the record says gives it a role.
- Evidence remains attached to design, result, claim, and limitation.
- A controlled teaching construction is not a replication merely because it
  follows a published experiment’s logic.
- A source-grounded relation, editorial synthesis, and proposed bridge must
  remain distinguishable.
- Uncertainty is content. It is not a presentation defect to be smoothed away.
- Audio, controls, labels, and text alternatives are part of the teaching
  contract when an interaction depends on them.
- Reader actions must not be interpreted as physiological, emotional,
  perceptual, or ability measurements unless a real study and instrument make
  that claim.

## What this package does not decide

It does not decide a future page composition, design system, visual metaphor,
animation language, palette, typography, card structure, or navigation layout.
Those choices belong to a later phase after this semantic contract has been
reviewed by a human.

