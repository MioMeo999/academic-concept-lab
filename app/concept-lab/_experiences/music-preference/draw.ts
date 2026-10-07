import * as hand from "../../_folio/hand";

/* ---------------------------------------------------------------------------
   Small drawing helpers shared by the Music Preference figures.

   They live in a plain module (no components, no styles) so that anything on
   the page can call them, and every coordinate is rounded so the server and
   the browser draw the same digits.
   ------------------------------------------------------------------------- */

export type Pt = [number, number];

/** one decimal: the server and the browser agree on the last digit of a trig result only after rounding */
export const q = (n: number) => Math.round(n * 10) / 10;

/** a hand-drawn straight-ish line */
export const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 5, wander = 0.9) => hand.line(x1, y1, x2, y2, { seed, wander, segments });

/** a box drawn by hand: four sides that do not quite meet */
export const box = (x: number, y: number, w: number, h: number, seed: number) =>
  L(x, y, x + w, y + 0.8, seed, 5, 0.9) + L(x + w, y + 0.8, x + w - 0.6, y + h, seed + 1, 3, 0.8) + L(x + w - 0.6, y + h, x, y + h - 0.6, seed + 2, 5, 0.9) + L(x, y + h - 0.6, x + 0.5, y, seed + 3, 3, 0.8);

/** a plain polyline path through points */
export const poly = (list: Pt[]) => `M${list.map(([x, y]) => `${q(x)} ${q(y)}`).join("L")}`;

/** the record writes an ampersand as an entity; in drawn text it is a plain character */
export const decode = (s: string) => s.replace(/&amp;/g, "&");

/** a small seeded generator, so a drawn jag is the same everywhere */
export function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
