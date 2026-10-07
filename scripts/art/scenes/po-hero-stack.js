/**
 * Person–Organisation Fit — the people make the place, for narrow screens.
 *
 * The panorama of three rooms would be unreadable at phone width, and turning
 * it would lay the people on their sides. So it is recomposed: the room before
 * the toy runs, above; the room after three rounds, below; time running down.
 * The middle moment is left to the toy on the page.
 *
 * Teaching drawing of a made-up toy. Words are live HTML.
 */
import { drawPeople } from "./_people.js";
import { drawRoom, peopleFor, MOMENTS, ROOM } from "./_po-hero.js";

const OX = 17;
const OY = [64, 576];
const PICK = [0, 2];

const scene = {
  width: 520,
  height: 980,
  scale: 3,
  seed: 63,
  crop: [0, 8, 520, 950],
  outputs: [{ file: "public/visual-language/theories/po/po-hero-stack.webp", width: 640, quality: 82 }],
  draw(h, P) {
    PICK.forEach((mi, i) => drawRoom(h, P, OX, OY[i], MOMENTS[mi], 20 + i * 30));
    drawPeople(h, P, PICK.flatMap((mi, i) => peopleFor(MOMENTS[mi], OX, OY[i], { streetRows: 1 })), { seed: 7 });
    // time runs down the page
    h.layer(P.graphite, (pen) => {
      const x = OX + ROOM.w / 2, y0 = OY[0] + ROOM.h + 136, y1 = OY[1] - 62;
      pen.line([[x, y0], [x + 3, (y0 + y1) / 2], [x, y1]], { w: 2, a: 0.62, passes: 2, amp: 0.8, broken: 0.06 });
      pen.line([[x - 8, y1 - 11], [x, y1], [x + 8, y1 - 11]], { w: 2, a: 0.66, passes: 2, amp: 0.3, broken: 0.02 });
    }, { seed: 91, pressure: 0.5 });
  },
};

export default scene;
