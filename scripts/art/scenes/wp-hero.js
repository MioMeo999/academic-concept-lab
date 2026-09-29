/**
 * Workplace Design — the room is not one variable.
 *
 * One office plan drawn on five sheets of tracing paper, laid one over another
 * like a deck: the room itself, the people in it, the sound they make, what each
 * can see of the others, and the light and warmth that come in at the windows.
 * Read from the left. Each is a condition of the same room, and none moves
 * because another does.
 *
 * A teaching drawing. It depicts no particular office, and no ring, line or wash
 * on it is a measurement. Words are live HTML.
 */
import { drawDeck } from "./_wp-deck.js";

const D = Math.PI / 180;

const scene = {
  width: 1600,
  height: 560,
  scale: 2,
  seed: 91,
  outputs: [
    { file: "public/visual-language/theories/wp/wp-hero.webp", width: 1600, quality: 84 },
    { file: "public/visual-language/theories/wp/wp-hero-900.webp", width: 900, quality: 80 },
  ],
  draw(h, P) {
    drawDeck(h, P, {
      scale: 0.9,
      seed: 1,
      sheets: [
        { tx: 10, ty: 122, rot: -1.6 * D },
        { tx: 263, ty: 92, rot: 1.3 * D },
        { tx: 516, ty: 134, rot: -0.9 * D },
        { tx: 769, ty: 100, rot: 1.7 * D },
        { tx: 1022, ty: 128, rot: -1.2 * D },
      ],
    });
  },
};

export default scene;
