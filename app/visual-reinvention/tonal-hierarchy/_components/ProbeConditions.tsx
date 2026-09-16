"use client";

/**
 * One physical pitch, four tonal contexts.
 *
 * The invariant here really is mechanically invariant: the probe is a single
 * definition in the shared defs, placed with <use>, at the identical position
 * in every plate. Nothing about it is redrawn per condition. If it moved or
 * wavered between conditions the comparison would be a lie.
 *
 * What changes is the field around it. That is the whole argument, and it is
 * the one thing drawing can do that prose cannot: the same graphite against a
 * different surround is visibly a different thing while being demonstrably the
 * same mark.
 *
 * No profile value is shown anywhere, and no rating the reader gives is data.
 */

import { useState } from "react";
import { MultiPass, PigmentField } from "../../_components/Marks";

const W = 260;
const H = 190;
const PROBE_X = 130;
const PROBE_Y = 96;

type Ctx = {
  key: string;
  context: string;
  role: string;
  colour: string;
  angles: number[];
  seed: number;
  gap: number;
  broken: number;
  pressure: [number, number];
  read: string;
};

/**
 * Four contexts in which the same C4 has a different tonal function. These are
 * music-theoretic relations, not empirical results: C is the tonic of C major,
 * the fifth of the F major tonic triad, the fourth degree of G major, and
 * outside the diatonic collection of B major.
 */
const CONTEXTS: Ctx[] = [
  {
    key: "c",
    context: "C major",
    role: "tonic",
    colour: "var(--vr-cobalt)",
    angles: [22, 10],
    seed: 11,
    gap: 4.4,
    broken: 0.18,
    pressure: [0.26, 0.7],
    read: "The probe is the tonal centre of the context that precedes it.",
  },
  {
    key: "f",
    context: "F major",
    role: "member of the tonic triad",
    colour: "var(--vr-violet)",
    angles: [-16, -4],
    seed: 29,
    gap: 5.0,
    broken: 0.26,
    pressure: [0.22, 0.6],
    read: "The same pitch now belongs to the tonic triad without being the centre.",
  },
  {
    key: "g",
    context: "G major",
    role: "other diatonic tone",
    colour: "var(--vr-emerald)",
    angles: [34, 20],
    seed: 47,
    gap: 6.2,
    broken: 0.38,
    pressure: [0.17, 0.46],
    read: "Still inside the collection, but no longer part of the tonic triad.",
  },
  {
    key: "b",
    context: "B major",
    role: "outside the collection",
    colour: "var(--vr-ochre-mark)",
    angles: [-38, -26],
    seed: 71,
    gap: 8.6,
    broken: 0.6,
    pressure: [0.13, 0.34],
    read: "The same pitch is now outside the diatonic collection of the context.",
  },
];

function Plate({ c }: { c: Ctx }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`The same probe mark, in the identical position, inside a drawn field standing for a ${c.context} context, in which the pitch functions as ${c.role}.`}
    >
      <PigmentField
        id={`probe-${c.key}`}
        x={16}
        y={26}
        w={W - 32}
        h={H - 76}
        colour={c.colour}
        angles={c.angles}
        gap={c.gap}
        seed={c.seed}
        broken={c.broken}
        soft={0.34}
        pressure={c.pressure}
      />
      {/* The held mark. One definition, placed — never re-drawn. */}
      <g style={{ color: "var(--vr-graphite)" }}>
        <use href="#vr-probe" x={PROBE_X} y={PROBE_Y} />
      </g>
      <MultiPass
        d={`M ${PROBE_X} ${PROBE_Y + 14} L ${PROBE_X} ${PROBE_Y + 30}`}
        colour="var(--vr-ink-faint)"
        width={0.9}
        count={1}
        seed={5}
      />
      <text
        x={PROBE_X}
        y={PROBE_Y + 44}
        textAnchor="middle"
        fontFamily="var(--vr-mono)"
        fontSize={11}
        fill="var(--vr-ink-faint)"
      >
        C4
      </text>
    </svg>
  );
}

export function ProbeConditions() {
  const [ratings, setRatings] = useState<Record<string, number | null>>({});
  const given = Object.values(ratings).filter((v) => v != null).length;

  return (
    <div>
      <div className="vr-conditions" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))" }}>
        {CONTEXTS.map((c) => (
          <div className="vr-condition" key={c.key}>
            <div className="vr-condition__label">
              <span className="vr-label">{c.context}</span>
            </div>
            <div className="vr-condition__plate">
              <Plate c={c} />
            </div>
            <p className="vr-condition__read">
              <b style={{ color: "var(--vr-ink)" }}>{c.role}</b> — {c.read}
            </p>

            <fieldset className="vr-controls" style={{ marginTop: "0.5rem" }}>
              <legend className="vr-label vr-controls__legend" style={{ fontSize: "0.58rem" }}>
                Your own fit judgment · optional
              </legend>
              <div
                className="vr-switch"
                role="radiogroup"
                aria-label={`How well the probe fits the ${c.context} context, 1 to 7. Optional, and not recorded.`}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={ratings[c.key] === n}
                    onClick={() => setRatings((r) => ({ ...r, [c.key]: r[c.key] === n ? null : n }))}
                    style={{ padding: "0.2rem 0.42rem", fontSize: "0.7rem" }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        ))}
      </div>

      <p className="vr-declare vr-declare--constructed" style={{ maxWidth: "44rem" }}>
        <strong>▲ What your ratings are, and are not. </strong>
        {given === 0
          ? "You can give each context a fit judgment from 1 to 7. Anything you enter stays in this page and is not stored, sent, scored or compared with anyone."
          : `You have judged ${given} of the four contexts. Those numbers are yours. `}
        They are learner-generated teaching data. They are not a published probe-tone profile, not a replication, not a
        measure of your musical ability, and not a diagnosis. This is the logic of the method — context, probe,
        judgment, repeat — not the method’s result.
      </p>
    </div>
  );
}
