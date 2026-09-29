# Batch 3 verification record

Branch: `feature/batch3-creative-redesign`

Base: `e209b3f4ce517f80be52067f87980cc2391f32c1` (Batch 2 closeout)

Scope: the ten redesigned theory records listed in `BATCH-3-CREATIVE-BRIEF.md`,
and the shared changes that brief lists. Home, Library Hub, the Batch 1 records
and the Batch 2 records are not redesigned here; they were audited as part of
the full-site run below.

## Code checks

- `npm run lint` passed with no warnings.
- `npx tsc --noEmit` passed.
- `next build` — the command Vercel runs, Next.js 16.2.6 with Turbopack —
  passed: compiled, type-checked, 29 of 29 static pages generated. Every record
  route is server-rendered on demand.
- `npm test` passed: 137 tests, 0 failures. The command also completes its own
  `vinext build`. The tests include one rendered-page coverage test per
  redesigned record (every record string, citation, provenance note and source
  is asserted on the page) and 40 pure-logic tests for the small pieces of
  teaching logic the pages carry.

## Local browser checks (Edge, Playwright)

Each redesigned page has its own interaction script that operates every control
and asserts the drawing, the listed reading, the live status and the static
reading path that follow it. Each script ran three ways — desktop 1440,
mobile 390 with touch, and reduced motion — with zero failures.

| Record | Checks per run (desktop / mobile / reduced motion) |
| --- | --- |
| Self-Determination Theory | 24 / 24 / 24 |
| Social Exchange Theory | 35 / 35 / 35 |
| Person–Organisation Fit | 32 / 32 / 32 |
| Workplace Design | 24 / 23 / 24 |
| Auditory Scene Analysis | 22 / 22 / 22 |
| A Generative Theory of Tonal Music | 21 / 21 / 21 |
| Narmour’s Implication–Realization Theory | 43 / 43 / 43 |
| Statistical Learning of Music | 46 / 46 / 46 |
| Predictive Processing in Music | 37 / 38 / 37 |
| Music Preference and Person–Music Fit | 45 / 44 / 46 |

Where a count differs by mode, the mode skips a check that only makes sense on
that input (a mouse click on a drawn knot on a phone, for example). The first
Auditory Scene Analysis desktop run timed out on first load while the dev
server was compiling the route; the rerun passed 22 of 22.

axe-core ran against every redesigned page at 1440 and 390 CSS pixels: 20 scans,
0 violations. The first pass found one critical violation on Social Exchange
Theory at 390px — the “SET” branch of the family map has no year, and at phone
width the drawn label is hidden, so its button had no accessible name. Every
branch button now carries an explicit accessible name, and the rendered-page
test asserts it.

## Full-site browser audit on a production build

To test the runtime Vercel uses, the branch was built with `next build`,
started with `next start`, and audited with
`node scripts/verify-browser.mjs --mode full-site` at git
`05380f8be11ad6414fb265a3a1fec4f642489067`.

The audit covered 26 routes at 1440, 1024, 768, 390 and 360 CSS pixels.
**All 130 route and viewport checks passed the structural gate; none failed.**
Across all 130 there were no console errors or warnings, no page errors, no
failed requests, no horizontal overflow and no images missing alt text.

- Every redesigned page passed its configured interaction, keyboard and
  reduced-motion probes, and had **no axe violations at any viewport**.
- The report marks all routes for human visual review by design (its
  `reviewWarn` status); it does not treat that as an automated failure.
- axe reported findings only on routes this batch does not change: About
  (`color-contrast`), the frozen Affective Events Theory page
  (`color-contrast`, `landmark-complementary-is-top-level`, `landmark-unique`),
  Gestalt (`landmark-complementary-is-top-level`) and Reflexive Thematic Analysis
  (`color-contrast`). They are recorded here so they are not mistaken for
  Batch 3 regressions, and are out of this batch’s scope.

## Vercel Preview

Pushing the branch created a Preview automatically (the project is connected to
the GitHub repository). It is a Preview, not Production: its Vercel target is
empty, and the branch has not been merged.

- First Preview, for commit `4a152f68444960b9bbba48f113a06d94d534564f`:
  `https://academic-concept-qk6wud4tw-mio11.vercel.app`, deployment
  `dpl_147Pvfh1VJsVhZ4zWY1FREXXTr4d`, state Ready.
- Stable branch address, always the newest commit’s Preview:
  `https://academic-concept-lab-git-feature-batch3-creative-redesign-mio11.vercel.app`.
- The Vercel build log shows a clean build: Next.js 16.2.6, compiled in about
  10s, TypeScript finished, 29 of 29 pages generated, “Deployment completed”.
  The only warnings are Vercel’s Node engine notice and npm’s install-script
  notice.

The project has Vercel Authentication enabled for deployments, so the hosted
URLs require a signed-in Vercel session and an unauthenticated browser audit
cannot reach them. The automated audit above therefore ran against the local
`next build` + `next start` of the same commit rather than the hosted URL. A
hosted browser audit needs either a signed-in session or a temporary shareable
link; neither was created.
