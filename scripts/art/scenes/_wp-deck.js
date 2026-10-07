/**
 * The room as five sheets of tracing paper, laid one over another like a deck.
 *
 * One office plan is drawn five times, each on its own sheet, and the sheets are
 * offset so each can be read: the room itself (walls, windows, door, desks); the
 * people in it; the sound they make; what each can see of the others; and the
 * light and warmth that come in at the windows. The environment is not one
 * variable — it is several conditions of the same room, and each can be read on
 * its own, or through the others.
 *
 * A teaching drawing. It depicts no particular office, and no line or wash on it
 * is a measurement. Words are live HTML.
 */
import { PLAN, WINDOWS, DOOR, SEATS, DESK, TALKERS, chairAt, circle, arc, rectPts } from "./_wp-plan.js";

export const SHEETS = ["room", "people", "sound", "sight", "light"];

/**
 * sheets: [{ tx, ty, rot }] — where each sheet's top-left corner lands, and how far
 * it is turned (radians). `scale` is the size of a plan unit on the canvas.
 */
export function drawDeck(h, P, { sheets, scale, seed = 1 }) {
  const cx = PLAN.w / 2, cy = PLAN.h / 2;
  const at = (k) => {
    const { tx, ty, rot } = sheets[k];
    const c = Math.cos(rot), s = Math.sin(rot);
    return (x, y) => {
      const dx = (x - cx) * scale, dy = (y - cy) * scale;
      return [tx + cx * scale + dx * c - dy * s, ty + cy * scale + dx * s + dy * c];
    };
  };
  const proj = (k, pts) => pts.map(([x, y]) => at(k)(x, y));
  const corners = [[0, 0], [PLAN.w, 0], [PLAN.w, PLAN.h], [0, PLAN.h]];
  const HUE = [P.warmgrey, P.teal, P.vermilion, P.violet, P.ochre];

  // each sheet: a faint tint of its own colour, and the paper's edge with its pins
  SHEETS.forEach((_, k) => {
    const poly = proj(k, corners);
    h.layer(HUE[k], (pen) => pen.hatch(poly, { angle: -14, spacing: 5.5, len: [40, 90], a: 0.07, w: 1.8, overshoot: 0, jitter: 1.4, density: 0.9 }), { seed: seed + k, pressure: 0.3, vary: 0.9, varyScale: 120 });
    h.layer(P.graphite, (pen) => {
      pen.line([...poly, poly[0]], { w: 2, a: 0.7, passes: 3, amp: 0.8, broken: 0.04, step: 5 });
      for (const [px, py] of poly) pen.dot(px, py, 2.6, { a: 0.8, w: 1 });
    }, { seed: seed + 10 + k, pressure: 0.45 });
  });

  /* 0 · the room */
  {
    const w = (pts) => proj(0, pts);
    h.layer(P.graphite, (pen) => {
      const { x0, y0, x1, y1 } = PLAN;
      let cur = x0;
      const heavy = { w: 3.4, a: 0.78, passes: 3, amp: 0.8, broken: 0.04, step: 5 };
      for (const [a, b] of WINDOWS) { pen.line(w([[cur, y0], [a, y0]]), heavy); cur = b; }
      pen.line(w([[cur, y0], [x1, y0]]), heavy);
      pen.line(w([[x0, y1], [DOOR[0], y1]]), heavy);
      pen.line(w([[DOOR[1], y1], [x1, y1]]), heavy);
      pen.line(w([[x0, y0], [x0, y1]]), heavy);
      pen.line(w([[x1, y0], [x1, y1]]), heavy);
      for (const s of SEATS) {
        const d = w(rectPts(s.x - DESK.w / 2, s.y - DESK.h / 2, DESK.w, DESK.h));
        pen.line([...d, d[0]], { w: 1.9, a: 0.72, passes: 2, amp: 0.5, broken: 0.06, step: 4 });
        const m = w(rectPts(s.x - 13, s.y - 12, 26, 9));
        pen.line([...m, m[0]], { w: 1.4, a: 0.62, passes: 1, amp: 0.3, broken: 0.05 });
      }
    }, { seed: seed + 30, pressure: 0.58, vary: 0.7, varyScale: 90 });
    h.layer(P.sky, (pen) => {
      for (const [a, b] of WINDOWS) {
        pen.line(w([[a, PLAN.y0 - 3], [b, PLAN.y0 - 3]]), { w: 2.8, a: 0.72, passes: 2, amp: 0.4, broken: 0.05 });
        pen.line(w([[a, PLAN.y0 + 3], [b, PLAN.y0 + 3]]), { w: 2.2, a: 0.62, passes: 2, amp: 0.4, broken: 0.05 });
      }
      pen.line(w([[DOOR[0], PLAN.y1 + 2], [DOOR[1], PLAN.y1 + 2]]), { w: 2.2, a: 0.5, passes: 1, amp: 0.4, broken: 0.3 });
      // the door, swung open into the room
      pen.line(w([[DOOR[0], PLAN.y1], [DOOR[0], PLAN.y1 - (DOOR[1] - DOOR[0])]]), { w: 2, a: 0.62, passes: 2, amp: 0.4, broken: 0.05 });
      pen.line(w(arc(DOOR[0], PLAN.y1, DOOR[1] - DOOR[0], 0, -Math.PI / 2, 12)), { w: 1.3, a: 0.42, passes: 1, amp: 0.3, broken: 0.4 });
    }, { seed: seed + 31, pressure: 0.5 });
    h.layer(P.warmgrey, (pen) => {
      for (const s of SEATS) pen.hatch(w(rectPts(s.x - DESK.w / 2, s.y - DESK.h / 2, DESK.w, DESK.h)), { angle: 38, spacing: 3.8, len: [8, 20], a: 0.4, w: 1.4, overshoot: 1.5 });
    }, { seed: seed + 32, pressure: 0.45, vary: 0.6, varyScale: 60 });
  }

  /* 1 · the people: a head and a pair of shoulders, seen from above */
  {
    const shoulders = (px, py) => Array.from({ length: 19 }, (_, i) => { const t = Math.PI + (i / 18) * Math.PI; return [px + Math.cos(t) * 25, py + 15 + Math.sin(t) * -13]; });
    h.layer(P.teal, (pen) => {
      for (const s of SEATS) { const [px, py] = chairAt(s); pen.hatch(proj(1, shoulders(px, py)), { angle: 40, spacing: 3.2, len: [7, 15], a: 0.7, w: 1.6, overshoot: 1 }); }
    }, { seed: seed + 40, pressure: 0.58, vary: 0.6, varyScale: 40 });
    h.layer(P.graphite, (pen) => {
      for (const s of SEATS) {
        const [px, py] = chairAt(s);
        pen.line(proj(1, circle(px, py, 12.5, 24)), { w: 1.9, a: 0.74, passes: 2, amp: 0.4, broken: 0.04, step: 3 });
        pen.line(proj(1, shoulders(px, py)), { w: 1.8, a: 0.7, passes: 2, amp: 0.4, broken: 0.05, step: 3 });
      }
    }, { seed: seed + 41, pressure: 0.58 });
  }

  /* 2 · the sound: rings around whoever is talking, and words that drift */
  {
    h.layer(P.vermilion, (pen) => {
      for (const id of TALKERS) {
        const [px, py] = chairAt(SEATS[id]);
        for (const r of [28, 50, 74]) pen.line(proj(2, circle(px, py, r, 36)), { w: 2, a: 0.7 - r / 220, passes: 1, amp: 0.7, broken: 0.3, step: 4 });
      }
    }, { seed: seed + 50, pressure: 0.52, vary: 0.7, varyScale: 80 });
    h.layer(P.coral, (pen) => {
      for (const id of TALKERS) {
        const [px, py] = chairAt(SEATS[id]);
        for (const [dx, dy] of [[-38, -28], [34, -34], [-8, 46]]) pen.line(proj(2, [[px + dx, py + dy], [px + dx + 10, py + dy - 2], [px + dx + 16, py + dy + 4]]), { w: 1.9, a: 0.66, passes: 1, amp: 0.3, broken: 0.1 });
      }
    }, { seed: seed + 51, pressure: 0.48 });
  }

  /* 3 · sight: who could see whom — a line between neighbouring seats */
  {
    h.layer(P.violet, (pen) => {
      for (const s of SEATS) {
        const right = SEATS.find((t) => t.r === s.r && t.c === s.c + 1);
        const below = SEATS.find((t) => t.r === s.r + 1 && t.c === s.c);
        const diag = SEATS.find((t) => t.r === s.r + 1 && t.c === s.c + 1);
        const a = chairAt(s);
        for (const t of [right, below, diag]) if (t) pen.line(proj(3, [a, chairAt(t)]), { w: 1.7, a: 0.58, passes: 1, amp: 0.5, broken: 0.34, step: 4 });
      }
    }, { seed: seed + 60, pressure: 0.5, vary: 0.7, varyScale: 80 });
    h.layer(P.lilac, (pen) => {
      for (const s of SEATS) {
        const [px, py] = chairAt(s);
        pen.hatch(proj(3, [[px, py], ...arc(px, py, 48, -2.4, -0.75, 8)]), { angle: 50, spacing: 3.6, len: [4, 11], a: 0.4, w: 1.3, overshoot: 0.5 });
      }
    }, { seed: seed + 61, pressure: 0.42 });
  }

  /* 4 · light and warmth: rays at the windows, a warm band, a cool draught by the door */
  {
    h.layer(P.yellow, (pen) => {
      for (const [a, b] of WINDOWS) {
        for (let i = 0; i < 7; i++) {
          const x = a + ((b - a) * (i + 0.5)) / 7;
          pen.line(proj(4, [[x, PLAN.y0 + 8], [x + 26 + (i % 3) * 5, PLAN.y0 + 100 + (i % 4) * 14]]), { w: 2.6, a: 0.66, passes: 2, amp: 0.5, broken: 0.1, step: 4 });
        }
      }
    }, { seed: seed + 70, pressure: 0.54 });
    h.layer(P.ochre, (pen) => {
      pen.hatch(proj(4, rectPts(PLAN.x0 + 10, PLAN.y0 + 10, PLAN.w - 68, 110)), { angle: 12, spacing: 4, len: [30, 70], a: 0.24, w: 2.3, overshoot: 0, jitter: 1.4, density: 0.9 });
    }, { seed: seed + 71, pressure: 0.4, vary: 0.9, varyScale: 100 });
    h.layer(P.sky, (pen) => {
      pen.hatch(proj(4, rectPts(250, 296, 140, 72)), { angle: -14, spacing: 4, len: [24, 60], a: 0.34, w: 2.1, overshoot: 0, jitter: 1.4, density: 0.9 });
    }, { seed: seed + 72, pressure: 0.42, vary: 0.9, varyScale: 90 });
  }
}
