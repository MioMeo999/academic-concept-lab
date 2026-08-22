# Academic Concept Lab — agent contract

This repository is an editorial research-learning environment. It is not a
database, LMS, encyclopedia, university website, or generic knowledge
repository. The purpose is to make difficult academic knowledge easier to
understand, intellectually accurate, visually memorable, engaging without
becoming gimmicky, and traceable back to evidence.

Read docs/ACADEMIC-CONCEPT-LAB-PROTOCOL.md before adding or substantially
changing a record. This file is the short, high-priority version of that
protocol.

## Non-negotiable rules

1. Preserve the accepted paper/sketchnote visual language. Do not introduce a
   new design system, glossy SaaS styling, glassmorphism, generic dashboards,
   institutional branding, cinematic motion, excessive gradients, or
   decorative interaction.
2. Preserve the ontology:
   - **Theory** — a lens that helps explain why or how a phenomenon should be
     understood.
   - **Study** — an argument showing what a specific investigation did, found,
     and can reasonably claim.
   - **Method** — a practice showing how a research approach is used.
   - **Mechanism** — a pathway showing through what process something happens.
3. Do not force a field, mechanism, review, or method variant into the wrong
   kind because an existing page shape is convenient. A new kind requires a
   demonstrated gap in the existing ontology.
4. Academic accuracy overrides visual neatness. Never invent findings, effect
   sizes, sample sizes, citations, constructs, mechanisms, hypotheses,
   quotations, limitations, or historical claims. If the supplied evidence
   does not establish something, omit it or label it unresolved/editorial.
5. Keep source claims, reported findings, faithful paraphrases, platform
   explanations, teaching analogies, editorial synthesis, editorial critique,
   proposed connections, and open questions distinct. An editorial reading
   must never look like an original author's claim.
6. Use the existing provenance model on every record. The current UI uses the
   glyphs ●, ■, ▲, ✦, and ?; reuse those symbols and make each note say what
   the mark covers. Do not fabricate a citation or silently turn correlation
   into causation.
7. Choose the explanatory structure from the knowledge, not from a template.
   Ask what the reader needs to see, manipulate, compare, or trace. Prefer
   reuse → adapt → extend. A new component must represent a reusable
   knowledge pattern, not a one-off decoration.
8. Preserve accessibility and graceful degradation: semantic HTML, keyboard
   equivalence, visible focus, touch use, narrow layouts, text alternatives,
   no colour-only meaning, no essential hover-only information, and
   reduced-motion support.
9. A record is not finished when it renders. It is finished when its kind,
   evidence, provenance, structure, relations, interactions, responsive
   behaviour, accessibility, routes, overflow, lint, tests, and—when relevant—
   production behaviour have been checked.

## Before coding

Complete the READ → MODEL → CLASSIFY → TEACH → DESIGN stages in the full
protocol first. For a literature source, extract its bibliographic identity,
question, constructs, assumptions, mechanisms, boundaries, design, sample,
measures, findings, uncertainty, limitations, competing interpretations,
historical links, measurement issues, and foundational sources. For an
empirical paper, keep the explicit chain:

question → design → evidence → result → claim → limitation

Do not begin by copying the nearest record or inventing a section list.

## Current implementation facts

- Content is static TypeScript under content/.
- content/types.ts defines the shared base, provenance/source fields, and
  kind-specific data. TheoryRecord serves both theory and mechanism;
  studies use PaperRecord; methods use MethodRecord.
- content/records.ts is the registry. A valid record must be registered and
  use the existing KIND/recordHref routing vocabulary.
- RecordShell supplies shared framing, breadcrumbs, kind/discipline labels,
  save control, study citation display, contents navigation, and related
  records. Body components supply kind-specific, optional sections.
- Theory, study, and method bodies render a provenance section. The details
  still come from each record's provenance array; do not treat the shell as
  evidence.
- Existing reusable vocabulary includes the Sketch primitives, Cascade,
  TheoryDemo, QuestionFit, SchoolPicker, SaveButton, ContentsNav, Reveal,
  RecordCard, and LibraryBrowser. Inspect their current semantics before
  reusing or extending them.
- sketchnote.css is the visual source of truth. Do not duplicate its exact
  values in documentation or create competing global styles.

## Verification minimum

For every new or changed record, verify the route and metadata, library
registration, contents headings and active tracking, internal record links,
provenance and citations, save behaviour, all interactive states, desktop and
mobile layouts, keyboard and touch operation, reduced motion, console output,
and accidental horizontal overflow. Run the repository lint and test commands.
Check production after deployment when the change is deployed. Do not trigger
an unrelated deployment for a documentation-only change.

The full rationale, source-reading procedure, content patterns, accessibility
requirements, and checklist are in
docs/ACADEMIC-CONCEPT-LAB-PROTOCOL.md.
