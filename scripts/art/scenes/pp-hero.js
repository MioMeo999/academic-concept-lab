/**
 * Predictive Processing in Music — the ghost and the sound.
 *
 * At the top a plum cloud stands for a generative model. From it teal arrows run
 * down to a row of ten dashed ghost notes — what the model expects. Below them
 * is a row of ten solid pencilled notes — what actually arrives. Most sit
 * exactly under their ghosts. The fourth arrives late, and a wedge of red
 * hatching between it and its ghost marks the mismatch; the seventh does not
 * arrive at all, so an empty dashed slot sits under its ghost, ringed in red.
 * Red arrows run back up to the cloud from the two mismatches — thick from the
 * late note, thinner from the missing one — because how much a mismatch counts
 * is not the same for every mismatch.
 *
 * The mismatches are constructed to show the relation and measure nothing.
 * Words are live HTML.
 */
const N = 10;
const X = (i) => 150 + i * 140;
const Y_GHOST = 272;
const Y_HEARD = 462;
const LATE = 3;
const MISSING = 6;
const SHIFT = 46;

/** a dashed line: the pencil lifts between marks, so each dash is its own stroke */
function dashed(pen, [x0, y0], [x1, y1], on, off, opts = {}) {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const ux = (x1 - x0) / len, uy = (y1 - y0) / len;
  for (let d = 0; d < len; d += on + off) {
    const e = Math.min(d + on, len);
    pen.line([[x0 + ux * d, y0 + uy * d], [x0 + ux * e, y0 + uy * e]], { passes: 1, amp: 0.7, broken: 0, step: 4, ...opts });
  }
}

const scene = {
  width: 1600,
  height: 620,
  scale: 2,
  seed: 307,
  outputs: [
    { file: "public/visual-language/theories/pp/pp-hero.webp", width: 1600, quality: 84 },
    { file: "public/visual-language/theories/pp/pp-hero-900.webp", width: 900, quality: 80 },
    // narrow screens: the first five notes above the last five, each at full width
    { file: "public/visual-language/theories/pp/pp-hero-stack.webp", width: 640, quality: 80, stack: [[20, 20, 800, 560], [780, 20, 800, 560]] },
  ],
  draw(h, P) {
    /* the model: a cloud of hypotheses, built of overlapping lobes */
    const LOBES = [[250, 132, 96, 58], [400, 108, 118, 72], [590, 92, 124, 78], [790, 84, 132, 82], [990, 92, 124, 78], [1180, 108, 118, 72], [1340, 132, 96, 58], [800, 132, 300, 52]];
    h.layer(P.lilac, (pen) => {
      LOBES.forEach(([cx, cy, rx, ry], k) => pen.scumble(h.blob(cx, cy, rx, ry, { seed: 30 + k, irregular: 0.1, points: 36 }), { count: 220, a: 0.24, size: [2, 6] }));
      pen.scumble(h.blob(800, 340, 760, 240, { seed: 4, irregular: 0.12, points: 44 }), { count: 500, a: 0.1, size: [1.5, 4] });
    }, { seed: 5, pressure: 0.4 });
    h.layer(P.violet, (pen) => {
      // the top of each lobe, so the outline reads as a cumulus rather than a shape
      LOBES.slice(0, 7).forEach(([cx, cy, rx, ry]) => {
        const pts = [];
        for (let a = Math.PI * 0.92; a <= Math.PI * 2.08; a += 0.09) pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
        pen.line(pts, { w: 3, a: 0.72, passes: 2, amp: 1.1, broken: 0.08, step: 4 });
      });
      pen.line(h.spline([[300, 168], [520, 178], [800, 172], [1080, 178], [1300, 168]]), { w: 2.4, a: 0.5, passes: 1, amp: 1.4, broken: 0.2, step: 5 });
    }, { seed: 6, pressure: 0.5 });

    /* faint guides for the two rows */
    h.layer(P.graphite, (pen) => {
      dashed(pen, [70, Y_GHOST], [1540, Y_GHOST], 4, 14, { w: 1.4, a: 0.22 });
      dashed(pen, [70, Y_HEARD], [1540, Y_HEARD], 4, 14, { w: 1.4, a: 0.22 });
    }, { seed: 7, pressure: 0.3 });

    /* the predictions: teal arrows down from the model to each ghost */
    h.layer(P.teal, (pen) => {
      for (let i = 0; i < N; i++) {
        const x = X(i) - 34;
        dashed(pen, [x, 190], [x, 236], 8, 7, { w: 3.6, a: 0.86 });
        pen.line([[x - 10, 228], [x, 244], [x + 10, 228]], { w: 3.6, a: 0.9, passes: 2, amp: 0.3, broken: 0 });
      }
    }, { seed: 10, pressure: 0.6, vary: 0.5, varyScale: 80 });

    /* the ghosts: dashed notes where the model expects them */
    h.layer(P.turquoise, (pen) => {
      for (let i = 0; i < N; i++) {
        const head = h.blob(X(i), Y_GHOST, 31, 22, { seed: 60 + i, irregular: 0.04, rot: -0.24, points: 30 });
        pen.hatch(head, { angle: 38, spacing: 6, len: [6, 16], a: 0.24, w: 1.6, overshoot: 0 });
      }
    }, { seed: 12, pressure: 0.55 });
    h.layer(P.teal, (pen) => {
      for (let i = 0; i < N; i++) {
        const head = h.blob(X(i), Y_GHOST, 31, 22, { seed: 60 + i, irregular: 0.04, rot: -0.24, points: 30 });
        const ring = [...head, head[0]];
        for (let k = 0; k < ring.length - 1; k += 6) pen.line(ring.slice(k, Math.min(k + 4, ring.length)), { w: 4.2, a: 0.94, passes: 2, amp: 0.5, broken: 0, step: 3 });
      }
    }, { seed: 13, pressure: 0.6 });

    /* the mismatches: red hatching between a ghost and what arrived, and a hollow ring where nothing did */
    h.layer(P.vermilion, (pen) => {
      const xg = X(LATE), xa = X(LATE) + SHIFT;
      const wedge = [[xg - 14, Y_GHOST + 36], [xg + 14, Y_GHOST + 36], [xa + 20, Y_HEARD - 30], [xa - 20, Y_HEARD - 30]];
      pen.hatch(wedge, { angle: 62, spacing: 4, len: [10, 30], a: 0.7, w: 2, overshoot: 1 });
      pen.line([...wedge, wedge[0]], { w: 2.6, a: 0.75, passes: 2, amp: 0.6, broken: 0.05, step: 4 });
      pen.line([[xg, Y_HEARD + 48], [xg, Y_HEARD + 62]], { w: 3, a: 0.8, passes: 1, amp: 0.3, broken: 0 });
      pen.line([[xg, Y_HEARD + 55], [xa, Y_HEARD + 55]], { w: 3, a: 0.8, passes: 2, amp: 0.5, broken: 0.02, step: 4 });
      pen.line([[xa, Y_HEARD + 48], [xa, Y_HEARD + 62]], { w: 3, a: 0.8, passes: 1, amp: 0.3, broken: 0 });

      const xm = X(MISSING);
      dashed(pen, [xm, Y_GHOST + 38], [xm, Y_HEARD - 32], 9, 9, { w: 3, a: 0.8 });
      const slot = h.blob(xm, Y_HEARD, 34, 25, { seed: 90, irregular: 0.04, rot: -0.24, points: 30 });
      const ring = [...slot, slot[0]];
      for (let k = 0; k < ring.length - 1; k += 5) pen.line(ring.slice(k, Math.min(k + 3, ring.length)), { w: 3.4, a: 0.86, passes: 1, amp: 0.5, broken: 0, step: 3 });
      pen.hatch(slot, { angle: 62, spacing: 8, len: [6, 14], a: 0.28, w: 1.6, overshoot: 0 });
    }, { seed: 14, pressure: 0.6, vary: 0.5, varyScale: 70 });

    /* what is left over goes back up — thick where it is weighted heavily, thinner where it is not */
    h.layer(P.vermilion, (pen) => {
      const up = (x, y0, y1, w) => {
        pen.line(h.spline([[x, y0], [x + 6, (y0 + y1) / 2], [x, y1]]), { w, a: 0.92, passes: 3, amp: 0.8, broken: 0.02, step: 5 });
        pen.line([[x - 12 - w, y1 + 24 + w], [x, y1], [x + 12 + w, y1 + 24 + w]], { w: w * 0.9, a: 0.92, passes: 2, amp: 0.3, broken: 0 });
      };
      up(X(LATE) + 56, Y_HEARD - 44, 196, 9);
      up(X(MISSING) + 54, Y_HEARD - 50, 196, 5);
    }, { seed: 16, pressure: 0.66, vary: 0.4, varyScale: 90 });

    /* the sound: what arrives, solid */
    h.layer(P.charcoal, (pen) => {
      for (let i = 0; i < N; i++) {
        if (i === MISSING) continue;
        const x = X(i) + (i === LATE ? SHIFT : 0);
        const head = h.blob(x, Y_HEARD, 30, 21, { seed: 20 + i, irregular: 0.05, rot: -0.24, points: 30 });
        pen.hatch(head, { angle: 38, spacing: 2.8, len: [8, 22], a: 0.88, w: 1.9, overshoot: 1 });
        pen.line([...head, head[0]], { w: 2.8, a: 0.92, passes: 2, amp: 0.4, broken: 0.03, step: 3 });
      }
    }, { seed: 18, pressure: 0.66, vary: 0.4, varyScale: 40 });
  },
};

export default scene;
