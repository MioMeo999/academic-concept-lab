# Academic Concept Lab — editorial and knowledge-design protocol

Status: governing guidance for adding or revising Concept Lab records.

This protocol describes how to turn serious academic material into a clear,
traceable learning record without flattening the scholarship. It is written
for an agent working from papers, books, reports, or supplied PDFs. It is also
the rationale behind the short repository contract in AGENTS.md.

The protocol has three different kinds of statement:

- **Current implementation** describes behaviour or vocabulary that exists in
  this repository now.
- **Editorial principle** is a rule for the intellectual quality of a record,
  whether or not a component currently exists for it.
- **Recommended future pattern** is a possible extension. It must not be described as
  implemented until the code, route, and verification support it.

Do not make this document depend on the current number of records, a particular
record name, a CSS line number, or a temporary route. The Library should remain
governable when it contains many more records.

## 1. Product philosophy

Academic Concept Lab is an authored research-learning environment. Its job is
not to store every fact, reproduce papers, or pretend that a field has a
single settled answer. It takes difficult theory, evidence, methods, and
mechanisms and gives the reader a path through them.

The product should make academic knowledge:

- serious enough that a researcher can see what is source-supported and what
  is not;
- approachable enough that a new reader can form a usable mental model;
- memorable because the explanation has a visual and structural shape;
- engaging because the reader can trace, compare, or test an idea;
- honest about uncertainty, competing interpretations, and limits.

Visual explanation is successful when it reduces conceptual difficulty. A
diagram that merely fills space is a failed explanation. An interaction that
does not change what the reader understands is unnecessary. The experience
should feel authored, exploratory, and editorial without becoming theatrical.

Accessibility and evidence provenance are part of the design. A citation
added at the end cannot repair a page whose visual language has already made a
weak claim look certain. A beautiful control that cannot be operated by
keyboard or touch is incomplete.

### Stable visual language, adaptive knowledge representation

The visual system is stable; the explanatory structure is adaptive. New
records should feel drawn by the same hand, but they should not all have the
same section sequence. A theory may need a conceptual map; a study may need an
evidence chain; a method may need a worked coding example; a mechanism may need
a pathway and feedback loop. These are different teaching problems.

The governing design question is:

> What does the reader need to see, manipulate, compare, or trace in order to
> understand this knowledge?

It is not:

> Which existing page template can I copy?

Use the sequence reuse → adapt → extend. Reuse an existing component when it
expresses the same knowledge pattern. Adapt its data or labels when the
pattern is the same but the content is different. Extend the component
vocabulary only when the source genuinely demands a reusable new pattern.

## 2. The four kinds of record

**Current implementation:** content/types.ts defines four RecordKind values:
theory, study, method, and mechanism. A shared record base carries identity,
title, hook, one-sentence explanation, discipline, topics, card facts, and
provenance. Kind-specific fields determine which optional body blocks render.
TheoryRecord is the current type for both theories and mechanisms; the
distinction remains explicit in the kind value, labels, colour, route, and
editorial content.

**Editorial principle:** classify the object before choosing its page
structure. The kind is a claim about what the material is, not a cosmetic
filter.

### Theory — a lens

A theory is a set of concepts and relationships that helps explain why or how
a phenomenon should be understood. A theory record should make visible:

- its central constructs and how they relate;
- the assumptions that make the explanation possible;
- its propositions, predictions, or explanatory moves;
- its boundary conditions and what it does not explain;
- its historical lineage and later revisions where relevant;
- how the constructs are measured, if measurement is part of the literature;
- competing theories or unresolved problems where the field is not settled;
- what practical implication follows, and what does not.

An accessible explanation is not permission to erase the theory's conditions.
If a relationship is correlational, do not draw it as a causal arrow without a
qualification. If a framework is descriptive, do not call it predictive.

A field with a family of questions, models, and competing answers is not
automatically a single theory. Put that status on the face of the record when
needed. The current content model already supports this kind of honesty with
conceptual-status and disambiguation blocks.

### Study — an argument

A study record explains what a particular investigation did, what evidence it
produced, and what the evidence can reasonably support. It should keep the
argument welded together:

research question → design → sample/context → measure or manipulation →
analysis/evidence → result → claim → limitation

The reader should be able to distinguish a reported result from the authors'
interpretation and from the platform's synthesis. Include alternative
explanations, robustness, strengths, and limitations when the source provides
them. A result is not a mechanism merely because the paper uses mechanistic
language.

When a paper contains multiple studies, represent their cumulative logic:
which study establishes the initial association, which adds a manipulation or
different measure, which tests a boundary, and which weakens an alternative
explanation. Do not flatten several designs into one imaginary experiment.

**Current implementation:** studies use PaperRecord, including citation
identity, research question, theoretical foundation, conceptual model,
hypotheses, study-level data, cross-study findings, robustness, alternatives,
claim/evidence pairs, strengths, limitations, contributions, and implications.
Use only fields that the source supports; the presence of a field in the type
does not justify filling it with inference.

### Method — a practice

A method record teaches how a research approach is used, not merely what its
name means. It should cover:

- intellectual or philosophical commitments;
- the kinds of question the method can answer;
- questions it cannot answer well;
- variants or schools and how their assumptions differ;
- procedure and decision points;
- what to attend to while doing the work;
- worked material or an exemplar;
- quality criteria and reporting expectations;
- common mistakes, misuses, and overclaims.

An instruction such as “code the data” is not enough. A reader should be able
to see what a decision looks like and why a different decision would change
the analysis. A method family with multiple philosophical variants must name
which variant a record is teaching; shared steps should not be presented as
though they erase the differences.

**Current implementation:** methods use MethodRecord with optional blocks
for commitments, question fit, schools, coding examples, procedure, craft,
terminology, quality markers, contrasts, learning stages, and exemplars, plus
misuses, qualifications, and reading. These are reusable vocabulary, not a
mandatory checklist of sections.

### Mechanism — a pathway

A mechanism explains through what process something happens. It should make
visible:

- components or nodes;
- sequence and direction;
- messengers or intermediate steps;
- timing and regulation;
- feedback or looping;
- what is measured or observed;
- which links are demonstrated and which are explanatory hypotheses;
- the conditions under which the pathway may change.

A mechanism is often mistaken for a theory because both use concepts and
arrows. A pathway does not become a psychological theory merely because it
helps explain an outcome. Preserve the distinction in the title, opening
explanation, captions, and provenance.

**Current implementation:** mechanism records use the theory/mechanism body
family and can use the existing Cascade data pattern. The current cascade is
a schematic teaching device: its arrows and nodes show order and direction,
not anatomical scale, numerical effect, or proof of causation. Label a
proposed pathway as proposed.

### Edge cases and classification decisions

- **A research field that is not itself a theory:** classify it as theory only
  when the record openly says it is a field or landscape rather than a single
  framework. Use competing models, historical lineage, and disambiguation
  rather than inventing a founding theory.
- **A mechanism mistaken for a theory:** use mechanism when the central
  learning problem is the pathway. Explain the theory that motivates it, if
  relevant, as a separate lens.
- **A theoretical review versus an empirical study:** a review that synthesises
  models without new data is not an empirical study. A paper that reports new
  data remains a study even when its introduction is a major theoretical
  contribution; represent both, but keep the record kind tied to the main
  evidence object.
- **A method family with philosophical variants:** use method, name the variant
  being taught, and show how another school would make a different decision.
  Do not collapse disagreement into one neutral recipe.
- **A paper containing both theory and evidence:** choose the object the reader
  most needs to understand. If the empirical argument is central, use study
  and explain its theoretical foundation; if the paper is a model or review
  with no new evidence, use theory and label the synthesis accordingly.

If none of the four kinds can represent the material without distortion, stop
and document the mismatch before adding a new kind. A new kind is an ontology
decision, not a component convenience.

## 3. Source reading and evidence modelling

Do not begin by coding. Read the supplied material sufficiently to understand
its argument, scope, and uncertainty. An abstract, citation, or search-result
snippet is not a substitute for the source.

### Source extraction sheet

Before implementation, create a working extraction with the following fields.
It can be a private note or issue comment; it does not need to become a new
runtime schema.

1. **Bibliographic identity:** authors, year, title, venue, volume/issue,
   pages, DOI or stable identifier, version, and whether the material is a
   preprint, review, chapter, or primary report.
2. **Research question/problem:** what the authors are trying to explain,
   describe, compare, test, or practise.
3. **Construct definitions:** the authors' terms, distinctions, operational
   definitions, and any term whose everyday meaning differs from the
   literature.
4. **Propositions/hypotheses:** the predicted or argued relationships, with
   their conditions and direction. Do not upgrade a research question into a
   hypothesis.
5. **Theoretical assumptions:** what must be true for the explanation or
   method to make sense.
6. **Mechanisms:** the proposed or tested process, each intermediate step, and
   whether the evidence establishes it.
7. **Boundary conditions:** population, setting, task, time, culture,
   measurement, and other limits on generalisation.
8. **Methods:** design, procedure, sample/context, measures, manipulations,
   comparison conditions, analysis, and materials.
9. **Findings:** what was observed or estimated, separate from interpretation.
   Record numerical values only when the source supplies them and the number
   is needed for the teaching purpose.
10. **Uncertainty:** confidence intervals, ambiguity, heterogeneity, missing
    data, nulls, sensitivity, author caution, and unresolved disagreement.
11. **Limitations:** limitations stated by the authors and limitations that
    follow directly from the design, clearly labelled as editorial critique
    when they are not stated by the source.
12. **Competing interpretations:** rival explanations, contradictory results,
    and what the design cannot distinguish.
13. **Historical relationships:** origin, revision, extension, contrast, or
    supersession, each supported by a source.
14. **Measurement issues:** what each measure captures, what it misses, and
    whether the construct is being measured, manipulated, inferred, or merely
    named.
15. **Foundational literature:** works cited by the supplied source that are
    necessary to explain lineage or terminology. Do not cite them as though
    they were read if they were not supplied or independently checked.

For an empirical study, write the evidence chain explicitly:

question → design → evidence → result → claim → limitation

If any link is missing, say so. A study can have a strong result and a narrow
claim. A plausible claim can still have weak evidence. The record should teach
that difference.

### Evidence discipline

Never:

- fabricate a citation, DOI, date, quotation, sample size, effect size, or
  finding;
- infer a numerical value from a chart, visual size, or prose adjective;
- silently convert correlation, association, prediction, or mediation language
  into causation;
- treat a proposed mechanism as demonstrated unless the design establishes the
  pathway;
- generalise beyond the source population, design, or context without a
  qualification;
- hide conflicting evidence or make a contested field look settled;
- turn an editorial connection into a source claim;
- present a teaching example as data;
- use the existence of a field in the TypeScript type as evidence that the
  source contains that information.

When the evidence is absent, the correct actions are to omit the detail, state
that it is unresolved, or state that the platform is making an editorial
interpretation. Do not fill the gap because a page would look more complete.

## 4. Provenance taxonomy

**Current implementation:** every record carries a provenance array. Theory,
study, and method bodies render it under “Where every claim came from.” The
site currently uses these glyphs:

- ● source-grounded or directly reported;
- ■ plain-language paraphrase;
- ▲ original diagram, schematic, teaching analogy, worked illustration, or
  similar constructed teaching aid;
- ✦ editorial framing, interpretation, synthesis, or critique;
- ? contested or unresolved.

Record-specific labels refine those meanings—for example, “Directly reported,”
“Original diagram,” “Worked illustration,” or “Editorial critique.” Reuse the
existing glyph set; do not invent a competing symbol system for a new record.

**Editorial principle:** the glyph is a compact signal, not a substitute for a
source. Each note must say what the mark covers and what it does not establish.

For editorial work, use this fuller nine-part taxonomy:

| Type | Meaning | Required signal |
| --- | --- | --- |
| 1. Source claim | A claim made by the cited author or source. | Attribute it to the source; use the source-grounded glyph where the current UI needs a mark. |
| 2. Reported empirical finding | An observed result, estimate, comparison, or study-level conclusion. | Keep it attached to design, sample, and measure and distinguish it from interpretation. |
| 3. Faithful paraphrase | A compressed restatement that preserves the source's meaning without quoting it. | Say it is paraphrased; use the paraphrase glyph. |
| 4. Platform explanation | The Lab's plain-language bridge, ordering, or explanation of a source-backed idea. | Keep wording modest; identify when the arrangement adds interpretation. |
| 5. Teaching analogy/example | A constructed illustration, scenario, diagram, or worked example. | State that it is not data or a calculation; use the teaching/diagram glyph. |
| 6. Editorial synthesis | A connection or arrangement across sources made by the Lab. | Name it as the platform's synthesis; use the editorial glyph. |
| 7. Editorial critique | A reasoned criticism of scope, measurement, inference, or design. | Do not attribute it to the original authors unless they make it; use the editorial glyph. |
| 8. Proposed connection | A plausible relation between records or literatures not established by the cited source. | Call it proposed or plausible and qualify it in the relation text. |
| 9. Open/contested question | An unresolved disagreement, uncertainty, or boundary. | Show the gap rather than resolve it; use the contested glyph. |

The taxonomy may be represented through headings, captions, prose, source
notes, and the existing provenance block. It does not require nine new UI
controls. A polished page must never make an item from 4–8 look like item 1.

For sources, describe contribution rather than attaching one citation to an
entire page as if every sentence came from it. For a study, state which source
supports the citation, sample, design, result, and claim. For a diagram, state
which relationships are schematic and whether relative position or line weight
means anything.

## 5. Teaching design before page design

Before choosing sections or components, answer:

1. What is the central idea?
2. What do readers usually misunderstand?
3. What distinction is hardest to hold in mind?
4. Is the knowledge spatial, temporal, causal, comparative, hierarchical,
   cyclical, or conditional?
5. What should be seen rather than merely described?
6. What could be manipulated interactively?
7. What would a good worked example look like?
8. Which claims require caution, qualification, or an explicit unresolved
   marker?

Write a short learning brief from the answers. It should name the reader's
likely misconception, the desired mental model, and the evidence boundary.
Only then decide which blocks, diagrams, or interactions are appropriate.

### Reusable knowledge-presentation patterns

These are patterns, not mandatory sections. Choose only those that solve the
record's learning problem.

| Pattern | Useful when | What must remain visible |
| --- | --- | --- |
| Concept map | Constructs and relationships are the main difficulty. | Meaning of each node, direction or type of relation, and unsupported links. |
| Chain/pathway | A process or mechanism unfolds in sequence. | Components, order, messenger, timing, and demonstrated versus proposed links. |
| Cascade/feedback loop | A regulated system has signals and feedback. | Direction, feedback, scale disclaimer, and what is measured. |
| Timeline | Historical development or revisions are the point. | Dates, source for each transition, and whether later work extends or replaces earlier work. |
| Comparison matrix | Closely related constructs or schools are easily conflated. | The comparison dimension and the cost of treating unlike things as alike. |
| Fit simulator | A congruence or matching theory needs a concrete contrast. | That it is a teaching model, not a score, diagnosis, or prediction. |
| Classification exercise | The reader must learn category boundaries. | The rule for classification and ambiguous cases. |
| Worked example | A method requires a decision made on material. | The material's status as illustration, the decision, and why alternatives fail. |
| Measurement audit | Operationalisation changes what can be concluded. | Construct, measure, inference, and the measure's blind spot. |
| Evidence X-ray | An empirical paper's claim is easily detached from its design. | Question, design, evidence, result, claim, and limitation. |
| Boundary-condition map | A theory is conditional or often overgeneralised. | Population, context, time, condition, and where the claim stops. |
| Misconception correction | Terminology or common usage is misleading. | The correction, the literature's preferred term, and the source for the distinction. |
| Competing explanations | Evidence is compatible with more than one account. | What each explanation predicts and what the current evidence cannot separate. |

**Current implementation:** existing vocabulary includes section-driven theory
blocks, study claim/evidence pairs, method procedure and coding examples,
Cascade, TheoryDemo, QuestionFit, SchoolPicker, measurement rows, and
related-record cards. Use the corresponding pattern only when its semantics
fit. For example, TheoryDemo is explicitly a teaching model: its line weights
and positions are not magnitudes or calculated outcomes.

**Recommended future pattern:** a genuinely new reusable pattern may be added after
demonstrating that existing primitives cannot express the learning problem.
Document its purpose, static fallback, evidence boundary, accessibility
semantics, and reuse cases before building it.

### Interaction test

Every interaction must answer:

> What does the reader understand better because they interacted with this?

Record the answer before implementation. A useful interaction normally has a
clear default state, labelled control, visible state change, and explanatory
caption. It must also have a meaningful static reading path. Do not make an
interaction merely because a variable can be put on a slider.

## 6. Current visual and motion baseline

**Current implementation:** app/concept-lab/sketchnote.css and the Sketch
primitives define the visual source of truth. The baseline includes:

- a paper-like background and ink-like primary text;
- secondary strokes and quiet reading text;
- semantic accents: teal for theory, red for study/evidence, gold for method,
  and plum for mechanism, as defined by content/records.ts;
- highlighter treatment for emphasis;
- hand-drawn irregular SVG outlines, double strokes, restrained rotations,
  banners, cards, clouds, dividers, and arrows;
- editorial spacing and a deliberate reading rhythm;
- a shared record shell and card language.

These are conceptual constraints, not a reason to copy exact CSS values into a
new component. Inspect the current stylesheet and primitives before changing
anything. A new visual should look as though it was drawn with the same pen.

Avoid glossy SaaS surfaces, glassmorphism, generic dashboards, generic
institutional styling, cinematic motion, excessive gradients, generic
fade-in page builders, unnecessary icons, and decoration with no explanatory
work.

### Drawn, not faded

Motion should clarify construction, direction, sequence, or relationship.
Prefer an outline that inks along its path, a highlighter that wipes across a
phrase, or a pathway that reveals its direction. Do not animate paragraphs or
make every block arrive for spectacle.

**Current implementation:** Reveal adds animation enhancement only when the
user has no reduced-motion preference; content is not intentionally hidden
without JavaScript; drawn and reveal targets use existing data attributes; the
stylesheet gates motion behind prefers-reduced-motion: no-preference.

**Editorial principle:** reduced motion must leave the content complete and
understandable. Do not add a new animation whose absence removes meaning.

## 7. Responsive and accessible behaviour

Treat 320px and wider as a supported layout range. Test at a narrow phone
width, a typical mobile width, and a desktop width. The exact CSS thresholds
may evolve; verify behaviour rather than hardcoding today's breakpoint values.

Every new record or component must support:

- stacked complex structures on narrow screens;
- no accidental horizontal page overflow, including long titles, citations,
  DOI strings, tables, diagrams, and code-like labels;
- a mobile contents map when a record has multiple sections;
- minimum 44px touch targets for controls and links that function as controls;
- hover styling only inside a hover/pointer capability guard;
- keyboard operation with visible focus and equivalent state changes;
- semantic HTML and sensible heading order;
- text alternatives or explanatory captions for diagrams;
- meaning that does not depend on colour, hover, animation, or pointer
  precision;
- reduced-motion behaviour that preserves visibility and interaction.

**Current implementation:** records use ContentsNav, which provides a desktop
contents rail and a mobile fold-out map. It tracks the section near the header
and marks the active link with aria-current="location"; mobile contents links
close the fold-out after selection. The stylesheet stacks complex table-like
structures and protects the page from small overhangs, but that guard is not a
substitute for testing the actual content.

When adding an interaction, test the control itself, not only the final
appearance: focus it, use the keyboard, tap it, toggle it repeatedly, resize
the viewport, and test the reduced-motion preference. Save is a real stateful
control and must retain its pressed state and accessible name. A static
alternative is required for any teaching content that would otherwise be
hidden behind an interaction.

## 8. Relations and the connected library

Academic Concept Lab should become an increasingly connected knowledge system,
not a flat collection of pages. A relation is valuable when it helps the
reader navigate an academically defensible connection.

Possible relation types include:

- subtype of;
- extends;
- contrasts with;
- measures;
- provides mechanism for;
- operationalises;
- tests;
- critiques;
- complements;
- historically develops from.

Only add a relation when the source or a clearly labelled editorial synthesis
supports it. Do not create links merely to increase graph density. A proposed
connection must be marked as proposed, not silently presented as a fact.

**Current implementation:** RecordLink points to an existing recordId and
includes a relation and body text. content/records.ts is the registry used by
the library and route vocabulary; recordHref produces the current route.
Verify every relation resolves to an actual registered record. Do not assume a
future record exists just because its slug sounds plausible.

## 9. Repository implementation guidance

Keep content in the existing static content model unless the task explicitly
requires a product change. Do not create a CMS, database, or new schema merely
to satisfy this protocol.

Use the existing types accurately:

- shared identity and provenance belong in the record base;
- theory/mechanism blocks belong in the TheoryRecord vocabulary only when
  their meaning fits;
- study fields must preserve study-level design and evidence;
- method fields must preserve commitments, variants, procedure, and quality;
- sources should carry their contribution and DOI when actually known.

Theory/mechanism bodies are section-driven: optional data blocks and optional
headings determine what renders, and the contents list is generated with the
sections. Do not add a heading without checking the contents list, section
anchor, active tracking, and mobile map. Study and method bodies have their
own block sequences; do not force them into the theory sequence.

The shared RecordShell is responsible for common framing. It does not make
kind-specific claims accurate. The registry is a required implementation step:
an unregistered record is not a Library record.

Content strings may use the existing rich-text path for limited inline
emphasis. Follow the current Rich implementation and existing content
conventions; do not introduce arbitrary markup, unsafe embeds, or an unrelated
rendering language as part of a record.

## 10. Complete workflow

Use this eight-stage workflow for new literature and substantial revisions.

### READ

Read and understand the source, including methods, results, discussion, and
limitations where applicable. Output a source extraction sheet and a short
bibliographic identity. Note what was not available.

### MODEL

Build the evidence structure: constructs, relationships, assumptions,
mechanisms, boundaries, measures, historical lineage, uncertainty, and
competing explanations. For empirical work, write the evidence chain. Output
an evidence matrix or equivalent working note.

### CLASSIFY

Choose Theory, Study, Method, or Mechanism and explain why. Resolve edge cases
such as a field versus a theory, a pathway versus a theory, a review versus
new data, and variant method schools. Output the kind decision and any
disambiguation text.

### TEACH

Write the learning brief: central idea, likely misunderstanding, hard
distinction, desired mental model, important caveats, and what the reader
should be able to do after reading. Output the claim/provenance map.

### DESIGN

Choose an adaptive explanatory structure and any reusable patterns. Answer the
eight teaching-design questions. For each proposed interaction, write its
learning purpose, static fallback, and evidence boundary. Output a section and
interaction plan, not code.

### IMPLEMENT

Add the record data, use existing components, adapt labels or optional blocks,
and extend only with a reusable pattern. Register the record, preserve the
existing routes, add defensible relations, and supply complete provenance and
sources. Keep visual changes within the accepted baseline.

### VERIFY

Run the repository checks. Verify source claims, citations, relation targets,
route and metadata, contents navigation, active tracking, save state, all
controls, keyboard, touch, mobile, desktop, reduced motion, console output,
and horizontal overflow. Test a static/no-enhancement path where relevant.

### DEPLOY

When the record is part of a normal production deployment, check the actual
production route and smoke-test the changed flow after deployment. A
documentation-only task does not justify an unrelated deployment unless the
repository workflow or user request requires one.

## 11. Definition of done and Library checklist

Before adding a record to the Library, complete this checklist:

- [ ] The source was read and its bibliographic identity is accurate.
- [ ] The record kind is justified; the material was not forced into a
      convenient template.
- [ ] The central idea, misconception, hard distinction, and learning outcome
      are explicit.
- [ ] Constructs, assumptions, mechanisms, boundaries, measures, uncertainty,
      limitations, competing interpretations, and unresolved questions are
      represented when the source supports or requires them.
- [ ] For an empirical paper, the evidence chain is traceable, including
      cumulative logic across studies.
- [ ] Every claim is classified as source claim, finding, paraphrase, platform
      explanation, analogy/example, synthesis, critique, proposed connection,
      or open question.
- [ ] Provenance marks and notes are accurate; no editorial interpretation is
      disguised as an author's claim.
- [ ] Citations, DOI values, dates, names, sample details, and numerical values
      were checked against the source and were not inferred.
- [ ] The record is registered in content/records.ts; its route resolves and
      its metadata is sensible.
- [ ] Contents headings, section IDs, active tracking, and the mobile contents
      tap-to-close behaviour work.
- [ ] Internal record links and relation labels resolve to real records.
- [ ] Save is present and its accessible pressed state works.
- [ ] Interactive controls have a teaching purpose, a static explanation, a
      keyboard path, a touch path, visible focus, and a reduced-motion path.
- [ ] Desktop and narrow mobile layouts work at 320px+; complex structures
      stack; long content does not cause horizontal overflow.
- [ ] Console errors and warnings were checked in the relevant browser flow.
- [ ] Lint passes.
- [ ] The repository tests pass, including rendered routes, record coverage,
      provenance, contents counts, relation links, filters, and style
      collision guards where applicable.
- [ ] Production was checked when the change was deployed.

The final question is not “does the page look finished?” It is “does this page
make the evidence easier to understand without making it stronger than it is?”
