/**
 * HPA axis — the cascade as a descent, with the loop up the side.
 *
 * A schematic, not anatomy: nodes are pigment masses, never organ shapes.
 * The vertical order and direction of travel carry meaning; size and
 * position do not. Labels are live HTML placed by the page at the node
 * coordinates exported below, so nothing canonical is rasterised.
 */
export const NODES = {
  brain: [450, 170],
  pfc: [330, 110],
  amygdala: [578, 140],
  hippocampus: [372, 236],
  brainstem: [540, 262],
  hypothalamus: [450, 430],
  pituitary: [450, 720],
  adrenal: [450, 1010],
  body: [450, 1330],
};

export default {
  width: 900,
  height: 1500,
  scale: 2,
  seed: 21,
  outputs: [
    { file: "public/visual-language/mechanisms/hpa/hpa-cascade.webp", width: 900, quality: 84 },
    { file: "public/visual-language/mechanisms/hpa/hpa-cascade-600.webp", width: 600, quality: 80 },
  ],
  draw(h, P) {
    const N = NODES;
    const x = 450;

    /* Ghost construction: a faint axis and level ticks — order, not scale. */
    h.layer(P.graphite, (pen) => {
      pen.seg(x, 40, x + 2, 1460, { w: 0.8, a: 0.16, passes: 1, broken: 0.5 });
      // a faint corridor of construction the messages travel within
      pen.curve([[x - 120, 360], [x - 130, 800], [x - 110, 1230]], { w: 0.8, a: 0.14, passes: 1, broken: 0.6 });
      pen.curve([[x + 120, 360], [x + 128, 800], [x + 112, 1230]], { w: 0.8, a: 0.14, passes: 1, broken: 0.6 });
    }, { seed: 1, pressure: 0.25 });

    /* The appraising brain: a violet field, scumbled rather than outlined. */
    const field = h.blob(N.brain[0], N.brain[1] + 10, 250, 150, { seed: 4, irregular: 0.2 });
    h.layer(P.lilac, (pen) => {
      pen.scumble(field, { count: 110, loops: [10, 26], size: [2, 5], a: 0.32 });
    }, { seed: 2, pressure: 0.35 });
    h.layer(P.violet, (pen) => {
      pen.hatch(h.blob(N.brain[0] + 10, N.brain[1] + 20, 200, 110, { seed: 9 }), { angle: 28, spacing: 7, a: 0.28, len: [10, 26], density: 0.7 });
    }, { seed: 3, pressure: 0.3 });
    h.layer(P.graphite, (pen) => {
      pen.ring(N.brain[0], N.brain[1] + 12, 262, 160, { laps: 1, w: 1.2, a: 0.42, open: 0.5, wobble: 0.1 });
      pen.ring(N.brain[0] + 8, N.brain[1] + 18, 250, 150, { laps: 1, w: 0.9, a: 0.25, open: 0.6, wobble: 0.12 });
      for (const k of ["pfc", "amygdala", "hippocampus", "brainstem"]) {
        const [nx, ny] = N[k];
        pen.ring(nx, ny, 17, 14, { laps: 2, w: 1.1, a: 0.55, wobble: 0.14, open: 0.2 });
        // Each region sends its reading down toward the output point.
        pen.curve([[nx, ny + 16], [nx + (450 - nx) * 0.45, ny + 90], [450 + (nx - 450) * 0.12, 360]], { w: 1.1, a: 0.42, passes: 1, amp: 1.2 });
      }
    }, { seed: 5, pressure: 0.4 });
    h.layer(P.indigo, (pen) => {
      for (const k of ["pfc", "amygdala", "hippocampus", "brainstem"]) pen.dot(N[k][0], N[k][1], 6);
    }, { seed: 6, pressure: 0.6 });

    /* Three glands as pigment masses, each a different accumulation. */
    const gland = (c, rx, ry, colours, seed) => {
      const b = h.blob(c[0], c[1], rx, ry, { seed, irregular: 0.32 });
      const core = h.blob(c[0] + 6, c[1] + 4, rx * 0.55, ry * 0.55, { seed: seed + 3, irregular: 0.3 });
      colours.forEach((col, i) => h.layer(col, (pen) => {
        pen.hatch(b, { angle: 35 - i * 70, spacing: 3.4 + i * 1.4, a: 0.5 - i * 0.12, len: [12, 30] });
        if (i === 0) pen.hatch(core, { angle: 60, spacing: 2.6, a: 0.45, len: [8, 18] });
      }, { seed: seed + i, pressure: 0.45 }));
      h.layer(P.graphite, (pen) => {
        pen.ring(c[0], c[1], rx + 16, ry + 14, { laps: 1, w: 1.3, a: 0.6, wobble: 0.13, open: 0.28 });
        pen.ring(c[0] + 4, c[1] - 3, rx + 22, ry + 18, { laps: 1, w: 0.8, a: 0.3, wobble: 0.15, open: 0.45 });
      }, { seed: seed + 9, pressure: 0.45 });
    };
    gland(N.hypothalamus, 70, 48, [P.violet, P.magenta], 30);
    gland(N.pituitary, 56, 40, [P.magenta, P.lilac], 40);
    gland(N.adrenal, 78, 46, [P.ochre, P.orange], 50);

    /* Messengers travel down as currents, widening as the signal broadens. */
    const msg = (y0, y1, colour, width, seed, sway = 14) => {
      const path = h.spline([[x, y0], [x + sway, (y0 * 2 + y1) / 3], [x - sway, (y0 + y1 * 2) / 3], [x, y1]]);
      h.layer(colour, (pen) => pen.current(path, { strands: 34, width, a: 0.42, w: 1.2 }), { seed, pressure: 0.45 });
      // arrowhead at the arrival
      h.layer(P.charcoal, (pen) => {
        pen.line([[x - 11, y1 - 16], [x, y1 - 2], [x + 12, y1 - 15]], { w: 1.6, a: 0.8, passes: 2 });
      }, { seed: seed + 1, pressure: 0.5 });
    };
    msg(492, 668, P.violet, 22, 60);
    msg(772, 954, P.magenta, 30, 62, 22);
    msg(1066, 1236, P.ochre, 40, 64, 10);

    /* Cortisol spreads through body and brain: four directions, one wash. */
    const fans = [
      [P.ochre, [[x - 10, 1240], [300, 1300], [150, 1380]]],
      [P.teal, [[x - 6, 1250], [360, 1360], [280, 1450]]],
      [P.vermilion, [[x + 6, 1250], [560, 1360], [640, 1450]]],
      [P.cobalt, [[x + 10, 1240], [610, 1300], [760, 1380]]],
    ];
    fans.forEach(([col, pts], i) => h.layer(col, (pen) => {
      pen.current(h.spline(pts), { strands: 26, widthAt: (t) => 8 + t * 46, a: 0.4, w: 1.1, lengthFrac: [0.5, 1] });
    }, { seed: 70 + i, pressure: 0.42 }));
    h.layer(P.warmgrey, (pen) => {
      pen.scumble(h.blob(x, 1370, 300, 80, { seed: 77 }), { count: 50, a: 0.22, size: [2, 4] });
    }, { seed: 78, pressure: 0.3 });

    /* The loop up the side: dashed graphite, acting back on three levels. */
    h.layer(P.charcoal, (pen) => {
      const loop = h.spline([[650, 1300], [760, 1180], [790, 900], [780, 560], [720, 250], [640, 170]], 22);
      // dashes: lay the path in short pulls with gaps
      for (let i = 0; i < loop.length - 6; i += 11) {
        pen.line(loop.slice(i, i + 6), { w: 1.6, a: 0.62, passes: 2, broken: 0 });
      }
      // arrows acting back on the pituitary, hypothalamus and wider brain
      for (const [ty, tx] of [[720, 526], [430, 540], [210, 700]]) {
        const sx = ty === 210 ? 736 : 776;
        pen.line([[sx, ty], [tx, ty + 2]], { w: 1.3, a: 0.6, passes: 1, broken: 0.3 });
        pen.line([[tx + 14, ty - 9], [tx, ty + 2], [tx + 15, ty + 11]], { w: 1.5, a: 0.8, passes: 2 });
      }
    }, { seed: 90, pressure: 0.42 });
  },
};
