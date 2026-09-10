# Gestalt visual target prototype

Route: `/gestalt-target`

This is an isolated App Router prototype for human review. It does not replace a production route, change the canonical record registry, or change production navigation.

## What changed

- Added a fresh `app/gestalt-target` namespace with its own metadata, local type pairing, and visual language.
- Reframed the Gestalt record as a long editorial sheet: a grouping field, a whole/part comparison, a branching lineage, an evidence ledger, scope boundaries, and provenance marks.
- Added a keyboard-accessible client interaction for the original synthetic temporal-spacing and cue-conflict examples. The Play control schedules the documented triangle-tone events locally; it does not claim to collect or score perception.
- Added a second visual-art-direction pass after comparing the prototype against the supplied hand-drawn references: a grouped-sound-to-score hero drawing, cue-orbit sketch, paired grouping notation, rough whole/part field, branching history thread, evidence stamps, marker-stroke controls, and material washes that carry the visual vocabulary below the hero.
- Reworked the page composition around the reference board: a compact editorial header, indexed left reading rail, question column, hand-drawn demo card, and a three-column overview board pairing the record explanation, six canonical grouping cues, “Why It Matters,” and evidence at a glance.
- Refined the hand-drawn language through the live study and lower reading: pencil-like controls, hand-lettered condition labels, broken graphite connectors, lighter sketched separators, colored overlap rings, and drawn treatment for evidence, scope, and related-record rows.
- Reused the canonical Gestalt content and frozen semantic handoff for claims, evidence, qualifications, related records, and sources.
- Captured review images in `.review-shots/current-goal-board-reordered.png`, `.review-shots/current-goal-board-viewport.png`, and `.review-shots/current-goal-mobile-pass.png`.

## What succeeded

- `npx tsc --noEmit --incremental false` passes.
- `npx eslint app/gestalt-target` passes.
- The route renders at `http://localhost:3103/gestalt-target` in the isolated dev server.
- Browser checks passed for the route, headings, landmarks, keyboard-visible controls, reduced-motion CSS, cue-switching, and the Play control. The final axe audit reported zero violations; its only incomplete result is the expected decorative SVG contrast heuristic.
- Desktop and narrow viewport captures show the intended editorial, hand-drawn, quiet-scholarship rhythm without touching production surfaces.

## Still uncertain for human review

- Whether the balance between the compact reference board and the longer evidence reading feels sufficiently close to the supplied target at the intended production viewport.
- Whether the page should expose the related-record links as prototype placeholders or wait for a later route-level review of the canonical record slugs.
- Whether the synthetic tone timbre and gain feel appropriate for the intended audience; the controls and provenance copy remain the source of truth.

ACADEMIC_CONCEPT_LAB_GESTALT_VISUAL_TARGET_PROTOTYPE_READY_FOR_HUMAN_REVIEW
