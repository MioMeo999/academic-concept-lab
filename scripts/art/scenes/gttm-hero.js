/**
 * A Generative Theory of Tonal Music — one surface, four structures.
 *
 * A sixteen-note phrase in C major, drawn once as a row of pencilled noteheads,
 * with four separate descriptions of it around it. Above the notes, nearest
 * first: teal brackets that group the events in fours, eights and sixteen; a red
 * tree in which a head stands for each span; and, farthest, plum bars for the
 * four tonal regions — I, IV, V, I — with arrows for the progression between
 * their heads. Below the notes, gold dots for meter: the stronger the position,
 * the higher the stack.
 *
 * The phrase, its groups, its heads and its regions are the record's own
 * constructed teaching analysis, not a source analysis. Words are live HTML.
 */
const PITCHES = [60, 64, 67, 64, 65, 69, 67, 65, 67, 71, 69, 67, 64, 62, 60, 60];
const X = (id) => 110 + (id - 1) * 92;
const Y = (pitch) => 432 - (pitch - 60) * 12;

const LOCAL = [[1, 4], [5, 8], [9, 12], [13, 16]];
const HIGHER = [[1, 8], [9, 16]];
const LEVEL = { local: 274, higher: 246, whole: 218, treeBar: 190, treeHalf: 162, treeWhole: 134, region: 100, arcs: 44 };
const METER = [[...Array(16).keys()].map((i) => i + 1), [1, 3, 5, 7, 9, 11, 13, 15], [1, 5, 9, 13], [1, 9]];
const METER_Y = [478, 504, 530, 556];

const scene = {
  width: 1600,
  height: 620,
  scale: 2,
  seed: 141,
  outputs: [
    { file: "public/visual-language/theories/gttm/gttm-hero.webp", width: 1600, quality: 84 },
    { file: "public/visual-language/theories/gttm/gttm-hero-900.webp", width: 900, quality: 80 },
    // narrow screens: the phrase in two rows — events 1–8, then 9–16 — each with all four structures
    { file: "public/visual-language/theories/gttm/gttm-hero-stack.webp", width: 640, quality: 80, stack: [[0, 0, 820, 620], [780, 0, 820, 620]] },
  ],
  draw(h, P) {
    const bracket = (pen, a, b, y, opts = {}) => {
      const x1 = X(a) - 24, x2 = X(b) + 24;
      pen.line([[x1, y + 12], [x1, y], [x2, y], [x2, y + 12]], { w: 2.4, a: 0.84, passes: 3, amp: 0.7, broken: 0.05, step: 4, ...opts });
    };

    /* faint pitch guides: where C, G and B would sit */
    h.layer(P.graphite, (pen) => {
      for (const p of [60, 67, 71]) pen.line([[60, Y(p)], [1548, Y(p)]], { w: 1.2, a: 0.22, passes: 1, amp: 1, broken: 0.6, step: 6 });
    }, { seed: 2, pressure: 0.3 });

    /* grouping: nested brackets, and the boundaries between groups */
    h.layer(P.teal, (pen) => {
      for (const [a, b] of LOCAL) bracket(pen, a, b, LEVEL.local);
      for (const [a, b] of HIGHER) bracket(pen, a, b, LEVEL.higher, { w: 2.8 });
      bracket(pen, 1, 16, LEVEL.whole, { w: 3.2 });
      for (const b of [4, 8, 12]) pen.line([[X(b) + 46, LEVEL.local + 16], [X(b) + 46, 452]], { w: 1.4, a: 0.42, passes: 1, amp: 0.6, broken: 0.45, step: 5 });
    }, { seed: 10, pressure: 0.56, vary: 0.7, varyScale: 80 });
    h.layer(P.turquoise, (pen) => {
      for (const [a, b] of LOCAL) pen.line([[X(a) - 24, LEVEL.local + 5], [X(b) + 24, LEVEL.local + 5]], { w: 7, a: 0.2, passes: 1, amp: 1, broken: 0, step: 6 });
    }, { seed: 11, pressure: 0.4 });

    /* time-span reduction: a head stands for each span */
    h.layer(P.vermilion, (pen) => {
      const stem = (id, y, w) => pen.line([[X(id), Y(PITCHES[id - 1]) - 20], [X(id), y]], { w, a: 0.86, passes: 3, amp: 0.5, broken: 0.03, step: 5 });
      for (const id of [1, 5, 9, 16]) stem(id, LEVEL.treeBar, 3);
      for (const [a, b] of LOCAL) pen.line([[X(a) - 4, LEVEL.treeBar], [X(b) + 4, LEVEL.treeBar]], { w: 2.4, a: 0.7, passes: 2, amp: 0.6, broken: 0.05, step: 5 });
      for (const id of [1, 9]) pen.line([[X(id), LEVEL.treeBar], [X(id), LEVEL.treeHalf]], { w: 3.2, a: 0.86, passes: 3, amp: 0.4, broken: 0.03 });
      for (const [a, b] of HIGHER) pen.line([[X(a) - 4, LEVEL.treeHalf], [X(b) + 4, LEVEL.treeHalf]], { w: 2.8, a: 0.72, passes: 2, amp: 0.6, broken: 0.05, step: 5 });
      pen.line([[X(1), LEVEL.treeHalf], [X(1), LEVEL.treeWhole]], { w: 3.6, a: 0.86, passes: 3, amp: 0.4, broken: 0.03 });
      pen.line([[X(1) - 4, LEVEL.treeWhole], [X(16) + 4, LEVEL.treeWhole]], { w: 3.2, a: 0.74, passes: 2, amp: 0.6, broken: 0.05, step: 5 });
      // a head is drawn with a ring round its notehead
      for (const id of [1, 5, 9, 16]) pen.ring(X(id), Y(PITCHES[id - 1]), 26, 20, { laps: 2, w: 2.2, a: 0.8, wobble: 0.05, open: 0.06 });
      // the alternative the record keeps open for the last bar: event 13 as well as 16
      pen.line([[X(13), Y(PITCHES[12]) - 20], [X(13), LEVEL.treeBar]], { w: 2, a: 0.6, passes: 1, amp: 0.5, broken: 0.5, step: 5 });
      pen.ring(X(13), Y(PITCHES[12]), 26, 20, { laps: 1, w: 1.8, a: 0.6, wobble: 0.05, open: 0.3 });
    }, { seed: 20, pressure: 0.6, vary: 0.6, varyScale: 70 });

    /* prolongation: four tonal regions, and the progression between their heads */
    h.layer(P.magenta, (pen) => {
      const regions = [[1, 4], [5, 8], [9, 12], [13, 16]];
      regions.forEach(([a, b], i) => {
        pen.line([[X(a) - 24, LEVEL.region], [X(b) + 24, LEVEL.region]], { w: 6, a: 0.7, passes: 2, amp: 0.6, broken: 0.03, step: 5 });
        // a Roman numeral, made of a few strokes
        const cx = (X(a) + X(b)) / 2, cy = LEVEL.region - 24;
        if (i === 0 || i === 3) pen.line([[cx, cy - 12], [cx, cy + 12]], { w: 3.4, a: 0.9, passes: 2, amp: 0.2, broken: 0 });
        if (i === 1) { pen.line([[cx - 14, cy - 12], [cx - 14, cy + 12]], { w: 3.4, a: 0.9, passes: 2, amp: 0.2, broken: 0 }); pen.line([[cx - 4, cy - 12], [cx + 8, cy + 12], [cx + 18, cy - 12]], { w: 3.4, a: 0.9, passes: 2, amp: 0.3, broken: 0 }); }
        if (i === 2) pen.line([[cx - 12, cy - 12], [cx, cy + 12], [cx + 12, cy - 12]], { w: 3.4, a: 0.9, passes: 2, amp: 0.3, broken: 0 });
      });
      // the progression: I → IV → V → I, head to head
      const heads = [1, 5, 9, 16];
      for (let i = 0; i < 3; i++) {
        const x1 = X(heads[i]), x2 = X(heads[i + 1]), lift = 46 + i * 4;
        const arc = h.spline([[x1, LEVEL.arcs + 40], [(x1 + x2) / 2, LEVEL.arcs + 40 - lift], [x2, LEVEL.arcs + 40]]);
        pen.line(arc, { w: 3, a: 0.82, passes: 2, amp: 0.8, broken: 0.03, step: 4 });
        pen.line([[x2 - 12, LEVEL.arcs + 26], [x2, LEVEL.arcs + 40], [x2 + 10, LEVEL.arcs + 26]], { w: 3, a: 0.86, passes: 2, amp: 0.2, broken: 0 });
      }
      // the local elaboration of the first region
      pen.line(h.spline([[X(1), LEVEL.region + 14], [(X(1) + X(4)) / 2, LEVEL.region + 30], [X(4), LEVEL.region + 14]]), { w: 2, a: 0.6, passes: 1, amp: 0.6, broken: 0.1, step: 4 });
    }, { seed: 30, pressure: 0.58, vary: 0.6, varyScale: 80 });

    /* meter: the stronger the position, the higher the stack of dots */
    METER.forEach((row, r) => {
      h.layer(P.ochre, (pen) => { for (const id of row) pen.dot(X(id), METER_Y[r], 6 + r * 2.4, { a: 0.9, w: 1.4 }); }, { seed: 40 + r, pressure: 0.6, vary: 0.4, varyScale: 60 });
    });
    h.layer(P.yellow, (pen) => {
      METER.forEach((row, r) => { for (const id of row) pen.scumble(h.blob(X(id), METER_Y[r], 9 + r * 2.6, 9 + r * 2.6, { seed: id + r * 30 }), { count: 4 + r * 2, a: 0.4, size: [1.4, 2.6] }); });
    }, { seed: 50, pressure: 0.4 });
    h.layer(P.ochre, (pen) => {
      for (const id of METER[3]) pen.line([[X(id), METER_Y[0]], [X(id), METER_Y[3]]], { w: 2, a: 0.6, passes: 2, amp: 0.4, broken: 0.05, step: 4 });
      for (const id of [5, 13]) pen.line([[X(id), METER_Y[0]], [X(id), METER_Y[2]]], { w: 1.6, a: 0.5, passes: 1, amp: 0.4, broken: 0.05, step: 4 });
    }, { seed: 55, pressure: 0.5 });

    /* the notes themselves: sixteen pencilled noteheads */
    h.layer(P.charcoal, (pen) => {
      PITCHES.forEach((p, i) => {
        const x = X(i + 1), y = Y(p);
        const head = h.blob(x, y, 19, 13, { seed: 60 + i, irregular: 0.05, rot: -0.24, points: 30 });
        pen.hatch(head, { angle: 38, spacing: 2.6, len: [8, 20], a: 0.86, w: 1.8, overshoot: 1 });
        pen.line([...head, head[0]], { w: 2.6, a: 0.9, passes: 2, amp: 0.4, broken: 0.03, step: 3 });
      });
    }, { seed: 60, pressure: 0.66, vary: 0.4, varyScale: 40 });
  },
};

export default scene;
