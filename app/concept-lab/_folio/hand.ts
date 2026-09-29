/* ---------------------------------------------------------------------------
   The hand: deterministic geometry for marks that should look drawn.

   Every function takes a seed, so the same mark is produced on the server and
   in the browser — no hydration drift, no randomness at render time. The
   paths are plain SVG `d` strings; pair them with `filter="url(#folio-pencil)"`
   (or `folio-graphite`) for the pencil's texture. These helpers change how a
   mark is drawn, never what it says: a brace still groups, an arrow still
   points, and the meaning lives in the words beside it.
   ------------------------------------------------------------------------- */

export type Pt = [number, number];

/** A small seeded generator (mulberry32). */
export function seeded(seed = 1): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => (Math.round(n * 10) / 10).toString();

/** A smooth path through points (Catmull–Rom converted to cubic Béziers). */
export function smooth(pts: Pt[], closed = false): string {
  if (pts.length < 2) return "";
  const P = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${f(P[1][0])} ${f(P[1][1])}`;
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** A line the hand did not quite keep straight. */
export function line(x1: number, y1: number, x2: number, y2: number, { seed = 1, wander = 1.6, segments = 6 }: { seed?: number; wander?: number; segments?: number } = {}): string {
  const r = seeded(seed);
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const pts: Pt[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const w = i === 0 || i === segments ? 0.3 : 1;
    const o = (r() - 0.5) * 2 * wander * w;
    pts.push([x1 + dx * t + nx * o, y1 + dy * t + ny * o]);
  }
  return smooth(pts);
}

/** An imperfect ring: it overshoots its own start and is never quite round. */
export function ring(cx: number, cy: number, rx: number, ry: number, { seed = 1, wobble = 0.05, overlap = 0.14, tilt = 0 }: { seed?: number; wobble?: number; overlap?: number; tilt?: number } = {}): string {
  const r = seeded(seed);
  const n = 16;
  const start = r() * Math.PI * 2;
  const span = Math.PI * 2 * (1 + overlap);
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const th = start + span * t;
    // the second lap drifts outward, as a hand's does
    const drift = 1 + (t > 0.85 ? (t - 0.85) * 0.5 : 0);
    const k = (1 + (r() - 0.5) * 2 * wobble) * drift;
    const x = Math.cos(th) * rx * k, y = Math.sin(th) * ry * k;
    pts.push([cx + x * Math.cos(tilt) - y * Math.sin(tilt), cy + x * Math.sin(tilt) + y * Math.cos(tilt)]);
  }
  return smooth(pts);
}

/** A curly brace spanning x1→x2. `up` opens the point away from the content above. */
export function brace(x1: number, x2: number, y: number, { depth = 12, up = true, seed = 1 }: { depth?: number; up?: boolean; seed?: number } = {}): string {
  const r = seeded(seed);
  const j = () => (r() - 0.5) * 1.6;
  const m = (x1 + x2) / 2;
  const s = up ? -1 : 1;
  const w = x2 - x1;
  const q = Math.min(depth * 1.4, w / 4);
  return [
    `M${f(x1)} ${f(y + j())}`,
    `C${f(x1)} ${f(y + s * depth * 0.55)} ${f(x1 + q * 0.5)} ${f(y + s * depth)} ${f(x1 + q * 1.4)} ${f(y + s * depth + j())}`,
    `L${f(m - q * 1.3)} ${f(y + s * depth + j())}`,
    `C${f(m - q * 0.4)} ${f(y + s * depth)} ${f(m - q * 0.2)} ${f(y + s * depth * 1.5)} ${f(m + j())} ${f(y + s * depth * 2)}`,
    `C${f(m + q * 0.2)} ${f(y + s * depth * 1.5)} ${f(m + q * 0.4)} ${f(y + s * depth)} ${f(m + q * 1.3)} ${f(y + s * depth + j())}`,
    `L${f(x2 - q * 1.4)} ${f(y + s * depth + j())}`,
    `C${f(x2 - q * 0.5)} ${f(y + s * depth)} ${f(x2)} ${f(y + s * depth * 0.55)} ${f(x2)} ${f(y + j())}`,
  ].join("");
}

/** The same brace, spanning y1→y2 beside a column. `left` opens the point leftward. */
export function braceV(y1: number, y2: number, x: number, { depth = 12, left = true, seed = 1 }: { depth?: number; left?: boolean; seed?: number } = {}): string {
  const r = seeded(seed);
  const j = () => (r() - 0.5) * 1.6;
  const m = (y1 + y2) / 2;
  const s = left ? -1 : 1;
  const h = y2 - y1;
  const q = Math.min(depth * 1.4, h / 4);
  return [
    `M${f(x + j())} ${f(y1)}`,
    `C${f(x + s * depth * 0.55)} ${f(y1)} ${f(x + s * depth)} ${f(y1 + q * 0.5)} ${f(x + s * depth + j())} ${f(y1 + q * 1.4)}`,
    `L${f(x + s * depth + j())} ${f(m - q * 1.3)}`,
    `C${f(x + s * depth)} ${f(m - q * 0.4)} ${f(x + s * depth * 1.5)} ${f(m - q * 0.2)} ${f(x + s * depth * 2)} ${f(m + j())}`,
    `C${f(x + s * depth * 1.5)} ${f(m + q * 0.2)} ${f(x + s * depth)} ${f(m + q * 0.4)} ${f(x + s * depth + j())} ${f(m + q * 1.3)}`,
    `L${f(x + s * depth + j())} ${f(y2 - q * 1.4)}`,
    `C${f(x + s * depth)} ${f(y2 - q * 0.5)} ${f(x + s * depth * 0.55)} ${f(y2)} ${f(x + j())} ${f(y2)}`,
  ].join("");
}

/** A wavering underline. */
export function underline(x1: number, x2: number, y: number, { seed = 1, amp = 2.2, waves = 5 }: { seed?: number; amp?: number; waves?: number } = {}): string {
  const r = seeded(seed);
  const n = Math.max(4, waves * 2);
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push([x1 + (x2 - x1) * t, y + Math.sin(t * Math.PI * waves) * amp * (0.6 + r() * 0.8) + (r() - 0.5) * 0.8]);
  }
  return smooth(pts);
}

/** Two short strokes forming an open arrowhead at (x, y) pointing along `angle` (radians). */
export function arrowHead(x: number, y: number, angle: number, { size = 11, spread = 0.5, seed = 1 }: { size?: number; spread?: number; seed?: number } = {}): string {
  const r = seeded(seed);
  const a1 = angle + Math.PI - spread + (r() - 0.5) * 0.14;
  const a2 = angle + Math.PI + spread + (r() - 0.5) * 0.14;
  const l1 = size * (0.9 + r() * 0.2), l2 = size * (0.9 + r() * 0.2);
  return `M${f(x + Math.cos(a1) * l1)} ${f(y + Math.sin(a1) * l1)}L${f(x)} ${f(y)}L${f(x + Math.cos(a2) * l2)} ${f(y + Math.sin(a2) * l2)}`;
}

/** A curve through control points with the hand's slight wander. */
export function curve(pts: Pt[], { seed = 1, wander = 1.2 }: { seed?: number; wander?: number } = {}): string {
  const r = seeded(seed);
  return smooth(pts.map(([x, y], i) => (i === 0 || i === pts.length - 1 ? [x, y] : [x + (r() - 0.5) * 2 * wander, y + (r() - 0.5) * 2 * wander]) as Pt));
}
