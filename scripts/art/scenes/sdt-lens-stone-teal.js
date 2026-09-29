import { spiral } from "./_sdt-lens.js";

/* A reason the person holds as their own: a settled swirl, warm at the core. */
const scene = {
  width: 400,
  height: 400,
  scale: 2,
  seed: 73,
  outputs: [{ file: "public/visual-language/theories/sdt/sdt-lens-stone-teal.webp", width: 400, quality: 84 }],
  draw(h, P) {
    const c = 200;
    h.layer(P.turquoise, (pen) => pen.scumble(h.blob(c, c, 150, 134, { seed: 3, irregular: 0.22 }), { count: 56, loops: [8, 18], a: 0.26, size: [2.4, 5] }), { seed: 3, pressure: 0.3, vary: 0.7, varyScale: 90 });
    h.layer(P.yellow, (pen) => pen.scumble(h.blob(c + 12, c - 8, 82, 68, { seed: 4, irregular: 0.3 }), { count: 34, loops: [8, 16], a: 0.24, size: [2.4, 5] }), { seed: 4, pressure: 0.3, vary: 0.7 });
    h.layer(P.teal, (pen) => pen.current(spiral(c, c, 112, 100, 3.6, 0.4), { strands: 120, width: 28, a: 0.42, w: 1.15, lengthFrac: [0.06, 0.2], amp: 1.3 }), { seed: 5, pressure: 0.46, vary: 0.65, varyScale: 70 });
    h.layer(P.emerald, (pen) => pen.hatch(h.blob(c - 16, c + 10, 70, 58, { seed: 6, irregular: 0.32 }), { angle: -34, spacing: 4.6, a: 0.28, len: [8, 20], bend: 0.14, jitter: 1.1, density: 0.72 }), { seed: 6, pressure: 0.38, vary: 0.8 });
    h.layer(P.ochre, (pen) => pen.scumble(h.blob(c + 22, c - 16, 40, 32, { seed: 7, irregular: 0.32 }), { count: 34, a: 0.36, size: [1.8, 3.8] }), { seed: 7, pressure: 0.4 });
  },
};
export default scene;
