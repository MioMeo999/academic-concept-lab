/**
 * Narmour's Implication–Realization Theory — two gestures, one question.
 *
 * Two constructed intervals on a page of pitch against time, side by side. On
 * the left a small step up, C4 to D4; on the right a large leap up, C4 to G4.
 * In each, two tones have been heard and the place where a third might arrive
 * is still empty — a pencilled question mark sits in it, and three faint
 * candidates wait round it. Round that empty place the theory's tendencies are
 * drawn as pencil marks: a teal arrow for direction, a gold brace for size
 * compared with the first interval, a red dotted ring for staying near, and a
 * red dashed level back to the first tone for coming back. Behind both, a plum
 * wash for the learned idiom that colours everything.
 *
 * The marks are qualitative. None of them aims at a pitch. Words are live HTML.
 */
const DY = 40;
const Y = (pitch) => 540 - (pitch - 60) * DY;

// x of tone 1, tone 2 and the empty third place, for each panel
const PANELS = [
  { x: [150, 350, 630], b: 62, cands: [64, 60, 67], large: false },
  { x: [950, 1150, 1430], b: 67, cands: [69, 65, 60], large: true },
];

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
  seed: 163,
  outputs: [
    { file: "public/visual-language/theories/narmour/narmour-hero.webp", width: 1600, quality: 84 },
    { file: "public/visual-language/theories/narmour/narmour-hero-900.webp", width: 900, quality: 80 },
    // narrow screens: the small step above the large leap, each at full width
    { file: "public/visual-language/theories/narmour/narmour-hero-stack.webp", width: 640, quality: 80, stack: [[30, 60, 780, 520], [820, 60, 780, 520]] },
  ],
  draw(h, P) {
    /* the learned idiom: a plum wash behind everything, thickest toward the edges */
    h.layer(P.lilac, (pen) => {
      pen.scumble(h.blob(410, 320, 400, 250, { seed: 3, irregular: 0.14, points: 44 }), { count: 640, a: 0.2, size: [1.5, 4.5] });
      pen.scumble(h.blob(1210, 320, 400, 250, { seed: 4, irregular: 0.14, points: 44 }), { count: 640, a: 0.2, size: [1.5, 4.5] });
    }, { seed: 5, pressure: 0.4 });
    h.layer(P.violet, (pen) => {
      pen.scumble(h.blob(410, 320, 330, 190, { seed: 6, irregular: 0.16, points: 40 }), { count: 190, a: 0.1, size: [1.5, 4] });
      pen.scumble(h.blob(1210, 320, 330, 190, { seed: 7, irregular: 0.16, points: 40 }), { count: 190, a: 0.1, size: [1.5, 4] });
    }, { seed: 8, pressure: 0.3 });

    /* pitch guides: where C, D, E, G and A would sit, and the three moments in time */
    h.layer(P.graphite, (pen) => {
      for (const p of [60, 62, 64, 67, 69]) {
        pen.line([[50, Y(p)], [780, Y(p)]], { w: 1.3, a: 0.24, passes: 1, amp: 1, broken: 0.6, step: 6 });
        pen.line([[850, Y(p)], [1580, Y(p)]], { w: 1.3, a: 0.24, passes: 1, amp: 1, broken: 0.6, step: 6 });
      }
      for (const panel of PANELS) {
        for (const x of panel.x) pen.line([[x, 96], [x + 2, 584]], { w: 1.2, a: 0.16, passes: 1, amp: 1.2, broken: 0.7, step: 7 });
      }
    }, { seed: 2, pressure: 0.3 });

    PANELS.forEach((panel, pi) => {
      const [x1, x2, x3] = panel.x;
      const yA = Y(60), yB = Y(panel.b);
      const ab = Math.abs(yB - yA);
      const seed = 100 + pi * 100;

      /* the fork: faint dashed prongs from the second tone to each candidate */
      h.layer(P.warmgrey, (pen) => {
        for (const c of panel.cands) {
          dashed(pen, [x2 + 34, yB + (Y(c) - yB) * 0.1], [x3 - 34, Y(c)], 9, 9, { w: 1.9, a: 0.5 });
        }
      }, { seed: seed + 1, pressure: 0.45 });

      /* the lean: direction — a teal arrow on from the second tone (continue) or back the way it came (reverse) */
      const xd = x3 - 92;
      const up = !panel.large;
      const d0 = yB + (up ? -10 : 10), d1 = yB + (up ? -118 : 118);
      h.layer(P.teal, (pen) => {
        pen.line(h.spline([[xd, d0], [xd - 18, (d0 + d1) / 2], [xd + 4, d1]]), { w: 5.2, a: 0.92, passes: 3, amp: 0.8, broken: 0.03, step: 5 });
        pen.line([[xd - 20, d1 + (up ? 26 : -26)], [xd + 4, d1], [xd + 26, d1 + (up ? 24 : -24)]], { w: 5, a: 0.92, passes: 2, amp: 0.3, broken: 0 });
      }, { seed: seed + 2, pressure: 0.64, vary: 0.6, varyScale: 70 });
      h.layer(P.turquoise, (pen) => {
        pen.line([[xd - 12, d0], [xd + 2, d1 + (up ? 8 : -8)]], { w: 14, a: 0.16, passes: 1, amp: 1.4, broken: 0, step: 6 });
      }, { seed: seed + 3, pressure: 0.4 });

      /* the lean: size, compared with the first interval — a gold brace as long as it, or a good deal shorter */
      const xs = x3 + 118;
      const span = panel.large ? ab * 0.4 : ab;
      const top = panel.large ? yB : yB - span, bot = panel.large ? yB + span : yB;
      const mid = (top + bot) / 2;
      h.layer(P.ochre, (pen) => {
        pen.line([[xs, top], [xs + 20, top + 12], [xs + 20, mid - 14], [xs + 38, mid], [xs + 20, mid + 14], [xs + 20, bot - 12], [xs, bot]], { w: 4.8, a: 0.92, passes: 3, amp: 0.8, broken: 0.03, step: 4 });
      }, { seed: seed + 4, pressure: 0.6, vary: 0.5, varyScale: 60 });
      h.layer(P.yellow, (pen) => {
        pen.line([[xs + 28, top + 6], [xs + 28, bot - 6]], { w: 14, a: 0.24, passes: 1, amp: 1, broken: 0, step: 6 });
      }, { seed: seed + 5, pressure: 0.4 });

      /* the lean: proximity — a dotted ring round the second tone's level — and return — a dashed level back to the first tone */
      h.layer(P.vermilion, (pen) => {
        const n = 30;
        for (let i = 0; i < n; i++) {
          const t = (i / n) * Math.PI * 2 + 0.3;
          pen.dot(x3 + Math.cos(t) * 74, yB + Math.sin(t) * 54, 2.6, { a: 0.86, w: 1 });
        }
        // the level of the first tone, carried across to the empty place
        dashed(pen, [x1 + 46, yA], [x3 + 84, yA], 22, 15, { w: 3, a: 0.78 });
        // and an arrow from the second tone down to it
        const xr = x3 - 196;
        const r0 = yB + 14, r1 = yA - 6;
        pen.line(h.spline([[xr, r0], [xr + 16, (r0 + r1) / 2], [xr + 2, r1]]), { w: 4, a: 0.88, passes: 2, amp: 0.7, broken: 0.05, step: 6 });
        pen.line([[xr - 18, r1 - 22], [xr + 2, r1], [xr + 22, r1 - 20]], { w: 4, a: 0.9, passes: 2, amp: 0.3, broken: 0 });
      }, { seed: seed + 6, pressure: 0.6, vary: 0.6, varyScale: 70 });

      /* the candidates: three faint dashed tones where a third might arrive, and the question that is still open */
      h.layer(P.charcoal, (pen) => {
        for (const c of panel.cands) {
          const y = Y(c);
          const head = h.blob(x3, y, 27, 18, { seed: seed + c, irregular: 0.05, rot: -0.24, points: 28 });
          const ring = [...head, head[0]];
          for (let k = 0; k < ring.length - 1; k += 6) pen.line(ring.slice(k, Math.min(k + 4, ring.length)), { w: 2.8, a: 0.66, passes: 1, amp: 0.4, broken: 0, step: 3 });
          pen.hatch(head, { angle: 38, spacing: 6, len: [6, 16], a: 0.16, w: 1.4, overshoot: 0 });
        }
        // a pencilled question mark, in the empty place
        const cx = x3, cy = yB, s = 34;
        pen.line(h.spline([[cx - 0.55 * s, cy - 0.5 * s], [cx - 0.25 * s, cy - 0.86 * s], [cx + 0.3 * s, cy - 0.9 * s], [cx + 0.55 * s, cy - 0.5 * s], [cx + 0.3 * s, cy - 0.14 * s], [cx, cy + 0.08 * s], [cx, cy + 0.32 * s]]), { w: 4.4, a: 0.7, passes: 2, amp: 0.6, broken: 0.05, step: 4 });
        pen.dot(cx, cy + 0.72 * s, 4.6, { a: 0.75, w: 1 });
      }, { seed: seed + 7, pressure: 0.5 });

      /* the two tones that were heard, and the interval between them */
      h.layer(P.charcoal, (pen) => {
        [[x1, yA, 1], [x2, yB, 2]].forEach(([x, y, k]) => {
          const head = h.blob(x, y, 32, 22, { seed: seed + 20 + k, irregular: 0.05, rot: -0.24, points: 30 });
          pen.hatch(head, { angle: 38, spacing: 2.6, len: [8, 24], a: 0.9, w: 2, overshoot: 1 });
          pen.line([...head, head[0]], { w: 3, a: 0.94, passes: 2, amp: 0.4, broken: 0.03, step: 3 });
        });
        const dx = x2 - x1, dy = yB - yA, len = Math.hypot(dx, dy);
        pen.line([[x1 + (dx / len) * 40, yA + (dy / len) * 30], [x2 - (dx / len) * 40, yB - (dy / len) * 30]], { w: 5, a: 0.9, passes: 3, amp: 0.7, broken: 0.02, step: 5 });
      }, { seed: seed + 8, pressure: 0.68, vary: 0.4, varyScale: 40 });
    });
  },
};

export default scene;
