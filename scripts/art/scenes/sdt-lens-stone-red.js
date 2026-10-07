import { spiral } from "./_sdt-lens.js";

/* A reason under pressure: a tight mass of converging strands. Drawn on its
   own so the page can carry it from outside the loop to the wall. */
const scene = {
  width: 400,
  height: 400,
  scale: 2,
  seed: 72,
  outputs: [{ file: "public/visual-language/theories/sdt/sdt-lens-stone-red.webp", width: 400, quality: 84 }],
  draw(h, P) {
    const c = 200;
    h.layer(P.coral, (pen) => pen.scumble(h.blob(c, c, 132, 118, { seed: 3, irregular: 0.25 }), { count: 44, loops: [8, 16], a: 0.26, size: [2.2, 4.6] }), { seed: 3, pressure: 0.3, vary: 0.7 });
    h.layer(P.vermilion, (pen) => pen.current(spiral(c, c, 96, 86, 3.4, 0.7), { strands: 96, width: 26, a: 0.5, w: 1.2, lengthFrac: [0.08, 0.22], amp: 1.2 }), { seed: 4, pressure: 0.5, vary: 0.65, varyScale: 60 });
    h.layer(P.vermilion, (pen) => pen.hatch(h.blob(c, c, 84, 72, { seed: 5, irregular: 0.3 }), { angle: 52, spacing: 3.4, a: 0.36, len: [8, 20], bend: 0.14, jitter: 1.1, density: 0.8 }), { seed: 5, pressure: 0.46, vary: 0.8 });
    h.layer(P.magenta, (pen) => pen.scumble(h.blob(c + 6, c - 4, 40, 32, { seed: 6, irregular: 0.3 }), { count: 34, a: 0.4, size: [1.6, 3.2] }), { seed: 6, pressure: 0.48 });
    h.layer(P.charcoal, (pen) => {
      const pts = [];
      for (let t = 0; t <= 1; t += 0.012) { const th = t * Math.PI * 2 * 5; pts.push([c + 2 + Math.cos(th) * (14 + 9 * Math.sin(t * 9)), c - 2 + Math.sin(th * 0.92) * (10 + 7 * Math.cos(t * 7))]); }
      pen.line(pts, { w: 1.2, a: 0.5, passes: 1, amp: 0.6, broken: 0.1, step: 2 });
    }, { seed: 7, pressure: 0.5 });
  },
};
export default scene;
