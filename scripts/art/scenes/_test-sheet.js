export default {
  width: 1200,
  height: 700,
  scale: 2,
  seed: 4,
  outputs: [{ file: ".art-preview/_test-sheet.webp", width: 1200 }],
  draw(h, P) {
    // 1. graphite construction
    h.layer(P.graphite, (pen) => {
      pen.seg(40, 120, 1160, 118, { w: 0.7, a: 0.35, passes: 1 });
      pen.seg(600, 30, 602, 680, { w: 0.7, a: 0.3, passes: 1 });
      pen.ring(300, 330, 150, 120, { laps: 3, w: 1.3, a: 0.75 });
    }, { seed: 2, pressure: 0.35 });

    // 2. pigment mass: vermilion hatched blob with layered angles
    const blobA = h.blob(300, 330, 140, 105, { seed: 3, irregular: 0.28 });
    h.layer(P.vermilion, (pen) => {
      pen.hatch(blobA, { angle: 32, spacing: 3.4, a: 0.55, w: 1.2 });
    }, { seed: 5, pressure: 0.45 });
    h.layer(P.coral, (pen) => {
      pen.hatch(h.blob(330, 350, 110, 80, { seed: 8 }), { angle: -28, spacing: 4.5, a: 0.45 });
    }, { seed: 6, pressure: 0.35 });

    // 3. teal current across the right side, swelling in the middle
    const path = h.spline([[620, 520], [760, 440], [900, 480], [1040, 380], [1170, 400]]);
    h.layer(P.teal, (pen) => {
      pen.current(path, { strands: 70, widthAt: (t) => 16 + Math.sin(t * Math.PI) * 60, a: 0.45, w: 1 });
    }, { seed: 9, pressure: 0.5 });
    h.layer(P.cobalt, (pen) => {
      pen.current(path, { strands: 14, width: 18, a: 0.5, w: 1.1 });
    }, { seed: 10, pressure: 0.45 });

    // 4. yellow highlighter swipe
    h.layer(P.yellow, (pen) => {
      pen.hatch([[640, 160], [980, 150], [985, 196], [645, 204]], { angle: 4, spacing: 2.6, len: [60, 140], a: 0.55, w: 2.4, bend: 0.02 });
    }, { seed: 11, pressure: 0.6 });

    // 5. violet scumble cloud
    h.layer(P.violet, (pen) => {
      pen.scumble(h.blob(900, 250, 90, 55, { seed: 21 }), { count: 70 });
    }, { seed: 12, pressure: 0.4 });

    // 6. graphite labels' anchor marks and a pressed dot row
    h.layer(P.charcoal, (pen) => {
      for (let i = 0; i < 8; i++) pen.dot(660 + i * 60, 620, 3.2);
      pen.curve([[80, 620], [180, 580], [300, 640], [420, 590], [520, 630]], { w: 1.4, a: 0.8, passes: 2 });
    }, { seed: 13, pressure: 0.55 });

    // 7. erasure through part of the mass
    h.erase(h.blob(220, 300, 40, 70, { seed: 30 }), { strength: 0.8 });
  },
};
