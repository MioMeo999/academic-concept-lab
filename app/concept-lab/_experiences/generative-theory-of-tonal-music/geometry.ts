/* ---------------------------------------------------------------------------
   One phrase, sixteen events, and the room around it for structure.

   The Generative Theory of Tonal Music page is built on a single surface — the
   record's constructed sixteen-note C-major phrase — and never changes the
   sound. What changes is what is drawn around the notes: brackets above them
   for grouping, dots below them for meter, a tree above for which event stands
   for a span, arcs above for how tones elaborate or progress.

   These numbers mirror scripts/art/scenes/gttm-hero.js, so the authored opening
   and the live figures describe the same phrase. It is a teaching construction,
   not a source analysis.
   ------------------------------------------------------------------------- */

export type Pt = [number, number];

export const ROLL = { w: 720, h: 380, x0: 64, dx: 38, yLo: 262, dy: 11 };
export const EVENTS = 16;

/** event ids run 1–16, left to right */
export const xOfEvent = (id: number) => ROLL.x0 + (id - 1) * ROLL.dx;
export const yOfPitch = (pitch: number) => ROLL.yLo - (pitch - 60) * ROLL.dy;

/** the constructed analysis, as the record states it */
export const LOCAL: [number, number][] = [[1, 4], [5, 8], [9, 12], [13, 16]];
export const HIGHER: [number, number][] = [[1, 8], [9, 16]];
export const WHOLE: [number, number] = [1, 16];
export const BOUNDARIES = [4, 8, 12, 16];

/** the head each span is drawn with: bar heads 1, 5, 9, 16; the halves' heads 1 and 9; the whole's head 1 */
export const BAR_HEADS = [1, 5, 9, 16];
export const HALF_HEADS = [1, 9];
export const WHOLE_HEAD = 1;
/** the light reduction also keeps event 13, which the first bar-4 alternative would choose */
export const BAR4_ALTERNATIVE = 13;

/** metrical rows, weakest to strongest: which events sit on each level */
export const METER_ROWS: number[][] = [
  Array.from({ length: EVENTS }, (_, i) => i + 1),
  Array.from({ length: EVENTS / 2 }, (_, i) => i * 2 + 1),
  [1, 5, 9, 13],
  [1, 9],
];

/** the tonal regions: I, IV, V, I; and the events that head them */
export const REGIONS: { label: string; from: number; to: number; head: number }[] = [
  { label: "I", from: 1, to: 4, head: 1 },
  { label: "IV", from: 5, to: 8, head: 5 },
  { label: "V", from: 9, to: 12, head: 9 },
  { label: "I", from: 13, to: 16, head: 16 },
];

/** vertical bands for the structures drawn above and below the notes */
export const BAND = { local: 118, higher: 96, whole: 74, arcs: 52, meter: [296, 314, 332, 350] };
