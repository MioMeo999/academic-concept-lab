/**
 * The cover drawings.
 *
 * Both are built on an armature — a stave, a set of columns — because the
 * lesson of the plates is that loose marks only read as drawing when something
 * underneath is holding them. A colour mass with nothing to sit against is
 * scribble; the same mass over a ruled line is shading.
 *
 * So there are no scribbled balls of loops here. A region gets one clean hand
 * ring and a soft wash behind it, which is what the reference sheets actually
 * do: the ring is confident, the colour is quiet, and the type stays legible
 * on top of both.
 */

import { Plate } from "./Pigment";
import {
  Arrow, Burst, Clef, Contour, Field, Halo, Link, Marker, Note, NoteMark,
  Slur, Stave, Tag, Term,
} from "./Draw";
import type { Hue } from "./Pigment";

const GAP = 9;
const DEGREE = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
const step = (m: number) => Math.floor(m / 12) * 7 + DEGREE[m % 12];
const B4 = step(71);
const sy = (m: number, mid: number) => mid - (step(m) - B4) * (GAP / 2);

/**
 * One line of music, read three ways at once. Three slurs disagree about where
 * the phrases fall; each carries a wash of its own colour, and where two
 * readings claim the same notes the colours genuinely mix. That is the whole
 * direction in one mark — and the stave is what keeps it from being scribble.
 */
export function CoverField() {
  const L = 52;
  const W = 470;
  const mid = 132;
  const pitches = [60, 64, 62, 67, 65, 69, 67, 72, 71, 67];
  const xs = pitches.map((_, i) => L + 58 + (i / 9) * W);

  const readings: { a: number; b: number; hue: Hue; lift: number; seed: number }[] = [
    { a: 0, b: 3, hue: "cobalt", lift: 0, seed: 101 },
    { a: 4, b: 9, hue: "cobalt", lift: 0, seed: 107 },
    { a: 0, b: 5, hue: "vermilion", lift: 16, seed: 149 },
    { a: 6, b: 9, hue: "vermilion", lift: 16, seed: 151 },
    { a: 2, b: 7, hue: "ochre", lift: 32, seed: 193 },
  ];

  return (
    <Plate viewBox="0 0 620 300" ratio="620 / 300">
      {/* Colour first, under everything: a wash for each reading's span. */}
      {readings.map((rd, i) => (
        <Field key={`f${i}`} x={xs[rd.a] - 12} y={mid - 22} w={xs[rd.b] - xs[rd.a] + 24} h={44}
          hue={rd.hue} seed={rd.seed} passes={9} rows={9} angle={-11 + i * 8}
          weight={0.22} width={1.5} taper={0.28} rotateSpread={22} />
      ))}

      <Stave x1={L} x2={L + W + 76} y={mid} gap={GAP} seed={7} weight={0.95} opacity={0.4} />
      <Clef x={L + 20} y={mid + GAP} gap={GAP} seed={9} weight={1.5} opacity={0.55} />

      {xs.map((x, i) => (
        <NoteMark key={i} x={x} y={sy(pitches[i], mid)} seed={900 + i * 37}
          stemDir={sy(pitches[i], mid) > mid ? 1 : -1} stemLen={24} weight={1.5} opacity={0.72} />
      ))}

      {/* Three readings, marked as a musician marks them. */}
      {readings.map((rd, i) => (
        <Slur key={`s${i}`} x1={xs[rd.a] - 6} x2={xs[rd.b] + 6} y={mid - 30 - rd.lift}
          depth={12} hue={rd.hue} seed={rd.seed} weight={1.7} opacity={0.76} />
      ))}

      <Arrow x1={78} y1={54} x2={xs[1] - 6} y2={mid - 76} hue="cobalt" bend={0.24}
        seed={341} weight={1.7} opacity={0.66} size={9} />
      <Note x={30} y={44} hue="cobalt" size={17}>{"one reading"}</Note>

      <Burst cx={572} cy={48} r={14} hue="lemon" seed={331} rays={8} weight={1.7} opacity={0.9} />
      <Note x={412} y={34} hue="graphite" size={18}>{"the same notes —"}</Note>
      <Note x={412} y={56} hue="vermilion" size={18}>{"read three ways"}</Note>

      <Marker x={112} y={244} w={320} h={22} hue="lemon" seed={347} opacity={0.42} />
      <Note x={120} y={260} hue="charcoal" size={20}>{"where they overlap, the colour mixes"}</Note>
      <Note x={120} y={288} hue="graphite" size={16}>{"— that is the argument, not decoration."}</Note>
    </Plate>
  );
}

/* ------------------------------------------------------------- the map -- */

type Node = { id: string; label: string; sub: string; hue: Hue; x: number; y: number; rx: number; ry: number };

/**
 * The atlas as a concept map. Each record gets one clean ring with a quiet wash
 * inside it, and the label is set in type at a size that fits — a ring round a
 * word only works when the word is comfortably inside it.
 */
export function ConceptMap() {
  const nodes: Node[] = [
    { id: "gest", label: "Gestalt Principles", sub: "how events become groups", hue: "teal", x: 150, y: 104, rx: 104, ry: 44 },
    { id: "asa", label: "Auditory Scene Analysis", sub: "which sounds belong together", hue: "teal", x: 150, y: 250, rx: 104, ry: 44 },
    { id: "tonal", label: "Tonal Hierarchy", sub: "what a pitch does in context", hue: "violet", x: 424, y: 92, rx: 102, ry: 44 },
    { id: "gttm", label: "GTTM", sub: "grouping, formalised", hue: "violet", x: 424, y: 236, rx: 90, ry: 40 },
    { id: "pp", label: "Predictive Processing", sub: "prediction and error", hue: "vermilion", x: 690, y: 128, rx: 104, ry: 44 },
    { id: "itpra", label: "Huron · ITPRA", sub: "responses to an outcome", hue: "vermilion", x: 690, y: 268, rx: 100, ry: 42 },
  ];
  const at = (id: string) => nodes.find((n) => n.id === id)!;
  const edges: { a: string; b: string; hue: Hue; bend: number; seed: number }[] = [
    { a: "gest", b: "asa", hue: "teal", bend: 0.16, seed: 11 },
    { a: "gest", b: "tonal", hue: "graphite", bend: -0.12, seed: 17 },
    { a: "gest", b: "gttm", hue: "graphite", bend: 0.1, seed: 23 },
    { a: "tonal", b: "pp", hue: "graphite", bend: -0.1, seed: 29 },
    { a: "pp", b: "itpra", hue: "vermilion", bend: 0.14, seed: 37 },
    { a: "gttm", b: "pp", hue: "graphite", bend: 0.1, seed: 41 },
  ];

  return (
    <Plate viewBox="0 0 860 360" ratio="860 / 360"
      title="The music-psychology atlas as a concept map: Gestalt Principles and Auditory Scene Analysis under perception and organisation; Tonal Hierarchy and GTTM under musical structure; Predictive Processing and Huron's ITPRA under expectation. Arrows mark the relations each record states about its neighbours.">

      {/* Branch boundaries first, so the rings sit inside them. */}
      <Contour points={[[36, 178], [72, 40], [268, 34], [278, 186], [246, 330], [56, 322]]}
        hue="teal" seed={601} weight={1.2} opacity={0.26} dash="11 9" wobble={3} />
      <Tag x={44} y={26} hue="teal" size={8}>perception &amp; organisation</Tag>
      <Contour points={[[312, 168], [336, 34], [534, 30], [544, 180], [516, 314], [322, 306]]}
        hue="violet" seed={607} weight={1.2} opacity={0.26} dash="11 9" wobble={3} />
      <Tag x={322} y={22} hue="violet" size={8}>musical structure</Tag>
      <Contour points={[[572, 196], [594, 56], [812, 52], [824, 208], [794, 340], [582, 332]]}
        hue="vermilion" seed={613} weight={1.2} opacity={0.26} dash="11 9" wobble={3} />
      <Tag x={588} y={44} hue="vermilion" size={8}>expectation &amp; prediction</Tag>

      {edges.map((e, i) => {
        const A = at(e.a);
        const B = at(e.b);
        const dx = B.x - A.x;
        const dy = B.y - A.y;
        const len = Math.hypot(dx, dy) || 1;
        return (
          <Arrow key={i}
            x1={A.x + (dx / len) * A.rx * 0.9} y1={A.y + (dy / len) * A.ry * 1.05}
            x2={B.x - (dx / len) * B.rx * 1.02} y2={B.y - (dy / len) * B.ry * 1.2}
            hue={e.hue} bend={e.bend} seed={100 + e.seed} weight={1.5} opacity={0.45} size={8} />
        );
      })}

      {nodes.map((n, i) => (
        <g key={n.id}>
          <Field x={n.x - n.rx * 0.82} y={n.y - n.ry * 0.72} w={n.rx * 1.64} h={n.ry * 1.44}
            hue={n.hue} seed={400 + i * 61} passes={8} rows={8} angle={-14}
            weight={0.13} width={1.4} taper={0.36} />
          <Halo cx={n.x} cy={n.y} rx={n.rx} ry={n.ry} hue={n.hue} seed={500 + i * 37}
            laps={2} weight={1.7} opacity={0.66} />
          <Term x={n.x} y={n.y - 3} size={14} hue="charcoal" weight={560}>{n.label}</Term>
          <Term x={n.x} y={n.y + 15} size={11.5} hue="warmgrey" italic weight={400}>{n.sub}</Term>
        </g>
      ))}

      <Note x={300} y={352} hue="graphite" size={17}>{"different questions — not a ladder"}</Note>
      <Link x1={292} y1={346} x2={264} y2={322} hue="graphite" bend={0.18} seed={619} weight={1.1} opacity={0.4} />
    </Plate>
  );
}
