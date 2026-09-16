/**
 * Surface — pigment geometry.
 *
 * The problem this file solves: a coloured pencil does not lay down a colour,
 * it lays down *a number of passes of a colour*. Depth comes from accumulation
 * and from overlap, not from choosing a darker swatch. So nothing here draws a
 * shape and fills it. Everything here deposits strokes, and the strokes are
 * expected to be stacked, crossed, and overlapped by the caller until the mass
 * arrives at the density the page wants.
 *
 * Three properties are load-bearing:
 *
 *   1. Deterministic. Geometry comes from a seed, never Math.random(), so the
 *      server and client agree, and so a mark that must be *mechanically
 *      identical* across two conditions actually is. Tonal Hierarchy depends
 *      on this: the probe is the same glyph in all four surrounds, and if it
 *      re-rolled it would quietly become an argument the record never makes.
 *
 *   2. Grain lives in the mark. The unsteadiness belongs to the stroke, not to
 *      a treatment laid over the page. No paper texture, no displacement
 *      filter, no overlay. A filter over several thousand strokes is also
 *      unaffordable, and it would be the wrong idea besides.
 *
 *   3. Bucketed output. A field of 600 strokes emitted as 600 <path> elements
 *      is a DOM problem. `bucket()` quantises pressure and width and merges
 *      strokes into a couple of dozen compound paths, which renders the same
 *      and costs almost nothing.
 *
 * Nothing here encodes meaning. These are material behaviours only. What a
 * mark *means* is stated in type by the section that uses it.
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

/* Half-unit precision. At the scales these plates render at, finer coordinates
   are invisible — and they are about a third of the serialised page. */
const r2 = (n: number) => Math.round(n * 2) / 2;

export function toPath(pts: Pt[]): string {
  if (pts.length === 0) return "";
  let d = `M${r2(pts[0][0])} ${r2(pts[0][1])}`;
  for (let i = 1; i < pts.length; i += 1) d += `L${r2(pts[i][0])} ${r2(pts[i][1])}`;
  return d;
}

/**
 * A straight run broken into a wandering polyline. The ends settle and the
 * middle wanders most, which is how a hand actually crosses a gap: the start
 * is placed, the finish is aimed at, and the span between them drifts.
 */
export function wander(x1: number, y1: number, x2: number, y2: number, r: () => number, amp = 1.2): Pt[] {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const steps = Math.max(2, Math.min(5, Math.round(len / 26)));
  const nx = -(y2 - y1) / (len || 1);
  const ny = (x2 - x1) / (len || 1);
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const ease = Math.sin(Math.PI * t);
    const off = (r() - 0.5) * amp * (0.3 + ease);
    pts.push([x1 + (x2 - x1) * t + nx * off, y1 + (y2 - y1) * t + ny * off]);
  }
  return pts;
}

/** p = pressure 0..1 (becomes opacity), w = nib width. */
export type Stroke = { d: string; p: number; w: number };

export type HatchOptions = {
  w: number;
  h: number;
  /** Advisory only — returned so the caller can rotate the whole group once. */
  angle?: number;
  gap?: number;
  seed?: number;
  jitter?: number;
  /** 0 = every stroke spans the field; 1 = barely touching (scumble). */
  broken?: number;
  weight?: number;
  pressure?: [number, number];
  /** Accumulation across the field, perpendicular to stroke direction. */
  ramp?: "none" | "in" | "out" | "centre" | "edges";
  /** How often a stroke is gone over again. 0 = single pass. */
  rework?: number;
  /**
   * Fraction of the field a single stroke crosses, 0..1. This is the control
   * that decides whether a mass reads as pencil or as woven cloth. At 1 every
   * stroke spans the whole field and, once clipped, no stroke end is ever
   * visible — the eye reads a textile. Below about 0.7 the runs are shorter
   * than the field and land in different places, so ends accumulate inside the
   * mass and it reads as a hand going back and forth.
   */
  coverage?: number;
  max?: number;
};

/**
 * One layer of roughly parallel strokes filling a w×h box centred on the
 * origin, generated unrotated.
 *
 * A stroke budget must *thin* a field, never truncate one. Cutting off at a
 * fixed count leaves half a rectangle hatched and the other half bare, which
 * reads as a mark that ran out — and would put the pigment somewhere other
 * than where the page said it was. An oversized field is therefore spaced more
 * widely and stays a whole field.
 */
export function hatch(o: HatchOptions): Stroke[] {
  const {
    w,
    h,
    gap = 4.5,
    seed = 1,
    jitter = 1.25,
    broken = 0,
    weight = 0.9,
    pressure = [0.22, 0.62],
    ramp = "none",
    rework = 0,
    coverage = 0.62,
    max: maxIn = 420,
  } = o;

  const r = rng(seed);
  const reach = Math.hypot(w, h) / 2 + gap;

  /* How many strokes this field can actually absorb.
     
     Area alone is not enough: a stroke covers roughly its own length times the
     row spacing, so halving the run length halves what each stroke deposits and
     the same field needs twice as many to reach the same density. Budgeting on
     area alone starves every long thin band and over-inks every short fat one.
     The caller's `max` can lower the result but never raise it — past this point
     further strokes stop being visible and start being page weight. */
  const runLen = Math.max(6, 2 * reach * coverage);
  const afford = Math.max(36, Math.round(((w * h) / (runLen * Math.max(1.2, gap))) * 2.4));
  const max = Math.min(maxIn, afford);

  const perRow = (broken > 0 ? 2.2 + broken * 2.0 : 1) * (1 + rework * 0.8);
  let g = gap;
  let rows = Math.max(1, Math.floor((reach * 2) / g));
  if (rows * perRow > max) {
    g = (reach * 2 * perRow) / max;
    rows = Math.max(1, Math.floor((reach * 2) / g));
  }
  rows = Math.min(rows, 460);
  const step = (reach * 2) / rows;
  const out: Stroke[] = [];
  const ceiling = max;

  for (let i = 0; i <= rows; i += 1) {
    if (out.length >= ceiling) break;
    const t = rows === 0 ? 0.5 : i / rows;
    const y = -reach + i * step + (r() - 0.5) * step * 0.55;

    let dens = 1;
    if (ramp === "in") dens = 0.12 + t * 1.1;
    else if (ramp === "out") dens = 1.22 - t * 1.1;
    else if (ramp === "centre") dens = 0.16 + Math.sin(Math.PI * t) * 1.05;
    else if (ramp === "edges") dens = 0.28 + Math.abs(Math.cos(Math.PI * t)) * 0.95;
    if (dens < 1 && r() > dens) continue;

    /* Place a run of `coverage` of the field somewhere along the row, rather
       than spanning it. Ends then fall inside the mass instead of being cut
       off at the clip. */
    const cov = Math.max(0.08, Math.min(1, coverage * (0.72 + r() * 0.56)));
    const half = reach * cov;
    const drift = (r() - 0.5) * 2 * reach * (1 - cov);
    const x1 = drift - half + (r() - 0.5) * jitter * 2;
    const x2 = drift + half + (r() - 0.5) * jitter * 2;
    // The hand does not hold one angle. Each run tilts a little on its own.
    const slope = (r() - 0.5) * step * 3.4;
    const base = pressure[0] + r() * (pressure[1] - pressure[0]);
    const press = Math.min(1, base * Math.min(1.15, dens + 0.22));

    const emit = (a: number, b: number, pm: number, wm: number) => {
      const t0 = (a - x1) / (x2 - x1 || 1);
      const t1 = (b - x1) / (x2 - x1 || 1);
      out.push({
        d: toPath(wander(a, y + slope * t0, b, y + slope * t1, r, jitter)),
        p: Math.min(1, press * pm),
        w: weight * wm,
      });
    };

    const runs: [number, number][] = [];
    if (broken <= 0) {
      runs.push([x1, x2]);
    } else {
      // Interrupted contact: the point lifts and lands again along the run.
      let cursor = x1;
      const span = x2 - x1;
      while (cursor < x2 && out.length < ceiling) {
        const run = span * (0.09 + r() * 0.32) * (1 - broken * 0.4);
        const end = Math.min(x2, cursor + run);
        if (end - cursor > 2.4) runs.push([cursor, end]);
        cursor = end + span * broken * (0.03 + r() * 0.085);
      }
    }

    for (const [a, b] of runs) {
      emit(a, b, 1, 0.72 + r() * 0.6);
      // Reworking: the same run gone over again, shorter and slightly off.
      if (rework > 0 && r() < rework) {
        const len = b - a;
        const ia = a + len * r() * 0.3;
        const ib = b - len * r() * 0.3;
        if (ib - ia > 3) emit(ia, ib, 0.55 + r() * 0.5, 0.6 + r() * 0.5);
      }
    }
  }

  return out;
}

export type Layer = { angle: number; strokes: Stroke[] };

export type FieldOptions = Omit<HatchOptions, "angle"> & {
  /** Stroke directions, in degrees. Each becomes one accumulation pass. */
  angles: number[];
  /** Per-pass multiplier on pressure, so later passes can sit lighter. */
  falloff?: number;
};

/**
 * A mass built by crossing several passes. This is the whole difference
 * between a coloured rectangle and coloured pencil: the second pass at a
 * different angle is what produces depth, and the crossings are what make the
 * density uneven in the way a hand makes it uneven.
 */
export function field(o: FieldOptions): Layer[] {
  const { angles, falloff = 0.92, seed = 1, pressure = [0.2, 0.55], ...rest } = o;
  return angles.map((angle, i) => {
    const k = Math.pow(falloff, i);
    return {
      angle,
      strokes: hatch({
        ...rest,
        seed: seed + i * 977,
        pressure: [pressure[0] * k, pressure[1] * k],
      }),
    };
  });
}

/**
 * Merge strokes into a small number of compound paths by quantising pressure
 * and width. Visually identical to emitting each stroke separately; two orders
 * of magnitude cheaper in DOM nodes.
 */
export function bucket(strokes: Stroke[], steps = 7): { d: string; o: number; w: number }[] {
  const map = new Map<string, { d: string[]; o: number; w: number }>();
  for (const s of strokes) {
    if (!s.d) continue;
    const pi = Math.max(1, Math.min(steps, Math.round(s.p * steps)));
    const wi = Math.max(1, Math.round(s.w * 4));
    const key = `${pi}:${wi}`;
    const entry = map.get(key);
    if (entry) entry.d.push(s.d);
    else map.set(key, { d: [s.d], o: pi / steps, w: wi / 4 });
  }
  return Array.from(map.values()).map((e) => ({ d: e.d.join(""), o: e.o, w: e.w }));
}

/**
 * A closed, hand-shaped boundary. Not an ellipse: the radius breathes around
 * the turn and the start point does not sit on an axis, so no two masses on a
 * page share a silhouette.
 */
export function blob(rx: number, ry: number, seed = 7, wobble = 0.13, sides = 24): string {
  const r = rng(seed);
  const phase = r() * Math.PI * 2;
  const pts: Pt[] = [];
  for (let i = 0; i < sides; i += 1) {
    const a = phase + (i / sides) * Math.PI * 2;
    const k = 1 + (r() - 0.5) * wobble * 2 + Math.sin(a * 2.3 + phase) * wobble * 0.55;
    pts.push([Math.cos(a) * rx * k, Math.sin(a) * ry * k]);
  }
  let d = `M${r2(pts[0][0])} ${r2(pts[0][1])}`;
  for (let i = 0; i < sides; i += 1) {
    const p0 = pts[(i - 1 + sides) % sides];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % sides];
    const p3 = pts[(i + 2) % sides];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r2(c1[0])} ${r2(c1[1])},${r2(c2[0])} ${r2(c2[1])},${r2(p2[0])} ${r2(p2[1])}`;
  }
  return `${d}Z`;
}

/** An open arc — a boundary that declines to close. */
export function arc(rx: number, ry: number, from: number, to: number, seed = 5, wobble = 0.1): string {
  const r = rng(seed);
  const steps = Math.max(6, Math.round((Math.abs(to - from) / (Math.PI * 2)) * 30));
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const a = from + ((to - from) * i) / steps;
    const k = 1 + (r() - 0.5) * wobble;
    pts.push([Math.cos(a) * rx * k, Math.sin(a) * ry * k]);
  }
  return toPath(pts);
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

/**
 * The double-pass behaviour for a single line: the same `d` stroked more than
 * once at small offsets, so the line records having been gone over rather than
 * simply being thicker.
 */
export function passes(count: number, seed: number, spread = 0.7): { dx: number; dy: number; o: number }[] {
  const r = rng(seed);
  return Array.from({ length: count }, (_, i) => ({
    dx: (r() - 0.5) * spread * 2,
    dy: (r() - 0.5) * spread * 2,
    o: i === 0 ? 1 : 0.38 + r() * 0.42,
  }));
}

/** A wavering rule — the workhorse for baselines, spans and underscores. */
export function rule(x1: number, y: number, x2: number, seed = 3, amp = 0.9): string {
  return toPath(wander(x1, y, x2, y, rng(seed), amp));
}

/**
 * An unclosed boundary. `open` names the side left unstated. Everywhere one is
 * used, the type says what the missing edge means; the gap is a claim about
 * defeasibility, not a rendering accident.
 */
export function partialBox(
  x: number,
  y: number,
  w: number,
  h: number,
  open: "right" | "left" | "bottom" | "top" | "none",
  inset = 12,
  seed = 11,
): string {
  const r = rng(seed);
  const x2 = x + w;
  const y2 = y + h;
  const i = Math.min(inset, Math.min(w, h) * 0.4);
  let corners: Pt[];
  switch (open) {
    case "right":
      corners = [[x2 - i, y], [x, y], [x, y2], [x2 - i, y2]];
      break;
    case "left":
      corners = [[x + i, y], [x2, y], [x2, y2], [x + i, y2]];
      break;
    case "bottom":
      corners = [[x, y2 - i], [x, y], [x2, y], [x2, y2 - i]];
      break;
    case "top":
      corners = [[x, y + i], [x, y2], [x2, y2], [x2, y + i]];
      break;
    default:
      corners = [[x, y], [x2, y], [x2, y2], [x, y2], [x, y]];
  }
  return polyline(corners, r, 1.15);
}

/** A margin brace spanning a run of lines. */
export function brace(x: number, y1: number, y2: number, depth = 7, seed = 13, facing: 1 | -1 = 1): string {
  const r = rng(seed);
  const mid = (y1 + y2) / 2;
  const d = depth * facing;
  return (
    `M${r2(x + d * 0.85)} ${r2(y1)}` +
    `Q${r2(x + d * 0.1)} ${r2(y1 + 3 + r() * 2)} ${r2(x)} ${r2(y1 + (mid - y1) * 0.5)}` +
    `Q${r2(x - d * 0.2)} ${r2(mid - 5)} ${r2(x - d * 0.55)} ${r2(mid)}` +
    `Q${r2(x - d * 0.2)} ${r2(mid + 5)} ${r2(x)} ${r2(mid + (y2 - mid) * 0.5)}` +
    `Q${r2(x + d * 0.1)} ${r2(y2 - 3 - r() * 2)} ${r2(x + d * 0.85)} ${r2(y2)}`
  );
}

/** A leader line from a marginal note to the thing it attaches to. */
export function leader(x1: number, y1: number, x2: number, y2: number, seed = 17): string {
  const r = rng(seed);
  const mx = x1 + (x2 - x1) * (0.45 + r() * 0.25);
  const sag = (r() - 0.5) * 9;
  return `M${r2(x1)} ${r2(y1)}C${r2(mx)} ${r2(y1 + sag)},${r2(mx)} ${r2(y2 - sag)},${r2(x2)} ${r2(y2)}`;
}

/** Discrete deposits — used only where a record's own language is counting. */
export function stipple(w: number, h: number, count: number, seed = 19) {
  const r = rng(seed);
  return Array.from({ length: count }, () => ({
    cx: r2((r() - 0.5) * w),
    cy: r2((r() - 0.5) * h),
    r: r2(0.5 + r() * 0.9),
    p: r2(0.22 + r() * 0.6),
  }));
}

/**
 * Residue. Not deletion: a lifted mark keeps a broken skeleton of where it was
 * plus a soft rub across it. Used only where the page says a reading was
 * revised — never to mean "wrong".
 */
export function erased(w: number, h: number, seed = 23): { skeleton: Stroke[]; rub: Stroke[] } {
  return {
    skeleton: hatch({ w, h, gap: 7, seed, broken: 0.78, jitter: 1.8, pressure: [0.08, 0.24], weight: 0.7, max: 80 }),
    rub: hatch({ w: w * 1.1, h: h * 0.82, gap: 3.2, seed: seed + 41, broken: 0.5, jitter: 2.8, pressure: [0.04, 0.11], weight: 2.8, max: 54 }),
  };
}

/** Evenly spaced ticks along a run, with the unsteadiness of a ruled hand. */
export function ticks(x1: number, x2: number, count: number, y: number, len: number, seed = 29) {
  const r = rng(seed);
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const x = x1 + (x2 - x1) * t + (r() - 0.5) * 0.9;
    return { d: toPath(wander(x, y, x + (r() - 0.5) * 1.5, y + len, r, 0.7)), p: 0.5 + r() * 0.42 };
  });
}

/**
 * A circled mark — three-and-a-bit laps, not one ellipse. Used to claim a
 * thing on the page, the way a reader claims a word.
 */
export function encircle(rx: number, ry: number, seed = 31, laps = 2): string[] {
  const r = rng(seed);
  return Array.from({ length: laps }, (_, i) => {
    const from = r() * Math.PI * 2;
    return arc(rx * (1 + i * 0.05 + r() * 0.05), ry * (1 + i * 0.06 + r() * 0.05), from, from + Math.PI * 2 * (0.86 + r() * 0.22), seed + i * 13, 0.09);
  });
}

/**
 * A rectangle with a hand's edge. Used to clip a deposit: a mass has to stay
 * where the page put it, but a mechanically straight cut edge would announce
 * that the mark was made by a machine. The wobble is small — this is a bound,
 * not a shape.
 */
export function softRect(w: number, h: number, seed = 3, amp = 2.2): string {
  const r = rng(seed);
  const x = w / 2;
  const y = h / 2;
  const pts: Pt[] = [];
  const edge = (ax: number, ay: number, bx: number, by: number) => {
    const seg = wander(ax, ay, bx, by, r, amp);
    for (const p of seg) pts.push(p);
  };
  edge(-x, -y, x, -y);
  edge(x, -y, x, y);
  edge(x, y, -x, y);
  edge(-x, y, -x, -y);
  return `${toPath(pts)}Z`;
}
