/**
 * Auditory Scene Analysis — one mixture, several streams.
 *
 * Read left to right. In the world, four sources make sound at once, each with
 * its own way of moving: a voice, a violin, a machine, footsteps. In the ear
 * their energy arrives already added together into a single line — the ear
 * receives one physical mixture, not four labelled tracks. And out of that one
 * line the listener hears streams: dashes of sound gathered into contours that
 * may, or may not, correspond to the sources they began in.
 *
 * A teaching drawing. Nothing on it is a signal, a spectrogram or a result.
 * Words are live HTML.
 */
const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

const SOURCES = [
  { y: 96, col: "teal", alt: "turquoise", wave: (x) => Math.sin(x / 15) * 24 },
  { y: 222, col: "vermilion", alt: "coral", wave: (x) => Math.sin(x / 8) * 13 + Math.sin(x / 23) * 10 },
  { y: 348, col: "ochre", alt: "yellow", wave: (x) => Math.tanh(3.2 * Math.sin(x / 11)) * 20 },
  { y: 474, col: "violet", alt: "lilac", wave: (x) => -(Math.max(0, Math.sin(x / 14)) ** 6) * 46 + 8 },
];
const MID = 285;

const scene = {
  width: 1600,
  height: 560,
  scale: 2,
  seed: 121,
  outputs: [
    { file: "public/visual-language/theories/asa/asa-hero.webp", width: 1600, quality: 84 },
    { file: "public/visual-language/theories/asa/asa-hero-900.webp", width: 900, quality: 80 },
    // narrow screens: the panorama in two rows — the world and the ear, then the ear and the streams — overlapping at the mixture
    { file: "public/visual-language/theories/asa/asa-hero-stack.webp", width: 640, quality: 80, stack: [[0, 0, 940, 560], [660, 0, 940, 560]] },
  ],
  draw(h, P) {
    const trace = (src, x0, x1) => {
      const pts = [];
      for (let x = x0; x <= x1; x += 4) {
        const s = x > 560 ? smooth(Math.min(1, (x - 560) / 190)) : 0;
        const y = lerp(src.y + src.wave(x), MID + src.wave(x) * 0.5, s);
        pts.push([x, y]);
      }
      return pts;
    };

    /* the world: four sources, each moving in its own way */
    SOURCES.forEach((src, i) => {
      const pts = trace(src, 50, 760);
      h.layer(P[src.col], (pen) => pen.line(pts, { w: 2.8, a: 0.86, passes: 3, amp: 0.7, broken: 0.05, step: 4 }), { seed: 10 + i, pressure: 0.58, vary: 0.7, varyScale: 90 });
      h.layer(P[src.alt], (pen) => pen.current(pts, { strands: 14, width: 10, a: 0.4, w: 1.2, lengthFrac: [0.4, 1], amp: 1.4 }), { seed: 20 + i, pressure: 0.42 });
    });

    /* the ear: what arrives is the sum, one line */
    const sum = [];
    for (let x = 700; x <= 980; x += 4) {
      const s = smooth(Math.min(1, (x - 700) / 60));
      const v = SOURCES.reduce((a, src) => a + src.wave(x), 0) * 0.62;
      sum.push([x, lerp(MID + SOURCES.reduce((a, src) => a + src.wave(x), 0) * 0.5 * 0.25, MID + v, s)]);
    }
    h.layer(P.graphite, (pen) => pen.line(sum, { w: 6.4, a: 0.88, passes: 4, amp: 1.1, broken: 0.03, step: 4 }), { seed: 30, pressure: 0.66, vary: 0.7, varyScale: 80 });
    SOURCES.forEach((src, i) => h.layer(P[src.col], (pen) => pen.current(sum, { strands: 26, width: 30, a: 0.34, w: 1.4, lengthFrac: [0.4, 1], amp: 1.6 }), { seed: 31 + i, pressure: 0.5, vary: 0.7, varyScale: 90 }));

    /* the scene: out of the one line, streams */
    const TRACKS = [
      { y: 116, col: "teal", alt: "turquoise", seed: 1, dashes: [[1050, 34], [1132, 44], [1222, 30], [1298, 40], [1392, 34], [1470, 42]], jit: [-8, 4, -14, 2, -6, 8] },
      { y: 285, col: "vermilion", alt: "coral", seed: 2, dashes: [[1072, 44], [1160, 30], [1236, 36], [1330, 44], [1420, 30], [1500, 38]], jit: [6, -6, 10, -4, 4, -10] },
      { y: 456, col: "violet", alt: "lilac", seed: 3, dashes: [[1040, 30], [1112, 40], [1200, 34], [1288, 44], [1378, 32], [1462, 40]], jit: [-4, 8, -8, 6, -10, 4] },
    ];
    TRACKS.forEach((tr, i) => {
      // the line the ear draws from the mouth of the mixture to the stream
      const mouth = h.spline([[980, sum[sum.length - 1][1]], [1012, lerp(MID, tr.y, 0.5)], [1046, tr.y + tr.jit[0]]]);
      h.layer(P[tr.col], (pen) => pen.line(mouth, { w: 1.7, a: 0.55, passes: 2, amp: 0.7, broken: 0.35, step: 4 }), { seed: 40 + i, pressure: 0.45 });
      // the tone events: short, pressed dashes
      h.layer(P[tr.col], (pen) => {
        tr.dashes.forEach(([x, len], k) => pen.line([[x, tr.y + tr.jit[k]], [x + len, tr.y + tr.jit[k] + (k % 2 ? 1.5 : -1.5)]], { w: 7, a: 0.92, passes: 3, amp: 0.4, broken: 0, step: 3, drift: 0.9 }));
      }, { seed: 50 + i, pressure: 0.66, vary: 0.5, varyScale: 40 });
      h.layer(P[tr.alt], (pen) => {
        tr.dashes.forEach(([x, len], k) => pen.line([[x, tr.y + tr.jit[k]], [x + len, tr.y + tr.jit[k]]], { w: 11, a: 0.36, passes: 1, amp: 0.4, broken: 0, step: 3 }));
      }, { seed: 60 + i, pressure: 0.4 });
      // the stream itself: a fine contour joining the dashes
      const contour = [];
      tr.dashes.forEach(([x, len], k) => { contour.push([x, tr.y + tr.jit[k]], [x + len, tr.y + tr.jit[k]]); });
      h.layer(P[tr.col], (pen) => pen.line(h.spline(contour, 6), { w: 1.3, a: 0.5, passes: 1, amp: 1, broken: 0.25, step: 4 }), { seed: 70 + i, pressure: 0.42 });
    });

    // a few question marks made of dots, where the mixture opens
    h.layer(P.graphite, (pen) => {
      for (const [x, y] of [[992, 190], [1002, 372], [1020, 284]]) {
        pen.line(h.spline([[x - 8, y - 16], [x, y - 26], [x + 10, y - 16], [x + 2, y - 5], [x, y + 5]]), { w: 2.4, a: 0.7, passes: 2, amp: 0.4, broken: 0.05 });
        pen.dot(x, y + 18, 2.4, { a: 0.85, w: 1.2 });
      }
    }, { seed: 80, pressure: 0.5 });
  },
};

export default scene;
