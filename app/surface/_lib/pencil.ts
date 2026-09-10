/**
 * Surface — pencil texture.
 *
 * The gap this closes: a ring, an arrow or a squiggle emitted as one SVG path
 * is a *vector line*. It has a constant width, a constant darkness and a
 * perfectly continuous edge, and no amount of wobble in its geometry fixes
 * that — the eye reads the evenness, not the wander.
 *
 * A pencil line is none of those things. It is laid down two or three times,
 * each pass landing slightly off the last; it breaks where the tooth of the
 * paper misses; it goes dark where the hand leans in near the middle of a
 * stroke and pale where the hand is arriving or leaving.
 *
 * So every mark on the surface is built from point arrays here rather than
 * from path strings, and `pencil()` turns a point array into that stack of
 * broken, offset, pressure-varying passes. It is the one function that decides
 * whether the whole page reads as drawing or as illustration.
 */

import { rng, type Pt } from "./pigment";

const r1 = (n: number) => Math.round(n * 2) / 2;

export function toPath(pts: Pt[]): string {
  if (pts.length === 0) return "";
  let d = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
  for (let i = 1; i < pts.length; i += 1) d += `L${r1(pts[i][0])} ${r1(pts[i][1])}`;
  return d;
}

export type Pass = { d: string; o: number; w: number };

export type PencilOptions = {
  seed?: number;
  /** How many times the hand goes over the run. */
  passes?: number;
  /** How far a later pass drifts from the first. */
  drift?: number;
  /** 0 = unbroken contact; 1 = barely touching. */
  broken?: number;
  weight?: number;
  opacity?: number;
  /** Pale at the ends, darker through the middle. */
  taper?: boolean;
  /** Keep the first pass whole — for a mark that must stay legible. */
  keepFirst?: boolean;
};

/**
 * Split a run into contact segments with small lifts between them. The lifts
 * are what make the line look deposited rather than drawn by a machine.
 */
function fragment(pts: Pt[], r: () => number, broken: number): Pt[][] {
  if (broken <= 0 || pts.length < 4) return [pts];
  const out: Pt[][] = [];
  let i = 0;
  while (i < pts.length - 1) {
    const run = Math.max(2, Math.round((pts.length - 1) * (0.18 + r() * 0.42) * (1 - broken * 0.35)));
    const end = Math.min(pts.length, i + run);
    if (end - i >= 2) out.push(pts.slice(i, end));
    // The lift: a couple of samples where the point is off the paper.
    i = end + Math.max(0, Math.round(broken * (0.4 + r() * 2.2)));
  }
  return out.length ? out : [pts];
}

/**
 * A point array as pencil. Returns the passes to stroke, darkest first.
 */
export function pencil(pts: Pt[], o: PencilOptions = {}): Pass[] {
  const {
    seed = 1, passes = 3, drift = 1.1, broken = 0.3,
    weight = 1.4, opacity = 0.75, taper = true, keepFirst = false,
  } = o;
  if (pts.length < 2) return [];
  const r = rng(seed);
  const out: Pass[] = [];

  for (let p = 0; p < passes; p += 1) {
    const dx = p === 0 ? 0 : (r() - 0.5) * drift * 2;
    const dy = p === 0 ? 0 : (r() - 0.5) * drift * 2;
    // Later passes are lighter and thinner: the hand is confirming, not drawing.
    const po = opacity * (p === 0 ? 1 : 0.34 + r() * 0.38);
    const pw = weight * (p === 0 ? 1 : 0.55 + r() * 0.5);
    const moved: Pt[] = pts.map(([x, y]) => [x + dx, y + dy]);
    const frags = keepFirst && p === 0 ? [moved] : fragment(moved, r, broken);

    for (const f of frags) {
      if (!taper) {
        out.push({ d: toPath(f), o: po, w: pw });
        continue;
      }
      /* Pressure across a contact segment: pale on landing, firm through the
         middle, pale again on the lift. Emitted as three overlapping pieces
         rather than a true variable-width stroke, which SVG has no cheap way
         to express. */
      const n = f.length;
      const a = Math.max(2, Math.round(n * 0.3));
      const b = Math.max(a, Math.round(n * 0.7));
      const lead = f.slice(0, a + 1);
      const core = f.slice(Math.max(0, a - 1), b + 1);
      const tail = f.slice(Math.max(0, b - 1));
      if (lead.length > 1) out.push({ d: toPath(lead), o: po * 0.62, w: pw * 0.82 });
      if (core.length > 1) out.push({ d: toPath(core), o: po, w: pw });
      if (tail.length > 1) out.push({ d: toPath(tail), o: po * 0.55, w: pw * 0.78 });
    }
  }
  return out;
}

/* ------------------------------------------------------- point generators -- */

/** A hand ring: `laps` open loops that never quite meet. */
export function ringPts(rx: number, ry: number, seed = 5, laps = 2, wobble = 0.09): Pt[][] {
  const r = rng(seed);
  const out: Pt[][] = [];
  for (let i = 0; i < laps; i += 1) {
    const k = 1 + i * 0.04 + (r() - 0.5) * 0.06;
    const rot = (r() - 0.5) * 0.32;
    const cos = Math.cos(rot);
    const sin = Math.sin(rot);
    const start = r() * Math.PI * 2;
    const span = Math.PI * 2 * (0.9 + r() * 0.3);
    const steps = 30;
    const pts: Pt[] = [];
    for (let j = 0; j <= steps; j += 1) {
      const a = start + (j / steps) * span;
      const wob = 1 + Math.sin(a * 2.6 + start) * wobble + (r() - 0.5) * wobble * 0.8;
      const x = Math.cos(a) * rx * k * wob;
      const y = Math.sin(a) * ry * k * wob;
      pts.push([x * cos - y * sin, x * sin + y * cos]);
    }
    out.push(pts);
  }
  return out;
}

/** A bowed run between two points. */
export function bowPts(x1: number, y1: number, x2: number, y2: number, bend = 0.2, seed = 7): Pt[] {
  const r = rng(seed);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const push = len * bend;
  const steps = Math.max(10, Math.round(len / 8));
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const arc = Math.sin(Math.PI * t) * push;
    const jit = (r() - 0.5) * 1.2 * Math.sin(Math.PI * t);
    pts.push([x1 + dx * t + nx * (arc + jit), y1 + dy * t + ny * (arc + jit)]);
  }
  return pts;
}

/** The two strokes of an arrowhead, aimed along the end of a bow. */
export function headPts(pts: Pt[], size = 9, seed = 11): Pt[][] {
  if (pts.length < 3) return [];
  const r = rng(seed);
  const end = pts[pts.length - 1];
  const prev = pts[Math.max(0, pts.length - 4)];
  const a = Math.atan2(end[1] - prev[1], end[0] - prev[0]);
  const spread = 0.42 + r() * 0.14;
  const s = size * (0.85 + r() * 0.3);
  return [
    [[end[0] - Math.cos(a - spread) * s, end[1] - Math.sin(a - spread) * s], end],
    [[end[0] - Math.cos(a + spread) * s, end[1] - Math.sin(a + spread) * s], end],
  ];
}

/** A wavering run — an underline, a brace, a bit of thinking-out-loud. */
export function squigglePts(len: number, seed = 31, cycles = 5, amp = 4): Pt[] {
  const r = rng(seed);
  const steps = cycles * 10;
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    pts.push([t * len, Math.sin(t * Math.PI * 2 * cycles) * amp * (0.6 + r() * 0.7)]);
  }
  return pts;
}

/** A closed hand contour sampled through control points. */
export function contourPts(ctrl: Pt[], seed = 29, wobble = 3): Pt[] {
  const r = rng(seed);
  const n = ctrl.length;
  const p = ctrl.map(([x, y]) => [x + (r() - 0.5) * wobble, y + (r() - 0.5) * wobble] as Pt);
  const out: Pt[] = [];
  for (let i = 0; i < n; i += 1) {
    const p0 = p[(i - 1 + n) % n];
    const p1 = p[i];
    const p2 = p[(i + 1) % n];
    const p3 = p[(i + 2) % n];
    for (let s = 0; s < 10; s += 1) {
      const t = s / 10;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push([
        0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
      ]);
    }
  }
  out.push(out[0]);
  return out;
}

/** Rays of a star. */
export function burstPts(radius: number, seed = 23, rays = 8): Pt[][] {
  const r = rng(seed);
  return Array.from({ length: rays }, (_, i) => {
    const a = (i / rays) * Math.PI * 2 + r() * 0.28;
    const len = radius * (0.5 + r() * 0.8);
    return [
      [-Math.cos(a) * len * 0.3, -Math.sin(a) * len * 0.3],
      [Math.cos(a) * len, Math.sin(a) * len],
    ] as Pt[];
  });
}

/** A straight-ish run, for staves, stems and registration lines. */
export function runPts(x1: number, y1: number, x2: number, y2: number, seed = 3, amp = 1.2): Pt[] {
  const r = rng(seed);
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const steps = Math.max(4, Math.min(26, Math.round(len / 9)));
  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const off = (r() - 0.5) * amp * (0.35 + Math.sin(Math.PI * t));
    pts.push([x1 + (x2 - x1) * t + nx * off, y1 + (y2 - y1) * t + ny * off]);
  }
  return pts;
}
