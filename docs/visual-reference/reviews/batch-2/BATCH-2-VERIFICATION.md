# Batch 2 verification record

Branch: `codex/batch2-creative-redesign`

Approved base: `f2bd7964ba8a0dd6db01a38e20b92af2b107f2df`

Scope: focused Huron readability refinements. Meyer and IDyOM remain unchanged.

## Code checks

- `npm run lint` passed.
- `npx tsc --noEmit` passed.
- `npm run build` passed. Vinext reported that static analysis cannot classify
  some routes that may use dynamic APIs. The build completed.
- `npm test` passed: 77 tests, 0 failures. The command also completed its build.

Command output is saved in `verification/lint.log`, `verification/typecheck.log`,
`verification/build.log` and `verification/tests.log`.

## Browser checks

The full browser audit against the local development server covered 26 routes
at 1440, 1024, 768, 390 and 360 CSS pixels. All 130 route and viewport checks
passed. The audit found no page errors, console errors, failed essential
resources, failed images or horizontal overflow. All configured keyboard,
reduced motion and Save persistence probes passed. Home, Library Hub and the
four approved Batch 1 records had no axe violations. The report marks routes
for human visual review by design; it does not treat that status as an
automated accessibility failure.

The focused local browser audit passed 24 checks. It verified Huron’s On-time
and Delayed states at 390px and 360px, confirmed that the Expected and Actual
labels do not overlap, and confirmed the unchanged values: 4.00 s / 4.00 s / 0
ms and 4.00 s / 5.50 s / 1.50 s. Keyboard selection, touch selection, audio
Play and Stop, reduced motion, desktop and mobile layout, and Save persistence
passed. Meyer’s third continuation updated the highlighted path and live
reading. IDyOM’s constructed teaching label remained visible; the Entropy + IC
and Later current piece states passed keyboard selection.

## Vercel Preview

The isolated branch deployed successfully for commit `fa6fa049baef1f6d78db28d962302efc8b7ba441`.
The [Batch 2 Preview](https://academic-concept-hwy8adlvn-mio11.vercel.app/)
is Ready. Deployment ID: `dpl_FMoWX1KdS1GcaVNHLbv8fwYHkk1N`. Its Vercel target
is not Production.

The hosted browser audit passed all 42 checks. Huron’s desktop timeline and
390px/360px timing states passed, as did Home, Library Hub, JD–R, HPA Axis,
IPA and Tonal Hierarchy at desktop and both mobile widths. Preview screenshots
in the handoff ZIP come from this deployment.

The route audit found no external anchor elements in the three records’ source
lists. Their citations, DOI identifiers, provenance and source trails render
as text. Internal record links passed the repository route tests. There were
no external source link targets to resolve in the browser.

## Local production server note

The local browser harness run with `--server start` returned HTTP 200 for the
HTML but 404 for its generated JavaScript and CSS assets on every route. That
local run did not verify the rendered site. The development server and the
hosted Vercel Preview both served and exercised the page successfully.

## Handoff

The review ZIP contains the creative brief, visual review, this record, the
prior complete Meyer and IDyOM capture sets, fresh segmented Huron desktop and
mobile captures, the before and after Huron screenshots, and browser reports.

The isolated branch is pushed. Do not merge into `main` or deploy Production.
Final human review remains the release gate.
