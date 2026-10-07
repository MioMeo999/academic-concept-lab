/**
 * Statistical Learning of Music — one stream, and what keeps recurring in it.
 *
 * The record's constructed stream: thirty-six tones in one unbroken line, nine
 * kinds of tone, each at its own pitch, so the line leaps about. Nothing in it
 * marks where anything ends. Between one group and the next the thread is a
 * thin graphite line; inside a group of three it is thick and coloured — teal,
 * red or ochre for the three that keep coming back, in a different order each
 * time — and under the stream a tally stroke is kept in the same colour each
 * time one of them goes by. Behind it all, a faint plum wash for the exposure
 * history.
 *
 * The groups are drawn over the stream; in the sound they are not marked. Words
 * are live HTML.
 */
const SEQ = "ABCDEFGHIABCGHIDEFDEFABCGHIGHIDEFABC".split("");
const UNITS = ["ABC", "DEF", "GHI", "ABC", "GHI", "DEF", "DEF", "ABC", "GHI", "GHI", "DEF", "ABC"];
const PITCH = { A: 70, B: 63, C: 73, D: 65, E: 60, F: 61, G: 71, H: 66, I: 68 };
const X = (i) => 64 + i * 42.2;
const Y = (tone) => 466 - (PITCH[tone] - 60) * 19;
const HUE = { ABC: "teal", DEF: "vermilion", GHI: "ochre" };
const WASH = { ABC: "turquoise", DEF: "coral", GHI: "yellow" };

const scene = {
  width: 1600,
  height: 620,
  scale: 2,
  seed: 211,
  outputs: [
    { file: "public/visual-language/theories/stat/stat-hero.webp", width: 1600, quality: 84 },
    { file: "public/visual-language/theories/stat/stat-hero-900.webp", width: 900, quality: 80 },
    // narrow screens: the stream in two lines of eighteen tones, each at full width
    { file: "public/visual-language/theories/stat/stat-hero-stack.webp", width: 640, quality: 80, stack: [[20, 110, 800, 470], [780, 110, 800, 470]] },
  ],
  draw(h, P) {
    /* the exposure history: a plum wash behind everything */
    h.layer(P.lilac, (pen) => {
      pen.scumble(h.blob(800, 330, 780, 250, { seed: 3, irregular: 0.1, points: 48 }), { count: 1300, a: 0.2, size: [1.5, 4.5] });
    }, { seed: 4, pressure: 0.35 });
    h.layer(P.violet, (pen) => {
      pen.scumble(h.blob(800, 330, 640, 200, { seed: 5, irregular: 0.12, points: 44 }), { count: 380, a: 0.12, size: [1.5, 4] });
    }, { seed: 6, pressure: 0.3 });

    /* the thread: one unbroken line through every tone — no pause anywhere */
    h.layer(P.graphite, (pen) => {
      for (let i = 0; i < SEQ.length - 1; i++) {
        const x1 = X(i), y1 = Y(SEQ[i]), x2 = X(i + 1), y2 = Y(SEQ[i + 1]);
        const len = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / len, uy = (y2 - y1) / len;
        pen.line([[x1 + ux * 15, y1 + uy * 15], [x2 - ux * 15, y2 - uy * 15]], { w: 2.4, a: 0.72, passes: 2, amp: 0.5, broken: 0.02, step: 4 });
      }
    }, { seed: 7, pressure: 0.5, vary: 0.4, varyScale: 60 });

    /* the groups: inside each one the thread is thick and coloured, in the colour of its kind, with a soft wash beneath —
       between groups it stays a thin graphite line, so the recurring threes stand out of the stream */
    const within = (unit) => {
      const segs = [];
      UNITS.forEach((u, k) => {
        if (u !== unit) return;
        for (const i of [k * 3, k * 3 + 1]) segs.push([i, i + 1]);
      });
      return segs;
    };
    const trim = (i, j, r) => {
      const x1 = X(i), y1 = Y(SEQ[i]), x2 = X(j), y2 = Y(SEQ[j]);
      const len = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / len, uy = (y2 - y1) / len;
      return [[x1 + ux * r, y1 + uy * r], [x2 - ux * r, y2 - uy * r]];
    };
    for (const [unit, colour] of Object.entries(HUE)) {
      h.layer(P[WASH[unit]], (pen) => {
        for (const [i, j] of within(unit)) pen.line(trim(i, j, 6), { w: 30, a: 0.24, passes: 1, amp: 1.2, broken: 0, step: 6 });
      }, { seed: 20 + colour.length, pressure: 0.4 });
      h.layer(P[colour], (pen) => {
        for (const [i, j] of within(unit)) pen.line(trim(i, j, 14), { w: 10, a: 0.94, passes: 3, amp: 0.8, broken: 0.02, step: 4 });
      }, { seed: 30 + colour.length, pressure: 0.66, vary: 0.5, varyScale: 80 });
    }

    /* the tally: one stroke under a group each time it goes by, in its own colour */
    for (const [unit, colour] of Object.entries(HUE)) {
      h.layer(P[colour], (pen) => {
        let seen = 0;
        UNITS.forEach((u, k) => {
          if (u !== unit) return;
          const x = X(k * 3 + 1);
          const lean = (seen % 4) * 2 - 3;
          pen.line([[x - 4 + lean, 522], [x + 4 + lean, 580]], { w: 5.6, a: 0.9, passes: 3, amp: 0.7, broken: 0.02, step: 4 });
          seen += 1;
        });
      }, { seed: 40 + colour.length, pressure: 0.6, vary: 0.5, varyScale: 60 });
    }

    /* the tones: pencilled beads at their own pitches */
    h.layer(P.charcoal, (pen) => {
      SEQ.forEach((tone, i) => {
        const x = X(i), y = Y(tone);
        const head = h.blob(x, y, 16, 16, { seed: 60 + i, irregular: 0.04, points: 28 });
        pen.hatch(head, { angle: 38, spacing: 3, len: [6, 18], a: 0.86, w: 1.9, overshoot: 1 });
        pen.line([...head, head[0]], { w: 2.8, a: 0.92, passes: 2, amp: 0.4, broken: 0.03, step: 3 });
      });
    }, { seed: 50, pressure: 0.66, vary: 0.4, varyScale: 40 });
  },
};

export default scene;
