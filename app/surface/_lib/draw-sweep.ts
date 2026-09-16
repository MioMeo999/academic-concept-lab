/**
 * Surface — continuous shading.
 *
 * The one mark that is not built from `pencil()`: a shading sweep is a single
 * unbroken run that turns at each end and comes back, and breaking it into
 * passes would destroy exactly the property that makes it read as shading.
 */

import { rng, toPath, type Pt } from "./pigment";

export type SweepOptions = {
  w: number;
  h: number;
  rows?: number;
  seed?: number;
  /** Wobble across the run. */
  amp?: number;
  /** How far past the edge the turn overshoots — the hand rounding a corner. */
  overshoot?: number;
  /** Bow in each run, so the shading curves instead of ruling. */
  bow?: number;
  /** Shrink the run toward the ends of the field, giving a soft lens shape. */
  taper?: number;
};

/**
 * Continuous back-and-forth shading: one unbroken polyline that runs across
 * the field, turns, and comes back. This is the workhorse mark — a loose
 * pencil filling an area without the point ever leaving the paper.
 */
export function sweep(o: SweepOptions): string {
  const { w, h, rows = 26, seed = 1, amp = 2.2, overshoot = 4, bow = 6, taper = 0 } = o;
  const r = rng(seed);
  const pts: Pt[] = [];
  const steps = 9;

  for (let i = 0; i <= rows; i += 1) {
    const v = i / rows;
    const y = -h / 2 + v * h;
    const back = i % 2 === 1;
    // The turn at each end overshoots and rounds, as a wrist does.
    const over = overshoot * (0.5 + r());
    const shrink = taper ? 1 - taper * Math.abs(Math.sin(Math.PI * v + Math.PI / 2)) : 1;
    const half = (w / 2) * shrink;
    const x0 = -half - over;
    const x1 = half + over;
    const b = bow * (r() - 0.5) * 2;

    for (let j = 0; j <= steps; j += 1) {
      const t = j / steps;
      const tt = back ? 1 - t : t;
      const x = x0 + tt * (x1 - x0);
      const curve = Math.sin(Math.PI * t) * b;
      pts.push([x, y + curve + (r() - 0.5) * amp]);
    }
  }
  return toPath(pts);
}
