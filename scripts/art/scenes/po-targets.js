/**
 * Person–Organisation Fit — four things a person can be fitted to.
 *
 * Four small pictures on a sheet of two rows: the organisation (a building with
 * its pennant), the job (a desk and the sheet that describes the role), the
 * group (three people at a table) and the vocation (a road that runs past many
 * employers to the horizon). Row one is the drawing at rest, in graphite and a
 * quiet grey; row two is the same drawing chosen, with teal in the hatching.
 *
 * They are pictograms for a taxonomy of targets, not portraits of any workplace.
 * Words are live HTML.
 */
export const CELL = { w: 200, h: 170 };

const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
const outline = (pen, poly, o = {}) => pen.line([...poly, poly[0]], { w: 2.1, a: 0.78, passes: 2, amp: 0.7, broken: 0.06, step: 4, ...o });

function tinyPerson(pen, x, y, s, o = {}) {
  // head and shoulders of a person the size of a fingernail
  pen.ring(x, y - 42 * s, 10 * s, 11.5 * s, { laps: 2, w: 1.7, a: 0.72, wobble: 0.06, open: 0.08 });
  pen.line([[x - 26 * s, y], [x - 24 * s, y - 20 * s], [x - 9 * s, y - 29 * s], [x + 9 * s, y - 29 * s], [x + 24 * s, y - 20 * s], [x + 26 * s, y]], { w: 1.8, a: 0.72, passes: 2, amp: 0.4, broken: 0.05, step: 3, ...o });
}

const scene = {
  width: CELL.w * 4,
  height: CELL.h * 2,
  scale: 3,
  seed: 83,
  outputs: [{ file: "public/visual-language/theories/po/po-targets.webp", width: 1000, quality: 84 }],
  draw(h, P) {
    for (let row = 0; row < 2; row++) {
      const fill = row ? P.teal : P.warmgrey;
      const fill2 = row ? P.turquoise : P.warmgrey;
      const oy = row * CELL.h;
      const at = (col, x, y) => [col * CELL.w + x, oy + y];

      /* 0 · the organisation: a building, its door, its windows, its pennant */
      {
        const [x0, y0] = at(0, 34, 38);
        const body = rect(x0, y0, 132, 110);
        h.layer(fill, (pen) => pen.hatch(body, { angle: 40, spacing: 3.6, len: [10, 26], a: row ? 0.5 : 0.34, w: 1.5, overshoot: 2, jitter: 0.8 }), { seed: 10 + row * 50, pressure: 0.5, vary: 0.6, varyScale: 40 });
        h.layer(fill2, (pen) => pen.scumble(body, { count: 30, a: 0.3, size: [1.6, 3.2] }), { seed: 11 + row * 50, pressure: 0.4 });
        h.erase(rect(x0 + 8, y0 + 10, 116, 58), { strength: 0.9, angle: 10, seed: 3, count: 160, len: [8, 20], width: [3, 6] });
        h.layer(P.graphite, (pen) => {
          outline(pen, body, { w: 2.3 });
          // two rows of three windows
          for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) outline(pen, rect(x0 + 16 + c * 38, y0 + 14 + r * 28, 26, 18), { w: 1.6, a: 0.7, passes: 1 });
          // the door
          outline(pen, rect(x0 + 52, y0 + 76, 28, 34), { w: 1.9 });
          // the pennant on the roof
          pen.line([[x0 + 104, y0 - 2], [x0 + 104, y0 - 26]], { w: 1.8, a: 0.72, passes: 2, amp: 0.3, broken: 0.02 });
          outline(pen, [[x0 + 104, y0 - 26], [x0 + 128, y0 - 20], [x0 + 104, y0 - 14]], { w: 1.6, a: 0.7 });
        }, { seed: 12 + row * 50, pressure: 0.58, vary: 0.7, varyScale: 60 });
      }

      /* 1 · the job: a desk, and the sheet that says what the role asks for */
      {
        const [x0, y0] = at(1, 22, 30);
        const sheet = rect(x0 + 52, y0 + 10, 70, 82);
        h.layer(fill, (pen) => pen.hatch(sheet, { angle: 32, spacing: 4.2, len: [10, 24], a: row ? 0.42 : 0.28, w: 1.4, overshoot: 1.5, jitter: 0.7 }), { seed: 20 + row * 50, pressure: 0.5, vary: 0.6, varyScale: 40 });
        h.erase(rect(x0 + 60, y0 + 20, 54, 60), { strength: 0.9, angle: 10, seed: 4, count: 120, len: [6, 16], width: [3, 6] });
        h.layer(P.graphite, (pen) => {
          outline(pen, sheet, { w: 2 });
          for (let i = 0; i < 5; i++) pen.line([[x0 + 62, y0 + 26 + i * 12], [x0 + 62 + (i === 4 ? 24 : 46), y0 + 26 + i * 12]], { w: 1.5, a: 0.6, passes: 1, amp: 0.4, broken: 0.05 });
          // the desk: a top and two legs
          pen.line([[x0 - 4, y0 + 96], [x0 + 92, y0 + 98], [x0 + 176, y0 + 96]], { w: 3, a: 0.8, passes: 3, amp: 0.8, broken: 0.03, step: 4 });
          pen.line([[x0 + 10, y0 + 98], [x0 + 8, y0 + 132]], { w: 2.4, a: 0.76, passes: 2, amp: 0.4, broken: 0.02 });
          pen.line([[x0 + 162, y0 + 98], [x0 + 164, y0 + 132]], { w: 2.4, a: 0.76, passes: 2, amp: 0.4, broken: 0.02 });
        }, { seed: 21 + row * 50, pressure: 0.58, vary: 0.7, varyScale: 60 });
      }

      /* 2 · the group: three people at a table */
      {
        const [x0, y0] = at(2, 100, 132);
        h.layer(fill, (pen) => {
          for (const [dx, s] of [[-52, 0.9], [0, 1], [52, 0.9]]) pen.hatch([[x0 + dx - 26 * s, y0 - 44], [x0 + dx + 26 * s, y0 - 44], [x0 + dx + 24 * s, y0 - 4], [x0 + dx - 24 * s, y0 - 4]], { angle: 40, spacing: 3.4, len: [8, 18], a: row ? 0.5 : 0.34, w: 1.4, overshoot: 1.5 });
        }, { seed: 30 + row * 50, pressure: 0.5, vary: 0.6, varyScale: 40 });
        h.layer(P.graphite, (pen) => {
          tinyPerson(pen, x0 - 52, y0 - 6, 0.9);
          tinyPerson(pen, x0, y0 - 6, 1);
          tinyPerson(pen, x0 + 52, y0 - 6, 0.9);
        }, { seed: 31 + row * 50, pressure: 0.56, vary: 0.6, varyScale: 40 });
        const top = h.blob(x0, y0 + 2, 84, 20, { seed: 32, irregular: 0.05, points: 40 });
        h.layer(fill2, (pen) => pen.hatch(top, { angle: 4, spacing: 3.4, len: [14, 34], a: row ? 0.4 : 0.3, w: 1.5, overshoot: 2, jitter: 0.8 }), { seed: 33 + row * 50, pressure: 0.46, vary: 0.6, varyScale: 40 });
        h.layer(P.graphite, (pen) => {
          pen.ring(x0, y0 + 2, 84, 20, { laps: 2, w: 2.3, a: 0.78, wobble: 0.03, open: 0.05 });
          pen.line([[x0 - 40, y0 + 20], [x0 - 42, y0 + 36]], { w: 2.2, a: 0.7, passes: 2, amp: 0.3, broken: 0.02 });
          pen.line([[x0 + 40, y0 + 20], [x0 + 42, y0 + 36]], { w: 2.2, a: 0.7, passes: 2, amp: 0.3, broken: 0.02 });
        }, { seed: 34 + row * 50, pressure: 0.58, vary: 0.7, varyScale: 60 });
      }

      /* 3 · the vocation: a road that runs past many employers to the horizon */
      {
        const [x0, y0] = at(3, 20, 24);
        h.layer(fill, (pen) => {
          // three small buildings along the horizon
          for (const [dx, w, hh] of [[24, 22, 34], [58, 28, 46], [122, 24, 38]]) pen.hatch(rect(x0 + dx, y0 + 76 - hh, w, hh), { angle: 40, spacing: 3.4, len: [8, 20], a: row ? 0.5 : 0.34, w: 1.4, overshoot: 1.5 });
        }, { seed: 40 + row * 50, pressure: 0.5, vary: 0.6, varyScale: 40 });
        h.layer(fill2, (pen) => {
          // the road: a band that widens toward the viewer
          const road = h.spline([[x0 + 88, y0 + 78], [x0 + 92, y0 + 104], [x0 + 82, y0 + 128], [x0 + 62, y0 + 148]]);
          pen.current(road, { strands: 30, width: 34, widthAt: (t) => 6 + t * 44, a: row ? 0.36 : 0.3, w: 1.2, lengthFrac: [0.5, 1] });
        }, { seed: 41 + row * 50, pressure: 0.45, vary: 0.6, varyScale: 40 });
        h.layer(P.graphite, (pen) => {
          for (const [dx, w, hh] of [[24, 22, 34], [58, 28, 46], [122, 24, 38]]) {
            outline(pen, rect(x0 + dx, y0 + 76 - hh, w, hh), { w: 1.8, a: 0.72, passes: 1 });
            pen.line([[x0 + dx + 6, y0 + 76 - hh + 8], [x0 + dx + w - 6, y0 + 76 - hh + 8]], { w: 1.2, a: 0.5, passes: 1 });
          }
          // the horizon and the two edges of the road
          pen.line([[x0 - 6, y0 + 78], [x0 + 90, y0 + 77], [x0 + 168, y0 + 78]], { w: 2.4, a: 0.72, passes: 2, amp: 0.8, broken: 0.04, step: 4 });
          pen.line([[x0 + 84, y0 + 79], [x0 + 74, y0 + 112], [x0 + 46, y0 + 150]], { w: 2.1, a: 0.74, passes: 2, amp: 0.5, broken: 0.04 });
          pen.line([[x0 + 96, y0 + 79], [x0 + 108, y0 + 112], [x0 + 142, y0 + 150]], { w: 2.1, a: 0.74, passes: 2, amp: 0.5, broken: 0.04 });
          // a signpost by the road
          pen.line([[x0 + 142, y0 + 112], [x0 + 142, y0 + 66]], { w: 2, a: 0.72, passes: 2, amp: 0.3, broken: 0.02 });
          outline(pen, [[x0 + 142, y0 + 66], [x0 + 166, y0 + 70], [x0 + 142, y0 + 78]], { w: 1.6, a: 0.7, passes: 1 });
        }, { seed: 42 + row * 50, pressure: 0.58, vary: 0.7, varyScale: 60 });
        // dashes down the middle of the road
        h.layer(P.charcoal, (pen) => {
          for (const [t0, t1] of [[86, 92], [102, 112], [126, 140]]) pen.line([[x0 + 90 + (t0 - 86) * -0.04, y0 + t0], [x0 + 88 + (t1 - 86) * -0.16, y0 + t1]], { w: 1.8, a: 0.55, passes: 1, amp: 0.2, broken: 0 });
        }, { seed: 43 + row * 50, pressure: 0.5 });
      }
    }
  },
};

export default scene;
