import { LENS, along } from "./_sdt-lens.js";

/* Pressure taken in: it now sits inside the loop, gathered along the wall
   where the outside pressed. Inside, but not the person's own. */
const ANGLES = [-0.7, 0.05, 0.72];

const scene = {
  width: LENS.W,
  height: LENS.H,
  scale: 2,
  seed: 75,
  outputs: [{ file: "public/visual-language/theories/sdt/sdt-lens-collar.webp", width: 800, quality: 84 }],
  draw(h, P) {
    h.layer(P.vermilion, (pen) => pen.current(along(-26, -1.05, 1.05, 90), { strands: 84, width: 46, a: 0.6, w: 1.3, lengthFrac: [0.25, 0.8], amp: 1.1 }), { seed: 3, pressure: 0.56, vary: 0.7, varyScale: 70 });
    h.layer(P.coral, (pen) => pen.current(along(-42, -3.14, 3.14, 260), { strands: 100, width: 46, a: 0.3, w: 1.1, lengthFrac: [0.08, 0.24], amp: 1.7 }), { seed: 4, pressure: 0.4, vary: 0.8, varyScale: 90 });
    h.layer(P.vermilion, (pen) => {
      for (const ang of ANGLES) pen.hatch(h.blob(LENS.cx + Math.cos(ang) * (LENS.rx - 62), LENS.cy + Math.sin(ang) * (LENS.ry - 56), 46, 32, { seed: 8 + Math.round(ang * 9), irregular: 0.3, rot: ang + Math.PI / 2 }), { angle: (ang * 180) / Math.PI + 70, spacing: 2.8, a: 0.5, len: [6, 15], bend: 0.12, jitter: 0.9 });
    }, { seed: 5, pressure: 0.55 });
    h.layer(P.magenta, (pen) => {
      for (const ang of ANGLES) pen.scumble(h.blob(LENS.cx + Math.cos(ang) * (LENS.rx - 68), LENS.cy + Math.sin(ang) * (LENS.ry - 60), 26, 20, { seed: 14 + Math.round(ang * 9), irregular: 0.3 }), { count: 24, a: 0.4, size: [1.4, 2.8] });
    }, { seed: 6, pressure: 0.5 });
    h.layer(P.charcoal, (pen) => {
      for (const ang of ANGLES) {
        const c = [LENS.cx + Math.cos(ang) * (LENS.rx - 74), LENS.cy + Math.sin(ang) * (LENS.ry - 66)];
        const pts = [];
        for (let t = 0; t <= 1; t += 0.014) { const th = t * Math.PI * 2 * 4.6 + ang; pts.push([c[0] + Math.cos(th) * (11 + 8 * Math.sin(t * 9)), c[1] + Math.sin(th * 0.92) * (8 + 6 * Math.cos(t * 7))]); }
        pen.line(pts, { w: 1.2, a: 0.48, passes: 1, amp: 0.6, broken: 0.1, step: 2 });
      }
    }, { seed: 7, pressure: 0.5 });
  },
};
export default scene;
