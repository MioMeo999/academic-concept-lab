/**
 * Social Exchange Theory — what makes what happens next an exchange?
 *
 * Two rails: actor A's line above, actor B's line below, each carrying its
 * own history. What passes between them is drawn as strands. Read left to
 * right: one strand carries a resource from A to B; a later, looser strand
 * answers, with a gap where time passed; and then many strands, crossing and
 * accumulating, weave between the rails. One strand is a transaction; what
 * the weave holds is a relationship — the history that later exchanges are
 * read through.
 *
 * A teaching drawing. Density shows accumulated history, never the strength
 * or the quality of a relationship: the weave could be warm or fraught.
 * Words are live HTML.
 */
export const RAILS = { a: 165, b: 435 };

const scene = {
  width: 1600,
  height: 600,
  scale: 2,
  seed: 81,
  crop: [0, 62, 1600, 476],
  outputs: [
    { file: "public/visual-language/theories/set/set-hero.webp", width: 1600, quality: 84 },
    { file: "public/visual-language/theories/set/set-hero-900.webp", width: 900, quality: 80 },
    // Narrow screens: turned so time runs down the page and actor A stays on the left.
    { file: "public/visual-language/theories/set/set-hero-stack.webp", width: 620, quality: 80, rotate: 90, flop: true },
  ],
  draw(h, P) {
    const { a, b } = RAILS;

    /* Ghost construction: earlier tentative strands, rubbed out — an exchange
       that was begun and abandoned, and a level line for each actor's history. */
    h.layer(P.graphite, (pen) => {
      pen.line([[120, a + 4], [148, 270], [170, 340], [190, b - 6]], { w: 0.8, a: 0.2, passes: 1, amp: 1.4, broken: 0.6 });
      pen.line([[52, a - 46], [800, a - 44], [1560, a - 47]], { w: 0.7, a: 0.12, passes: 1, amp: 1.6, broken: 0.6 });
      pen.line([[52, b + 50], [800, b + 52], [1560, b + 49]], { w: 0.7, a: 0.12, passes: 1, amp: 1.6, broken: 0.6 });
      for (let x = 100; x < 1560; x += 78) {
        pen.seg(x, a - 8, x, a + 8, { w: 0.9, a: 0.3, passes: 1 });
        pen.seg(x + 12, b - 8, x + 12, b + 8, { w: 0.9, a: 0.3, passes: 1 });
      }
    }, { seed: 1, pressure: 0.25 });

    /* The rails: each actor's own line, weighted like graphite that has been gone over. */
    h.layer(P.graphite, (pen) => {
      pen.line([[20, a], [400, a - 2], [800, a + 1], [1200, a - 1], [1580, a]], { w: 2.5, a: 0.66, passes: 4, amp: 1.5, broken: 0.06, step: 5 });
      pen.line([[20, b], [400, b + 2], [800, b - 1], [1200, b + 1], [1580, b]], { w: 2.5, a: 0.66, passes: 4, amp: 1.5, broken: 0.06, step: 5 });
    }, { seed: 2, pressure: 0.55, vary: 0.85, varyScale: 90 });
    h.layer(P.charcoal, (pen) => {
      pen.dot(58, a, 8, { a: 0.95, w: 1.5 });
      pen.dot(58, b, 8, { a: 0.95, w: 1.5 });
      pen.ring(58, a, 24, 22, { laps: 2, w: 1.5, a: 0.7, wobble: 0.08, open: 0.1 });
      pen.ring(58, b, 24, 22, { laps: 2, w: 1.5, a: 0.7, wobble: 0.08, open: 0.1 });
    }, { seed: 3, pressure: 0.6 });

    /* Moment one — a resource passes from A to B: one strand, one small token. */
    const p1 = h.spline([[214, a + 2], [244, 250], [296, 340], [340, b - 4]]);
    h.layer(P.teal, (pen) => pen.current(p1, { strands: 78, width: 28, a: 0.5, w: 1.3, lengthFrac: [0.5, 1], amp: 1.4 }), { seed: 10, pressure: 0.54, vary: 0.7, varyScale: 80 });
    h.layer(P.turquoise, (pen) => pen.current(p1, { strands: 34, width: 16, a: 0.4, w: 1.1, lengthFrac: [0.3, 0.8] }), { seed: 11, pressure: 0.4 });
    h.layer(P.emerald, (pen) => pen.current(p1, { strands: 18, width: 10, a: 0.4, w: 1.1, lengthFrac: [0.2, 0.6] }), { seed: 16, pressure: 0.4 });
    const token = h.blob(274, 302, 42, 26, { seed: 12, irregular: 0.14, rot: -0.42, points: 40 });
    h.layer(P.ochre, (pen) => pen.hatch(token, { angle: 40, spacing: 2.6, a: 0.66, len: [8, 20], bend: 0.1, jitter: 0.8 }), { seed: 13, pressure: 0.58 });
    h.layer(P.yellow, (pen) => pen.scumble(h.blob(270, 300, 32, 19, { seed: 14 }), { count: 22, a: 0.42, size: [1.6, 3] }), { seed: 14, pressure: 0.42 });
    h.layer(P.orange, (pen) => pen.hatch(h.blob(280, 306, 22, 12, { seed: 17, irregular: 0.2, rot: -0.42 }), { angle: -30, spacing: 3, a: 0.4, len: [6, 12] }), { seed: 17, pressure: 0.5 });
    h.layer(P.charcoal, (pen) => {
      pen.line([...token, token[0]], { w: 1.3, a: 0.62, passes: 2, amp: 0.7, broken: 0.1, step: 3 });
      pen.line([[320, b - 32], [342, b - 4], [318, b - 14]], { w: 1.9, a: 0.84, passes: 2 });
    }, { seed: 15, pressure: 0.5 });

    /* Moment two — B answers, later and less directly: a thinner strand that
       breaks partway. The gap is time passing, not a refusal. */
    const p2 = h.spline([[742, b - 4], [768, 380], [806, 330], [850, 280], [890, 226], [930, a + 4]]);
    const lo = p2.slice(0, Math.floor(p2.length * 0.44));
    const hi = p2.slice(Math.floor(p2.length * 0.56));
    for (const [seg, sd] of [[lo, 20], [hi, 24]]) {
      h.layer(P.ochre, (pen) => pen.current(seg, { strands: 40, width: 17, a: 0.48, w: 1.2, lengthFrac: [0.4, 1], amp: 1.7 }), { seed: sd, pressure: 0.48, vary: 0.7 });
      h.layer(P.coral, (pen) => pen.current(seg, { strands: 20, width: 10, a: 0.38, w: 1.05, lengthFrac: [0.3, 0.9] }), { seed: sd + 1, pressure: 0.4 });
      h.layer(P.yellow, (pen) => pen.current(seg, { strands: 10, width: 7, a: 0.36, w: 1.0, lengthFrac: [0.3, 0.8] }), { seed: sd + 2, pressure: 0.34 });
    }
    h.layer(P.charcoal, (pen) => {
      const mid = p2[Math.floor(p2.length * 0.5)];
      for (const d of [-9, 0, 9]) pen.dot(mid[0] + d * 1.1, mid[1] - d * 0.7, 1.7, { a: 0.9, w: 1 });
      pen.line([[906, a + 32], [930, a + 4], [906, a + 8]], { w: 1.8, a: 0.82, passes: 2 });
    }, { seed: 22, pressure: 0.5 });

    /* Moment three — many exchanges, and the weave between the rails: two
       families of strands slanting opposite ways, crossing, so the pigment
       builds where they overlap. */
    const X0 = 1090, X1 = 1530;
    const mesh = (dir, n, colour, seed, alpha, w = 1.5) => h.layer(colour, (pen) => {
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1);
        const xa = X0 + (dir < 0 ? 96 : 0) + (X1 - X0 - 130) * t + (i % 3) * 3;
        const xb = xa + dir * (70 + (i % 4) * 9);
        const wig = ((i * 37) % 9 - 4) * 2.4;
        const pts = h.spline([[xa, a + 2], [xa + (xb - xa) * 0.3 + wig, 250 + (i % 5) * 4], [xb - (xb - xa) * 0.3 - wig, 350 - (i % 3) * 5], [xb, b - 2]]);
        pen.line(pts, { w, a: alpha, passes: 2, amp: 1.1, broken: 0.16, step: 4 });
      }
    }, { seed, pressure: 0.5, vary: 0.65, varyScale: 80 });
    mesh(1, 24, P.teal, 30, 0.5);
    mesh(-1, 24, P.coral, 31, 0.48);
    mesh(1, 16, P.ochre, 32, 0.42, 1.4);
    mesh(-1, 14, P.cobalt, 33, 0.4, 1.3);
    mesh(1, 12, P.turquoise, 34, 0.36, 1.2);
    // soft pigment where the strands gather
    for (const [pts, col, sd] of [
      [h.spline([[1110, a + 2], [1230, 250], [1400, 360], [1520, b - 2]]), P.teal, 40],
      [h.spline([[1520, a + 2], [1390, 250], [1240, 360], [1110, b - 2]]), P.coral, 41],
      [h.spline([[1310, a + 2], [1296, 270], [1324, 340], [1310, b - 2]]), P.ochre, 42],
    ]) h.layer(col, (pen) => pen.current(pts, { strands: 60, width: 34, a: 0.28, w: 1.1, lengthFrac: [0.25, 0.8], amp: 1.4 }), { seed: sd, pressure: 0.42, vary: 0.7, varyScale: 90 });
    h.layer(P.warmgrey, (pen) => pen.scumble(h.blob(1310, 300, 250, 110, { seed: 43, irregular: 0.18 }), { count: 70, a: 0.18, size: [2.4, 5] }), { seed: 43, pressure: 0.3 });
    // the rails are gone over again where the weave is tied in
    h.layer(P.graphite, (pen) => {
      pen.line([[1080, a - 1], [1310, a - 3], [1540, a - 1]], { w: 3.4, a: 0.55, passes: 3, amp: 1.2, broken: 0.05 });
      pen.line([[1080, b + 1], [1310, b + 3], [1540, b + 1]], { w: 3.4, a: 0.55, passes: 3, amp: 1.2, broken: 0.05 });
    }, { seed: 50, pressure: 0.6 });
  },
};

export default scene;
