import { LENS } from "./_sdt-lens.js";

/* Intrinsic motivation: the doing is the reason. Nothing arrives at the loop
   from elsewhere; warm strands come out of the activity at its centre and
   pass out through the wall. */
const scene = {
  width: LENS.W,
  height: LENS.H,
  scale: 2,
  seed: 77,
  outputs: [{ file: "public/visual-language/theories/sdt/sdt-lens-glow.webp", width: 800, quality: 84 }],
  draw(h, P) {
    const { cx, cy } = LENS;
    h.layer(P.yellow, (pen) => pen.scumble(h.blob(cx, cy, 150, 132, { seed: 3, irregular: 0.22 }), { count: 84, loops: [8, 18], a: 0.3, size: [2.6, 5.4] }), { seed: 3, pressure: 0.32, vary: 0.7, varyScale: 100 });
    h.layer(P.ochre, (pen) => pen.scumble(h.blob(cx, cy, 78, 68, { seed: 4, irregular: 0.28 }), { count: 50, a: 0.34, size: [2, 4.2] }), { seed: 4, pressure: 0.4 });
    h.layer(P.yellow, (pen) => {
      for (let k = 0; k < 44; k++) {
        const th = (k / 44) * Math.PI * 2 + (k % 3) * 0.03;
        const r0 = 70 + (k % 5) * 12, r1 = 250 + ((k * 37) % 9) * 16;
        const c = Math.cos(th), s = Math.sin(th);
        pen.line([[cx + c * r0, cy + s * r0 * 0.94], [cx + c * (r0 + (r1 - r0) * 0.5) + s * 6, cy + s * (r0 + (r1 - r0) * 0.5) * 0.94 - c * 6], [cx + c * r1, cy + s * r1 * 0.94]], { w: 1.6, a: 0.5, passes: 1, amp: 1.1, broken: 0.3 });
      }
    }, { seed: 5, pressure: 0.5, vary: 0.7 });
    h.layer(P.orange, (pen) => {
      for (let k = 0; k < 22; k++) {
        const th = (k / 22) * Math.PI * 2 + 0.07;
        const c = Math.cos(th), s = Math.sin(th);
        pen.line([[cx + c * 44, cy + s * 42], [cx + c * 130, cy + s * 122]], { w: 1.5, a: 0.44, passes: 1, amp: 0.9, broken: 0.2 });
      }
    }, { seed: 6, pressure: 0.46 });
  },
};
export default scene;
