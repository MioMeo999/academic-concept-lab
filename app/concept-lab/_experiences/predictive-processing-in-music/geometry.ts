import type { PredictivePrecisionContext } from "@/content/types";

/* ---------------------------------------------------------------------------
   Predictive Processing in Music: the envelope of an expectation.

   The record's precision illustration holds one physical event constant — an
   onset 120 ms after the expected moment — and changes only the history that
   makes the onset more or less predictable, as a narrow or a broad Gaussian
   envelope. Nothing here is a brain distribution, and none of it predicts a
   neural response magnitude: it is the plain arithmetic of a Gaussian, drawn.
   ------------------------------------------------------------------------- */

/** the window drawn, in ms either side of the expected onset */
export const WINDOW = 180;
export const SIGMA = { min: 20, max: 130 };

/** the density of a Gaussian centred on the expected onset — the same area (one) at any width */
export const density = (ms: number, sigma: number) => Math.exp(-0.5 * (ms / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI));

/** how many standard deviations from the expected mean an offset lies */
export const standardised = (offsetMs: number, sigma: number) => offsetMs / sigma;

/** inverse variance: the Gaussian teaching form of precision, in units of 1/ms² */
export const precisionOf = (sigma: number) => 1 / (sigma * sigma);

/** the record's constructed context that a width sits exactly on, if it does */
export const contextAt = (contexts: PredictivePrecisionContext[], sigma: number) => contexts.findIndex((c) => c.sigmaMs === sigma);

/** the drawing's own coordinates: 640 wide, with the envelope's floor at `base` */
export const PLOT = { x0: 56, x1: 584, base: 252, height: 196, peakAt: SIGMA.min };
export const xOfMs = (ms: number) => PLOT.x0 + ((ms + WINDOW) / (2 * WINDOW)) * (PLOT.x1 - PLOT.x0);
/** the tallest envelope drawn (at the narrowest width) reaches `height` above the floor */
export const yOfDensity = (d: number) => PLOT.base - (d / density(0, PLOT.peakAt)) * PLOT.height;

/** points along an envelope, in the drawing's coordinates */
export function envelopePoints(sigma: number, step = 6): [number, number][] {
  const out: [number, number][] = [];
  for (let ms = -WINDOW; ms <= WINDOW; ms += step) out.push([xOfMs(ms), yOfDensity(density(ms, sigma))]);
  return out;
}

/** the ladder as it is drawn: the record lists the levels from the fast, sensory end upwards, so the higher, slower level is the top rung and the sensory end is the bottom one */
export const ladderRungs = <T,>(fromSensory: T[]): T[] => [...fromSensory].reverse();

/** what the trace of a comparator holds at each event: 0 where the sound matched what was expected */
export type Slot = { expected: boolean; heard: boolean };
export const residual = (s: Slot) => (s.expected === s.heard ? 0 : s.expected ? -1 : 1);

/** the record's omission example: four beats, then an expected onset that is present or is not */
export function omissionSlots(present: boolean, preceding: number): Slot[] {
  return [...Array.from({ length: preceding }, () => ({ expected: true, heard: true })), { expected: true, heard: present }];
}
