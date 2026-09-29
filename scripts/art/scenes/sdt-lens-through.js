import { LENS, along, spiral } from "./_sdt-lens.js";

/* Integration: the reason is no longer a thing inside the loop. Its strands
   cross the wall in both directions and share its stroke; the interior takes
   on the reason's tone as a whole. Still an extrinsic reason. */
const scene = {
  width: LENS.W,
  height: LENS.H,
  scale: 2,
  seed: 76,
  outputs: [{ file: "public/visual-language/theories/sdt/sdt-lens-through.webp", width: 800, quality: 84 }],
  draw(h, P) {
    const { cx, cy, rx, ry } = LENS;
    h.layer(P.turquoise, (pen) => pen.scumble(h.blob(cx, cy, rx * 0.9, ry * 0.9, { seed: 3, irregular: 0.12 }), { count: 110, loops: [8, 18], a: 0.22, size: [2.6, 5.6] }), { seed: 3, pressure: 0.3, vary: 0.7, varyScale: 110 });
    h.layer(P.teal, (pen) => pen.current(spiral(cx, cy, rx * 0.96, ry * 0.96, 4.2, 0.2), { strands: 150, width: 38, a: 0.34, w: 1.1, lengthFrac: [0.06, 0.18], amp: 1.5 }), { seed: 4, pressure: 0.44, vary: 0.65, varyScale: 90 });
    h.layer(P.teal, (pen) => {
      // strands running along the wall itself, in the wall's own stroke
      pen.current(along(0, -3.14, 3.14, 260), { strands: 90, width: 20, a: 0.48, w: 1.25, lengthFrac: [0.1, 0.3], amp: 1.2 });
      // and crossing it, both ways
      for (let k = 0; k < 18; k++) {
        const th = -3.0 + k * 0.34;
        const c = Math.cos(th), s = Math.sin(th);
        pen.line([[cx + c * (rx - 46), cy + s * (ry - 44)], [cx + c * (rx + 40), cy + s * (ry + 38)]], { w: 1.5, a: 0.5, passes: 1, amp: 1, broken: 0.12 });
      }
    }, { seed: 5, pressure: 0.5, vary: 0.7 });
    h.layer(P.emerald, (pen) => pen.hatch(h.blob(cx - 30, cy + 20, rx * 0.66, ry * 0.6, { seed: 6, irregular: 0.28 }), { angle: -34, spacing: 5.4, a: 0.26, len: [8, 22], bend: 0.14, jitter: 1.2, density: 0.7 }), { seed: 6, pressure: 0.38, vary: 0.8 });
    h.layer(P.ochre, (pen) => pen.scumble(h.blob(cx + 40, cy - 30, 66, 52, { seed: 7, irregular: 0.32 }), { count: 44, a: 0.32, size: [2, 4.4] }), { seed: 7, pressure: 0.4 });
  },
};
export default scene;
