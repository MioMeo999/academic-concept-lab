import { LENS } from "./_sdt-lens.js";

/* Pressure from outside: strand bundles that converge on the wall, and the
   hand-drawn arrows that say which way they act. */
const scene = {
  width: LENS.W,
  height: LENS.H,
  scale: 2,
  seed: 74,
  outputs: [{ file: "public/visual-language/theories/sdt/sdt-lens-push.webp", width: 800, quality: 84 }],
  draw(h, P) {
    const wx = 664; // the wall on the right, at the action line
    const bundles = [
      { from: [790, 140], to: [wx - 6, 318], sway: -8 },
      { from: [796, 396], to: [wx + 4, 396], sway: 0 },
      { from: [790, 664], to: [wx - 6, 476], sway: 8 },
    ];
    bundles.forEach(({ from, to, sway }, i) => {
      const mid = [(from[0] + to[0]) / 2 + 10, (from[1] + to[1]) / 2 + sway];
      const path = h.spline([from, mid, to]);
      h.layer(P.vermilion, (pen) => pen.current(path, { strands: 44, widthAt: (t) => 60 * (1 - t) + 5, a: 0.46, w: 1.25, lengthFrac: [0.55, 1], amp: 1.4 }), { seed: 10 + i, pressure: 0.5, vary: 0.7, varyScale: 70 });
      h.layer(P.coral, (pen) => pen.current(path, { strands: 20, widthAt: (t) => 42 * (1 - t) + 4, a: 0.34, w: 1.1, lengthFrac: [0.4, 0.9] }), { seed: 20 + i, pressure: 0.42 });
      h.layer(P.charcoal, (pen) => {
        const dx = to[0] - from[0], dy = to[1] - from[1];
        const l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l;
        pen.line([from, [to[0] - ux * 30, to[1] - uy * 30]], { w: 1.6, a: 0.58, passes: 2, amp: 1.2, broken: 0.1 });
        const ex = to[0] - ux * 16, ey = to[1] - uy * 16;
        pen.line([[ex - ux * 22 - uy * 12, ey - uy * 22 + ux * 12], [ex, ey], [ex - ux * 22 + uy * 12, ey - uy * 22 - ux * 12]], { w: 1.8, a: 0.82, passes: 2 });
      }, { seed: 30 + i, pressure: 0.52 });
    });
  },
};
export default scene;
