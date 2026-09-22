# Visual and accessibility verification harness

Wave 0C adds a verification surface for the Concept Lab. It is a test
instrument, not a visual redesign system. The harness distinguishes cheap,
deterministic structure checks from browser evidence and human visual review.

## Tiers

Tier A is the fast route/viewport contract in
`tests/verification-config.test.ts`. It checks the named representative
routes, the full-site route inventory, the five standard viewport widths, and
the route rationale. It runs with the existing `npm test` command and does not
start a browser.

Tier B is the real-browser harness in `scripts/verify-browser.mjs`. It uses
Playwright Core with the locally installed Edge/Chromium executable and axe-core
when available. It records, per route and viewport:

- HTTP status and final URL;
- relevant console errors/warnings, page errors and failed document/script/style/font/image requests;
- viewport dimensions, scroll dimensions and horizontal overflow;
- heading order/count, landmarks and image-alt presence/load state;
- first-tab focus, semantic control state and keyboard activation evidence;
- reduced-motion availability and content/control survival;
- axe violations/incomplete checks as review warnings;
- a full-page screenshot for human review.

The report has two independent statuses. `gateStatus` is `PASS` or `FAIL` and
covers deterministic failures: navigation or non-2xx routes, page or console
errors, essential-resource failures, overflow, required semantic failures,
broken required interactions, and reduced-motion functional failures.
`reviewStatus` is `CLEAR` or `WARN` and covers axe violations/incomplete checks,
console warnings, frozen-benchmark review, and the required human visual pass.
The summary therefore reports structural truth separately, for example
`60 structural PASS · 0 structural FAIL · 60 with review warnings`.
Accessibility findings remain visible; they are never relabelled as passing.

## Running it

Build a production-shaped local app first:

```text
npm run build
```

Then run the representative set (the script starts and stops `vinext dev`,
which serves source and client assets correctly on Windows):

```text
npm run verify:browser
```

Run all currently registered user-facing records:

```text
npm run verify:browser:full
```

The normal build gate still runs separately with `npm run build`. To point the
harness at an already running production-shaped server, use
`--base-url http://localhost:4173 --server start`; this is useful in CI or on
hosts whose production server serves Vite assets correctly.

Set `CONCEPT_LAB_BROWSER_PATH` when CI or another workstation uses a different
browser executable. `--base-url` can point at an already running production-
shaped server. Reports and screenshots go outside the repository by default to
`D:\OpenAI\CodexHome\visualizations\<date>\concept-lab-verification`; use
`--output` to choose another evidence directory. No screenshot is committed.

Create fold and full-page ecology sheets from a JSON report:

```text
npm run verify:contact-sheet -- D:\path\to\representative-report.json
```

The command writes four outputs: `desktop-fold-contact-sheet.png` and
`mobile-fold-contact-sheet.png` use viewport screenshots to answer “what does
the page first present?”; `desktop-ecology-contact-sheet.png` and
`mobile-ecology-contact-sheet.png` use full-page screenshots to answer “what
shape does the whole page have?”. Ecology sheets use one canonical desktop
(1440px) or mobile (390px) capture per route and preserve proportional document
height within a bounded display height so route silhouettes and quiet zones
remain visible. Neither sheet is a pixel regression test or an automatic grade
of design quality.

`verify:browser` is intentionally separate from the normal test command; it is
slower, starts a browser, writes screenshots, and remains an explicit review
step. Contact sheets preserve the page silhouette and route labels so a human
can review the visual ecology without treating pixels as an automated pass.

## Coverage and review boundary

The representative set covers Home, Library, Saved, About, generic theory,
frozen AET, the music benchmark and a specialized music record, frozen RTA,
generic method, mechanism and study. Full-site adds the remaining registered
records. The named set is a stable smoke surface, not a prediction about
future page design; add a route when a new user-facing record becomes
canonical.

Interaction probes are deliberately small and route-specific. AET verifies the
existing “Read under it” map toggle; Gestalt verifies a controlled listening
preset; RTA verifies a recursive phase tab when present; P–E Fit verifies
save/restore plus a relation link and the separate Library fallback. The
Library landing page is not mislabeled as a neighbourhood interaction. Each
probe records its id, selector, accessible target, keyboard method, before and
after state, expected and observed change, and `PASS`, `FAIL`, or
`NOT_APPLICABLE`. A missing optional frozen control is reported as
`NOT_APPLICABLE`, never faked as a pass.

The reduced-motion pass repeats the route checks with
`prefers-reduced-motion: reduce`. AET and Gestalt run one bounded conceptual
probe in that mode and confirm that content remains available, keyboard
activation works, and accessible state still changes. RTA is included when a
suitable stateful control exists.

Experience manifests provide benchmark/frozen context. A frozen route remains
informationally marked as `FROZEN EXPERIENCE — VISUAL CHANGE REQUIRES EXPLICIT
REVIEW`; this harness never pixel-locks or silently rewrites a frozen page.
Human review must still assess composition, hierarchy, materiality, density,
conceptual continuity, visual noise and whether the page feels like the right
knowledge object. On Windows, `vinext dev` is the stable default for local
browser capture because `vinext start` can serve Vite assets with an incorrect
path separator. The harness uses a bounded retry for a clear dev-compilation
navigation timeout; a repeated failure remains a structural gate failure.

Wave 0C deliberately adds no page CSS, canonical copy, artwork, route, or
interaction implementation. It does not replace targeted accessibility review
or production smoke testing when a change is ready to ship.
