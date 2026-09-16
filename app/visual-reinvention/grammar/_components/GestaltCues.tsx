"use client";

/**
 * Gestalt cue conditions.
 *
 * The held mark is the event glyph — one definition, placed with <use>, so
 * every event in every condition is mechanically the same mark. What changes
 * is the arrangement, because in this record the arrangement *is* the
 * variable: the frozen interaction holds the note sequence, duration, timbre
 * and gain constant and changes temporal spacing, register, or both.
 *
 * A candidate organisation is drawn as an accumulated field. Where two
 * organisations disagree, both fields are drawn at full presence and cross —
 * neither is reduced, because neither is prior and the record states that no
 * cue has universal priority.
 */

import { useState } from "react";
import { MultiPass, PigmentField } from "../../_components/Marks";

const W = 640;
const H = 168;
const BASE = 84;

type Ev = { x: number; y: number };

/** Time-favoured: even events with one larger gap after the third. */
const TIME: Ev[] = [70, 124, 178, 272, 326, 380, 434].map((x) => ({ x, y: BASE }));

/** Register-favoured: even spacing, register steps up after the third. */
const REGISTER: Ev[] = [70, 131, 192, 253, 314, 375, 436].map((x, i) => ({
  x,
  y: i < 3 ? BASE + 22 : BASE - 22,
}));

/** Conflict: the gap proposes a boundary after the third event, the register
 *  step proposes one after the fourth. The two cues disagree. */
const CONFLICT: Ev[] = [70, 124, 178, 272, 326, 380, 434].map((x, i) => ({
  x,
  y: i < 4 ? BASE + 22 : BASE - 22,
}));

function Events({ evs }: { evs: Ev[] }) {
  return (
    <g style={{ color: "var(--vr-graphite)" }}>
      {evs.map((e, i) => (
        <use key={i} href="#vr-event" x={e.x} y={e.y} />
      ))}
    </g>
  );
}

/** A candidate boundary. Never a closed line: the record says a boundary is a
 *  candidate, not an objectively correct segmentation. */
function CandidateBoundary({
  x,
  colour,
  seed,
  label,
  dy,
}: {
  x: number;
  colour: string;
  seed: number;
  label: string;
  dy?: number;
}) {
  return (
    <g>
      <path d={`M ${x} 32 L ${x} 130`} stroke="var(--vr-ground)" strokeWidth={7} strokeOpacity={0.9} fill="none" />
      <path
        d={`M ${x} 32 L ${x} 130`}
        stroke={colour}
        strokeWidth={2.4}
        strokeDasharray="5 6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${x + 0.9} 33 L ${x - 0.6} 129`}
        stroke={colour}
        strokeWidth={1.1}
        strokeDasharray="4 7"
        strokeOpacity={0.6}
        strokeLinecap="round"
        fill="none"
      />
      <text
        x={x}
        y={dy ?? 146}
        textAnchor="middle"
        fontFamily="var(--vr-sans)"
        fontSize={11}
        fill={colour}
      >
        {label}
      </text>
    </g>
  );
}

function Organisation({
  spans,
  colour,
  angle,
  seed,
  strength = 1,
  id,
}: {
  spans: [number, number][];
  colour: string;
  angle: number;
  seed: number;
  strength?: number;
  id: string;
}) {
  return (
    <g>
      {spans.map(([x0, x1], i) => (
        <PigmentField
          key={i}
          id={`${id}-${i}`}
          x={x0}
          y={36}
          w={x1 - x0}
          h={88}
          colour={colour}
          angles={[angle, angle - 34]}
          gap={4}
          seed={seed + i * 13}
          broken={0.34}
          soft={0.32}
          strength={strength}
          pressure={[0.13, 0.4]}
        />
      ))}
    </g>
  );
}

function Row({
  title,
  cue,
  reading,
  children,
}: {
  title: string;
  cue: string;
  reading: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div className="vr-condition__label">
        <span className="vr-label">{title}</span>
        <span className="vr-mono" style={{ color: "var(--vr-ink-faint)" }}>
          {cue}
        </span>
      </div>
      <div className="vr-condition__plate">{children}</div>
      <p className="vr-condition__read">{reading}</p>
    </div>
  );
}

export function GestaltCues() {
  const [show, setShow] = useState<"both" | "time" | "register">("both");

  const timeSpans: [number, number][] = [
    [54, 194],
    [256, 450],
  ];
  const registerSpansConflict: [number, number][] = [
    [54, 288],
    [310, 450],
  ];
  const registerSpansAligned: [number, number][] = [
    [54, 208],
    [237, 452],
  ];

  return (
    <div>
      <Row
        title="Time-favoured"
        cue="one larger temporal gap"
        reading="A single larger gap after the third event supports a boundary there. The seven events, their durations, timbre and gain are unchanged."
      >
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Seven identical event marks evenly spaced, with one larger gap after the third. One drawn field groups the first three events and a second groups the last four. A broken vertical line marks the candidate boundary in the gap.">
          <Organisation id="t" spans={timeSpans} colour="var(--vr-cobalt)" angle={24} seed={41} />
          <CandidateBoundary x={225} colour="var(--vr-cobalt)" seed={3} label="candidate boundary · time" />
          <Events evs={TIME} />
        </svg>
      </Row>

      <Row
        title="Register-favoured"
        cue="a register step, even spacing"
        reading="With spacing held even, a register step after the third event supports a boundary in the same place. Here the two cues would agree."
      >
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Seven identical event marks evenly spaced, the first three lower and the last four higher. A drawn field at a different angle groups the first three and another groups the last four. A broken vertical line marks the candidate boundary between the third and fourth event.">
          <Organisation id="r" spans={registerSpansAligned} colour="var(--vr-emerald)" angle={-28} seed={77} />
          <CandidateBoundary x={222} colour="var(--vr-emerald)" seed={4} label="candidate boundary · register" />
          <Events evs={REGISTER} />
        </svg>
      </Row>

      <Row
        title="Conflict"
        cue="gap after the third, register step after the fourth"
        reading="The two cues now propose different boundaries. Where their fields cross, two organisations are in play at once — the darker band is overlap, not strength, and the record states that no cue has universal priority."
      >
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Seven identical event marks. A larger gap falls after the third event while the register step falls after the fourth. Two drawn fields at opposing angles disagree about where the group ends and cross over the fourth event. Two broken vertical lines mark two competing candidate boundaries.">
          {show !== "register" ? (
            <Organisation id="c1" spans={timeSpans} colour="var(--vr-cobalt)" angle={24} seed={41} />
          ) : null}
          {show !== "time" ? (
            <Organisation id="c2" spans={registerSpansConflict} colour="var(--vr-emerald)" angle={-28} seed={77} />
          ) : null}
          {show !== "register" ? <CandidateBoundary x={225} colour="var(--vr-cobalt)" seed={3} label="time proposes here" dy={146} /> : null}
          {show !== "time" ? <CandidateBoundary x={299} colour="var(--vr-emerald)" seed={5} label="register proposes here" dy={158} /> : null}
          {show === "both" ? (
            <g>
              <MultiPass
                d="M 225 28 L 225 21 L 299 21 L 299 28"
                colour="var(--vr-graphite)"
                width={1.1}
                count={1}
                seed={17}
              />
              <text x={262} y={14} textAnchor="middle" fontFamily="var(--vr-sans)" fontSize={11} fill="var(--vr-ink-soft)">
                the two cues disagree across this span
              </text>
            </g>
          ) : null}
          <Events evs={CONFLICT} />
        </svg>
      </Row>

      <fieldset className="vr-controls">
        <legend className="vr-label vr-controls__legend">
          Separate the two organisations in the conflict condition
        </legend>
        <div className="vr-switch" role="radiogroup" aria-label="Which organisation to draw in the conflict condition">
          {(
            [
              ["both", "Both, as drawn"],
              ["time", "Temporal grouping only"],
              ["register", "Register grouping only"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={show === k}
              onClick={() => setShow(k)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="vr-condition__read" style={{ marginTop: "0.6rem" }}>
          {show === "both"
            ? "Both organisations are drawn. Neither is reduced, because neither is prior."
            : show === "time"
              ? "Only the temporal organisation is drawn. The register organisation has been hidden by this control; it has not been ruled out."
              : "Only the register organisation is drawn. The temporal organisation has been hidden by this control; it has not been ruled out."}
        </p>
      </fieldset>
    </div>
  );
}
