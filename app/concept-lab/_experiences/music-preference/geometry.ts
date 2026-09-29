import type { AppliedWork } from "@/content/types";
import { decode, q } from "./draw";

/* ---------------------------------------------------------------------------
   Music Preference and Person–Music Fit: the small amount of logic behind the
   drawings — which literature each work belongs to, where it sits on the map of
   the field, how five strands twist into one rope, and what each way of
   measuring (or each side of a fit) leaves on the page.
   ------------------------------------------------------------------------- */

/* ---- the map of the field: two literatures over sixteen years -------------- */

export type Lane = "taste" | "work";
export type Origin = { year: string; author: string; work: string; contribution: string };

const surname = (authors: string) => decode(authors).split(/,|&| and /)[0].trim().split(/\s+/).pop() ?? "";

/**
 * The record names two literatures that only partly overlap: the structural,
 * functional and developmental work on taste, and the organisational work on
 * listening at work. The second is exactly the workplace studies the record
 * lists as applied work; every other work on the trail belongs to the first.
 */
export function laneOf(origin: Origin, applied: AppliedWork[]): Lane {
  return applied.some((a) => a.year === origin.year && surname(a.authors) === surname(origin.author)) ? "work" : "taste";
}

/** how an author line is shortened on the map: one name, two names joined, or the first name and "et al." */
export function shortAuthors(author: string): string {
  const names = decode(author).split(/,|&/).map((n) => n.trim()).filter(Boolean);
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names[0]} et al.`;
}

export const MAP = { x0: 52, x1: 590, y: { taste: 80, work: 186 } as Record<Lane, number>, from: 1995, to: 2011 };
export const xOfYear = (year: number) => q(MAP.x0 + ((year - MAP.from) / (MAP.to - MAP.from)) * (MAP.x1 - MAP.x0));

export type Knot = { n: number; year: number; lane: Lane; x: number; y: number; short: string; tier: 0 | 1 };

export function knots(origins: Origin[], applied: AppliedWork[]): Knot[] {
  const out = origins.map((o, i): Knot => {
    const lane = laneOf(o, applied);
    const year = Number(o.year);
    return { n: i + 1, year, lane, x: xOfYear(year), y: MAP.y[lane], short: shortAuthors(o.author), tier: 0 };
  });
  // where works of one literature stand close together, their year labels alternate in height so none is written over another
  for (let i = 1; i < out.length; i++) {
    const prev = out.slice(0, i).reverse().find((o) => o.lane === out[i].lane);
    if (prev && Math.abs(prev.x - out[i].x) < 40 && prev.tier === 0) out[i].tier = 1;
  }
  return out;
}

/* ---- five strands twisting into one rope ------------------------------------ */

export const ROPE = { xStart: 24, ropeFrom: 236, ropeTo: 372, xEnd: 606, cy: 150, R: 33, turns: 1.6, n: 5 };

const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** where a strand runs before it joins the rope */
export const spreadY = (i: number, n = ROPE.n) => q(38 + (i * (2 * (ROPE.cy - 38))) / (n - 1));

export type RopeSeg = { strand: number; x0: number; y0: number; x1: number; y1: number; z: number };

/** the strands' y and depth at a place along the page: apart on the left, twisted round each other on the right */
export function strandAt(i: number, x: number): { y: number; z: number } {
  const s = smooth(ROPE.ropeFrom, ROPE.ropeTo, x);
  const u = Math.max(0, Math.min(1, (x - ROPE.ropeFrom) / (ROPE.xEnd - ROPE.ropeFrom)));
  const theta = (2 * Math.PI * i) / ROPE.n + ROPE.turns * 2 * Math.PI * u;
  const free = spreadY(i) + 9 * Math.sin(x / 61 + i * 1.3) * (1 - s);
  return { y: q(free * (1 - s) + (ROPE.cy + ROPE.R * Math.sin(theta)) * s), z: q(Math.cos(theta) * s * 100) / 100 + 0 };
}

/** every strand cut into short segments, each with a depth: the ones nearer the eye are drawn last */
export function rope(steps = 44): RopeSeg[] {
  const out: RopeSeg[] = [];
  for (let i = 0; i < ROPE.n; i++) {
    for (let k = 0; k < steps; k++) {
      const xa = ROPE.xStart + (k / steps) * (ROPE.xEnd - ROPE.xStart);
      const xb = ROPE.xStart + ((k + 1) / steps) * (ROPE.xEnd - ROPE.xStart);
      const a = strandAt(i, xa), b = strandAt(i, xb);
      out.push({ strand: i, x0: q(xa), y0: a.y, x1: q(xb), y1: b.y, z: (a.z + b.z) / 2 });
    }
  }
  return out;
}

/* ---- two ways of measuring, two structures ---------------------------------- */

export type Instrument = "names" | "excerpts";

/** the record's own counts: a four-factor structure from genre names, a five-factor structure from responses to musical excerpts */
export const FACTORS: Record<Instrument, number> = { names: 4, excerpts: 5 };

/* ---- the two sides of a fit -------------------------------------------------- */

export type Side = "person" | "situation" | "both";

/** what is on the table: each side that is shown, and whether the two are put together */
export function fitState(side: Side) {
  return { person: side !== "situation", situation: side !== "person", joined: side === "both" };
}
