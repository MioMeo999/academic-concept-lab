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

The script reports `FAIL` for a non-200 route, page crash, console error,
essential resource failure, horizontal overflow, or reduced-motion failure. It
reports `WARN` for axe findings, warnings and conditions that need human review.
An axe finding does not authorize changing a frozen benchmark in the harness.

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

Create desktop and mobile contact sheets from a JSON report:

```text
npm run verify:contact-sheet -- D:\path\to\representative-report.json
```

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

Interaction probes are deliberately small: AET map/read-under-it controls,
Gestalt perceptual/listening controls, RTA analytic controls, save/restore,
and neighbourhood/fallback navigation are observed where semantic controls
exist. Each result records the control used, the focused change and the
accessible state. The harness does not infer academic meaning or grade visual
quality.

Experience manifests provide benchmark/frozen context. A frozen route remains
informationally marked as `FROZEN EXPERIENCE — VISUAL CHANGE REQUIRES EXPLICIT
REVIEW`; this harness never pixel-locks or silently rewrites a frozen page.
Human review must still assess composition, hierarchy, materiality, density,
conceptual continuity, visual noise and whether the page feels like the right
knowledge object.

Wave 0C deliberately adds no page CSS, canonical copy, artwork, route, or
interaction implementation. It does not replace targeted accessibility review
or production smoke testing when a change is ready to ship.
