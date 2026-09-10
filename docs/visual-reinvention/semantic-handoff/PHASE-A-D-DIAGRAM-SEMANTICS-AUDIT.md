# Academic Concept Lab — Phase A-D Diagram Semantics Audit

## Status and scope

This is a semantic audit of the current production implementation, performed
after the Phase A style-neutral knowledge extraction and human-review packet.
It is a gate for future visual exploration, not a visual-design exercise.

Audited records:

1. Gestalt Principles in Music
2. Tonal Hierarchy
3. Predictive Processing in Music
4. Huron's ITPRA Theory of Expectation

The audit inspected the selected theory bodies, theory-specific model
components, explanatory diagrams, interaction diagrams, accessibility
summaries, and labels embedded in those structures. Generic cards, layout
containers, typography, palette, strokes, spacing, borders, page composition,
and decorative sketch treatment were not treated as semantic authority.

The test applied to each structure was:

> If this drawing disappeared, would academic or conceptual information
> disappear that is not already adequately represented in the style-neutral
> Phase A handoff and canonical content?

### Counting convention

Twenty-six theory-specific visual/model structures were audited for semantic
meaning. Three additional presentation-only families were screened as D0
because their containers or decorative treatment carry no selected-theory
meaning; they are reported separately and are not included in the meaningful
structure total.

Classification totals:

- Meaningful structures audited: **26**
- D0 presentation-only families screened: **3**
- D1 redundant semantic illustrations: **24**
- D2 partially unique semantic relationships: **2**
- D3 unique or potentially canonical semantic content: **0**

No visual form was promoted into semantic authority. Meaning is assigned to
claims, relations, labels, data, boundaries, and interaction intents—not to a
particular shape, colour, stroke, layout, or sketchnote treatment.

## D0 screening: presentation-only families

These were inspected only to ensure that a future redesign does not mistake
presentation scaffolding for theory content.

### D0-A — Shared card, grid, box, and tilt wrappers

The `Cards`/box/grid wrappers and related classes organize text and controls;
their geometry, tilt, borders, and grouping treatment do not express an
additional academic relationship. The content inside them remains subject to
the canonical content and provenance model.

### D0-B — Shared sketch primitives and presentational separators

Shared `Sketch` primitives, dividers, numbering treatments, small icons, and
source-list presentation were screened as reusable rendering vocabulary. Their
appearance has no independent theory meaning in the four selected records.

### D0-C — Decorative reveal and surface treatment

Reveal wrappers, ornamental marks, visual polish, and CSS surface treatment
were screened as non-semantic presentation. They may be removed, replaced, or
degraded without changing a theory claim, evidence boundary, or interaction
intent.

## D1 entries — Gestalt Principles in Music

### G1 — Controlled grouping comparison and pitch-contour example

- **THEORY:** Gestalt Principles in Music.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/GestaltBody.tsx`, opening `AudioPresetCompare` and its `AudioExample` pitch-contour rendering.
- **FUNCTION OF CURRENT VISUAL:** Shows the same short musical material under a changed temporal gap so a candidate boundary can be heard and inspected.
- **SEMANTIC CONTENT:** The perceptual organization of the same event can change when a temporal cue changes; a boundary is an interpretation of grouping, not a newly added note. The contour and marker are a compact representation of the controlled example.
- **WHAT WOULD BE LOST:** The page would lose a quick demonstration of the controlled grouping comparison, but not the underlying claim or data: the record and handoff already state the manipulation, held constants, candidate-boundary interpretation, and non-diagnostic teaching status.
- **CANONICAL SUPPORT:** `content/gestalt-principles-in-music.ts` opening audio example and `heldConstants`; the `AudioExample` data/intent fields in the component.
- **PHASE A HANDOFF SUPPORT:** `theories/gestalt.md` perceptual organization and grouping; `geometry/gestalt.md` controlled audio comparison and boundary interpretation; `03-interaction-intents.md` controlled auditory comparison.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Same material, changed temporal cue, candidate grouping/boundary interpretation, held constants, and the distinction between an exploratory demonstration and published evidence.
- **MAY BE COMPLETELY REINVENTED:** Pitch-contour drawing, marker shape, waveform-like treatment, audio control layout, colour, stroke, and any sketchnote surface.

### G2 — Whole versus parts organization model

- **THEORY:** Gestalt Principles in Music.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/GestaltBody.tsx`, `WholeVisual`.
- **FUNCTION OF CURRENT VISUAL:** Places one central musical event inside two surrounding organizations to show that the same event can take different perceptual roles.
- **SEMANTIC CONTENT:** A musical event is interpreted within an organized whole; local events do not have a single context-free perceptual role. The whole/parts relation is explanatory, not a claim that one fixed diagram is the Gestalt mechanism.
- **WHAT WOULD BE LOST:** The immediate visual contrast would disappear, but the canonical record and handoff already preserve whole-versus-parts organization, context dependence, and the boundary against reducing the theory to a simple “whole is more than parts” slogan.
- **CANONICAL SUPPORT:** `content/gestalt-principles-in-music.ts` core claim, concepts, and `wholePart` teaching model.
- **PHASE A HANDOFF SUPPORT:** `theories/gestalt.md` core explanation and concepts; `geometry/gestalt.md` whole/parts explanatory relationship.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Organized-whole interpretation, context-sensitive role of the same event, and the non-reduction of Gestalt to a slogan.
- **MAY BE COMPLETELY REINVENTED:** Circle/part arrangement, grouping marks, line weight, colour, spatial composition, and animated or static presentation.

### G3 — Cue-conflict grouping comparison

- **THEORY:** Gestalt Principles in Music.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/GestaltBody.tsx`, conflict `AudioPresetCompare` and `AudioExample` rendering.
- **FUNCTION OF CURRENT VISUAL:** Compares time, register, and conflicting cues while keeping the musical example bounded and inspectable.
- **SEMANTIC CONTENT:** Grouping cues can agree or compete; the resulting perceptual organization is not guaranteed by one isolated cue. The example is a controlled teaching comparison rather than a universal law.
- **WHAT WOULD BE LOST:** The compact demonstration of cue competition would disappear, but the record and Phase A materials already preserve conflict, context, held constants, and the exploratory/non-evidential boundary.
- **CANONICAL SUPPORT:** `content/gestalt-principles-in-music.ts` cue-conflict example and interaction data.
- **PHASE A HANDOFF SUPPORT:** `theories/gestalt.md` grouping cues and qualifications; `geometry/gestalt.md` cue-conflict comparison; `03-interaction-intents.md` controlled comparison intent.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Agreement/competition among grouping cues, what is held constant, what changes, and the fact that the example illustrates a possibility rather than establishing a population-level result.
- **MAY BE COMPLETELY REINVENTED:** Contour, markers, cue-specific colours, playback controls, and the spatial form of the comparison.

### G4 — Continuation and Gestalt/Meyer bridge

- **THEORY:** Gestalt Principles in Music.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/GestaltBody.tsx`, `ContinuationVisual`.
- **FUNCTION OF CURRENT VISUAL:** Contrasts a smooth/continued contour with a changed organization and places Gestalt organization beside Meyer's question about what the organization implies.
- **SEMANTIC CONTENT:** Continuation concerns how a pattern is organized; Meyer concerns the expectation or implication attached to that organized pattern. The two explanatory levels are related but not identical.
- **WHAT WOULD BE LOST:** The side-by-side conceptual bridge would be less immediate, but the distinct claims, relation, and non-identity are already explicit in the canonical record and Phase A handoff.
- **CANONICAL SUPPORT:** `content/gestalt-principles-in-music.ts` continuation content and Meyer relation.
- **PHASE A HANDOFF SUPPORT:** `theories/gestalt.md` continuation, Meyer boundary, and proposed relation; `geometry/gestalt.md` continuation/implication bridge; `06-open-questions.md` Gestalt continuation/Meyer bridge.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** The distinction between organization and implication, and the relation without collapsing the two theories.
- **MAY BE COMPLETELY REINVENTED:** Contour lines, arrows, side-by-side layout, annotations, and any visual metaphor for continuation.

### G5 — Gestalt final synthesis model

- **THEORY:** Gestalt Principles in Music.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/GestaltBody.tsx`, `FinalModel`.
- **FUNCTION OF CURRENT VISUAL:** Summarizes possible organizations, grouping cues, reinforcement/competition, preferred or ambiguous grouping, and contextual influences.
- **SEMANTIC CONTENT:** Musical events can support multiple organizations; proximity, similarity, and continuation contribute; cues may reinforce or compete; grouping can be preferred or ambiguous; higher-level groups can be formed; context, past experience, attention, and musical structure influence interpretation. The component labels this as Concept Lab synthesis.
- **WHAT WOULD BE LOST:** The compact synthesis would disappear, but every required relation and the editorial-synthesis status are already present in the canonical content and Phase A theory/geometry handoff.
- **CANONICAL SUPPORT:** `content/gestalt-principles-in-music.ts` `finalModel` and related concepts/qualifications.
- **PHASE A HANDOFF SUPPORT:** `theories/gestalt.md` semantic invariants and synthesis boundary; `geometry/gestalt.md` final synthesis; `06-open-questions.md` Gestalt final synthesis.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** All listed relationships, their qualified status, and the explicit distinction between canonical/source claims and Concept Lab synthesis.
- **MAY BE COMPLETELY REINVENTED:** Node arrangement, arrows, grouping marks, colour, hierarchy, and the overall diagram grammar.

## D1 entries — Tonal Hierarchy

### T1 — Probe-tone exploratory lab

- **THEORY:** Tonal Hierarchy.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/TonalBody.tsx`, opening `ProbeToneLab` with `AudioExample`.
- **FUNCTION OF CURRENT VISUAL:** Lets a learner choose a probe tone, hear a context, and optionally rate tonal fit.
- **SEMANTIC CONTENT:** A probe-tone task operationalizes a contextual fit judgment; the learner-generated rating is an exploratory teaching trace, not the published hierarchy, a diagnostic score, or new evidence.
- **WHAT WOULD BE LOST:** The learner’s direct manipulation and immediate demonstration would disappear, but the task logic, rating boundary, static fallback, and canonical hierarchy are already represented in content and handoff.
- **CANONICAL SUPPORT:** `content/tonal-hierarchy.ts` probe-tone task and profile data.
- **PHASE A HANDOFF SUPPORT:** `theories/tonal-hierarchy.md` measurement question and scope; `geometry/tonal-hierarchy.md` probe-tone interaction; `03-interaction-intents.md` exploratory probe interaction.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Context → probe → fit judgment, optional learner rating, static fallback, and non-equivalence between learner trace and published evidence.
- **MAY BE COMPLETELY REINVENTED:** Tone controls, pitch contour, rating affordance, reveal treatment, and the visual form of the exploratory trace.

### T2 — Tonal measurement flow

- **THEORY:** Tonal Hierarchy.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/TonalBody.tsx`, `Flow`.
- **FUNCTION OF CURRENT VISUAL:** Presents the measurement sequence from tonal context through probe-tone judgment and repeated pitch-class comparison to an inferred tonal organization.
- **SEMANTIC CONTENT:** The profile is produced by a measurement procedure: context, probe tone, fit/completion judgment, repetition across pitch classes, empirical profile, then inference about tonal organization.
- **WHAT WOULD BE LOST:** The procedural sequence would be less quickly scannable, but it is already explicitly preserved in the record’s model and the Phase A component-only handoff.
- **CANONICAL SUPPORT:** `content/tonal-hierarchy.ts` measurement flow and probe-tone method fields.
- **PHASE A HANDOFF SUPPORT:** `theories/tonal-hierarchy.md` measurement/evidence chain; `geometry/tonal-hierarchy.md` measurement flow; `06-open-questions.md` Tonal measurement flow.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** The ordered procedure and the distinction between observed judgments, profile construction, and inference.
- **MAY BE COMPLETELY REINVENTED:** Step boxes, arrows, numbering, direction, and layout.

### T3 — Qualitative probe-tone profile

- **THEORY:** Tonal Hierarchy.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/TonalBody.tsx`, `TonalProfile`.
- **FUNCTION OF CURRENT VISUAL:** Groups pitch classes into qualitative strength bands.
- **SEMANTIC CONTENT:** Tonic is the strongest anchor; other tonic-triad tones are next; other diatonic tones are weaker; nondiatonic tones are weakest in the qualitative teaching profile. The ordering is not a universal numerical table or complete key-finding process.
- **WHAT WOULD BE LOST:** The quick qualitative pattern would disappear, but the four groups, their interpretation, and their limitations are present in the canonical record and handoff.
- **CANONICAL SUPPORT:** `content/tonal-hierarchy.ts` profile groups and limitations.
- **PHASE A HANDOFF SUPPORT:** `theories/tonal-hierarchy.md` qualitative hierarchy and boundaries; `geometry/tonal-hierarchy.md` profile semantics; `06-open-questions.md` tonal profile/process distinction.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Four qualitative groups, relative—not absolute—strength, and the boundary against treating the profile as full key finding.
- **MAY BE COMPLETELY REINVENTED:** Bars, rings, positions, colours, labels, and any quantitative-looking encoding.

### T4 — Same probe note across changing contexts

- **THEORY:** Tonal Hierarchy.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/TonalBody.tsx`, `ContextualRoleCompare`.
- **FUNCTION OF CURRENT VISUAL:** Holds the physical probe note constant while changing the tonal context.
- **SEMANTIC CONTENT:** The same sounding C4 can have different tonal roles depending on context; pitch identity alone does not determine tonal function.
- **WHAT WOULD BE LOST:** The immediate context-dependence demonstration would disappear, but the canonical content and Phase A interaction intent already preserve the held probe, changed contexts, and contextual-role claim.
- **CANONICAL SUPPORT:** `content/tonal-hierarchy.ts` contextual role comparison.
- **PHASE A HANDOFF SUPPORT:** `theories/tonal-hierarchy.md` context dependence; `geometry/tonal-hierarchy.md` same-note/context comparison; `03-interaction-intents.md` contextual probe comparison.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Same physical probe, changed context, changed role interpretation, and no colour-only dependence.
- **MAY BE COMPLETELY REINVENTED:** Two-panel comparison, pitch labels, arrows, colour coding, and audio presentation.

### T5 — Key-neighbourhood progression

- **THEORY:** Tonal Hierarchy.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/TonalBody.tsx`, `KeyNeighbourhood`.
- **FUNCTION OF CURRENT VISUAL:** Reveals increasingly broad descriptions of pitch/key relations: local neighbourhood, circle of fifths, relative major/minor links, and a more advanced toroidal space.
- **SEMANTIC CONTENT:** Key relationships can be represented at multiple levels of neighbourhood and similarity; the progression is explanatory and does not make any one representation a literal neural map.
- **WHAT WOULD BE LOST:** Progressive exploration of related keys would disappear, but the relation levels, nonliteral boundary, and educational status are already preserved in the record and geometry manifest.
- **CANONICAL SUPPORT:** `content/tonal-hierarchy.ts` key-space model and boundaries.
- **PHASE A HANDOFF SUPPORT:** `theories/tonal-hierarchy.md` key neighbourhood and boundary; `geometry/tonal-hierarchy.md` key-neighbourhood interaction.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** The levels of relation, the connection to tonal organization, and the explicit nonliteral-neural-map boundary.
- **MAY BE COMPLETELY REINVENTED:** Circle, graph, torus, reveal sequence, spatial coordinates, and progression controls.

### T6 — Key-space boundary and toroidal similarity model

- **THEORY:** Tonal Hierarchy.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/TonalBody.tsx`, key-space explanatory block within `KeyNeighbourhood`.
- **FUNCTION OF CURRENT VISUAL:** Frames the torus as a representation that preserves several psychological similarity relations at once.
- **SEMANTIC CONTENT:** The torus is a model of multiple similarity relations, not a literal neural map. It is a representational aid with a defined boundary.
- **WHAT WOULD BE LOST:** The boundary might be less salient, but it is already explicit in the canonical explanatory text and Phase A handoff.
- **CANONICAL SUPPORT:** `content/tonal-hierarchy.ts` `keySpace` explanatory fields.
- **PHASE A HANDOFF SUPPORT:** `theories/tonal-hierarchy.md` representational boundary; `geometry/tonal-hierarchy.md` key-space boundary; `06-open-questions.md` fuller key-space boundary.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Several simultaneous similarity relations and the nonliteral-map qualification.
- **MAY BE COMPLETELY REINVENTED:** Surface topology, axes, points, labels, and the visual encoding of similarity.

### T7 — Dynamic tonal-organization shift

- **THEORY:** Tonal Hierarchy.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/TonalBody.tsx`, `TonalShiftVisual`.
- **FUNCTION OF CURRENT VISUAL:** Shows an early tonal interpretation, competing regions, and an updated organization, with a clear non-deterministic caption.
- **SEMANTIC CONTENT:** Tonal organization can be dynamic: early context may support one interpretation, later material can introduce competing regions, and the listener’s organization may update. This is a Concept Lab synthesis, not a deterministic modulation path.
- **WHAT WOULD BE LOST:** The dynamic sequence would be less immediate, but the states, qualification, and synthesis status are already captured in content and the Phase A geometry.
- **CANONICAL SUPPORT:** `content/tonal-hierarchy.ts` dynamics states and teaching boundary.
- **PHASE A HANDOFF SUPPORT:** `theories/tonal-hierarchy.md` dynamic organization; `geometry/tonal-hierarchy.md` TonalShiftVisual state model.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Early interpretation, competition, update, and non-deterministic/synthetic status.
- **MAY BE COMPLETELY REINVENTED:** State track, arrows, state cards, controls, and transition treatment.

### T8 — Profile versus process contrast

- **THEORY:** Tonal Hierarchy.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/TonalBody.tsx`, `process` block.
- **FUNCTION OF CURRENT VISUAL:** Separates a profile of ratings from the temporal process of finding, maintaining, or revising a tonal centre.
- **SEMANTIC CONTENT:** A probe-tone profile describes expressed tonal organization; key finding is a process over time. The two should not be conflated.
- **WHAT WOULD BE LOST:** The contrast would be less visually compact, but the exact distinction and its explanatory purpose are in the record and Phase A handoff.
- **CANONICAL SUPPORT:** `content/tonal-hierarchy.ts` process/profile distinction.
- **PHASE A HANDOFF SUPPORT:** `theories/tonal-hierarchy.md` scope boundary; `geometry/tonal-hierarchy.md` profile/process contrast; `06-open-questions.md` profile/process contrast.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Descriptive profile versus temporal recognition/maintenance/revision process.
- **MAY BE COMPLETELY REINVENTED:** Two-column contrast, labels, arrows, and visual emphasis.

### T9 — Tonal final synthesis model

- **THEORY:** Tonal Hierarchy.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/TonalBody.tsx`, `FinalModel`.
- **FUNCTION OF CURRENT VISUAL:** Connects musical context, behavioural probe judgments, empirical profile, inferred organization, lateral key relations, updating context, and influencing factors.
- **SEMANTIC CONTENT:** The model distinguishes measurement from inference, connects lateral pitch-class hierarchy with key relationships/key space, allows contextual updating, and names pitch height, chroma/octave equivalence, experience, local distribution, enculturation, and cultural system as influences. It explicitly marks profile as not a complete key-finding process.
- **WHAT WOULD BE LOST:** The dense synthesis would disappear, but the full relation set and boundary are represented in canonical content and Phase A materials.
- **CANONICAL SUPPORT:** `content/tonal-hierarchy.ts` `finalModel`, `influences`, and boundaries.
- **PHASE A HANDOFF SUPPORT:** `theories/tonal-hierarchy.md` semantic invariants; `geometry/tonal-hierarchy.md` final model; `06-open-questions.md` tonal final model.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Context → judgment → profile → inference; lateral/key-space relation; updating; named influences; profile/process boundary; Concept Lab synthesis status.
- **MAY BE COMPLETELY REINVENTED:** Node graph, arrows, ring/space metaphors, colour, hierarchy, and composition.

## D1 entries — Predictive Processing in Music

### P1 — Canonical message-passing motif

- **THEORY:** Predictive Processing in Music.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/PredictiveProcessingBody.tsx`, `MessagePassing`.
- **FUNCTION OF CURRENT VISUAL:** Shows a higher-level model sending a prediction toward a lower-level/sensory state and a prediction error returning upward.
- **SEMANTIC CONTENT:** The direction of prediction and mismatch is meaningful to the teaching model. The component explicitly qualifies the figure as a simplified predictive-coding motif, not a complete established cortical circuit.
- **WHAT WOULD BE LOST:** The directional relation would be less immediate, but the relation, qualification, and non-circuit boundary are already explicit in the record and Phase A geometry.
- **CANONICAL SUPPORT:** `content/predictive-processing-in-music.ts` message-passing model and boundaries.
- **PHASE A HANDOFF SUPPORT:** `theories/predictive-processing.md` generative-model/prediction-error relation; `geometry/predictive-processing.md` message-passing model; `06-open-questions.md` Predictive message-passing.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Higher-to-lower prediction direction, lower-to-higher mismatch direction, and the simplified/non-complete-circuit qualification.
- **MAY BE COMPLETELY REINVENTED:** Node placement, arrow form, colour, channel metaphor, and animation.

### P2 — Precision and uncertainty interaction

- **THEORY:** Predictive Processing in Music.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/PredictiveProcessingBody.tsx`, `PrecisionInteraction`.
- **FUNCTION OF CURRENT VISUAL:** Compares a regular context with a more open context using constructed timing envelopes around the same target.
- **SEMANTIC CONTENT:** Contextual regularity changes the expected timing distribution; precision is a weighting of prediction error under uncertainty. The visual is a constructed illustration, not a brain distribution, neural magnitude, or measured effect.
- **WHAT WOULD BE LOST:** The immediate comparison of narrow versus broad timing expectation would disappear, but the variables held constant, constructed status, and precision interpretation are already preserved in canonical content and handoff.
- **CANONICAL SUPPORT:** `content/predictive-processing-in-music.ts` precision interaction, held constants, and boundaries.
- **PHASE A HANDOFF SUPPORT:** `theories/predictive-processing.md` precision/uncertainty semantics; `geometry/predictive-processing.md` precision comparison; `03-interaction-intents.md` controlled precision interaction.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Context A/B, regular versus open timing expectation, same target and held musical variables, and the non-neural/non-measured boundary.
- **MAY BE COMPLETELY REINVENTED:** Gaussian/envelope shape, axes, width encoding, labels, controls, and colour.

### P3 — Omission and prediction-error interaction

- **THEORY:** Predictive Processing in Music.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/PredictiveProcessingBody.tsx`, `OmissionInteraction`.
- **FUNCTION OF CURRENT VISUAL:** Compares an expected event that occurs with an expected event that is omitted after the same preceding beat pattern.
- **SEMANTIC CONTENT:** An omission can generate a mismatch relative to an expected onset even when no physical sound occurs; the example separates expected timing from actual input and uses a bounded teaching scenario.
- **WHAT WOULD BE LOST:** The omission contrast would be less immediate, but the event sequence, expected onset, mismatch interpretation, and teaching-example boundary are in canonical content and the handoff.
- **CANONICAL SUPPORT:** `content/predictive-processing-in-music.ts` omission interaction and limits.
- **PHASE A HANDOFF SUPPORT:** `theories/predictive-processing.md` omission/prediction-error semantics; `geometry/predictive-processing.md` omission comparison; `03-interaction-intents.md` omission interaction.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Same preceding context, expected event, present-versus-omitted outcome, and the distinction between expected onset and physical input.
- **MAY BE COMPLETELY REINVENTED:** Beat marks, onset markers, silence treatment, axis, labels, and animation.

### P4 — Predictive-processing final model and scope boundary

- **THEORY:** Predictive Processing in Music.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/PredictiveProcessingBody.tsx`, `FinalModel` and its scope strings.
- **FUNCTION OF CURRENT VISUAL:** Connects experience/context, generative model, top-down prediction, actual input, prediction error weighted by estimated precision, update/attention/action, and an updated model.
- **SEMANTIC CONTENT:** Predictive processing is represented as a recurrent model: learned experience and current context inform a generative model; predictions meet actual input; weighted errors support updating; attention/action can alter sampling; an updated model produces new predictions. The scope strings state what the framework explains well and what it does not complete, including the boundary against treating it as a complete account of all music, emotion, culture, creativity, or neural computation. The figure is marked Concept Lab synthesis.
- **WHAT WOULD BE LOST:** The integrated loop and scope boundary would disappear, but the nodes, loop relation, editorial status, and hard-coded scope language are already captured in the canonical record and Phase A handoff.
- **CANONICAL SUPPORT:** `content/predictive-processing-in-music.ts` `finalModel`, scope, and boundary fields.
- **PHASE A HANDOFF SUPPORT:** `theories/predictive-processing.md` semantic invariants and scope; `geometry/predictive-processing.md` final model; `06-open-questions.md` Predictive final model and scope strings.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** All model nodes and directions, recurrent update relation, attention/action qualification, Concept Lab synthesis label, and the explains-well/does-not-complete boundary.
- **MAY BE COMPLETELY REINVENTED:** Loop geometry, node arrangement, arrow system, signal metaphor, scope presentation, colour, and animation.

## D1 entries — Huron’s ITPRA Theory of Expectation

### H1 — Expected-versus-actual timing strip

- **THEORY:** Huron’s ITPRA Theory of Expectation.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/HuronBody.tsx`, `TimingStrip` and `WaitForIt`.
- **FUNCTION OF CURRENT VISUAL:** Places context, expected arrival, outcome, and actual onset on a bounded time strip and allows the learner to alter the wait/outcome example.
- **SEMANTIC CONTENT:** Expectation concerns an anticipated outcome and its timing; the actual onset can align with or differ from the expected arrival. The strip supports the timing distinction without claiming a deterministic emotional response.
- **WHAT WOULD BE LOST:** The temporal comparison and wait interaction would be less immediate, but expected/actual timing, outcome, delay, and qualification are already represented in canonical content and Phase A geometry.
- **CANONICAL SUPPORT:** `content/hurons-itpra-theory-of-expectation.ts` timing model and `WaitForIt` data.
- **PHASE A HANDOFF SUPPORT:** `theories/itpra.md` expectation timing and bounded interaction; `geometry/itpra.md` timing strip; `03-interaction-intents.md` timing manipulation.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Context, expected arrival, actual outcome onset, alignment/delay, and non-deterministic response boundary.
- **MAY BE COMPLETELY REINVENTED:** Timeline, markers, labels, wait control, motion, and outcome emphasis.

### H2 — Response-process timeline

- **THEORY:** Huron’s ITPRA Theory of Expectation.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/HuronBody.tsx`, `ResponseTimeline`.
- **FUNCTION OF CURRENT VISUAL:** Places Imagination, Tension, Prediction, Reaction, and Appraisal in relation to an outcome onset.
- **SEMANTIC CONTENT:** Imagination occurs before the outcome; tension approaches it; prediction and reaction are distinct post-onset responses; appraisal occurs later. The timeline is a teaching model with explicit functional boundaries, not a claim that all processes are discrete or identical in every listener.
- **WHAT WOULD BE LOST:** The parallel/temporal relation would be less quickly visible, but the windows, functions, outcome boundary, and qualifications are already in the handoff.
- **CANONICAL SUPPORT:** `content/hurons-itpra-theory-of-expectation.ts` response timeline and process definitions.
- **PHASE A HANDOFF SUPPORT:** `theories/itpra.md` response sequence; `geometry/itpra.md` response timeline and accessibility summary.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Outcome-centered time, pre-outcome versus post-onset timing, distinct Prediction/Reaction roles, later Appraisal, and qualification against over-literal segmentation.
- **MAY BE COMPLETELY REINVENTED:** Axis, bands, windows, line treatment, labels, and parallel-lane composition.

### H3 — Lens switch for one musical event

- **THEORY:** Huron’s ITPRA Theory of Expectation.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/HuronBody.tsx`, `LensSwitch`.
- **FUNCTION OF CURRENT VISUAL:** Holds one event constant while switching among Prediction, Reaction, and Appraisal questions.
- **SEMANTIC CONTENT:** A single event can be examined through different response lenses: what was expected, what happened at/after onset, and how the event is evaluated later. The lenses are related but not interchangeable.
- **WHAT WOULD BE LOST:** The controlled comparison of interpretive lenses would disappear, but the fixed event, lens questions, bodies, and boundaries are already represented in content and handoff.
- **CANONICAL SUPPORT:** `content/hurons-itpra-theory-of-expectation.ts` lens interaction.
- **PHASE A HANDOFF SUPPORT:** `theories/itpra.md` process distinctions; `geometry/itpra.md` lens-switch interaction; `03-interaction-intents.md` fixed-event lens comparison.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** One fixed event, distinct Prediction/Reaction/Appraisal lenses, and no collapse of their functions.
- **MAY BE COMPLETELY REINVENTED:** Tabs, buttons, panels, question prompts, and transition treatment.

### H4 — Valence trace across expectation and outcome

- **THEORY:** Huron’s ITPRA Theory of Expectation.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/HuronBody.tsx`, `ValenceTrace`.
- **FUNCTION OF CURRENT VISUAL:** Shows possible changes in predictive, reactive, and later appraisal valence across an event.
- **SEMANTIC CONTENT:** The valence of prediction, reaction, and later appraisal can differ; the trace is a possible contrast, not a deterministic mapping from timing to emotion.
- **WHAT WOULD BE LOST:** The possible divergence across response phases would be less immediate, but the data, non-deterministic status, and interpretive boundary are already in canonical content and handoff.
- **CANONICAL SUPPORT:** `content/hurons-itpra-theory-of-expectation.ts` valence interaction and boundary.
- **PHASE A HANDOFF SUPPORT:** `theories/itpra.md` response/valence distinctions; `geometry/itpra.md` valence trace; `03-interaction-intents.md` valence comparison.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Separate predictive, reactive, and appraisal phases; possible divergence; non-deterministic teaching status.
- **MAY BE COMPLETELY REINVENTED:** Trace geometry, sign/colour encoding, axis, annotations, and interaction controls.

### H5 — Concurrent expectation-source channels

- **THEORY:** Huron’s ITPRA Theory of Expectation.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/HuronBody.tsx`, `SourceChannels`.
- **FUNCTION OF CURRENT VISUAL:** Presents four concurrent expectation sources: schematic, veridical, dynamic, and conscious.
- **SEMANTIC CONTENT:** Expectations can arise from multiple channels operating concurrently; the channels are a schematic explanatory organization, not four isolated neural modules or a complete taxonomy of all expectation.
- **WHAT WOULD BE LOST:** The concurrency and source distinction would be less immediate, but the four channels, labels, aria summary, and qualifications are already preserved in the record and handoff.
- **CANONICAL SUPPORT:** `content/hurons-itpra-theory-of-expectation.ts` source channels.
- **PHASE A HANDOFF SUPPORT:** `theories/itpra.md` expectation-source model; `geometry/itpra.md` source channels; `03-interaction-intents.md` source-channel explanation.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Four named sources, concurrent operation, schematic status, and non-isolation/non-exhaustiveness boundary.
- **MAY BE COMPLETELY REINVENTED:** Parallel lanes, arrows, icons, colour, order, and channel layout.

### H6 — ITPRA final model and accessibility summary

- **THEORY:** Huron’s ITPRA Theory of Expectation.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/HuronBody.tsx`, `FinalModel`, combining `SourceChannels`, `ResponseTimeline`, and the final-model note/aria summary.
- **FUNCTION OF CURRENT VISUAL:** Integrates concurrent sources with an outcome-centered response timeline and names the response functions in an accessible summary.
- **SEMANTIC CONTENT:** Multiple expectation sources feed an outcome-centered sequence in which Imagination, Tension, Prediction, Reaction, and Appraisal are related but functionally distinct. The accessibility summary states the same relation without relying on visual form.
- **WHAT WOULD BE LOST:** The integrated synthesis would be less compact, but the source-to-timeline relation and accessibility equivalent are already captured in canonical content and the Phase A handoff.
- **CANONICAL SUPPORT:** `content/hurons-itpra-theory-of-expectation.ts` `finalModel` and accessibility summary.
- **PHASE A HANDOFF SUPPORT:** `theories/itpra.md` semantic invariants; `geometry/itpra.md` final model and accessibility summary; `06-open-questions.md` Huron final-model accessibility summary.
- **CLASSIFICATION:** **D1 — redundant semantic illustration**.
- **MUST SURVIVE FUTURE REDESIGN:** Parallel expectation sources → outcome-centered timeline → distinct response functions, plus equivalent text alternative and provenance/qualification.
- **MAY BE COMPLETELY REINVENTED:** Composite layout, source-to-timeline connectors, lane geometry, labels, colour, motion, and responsive arrangement.

## D2 entries — semantic additions for human review

These entries are not requests to preserve the current drawing. They identify
style-neutral relationships that are present in canonical production content
but are not yet explicit enough in the Phase A handoff to guarantee survival
through a future redesign.

### D2-G1 — Prägnanz as a three-part historical and critical progression

- **THEORY:** Gestalt Principles in Music.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/GestaltBody.tsx`, `PragnanzVisual`; source data is in `content/gestalt-principles-in-music.ts` under the Prägnanz historical/problem/later fields.
- **FUNCTION OF CURRENT VISUAL:** Places the historical ambition, its under-specification/problem, and later reformulations in an ordered explanatory sequence.
- **SEMANTIC CONTENT:** The historical ambition is toward relatively good/simple organization under prevailing conditions; “good” or “simple” is under-specified if treated as a deterministic mechanism; later frameworks—including simplicity, minimum principles, likelihood, Bayesian interpretations, and self-organisation—are reformulations or extensions, not automatically classical Gestalt content.
- **WHAT WOULD BE LOST:** Without an explicit handoff addition, a future redesign could retain only “Prägnanz means simplicity,” losing the historical-to-critical-to-reformulation progression and the boundary between classical content and later interpretive frameworks.
- **CANONICAL SUPPORT:** `content/gestalt-principles-in-music.ts` Prägnanz `historical`, `problem`, and `later` fields, including their provenance markers and boundary language.
- **PHASE A HANDOFF SUPPORT:** `theories/gestalt.md` records the historical ambition, under-specification, and later reformulation boundary; `geometry/gestalt.md` names the Prägnanz progression; however, the three-part sequence and reformulation list should be made more explicit in the human-reviewed handoff.
- **CLASSIFICATION:** **D2 — partially unique semantic relationship**.
- **MUST SURVIVE FUTURE REDESIGN:** The ordered progression, the under-specification critique, the distinction between classical Gestalt and later reformulations, and the provenance/uncertainty labels attached to each part.
- **MAY BE COMPLETELY REINVENTED:** Three columns, sequence arrows, historical timeline, layered model, labels, colour, texture, and all visual metaphors.
- **PROPOSED STYLE-NEUTRAL HANDOFF ADDITION:** “Prägnanz is not a one-word simplicity rule. Preserve a three-part progression: (1) historical ambition toward relatively good/simple organization under prevailing conditions; (2) the problem that ‘good/simple’ is under-specified without a stated objective and conditions; (3) later reformulations—simplicity, minimum principles, likelihood, Bayesian interpretations, and self-organisation—as later frameworks rather than unqualified classical Gestalt content.”

### D2-G2 — Gestalt-to-GTTM historical lineage

- **THEORY:** Gestalt Principles in Music.
- **CURRENT IMPLEMENTATION LOCATION:** `app/concept-lab/_components/GestaltBody.tsx`, GTTM lineage stage visual.
- **FUNCTION OF CURRENT VISUAL:** Orders the movement from broad perceptual organization through music-specific adaptation and GTTM preference rules to later testable predictions.
- **SEMANTIC CONTENT:** The lineage is a historical/argumentative progression: broad Gestalt organization; adaptation to musical timing, attack, register, length, and larger structure; GTTM preference rules as a formal music-cognitive system with defeasible constraints; later empirical work comparing rule-derived boundaries with listener segmentation.
- **WHAT WOULD BE LOST:** The handoff currently preserves that GTTM is a later music-specific formalisation, but without the staged progression a redesign could imply a direct identity between classical Gestalt, GTTM, and empirical validation, erasing the historical and inferential boundaries.
- **CANONICAL SUPPORT:** `content/gestalt-principles-in-music.ts` `gttm` stages, links, and qualifications.
- **PHASE A HANDOFF SUPPORT:** `theories/gestalt.md` later music-specific formalisation and evidence boundaries; `geometry/gestalt.md` lineage geometry. The explicit four-stage sequence should be added to the human-reviewed semantic handoff.
- **CLASSIFICATION:** **D2 — partially unique semantic relationship**.
- **MUST SURVIVE FUTURE REDESIGN:** The four stages, their order, GTTM’s status as a later formalisation rather than classical Gestalt itself, defeasible-rule qualification, and the distinction between rule-derived predictions and empirical listener evidence.
- **MAY BE COMPLETELY REINVENTED:** Timeline, staircase, arrows, stage cards, lineage metaphor, colour, and interaction.
- **PROPOSED STYLE-NEUTRAL HANDOFF ADDITION:** “Preserve the lineage as four distinct stages: broad Gestalt perceptual organization → music-specific adaptation → GTTM preference rules as defeasible formalisation → later testable predictions/empirical comparisons. Do not collapse these stages or imply that GTTM or later listener studies are identical to the historical Gestalt claim.”

## D3 review

No D3 structures were found. None of the audited drawings contains unique or
potentially canonical academic content that is absent from both the canonical
record data and the Phase A semantic handoff. The two D2 findings are explicit
handoff-completeness issues, not evidence that a current visual form should be
preserved.

## Final audit report

1. **Total meaningful visual structures audited:** 26.
2. **D0 count:** 3 presentation-only families screened separately; they carry no selected-theory meaning.
3. **D1 count:** 24.
4. **D2 count:** 2.
5. **D3 count:** 0.
6. **Every D2 semantic addition:**
   - Prägnanz as historical ambition → under-specification/problem → later reformulations, with classical/later provenance boundaries.
   - Gestalt → music-specific adaptation → GTTM preference rules → later testable predictions, without collapsing historical, formal, and empirical stages.
7. **Every D3 human-review issue:** None.
8. **Visual-form authority:** Confirmed absent. No visual form, geometry, palette, typography, stroke, texture, or interaction surface was promoted into semantic authority.
9. **Production/runtime change:** Confirmed none. This audit adds documentation only and does not modify production code, content records, routing, runtime behaviour, or existing handoff documents.
10. **Desktop reference folder:** Confirmed not inspected. The `Concept Lab Design Element` folder and the three supplied PNG references were not opened or used in this audit.

The two D2 additions are presented for human review. This document does not
ratify them into the existing handoff, alter the manifests, or begin visual
exploration.

ACADEMIC_CONCEPT_LAB_PHASE_A_DIAGRAM_SEMANTICS_AUDIT_READY
