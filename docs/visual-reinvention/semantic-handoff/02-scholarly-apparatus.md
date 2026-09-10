# Scholarly apparatus

## Purpose

The scholarly apparatus is part of the knowledge model. It makes the reader
able to tell what is reported, interpreted, constructed, synthesized, bounded,
or unresolved.

## Evidence chain

For an empirical source, preserve the explicit chain:

`question → design → evidence → result → claim → limitation`

The selected records use `EvidenceXray` to store a related chain:

- `title` and `citation`
- `label`: empirical study, process model, or review
- `design`
- `testedLabel` / `tested`
- `foundLabel` / `found`
- `notTested`
- optional DOI

An evidence summary must not be rewritten as if it tested the full theory when
the record says it tested only a construct, response, model, or proxy.

## Claim classes

Keep these classes distinct in any future information architecture:

| Class | Meaning | Required treatment |
| --- | --- | --- |
| Source claim | What a named author or source proposes or reports. | Attribute it to the source and keep its scope. |
| Reported finding | What a study measured or found. | Keep design, measure, and limitation attached. |
| Faithful paraphrase | A plain-language restatement of source material. | Do not make it look like a new result. |
| Platform explanation | A Concept Lab explanation of how to read the material. | Label it as explanation when the distinction matters. |
| Teaching analogy/construction | A controlled example or interaction built to expose a distinction. | State what is manipulated, what is held constant, and what it cannot measure. |
| Editorial synthesis | A Concept Lab arrangement joining several sources or records. | Mark it as synthesis, not as an original author’s diagram. |
| Editorial critique | A bounded criticism or scope warning. | Attribute the critical source or label the editorial status. |
| Proposed connection | A relation suggested by the Atlas or handoff. | Keep relation provenance visible. |
| Open question | A live uncertainty, contested mechanism, or unresolved boundary. | Preserve as unresolved; do not complete it by design convenience. |

## Provenance glyph contract

The current provenance vocabulary is semantic and should survive a redesign,
even if its eventual presentation changes. Each note must say what the mark
covers.

| Glyph | Meaning in the current records | Future requirement |
| --- | --- | --- |
| `●` | Source-grounded theory, framework, historical, or model claim. | Attribute the claim and do not imply measurement if it is a proposal. |
| `■` | Source-grounded empirical finding or faithful explanation. | Keep design, measure, result, and limit together. |
| `▲` | Constructed teaching, audio, comparison, or method reconstruction. | State manipulated variable, held constants, and non-inference boundary. |
| `✦` | Concept Lab synthesis or editorial arrangement. | Never present the arrangement as a source-authored figure or result. |
| `?` | Bounded, debated, under-specified, or unresolved content. | Keep uncertainty visible and actionable for later review. |

The record-level `provenance` array is authoritative for the record. Notes
inside a payload may repeat a glyph for local clarity; the two layers must not
contradict each other.

## Source responsibility

Every source entry carries a citation and a contribution. DOI values are
identifiers, not proof that the primary paper was re-verified in this phase.
The handoff therefore treats the current content files as extracted project
claims and flags independent verification as a later scholarly task where
needed.

Minimum reading is a teaching threshold, not the full evidence base. Full
source trails should remain discoverable without making the reader infer that a
short list is exhaustive.

## Relations

Record relations have two layers:

1. Per-record `relatedTo` links, which provide explanatory prose and are part of
   the record’s teaching context.
2. `ATLAS_RELATIONS`, which adds typed direction and provenance:
   `source-grounded`, `editorial-synthesis`, or `proposed`.

Relation language must preserve direction. “Complements,” “bridges,”
“formalises,” “informs,” and “contrasts with” are not interchangeable.

## Quiet scholarship requirements

The following must remain legible without depending on an interaction:

- record kind and knowledge form
- source identity and contribution
- what was tested and what was not tested
- scope and stopping points
- limitations and unresolved mechanisms
- provenance marks and their explanations
- distinction between an original teaching construction and a published study
- related-record relation type and direction

An interaction can make a distinction experiential. It cannot be the only place
where the distinction exists.

