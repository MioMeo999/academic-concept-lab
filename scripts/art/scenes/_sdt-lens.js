/**
 * Shared geometry for the Self-Determination Theory "reason lens".
 *
 * One loop — a person's sense of self — with the same action line crossing it
 * in every state. The lens is drawn as separate pigment layers so the page can
 * move one reason across the loop and change its character, instead of
 * swapping pictures.
 */
export const LENS = { W: 800, H: 800, cx: 400, cy: 400, rx: 255, ry: 240, line: 400 };

export const wallPoly = (h, seed, k = 1, irregular = 0.05) =>
  h.blob(LENS.cx, LENS.cy, LENS.rx * k, LENS.ry * k, { seed, irregular, points: 110 });

export const closed = (poly) => [...poly, poly[0], poly[1], poly[2]];

/** A spiral inward: strands that fill a mass the way a hand circles it. */
export function spiral(cx, cy, rx, ry, turns = 3.2, phase = 0) {
  const pts = [];
  for (let t = 0; t <= 1; t += 0.004) {
    const k = 1 - 0.82 * t;
    const th = t * Math.PI * 2 * turns + phase;
    pts.push([cx + Math.cos(th) * rx * k * (1 + 0.05 * Math.sin(th * 3)), cy + Math.sin(th) * ry * k * (1 + 0.05 * Math.cos(th * 2))]);
  }
  return pts;
}

/** Strands that follow the wall, as if the hand travelled it. */
export function along(off, from, to, steps = 120, k = 1) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = from + (to - from) * (i / steps);
    const w = 1 + 0.02 * Math.sin(t * 7);
    pts.push([LENS.cx + Math.cos(t) * (LENS.rx * k + off) * w, LENS.cy + Math.sin(t) * (LENS.ry * k + off) * w]);
  }
  return pts;
}
