/* ---------------------------------------------------------------------------
   One office, drawn from above.

   Every figure on the Workplace Design page re-reads this same room: twelve
   desks in three rows of four, three windows along the top wall, a door in the
   bottom wall. What changes from figure to figure is what is drawn on top of
   it — sound, sight, light, crowding, partitions — never the room itself.
   These numbers mirror scripts/art/scenes/_wp-plan.js, so that the authored
   opening and the live figures describe the same room.

   It is not any real office, and no mark drawn on it is a measurement.
   ------------------------------------------------------------------------- */

export type Pt = [number, number];

export const PLAN = { w: 640, h: 400, x0: 24, y0: 24, x1: 616, y1: 376 };
export const COLS = [110, 250, 390, 530];
export const ROWS = [100, 200, 300];
export const DESK = { w: 96, h: 34 };
export const WINDOWS: Pt[] = [[96, 184], [276, 364], [456, 544]];
export const DOOR: Pt = [292, 348];

export type Seat = { id: number; x: number; y: number; r: number; c: number };

/** seat ids run row by row: id = row * 4 + col */
export const SEATS: Seat[] = ROWS.flatMap((y, r) => COLS.map((x, c) => ({ id: r * 4 + c, x, y, r, c })));

/** who is in the room when it is spacious, and when it is cramped */
export const SPARSE = [0, 7, 9, 10];
export const CROWDED = SEATS.map((s) => s.id);
/** who is talking, in each case */
export const TALK_SPARSE = [7, 9];
export const TALK_CROWDED = [1, 5, 6, 11];

/** the person sits just below the desk, facing it */
export const chairAt = (s: Seat): Pt => [s.x, s.y + 30];

export const seatsFor = (ids: number[]) => ids.map((i) => SEATS[i]);

/** every pair of present seats close enough to see one another */
export function sightPairs(ids: number[], reach = 178): [Seat, Seat][] {
  const out: [Seat, Seat][] = [];
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const a = SEATS[ids[i]], b = SEATS[ids[j]];
      if (Math.hypot(a.x - b.x, a.y - b.y) <= reach) out.push([a, b]);
    }
  }
  return out;
}

/** the desks that sit beside one another: right neighbours and neighbours below */
export function deskLinks(): [Seat, Seat][] {
  const out: [Seat, Seat][] = [];
  for (const s of SEATS) {
    const right = SEATS.find((t) => t.r === s.r && t.c === s.c + 1);
    const below = SEATS.find((t) => t.r === s.r + 1 && t.c === s.c);
    if (right) out.push([s, right]);
    if (below) out.push([s, below]);
  }
  return out;
}

/** points around a circle, for a hand to follow */
export function ringPts(cx: number, cy: number, r: number, n = 28): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return [cx + Math.cos(t) * r, cy + Math.sin(t) * r] as Pt;
  });
}
