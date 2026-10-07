/**
 * Person–Organisation Fit — the wall of the room takes the colour of its people.
 *
 * Four washes of long flat strokes, one per mark, on a sheet of four cells. The
 * page lays them over the room's back wall at an opacity that follows how many
 * of that mark are in the room: a mixed room is a muddy one, a room of one kind
 * is one colour. Each cell has the proportions of the room's interior.
 *
 * Decoration that carries the idea, not data: the strength of a wash is a
 * proportion in a made-up toy. Words are live HTML.
 */
import { KINDS } from "./_people.js";

export const CELL = { w: 470, h: 215 };

const scene = {
  width: CELL.w * 2,
  height: CELL.h * 2,
  scale: 1.5,
  seed: 71,
  outputs: [{ file: "public/visual-language/theories/po/po-wash.webp", width: 940, quality: 66 }],
  draw(h, P) {
    KINDS.forEach((k, ki) => {
      const ox = (ki % 2) * CELL.w, oy = Math.floor(ki / 2) * CELL.h;
      const rect = [[ox + 3, oy + 3], [ox + CELL.w - 3, oy + 3], [ox + CELL.w - 3, oy + CELL.h - 3], [ox + 3, oy + CELL.h - 3]];
      h.layer(P[k.hue], (pen) => pen.hatch(rect, { angle: 8 + ki * 9, spacing: 2.3, len: [40, 90], a: 0.42, w: 2.6, overshoot: 0, jitter: 1.2, density: 0.96 }), { seed: 5 + ki, pressure: 0.42, vary: 0.9, varyScale: 110 });
    });
  },
};

export default scene;
