import type { GTTMSurfaceEvent } from "@/content/types";
import * as hand from "../../_folio/hand";
import { BAND, BAR4_ALTERNATIVE, BAR_HEADS, BOUNDARIES, HALF_HEADS, HIGHER, LOCAL, METER_ROWS, REGIONS, ROLL, WHOLE, WHOLE_HEAD, xOfEvent, yOfPitch, type Pt } from "./geometry";
import s from "./gttm.module.css";

/* ---------------------------------------------------------------------------
   The phrase, and what can be drawn around it. Every piece is a group of marks
   in the roll's own coordinates (720 × 380), so any of them can sit over the
   notes — or over one another — and keep to the same sixteen events.
   ------------------------------------------------------------------------- */

const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 5, wander = 1) => hand.line(x1, y1, x2, y2, { seed, wander, segments });
const evX = xOfEvent;

/** the sixteen events, as noteheads at their pitch; `ghost` marks the ones a reduction has set aside — still drawn, still there */
export function Notes({ events, included, now, heads = [] }: { events: GTTMSurfaceEvent[]; included?: number[]; now?: number; heads?: number[] }) {
  return (
    <g className={s.notesGroup}>
      {events.map((e) => {
        const x = evX(e.id), y = yOfPitch(e.pitch);
        const ghost = included ? !included.includes(e.id) : false;
        return (
          <g key={e.id} className={s.noteG} data-ghost={ghost || undefined} data-now={now === e.id || undefined} data-head={heads.includes(e.id) || undefined}>
            <ellipse className={s.noteFill} cx={x} cy={y} rx="13" ry="8.5" transform={`rotate(-14 ${x} ${y})`} />
            <path className={s.noteInk} d={hand.ring(x, y, 13, 8.5, { seed: 40 + e.id, wobble: 0.03, tilt: -0.24 })} filter="url(#folio-pencil)" />
          </g>
        );
      })}
    </g>
  );
}

/** a faint ruler for pitch: where C, G and B sit */
export function PitchGuide() {
  return (
    <g className={s.guide} aria-hidden="true">
      {[[60, "C4"], [67, "G4"], [71, "B4"]].map(([p, name], i) => (
        <g key={name}>
          <path d={L(ROLL.x0 - 34, yOfPitch(p as number), ROLL.x0 + (16 - 1) * ROLL.dx + 30, yOfPitch(p as number), 10 + i, 12, 0.6)} />
          <text x={ROLL.x0 - 40} y={yOfPitch(p as number) + 4} textAnchor="end">{name}</text>
        </g>
      ))}
    </g>
  );
}

const bracket = (a: number, b: number, y: number, seed: number) => {
  const x1 = evX(a) - 14, x2 = evX(b) + 14;
  return L(x1, y + 10, x1, y, seed, 2, 0.6) + L(x1, y, x2, y, seed + 1, 8, 0.9) + L(x2, y, x2, y + 10, seed + 2, 2, 0.6);
};

/** grouping: nested brackets above the notes, and the boundaries between groups */
export function GroupingOverlay() {
  return (
    <g className={s.grouping}>
      {BOUNDARIES.slice(0, 3).map((b, i) => <path key={b} className={s.boundary} d={L(evX(b) + ROLL.dx / 2, BAND.local + 16, evX(b) + ROLL.dx / 2, ROLL.yLo + 22, 60 + i, 8, 0.8)} />)}
      <path className={s.bracket} data-level="1" d={LOCAL.map(([a, b], i) => bracket(a, b, BAND.local, 100 + i * 4)).join(" ")} filter="url(#folio-pencil)" />
      <path className={s.bracket} data-level="2" d={HIGHER.map(([a, b], i) => bracket(a, b, BAND.higher, 140 + i * 4)).join(" ")} filter="url(#folio-pencil)" />
      <path className={s.bracket} data-level="3" d={bracket(WHOLE[0], WHOLE[1], BAND.whole, 180)} filter="url(#folio-pencil)" />
    </g>
  );
}

/** meter: rows of dots below the notes; the stronger the position, the more rows it reaches */
export function MeterOverlay() {
  return (
    <g className={s.meter}>
      {METER_ROWS.map((row, r) => (
        <g key={r} data-row={r}>
          {row.map((id) => <circle key={id} className={s.beat} cx={evX(id)} cy={BAND.meter[r]} r={3.4 + r * 1.3} />)}
        </g>
      ))}
      {METER_ROWS[3].map((id, i) => <path key={id} className={s.beatStem} d={L(evX(id), BAND.meter[0], evX(id), BAND.meter[3], 220 + i, 4, 0.5)} />)}
      {[1, 5, 9, 13].map((id, i) => <path key={id} className={s.beatStem} data-weak d={L(evX(id), BAND.meter[0], evX(id), BAND.meter[2], 230 + i, 3, 0.5)} />)}
    </g>
  );
}

/**
 * time-span reduction, in three stages: the spans; the head each span is drawn
 * with; and the alternative the record keeps open — event 13 as well as 16 for
 * the last bar. Levels: bar, half, whole.
 */
export function SpanOverlay({ stage = 3, events }: { stage?: 1 | 2 | 3; events: GTTMSurfaceEvent[] }) {
  const noteTop = (id: number) => yOfPitch(events[id - 1].pitch) - 13;
  const stem = (id: number, y: number, seed: number, dashed = false) => <path key={`${id}-${y}`} className={s.stem} data-dashed={dashed || undefined} d={L(evX(id), noteTop(id), evX(id), y, seed, 5, 0.6)} />;
  return (
    <g className={s.spanGroup} data-stage={stage}>
      <g className={s.spanLines}>
        <path d={LOCAL.map(([a, b], i) => bracket(a, b, BAND.local, 300 + i * 4)).join(" ")} filter="url(#folio-pencil)" />
        <path d={HIGHER.map(([a, b], i) => bracket(a, b, BAND.higher, 340 + i * 4)).join(" ")} filter="url(#folio-pencil)" />
        <path d={bracket(WHOLE[0], WHOLE[1], BAND.whole, 380)} filter="url(#folio-pencil)" />
      </g>
      <g className={s.heads} data-on={stage >= 2 || undefined}>
        {BAR_HEADS.map((id, i) => stem(id, BAND.local, 400 + i))}
        {HALF_HEADS.map((id, i) => <path key={id} className={s.stem} data-level="2" d={L(evX(id), BAND.local, evX(id), BAND.higher, 420 + i, 3, 0.5)} />)}
        <path className={s.stem} data-level="3" d={L(evX(WHOLE_HEAD), BAND.higher, evX(WHOLE_HEAD), BAND.whole, 430, 3, 0.5)} />
        {[...BAR_HEADS, ...HALF_HEADS.filter((h) => !BAR_HEADS.includes(h))].map((id, i) => <path key={id} className={s.headRing} d={hand.ring(evX(id), yOfPitch(events[id - 1].pitch), 19, 14, { seed: 440 + i, wobble: 0.03 })} filter="url(#folio-pencil)" />)}
      </g>
      <g className={s.alternative} data-on={stage >= 3 || undefined}>
        {stem(BAR4_ALTERNATIVE, BAND.local, 450, true)}
        <path className={s.headRing} data-dashed d={hand.ring(evX(BAR4_ALTERNATIVE), yOfPitch(events[BAR4_ALTERNATIVE - 1].pitch), 19, 14, { seed: 460, wobble: 0.03 })} filter="url(#folio-pencil)" />
      </g>
    </g>
  );
}

/** prolongation: the four tonal regions, the local elaboration of the first, and the progression that links their heads */
export function RelationOverlay({ events }: { events: GTTMSurfaceEvent[] }) {
  const arc = (a: number, b: number, lift: number, seed: number) => {
    const x1 = evX(a), x2 = evX(b), y = BAND.arcs + 34;
    return hand.curve([[x1, y], [(x1 + x2) / 2, y - lift], [x2, y]], { seed, wander: 0.4 });
  };
  return (
    <g className={s.relation}>
      {REGIONS.map((r, i) => (
        <g key={i}>
          <path className={s.region} d={L(evX(r.from) - 14, BAND.local + 6, evX(r.to) + 14, BAND.local + 6, 500 + i, 6, 0.6)} />
          <text className={s.regionWord} x={(evX(r.from) + evX(r.to)) / 2} y={BAND.local - 6} textAnchor="middle" aria-hidden="true">{r.label}</text>
          <path className={s.headTick} d={L(evX(r.head), yOfPitch(events[r.head - 1].pitch) - 13, evX(r.head), BAND.local + 8, 520 + i, 4, 0.5)} />
        </g>
      ))}
      {/* the local elaboration of the first region: event 1 anchors, event 4 closes */}
      <path className={s.elaboration} d={hand.curve([[evX(1), BAND.local + 34], [(evX(1) + evX(4)) / 2, BAND.local + 46], [evX(4), BAND.local + 34]], { seed: 540, wander: 0.4 })} filter="url(#folio-pencil)" />
      {/* the progression: I → IV → V → I, from head to head */}
      {[[1, 5], [5, 9], [9, 16]].map(([a, b], i) => (
        <g key={i}>
          <path className={s.progression} d={arc(a, b, 26 + i * 4, 550 + i)} filter="url(#folio-pencil)" />
          <path className={s.progression} d={hand.arrowHead(evX(b), BAND.arcs + 34, Math.PI / 2 + 0.25, { size: 9, seed: 560 + i })} filter="url(#folio-pencil)" />
        </g>
      ))}
    </g>
  );
}

const ROLL_SHORT = 292;

/** the drawing's frame: notes, a pitch guide, and whatever is laid over them */
export function Roll({ label, children, className, short }: { label: string; children: React.ReactNode; className?: string; short?: boolean }) {
  // `short` crops the room kept below the notes for the meter rows, for figures that never draw them
  return (
    <svg className={[s.roll, className].filter(Boolean).join(" ")} viewBox={`0 0 ${ROLL.w} ${short ? ROLL_SHORT : ROLL.h}`} role="img" aria-label={label}>
      <PitchGuide />
      {children}
    </svg>
  );
}

export type { Pt };
