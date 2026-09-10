# Academic Concept Lab — Phase A human-review packet

This packet is a review artifact only. It does not revise the Phase A handoff,
resolve open questions, or begin visual exploration.

## 1. Handoff inventory

The Phase A package contains the following 16 documents. The existing handoff
documents remain unchanged; this packet reproduces their substantive content
for review in one place.

| Document | Role |
| --- | --- |
| `README.md` | Defines the package scope, reading order, selected corpus, and the boundary between semantic extraction and later visual work. |
| `00-project-knowledge-architecture.md` | States the project purpose, ontology, record routing, knowledge layers, music-psychology map, semantic invariants, and decisions intentionally deferred. |
| `01-source-of-truth-map.md` | Separates canonical content and metadata from functional component evidence, quarantined presentation sources, and known source gaps. |
| `02-scholarly-apparatus.md` | Defines the evidence chain, claim classes, provenance glyphs, source responsibility, relation provenance, and non-loss requirements. |
| `03-interaction-intents.md` | Describes each selected theory’s interaction purpose using action, variable, invariant, learner notice, and non-inference boundaries. |
| `04-quiet-scholarship-contract.md` | Defines the scholarly contract for evidence, scope, limitations, provenance, sources, and relations. |
| `05-content-survival-checklist.md` | Provides an audit checklist for identity, knowledge structure, scholarship, interactions, accessibility, resilience, and verification. |
| `06-open-questions.md` | Records unresolved cross-project and theory questions, component-only microcopy, and the human-review gate. |
| `theories/gestalt.md` | Semantic manifest for Gestalt Principles in Music. |
| `theories/tonal-hierarchy.md` | Semantic manifest for Tonal Hierarchy. |
| `theories/predictive-processing.md` | Semantic manifest for Predictive Processing in Music. |
| `theories/itpra.md` | Semantic manifest for Huron’s ITPRA Theory of Expectation. |
| `geometry/gestalt.md` | Style-neutral abstraction of grouping, part–whole relation, cue competition, and hierarchy. |
| `geometry/tonal-hierarchy.md` | Style-neutral abstraction of context × pitch, measurement, key relations, and updating. |
| `geometry/predictive-processing.md` | Style-neutral abstraction of generative models, prediction, mismatch, precision, and updating. |
| `geometry/itpra.md` | Style-neutral abstraction of expectation sources, outcome hinge, parallel responses, and appraisal. |

## 2. Project knowledge architecture

### Purpose

Academic Concept Lab is an editorial research-learning environment. Its job is
to make difficult academic knowledge easier to understand while preserving
accuracy, traceability, uncertainty, and the difference between a source claim
and a teaching arrangement.

The future redesign may change how knowledge is encountered. It may not change
what kind of knowledge a record is, what the evidence supports, or what the
reader is allowed to infer.

### Ontology

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

### Registry and routing

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

### Semantic layers on a record

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

### Current music-psychology map

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

### Semantic invariants

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

### What this package does not decide

It does not decide a future page composition, design system, visual metaphor,
animation language, palette, typography, card structure, or navigation layout.
Those choices belong to a later phase after this semantic contract has been
reviewed by a human.

## 3. Source-of-truth map

### Authority order

When sources disagree, use this order:

1. Current record data in `content/` for claims, boundaries, sources, relations
   named by the record, and interaction constants.
2. `content/types.ts` for field meaning and required/optional status.
3. The registry and Atlas metadata for identity, routing, classification, and
   approved record-to-record relations.
4. Body components for what is currently surfaced, what a control changes, and
   what accessibility fallback exists.
5. Tests for route, metadata, provenance, contents, and rendered-content
   invariants.

Components and styles cannot authorize an academic claim absent from record
data.

### Canonical semantic sources

| Source | Classification and authority |
| --- | --- |
| `content/types.ts` | Primary model contract for record kinds, provenance, sources, evidence X-rays, theory payloads, and interaction data shapes. |
| `content/records.ts` | Canonical registry for existing records, kind, routes, and registry-backed related-record resolution. |
| `content/atlas/branches.ts` | Canonical music-psychology branch metadata. |
| `content/atlas/knowledgeForms.ts` | Controlled knowledge-form vocabulary. |
| `content/atlas/relations.ts` | Relation direction, type, and provenance: source-grounded, editorial-synthesis, or proposed. |
| `content/atlas/learningPaths.ts` | Approved question-led learning routes and order. |
| `content/atlas/validation.ts` | Registry-backed integrity constraints. |
| The four selected files under `content/` | Primary claims, concepts, evidence boundaries, scope, sources, provenance, and constructed interaction conditions. |
| `docs/ACADEMIC-CONCEPT-LAB-PROTOCOL.md` | Project reading, extraction, evidence-chain, provenance, teaching-design, and verification rules. |

### Interaction and functional sources

These are not sources of academic meaning. They establish current functional
behaviour, surfaced content, variables, constants, fallbacks, and accessibility
constraints:

- `GestaltBody.tsx`: current theory block order, two controlled audio
  comparisons, evidence, scope, trail, sources, related records, provenance.
- `TonalBody.tsx`: probe selection and optional rating, same-note/context
  comparison, progressive key-space view, profile/process distinction, evidence,
  and provenance.
- `PredictiveProcessingBody.tsx`: precision comparison, omission comparison,
  message-passing caption, evidence, critical boundary, final model, provenance.
- `HuronBody.tsx`: timing comparison, outcome-centred response timeline,
  fixed-event lens switch, source channels, evidence, source trail, provenance.
- `RecordShell.tsx`: shared record identity, breadcrumbs, kind label, save
  control, topics, reading-route links, related records, and shell framing.
- `ContentsNav.tsx`: section-list source, active tracking, mobile fallback, and
  anchor navigation.
- `ProbeToneLab.tsx`, `ContextualRoleCompare.tsx`, `KeyNeighbourhood.tsx`, and
  `AudioPresetCompare.tsx`: action models, held constants, optional ratings,
  text/audio fallbacks, and contextual comparisons.

### Presentation-only sources

The following are implementation sources, not knowledge sources:

- `app/concept-lab/sketchnote.css` and other CSS: appearance, spacing,
  responsive treatment, motion, and surface treatment.
- `Sketch.tsx`, `TheoryPatterns.tsx`, `VisualAtlas.tsx`, `Reveal.tsx`, and
  other visual primitives: rendering vocabulary and decorative/structural
  mechanisms.
- The desktop reference-image folder named in the original Phase A request:
  explicitly out of scope and not inspected.

No palette, typeface, composition, mockup, screenshot, or visual motif from
these sources is an authority for the future redesign.

### Sources used only for verification

- `tests/atlas-metadata.test.ts`: stable classifications, relation provenance,
  learning-path order, route vocabulary, and registry integrity.
- `tests/rendered-html.test.mjs`: provenance presence, section/contents parity,
  mobile contents fallback, internal links, and selected record wording.

### Known source gaps

- The handoff extracts repository claims; it does not independently re-read
  every cited primary paper.
- Exact numerical probe-tone profiles remain qualitative because the record says
  exact values require direct source verification.
- Presentation labels can expose content not present in typed record payloads;
  those cases remain implementation evidence or open questions, not canonical
  facts.

## 4. Scholarly apparatus

### Purpose and evidence authority

The scholarly apparatus is part of the knowledge model. It lets the reader tell
what is reported, interpreted, constructed, synthesized, bounded, or unresolved.

For an empirical source, preserve:

`question → design → evidence → result → claim → limitation`

The `EvidenceXray` structure carries `title`, `citation`, source `label`,
`design`, `testedLabel`/`tested`, `foundLabel`/`found`, `notTested`, and an
optional DOI. An evidence summary must not be rewritten as if it tested the
whole theory when it tested only a construct, response, model, or proxy.

### Claim classes and source fidelity

| Class | Required treatment |
| --- | --- |
| Source claim | Attribute the proposal/report to the named source and preserve its scope. |
| Reported finding | Keep design, measure, result, and limitation attached. |
| Faithful paraphrase | Make it a plain-language restatement, not a new result. |
| Platform explanation | Identify it as an explanation when the distinction matters. |
| Teaching analogy/construction | State the manipulated variable, held constants, and what it cannot measure. |
| Editorial synthesis | Mark it as Concept Lab arrangement, not an original author’s diagram. |
| Editorial critique | Attribute the critical source or mark the editorial status. |
| Proposed connection | Keep relation provenance visible. |
| Open question | Preserve it as unresolved rather than completing it by design convenience. |

### Provenance

The semantic glyph vocabulary is:

| Glyph | Meaning | Required fidelity |
| --- | --- | --- |
| `●` | Source-grounded theory, framework, historical, or model claim. | Do not imply measurement when it is a proposal. |
| `■` | Source-grounded empirical finding or faithful explanation. | Keep design, measure, result, and limit together. |
| `▲` | Constructed teaching, audio, comparison, or method reconstruction. | State variable, constants, and non-inference boundary. |
| `✦` | Concept Lab synthesis or editorial arrangement. | Never present it as source-authored or measured. |
| `?` | Bounded, debated, under-specified, or unresolved content. | Keep uncertainty visible. |

The record-level `provenance` array is authoritative. Payload notes may repeat
a glyph for local clarity but must not contradict the record-level meaning.

### Source responsibility and references

Every source entry carries a citation and contribution. A DOI is an identifier,
not proof that the primary source was re-verified in this phase. Minimum reading
is a teaching threshold, not an exhaustive evidence base; the full source trail
must remain discoverable.

Relations have two layers: per-record `relatedTo` explanatory links, and typed
`ATLAS_RELATIONS` with direction and provenance (`source-grounded`,
`editorial-synthesis`, or `proposed`). “Complements,” “bridges,” “formalises,”
“informs,” and “contrasts with” are not interchangeable.

### Non-loss requirements

Without depending on an interaction, the future presentation must keep visible:

- record kind and knowledge form
- source identity and contribution
- what was tested and what was not tested
- scope and stopping points
- limitations and unresolved mechanisms
- provenance marks and explanations
- distinction between a constructed teaching example and a published study
- related-record relation type and direction

## 5. Interaction intents

Every interaction has an action, variable, invariant, epistemic purpose, learner
notice, non-inference boundary, and future redesign freedom. No current layout,
styling, button placement, colour, or component arrangement is a requirement.

### Gestalt Principles in Music

| Action | Variable | Invariant | Epistemic purpose / learner notice | Must not be inferred | Freely redesignable later |
| --- | --- | --- | --- | --- | --- |
| Choose and optionally play opening presets. | Position of one larger temporal gap. | Note sequence, register, timbre, gain, overall construction. | Notice that the same events can support different groupings when temporal spacing changes. | No universal boundary, perceptual score, musical ability judgement, or historical replication. | Control modality, sequence, audio delivery, and text organization. |
| Choose time-favoured, register-favoured, or conflict condition. | Temporal gap, register change, or both. | Documented sequence, tone duration, timbre, gain, controls. | Notice cue reinforcement, competition, and ambiguity. | No required winner or identical segmentation across listeners. | How conditions are selected and compared, provided controls remain explicit. |
| Read paired whole–part cases. | Surrounding organisation. | Central event. | Notice that a part’s perceptual role depends on the whole. | No mystical whole, fixed law, or claim that the example is a study. | The explanatory sequence and representation of the cases. |
| Inspect continuation/closure alternatives. | Proposed trajectory or completion relation. | The concept under discussion. | Keep perceptual organisation distinct from musical expectation. | No equivalence among continuation, cadence, tonic, expectancy fulfilment, and emotion. | Text order and interaction form. |

### Tonal Hierarchy

| Action | Variable | Invariant | Epistemic purpose / learner notice | Must not be inferred | Freely redesignable later |
| --- | --- | --- | --- | --- | --- |
| Choose opening probes and listen before role revelation. | Probe pitch. | Synthetic C-major context and documented audio conditions. | Treat “home” as contextual fit, not liking. | No musical-ability or universal-rating inference. | Audio access, order, reveal method, and text form. |
| Choose a probe, listen, optionally give a 1–7 fit rating, and compare the local pattern. | Probe pitch and learner’s optional local rating. | Chosen context and stated audio controls. | Understand context → probe → fit → profile as measurement logic, not direct construct readout. | Ratings are not published profile, diagnostic score, or replication. | Rating interaction and comparison method, if the boundary remains explicit. |
| Choose one of four contexts for the same note. | Preceding tonal context. | Physical C4 probe, register, timbre, loudness, context length, delay, duration. | Notice that tonal role is relational. | No claim that all listeners judge identically. | Context-selection method and presentation order. |
| Select progressive key relations. | Representational level: neighbourhood, fifth, major/minor links, toroidal space. | Psychological-similarity explanation. | Notice that key relations are psychological neighbourhoods, not physical distance. | No literal neural torus or complete key-finding algorithm. | Level navigation and explanatory form. |
| Read profile/process contrast. | Description of ratings versus recognition over time. | The distinction itself. | Notice that a profile does not specify the process that builds/revises it. | No complete causal theory. | The explanatory representation. |

### Predictive Processing in Music

| Action | Variable | Invariant | Epistemic purpose / learner notice | Must not be inferred | Freely redesignable later |
| --- | --- | --- | --- | --- | --- |
| Read the higher/lower message-passing distinction. | Direction and function of prediction versus mismatch. | Canonical distinction as stated in the record. | Direction can be meaningful without a complete cortical or musical wiring map. | No anatomical claim or fixed musical hierarchy. | Representation and reading order. |
| Choose regular or open context. | Width of constructed prediction envelope (`σ = 35 ms` versus `90 ms`). | Same target, pitch, duration, timbre, gain, and `+120 ms` displacement. | Notice model-relative significance under different uncertainty assumptions. | No neural magnitude, brain distribution, or conscious-confidence measurement. | Control form and explanatory medium. |
| Toggle expected event present/omitted. | Whether a sensory event arrives at an expected onset. | Four preceding beats and expected position. | Notice that silence can be mismatch when a model predicts an event. | No neural diagnosis or published-stimulus replication. | Toggle/selection method and fallback form. |
| Read terminology boundaries. | Construct or explanatory level. | Named definitions and qualifications. | Keep PP, predictive coding, PCM, IDyOM, precision, and attention distinct. | No claim that MMN/MMNm/ERAN/P3/omission signals are prediction error by definition. | Taxonomy and explanation order. |
| Inspect evidence X-rays. | Study design, measure, result, and limit. | Evidence-to-claim boundary. | Notice that compatible evidence does not uniquely identify a full computation. | No full architecture, causal training claim, or pure prediction-error signal. | Evidence reading sequence and interaction form. |

### Huron’s ITPRA Theory of Expectation

| Action | Variable | Invariant | Epistemic purpose / learner notice | Must not be inferred | Freely redesignable later |
| --- | --- | --- | --- | --- | --- |
| Choose on-time or delayed outcome and optionally play it. | Outcome timing. | Context, outcome identity, pitch, harmony, timbre, gain, duration. | Notice preparation and expectation-related response before onset. | No physiological latency or measured tension. | Timing-control form and audio/text delivery. |
| Read response windows. | Temporal relation to outcome onset. | Functional definitions of Imagination, Tension, Prediction, Reaction, Appraisal. | Notice Prediction and Reaction in parallel after onset and Appraisal as slower/contextual. | No five-stage algorithm or five verified modules. | Temporal explanation form. |
| Choose Prediction, Reaction, or Appraisal lens for one fixed event. | Interpretive question. | Audio event and preceding context. | Notice that one outcome supports different functional questions. | No reinforcement, reaction, appraisal, or emotional-state measurement. | Lens-selection method and explanatory sequence. |
| Read possible contrastive-valence pathway. | Relation between initial predictive/reactive valence and later appraisal. | Non-deterministic qualification. | Notice that surprise can be evaluated differently over time. | No universal pleasure mechanism or direct ITPRA validation from later findings. | Representation and order. |
| Compare schematic, veridical, dynamic, conscious sources. | Source of expectation. | Four categories and their concurrent status. | Notice sources are parallel inputs, not ITPRA stages. | No source dominance claim. | Comparison form and reading order. |
| Inspect evidence X-rays. | Design and evidential status. | Source-specific tested/found/not-tested fields. | Notice convergent evidence is not proof of five isolated systems. | No complete emotion theory, neural model, or universal pleasure account. | Evidence access and presentation. |

### Cross-record interaction invariants

- Selection changes the explanatory condition, not the record’s truth.
- Every control state must be narratable in text.
- Learner-generated ratings/responses remain learner-generated data.
- Audio controls disclose relevant pitch/timing/context details.
- Interactions expose distinctions; they do not collect hidden research data.
- A redesign may change the action while preserving variable, invariant,
  epistemic purpose, and boundary.

## 6. Quiet scholarship contract

“Quiet scholarship” means that rigor and traceability remain available without
turning every qualification into a competing headline.

### Evidence

- **Scholarly function:** Show what a source or study did, found, and can
  support.
- **Information that must survive:** Citation, source type, design when
  available, tested question, finding/contribution, and what the source did not
  test.
- **Primary epistemic risk:** A compatible result is promoted into proof of a
  whole theory, mechanism, neural implementation, or causal story.
- **Important distinctions:** Empirical study, process model, review, constructed
  teaching example, and Concept Lab synthesis are different evidence classes.
- **Desired reader understanding:** Evidence is bounded by method and measure.
- **Non-loss:** `design`, `tested`, `found`, and `notTested` need accessible
  equivalents in condensed views.

### Scope

- **Scholarly function:** State what a record explains and where it stops.
- **Information that must survive:** `explains` and `stops` lists and the
  qualification that the record is not a complete theory of its wider domain.
- **Primary epistemic risk:** A powerful lens becomes an encyclopedia, universal
  law, or complete causal account.
- **Important distinctions:** Gestalt is not all music cognition; Tonal
  Hierarchy is not complete key finding; Predictive Processing is not all music
  or all neural computation; ITPRA is not a complete emotion theory.
- **Desired reader understanding:** Stopping points are part of record identity.
- **Non-loss:** Scope cannot depend on optional expansion or interaction
  completion.

### Limitations

- **Scholarly function:** Keep uncertainty, under-specification, construct
  boundaries, and criticism attached to the claims they qualify.
- **Information that must survive:** `qualifications`,
  `oversimplifications`, critical review boundaries, and local `?` notes.
- **Primary epistemic risk:** A clean explanatory arc erases contested
  mechanisms, context dependence, material/task limits, or evidence gaps.
- **Important distinctions:** “Not established” is not “false”; “constructed”
  is not “weak”; “influential” is not “settled.”
- **Desired reader understanding:** Carefulness reflects complexity, not an
  unfinished record.
- **Non-loss:** Shortening wording must not remove the qualification that
  changes the permissible inference.

### Provenance

- **Scholarly function:** Show responsibility for every claim-like unit.
- **Information that must survive:** The meanings of `●`, `■`, `▲`, `✦`, and
  `?`, plus the note explaining what each mark covers.
- **Primary epistemic risk:** A teaching device or editorial synthesis is
  mistaken for a source-authored diagram, primary finding, or measurement.
- **Important distinctions:** Source-grounded theory, empirical finding,
  constructed example, editorial synthesis, unresolved question.
- **Desired reader understanding:** The platform is explicit about where its
  voice enters the record.
- **Non-loss:** Provenance cannot be encoded by colour alone or omitted from
  compact, mobile, or linear versions.

### Sources

- **Scholarly function:** Provide an actionable reading threshold and fuller
  trail.
- **Information that must survive:** Citation, contribution, DOI where recorded,
  minimum-reading label, and access to the full source list.
- **Primary epistemic risk:** A short list is mistaken for exhaustive scholarship,
  or a citation is shown without its responsibility.
- **Important distinctions:** Minimum reading, full trail, historical origin,
  review, and evidence source.
- **Desired reader understanding:** Each source has a defined responsibility.
- **Non-loss:** Contribution notes cannot be removed or collapsed into
  undifferentiated references.

### References

- **Scholarly function:** Situate the record in an intellectual neighbourhood
  without making neighbours interchangeable.
- **Information that must survive:** Related-record title, relation
  type/direction, body explanation, route, and relation provenance where
  available.
- **Primary epistemic risk:** “Related” becomes “same as,” or an editorial
  bridge is mistaken for a historical/source-grounded relation.
- **Important distinctions:** Complements, contrasts, bridges, informs,
  formalises, extends, and computationally implements.
- **Desired reader understanding:** A relation explains how records can be read
  together and what question remains distinct.
- **Non-loss:** Typed relations cannot be replaced by generic recommendations.

The acceptance test is that a reader can answer, without operating a control:
what kind of record this is, what it explains, what evidence tested and did not
test, which statements are source claims/teaching constructions/editorial
synthesis, where the record stops, what remains unresolved, and what to read
next and why it is related.

## 7. Four theory manifests

### 7.1 Gestalt Principles in Music

#### Identity

- Record kind: `theory`
- Knowledge form: `perceptual-tradition`
- Qualifier: `Principle family`
- Discipline: `music-psych`
- Branch: `perception-organisation`
- Route: `/concept-lab/theory/gestalt-principles-in-music`
- Identity: a music-facing teaching record borrowing a broad Gestalt tradition
  without treating it as one unified music-specific causal theory.

#### Core intellectual problem

Why do separate musical events become groups, boundaries, figures, and larger
wholes rather than isolated atoms? How do temporal, similarity, continuation,
and configurational relations influence experienced organisation?

#### Central claim and mechanism

Musical events can become perceptual groups and larger wholes through
interacting, graded, context-sensitive cues rather than a deterministic list of
five laws with universal thresholds.

`events + relations → candidate organisations → cue reinforcement/competition →
preferred, unstable, or ambiguous grouping → groups of groups`

Context, past experience, attention, and musical structure influence the
organisation. These are not late stages after a fixed grouping result.

#### Concepts and distinctions

Primary concepts are sensory events; grouping, figure, whole, part, and
candidate boundary; proximity and similarity; continuation and closure; cue
reinforcement, cue competition, and ambiguity; Prägnanz as a historical
ambition/problem; local groups becoming groups of groups; GTTM preference rules;
and experience/cultural history as a boundary on fixed accounts.

Keep distinct:

- Gestalt grouping versus Auditory Scene Analysis.
- Gestalt grouping versus Meyer’s expectancy/affect account.
- Closure versus tonic resolution, cadence, expectancy fulfilment, or emotion.
- Good continuation as organisation of an unfolding pattern versus musical
  expectation.
- Later GTTM formalisation versus content already present in Wertheimer.
- Deliège and Frankland & Cohen’s tests of GTTM predictions versus direct
  validation of classical Gestalt.
- Experience-sensitive grouping versus the claim that all grouping is learned
  or that no tendency is universal.

#### Tensions, temporality, and hierarchy

The smallest useful time scale is the relation among successive events and a
candidate local boundary. Organisations can extend from events to groups,
motives, phrases, and larger sections, but no local cue explains complete
musical form. Cue X and cue Y can reinforce, compete, or leave ambiguity; the
whole constrains a part’s role while local cues contribute to the whole.

#### Evidence boundaries and limitations

| Evidence | Supports | Does not establish |
| --- | --- | --- |
| Wertheimer and classical tradition | Historical grouping problem, proximity, similarity, auditory extension, whole–part organisation. | A fixed modern law list or complete music theory. |
| Deliège (1987) | Uneven correspondence between later GTTM grouping-rule predictions and listener segmentation; need for additional principles. | Direct classical Gestalt validation or universal law list. |
| Frankland & Cohen (2004) | Rest and Attack-point more useful than Register-change and Length-change in tested materials. | Equal rule contribution, universal proximity dominance, or direct Gestalt validation. |
| Iversen, Patel & Ohgushi (2008) | Some rhythmic grouping preferences differ across listener groups and may reflect experience. | Language as sole cause or complete learned/innate account. |
| Constructed audio | Makes temporal/register cue competition discussable. | A perceptual experiment, historical replication, or listener score. |

Scope includes local grouping, candidate boundaries, temporal/similarity cues,
continuation, aspects of closure, competing organisations, part–whole
relations, and foundations for later grouping theories. It stops at complete
musical grammar, tonality, expectancy, affect, source recovery, whole-piece
analysis, one objectively correct segmentation, and universal thresholds.

Common oversimplifications to block: exactly five laws; proximity always
determines boundaries; similarity means same pitch; Prägnanz always chooses the
simplest interpretation; all listeners segment identically; and later GTTM
studies proved classical Gestalt.

#### Related theories and source responsibility

The record distinguishes Gestalt from ASA, Meyer, Tonal Hierarchy, and GTTM.
Its source responsibilities are distributed across Wertheimer, Koffka,
Wagemans, Meyer, GTTM, Deliège, Frankland & Cohen, and Iversen et al.; no one
author owns the final Concept Lab synthesis.

Provenance: `●` historical/theoretical claims; `■` bounded empirical findings;
`▲` original synthetic audio; `✦` teaching model/evidence arrangement/relations;
`?` Prägnanz, cue weights, universality/learning, variation, and transfer.

#### Interaction responsibility and redesign survival

The boundary comparison changes temporal spacing while holding documented notes
and controls constant. The cue-conflict comparison isolates time, register, and
their conflict. The purpose is to make relational organisation noticeable, not
to classify perception.

Survive: the whole–part claim; proximity, similarity, continuation, closure,
and cue competition; ambiguity; event → group → group-of-groups; distinctions
from neighbouring theories; evidence X-rays and not-tested fields;
experience/culture boundary; construction labels and constants; scope,
qualifications, sources, relations, and provenance.

May be redesigned later: exact audio encoding, preset labels, section order,
and the representation of whole–part cases, provided semantic boundaries remain.

### 7.2 Tonal Hierarchy

#### Identity

- Record kind: `theory`
- Knowledge form: `framework`
- Qualifier: `Empirical cognitive / representational programme`
- Discipline: `music-psych`
- Branch: `musical-structure-grammar`
- Route: `/concept-lab/theory/tonal-hierarchy`
- Identity: a context-dependent framework for pitch judgments, tonal stability,
  key similarity, and changing tonal organisation—not a complete causal theory
  of key detection.

#### Core intellectual problem

Which pitch feels like tonal home in a context, and how does the same physical
pitch change role when surrounding context changes? What do probe-tone
judgments/psychological representations measure, and what remains unexplained
about key finding over time?

#### Central claim and mechanism

Tonal function and stability are relational properties of pitch-in-context.
Probe-tone and related judgments reveal structured differences among tonic,
tonic-triad, other diatonic, and nondiatonic relations while retaining pitch
height and chroma/octave-equivalence dimensions.

`tonal context → probe tone → fit/completion judgment → repeat across pitch
classes → empirical profile → inference about tonal organisation`

This is a measurement-to-interpretation chain, not a complete cognitive
process. A more abstract relation is `pitch × current context → tonal
role/relative stability`; new chords change the balance among interpretations.

#### Concepts and distinctions

Concepts include tonal context, tonic, diatonic/nondiatonic collection,
tonic-triad membership, probe-tone fit, profile versus psychological
interpretation, pitch height, chroma, major/minor profiles, key neighbourhoods,
circle-of-fifths/relative/parallel relations, toroidal psychological space,
dynamic organisation, exposure, distribution, development, culture, and
profile versus process.

Keep distinct: fit from liking; profile from physical pitch; tonal stability
from next-event probability; tonal hierarchy from frequency counts; toroidal
psychological representation from literal neural map; Western major/minor from
universal cognition; observed development from innate staircase; and profile
from complete key-finding process.

#### Tensions, temporality, and hierarchy

The record moves from local context/probe to pitch hierarchy, key relations, and
dynamic change. It is not one vertical scale: height, chroma, function,
neighbourhood, learning history, and culture intersect. Earlier context remains
relevant as new chords strengthen, weaken, or replace interpretations.

#### Evidence boundaries and limitations

| Evidence | Supports | Boundary |
| --- | --- | --- |
| Krumhansl & Shepard (1979) | Context-dependent completion judgments reflecting pitch height, octave equivalence, and tonal function. | Not liking, universal next-note probability, or complete key finding. |
| Krumhansl (1979) | Psychological pitch organisation beyond physical frequency distance. | Not literal neural geometry or one key-detection process. |
| Krumhansl & Kessler (1982) | Profile similarity, key relations, dynamic organisation, and four-dimensional toroidal representation. | Not a literal brain map or fixed profile. |
| Krumhansl & Keil (1982) | Developmental differentiation among scale, tonic-triad, and other tones. | Not an innate universal stage model or adult-task replication. |
| Castellano, Bharucha & Krumhansl (1984) | Immediate context and culturally specific rag/thāṭ relations. | Not universal Western hierarchy or a complete culture model. |
| Butler (1989) | Profile/process and task-interpretation critique. | Does not reject contextual tonal organisation. |
| Temperley & Marvin (2008) | Distribution supports above-chance key identification but is insufficient alone. | Tonal hierarchy is not frequency count. |
| Constructed lab | Context/probe/rating/profile logic and same-note comparison. | Not exact replication or diagnosis. |

Scope includes context-dependent pitch fit, relative stability, tonic centrality,
tonal-function differentiation, psychological pitch relations, profiles, key
similarity, and dynamic organisation. It stops at all melody/harmony,
expectation, emotion/preference, universal tonality, complete key finding, and
literal neural geometry.

#### Common oversimplifications, related theories, and source responsibility

Block: tonic equals most pleasant; ratings equal liking; stability equals
expectancy; profile is a physical-pitch property; Western hierarchy is
universal; torus is literal brain space; profile equals frequency; profile
completely explains key finding; Tonal Hierarchy equals Meyer.

The record relates to Meyer through temporal implication, to ASA through
perceptual organisation, and to the distinction between local pitch function
and stream organisation. Provenance is `●` framework/findings; `■` faithful
explanation; `▲` constructed C-major/probe/rating/context comparisons; `✦`
teaching synthesis and Atlas relations; `?` exact values, learning,
development, culture, and complete key finding.

#### Interaction responsibility and redesign survival

The probe lab changes probe and optionally accepts a local fit rating. The
same-note comparison holds physical C4, register, timbre, loudness, context
length, delay, and duration constant while context changes. The key-space view
changes representational level. These teach contextual dependence and
measurement logic, not ability or a published profile.

Survive: pitch × context → function; judgment/profile/interpretation levels;
qualitative hierarchy without invented exact values; height/chroma/function;
key neighbourhood/non-literal torus; dynamic updating; developmental and
cross-cultural limits; profile ≠ process; evidence fields; scope, sources,
relations, qualifications, oversimplifications, provenance.

May be redesigned later: synthetic audio, probe selection, rating method,
progressive key-space sequence, and section order if constants/fallbacks and
boundaries remain explicit.

### 7.3 Predictive Processing in Music

#### Identity

- Record kind: `theory`
- Knowledge form: `framework`
- Qualifier: `Integrative predictive theory family`
- Discipline: `music-psych`
- Branch: `expectation-prediction`
- Route: `/concept-lab/theory/predictive-processing-in-music`
- Identity: a broad predictive framework applied to music cognition, not a
  single next-note model, fixed cortical map, or complete explanation of music.

#### Core intellectual problem

How can music perception be understood as interaction among generative
hypotheses, sensory input, mismatch, uncertainty, precision, learning,
attention, and possible action? Which parts are evidence-supported and which
remain theoretical proposals?

#### Central claim and mechanism

Perception can be modelled as interaction between predictions about hidden or
lower-level states and sensory evidence. Prediction error can inform inference,
attention, learning, or revision; precision changes the influence of mismatch.
No single fixed cortical or musical hierarchy is established.

`learned experience + current context → generative model → prediction ↔ actual
input → prediction error × estimated precision → update / attention / action →
new predictions`

This is Concept Lab synthesis, not a literal cortical circuit. Direction is
meaningful; musical-level anatomy is not fixed.

#### Concepts and distinctions

Concepts include PP, predictive coding, PCM, generative/latent causes,
top-down prediction, lower-level state, prediction error, precision,
first-order content, second-order precision, attention, omission, levels and
timescales, active inference, PCM history, expertise, learning, culture, and
the IDyOM boundary.

Keep distinct: PP from next-note guessing; generative model from generative AI;
prediction error from IDyOM information content; entropy from precision;
precision from conscious confidence; attention from proven precision identity;
neural signals from prediction error by definition; PCM from all PP; and zero
error from maximum pleasure.

#### Tensions, temporality, and hierarchy

Prediction may concern future events or expected sensory activity under a
current hypothesis. Explanatory levels range from fast/local acoustic feature,
onset, pitch, and rhythm through meter, melody, harmony, phrase, and style.
Updates recur, and context, experience, culture, and attention modulate the
interpretation rather than forming one late stage.

#### Evidence boundaries and limitations

| Evidence | Supports | Boundary |
| --- | --- | --- |
| Vuust et al. (2009) | Rhythmic incongruity and expertise differences in MMNm/P3am responses. | Not complete circuitry, a precision parameter, or causal training. |
| Ishida, Ishida & Nittono (2024) | Omission-period information about expected-note identity and familiarity differences. | Not full-architecture proof or uniquely identified pure prediction error; melodies differed in more than melody. |
| Rohrmeier & Koelsch (2012) | Prediction is not equally specified across feature, temporal, polyphonic, formal, and higher-order levels. | Not rejection of prediction accounts. |
| Koelsch, Vuust & Friston (2019) | Content prediction, precision prediction, attention, and active listening account. | Theoretical, not complete mechanistic validation. |
| Vuust et al. (2022) and cross-cultural exchange | Expanded PCM and history/culture of priors. | Cross-cultural validity remains unsettled. |
| Furutachi & Hofer (2026) | Need for stronger mechanistic discrimination and careful signal interpretation. | Does not debunk PP. |
| Constructed interactions | Same deviation under different uncertainty and predicted event versus silence. | No neural measurement, diagnosis, or published replication. |

Scope includes context-sensitive perception, expectation, sensory prediction,
violation responses, uncertainty, learning, attention, rhythm/meter, some
groove, expertise, omission, and perception–action coupling. It stops at a
complete account of all music, emotion, reward, aesthetics, culture, social
interaction, creativity, or every neural computation.

#### Common oversimplifications, related theories, and source responsibility

Block PP as next-note guessing, generative AI, conscious surprise, dislike,
IDyOM entropy, attention itself, signal identity, one PCM founder, or a complete
account of music/pleasure. Related records include Statistical Learning as a
learning bridge, IDyOM as a contrasting computational model, Huron as a
response-cycle lens, Meyer as meaning/affect, Narmour as local implication,
Tonal Hierarchy as context-sensitive pitch organisation, Gestalt as perceptual
organisation, and GTTM as structural formalisation.

Provenance is `●` model/history; `■` bounded findings/explanation; `▲`
constructed precision/omission examples; `✦` model arrangement/final synthesis;
`?` cortical implementation, signal interpretation, precision/attention,
cross-cultural generalisation, active inference, and scope.

#### Interaction responsibility and redesign survival

The precision comparison holds target, pitch, duration, timbre, gain, and
displacement constant while changing the constructed uncertainty envelope. The
omission comparison holds preceding beat pattern and expected onset constant
while changing whether the event arrives. Purpose: make model-relative mismatch
and weighting discussable, not infer neural activity.

Survive: PP/predictive-coding/PCM boundary; generative model/prediction/input/
error/precision/update loop; content versus precision; omission; hierarchy
qualification; IDyOM and neural-signal boundaries; expertise, culture, active
inference qualifications; evidence X-rays; 2026 critical status; scope,
sources, relations, qualifications, oversimplifications, provenance.

May be redesigned later: Gaussian values, control labels, message-passing
arrangement, audio/omission metaphor, and final model arrangement, if variable,
invariant, and non-inference contract remain explicit.

### 7.4 Huron’s ITPRA Theory of Expectation

#### Identity

- Record kind: `theory`
- Knowledge form: `theory`
- Qualifier: `Integrative functional response framework`
- Discipline: `music-psych`
- Branch: `expectation-prediction`
- Route: `/concept-lab/theory/hurons-itpra-theory-of-expectation`
- Identity: a functional and temporal vocabulary for distinct response systems
  around anticipated musical outcomes.

#### Core intellectual problem

What happens before an expected event, at arrival, and after interpretation?
How can anticipation, preparation, prediction, immediate reaction, and slower
appraisal coexist without becoming one feeling or a rigid sequence?

#### Central claim and mechanism

Huron proposes five functionally distinct systems: Imagination, Tension,
Prediction, Reaction, and Appraisal. They have different temporal positions and
functions; Prediction and Reaction can begin in parallel after onset; Appraisal
is slower and contextual. The acronym is not a mandatory `I → T → P → R → A`
algorithm.

`expectation sources → pre-outcome imagination/tension → outcome onset →
prediction ∥ reaction → slower/recurring appraisal`

Later appraisal can confirm, revise, or reverse earlier response. Expectation
sources are parallel to the response timeline, not four stages before
Imagination.

#### Concepts and distinctions

Imagination concerns possible futures, motivation, and deferred gratification;
Tension concerns preparation as uncertainty, importance, and imminence change;
Prediction evaluates accuracy after onset; Reaction is a rapid conservative
response; Appraisal is broader, slower, revisable evaluation. Also preserve
outcome onset, contrastive valence, the four expectation sources, source
concurrence/conflict, expectation, surprise, affect, learning, and context.

Keep distinct: prior prediction from after-onset Prediction Response;
Prediction/Reaction parallelism from sequence; Tension Response from harmonic
dissonance/GTTM tension; Appraisal from liking; expected from pleasant;
contrastive valence from universal pleasure; expectancy evidence from proof of
five isolated modules; and ITPRA from PP, IDyOM, complete learning, or emotion
theory.

#### Tensions, temporality, and hierarchy

Imagination reaches far back; Tension approaches the hinge; Prediction and
Reaction begin together after onset; Appraisal is slower and recurring. This is
functional and approximate, not a fixed neural hierarchy.

#### Evidence boundaries and limitations

| Evidence | Supports | Boundary |
| --- | --- | --- |
| Huron (2006) | Five response systems, functions, expectation sources, prediction effect, contrastive valence. | Not five isolated physiological modules or complete computable emotion model. |
| Steinbeis, Koelsch & Sloboda (2006) | Subjective, physiological, and neural consequences of harmonic expectancy events. | Not direct five-system or full contrastive-valence test. |
| Koelsch et al. (2008) | ERP and skin-conductance differences for unexpected chords. | Not direct five-system demonstration. |
| Pearce (2018) | Learned regularities and probabilistic prediction bridge exposure to expectation. | Not complete ITPRA or one-to-one system mapping. |
| Cheung et al. (2019) | Nonlinear uncertainty/surprise/pleasure/brain-activity relationship. | Not direct test of Huron sequence or separate P/R/A. |
| Aversa (2009) | Boundary against treating expectation as the only pleasure route. | Not a primary ITPRA test. |
| Constructed timing/lens examples | Distinguish timing, onset, and functional questions with a fixed safe event. | No physiological, emotional, or individual-state measurement. |

Scope includes anticipation/preparation, predictive success/failure, parallel
immediate response questions, slower appraisal, mixed valence, expectation
sources, and links among structure, learning, expectation, and affect. It stops
at complete emotion/neural/learning theories, exact prediction for every
listener, universal musical pleasure, validation of five modules, or a
replacement for PP/IDyOM.

#### Common oversimplifications, related theories, and source responsibility

Block a rigid ITPRA sequence, Prediction Response as prediction, P/R sequence,
Tension as musical dissonance, Appraisal as liking, expected = pleasant,
unexpected = unpleasant, contrastive valence as universal, source categories as
stages, evidence as five-system validation, and ITPRA as PP/IDyOM/complete
learning/emotion theory.

Related records distinguish Meyer’s expectation/affect tradition, Narmour’s
local melodic implication, and GTTM structural hierarchy. The record also
explicitly says ITPRA is not PP or IDyOM. Provenance is `●` Huron proposals;
`■` empirical/review evidence; `▲` timing/fixed-event/lens examples; `✦`
outcome-centred timeline/source layer/final architecture; `?` physiological
independence, operationalisation, contrastive valence, and universality.

#### Interaction responsibility and redesign survival

The timing example changes outcome onset while holding musical outcome/context
constant. The fixed-event lens switch changes only the interpretive question.
Purpose: make temporal and functional distinctions visible, not measure tension,
reaction, appraisal, reinforcement, or physiology.

Survive: five response functions and jobs; outcome hinge; P/R parallelism;
slower revisable Appraisal; concurrent/conflicting source layer; qualified
contrastive valence; source-specific evidence and non-tests; distinctions from
Meyer, Narmour, GTTM, PP, and IDyOM; scope, sources, relations,
qualifications, oversimplifications, provenance.

May be redesigned later: timeline representation, safe stimulus, timing values,
lens control, source-channel arrangement, and section ordering if the temporal
hinge, parallelism, source layer, and non-inference boundary remain clear.

## 8. Four conceptual geometries

The following are abstract knowledge geometries, not drawing briefs.

### 8.1 Gestalt Principles in Music

- **Primary structure:** `events → candidate organisations → grouping / boundary / figure`.
- **Relationality:** Meaning lies in temporal proximity, multidimensional
  similarity, continuation, and surrounding configuration; the same event can
  have different roles in different organisations.
- **Hierarchy:** `event → local group/motive → phrase → larger section`; possible
  and defeasible, not a complete-form explanation.
- **Temporality/recurrence:** Spacing creates candidate boundaries;
  continuation preserves or changes organisation; groups can recur or become
  larger groups.
- **Feedback/mutual constraint:** The whole constrains a part’s role while
  local cues contribute to the experienced whole.
- **Ambiguity/conflict:** `cue X + cue Y → reinforcement | competition | unresolved ambiguity`.
- **Context:** Material, surrounding pattern, experience, attention, and
  musical structure matter; culture/experience is a boundary condition.
- **Core transformation:** Separate sensory events become related perceptual
  units; a part’s role changes with its containing organisation.
- **Core relational problem:** How can multiple events form a coherent or
  competing whole without assuming one correct boundary?
- **Invariant:** Preserve cue competition, gradedness, part–whole dependence,
  hierarchy, and grouping/expectancy distinction.

#### STYLE-NEUTRALITY CHECK

No colour, named palette, font, typography decision, page layout, UI component,
animation style, border, hero, sticky note, radial graphic, or current-production
visual convention is specified. The arrow notation is semantic relation syntax,
not an instruction to draw arrows. “Group,” “figure,” “boundary,” and “whole”
are theory concepts, not drawing primitives. “Groups of groups” is a hierarchy,
not a prescribed diagram.

### 8.2 Tonal Hierarchy

- **Primary structure:** `tonal context × pitch → contextual role / relative fit`.
- **Measurement path:** `context → probe → fit judgment → repeated profile → psychological inference`; not a complete mechanism.
- **Relationality:** A pitch’s function depends on context; one pitch can be
  tonic, tonic-triad, diatonic, or nondiatonic by context.
- **Dimensions:** tonic anchor, triad, diatonic, nondiatonic, pitch height,
  chroma/octave equivalence, and key similarity are intersecting dimensions.
- **Temporality/recurrence:** Successive chords update competing tonal
  interpretations; the profile is a representation boundary, not the whole
  process.
- **Feedback/update:** `new musical context ↔ updated tonal organisation`.
- **Ambiguity/conflict:** Competing regions can remain active; profile, local
  context, distribution, experience, and culture need not determine one result.
- **Context:** Immediate structure and learned/cultural organisation jointly
  matter; C major is not a universal default.
- **Core transformation:** An undifferentiated pitch becomes contextual tonal
  function; profiles relate into psychological key neighbourhoods.
- **Core relational problem:** How can tonal fit be represented without
  confusing it with liking, physical pitch, probability, or complete key finding?
- **Invariant:** Preserve judgment/profile/interpretation, held-probe context,
  non-literal key space, updating, and cultural/developmental limits.

#### STYLE-NEUTRALITY CHECK

No colour, named palette, font, typography decision, page layout, UI component,
animation style, border, hero, sticky note, radial graphic, or current-production
visual convention is specified. “Circle-of-fifths” and “toroidal” name
psychological/music-theoretic relations as the record does; they do not prescribe
a circle or torus graphic. “Key neighbourhood” and “map” refer to a conceptual
representation, not a page layout.

### 8.3 Predictive Processing in Music

- **Primary structure:** `experience + current context → generative model → prediction ↔ input`.
- **Error/weighting:** `prediction − input → mismatch × precision → inference / learning / attention / action`; the multiplication is a teaching abstraction, not a universal literal operation.
- **Relationality:** Meaning lies between expected state, actual input,
  uncertainty, and current hypothesis.
- **Hierarchy/timescale:** Fast/local acoustic feature, onset, pitch, rhythm;
  middle meter, melody, harmony; slower/higher phrase, style, learned context.
  These are explanatory levels, not anatomical destinations.
- **Temporality/recurrence:** Prediction precedes or accompanies input; mismatch
  informs update; updated model generates further predictions; omission is
  predicted event versus actual silence.
- **Feedback/active sampling:** `update → new predictions`; attention/action may
  alter sampled or weighted input; active inference remains subordinate.
- **Ambiguity/conflict:** The same deviation can have different influence under
  different uncertainty; compatible signals can have multiple interpretations.
- **Context:** Experience, expertise, culture, musical history, and active
  listening shape priors and precision.
- **Core transformation:** Sensory events become evidence relative to a
  generative hypothesis; mismatch can update the hypothesis.
- **Core relational problem:** How can prediction, mismatch, and precision be
  explanatory without making every measured response uniquely diagnostic?
- **Invariant:** Preserve PP/predictive-coding/PCM boundaries,
  error-versus-precision, omission, hierarchy qualification, IDyOM distinction,
  signal limits, and contested mechanistic status.

#### STYLE-NEUTRALITY CHECK

No colour, named palette, font, typography decision, page layout, UI component,
animation style, border, hero, sticky note, radial graphic, or current-production
visual convention is specified. “Direction,” “level,” “loop,” and “message
passing” describe semantic relations. The arrows and loop notation are abstract
relations, not prescribed graphics.

### 8.4 Huron’s ITPRA Theory of Expectation

- **Primary structure:** `expectation sources → pre-outcome preparation → outcome hinge → post-outcome parallel questions → slower appraisal`.
- **Relationality:** One outcome can be evaluated for predictive accuracy,
  immediate functional response, and broader significance; these are distinct
  questions, not one scalar feeling.
- **Temporality:** Imagination reaches back; Tension approaches the outcome;
  Prediction and Reaction begin together after onset; Appraisal extends later
  and can recur.
- **Feedback/revision:** `later context → appraisal → confirm / revise / reverse earlier interpretation`.
- **Ambiguity/conflict:** Expectation sources can be concurrent and conflict;
  initial predictive/reactive valence can differ from later appraisal.
- **Context:** Social, environmental, personal, musical, stylistic, dynamic,
  and conscious knowledge can contribute.
- **Core transformation:** One anticipated outcome becomes multiple functional
  questions across time.
- **Core relational problem:** How can expectation contain different timescales
  and functions without becoming one feeling or five overclaimed modules?
- **Invariant:** Preserve outcome hinge, P/R parallelism, slower Appraisal,
  source layer, qualified contrastive valence, and theory/evidence/construction
  distinction.

#### STYLE-NEUTRALITY CHECK

No colour, named palette, font, typography decision, page layout, UI component,
animation style, border, hero, sticky note, radial graphic, or current-production
visual convention is specified. “Hinge,” “parallel,” “tail,” and “source layer”
are temporal/relational concepts, not instructions for a particular diagram.
The arrow notation is semantic sequence/revision notation.

## 9. Content survival checklist

### Record identity

- [ ] Title, hook, one-sentence identity, discipline, kind, knowledge form, and
      branch remain accurate.
- [ ] The record is not relabelled as a study, method, or mechanism for
      convenience.
- [ ] Route and registry identity remain stable.
- [ ] Related-record links resolve and preserve relation direction/provenance.

### Knowledge structure

- [ ] Core problem and central claim are explicit.
- [ ] Primary concepts remain distinct rather than merged into a slogan.
- [ ] Mechanisms/relationships are represented at the level the source
      supports.
- [ ] Important distinctions and neighbouring theories remain available.
- [ ] Temporal, hierarchical, feedback, recurrence, context, conflict, and
      ambiguity relations are not flattened when they are load-bearing.

### Evidence and scholarship

- [ ] Every evidence item retains citation and source type.
- [ ] Study evidence keeps question/design/evidence/result/claim/limitation
      together.
- [ ] `tested`, `found`, and `notTested` remain distinct.
- [ ] Source contribution notes remain attached to citations.
- [ ] Minimum reading and full source trail remain distinguishable.
- [ ] Scope and stopping points remain visible.
- [ ] Oversimplifications and qualifications remain discoverable.
- [ ] Provenance glyphs `●`, `■`, `▲`, `✦`, and `?` remain explained.
- [ ] No colour-only or interaction-only encoding carries epistemic status.

### Interaction integrity

- [ ] Every control has a stated action, variable, invariant, purpose, and
      non-inference boundary.
- [ ] Constructed examples remain labelled as constructed.
- [ ] Audio or comparison controls disclose the relevant constants and
      manipulation.
- [ ] Optional learner ratings remain learner-generated and non-diagnostic.
- [ ] A text/static fallback contains the same claim and boundary.
- [ ] Controls are keyboard-operable, touch-operable, named, and stateful.
- [ ] Reduced motion does not remove the semantic result.

### Accessibility and resilience

- [ ] Semantic HTML and headings preserve the knowledge hierarchy.
- [ ] Every non-text interaction has a meaningful text alternative.
- [ ] Visible focus and keyboard equivalence exist.
- [ ] No essential explanation depends on hover, colour, audio, or animation.
- [ ] Narrow layouts preserve content order and do not introduce horizontal
      overflow.
- [ ] Active contents tracking remains equivalent to the actual section order.

### Verification boundary

- [ ] Route, metadata, registry, internal links, provenance, sources, and
      contents headings are checked.
- [ ] Existing lint/tests are run when production content or runtime changes.
- [ ] A docs-only semantic handoff does not trigger deployment or alter runtime
      behaviour.
- [ ] Human review resolves open semantic questions before visual exploration
      treats them as settled.

## 10. Open questions

The following classifications do not resolve any question. They identify what
kind of review decision each item appears to require.

### Cross-project questions

| Item | Classification | Why |
| --- | --- | --- |
| Which typed record fields should become first-class semantic blocks rather than remain nested in a theory payload? | F — uncertain classification | It concerns both canonical information architecture and future content-model design; the semantic/presentation boundary is not yet settled. |
| Should `conceptualStatus` and evidence X-rays be a shared scholarly layer for all framework-like records or remain kind-specific? | A — likely canonical semantic content | It concerns evidence and scholarly meaning, although the implementation location remains open. |
| Which relations are sufficiently source-grounded for stronger treatment than editorial synthesis or proposed bridge? | E — unresolved academic/source question | The answer depends on source responsibility and historical/theoretical evidence, not presentation preference. |
| If `relatedTo` prose and Atlas relation metadata overlap, which layer is authoritative if they diverge? | B — interaction / functional contract | It governs how the platform resolves and explains record relationships to readers. |
| Should a future content model store the abstract final model separately from its current body component? | F — uncertain classification | The material is editorial synthesis now, but may become canonical semantic content after human review. |
| Which exact citations and numerical claims require direct primary-source verification? | E — unresolved academic/source question | It requires source checking, not a design decision. |

### Gestalt questions

| Item | Classification | Why |
| --- | --- | --- |
| What precise meaning of Prägnanz should be retained beyond a historical problem? | E — unresolved academic/source question | It concerns interpretation and historical/theoretical fidelity. |
| Which grouping tendencies are general across materials/listeners versus material/task-dependent? | E — unresolved academic/source question | It is an empirical generalisation question. |
| How should classical Gestalt, musical grouping, ASA, Meyer, and GTTM be related without implying one progression? | E — unresolved academic/source question | It concerns intellectual history and theory boundaries. |
| How much listener variation is attributable to experience, culture, task, material, or other factors? | E — unresolved academic/source question | It requires evidence interpretation and cannot be resolved by presentation. |

### Tonal Hierarchy questions

| Item | Classification | Why |
| --- | --- | --- |
| Which exact empirical profile values are safe to display after verification? | E — unresolved academic/source question | It depends on primary-source verification and measurement fidelity. |
| What process connects a profile-like representation to key recognition over time? | E — unresolved academic/source question | It is the framework’s central profile/process limitation. |
| How should developmental findings be described without creating a universal sequence? | E — unresolved academic/source question | It concerns generalisation from developmental evidence. |
| Which cross-cultural effects are immediate-context effects versus learned cultural relations? | E — unresolved academic/source question | It requires empirical and cultural interpretation. |
| How should distributional learning relate to, but remain distinct from, tonal hierarchy? | E — unresolved academic/source question | It concerns theory relation and evidence scope. |

### Predictive Processing questions

| Item | Classification | Why |
| --- | --- | --- |
| What evidence would distinguish predictive-processing computations from other explanations of MMN/MMNm, ERAN, P3, or omission responses? | E — unresolved academic/source question | It is a mechanistic evidence question. |
| How should precision, attention, uncertainty, and IDyOM quantities be mapped without treating them as synonyms? | E — unresolved academic/source question | It concerns construct validity and theory boundaries. |
| Which musical levels are explanatory conveniences versus empirically specified model levels? | E — unresolved academic/source question | It concerns the evidential status of the proposed hierarchy. |
| What would count as mechanistic support for PCM beyond compatible responses? | E — unresolved academic/source question | It asks for a stronger evidential standard. |
| How should the cross-cultural exchange be represented while validity remains unsettled? | E — unresolved academic/source question | The content is an unresolved scholarly exchange, not a UI choice. |
| Which active-inference claims deserve inclusion without replacing the narrower focus? | F — uncertain classification | It combines scholarly scope with an editorial inclusion decision; neither authority is settled. |

### Huron ITPRA questions

| Item | Classification | Why |
| --- | --- | --- |
| Can the five systems be operationalised/distinguished without assuming five independent physiological modules? | E — unresolved academic/source question | It concerns the theory’s mechanistic and empirical status. |
| What evidence would directly test contrastive valence rather than only surprise/pleasure nonlinearity? | E — unresolved academic/source question | It requires an evidence design and construct distinction. |
| How do schematic, veridical, dynamic, and conscious expectation sources interact in a particular event? | E — unresolved academic/source question | It is a theory/process question. |
| How should adaptive proposals be presented relative to empirical evidence? | E — unresolved academic/source question | It concerns attribution and evidential status. |
| Which parts of the temporal architecture are approximate functional timing versus independently evidenced? | E — unresolved academic/source question | It requires temporal evidence review. |

### Component-only material listed in the handoff

These are not promoted to canonical authority by appearing in a component.

| Item | Classification | Why |
| --- | --- | --- |
| Gestalt final synthesis wording in `GestaltBody.tsx` | D — presentation-only microcopy | It is explicitly marked as editorial synthesis in a body component and is not a typed record field. |
| Gestalt continuation bridge between Gestalt and Meyer | D — presentation-only microcopy | It is a useful editorial distinction currently embedded in presentation logic. |
| Tonal measurement flow and final synthesis wording | D — presentation-only microcopy | It is a component-level arrangement of concepts already partly represented in content. |
| Tonal key-space fuller explanation of the torus boundary | D — presentation-only microcopy | The boundary exists in record content; the fuller wording is component-only. |
| Tonal profile group labels and process contrast microcopy | D — presentation-only microcopy | These are teaching labels in the current renderer, not independent source claims. |
| Predictive message-passing motif and caption | D — presentation-only microcopy | It is labelled a simplified Concept Lab representation; its source boundary must be retained but its current wording is not canonical authority. |
| Predictive final loop line | D — presentation-only microcopy | It is editorial loop wording alongside typed final-model nodes. |
| Predictive final-model scope strings | D — presentation-only microcopy | They are hard-coded renderer summaries that must be checked against canonical content before promotion. |
| Huron timeline and final-model accessibility summaries | C — accessibility requirement | They encode a semantic text alternative and therefore must survive equivalently, while not replacing the typed payload. |
| Generic “read this record as” / “a separate record” framing | B — interaction / functional contract | It orients the reader among record kinds and related records, but is not theory content. |

### Human-review gate items

The gate asks a reviewer to approve the four identities/geometries, checklist,
component-only promotion decisions, intentionally unresolved questions, and the
rule that visual references have no academic authority. These are **F —
uncertain classification** as a group: they are review decisions spanning
semantic authority, functional contract, and presentation boundary rather than
new academic claims.

## 11. Style-leakage audit

This audit covers the existing Phase A handoff documents, not the excluded
desktop reference-image folder. The search found no instruction to adopt a
palette, named colour system, font, typography, sticky-note treatment, border
system, hero structure, radial graphic, column arrangement, left/right layout,
or animation style.

### Questionable cases and classification

| Location / phrase | Audit finding |
| --- | --- |
| `00-project-knowledge-architecture.md`: “page composition, design system, visual metaphor, animation language, palette, typography, card structure, or navigation layout” | **Semantic use / explicit deferral.** This is a list of decisions the package refuses to make, not a future prescription. “Card structure” is specifically quarantined. |
| `01-source-of-truth-map.md`: body-component names, `sketchnote.css`, `Sketch.tsx`, `TheoryPatterns.tsx`, `VisualAtlas.tsx`, `Reveal.tsx` | **Functional/source classification.** These names identify implementation sources to quarantine or inspect for behaviour; they are not requested as future components. |
| `01-source-of-truth-map.md`: “mobile fold-out fallback,” “responsive treatment,” and “surface treatment” | **Functional/accessibility use.** These describe current fallback obligations or sources to quarantine, not a redesign layout. |
| `02-scholarly-apparatus.md`: “source-authored diagram” and “visual” | **Semantic provenance use.** The phrases prevent a synthesis from being mistaken for source evidence; they do not prescribe a diagram. |
| `03-interaction-intents.md`: “component, gesture, layout, motion, or visual form” | **Explicit non-prescription.** The document says these are not being specified. |
| `04-quiet-scholarship-contract.md`: “colour alone,” “compact/mobile/linear,” and “source-authored diagram” | **Accessibility/provenance use.** Colour is mentioned only to prohibit colour-only meaning; compact/mobile/linear refer to graceful degradation; diagram refers to authorship, not shape. |
| Theory manifests: “local visual representation,” “section order,” “probe-button arrangement,” “rating control,” “progressive key-space step sequence,” “message-passing arrangement,” “final model arrangement,” “timeline representation,” “source-channel arrangement,” and “audio/omission metaphor” | **Explicit future freedom.** Each appears under optional/presentational content or as something that may change. None prescribes a particular arrangement. |
| Tonal manifest: “circle-of-fifths,” “toroidal,” “key neighbourhood,” and “map” | **Semantic use.** These name music-theoretic or psychological relations and explicitly deny a required circle/torus graphic or physical map. |
| Geometry files: arrow notation (`→`, `↔`, `∥`), “loop,” “tail,” “hinge,” “layer,” and “levels” | **Semantic use.** These express direction, recurrence, time, or relation. They are not instructions to draw arrows, loops, or layers. |
| `06-open-questions.md`: `FinalModel`, `MessagePassing`, `ResponseTimeline`, `RecordShell`, and other current component names | **Audit pointers only.** They identify where component-only wording lives so it can be reviewed; they are not future design requirements. |
| `README.md`: “future visual exploration” and “no palette, typography, layout, component styling, motion language, mockup, or visual reference” | **Boundary statement.** It explicitly excludes visual anchoring. |

### Explicitly absent prescriptions

No handoff document prescribes cards as a future structure, columns, left/right
placement, circles as a drawing primitive, arrows as a graphic device, radial
graphics, named colours, fonts, typography, sticky notes, borders, page heroes,
current diagram layouts, or named existing components as mandatory future UI.

The handoff does contain semantic terms that could be visually misread if
detached from their qualifications: “map,” “torus,” “circle-of-fifths,”
“timeline,” “message passing,” “loop,” “groups of groups,” “key space,” and
“source channels.” Their meanings are conceptual, mathematical, temporal, or
functional. They must not be treated as visual prescriptions without a later
human decision.

## 12. Semantic-completeness audit

Status vocabulary: **PRESERVED**, **PARTIAL**, **MISSING**, and **NOT
APPLICABLE**. Partial findings are not resolutions; they identify where human
review may need to compare the manifest with canonical `content/` records.

### Gestalt Principles in Music

| Requirement | Status | Review note |
| --- | --- | --- |
| Core intellectual question | PRESERVED | Grouping, boundary, whole, and part problem is explicit. |
| Central mechanism/framework | PRESERVED | Interacting proximity/similarity/continuation/configuration cues and grouping outcomes are explicit. |
| Qualifications | PRESERVED | Prägnanz, cue weights, universality, experience, and transfer are qualified. |
| Evidence | PRESERVED | Classical sources, GTTM-rule studies, experience evidence, and constructed audio are listed. |
| Evidence boundaries | PRESERVED | Direct Gestalt validation, universal law, listener score, and replication claims are blocked. |
| Scope | PRESERVED | Explains/stops boundary is explicit. |
| Limitations | PRESERVED | Material, task, listener, and historical limitations are retained. |
| Critiques | PARTIAL | Critical boundaries are present through evidence and qualifications, but no separate critique synthesis is stated; verify whether the later review needs explicit critical-source treatment. |
| Related-theory distinctions | PARTIAL | ASA, Meyer, Tonal Hierarchy, and GTTM are distinguished, but the canonical `relatedTo` explanatory prose is not reproduced in full here. |
| Teaching-construction status | PRESERVED | Audio constructions are labelled and bounded. |
| Interaction epistemic intent | PRESERVED | Variables, invariants, notice, and non-inference are explicit. |
| Provenance/source responsibility | PRESERVED | Glyph responsibilities and named source families are explicit. |

### Tonal Hierarchy

| Requirement | Status | Review note |
| --- | --- | --- |
| Core intellectual question | PRESERVED | Contextual home, probe judgments, and profile/process problem are explicit. |
| Central mechanism/framework | PRESERVED | Context × pitch and context → probe → profile → inference are explicit. |
| Qualifications | PRESERVED | Exact values, developmental stages, culture, and process are qualified. |
| Evidence | PRESERVED | Probe-tone, representation, key-space, developmental, cultural, critique, distribution, and constructed lab evidence are included. |
| Evidence boundaries | PRESERVED | Fit ≠ liking, torus ≠ neural map, and profile ≠ key-finding process are explicit. |
| Scope | PRESERVED | Explanatory domain and stopping points are explicit. |
| Limitations | PRESERVED | Profile/process and universal/cultural limits are included. |
| Critiques | PRESERVED | Butler’s critique and later process boundary are included. |
| Related-theory distinctions | PARTIAL | Meyer/ASA distinctions are named, but canonical related-link bodies are not reproduced in full. |
| Teaching-construction status | PRESERVED | C-major context, synthetic probes, ratings, and same-note comparison are bounded. |
| Interaction epistemic intent | PRESERVED | Held probe/context manipulation and non-diagnostic rating boundary are explicit. |
| Provenance/source responsibility | PRESERVED | Five glyph responsibilities are explicit. |

### Predictive Processing in Music

| Requirement | Status | Review note |
| --- | --- | --- |
| Core intellectual question | PRESERVED | Model, input, mismatch, uncertainty, precision, learning, attention, and action problem is explicit. |
| Central mechanism/framework | PRESERVED | Generative model/prediction/input/error/precision/update loop is explicit. |
| Qualifications | PRESERVED | PP/PCM/IDyOM, neural signals, hierarchy, culture, and active inference are qualified. |
| Evidence | PRESERVED | Vuust, Ishida, reviews, PCM synthesis, cross-cultural exchange, and constructed interactions are included. |
| Evidence boundaries | PRESERVED | Signal compatibility is not unique computation; no full architecture or causal training claim is inferred. |
| Scope | PRESERVED | Useful domain and stops are explicit. |
| Limitations | PRESERVED | Mechanistic, cross-cultural, precision/attention, and signal limitations are included. |
| Critiques | PRESERVED | Rohrmeier/Koelsch and Furutachi/Hofer critical boundaries are included. |
| Related-theory distinctions | PRESERVED | Statistical Learning, IDyOM, Huron, Meyer, Narmour, Tonal Hierarchy, Gestalt, and GTTM distinctions are stated. |
| Teaching-construction status | PRESERVED | Gaussian precision and omission examples are explicitly constructed. |
| Interaction epistemic intent | PRESERVED | Constants, manipulated uncertainty/omission, purpose, and non-inference are explicit. |
| Provenance/source responsibility | PRESERVED | Five glyph responsibilities are explicit. |

### Huron’s ITPRA Theory of Expectation

| Requirement | Status | Review note |
| --- | --- | --- |
| Core intellectual question | PRESERVED | Before, at, and after outcome questions are explicit. |
| Central mechanism/framework | PRESERVED | Five functions, temporal hinge, P/R parallelism, appraisal, and expectation-source layer are explicit. |
| Qualifications | PRESERVED | Functional constructs, physiological independence, contrastive valence, and evidence limits are retained. |
| Evidence | PRESERVED | Huron, expectancy-violation, statistical-learning, surprise/pleasure, critique, and constructed examples are included. |
| Evidence boundaries | PRESERVED | Evidence is not treated as proof of five isolated systems or complete pleasure/emotion theory. |
| Scope | PRESERVED | Useful domain and stopping points are explicit. |
| Limitations | PRESERVED | Operationalisation, neural status, universal consequences, and adaptive proposals are bounded. |
| Critiques | PRESERVED | Aversa and the record’s critical/non-test boundaries are included. |
| Related-theory distinctions | PARTIAL | Meyer, Narmour, GTTM, PP, and IDyOM are named, but full canonical relation explanations are not reproduced in the manifest. |
| Teaching-construction status | PRESERVED | Timing, fixed surprise, and lens-switch examples are explicitly constructed. |
| Interaction epistemic intent | PRESERVED | Fixed event/context, changed timing/question, and non-inference are explicit. |
| Provenance/source responsibility | PRESERVED | Five glyph responsibilities and source roles are explicit. |

No item is marked MISSING or NOT APPLICABLE. The PARTIAL items identify
relationship/critique wording that should be checked against canonical records;
they do not authorize automatic promotion or revision.

## 13. Final review status

This packet is ready for a human to review. It does not ratify the Phase A
handoff, resolve the partial classifications or open questions, or authorize
the later visual phase. The existing Phase A documents were not modified, the
desktop reference folder was not inspected, and no GPT-6 visual-design
reasoning was used.

PHASE_A_REVIEW_PACKET_READY_NO_AUTOMATIC_RATIFICATION
