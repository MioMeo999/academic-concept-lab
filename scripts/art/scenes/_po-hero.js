/**
 * The room, drawn three times.
 *
 * One room in cut-away with a doorway in its base and the street below it: the
 * same architecture at three moments of the page's Attraction–Selection–
 * Attrition toy — before it runs, after one round, after three. People stand
 * on the floor inside; the crowd stands in the street; the outline of someone
 * who is no longer here stands there too, drawn as a ghost.
 *
 * Teaching drawing. It depicts the logic of the toy on the page, not any
 * organisation, sample or finding. The wash on the back wall takes the colours
 * of whoever is in the room — the place taking the look of its people.
 */
import { KINDS } from "./_people.js";

export const ROOM = { w: 486, h: 236, door: [196, 290] };

/** kinds per slot, row by row: 0 ring · 1 bar · 2 cross · 3 chevron · null empty */
export const MOMENTS = [
  {
    rows: [[0, 1, 2, 0, 3, 1, 2], [null, 0, 3, 1, 0, 2, null]],
    crowd: [0, 2, 1, 3, 3, 0, 2, 1],
    queue: [],
    ghosts: [],
  },
  {
    rows: [[0, 1, 2, 0, 0, 1, 2], [0, 0, null, 1, 0, 2, 0]],
    crowd: [1, 3, 2, 0, 0, 2, null, null],
    queue: [0, 0, 0],
    ghosts: [null, null, null, null, null, null, 3, 3],
  },
  {
    rows: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, null, 0, 0, 0]],
    crowd: [null, null, null, null, null, null, null, null],
    queue: [0, 0, 0],
    ghosts: [1, 2, 3, 1, 2, 3, 1, 2],
  },
];

// crowd slots: left block (2 columns), right block (2 columns), two rows
const CROWD_AT = [[36, 0], [100, 0], [386, 0], [450, 0], [68, 1], [132, 1], [354, 1], [418, 1]];
const STREET_FEET = [110, 204];

const counts = (rows) => {
  const c = [0, 0, 0, 0];
  for (const r of rows) for (const k of r) if (k != null) c[k]++;
  return c;
};

/** Collect the people for one room. */
export function peopleFor(m, ox, oy, { streetRows = 2 } = {}) {
  const out = [];
  const feet = [oy + 114, oy + ROOM.h - 6];
  m.rows.forEach((row, r) => row.forEach((k, c) => {
    if (k == null) return;
    out.push({ x: ox + 46 + c * 66 + (r ? 6 : 0), y: feet[r] + ((c * 5 + r * 3) % 4), s: 0.74, kind: k, seed: 100 + r * 20 + c });
  }));
  const at = (i) => ({ x: ox + CROWD_AT[i][0], y: oy + ROOM.h + STREET_FEET[CROWD_AT[i][1]] });
  const shown = (i) => CROWD_AT[i][1] < streetRows;
  m.crowd.forEach((k, i) => { if (k != null && shown(i)) out.push({ ...at(i), s: 0.62, kind: k, seed: 300 + i }); });
  m.ghosts.forEach((k, i) => { if (k != null && shown(i)) out.push({ ...at(i), s: 0.62, kind: k, ghost: true, seed: 500 + i }); });
  const mid = ox + (ROOM.door[0] + ROOM.door[1]) / 2;
  m.queue.forEach((k, i) => out.push({ x: mid + (i - 1) * 72, y: oy + ROOM.h + STREET_FEET[0] + 2, s: 0.66, kind: k, seed: 400 + i }));
  return out;
}

/** The architecture, the wash of the room's colour, and the pennant over the door. */
export function drawRoom(h, P, ox, oy, m, sd) {
  const { w } = ROOM;
  const [d0, d1] = ROOM.door;
  const fl = oy + ROOM.h; // floor line
  const top = oy;
  h.layer(P.graphite, (pen) => {
    pen.line([[ox, top + 4], [ox + w * 0.5, top + 1], [ox + w, top + 4]], { w: 2.5, a: 0.7, passes: 3, amp: 1.2, broken: 0.05, step: 5 });
    pen.line([[ox + 2, top + 2], [ox - 1, top + 120], [ox + 2, fl + 4]], { w: 2.4, a: 0.68, passes: 3, amp: 1, broken: 0.06, step: 5 });
    pen.line([[ox + w - 2, top + 2], [ox + w + 1, top + 120], [ox + w - 2, fl + 4]], { w: 2.4, a: 0.68, passes: 3, amp: 1, broken: 0.06, step: 5 });
    // the floor line, then the base beneath it, broken at the doorway
    pen.line([[ox - 6, fl], [ox + d0, fl + 1]], { w: 2.6, a: 0.72, passes: 3, amp: 0.8, broken: 0.04, step: 5 });
    pen.line([[ox + d1, fl + 1], [ox + w + 6, fl]], { w: 2.6, a: 0.72, passes: 3, amp: 0.8, broken: 0.04, step: 5 });
    pen.line([[ox - 6, fl + 16], [ox + d0 - 4, fl + 16]], { w: 1.9, a: 0.55, passes: 2, amp: 0.8, broken: 0.05, step: 5 });
    pen.line([[ox + d1 + 4, fl + 16], [ox + w + 6, fl + 16]], { w: 1.9, a: 0.55, passes: 2, amp: 0.8, broken: 0.05, step: 5 });
    pen.line([[ox + d0, fl + 1], [ox + d0 - 3, fl + 17]], { w: 2, a: 0.62, passes: 2, amp: 0.4, broken: 0.02 });
    pen.line([[ox + d1, fl + 1], [ox + d1 + 3, fl + 17]], { w: 2, a: 0.62, passes: 2, amp: 0.4, broken: 0.02 });
    // the pennant's pole
    pen.line([[ox + 40, top + 4], [ox + 41, top - 52]], { w: 2.1, a: 0.7, passes: 2, amp: 0.4, broken: 0.03 });
  }, { seed: sd, pressure: 0.56, vary: 0.8, varyScale: 90 });

  // The wash: every kind in the room lays its own hue on the back wall, in
  // proportion to how many of it there are. A mixed room is a muddy one; a room
  // of one kind is one colour.
  const c = counts(m.rows);
  const total = c.reduce((a, b) => a + b, 0);
  const inner = [[ox + 8, top + 8], [ox + w - 8, top + 8], [ox + w - 8, fl - 4], [ox + 8, fl - 4]];
  KINDS.forEach((k, ki) => {
    if (!c[ki]) return;
    h.layer(P[k.hue], (pen) => pen.hatch(inner, { angle: 8 + ki * 9, spacing: 2.5, len: [40, 90], a: 0.24, w: 2.5, overshoot: 0, jitter: 1.2, density: (c[ki] / total) * 0.95 }), { seed: sd + 5 + ki, pressure: 0.36, vary: 0.9, varyScale: 110 });
  });

  // The pennant: the mark this room is most known for — the one on most chests.
  const top1 = c.indexOf(Math.max(...c));
  const kk = KINDS[top1];
  const flag = [[ox + 41, top - 52], [ox + 112, top - 38], [ox + 41, top - 22]];
  h.layer(P[kk.hue], (pen) => pen.hatch(flag, { angle: kk.hatch, spacing: 3, len: [6, 16], a: 0.66, w: 1.5, overshoot: 2 }), { seed: sd + 12, pressure: 0.58 });
  h.layer(P.graphite, (pen) => pen.line([...flag, flag[0]], { w: 1.8, a: 0.72, passes: 2, amp: 0.4, broken: 0.05 }), { seed: sd + 13, pressure: 0.56 });
  h.layer(P.charcoal, (pen) => {
    const [cx, cy] = [ox + 62, top - 38];
    if (top1 === 0) pen.ring(cx, cy, 5, 5, { laps: 2, w: 1.5, a: 0.86, wobble: 0.08, open: 0.1 });
    else if (top1 === 1) pen.line([[cx - 6, cy], [cx + 6, cy]], { w: 2.5, a: 0.86, passes: 2 });
    else if (top1 === 2) { pen.line([[cx - 6, cy], [cx + 6, cy]], { w: 2, a: 0.86, passes: 2 }); pen.line([[cx, cy - 6], [cx, cy + 6]], { w: 2, a: 0.86, passes: 2 }); }
    else pen.line([[cx - 7, cy - 4], [cx, cy + 4], [cx + 7, cy - 4]], { w: 2, a: 0.86, passes: 2 });
  }, { seed: sd + 14, pressure: 0.6 });
}
