/**
 * Person–Organisation Fit — the four stand-in people, as a sprite sheet.
 *
 * The room simulation on the page puts these on its floor. Row one: the four
 * kinds, solid. Row two: the same four as a ghost — the outline of someone
 * who is no longer here. Cells are 120 × 132 drawing units.
 *
 * Teaching stand-ins for "a person who holds different things important" —
 * not personality types, and nothing in the record says organisations sort
 * on these marks. Words are live HTML.
 */
import { drawPeople } from "./_people.js";

export const CELL = { w: 120, h: 132 };

const scene = {
  width: CELL.w * 4,
  height: CELL.h * 2,
  scale: 3,
  seed: 5,
  outputs: [{ file: "public/visual-language/theories/po/po-people.webp", width: 960, quality: 88 }],
  draw(h, P) {
    const people = [];
    for (let k = 0; k < 4; k++) {
      people.push({ x: CELL.w * k + 60, y: 124, s: 1, kind: k, seed: 11 + k * 5 });
      people.push({ x: CELL.w * k + 60, y: CELL.h + 124, s: 1, kind: k, ghost: true, seed: 31 + k * 5 });
    }
    drawPeople(h, P, people, { seed: 3 });
  },
};

export default scene;
