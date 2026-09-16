/**
 * Phase B2 mark generation.
 *
 * Every generator here is deterministic. Marks are produced from a seed, never
 * from Math.random(), so server and client render the identical geometry and
 * so a "held" mark can be guaranteed mechanically identical across conditions.
 *
 * Nothing in this file encodes meaning. Meaning is stated in text on the page
 * that uses a mark (Phase B1 principle P3, Phase B2 calibration 2). These are
 * material behaviours only: accumulation, direction, pressure, interruption,
 * boundary.
 */

/** Mulberry32. Small, deterministic, adequate for mark jitter. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Segment = {
  /**
   * The stroke as a short polyline rather than a straight line. The wander is
   * baked into the geometry, not applied as an SVG filter: a displacement
   * filter over a few thousand hatch strokes is unaffordable, and geometric
   * wander is also truer to the reference — the tooth belongs to the mark
   * itself, not to a treatment laid over it.
   */
  pts: [number, number][];
  /** Relative pressure of this stroke, 0–1. Consumers map it to opacity. */
  p: number;
  w: number;
};

/**
 * A straight run broken into a wandering polyline.
 *
 * Two things stop a field from reading as a ruled lattice. Each stroke gets a
 * small slope of its own, so neighbouring strokes are not parallel; and the
 * polyline is sampled often enough that the wander is legible as unsteadiness
 * rather than as a corner.
 */
function wander(
  x1: number,
  y: number,
  x2: number,
  r: () => number,
  amp: number,
  drift: number,
): [number, number][] {
  const len = x2 - x1;
  const steps = Math.max(2, Math.min(9, Math.round(len / 13)));
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    pts.push([x1 + len * t, y + drift * t + (r() - 0.5) * amp]);
  }
  return pts;
}

export type HatchOptions = {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Degrees. 0 = horizontal strokes. */
  angle?: number;
  /** Distance between stroke centres before jitter. */
  gap?: number;
  seed?: number;
  /** Endpoint wander, in user units. */
  jitter?: number;
  /** 0 = every stroke spans the field; 1 = heavy interruption (scumble). */
  broken?: number;
  /** Base stroke width. */
  weight?: number;
  /** Pressure floor and ceiling. */
  pressure?: [number, number];
  /**
   * Density ramp across the field, in the hatch's own direction of travel.
   * "none" is even; "toEnd" accumulates towards the far edge; "fromEnd" the
   * reverse. Used where a record's own language is about accumulation.
   */
  ramp?: "none" | "toEnd" | "fromEnd";
};

/**
 * Parallel strokes filling a rectangle, generated in an unrotated frame. The
 * caller rotates the returned group and clips it, so `angle` is advisory
 * metadata returned alongside the segments.
 */
export function hatch(opts: HatchOptions): { angle: number; cx: number; cy: number; segments: Segment[] } {
  const {
    x,
    y,
    w,
    h,
    angle = 0,
    gap = 5,
    seed = 1,
    jitter = 1.4,
    broken = 0,
    weight = 0.9,
    pressure = [0.35, 0.85],
    ramp = "none",
  } = opts;

  const r = rng(seed);
  const cx = x + w / 2;
  const cy = y + h / 2;
  // Cover the rectangle at any rotation.
  const reach = Math.hypot(w, h) / 2 + gap * 2;
  const segments: Segment[] = [];
  // A hard ceiling on deposited strokes. Past this the field is not visibly
  // denser, only slower — and a page of these can reach five figures of nodes.
  const MAX_SEGMENTS = 520;
  // Capped so that a large field cannot silently become tens of thousands of
  // nodes. Beyond the cap the strokes spread rather than multiplying.
  const rows = Math.max(1, Math.min(130, Math.floor((reach * 2) / gap)));
  const step = (reach * 2) / rows;

  for (let i = 0; i <= rows; i += 1) {
    if (segments.length >= MAX_SEGMENTS) break;
    const t = rows === 0 ? 0 : i / rows;
    const ly = cy - reach + i * step + (r() - 0.5) * step * 0.45;

    // Ramp thins the accumulation at one end without changing stroke identity.
    const rampFactor = ramp === "none" ? 1 : ramp === "toEnd" ? 0.25 + t * 0.95 : 1.2 - t * 0.95;
    if (rampFactor < 0.3 && r() > rampFactor + 0.35) continue;

    const x1 = cx - reach + (r() - 0.5) * jitter * 2;
    const x2 = cx + reach + (r() - 0.5) * jitter * 2;
    const press = pressure[0] + r() * (pressure[1] - pressure[0]);
    const p = Math.min(1, press * Math.min(1.15, rampFactor));

    const slope = (r() - 0.5) * step * 1.6;

    if (broken <= 0) {
      segments.push({
        pts: wander(x1, ly, x2, r, jitter, slope),
        p,
        w: weight * (0.75 + r() * 0.5),
      });
      continue;
    }

    // Interrupted contact: the stroke lifts and lands again along its length.
    let cursor = x1;
    while (cursor < x2) {
      const run = (x2 - x1) * (0.16 + r() * 0.4) * (1 - broken * 0.3);
      const end = Math.min(x2, cursor + run);
      if (end - cursor > 3) {
        const t0 = (cursor - x1) / (x2 - x1);
        segments.push({
          pts: wander(
            cursor,
            ly + slope * t0 + (r() - 0.5) * jitter,
            end,
            r,
            jitter * 0.85,
            slope * ((end - cursor) / (x2 - x1)) + (r() - 0.5) * jitter,
          ),
          p: p * (0.6 + r() * 0.55),
          w: weight * (0.65 + r() * 0.7),
        });
      }
      cursor = end + (x2 - x1) * broken * (0.02 + r() * 0.07);
    }
  }

  return { angle, cx, cy, segments };
}

/**
 * A stroked path that is drawn more than once with small offsets — the
 * double-pass behaviour from the Mark Library. Returns transform strings, so
 * the same `d` is genuinely re-used rather than re-authored.
 */
export function passes(count: number, seed: number, spread = 0.7): { dx: number; dy: number; o: number }[] {
  const r = rng(seed);
  return Array.from({ length: count }, (_, i) => ({
    dx: (r() - 0.5) * spread * 2,
    dy: (r() - 0.5) * spread * 2,
    o: i === 0 ? 1 : 0.45 + r() * 0.35,
  }));
}

/**
 * An unclosed boundary. `open` names the side left unstated. The gap is not a
 * rendering accident: on the pages that use it, the text says what the missing
 * edge means.
 */
export function partialBoundary(
  x: number,
  y: number,
  w: number,
  h: number,
  open: "right" | "left" | "bottom" | "top",
  inset = 6,
): string {
  const x2 = x + w;
  const y2 = y + h;
  const i = inset;
  switch (open) {
    case "right":
      return `M ${x2 - i} ${y} L ${x} ${y} L ${x} ${y2} L ${x2 - i} ${y2}`;
    case "left":
      return `M ${x + i} ${y} L ${x2} ${y} L ${x2} ${y2} L ${x + i} ${y2}`;
    case "bottom":
      return `M ${x} ${y2 - i} L ${x} ${y} L ${x2} ${y} L ${x2} ${y2 - i}`;
    default:
      return `M ${x} ${y + i} L ${x} ${y2} L ${x2} ${y2} L ${x2} ${y + i}`;
  }
}

/** A leader line from an apparatus note to the phrase it attaches to. */
export function leader(x1: number, y1: number, x2: number, y2: number, seed = 3): string {
  const r = rng(seed);
  const mx = x1 + (x2 - x1) * (0.55 + r() * 0.15);
  const sag = (r() - 0.5) * 5;
  return `M ${x1} ${y1} C ${mx} ${y1 + sag} ${mx} ${y2 - sag} ${x2} ${y2}`;
}

/** Discrete deposits — used where a record's own language is about counting. */
export function stipple(
  x: number,
  y: number,
  w: number,
  h: number,
  count: number,
  seed = 5,
): { cx: number; cy: number; r: number; p: number }[] {
  const r = rng(seed);
  return Array.from({ length: count }, () => ({
    cx: x + r() * w,
    cy: y + r() * h,
    r: 0.5 + r() * 0.9,
    p: 0.3 + r() * 0.6,
  }));
}
