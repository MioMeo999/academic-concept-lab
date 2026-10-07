/**
 * One office, drawn from above — and the numbers the page's own plan shares.
 *
 * The Workplace Design page is built on one floor plan: a room of twelve desks
 * with windows along its top wall and a door in its bottom wall. Every figure
 * on the page re-reads this same room. These constants mirror geometry.ts in the
 * page's experience folder, so the authored hero and the live figures always
 * describe the same room.
 */
export const PLAN = { w: 640, h: 400, x0: 24, y0: 24, x1: 616, y1: 376 };
export const COLS = [110, 250, 390, 530];
export const ROWS = [100, 200, 300];
export const DESK = { w: 96, h: 34 };
export const WINDOWS = [[96, 184], [276, 364], [456, 544]];
export const DOOR = [292, 348];
/** seat ids run row by row: id = row * 4 + col */
export const SEATS = ROWS.flatMap((y, r) => COLS.map((x, c) => ({ id: r * 4 + c, x, y, r, c })));
export const SPARSE = [0, 7, 9, 10];
export const TALKERS = [1, 5, 6, 11];

/** the person sits just below the desk, facing it */
export const chairAt = (s) => [s.x, s.y + 30];

/** points around a circle in plan space, so a projection can turn it into an ellipse */
export function circle(cx, cy, r, n = 30) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    out.push([cx + Math.cos(t) * r, cy + Math.sin(t) * r]);
  }
  return out;
}

/** an arc, from angle a0 to a1 (radians; 0 = east, positive = clockwise on the page) */
export function arc(cx, cy, r, a0, a1, n = 18) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = a0 + ((a1 - a0) * i) / n;
    out.push([cx + Math.cos(t) * r, cy + Math.sin(t) * r]);
  }
  return out;
}

export const rectPts = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
