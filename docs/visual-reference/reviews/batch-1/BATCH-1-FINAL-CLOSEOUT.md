# Batch 1 final closeout

**Status:** Ready for closeout review. Batch 2 has not started.

## JD–R mobile interaction

Selecting **resources adequate** or **resources rich** now brings the resource pathways into the mobile viewport at their existing scale. The same workplace drawing remains horizontally pannable. Two visible view controls move between **Demands + worker** and **Resource pathways**; their pressed states follow both direct selection and manual panning. They are keyboard operable, have 44px minimum touch height, and respect reduced motion. The selected academic explanation and authored artwork are unchanged.

The before/after mobile screenshots are included in the closeout export. The after view shows the worker, both outgoing routes, and the support/growth scenes together, while retaining the explicit route controls for return and exploration.

## Long-page screenshot diagnosis

The browser full-page capture issue is a capture limit, not a page rendering defect. A current 390px-wide JD–R `fullPage` screenshot is 20,561px tall, but a measured 300px band beginning at y=16,500 contains no dark pixels. At that same y position, the live browser still has a 20,561px document, shows chapter 07 (Sources), and renders cited work and the provenance section. A normal viewport screenshot at y=16,500 confirms that content. The page also reaches its rendered footer at the bottom.

I captured each route as overlapping viewport screenshots and stitched the visible strips into complete page images. The 100px overlap removes repeated sticky navigation while preserving the document between screenshots.

| Record | Desktop page height | Desktop segments | Mobile page height | Mobile segments |
| --- | ---: | ---: | ---: | ---: |
| JD–R | 14,705px | 17 | 20,561px | 28 |
| HPA Axis | 17,528px | 20 | 23,796px | 32 |
| IPA | 16,084px | 18 | 26,040px | 35 |
| Tonal Hierarchy | 21,382px | 24 | 32,821px | 44 |

All eight route/viewport captures reached the source or provenance region and the site footer. Across the capture pass, the browser reported no page or console errors and no failed images. At 390px, each document width matched the viewport width. Tonal Hierarchy’s citation footers are inside its source list; the final capture was checked against the later site footer.

## Regression results

- `npm run lint` — passed.
- `npx tsc --noEmit` — passed.
- `npm test` — build passed; all 77 tests passed.
- Browser: JD–R at 320px has no document overflow; the Resources Adequate choice moves to the resource side; keyboard controls return to either view; both controls retain 44px touch height; reduced-motion mode uses an immediate scroll.
- Browser: all four records loaded at 1440px desktop and 390px mobile; visible imagery loaded; source/provenance and footer sections were inspected in viewport captures.
- HPA’s mobile diagram-to-explanation sequence remains as approved; chapter navigation retains the reader’s place.

## Scope and release boundary

The source diff is limited to the JD–R interaction, its local module styles, this closeout report, and a screenshot-coverage note in the earlier art-direction review. No artwork or canonical academic text was changed. The approved Home and Library remain untouched. Work remains on `feature/sitewide-creative-redesign`; it has not been merged into `main` or deployed to Production.

The separate `academic-concept-lab-batch1-final-closeout.zip` export contains the JD–R before/after pair, all eight segmented full-page captures, and enlarged page-end views for upload and visual review.
