/**
 * Person–Organisation Fit — the people make the place.
 *
 * The same room at three moments: before the toy runs, after one round, and
 * after three. Read left to right. The room begins mixed and its wall is a
 * muddy mix of everyone's colour; a doorway lets some in; by the third moment
 * every chest carries the same mark, the wall is one colour, and the street
 * holds only the faint outlines of the people who are no longer here.
 *
 * A teaching drawing of a made-up toy. It shows what three quiet filters do
 * when they lean the same way — not how fast, or how far, real organisations
 * sort. Words are live HTML.
 */
import { drawPeople } from "./_people.js";
import { drawRoom, peopleFor, MOMENTS, ROOM } from "./_po-hero.js";

const X = [16, 557, 1098];
const OY = 92;

const scene = {
  width: 1600,
  height: 620,
  scale: 2,
  seed: 61,
  crop: [0, 22, 1600, 560],
  outputs: [
    { file: "public/visual-language/theories/po/po-hero.webp", width: 1600, quality: 84 },
    { file: "public/visual-language/theories/po/po-hero-900.webp", width: 900, quality: 80 },
  ],
  draw(h, P) {
    MOMENTS.forEach((m, i) => drawRoom(h, P, X[i], OY, m, 20 + i * 30));
    drawPeople(h, P, MOMENTS.flatMap((m, i) => peopleFor(m, X[i], OY)), { seed: 7 });
    // time runs left to right: two small arrows between the rooms
    h.layer(P.graphite, (pen) => {
      for (let i = 0; i < 2; i++) {
        const x0 = X[i] + ROOM.w + 12, x1 = X[i + 1] - 12, y = OY + 128;
        pen.line([[x0, y], [(x0 + x1) / 2, y - 3], [x1, y]], { w: 2, a: 0.62, passes: 2, amp: 0.8, broken: 0.06 });
        pen.line([[x1 - 11, y - 8], [x1, y], [x1 - 11, y + 8]], { w: 2, a: 0.66, passes: 2, amp: 0.3, broken: 0.02 });
      }
    }, { seed: 91, pressure: 0.5 });
  },
};

export default scene;
