"use client";

/* ---------------------------------------------------------------------------
   THE WHOLE AND THE PART

   The quiet centre of the argument, and deliberately silent — no player, no
   sound. One event, MIDI 65, sits in the middle of a rising line. The reader
   moves the boundary around it. The event itself never moves, never changes
   pitch, never changes duration: only the group it is read into changes, and
   with it what the event is doing.

   That is the whole claim, and it survives being shown rather than asserted.
   ------------------------------------------------------------------------- */

import { useState } from "react";
import { EventMark, INK, Scumble, handLine, pigment, rng } from "./marks";

export type WholeCase = {
  label: string;
  before: string;
  central: string;
  after: string;
  role: string;
  colour: string;
};

const PITCHES = [60, 62, 64, 65, 67, 69];
const CENTRAL = 3;

/** Boundary position per organisation, read off the record's own notation:
    "60 · 62 · 64 [65] — 67 · 69" breaks after the central event;
    "60 · 62 — 64 [65] · 67 · 69" breaks before it. */
const BREAK_AFTER = [3, 1];

export function WholePart({ cases }: { cases: WholeCase[] }) {
  const [active, setActive] = useState(0);
  const current = cases[active];
  const colour = pigment(current.colour);

  const W = 920;
  const H = 320;
  const padL = 74;
  const padR = 74;
  const top = 46;
  const floor = 214;

  const x = (i: number) => padL + (i * (W - padL - padR)) / (PITCHES.length - 1);
  const y = (p: number) => floor - ((p - 60) / 9) * (floor - top);

  const brk = BREAK_AFTER[active];
  const other = BREAK_AFTER[active === 0 ? 1 : 0];

  const bracketPath = (from: number, to: number, gy: number, r: () => number) => {
    const x1 = x(from) - 30;
    const x2 = x(to) + 30;
    const h = 12;
    return (
      `${handLine(x1, gy + h, x1, gy, r, 0.5, 2)} ` +
      `${handLine(x1, gy, x2, gy, r, 0.9, 9)} ` +
      `${handLine(x2, gy, x2, gy + h, r, 0.5, 2)}`
    );
  };

  const rActive = rng(900 + active * 31);
  const rGhost = rng(950 + active * 17);

  return (
    <div>
      <p
        className="pf-hand-sm"
        style={{
          marginLeft: "48%",
          marginBottom: 2,
          color: INK.charcoal,
          opacity: 0.72,
          fontSize: 19,
        }}
      >
        this event does not change
      </p>

      <div
        style={{ position: "relative" }}
        className="pf-scroller"
        role="region"
        aria-label="Two possible organisations of the same sound field"
        tabIndex={0}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          role="img"
          aria-label={`Six rising events. ${current.label}: ${current.before} [${current.central}] ${current.after}. ${current.role}.`}
          style={{ display: "block", overflow: "visible" }}
        >
          {/* the contour the events lie on — a ghost construction, drawn first */}
          <path
            d={PITCHES.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p)}`).join(" ")}
            stroke={INK.ghost}
            strokeWidth={1}
            strokeOpacity={0.5}
            fill="none"
            strokeDasharray="4 5"
          />

          {/* the ghosted alternative reading, still visible: the other whole */}
          <g opacity={0.24}>
            <path
              d={`${bracketPath(0, other, 292, rGhost)} ${bracketPath(other + 1, PITCHES.length - 1, 292, rGhost)}`}
              stroke={INK.graphite}
              strokeWidth={1.3}
              strokeDasharray="5 4"
              strokeLinecap="round"
              fill="none"
            />
            <text
              x={W - padR + 26}
              y={297}
              fontFamily="'IBM Plex Mono', monospace"
              fontSize={9.5}
              letterSpacing="0.12em"
              fill={INK.graphite}
            >
              {cases[active === 0 ? 1 : 0].label.replace("ORGANISATION ", "")}
            </text>
          </g>

          {/* the active reading */}
          <path
            d={`${bracketPath(0, brk, 252, rActive)} ${bracketPath(brk + 1, PITCHES.length - 1, 252, rActive)}`}
            stroke={colour}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <text
            x={W - padR + 26}
            y={257}
            fontFamily="'IBM Plex Mono', monospace"
            fontSize={9.5}
            letterSpacing="0.12em"
            fill={colour}
          >
            {current.label.replace("ORGANISATION ", "")}
          </text>

          {/* the plumb line through the event that never moves */}
          <path
            d={handLine(x(CENTRAL), y(PITCHES[CENTRAL]) - 46, x(CENTRAL), 306, rng(977), 0.7, 8)}
            stroke={INK.charcoal}
            strokeWidth={0.9}
            strokeOpacity={0.3}
            fill="none"
          />

          {/* the events */}
          {PITCHES.map((p, i) => {
            const isCentral = i === CENTRAL;
            const size = isCentral ? 54 : 24;
            const inFirstGroup = i <= brk;
            const c = isCentral ? INK.graphite : inFirstGroup ? colour : "#9a9a93";
            return (
              <g key={i} transform={`translate(${x(i)} ${y(p)})`}>
                {isCentral ? (
                  <g transform="translate(-46 -46)">
                    <Scumble width={92} height={92} colour={colour} seed={601 + active} opacity={0.3} loops={22} />
                  </g>
                ) : null}
                <g transform={`translate(${-size / 2} ${-size / 2})`}>
                  <EventMark size={size} colour={c} seed={640 + i * 5} filled />
                </g>
                <text
                  x={0}
                  y={isCentral ? 48 : 30}
                  textAnchor="middle"
                  fontFamily="'IBM Plex Mono', monospace"
                  fontSize={isCentral ? 12 : 10}
                  fontWeight={isCentral ? 500 : 400}
                  letterSpacing="0.06em"
                  fill={isCentral ? INK.charcoal : "#a9a9a2"}
                >
                  {p}
                </text>
              </g>
            );
          })}
        </svg>

      </div>

      {/* ---- the two readings ------------------------------------------------ */}
      <div className="pf-whole-controls">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {cases.map((c, i) => {
            const on = i === active;
            const cc = pigment(c.colour);
            return (
              <button
                key={c.label}
                type="button"
                className="pf-key"
                onClick={() => setActive(i)}
                aria-pressed={on}
                style={{ display: "block" }}
              >
                <span
                  className="pf-meta"
                  style={{ color: on ? cc : "#62625b", display: "block", marginBottom: 5 }}
                >
                  {c.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 14,
                    letterSpacing: "0.02em",
                    color: on ? INK.charcoal : "#62625b",
                    transition: "color 160ms",
                  }}
                >
                  {c.before}{" "}
                  <span
                    style={{
                      color: on ? cc : "#62625b",
                      fontWeight: 600,
                      borderBottom: on ? `2px solid ${cc}` : "2px solid transparent",
                    }}
                  >
                    [{c.central}]
                  </span>{" "}
                  {c.after}
                </span>
              </button>
            );
          })}
        </div>

        <p
          className="pf-display"
          style={{
            fontSize: "clamp(21px, 2.5vw, 33px)",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.18,
            color: INK.charcoal,
            letterSpacing: "-0.018em",
          }}
        >
          {current.role}
          <span style={{ color: colour }}>.</span>
        </p>
      </div>

      <style>{`
        .pf-whole-controls {
          display: grid;
          grid-template-columns: 300px minmax(0, 1fr);
          gap: clamp(26px, 4vw, 64px);
          align-items: center;
          margin-top: 42px;
        }
        @media (max-width: 820px) {
          .pf-whole-controls { grid-template-columns: minmax(0, 1fr); gap: 26px; }
        }
      `}</style>
    </div>
  );
}
