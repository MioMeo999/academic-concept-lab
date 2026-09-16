/**
 * Atlas — mark geometry.
 *
 * Every generator is deterministic: geometry comes from a seed, never from
 * Math.random(), so the server and the client agree, and so a mark that has to
 * be *mechanically identical* across two conditions actually is. That property
 * is load-bearing on the Tonal Hierarchy and Predictive Processing spreads,
 * where the claim is that the probe or the target did not change.
 *
 * The tooth is baked into the geometry rather than applied as an SVG filter.
 * A displacement filter over a few thousand hatch strokes is unaffordable, and
 * a filter is also the wrong idea: the unsteadiness belongs to the stroke, not
 * to a treatment laid over the page. Grain lives in the mark, not the paper.
 *
 * Nothing here encodes meaning. These are material behaviours only —
 * accumulation, direction, pressure, interruption, boundary, residue. What a
 * mark *means* is stated in text by the spread that uses it.
 */

export type Pt = [number, number];

/** Mulberry32. Small, fast, adequate for mark jitter. */
export function rng(seed: number): () => number {
  let a = (seed >>> 0) || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 100) / 100;

export function toPath(pts: Pt[]): string {
  if (pts.length === 0) return "";
  let d = `M${round(pts[0][0])} ${round(pts[0][1])}`;
  for (let i = 1; i < pts.length; i += 1) d += `L${round(pts[i][0])} ${round(pts[i][1])}`;
  return d;
}

/** A straight run broken into a wandering polyline with its own slight slope. */
export function wander(x1: number, y1: number, x2: number, y2: number, r: () => number, amp = 1.2): Pt[] {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const steps = Math.max(2, Math.min(10, Math.round(len / 14)));
  const nx = -(y2 - y1) / (len || 1);
  const ny = (x2 - x1) / (len || 1);
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    // Ends settle; the middle of a stroke wanders most.
    const ease = Math.sin(Math.PI * t);
    const off = (r() - 0.5) * amp * (0.35 + ease);
    pts.push([x1 + (x2 - x1) * t + nx * off, y1 + (y2 - y1) * t + ny * off]);
  }
  return pts;
}

export type Stroke = { d: string; p: number; w: number };

export type HatchOptions = {
  w: number;
  h: number;
  /** Degrees; 0 lays strokes horizontally. The caller rotates about the centre. */
  angle?: number;
  gap?: number;
  seed?: number;
  jitter?: number;
  /** 0 = every stroke spans the field; 1 = heavily interrupted (scumble). */
  broken?: number;
  weight?: number;
  pressure?: [number, number];
  /** Accumulation across the field, perpendicular to stroke direction. */
  ramp?: "none" | "in" | "out" | "centre";
  /** Hard ceiling on deposited strokes. */
  max?: number;
};

/**
 * Parallel strokes filling a w×h box centred on the origin, generated in an
 * unrotated frame. `angle` comes back as advisory metadata so the caller can
 * apply one rotation to the whole group instead of rotating each stroke.
 */
export function hatch(o: HatchOptions): { angle: number; strokes: Stroke[] } {
  const {
    w,
    h,
    angle = 0,
    gap = 5,
    seed = 1,
    jitter = 1.3,
    broken = 0,
    weight = 0.85,
    pressure = [0.3, 0.8],
    ramp = "none",
    max = 340,
  } = o;

  const r = rng(seed);
  // Cover the box at any rotation.
  const reach = Math.hypot(w, h) / 2 + gap;

  /* A stroke budget has to *thin* a field, never truncate one. Cutting off at
     a fixed count leaves half a rectangle hatched and the other half bare —
     which reads as a mark that ran out, and would put the pigment somewhere
     other than where the page said it was. So an oversized field is spaced
     more widely instead, and stays a whole field. */
  const perRow = broken > 0 ? 2.4 + broken * 2.2 : 1;
  let g = gap;
  let rows = Math.max(1, Math.floor((reach * 2) / g));
  if (rows * perRow > max) {
    g = (reach * 2 * perRow) / max;
    rows = Math.max(1, Math.floor((reach * 2) / g));
  }
  rows = Math.min(rows, 400);
  const step = (reach * 2) / rows;
  const strokes: Stroke[] = [];

  for (let i = 0; i <= rows; i += 1) {
    if (strokes.length >= max * 1.6) break;
    const t = rows === 0 ? 0.5 : i / rows;
    const y = -reach + i * step + (r() - 0.5) * step * 0.5;

    let dens = 1;
    if (ramp === "in") dens = 0.15 + t * 1.05;
    else if (ramp === "out") dens = 1.2 - t * 1.05;
    else if (ramp === "centre") dens = 0.2 + Math.sin(Math.PI * t) * 1.0;
    if (dens < 1 && r() > dens) continue;

    const x1 = -reach + (r() - 0.5) * jitter * 2;
    const x2 = reach + (r() - 0.5) * jitter * 2;
    const slope = (r() - 0.5) * step * 1.5;
    const press = Math.min(1, (pressure[0] + r() * (pressure[1] - pressure[0])) * Math.min(1.1, dens + 0.25));

    if (broken <= 0) {
      strokes.push({ d: toPath(wander(x1, y, x2, y + slope, r, jitter)), p: press, w: weight * (0.72 + r() * 0.56) });
      continue;
    }

    // Interrupted contact: the point lifts and lands again along the run.
    let cursor = x1;
    const span = x2 - x1;
    while (cursor < x2 && strokes.length < max * 1.6) {
      const run = span * (0.1 + r() * 0.34) * (1 - broken * 0.42);
      const end = Math.min(x2, cursor + run);
      if (end - cursor > 2.5) {
        const t0 = (cursor - x1) / span;
        const t1 = (end - x1) / span;
        strokes.push({
          d: toPath(wander(cursor, y + slope * t0, end, y + slope * t1, r, jitter * 0.9)),
          p: press * (0.55 + r() * 0.6),
          w: weight * (0.6 + r() * 0.75),
        });
      }
      cursor = end + span * broken * (0.03 + r() * 0.09);
    }
  }

  return { angle, strokes };
}

/**
 * A closed, hand-shaped boundary. Not an ellipse: the radius breathes around
 * the turn and the start point does not sit on an axis, so no two fields on a
 * page share a silhouette.
 */
export function blob(rx: number, ry: number, seed = 7, wobble = 0.12, sides = 22): string {
  const r = rng(seed);
  const phase = r() * Math.PI * 2;
  const pts: Pt[] = [];
  for (let i = 0; i < sides; i += 1) {
    const a = phase + (i / sides) * Math.PI * 2;
    const k = 1 + (r() - 0.5) * wobble * 2 + Math.sin(a * 2.4 + phase) * wobble * 0.5;
    pts.push([Math.cos(a) * rx * k, Math.sin(a) * ry * k]);
  }
  // Catmull–Rom through the points, emitted as cubics.
  let d = `M${round(pts[0][0])} ${round(pts[0][1])}`;
  for (let i = 0; i < sides; i += 1) {
    const p0 = pts[(i - 1 + sides) % sides];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % sides];
    const p3 = pts[(i + 2) % sides];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${round(c1[0])} ${round(c1[1])},${round(c2[0])} ${round(c2[1])},${round(p2[0])} ${round(p2[1])}`;
  }
  return `${d}Z`;
}

/**
 * The double-pass behaviour: the same `d` stroked more than once with small
 * offsets, so a line records having been gone over rather than being thicker.
 */
export function passes(count: number, seed: number, spread = 0.7): { dx: number; dy: number; o: number }[] {
  const r = rng(seed);
  return Array.from({ length: count }, (_, i) => ({
    dx: (r() - 0.5) * spread * 2,
    dy: (r() - 0.5) * spread * 2,
    o: i === 0 ? 1 : 0.4 + r() * 0.4,
  }));
}

/** A wavering rule — the workhorse for baselines, spans and underscores. */
export function rule(x1: number, y: number, x2: number, seed = 3, amp = 0.9): string {
  return toPath(wander(x1, y, x2, y, rng(seed), amp));
}

/**
 * An unclosed boundary. `open` names the side left unstated. On every spread
 * that uses one, the text says what the missing edge means; the gap is a claim
 * about defeasibility, not a rendering accident.
 */
export function partialBox(
  x: number,
  y: number,
  w: number,
  h: number,
  open: "right" | "left" | "bottom" | "top" | "none",
  inset = 10,
  seed = 11,
): string {
  const r = rng(seed);
  const x2 = x + w;
  const y2 = y + h;
  const tl: Pt = [x, y];
  const tr: Pt = [x2, y];
  const br: Pt = [x2, y2];
  const bl: Pt = [x, y2];
  const i = Math.min(inset, Math.min(w, h) * 0.4);

  let corners: Pt[];
  switch (open) {
    case "right":
      corners = [[x2 - i, y], tl, bl, [x2 - i, y2]];
      break;
    case "left":
      corners = [[x + i, y], tr, br, [x + i, y2]];
      break;
    case "bottom":
      corners = [[x, y2 - i], tl, tr, [x2, y2 - i]];
      break;
    case "top":
      corners = [[x, y + i], bl, br, [x2, y + i]];
      break;
    default:
      corners = [tl, tr, br, bl, tl];
  }
  return polyline(corners, r, 1.1);
}

/** Consecutive wandering runs joined into one path. */
export function polyline(pts: Pt[], r: () => number, amp = 1.1): string {
  let all: Pt[] = [];
  for (let k = 0; k < pts.length - 1; k += 1) {
    const seg = wander(pts[k][0], pts[k][1], pts[k + 1][0], pts[k + 1][1], r, amp);
    all = all.concat(k === 0 ? seg : seg.slice(1));
  }
  return toPath(all);
}

/** A margin brace spanning a run of lines. */
export function brace(x: number, y1: number, y2: number, depth = 7, seed = 13, facing: 1 | -1 = 1): string {
  const r = rng(seed);
  const mid = (y1 + y2) / 2;
  const d = depth * facing;
  return (
    `M${round(x + d * 0.85)} ${round(y1)}` +
    `Q${round(x + d * 0.1)} ${round(y1 + 3 + r() * 2)} ${round(x)} ${round(y1 + (mid - y1) * 0.5)}` +
    `Q${round(x - d * 0.2)} ${round(mid - 5)} ${round(x - d * 0.55)} ${round(mid)}` +
    `Q${round(x - d * 0.2)} ${round(mid + 5)} ${round(x)} ${round(mid + (y2 - mid) * 0.5)}` +
    `Q${round(x + d * 0.1)} ${round(y2 - 3 - r() * 2)} ${round(x + d * 0.85)} ${round(y2)}`
  );
}

/** A leader line from an apparatus note to the thing it attaches to. */
export function leader(x1: number, y1: number, x2: number, y2: number, seed = 17): string {
  const r = rng(seed);
  const mx = x1 + (x2 - x1) * (0.5 + r() * 0.2);
  const sag = (r() - 0.5) * 7;
  return `M${round(x1)} ${round(y1)}C${round(mx)} ${round(y1 + sag)},${round(mx)} ${round(y2 - sag)},${round(x2)} ${round(y2)}`;
}

/** Discrete deposits — used only where a record's own language is counting. */
export function stipple(w: number, h: number, count: number, seed = 19) {
  const r = rng(seed);
  return Array.from({ length: count }, () => ({
    cx: round((r() - 0.5) * w),
    cy: round((r() - 0.5) * h),
    r: round(0.5 + r() * 0.85),
    p: round(0.25 + r() * 0.6),
  }));
}

/**
 * Residue. Not deletion: a lifted mark keeps a broken skeleton of where it was,
 * plus a soft rub across it. Used only where the page says a reading was
 * revised, never to mean "wrong".
 */
export function erased(w: number, h: number, seed = 23): { skeleton: Stroke[]; rub: Stroke[] } {
  const skeleton = hatch({ w, h, gap: 6.5, seed, broken: 0.75, jitter: 1.7, pressure: [0.1, 0.3], weight: 0.7, max: 90 }).strokes;
  const rub = hatch({ w: w * 1.12, h: h * 0.8, angle: 0, gap: 3.4, seed: seed + 41, broken: 0.55, jitter: 2.6, pressure: [0.05, 0.14], weight: 2.6, max: 60 }).strokes;
  return { skeleton, rub };
}

/** Evenly spaced ticks along a run, with the unsteadiness of a ruled hand. */
export function ticks(x1: number, x2: number, count: number, y: number, len: number, seed = 29) {
  const r = rng(seed);
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const x = x1 + (x2 - x1) * t + (r() - 0.5) * 0.8;
    return { d: toPath(wander(x, y, x + (r() - 0.5) * 1.4, y + len, r, 0.7)), p: 0.55 + r() * 0.4 };
  });
}
