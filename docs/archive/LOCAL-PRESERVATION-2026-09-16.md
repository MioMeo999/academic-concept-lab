# Academic Concept Lab — Local Preservation Checkpoint

- **Purpose:** archival checkpoint for valuable local-only Concept Lab benchmarks and visual research before later consolidation.
- **Source worktree:** `D:\Concept Lab`
- **Source branch:** `feature/rta-canonical-promotion`
- **Source HEAD at audit:** `f48930a9ea00396af941c104f3b3e1c395e9cc1d`
- **Archive base:** `origin/main` at `7c9f9b288db8865823f7b776f3cd0c22bf8f3409`
- **Preservation branch:** `archive/concept-lab-local-preservation-2026-09-16`
- **Preservation worktree:** `D:\Concept Lab-preservation`
- **Date:** 2026-09-16

This branch is archival infrastructure. It is not a production branch and must not be merged wholesale into `main`.

## Preserved benchmark source

### AET — temporal / event-driven knowledge

Preserved at:

- `app/aet-visual-rebuild/`
- `public/aet-visual-rebuild-assets/`

This is the latest local AET benchmark candidate, including authored workday/event artwork, same-event reactions, two clocks, workday memory, macrostructure, quiet scholarship, evidence, sources, and provenance. It imports `content/affective-events-theory` from the authoritative base.

Older, distinct source implementations are also retained for historical comparison:

- `app/aet-rebuild/`
- `app/aet-target/`

The older `public/aet-rebuild-assets/aet-workday-field.png` and `public/aet-target-assets/aet-workday-field.png` copies were not duplicated here because they are byte-identical. The primary visual-rebuild asset set is preserved separately.

### JD–R — conditions / parallel currents / support / effort

Preserved at:

- `app/jdr-target/`
- `public/jdr-target-assets/`

The route uses the preserved local `app/surface/` drawing and pigment primitives and local font files. Canonical JD–R content is imported from the base repository.

### Person–Environment Fit — relational correspondence

Preserved at:

- `app/pe-fit-target/`
- `public/pe-fit-target-assets/`

The original dirty worktree also contains byte-identical copies under `incoming-assets/`. Those originals were intentionally not duplicated in this commit and remain untouched in `D:\Concept Lab`.

## Shared experimental visual systems

Preserved at their source paths:

- `app/surface/`
- `app/visual-reinvention/`
- `app/atlas/`
- `app/b2-lab/`
- `app/chromatic-editorial/`
- `app/ink-exploration/`
- `app/pressure/`

`app/surface/` is both an experimental system and a local-only runtime dependency for AET/JD–R, including its local Newsreader, Instrument Sans, and Caveat font files.

## Secondary benchmark targets

Preserved as historical source, not production restoration:

- `app/library-target/`
- `app/saved-target/`
- `app/about-target/`
- `app/gestalt-target/`
- `app/home-target/`

Production versions of these experiences already exist on `origin/main`; these target routes are retained only to preserve the design and interaction research.

## Visual-language knowledge

The local documentation is preserved under an explicit archival namespace so it does not masquerade as current production architecture:

- `docs/archive/local-preservation/visual-language/INTERACTION-GRAMMAR.md`
- `docs/archive/local-preservation/visual-language/AI-DESIGN-BRIEF.md`
- `docs/archive/local-preservation/visual-language/ART-ASSET-STRATEGY.md`
- `docs/archive/local-preservation/visual-language/DESIGN-SYSTEM.md`
- `docs/archive/local-preservation/visual-language/IMPLEMENTATION-RECIPES.md`
- `docs/archive/local-preservation/visual-language/PAGE-BEHAVIOUR.md`
- `docs/archive/local-preservation/visual-language/REVIEW-CHECKLIST.md`
- `docs/archive/local-preservation/visual-language/VISUAL-THESIS.md`
- `docs/archive/local-preservation/skills/concept-lab-visual-language/SKILL.md`

`INTERACTION-GRAMMAR.md` is the source-of-truth note for interactive editorial drawing, focus without disappearance, theory-specific geometry, and the optional “drawn once · read many ways” strategy.

## Dependency findings

- AET imports `content/affective-events-theory`, already available on the base.
- JD–R imports `content/theory`, `content/records`, and local surface primitives; all source dependencies are preserved or available on the base.
- P–E Fit imports `content/theory` and `content/types`, already available on the base.
- AET and JD–R use fonts from `app/surface/_fonts/`, preserved here.
- P–E Fit uses fonts from `app/concept-lab/_fonts/`, already present on `origin/main`.
- No preserved source required the branch-only `@fontsource-variable/*` packages during inspection; package files were therefore not copied.
- The canonical `content/` directory was not modified by the preservation operation.

## Intentionally excluded

The following remain only in the original dirty worktree and were not copied:

- `incoming-assets/` duplicate P–E Fit source copies
- AET/P–E Fit screenshot sets and other root screenshots
- `.review-shots/`
- motion captures and temporary browser QA output
- `public/experiments/`
- `%SystemDrive%/`
- `.b2-review/`
- `.claude/`
- `.tmp-focus.mjs`
- `!e.complete`
- `.next/`, `.vercel/`, `.wrangler/`, `dist/`, `node_modules/`, and build metadata
- the original modified production-matching `app/concept-lab/page.tsx` and `sketchnote.css`
- RTA target-route source: RTA is already frozen in production and is not part of this archive migration

No cleanup or duplicate resolution was performed in the source worktree.

## Relationship to production

This archive begins directly at current `origin/main`. It does not contain inherited `feature/rta-canonical-promotion` ancestry. It must not be treated as a deployable release and must not be merged wholesale into `main`.

The production RTA implementation remains the source of truth. This archive preserves future benchmark candidates and visual research only.
