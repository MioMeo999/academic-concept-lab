import type { CSSProperties } from "react";
import type { AudioEvent } from "@/content/types";
import * as hand from "../../_folio/hand";
import { PLANE, bands, centre, xOf, yOf, type Axis, type Pt } from "./geometry";
import s from "./asa.module.css";

const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 6, wander = 1.1) => hand.line(x1, y1, x2, y2, { seed, wander, segments });

/** the two axes of the plane, drawn once, with a tick for each second and each fifth */
export function Frame({ axis, seed = 1 }: { axis: Axis; seed?: number }) {
  const secs = Array.from({ length: Math.floor(axis.tMax) + 1 }, (_, i) => i);
  return (
    <>
      <g className={s.frame} filter="url(#folio-graphite)">
        <path d={L(PLANE.x0, PLANE.y0 - 6, PLANE.x0, PLANE.y1 + 6, seed, 8, 0.8)} />
        <path d={L(PLANE.x0 - 6, PLANE.y1 + 4, PLANE.x1 + 4, PLANE.y1 + 4, seed + 1, 12, 0.8)} />
        {secs.map((t) => <path key={t} className={s.tick} d={L(xOf(t, axis), PLANE.y1 + 4, xOf(t, axis), PLANE.y1 + 12, seed + 10 + t, 2, 0.3)} />)}
      </g>
      <text className={s.axisWord} x={PLANE.x1} y={PLANE.y1 + 38} textAnchor="end" aria-hidden="true">time →</text>
      <text className={s.axisWord} x={PLANE.x0 + 12} y={PLANE.y0 - 8} textAnchor="start" aria-hidden="true">pitch ↑</text>
    </>
  );
}

/** a tone event: a short, pressed dash at its pitch and moment, with a lighter second pass beside it */
export function Dash({ e, axis, band, seed, now }: { e: AudioEvent; axis: Axis; band?: "lo" | "hi" | "mid"; seed: number; now?: boolean }) {
  const x = xOf(e.start, axis), x2 = Math.max(xOf(e.start + e.duration, axis), x + 7), y = yOf(e.pitch, axis);
  return (
    <g className={s.dashGroup} data-band={band} data-now={now || undefined}>
      <path className={s.dashUnder} d={L(x + 1, y + 1.6, x2 - 1, y + 1.2, seed + 500, 3, 0.9)} />
      <path className={s.dash} d={L(x, y, x2, y, seed, 3, 0.7)} />
    </g>
  );
}

/**
 * The events of a repeating sequence on the plane, with two ways a listener
 * might draw them: one contour through all of them, or a contour through the
 * low events and another through the high events. Both stay on the page; the
 * chosen one is drawn heavy, the other faint and dashed.
 */
export function StreamPlane({
  events,
  axis,
  mode,
  at,
  label,
  className,
}: {
  events: AudioEvent[];
  axis: Axis;
  mode: "one" | "two" | null;
  at?: number;
  label: string;
  className?: string;
}) {
  const { low, high, mid } = bands(events);
  const bandOf = (e: AudioEvent) => (e.pitch > mid ? "hi" : "lo");
  const one = events.map((e) => centre(e, axis));
  const path = (pts: Pt[], seed: number) => pts.slice(1).map((p, i) => L(pts[i][0], pts[i][1], p[0], p[1], seed + i, 3, 0.8)).join(" ");
  return (
    <svg className={[s.planeSvg, className].filter(Boolean).join(" ")} viewBox={`0 0 ${PLANE.w} ${PLANE.h}`} role="img" aria-label={label} data-mode={mode ?? undefined}>
      <Frame axis={axis} />
      <path className={s.contourOne} data-emph={mode === "one" || undefined} d={path(one, 100)} filter="url(#folio-pencil)" />
      <path className={s.contourTwo} data-emph={mode === "two" || undefined} d={path(low.map((e) => centre(e, axis)), 200) + " " + path(high.map((e) => centre(e, axis)), 300)} filter="url(#folio-pencil)" />
      {events.map((e, i) => <Dash key={i} e={e} axis={axis} band={bandOf(e)} seed={400 + i} now={at !== undefined && at >= e.start && at <= e.start + e.duration} />)}
      {at !== undefined && at > 0 && <path className={s.playhead} d={L(xOf(at, axis), PLANE.y0 - 8, xOf(at, axis), PLANE.y1 + 8, 900, 4, 0.3)} />}
    </svg>
  );
}

/** the pitch of a horizontal reference, drawn faint: where a note of that pitch would sit */
export function Guide({ p, axis, seed }: { p: number; axis: Axis; seed: number }) {
  return <path className={s.guide} style={{ opacity: 0.4 } as CSSProperties} d={L(PLANE.x0, yOf(p, axis), PLANE.x1, yOf(p, axis), seed, 10, 0.6)} />;
}
