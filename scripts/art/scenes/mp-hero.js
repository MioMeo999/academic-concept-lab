/**
 * Music Preference and Person–Music Fit — a shape in a crowd of tastes.
 *
 * Five graphite lines run across the page like a stave: five qualities of
 * sound. Across them wander thirty-odd thin coloured threads, each one a
 * listener's preferences, no two alike. They are not scattered evenly: at five
 * places the threads bunch and lean onto one line together, and a soft wash
 * gathers where they do. One thick dark thread — yours — wanders through the
 * same field on its own path, felt as entirely its own, and still inside the
 * shape the others make.
 *
 * The threads are constructed to show what "a structure of taste" means: many
 * different preferences, gathering. They are not data. Words are live HTML.
 */
const W = 1600;
const H = 620;
const LINES = [128, 236, 344, 452, 560];
// where the crowd gathers: a place along the page and the quality of sound it leans on
const PINCH = [
  { x: 250, line: 2 },
  { x: 540, line: 0 },
  { x: 1040, line: 4 },
  { x: 1250, line: 1 },
  { x: 1440, line: 3 },
];
const HUES = ["turquoise", "violet", "ochre", "coral", "sky", "emerald", "magenta", "indigo"];

function mulberry(seed) {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const gauss = (r) => {
  let u = 0, v = 0;
  while (u === 0) u = r();
  while (v === 0) v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const STEPS = 33;
const X = (k) => 64 + (k * (W - 128)) / (STEPS - 1);

/** one listener's thread: it wanders on its own, and is drawn toward some of the gathering places, by its own amount */
function thread(r, pulls) {
  let y = 60 + r() * (H - 120);
  const home = 120 + r() * (H - 240);
  const pts = [];
  for (let k = 0; k < STEPS; k++) {
    const x = X(k);
    y += gauss(r) * 34 + (home - y) * 0.05;
    PINCH.forEach((p, i) => {
      const w = Math.exp(-(((x - p.x) / 84) ** 2)) * pulls[i];
      y = y * (1 - w) + (LINES[p.line] + gauss(r) * 7) * w;
    });
    y = Math.max(56, Math.min(H - 56, y));
    pts.push([x, y]);
  }
  return pts;
}

const scene = {
  width: W,
  height: H,
  scale: 2,
  seed: 411,
  outputs: [
    { file: "public/visual-language/theories/mp/mp-hero.webp", width: 1600, quality: 84 },
    { file: "public/visual-language/theories/mp/mp-hero-900.webp", width: 900, quality: 80 },
    // narrow screens: the first half of the stave above the second, each at full width
    { file: "public/visual-language/theories/mp/mp-hero-stack.webp", width: 640, quality: 80, stack: [[20, 20, 800, 580], [780, 20, 800, 580]] },
  ],
  draw(h, P) {
    const r = mulberry(77);

    /* where the crowd gathers: a soft wash on the line it leans on */
    const WASH = ["turquoise", "lilac", "yellow", "coral", "sky"];
    PINCH.forEach((p, i) => {
      h.layer(P[WASH[i]], (pen) => {
        pen.scumble(h.blob(p.x, LINES[p.line], 118, 56, { seed: 10 + i, irregular: 0.14, points: 36 }), { count: 460, a: 0.2, size: [2, 6] });
      }, { seed: 20 + i, pressure: 0.4 });
    });

    /* the stave: five qualities of sound */
    h.layer(P.graphite, (pen) => {
      LINES.forEach((y, i) => {
        pen.curve([[40, y + 1], [300, y - 2], [620, y + 2], [940, y - 1], [1280, y + 2], [1560, y - 1]], { w: 2.6, a: 0.8, passes: 2, amp: 0.8, broken: 0.04, step: 5 });
        // every stave keeps its own tick at the left, like a clef, so the five read as five things
        pen.line([[40, y - 12 - i * 0], [40, y + 12]], { w: 2.2, a: 0.6, passes: 1, amp: 0.3, broken: 0 });
      });
    }, { seed: 6, pressure: 0.5 });

    /* the crowd: each thread is one listener's preferences */
    const crowd = [];
    for (let j = 0; j < 46; j++) {
      // each listener leans onto some of the five lines and not others
      const pulls = PINCH.map(() => (r() < 0.62 ? 0.4 + r() * 0.55 : r() * 0.08));
      crowd.push({ pts: thread(r, pulls), hue: HUES[j % HUES.length] });
    }
    HUES.forEach((hue, i) => {
      h.layer(P[hue], (pen) => {
        crowd.filter((c) => c.hue === hue).forEach((c) => pen.curve(c.pts, { w: 1.6, a: 0.58, passes: 2, amp: 0.7, broken: 0.1, step: 4 }));
      }, { seed: 40 + i, pressure: 0.5, vary: 0.5, varyScale: 90 });
    });

    /* yours: one thick dark thread through the same field, on its own path */
    const mine = [];
    for (let k = 0; k < STEPS; k += 2) {
      const x = X(k);
      const y = 330 + Math.sin(k * 0.34 + 0.5) * 118 + Math.sin(k * 0.93) * 34;
      mine.push([x, Math.max(74, Math.min(H - 74, y))]);
    }
    h.layer(P.charcoal, (pen) => {
      pen.curve(mine, { w: 5.2, a: 0.92, passes: 3, amp: 0.8, broken: 0.02, step: 4 });
      const [sx, sy] = mine[0];
      pen.ring(sx, sy, 12, 12, { laps: 2, w: 3.2, a: 0.9, wobble: 0.08 });
    }, { seed: 90, pressure: 0.68, vary: 0.4, varyScale: 80 });
  },
};

export default scene;
