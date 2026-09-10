# Open questions and unresolved extraction points

The correct status of each item is unresolved or qualified. This document does
not fill gaps by inventing a cleaner theory.

## Cross-project questions

1. Which of the typed record fields should become first-class semantic blocks
   in a future information architecture, rather than remaining nested in a
   theory-specific payload?
2. Should `conceptualStatus` and evidence X-rays be available as a shared
   scholarly layer for all framework-like records, or remain kind-specific?
3. Which relations are sufficiently source-grounded to deserve a stronger
   treatment than editorial synthesis or proposed bridge?
4. When a record’s `relatedTo` prose and Atlas relation metadata overlap, which
   layer is authoritative if they diverge?
5. Should a future content model store the abstract final model separately from
   its current body component so that it cannot be lost during redesign?
6. Which exact citations and numerical claims require direct primary-source
   verification before publication or expansion?

## Theory questions

### Gestalt

- What precise meaning of Prägnanz should be retained if it is developed
  beyond a historical problem?
- Which grouping tendencies, if any, should be framed as general across
  materials and listeners, and which remain material/task-dependent?
- How should classical Gestalt, musical grouping, ASA, Meyer, and GTTM be
  related without implying a single historical progression?
- How much of listener variation in the cited evidence is attributable to
  experience, culture, task, material, or other factors?

### Tonal Hierarchy

- Which exact empirical profile values are safe to display after direct source
  verification, and which should remain qualitative?
- What process connects a profile-like representation to key recognition as
  music unfolds?
- How should developmental findings be described without turning one study into
  a universal sequence?
- Which aspects of cross-cultural tonal organisation are immediate-context
  effects versus learned cultural relations?
- How should distributional learning be related to, but kept distinct from,
  tonal hierarchy?

### Predictive Processing in Music

- What evidence would distinguish predictive-processing computations from other
  explanations of MMN/MMNm, ERAN, P3, or omission responses?
- How should precision, attention, uncertainty, and IDyOM quantities be mapped,
  if at all, without treating them as synonyms?
- Which musical levels are explanatory conveniences versus empirically specified
  model levels?
- What would count as mechanistic support for PCM beyond compatible neural or
  behavioural responses?
- How should the cross-cultural exchange be represented while its validity
  remains unsettled?
- Which active-inference claims deserve inclusion without letting free energy
  replace the record’s narrower focus?

### Huron ITPRA

- Can the five response systems be operationalised or distinguished without
  assuming five independent physiological modules?
- What evidence would directly test contrastive valence rather than only show a
  nonlinear surprise/pleasure relationship?
- How do schematic, veridical, dynamic, and conscious expectation sources
  interact in a particular event?
- How should adaptive proposals be presented relative to empirical evidence?
- Which parts of the temporal architecture are approximate functional timing
  and which have independent evidence?

## Information currently carried only by presentation components

The main academic record claims are in `content/`, but several useful teaching
arrangements and micro-summaries currently live only in body components. They
are recorded here so a future redesign does not silently lose them or mistake
them for canonical source claims.

| Component-only material | Current location | Status for redesign |
| --- | --- | --- |
| Gestalt final synthesis wording: events → multiple organisations → cues → reinforcement/competition → preferred or ambiguous grouping → groups of groups, with context/experience/attention/structure as side influences | `app/concept-lab/_components/GestaltBody.tsx`, `FinalModel` | Editorial synthesis (`✦`). Promote to a reviewed semantic field if the future presentation needs it. |
| Gestalt continuation bridge: Gestalt asks how an unfolding pattern is organised; Meyer asks what that organisation can imply | `GestaltBody.tsx`, `continuation` block | Useful editorial distinction; currently not a typed record field. |
| Tonal measurement flow labels and the final synthesis wording connecting context, behavioural probe judgments, profile, inferred organisation, key space, updating, and influences | `app/concept-lab/_components/TonalBody.tsx`, `Flow` and `FinalModel` | Editorial synthesis (`✦`). Verify against the manifest before promotion. |
| Tonal key-space explanation that the torus preserves several psychological relations and is not a literal neural map | `TonalBody.tsx`, `keySpace` block | The record payload contains the boundary in `keySpace.note`; the fuller microcopy is component-only. Keep the boundary. |
| Tonal profile group labels and process contrast microcopy | `TonalBody.tsx`, `TonalProfile` and `process` block | Teaching labels; retain the distinctions but allow wording review. |
| Predictive message-passing motif and its caption | `app/concept-lab/_components/PredictiveProcessingBody.tsx`, `MessagePassing` | Simplified editorial teaching representation (`✦`) of a source-grounded motif (`●`). It must retain the no-complete-cortical-circuit boundary. |
| Predictive final loop line: updated model → new predictions; attention/action can alter sampling | `PredictiveProcessingBody.tsx`, `FinalModel` | Editorial synthesis that complements the typed `finalModel` nodes. Promote only after review. |
| Predictive final-model scope strings (“explains well” and “does not complete”) | `PredictiveProcessingBody.tsx`, `finalModel` block | Currently hard-coded summary; compare with the record’s `critical`, `qualifications`, and scope language before treating as canonical. |
| Huron timeline and final-model aria-label summaries | `app/concept-lab/_components/HuronBody.tsx`, `ResponseTimeline` and `FinalModel` | Accessibility text that encodes a semantic summary; must survive in an equivalent text alternative, but does not replace the typed payload. |
| Generic “read this record as” and “a separate record” framing | `app/concept-lab/_components/RecordShell.tsx` | Shared platform framing, not theory content. Preserve only if the future shell still needs the same orientation. |

These items should not be treated as hidden primary-source material. They are
implementation-level editorial summaries that need human review before being
promoted into a canonical content model.

## Human-review gate

Before Phase B begins, a human should approve:

- the four record identities and geometry abstractions
- the content-survival checklist
- which component-only summaries become typed semantic fields
- the unresolved questions that remain intentionally unresolved
- the rule that no visual reference or existing presentation treatment is an
  authority for academic meaning

