/**
 * Workplace Design — the room is not one variable, for narrow screens.
 *
 * The same five sheets of tracing paper, laid down the page instead of across it
 * so each stays large enough to read: the room, the people, the sound, what each
 * can see of the others, the light and warmth. The panorama is recomposed, not
 * turned, so the plan keeps its windows at the top.
 *
 * A teaching drawing. It depicts no particular office, and nothing on it is a
 * measurement. Words are live HTML.
 */
import { drawDeck } from "./_wp-deck.js";

const D = Math.PI / 180;

const scene = {
  width: 520,
  height: 840,
  scale: 3,
  seed: 93,
  outputs: [{ file: "public/visual-language/theories/wp/wp-hero-stack.webp", width: 640, quality: 82 }],
  draw(h, P) {
    drawDeck(h, P, {
      scale: 0.7,
      seed: 1,
      sheets: [
        { tx: 36, ty: 12, rot: -1.2 * D },
        { tx: 40, ty: 148, rot: 1.1 * D },
        { tx: 32, ty: 284, rot: -0.9 * D },
        { tx: 42, ty: 420, rot: 1.3 * D },
        { tx: 34, ty: 556, rot: -1 * D },
      ],
    });
  },
};

export default scene;
