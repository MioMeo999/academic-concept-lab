import { LENS, wallPoly, closed } from "./_sdt-lens.js";

/* The self as a loose loop, with the action line crossing it — the one thing
   that stays constant while the reason changes. Faint ghost rings mark the
   places a reason can sit: places, not steps. */
export const STATIONS = { external: [716, 392], introjected: [586, 392], identified: [452, 420], integrated: [372, 400] };

const scene = {
  width: LENS.W,
  height: LENS.H,
  scale: 2,
  seed: 71,
  outputs: [{ file: "public/visual-language/theories/sdt/sdt-lens-wall.webp", width: 800, quality: 84 }],
  draw(h, P) {
    const { cy } = LENS;
    h.layer(P.graphite, (pen) => {
      pen.line(closed(wallPoly(h, 3, 1.13, 0.1)), { w: 0.8, a: 0.2, passes: 1, amp: 1.6, broken: 0.6 });
      pen.line(closed(wallPoly(h, 5, 0.86, 0.1)), { w: 0.8, a: 0.14, passes: 1, amp: 1.6, broken: 0.7 });
      // ghost stations: where a reason can sit, drawn as small open rings
      for (const [x, y] of Object.values(STATIONS)) pen.ring(x, y, 34, 30, { laps: 1, w: 0.9, a: 0.28, open: 0.35, wobble: 0.12 });
    }, { seed: 1, pressure: 0.25 });
    h.layer(P.graphite, (pen) => {
      pen.line(closed(wallPoly(h, 21, 1, 0.055)), { w: 2.3, a: 0.66, passes: 3, amp: 1.7, broken: 0.26, step: 4 });
      pen.line(closed(wallPoly(h, 22, 1.035, 0.07)), { w: 1.2, a: 0.32, passes: 1, amp: 2, broken: 0.4 });
    }, { seed: 18, pressure: 0.52, vary: 0.9, varyScale: 60 });
    // The action: the same line, the same weight, in every state.
    h.layer(P.graphite, (pen) => pen.line([[14, cy], [260, cy - 2], [540, cy + 1], [786, cy]], { w: 3, a: 0.68, passes: 4, amp: 1.4, broken: 0.06, step: 5 }), { seed: 80, pressure: 0.6, vary: 0.8, varyScale: 90 });
    h.layer(P.charcoal, (pen) => {
      pen.line([[14, cy + 1], [400, cy], [786, cy]], { w: 1.2, a: 0.5, passes: 1, amp: 1.1, broken: 0.1, step: 5 });
      pen.line([[758, cy - 14], [788, cy], [758, cy + 14]], { w: 2.1, a: 0.85, passes: 2 });
    }, { seed: 81, pressure: 0.55 });
  },
};
export default scene;
