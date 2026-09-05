/* ---------------------------------------------------------------------------
   THE FIELD PLOT

   One drawing does most of the teaching on this page. Eight sound events are
   placed on two real axes — time across, pitch up — so that the two cues the
   record talks about are not described but seen: a temporal gap opens as
   horizontal space, a register break rises as vertical distance.

   Nothing here is a stave. A stave would import notation's own rules about
   what counts as a group, which is exactly the thing under discussion.

   Groups are drawn as brackets underneath. A bracket is a claim: these events
   belong together. The page hands that claim to the reader rather than
   printing it as fact.
   ------------------------------------------------------------------------- */

import type { ReactNode } from "react";
import { EventMark, INK, handLine, rng } from "./marks";

export type PlotEvent = { pitch: number; start: number; duration: number };

export type PlotGroup = {
  from: number;
  to: number;
  colour: string;
  label?: string;
  row?: number;
  dashed?: boolean;
  faded?: boolean;
};

/** A horizontal reference at one pitch. Used where the plot shares an axis
    across conditions: it names the empty register instead of leaving the
    reader to read blank space as a layout mistake. */
export type PlotGuide = {
  pitch: number;
  label: string;
  colour?: string;
};

export type PlotBoundary = {
  after: number;
  label: string;
  colour: string;
  faded?: boolean;
};

type Props = {
  events: PlotEvent[];
  width?: number;
  height?: number;
  groups?: PlotGroup[];
  boundaries?: PlotBoundary[];
  guides?: PlotGuide[];
  lit?: number | null;
  played?: number[];
  colour?: string;
  eventColours?: string[];
  seed?: number;
  showIndices?: boolean;
  pitchRange?: [number, number];
  compact?: boolean;
  axisNote?: string;
  className?: string;
};

const n2 = (v: number) => Math.round(v * 100) / 100;

export function FieldPlot({
  events,
  width = 900,
  height = 250,
  groups = [],
  boundaries = [],
  guides = [],
  lit = null,
  played = [],
  colour = INK.graphite,
  eventColours,
  seed = 41,
  showIndices = true,
  pitchRange,
  compact = false,
  axisNote,
  className,
}: Props) {
  const r = rng(seed);

  const padL = compact ? 12 : 26;
  const padR = compact ? 12 : 26;
  const padT = compact ? 10 : axisNote ? 42 : 22;
  const bracketRows = Math.max(0, ...groups.map((g) => (g.row ?? 0) + 1));
  const padB = compact ? 14 + bracketRows * 16 : 34 + bracketRows * 30;

  const dot = compact ? 14 : 31;

  const tEnd = Math.max(...events.map((e) => e.start + e.duration));
  const tSpan = tEnd || 1;

  const pitches = events.map((e) => e.pitch);
  const [pLo, pHi] = pitchRange ?? [Math.min(...pitches), Math.max(...pitches)];
  const pSpan = Math.max(1, pHi - pLo);

  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const x = (e: PlotEvent) => padL + (e.start / tSpan) * plotW;
  const y = (e: PlotEvent) => padT + plotH - ((e.pitch - pLo) / pSpan) * plotH;

  const baseline = padT + plotH + (compact ? 8 : 16);

  const layers: ReactNode[] = [];

  /* --- ghost construction: the horizontal the events sit against ---------- */
  if (!compact) {
    layers.push(
      <path
        key="ground"
        d={handLine(padL - 8, baseline, width - padR + 8, baseline, rng(seed + 91), 0.5, 10)}
        stroke={INK.ghost}
        strokeWidth={1}
        strokeOpacity={0.6}
        fill="none"
        strokeLinecap="round"
      />,
    );
  }

  /* --- pitch guides -------------------------------------------------------- */
  guides.forEach((gu, i) => {
    if (compact) return;
    const gy = padT + plotH - ((gu.pitch - pLo) / pSpan) * plotH;
    const c = gu.colour ?? "#c9c9c2";
    layers.push(
      <g key={`gu${i}`}>
        <path
          d={handLine(padL - 6, gy, width - padR + 6, gy, rng(seed + 700 + i), 0.6, 9)}
          stroke={c}
          strokeWidth={0.9}
          strokeDasharray="2 6"
          strokeOpacity={0.85}
          fill="none"
          strokeLinecap="round"
        />
        <text
          x={n2(padL - 6)}
          y={n2(gy - 7)}
          fontFamily="'IBM Plex Mono', monospace"
          fontSize={9}
          letterSpacing="0.12em"
          fill={c}
        >
          {gu.label.toUpperCase()}
        </text>
      </g>,
    );
  });

  /* --- boundary drop lines ----------------------------------------------- */
  boundaries.forEach((b, i) => {
    const before = events[b.after - 1];
    const after = events[b.after];
    if (!before || !after) return;
    const bx = (x(before) + x(after)) / 2;
    const rr = rng(seed + 200 + i);
    layers.push(
      <g key={`b${i}`} opacity={b.faded ? 0.24 : 1}>
        <path
          d={handLine(bx, padT - 2, bx, baseline + (compact ? 4 : 10), rr, 1.1, 7)}
          stroke={b.colour}
          strokeWidth={compact ? 1.1 : 1.7}
          strokeDasharray={compact ? "3 3" : "6 5"}
          strokeOpacity={0.9}
          fill="none"
          strokeLinecap="round"
        />
        {!compact ? (
          <text
            x={n2(bx)}
            y={n2(padT - 8)}
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace"
            fontSize={11}
            fontWeight={500}
            letterSpacing="0.08em"
            fill={b.colour}
          >
            {b.label}
          </text>
        ) : null}
      </g>,
    );
  });

  /* --- the events --------------------------------------------------------- */
  events.forEach((e, i) => {
    const ex = x(e);
    const ey = y(e);
    const isLit = lit === i;
    const wasPlayed = played.includes(i);
    const ec = eventColours?.[i] ?? colour;

    layers.push(
      <g key={`e${i}`} transform={`translate(${n2(ex)} ${n2(ey)})`}>
        {/* the connective trace to the ground line: register made visible */}
        {!compact ? (
          <path
            d={handLine(0, dot / 2, 0, baseline - ey, rng(seed + 300 + i), 0.5, 4)}
            stroke={INK.ghost}
            strokeWidth={0.75}
            strokeOpacity={isLit ? 0.6 : 0.24}
            fill="none"
          />
        ) : null}
        <g
          transform={`translate(${-dot / 2} ${-dot / 2}) ${isLit ? `translate(${dot / 2} ${dot / 2}) scale(1.22) translate(${-dot / 2} ${-dot / 2})` : ""}`}
          style={{ transition: "transform 200ms cubic-bezier(.22,.9,.3,1)" }}
        >
          <EventMark
            size={dot}
            colour={ec}
            seed={seed + i * 7 + 1}
            filled
            dim={!isLit && !wasPlayed && lit !== null}
          />
        </g>
        {isLit ? (
          <circle r={dot * 0.86} fill="none" stroke={ec} strokeWidth={1.1} strokeOpacity={0.5} />
        ) : null}
        {showIndices && !compact ? (
          <text
            x={0}
            y={baseline - ey + 17}
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace"
            fontSize={10}
            letterSpacing="0.05em"
            fill={isLit ? ec : INK.ghost}
          >
            {String(i + 1).padStart(2, "0")}
          </text>
        ) : null}
      </g>,
    );
  });

  /* --- grouping brackets --------------------------------------------------- */
  groups.forEach((g, i) => {
    const a = events[g.from];
    const b = events[g.to];
    if (!a || !b) return;
    const gx1 = x(a) - dot * 0.72;
    const gx2 = x(b) + dot * 0.72;
    const row = g.row ?? 0;
    const gy = baseline + (compact ? 8 : 26) + row * (compact ? 16 : 30);
    const bh = compact ? 6 : 11;
    const rr = rng(seed + 500 + i * 13);
    layers.push(
      <g key={`g${i}`} opacity={g.faded ? 0.28 : 1}>
        <path
          d={
            `${handLine(gx1, gy + bh, gx1, gy, rr, 0.5, 2)} ` +
            `${handLine(gx1, gy, gx2, gy, rr, 0.8, 8)} ` +
            `${handLine(gx2, gy, gx2, gy + bh, rr, 0.5, 2)}`
          }
          stroke={g.colour}
          strokeWidth={compact ? 1.3 : 2.2}
          strokeDasharray={g.dashed ? "5 4" : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {g.label && !compact ? (
          <text
            x={n2((gx1 + gx2) / 2)}
            y={n2(gy - 7)}
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace"
            fontSize={10}
            letterSpacing="0.13em"
            fill={g.colour}
          >
            {g.label}
          </text>
        ) : null}
      </g>,
    );
  });

  if (axisNote && !compact) {
    layers.push(
      <text
        key="axisnote"
        x={padL - 8}
        y={12}
        fontFamily="'IBM Plex Mono', monospace"
        fontSize={9.5}
        letterSpacing="0.13em"
        fill="#b0b0a9"
      >
        {axisNote.toUpperCase()}
      </text>,
    );
  }

  void r;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      role="img"
      aria-label={`${events.length} sound events plotted by onset time and pitch${
        groups.length ? `, with ${groups.length} grouping brackets drawn beneath` : ""
      }`}
      style={{ display: "block", overflow: "visible" }}
    >
      {layers}
    </svg>
  );
}
