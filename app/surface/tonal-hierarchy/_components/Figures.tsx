/**
 * Tonal Hierarchy — the drawings.
 *
 * Where Gestalt is built out of overlap, this plate is built around one held
 * mark. Hold C4 exactly constant, change only what precedes it, and its role
 * changes — so the probe is drawn once, from one seed, and instanced. The pitch
 * mapping is shared across panels, so it lands at the same coordinate every
 * time and forms a vertical column down the plate. That column is the argument.
 *
 * Two refusals are implemented rather than described. The profile is drawn as
 * ordered registers, never a curve — the record says no exact profile values
 * are shown, and a height axis would supply the numbers it declines to give.
 * And the torus is not drawn at all; the page gives the reason in type.
 */

import { Plate } from "../../_components/Pigment";
import {
  Arrow, Ball, Barline, Burst, Clef, Contour, Field, Halo, Link, Marker,
  Note, NoteMark, Accidental, Pencil, Rule, Squiggle, Stave, Tag, Term, Contourline,
} from "../../_components/Draw";
import { runPts } from "../../_lib/pencil";

/* --------------------------------------------------------------- staves -- */

const GAP = 9;
const DEGREE = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
const step = (m: number) => Math.floor(m / 12) * 7 + DEGREE[m % 12];
const B4 = step(71);
const sy = (m: number, mid: number) => mid - (step(m) - B4) * (GAP / 2);

/** Which pitch classes need an accidental, and which one reads better. */
const CHROMATIC: Record<number, "sharp" | "flat"> = { 1: "sharp", 3: "flat", 6: "sharp", 8: "sharp", 10: "flat" };
const accidentalFor = (m: number) => CHROMATIC[m % 12];

function Ledgers({ midi, x, mid, seed }: { midi: number; x: number; mid: number; seed: number }) {
  const s = step(midi) - B4;
  const runs = [];
  for (let k = -6; k >= s; k -= 2) runs.push(runPts(x - 9, mid - k * (GAP / 2), x + 9, mid - k * (GAP / 2), seed + k, 0.9));
  for (let k = 6; k <= s; k += 2) runs.push(runPts(x - 9, mid - k * (GAP / 2), x + 9, mid - k * (GAP / 2), seed + k, 0.9));
  if (!runs.length) return null;
  return <Pencil runs={runs} hue="warmgrey" seed={seed} passes={1} broken={0.12} weight={1} opacity={0.5} />;
}

/* ------------------------------------------ figure 1 — one probe, four surrounds */

type Ctx = { label: string; chords: number[][]; role: string };

/**
 * Figure 1. The spine of the plate, written as music.
 *
 * Four three-chord cadences, then one probe. All four surrounds are drawn in
 * one pigment: they are the same kind of object and differ only in which
 * pitches they contain — giving each its own hue would encode a difference
 * that is not there and would quietly turn colour into a key. The probe is C4
 * every time, drawn from one fixed seed, sitting on its own ledger line at the
 * same height in every system. That column is the argument.
 */
export function OneProbeFourSurrounds({ contexts }: { contexts: Ctx[] }) {
  const L = 150;
  const AXIS = 540;
  const rowH = 148;
  const H = contexts.length * rowH + 116;

  return (
    <Plate
      viewBox={`0 0 820 ${H}`}
      title="One probe under four tonal contexts, written on a stave. Each system carries a three-chord cadence and then the probe. The probe is C4 in every system — the same pitch, register, timbre, loudness and duration — drawn as one mark instanced four times. Only the cadence changes, and the probe's role changes with it: tonic, dominant, tonic-triad member, and a tone outside the diatonic collection."
    >
      {/* The held vertical: the probe lands on it in every system. */}
      <Pencil runs={[runPts(AXIS, 54, AXIS, H - 62, 17, 2.6)]} hue="graphite" seed={17}
        passes={2} broken={0.34} weight={1.3} opacity={0.34} />
      <Tag x={AXIS} y={40} hue="graphite" size={8.5} anchor="middle">probe · c4 · unchanged</Tag>

      {contexts.map((c, ci) => {
        const mid = 96 + ci * rowH;
        const chordX = [L + 62, L + 152, L + 242];

        return (
          <g key={c.label}>
            <Stave x1={L} x2={AXIS + 42} y={mid} gap={GAP} seed={5000 + ci * 31} weight={0.95} opacity={0.38} />
            <Clef x={L + 18} y={mid + GAP} gap={GAP} seed={5010 + ci} weight={1.5} opacity={0.52} />

            {/* The cadence: three stacked triads, in one pigment. */}
            {c.chords.map((chord, hi) => {
              const lo = sy(Math.min(...chord), mid);
              const hiY = sy(Math.max(...chord), mid);
              return (
                <g key={hi}>
                  <Field x={chordX[hi] - 17} y={hiY - 7} w={34} h={lo - hiY + 14} hue="cobalt"
                    seed={5100 + ci * 211 + hi * 37} passes={5} rows={7} angle={-16}
                    weight={0.16} width={1.3} taper={0.34} />
                  {chord.map((m, ti) => (
                    <g key={ti}>
                      <Ledgers midi={m} x={chordX[hi]} mid={mid} seed={5200 + ci * 17 + hi * 5 + ti} />
                      {accidentalFor(m) ? (
                        <Accidental x={chordX[hi] - 17} y={sy(m, mid)} kind={accidentalFor(m)}
                          hue="cobalt" seed={5250 + ci * 13 + hi * 3 + ti} weight={1.2} opacity={0.6} size={0.85} />
                      ) : null}
                      <NoteMark x={chordX[hi]} y={sy(m, mid)} hue="cobalt"
                        seed={5300 + hi * 13 + ti} weight={1.5} opacity={0.72} />
                    </g>
                  ))}
                  <Term x={chordX[hi]} y={mid + 52} size={10} hue="warmgrey" italic>{["i", "ii", "iii"][hi]}</Term>
                </g>
              );
            })}

            <Barline x={L + 292} y={mid} gap={GAP} seed={5400 + ci} weight={1.1} opacity={0.35} />

            {/* The mark the plate is about. One seed, one height, every system. */}
            <Ledgers midi={60} x={AXIS} mid={mid} seed={5500 + ci} />
            <NoteMark x={AXIS} y={sy(60, mid)} seed={4400} size={1.15} weight={1.7} opacity={0.85} />
            <Halo cx={AXIS} cy={sy(60, mid)} rx={20} ry={17} hue="graphite" seed={5600 + ci} laps={2} weight={1.3} opacity={0.5} />

            <Term x={42} y={mid - 16} size={19} hue="graphite" italic weight={380}>{`0${ci + 1}`}</Term>
            <foreignObject x={42} y={mid - 8} width={100} height={80}>
              <p style={{ margin: 0, font: "500 10px/1.42 var(--sf-instrument), system-ui, sans-serif", color: "var(--pg-graphite)", letterSpacing: ".02em" }}>
                {c.label}
              </p>
            </foreignObject>
            <foreignObject x={AXIS + 46} y={sy(60, mid) - 30} width={232} height={62}>
              <p style={{ margin: 0, font: "italic 16px/1.26 var(--sf-newsreader), Georgia, serif", color: "var(--ink)" }}>
                {c.role}
              </p>
            </foreignObject>
          </g>
        );
      })}

      <Burst cx={AXIS} cy={H - 86} r={14} hue="lemon" seed={5711} rays={7} weight={1.7} opacity={0.85} />
      <Marker x={AXIS - 126} y={H - 64} w={252} h={20} hue="lemon" seed={5713} opacity={0.42} />
      <Note x={AXIS - 118} y={H - 49} hue="charcoal" size={20}>{"one note. four jobs."}</Note>
    </Plate>
  );
}

/* --------------------------------------------- figure 2 — ordered registers */

const LEVELS = [
  { key: "anchor", label: "anchor", hue: "vermilion" as const },
  { key: "triad", label: "tonic triad", hue: "violet" as const },
  { key: "diatonic", label: "other diatonic", hue: "cobalt" as const },
  { key: "nondiatonic", label: "nondiatonic", hue: "warmgrey" as const },
];

/**
 * Figure 2. Deliberately not a curve and not a bar chart. Each pitch class is
 * drawn with the same mark at the same ink density; only which register it sits
 * in varies, so the ordering is carried entirely by position.
 */
export function OrderedRegisters({ items }: { items: { pitchClass: string; level: string; role: string }[] }) {
  const L = 100;
  const W = 600;
  const step = W / 12;

  return (
    <Plate
      viewBox="0 0 780 330"
      title="The twelve pitch classes sorted into four ordered registers — anchor, tonic triad, other diatonic, and nondiatonic — for a C-major context. Each pitch class is drawn with an identical mark; only which register it occupies varies. No rating values are shown, and no register is drawn darker than another."
    >
      {LEVELS.map((lv, li) => {
        const y = 58 + li * 60;
        return (
          <g key={lv.key}>
            <Link x1={L - 20} y1={y + 24} x2={L + W + 14} y2={y + 24} hue="warmgrey" bend={0.008} seed={6100 + li} weight={0.9} opacity={0.26} />
            <Tag x={L - 30} y={y + 12} hue="graphite" size={8} anchor="end">{lv.label}</Tag>
            {items.map((it, i) =>
              it.level === lv.key ? (
                <g key={it.pitchClass}>
                  {/* Identical deposit in every register — position is the claim. */}
                  <Field x={L + i * step + 5} y={y - 6} w={step - 14} h={28} hue={lv.hue}
                    seed={6200 + i * 37} passes={5} rows={8} angle={-18}
                    weight={0.3} width={1.4} taper={0.22} />
                  <Halo cx={L + i * step + step / 2 - 2} cy={y + 8} rx={step / 2 - 3} ry={17}
                    hue={lv.hue} seed={6300 + i * 23} laps={2} weight={1.3} opacity={0.44} />
                  <Term x={L + i * step + step / 2 - 2} y={y + 46} size={12} hue="charcoal">{it.pitchClass}</Term>
                </g>
              ) : null,
            )}
          </g>
        );
      })}
      <Arrow x1={L + W + 46} y1={72} x2={L + W + 46} y2={244} hue="graphite" bend={0.14} seed={6400} weight={1.4} opacity={0.42} size={8} />
      <Note x={L + W + 60} y={158} hue="graphite" size={16}>{"ordered —\nbut not\nmeasured"}</Note>
      <Note x={L - 26} y={310} hue="graphite" size={17}>{"same ink in every register."}</Note>
      <Squiggle x={L - 26} y={318} len={196} hue="warmgrey" seed={6500} cycles={5} amp={2.2} weight={1.1} opacity={0.4} />
    </Plate>
  );
}

/* ------------------------------------------------ figure 3 — accumulation */

/**
 * Figure 3. Two tonal readings across a chord sequence.
 *
 * Support really is content here — the record says a new chord can strengthen
 * an alternative while the first stays active. But density never means evidence
 * on this surface, so support is drawn as the extent a mass occupies at constant
 * ink. A reading that gains support becomes wider, never darker. This is the
 * figure where that constraint costs something, and it is paid.
 */
export function CompetingReadings() {
  const L = 118;
  const W = 540;
  const steps = 9;
  const x = (i: number) => L + (i / (steps - 1)) * W;
  const first = [0.86, 0.86, 0.8, 0.72, 0.6, 0.48, 0.38, 0.32, 0.3];
  const second = [0.1, 0.12, 0.2, 0.3, 0.42, 0.54, 0.64, 0.7, 0.72];
  const half = (v: number) => 7 + v * 34;
  const AX = 96;
  const BX = 216;

  return (
    <Plate
      viewBox="0 0 800 300"
      title="Two tonal interpretations across a nine-chord sequence. The first reading stays active while a second gains support; the second does not simply replace it at the final chord. Support is drawn as the vertical extent each band occupies, at constant ink density — a reading that gains support becomes wider, never darker."
    >
      {/* An armature first: a ruled baseline and a tick for every chord, so the
          washes have something to sit against instead of floating. */}
      <Rule x1={L - 34} y1={AX} x2={L + W + 40} y2={AX} hue="warmgrey" seed={7501} weight={0.9} opacity={0.24} />
      <Rule x1={L - 34} y1={BX} x2={L + W + 40} y2={BX} hue="warmgrey" seed={7503} weight={0.9} opacity={0.24} />
      <Rule x1={L - 34} y1={262} x2={L + W + 40} y2={262} hue="warmgrey" seed={7505} weight={1.1} opacity={0.42} />

      {Array.from({ length: steps }, (_, i) => (
        <g key={i}>
          <Rule x1={x(i)} y1={258} x2={x(i)} y2={266} hue="warmgrey" seed={7520 + i} weight={1} opacity={0.4} passes={1} />
          {/* One column per chord, its height the support that reading has. */}
          <Field x={x(i) - 20} y={AX - half(first[i])} w={40} h={half(first[i]) * 2} hue="teal"
            seed={7100 + i * 53} passes={6} rows={8} angle={-12} weight={0.24} width={1.4} taper={0.3} />
          <Field x={x(i) - 20} y={BX - half(second[i])} w={40} h={half(second[i]) * 2} hue="ochre"
            seed={7300 + i * 53} passes={6} rows={8} angle={13} weight={0.24} width={1.4} taper={0.3} />
          <Term x={x(i)} y={282} size={11} hue="warmgrey">{String(i + 1)}</Term>
        </g>
      ))}

      {/* The envelope, drawn as two clean edges rather than a closed blob:
          what the reader should follow is the widening, not the outline. */}
      <Contourline points={Array.from({ length: steps }, (_, i) => [x(i), AX - half(first[i]) - 3] as [number, number])}
        hue="teal" seed={7540} weight={1.6} opacity={0.62} lift={0} />
      <Contourline points={Array.from({ length: steps }, (_, i) => [x(i), AX + half(first[i]) + 3] as [number, number])}
        hue="teal" seed={7542} weight={1.6} opacity={0.62} lift={0} />
      <Contourline points={Array.from({ length: steps }, (_, i) => [x(i), BX - half(second[i]) - 3] as [number, number])}
        hue="ochre" seed={7544} weight={1.6} opacity={0.62} lift={0} />
      <Contourline points={Array.from({ length: steps }, (_, i) => [x(i), BX + half(second[i]) + 3] as [number, number])}
        hue="ochre" seed={7546} weight={1.6} opacity={0.62} lift={0} />

      <Tag x={L - 44} y={AX + 3} hue="teal" size={8.5} anchor="end">first reading</Tag>
      <Tag x={L - 44} y={BX + 3} hue="ochre" size={8.5} anchor="end">alternative</Tag>
      <Tag x={L + W / 2} y={26} hue="warmgrey" size={7.5} anchor="middle">chords, in order</Tag>

      <Arrow x1={x(1)} y1={44} x2={x(7)} y2={44} hue="graphite" bend={-0.06} seed={7560}
        weight={1.4} opacity={0.4} size={8} />
      <Note x={x(8) + 22} y={AX - 10} hue="teal" size={17}>{"yields —"}</Note>
      <Note x={x(8) + 22} y={AX + 10} hue="teal" size={17}>{"but stays"}</Note>
      <Note x={x(8) + 22} y={BX + 4} hue="ochre" size={17}>{"gains"}</Note>
      <Marker x={L - 30} y={128} w={196} h={20} hue="lemon" seed={7570} opacity={0.4} />
      <Note x={L - 22} y={143} hue="charcoal" size={19}>{"wider, not darker"}</Note>
    </Plate>
  );
}

/* ---------------------------------------------- figure 4 — a local map only */

/**
 * Figure 4. The local key neighbourhood — and nothing beyond it. The record's
 * own instruction is to start with a usable local map rather than a torus, so
 * the boundary is left open on one side and the wider representation is absent.
 */
export function LocalNeighbourhood({ relations }: { relations: string[] }) {
  const cx = 258;
  const cy = 158;
  const around = [
    { a: -Math.PI / 2, r: 112 },
    { a: 0, r: 130 },
    { a: Math.PI / 2, r: 112 },
    { a: Math.PI, r: 130 },
  ];

  return (
    <Plate
      viewBox="0 0 520 320"
      title="A local key neighbourhood: one centre with four related regions — the fifth-related keys, the relative minor and the parallel minor. Drawn flat and deliberately incomplete; the wider four-dimensional representation is not drawn."
    >
      <Ball cx={cx} cy={cy} rx={62} ry={40} hue="violet" seed={8200} count={11} weight={1.5} opacity={0.34} drift={0.3} />
      <Halo cx={cx} cy={cy} rx={62} ry={40} hue="violet" seed={8250} laps={3} weight={1.7} opacity={0.6} />
      <Term x={cx} y={cy + 5} size={15} hue="charcoal" weight={560}>C major</Term>

      {around.map((p, i) => {
        const px = cx + Math.cos(p.a) * p.r;
        const pz = cy + Math.sin(p.a) * p.r * 0.7;
        return (
          <g key={i}>
            <Link x1={cx + Math.cos(p.a) * 64} y1={cy + Math.sin(p.a) * 44}
              x2={px - Math.cos(p.a) * 46} y2={pz - Math.sin(p.a) * 28}
              hue="graphite" bend={0.16} seed={8300 + i} weight={1.2} opacity={0.38} />
            <Ball cx={px} cy={pz} rx={48} ry={24} hue="violet" seed={8400 + i * 71} count={6} weight={1.3} opacity={0.2} drift={0.34} />
            <Halo cx={px} cy={pz} rx={48} ry={24} hue="violet" seed={8450 + i * 31} laps={2} weight={1.3} opacity={0.4} />
            <foreignObject x={px - 52} y={pz - 13} width={104} height={30}>
              <p style={{ margin: 0, textAlign: "center", font: "10.5px/1.25 var(--sf-instrument), system-ui, sans-serif", color: "var(--ink-2)" }}>
                {relations[i] ?? ""}
              </p>
            </foreignObject>
          </g>
        );
      })}

      <Contour
        points={[[46, 150], [110, 44], [258, 22], [408, 52], [470, 152], [430, 262], [258, 292], [104, 268]]}
        hue="graphite" seed={8500} weight={1.3} opacity={0.32} dash="9 9" wobble={4} />
      <Note x={470} y={306} hue="graphite" size={17} anchor="end">{"the map stops here"}</Note>
    </Plate>
  );
}
