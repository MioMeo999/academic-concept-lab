/**
 * IPA — a reading of a reading.
 *
 * A warm field of lived experience; around it, the participant's teal loop of
 * sense-making, drawn as a continuous, returning line; around that, the
 * researcher's ochre loop, offset and partly broken, with small reading marks
 * where it comes close. The researcher's loop never touches the experience
 * directly — only through the participant's. Labels are live HTML.
 */
export const CENTRES = {
  experience: [560, 420],
  participant: [560, 410],
  researcher: [610, 400],
};

export default {
  width: 1200,
  height: 820,
  scale: 2,
  seed: 33,
  // Export only the drawn field; the white margin is the page's job.
  crop: [150, 60, 1000, 720],
  outputs: [
    { file: "public/visual-language/methods/ipa/ipa-double-hermeneutic.webp", width: 1400, quality: 84 },
    { file: "public/visual-language/methods/ipa/ipa-double-hermeneutic-760.webp", width: 800, quality: 80 },
  ],
  draw(h, P) {
    const [ex, ey] = CENTRES.experience;

    /* Ghost construction: the researcher's earlier, abandoned framings. */
    h.layer(P.graphite, (pen) => {
      pen.ring(640, 390, 470, 330, { laps: 1, w: 0.9, a: 0.28, open: 0.55, wobble: 0.1 });
      pen.ring(590, 430, 420, 300, { laps: 1, w: 0.9, a: 0.24, open: 0.6, wobble: 0.12, rot: 0.2 });
      pen.ring(520, 440, 300, 230, { laps: 1, w: 0.8, a: 0.2, open: 0.7, wobble: 0.14, rot: -0.3 });
      pen.seg(80, 700, 1120, 690, { w: 0.7, a: 0.12, passes: 1, broken: 0.6 });
    }, { seed: 1, pressure: 0.25 });

    /* The experience: a warm, dense, uneven mass — not a symbol, a weight. */
    const core = h.blob(ex, ey, 118, 92, { seed: 5, irregular: 0.34 });
    h.layer(P.coral, (pen) => pen.hatch(core, { angle: 32, spacing: 3.2, a: 0.55, len: [10, 26] }), { seed: 6, pressure: 0.48 });
    h.layer(P.vermilion, (pen) => pen.hatch(h.blob(ex + 16, ey + 10, 70, 54, { seed: 7, irregular: 0.3 }), { angle: -40, spacing: 3.6, a: 0.5, len: [8, 20] }), { seed: 8, pressure: 0.46 });
    h.layer(P.ochre, (pen) => pen.scumble(h.blob(ex - 20, ey - 14, 110, 84, { seed: 9 }), { count: 90, a: 0.34 }), { seed: 10, pressure: 0.38 });
    h.layer(P.magenta, (pen) => pen.hatch(h.blob(ex + 34, ey + 30, 48, 36, { seed: 11, irregular: 0.3 }), { angle: 60, spacing: 3, a: 0.4, len: [6, 14] }), { seed: 11, pressure: 0.42 });

    /* The participant's sense-making: one continuous line that keeps coming back. */
    h.layer(P.teal, (pen) => {
      const pts = [];
      for (let t = 0; t <= 1; t += 0.004) {
        const th = t * Math.PI * 2 * 2.6 + 0.4;
        const r = 1 + 0.08 * Math.sin(th * 3.1) + 0.05 * Math.sin(th * 7.3);
        pts.push([ex + Math.cos(th) * 205 * r, ey - 10 + Math.sin(th) * 168 * r]);
      }
      pen.line(pts, { w: 2.1, a: 0.78, passes: 3, amp: 1.6, broken: 0.1, step: 4 });
      const band = [];
      for (let t = 0; t <= 1; t += 0.01) { const th = t * Math.PI * 2; band.push([ex + Math.cos(th) * 205, ey - 10 + Math.sin(th) * 168]); }
      pen.current(band, { strands: 22, width: 22, a: 0.22, w: 1, lengthFrac: [0.1, 0.35] });
    }, { seed: 12, pressure: 0.5 });
    h.layer(P.turquoise, (pen) => {
      pen.hatch(h.blob(ex - 150, ey - 110, 60, 34, { seed: 13 }), { angle: 70, spacing: 4.2, a: 0.32, len: [8, 18] });
    }, { seed: 14, pressure: 0.35 });

    /* The researcher's reading: larger, offset, broken where it has not yet
       understood; small ticks where it reads closely. */
    const [rx, ry] = CENTRES.researcher;
    h.layer(P.ochre, (pen) => {
      const pts = [];
      for (let t = 0; t <= 1; t += 0.003) {
        const th = t * Math.PI * 2 * 1.15 - 0.9;
        const r = 1 + 0.06 * Math.sin(th * 2.3);
        pts.push([rx + Math.cos(th) * 360 * r, ry + Math.sin(th) * 275 * r]);
      }
      let i = 0; let k = 0;
      while (i < pts.length - 12) { const len = 18 + ((k * 37) % 5) * 14; const gap = 4 + ((k * 11) % 4) * 6; pen.line(pts.slice(i, Math.min(pts.length, i + len)), { w: 1.6 + (k % 3) * 0.5, a: 0.55 + (k % 2) * 0.2, passes: 2, amp: 1.3, broken: 0 }); i += len + gap; k++; }
      pen.current(pts.slice(0, Math.floor(pts.length * 0.3)), { strands: 16, width: 18, a: 0.2, w: 1, lengthFrac: [0.2, 0.6] });
    }, { seed: 20, pressure: 0.5 });
    h.layer(P.charcoal, (pen) => {
      // reading marks: short ticks along the researcher's loop, facing inward
      for (let k = 0; k < 18; k++) {
        const th = -0.6 + k * 0.23;
        const x0 = rx + Math.cos(th) * 344, y0 = ry + Math.sin(th) * 262;
        const x1 = rx + Math.cos(th) * 328, y1 = ry + Math.sin(th) * 250;
        pen.seg(x0, y0, x1, y1, { w: 1.2, a: 0.55, passes: 1 });
      }
    }, { seed: 22, pressure: 0.45 });

    /* Margin notes: illegible lines of the researcher's writing near the close reading. */
    h.layer(P.graphite, (pen) => {
      const notes = [[990, 170, 4], [1040, 560, 3], [150, 300, 3], [230, 640, 2]];
      for (const [nx, ny, lines] of notes) {
        for (let l = 0; l < lines; l++) {
          const pts = [];
          const L = 70 + (l % 2) * 30;
          for (let t = 0; t <= 1; t += 0.02) {
            const x = nx + t * L;
            pts.push([x, ny + l * 14 + Math.sin(t * 38 + l) * 3 * (0.6 + 0.4 * Math.sin(t * 9))]);
          }
          pen.line(pts, { w: 1, a: 0.42, passes: 1, amp: 0.4, broken: 0.35, step: 2 });
        }
      }
    }, { seed: 25, pressure: 0.35 });

    /* A single thread from the researcher through the participant's loop to the
       experience: interpretation stays tied to what was said. */
    h.layer(P.graphite, (pen) => {
      pen.curve([[930, 250], [820, 300], [700, 360], [640, 400]], { w: 1.3, a: 0.6, passes: 2, amp: 1.2 });
      pen.line([[654, 388], [640, 400], [658, 404]], { w: 1.4, a: 0.7, passes: 2 });
    }, { seed: 30, pressure: 0.45 });
  },
};
