import type { ReactNode } from "react";
import type { NarmourRelationStatus } from "@/content/types";
import * as hand from "../../_folio/hand";
import { FIELD, RELATION_KEYS, lean, noteName, xOfTime, xOfTone, yOfPitch, type Pt, type RelationKey, type SizeClass } from "./geometry";
import s from "./narmour.module.css";

/* ---------------------------------------------------------------------------
   The pitch × time field, and what can be drawn on it.

   Every piece is a group of marks in the field's own coordinates (640 × 360),
   so the tones, the leans and the verdicts can be laid over one another and
   keep to the same three tones. The words that matter are in the panels beside
   the drawing; the words inside it are only labels for what it points at.
   ------------------------------------------------------------------------- */

const L = (x1: number, y1: number, x2: number, y2: number, seed: number, segments = 6, wander = 1) => hand.line(x1, y1, x2, y2, { seed, wander, segments });

const NATURALS = [60, 62, 64, 65, 67, 69];
const NATURALS_HIGH = [60, 62, 64, 65, 67, 69, 71, 72];

/** the page: pitch guides, the three onsets, and whatever is drawn on them */
export function Field({ label, children, className, top = 0, high, unheard, columns }: { label: string; children: ReactNode; className?: string; top?: number; high?: boolean; unheard?: boolean; columns?: number[] }) {
  const cols = columns ?? [xOfTone(0), xOfTone(1), xOfTone(2)];
  return (
    <svg className={[s.plane, className].filter(Boolean).join(" ")} viewBox={`0 ${top} ${FIELD.w} ${FIELD.h - top}`} role="img" aria-label={label}>
      <g className={s.guide} aria-hidden="true">
        {(high ? NATURALS_HIGH : NATURALS).map((p, i) => (
          <g key={p}>
            <path d={L(58, yOfPitch(p), 604, yOfPitch(p), 10 + i, 14, 0.5)} />
            <text className={s.tag} x={48} y={yOfPitch(p) + 4} textAnchor="end">{noteName(p)}</text>
          </g>
        ))}
        {cols.map((x, k) => (
          <text key={k} className={s.tag} x={x} y={FIELD.h - 12} textAnchor="middle">tone {k + 1}{k === cols.length - 1 && unheard ? " · not yet heard" : ""}</text>
        ))}
      </g>
      {children}
    </svg>
  );
}

/** one tone: a pencilled notehead at its pitch; `ghost` is a continuation that has not been chosen */
export function Tone({ k, pitch, ghost, now, name, seed = 0, x: xOver }: { k: 0 | 1 | 2 | 3; pitch: number; ghost?: boolean; now?: boolean; name?: boolean; seed?: number; x?: number }) {
  const x = xOver ?? xOfTone(Math.min(k, 2) as 0 | 1 | 2), y = yOfPitch(pitch);
  return (
    <g className={s.tone} data-ghost={ghost || undefined} data-now={now || undefined}>
      {!ghost && <ellipse className={s.toneFill} cx={x} cy={y} rx="13" ry="9" transform={`rotate(-14 ${x} ${y})`} />}
      <path className={s.toneInk} d={hand.ring(x, y, 13, 9, { seed: 70 + k * 9 + seed, wobble: 0.03, tilt: -0.24 })} filter="url(#folio-pencil)" />
      {name && <text className={s.tag} x={x} y={y - 16} textAnchor="middle">{noteName(pitch)}</text>}
    </g>
  );
}

/** the stroke between two tones: heard (the implicative interval), a possible continuation, or the one chosen */
export function Stroke({ from, to, kind, seed = 0, fx, tx }: { from: [0 | 1 | 2, number]; to: [0 | 1 | 2, number]; kind: "heard" | "prong" | "chosen"; seed?: number; fx?: number; tx?: number }) {
  const x1 = fx ?? xOfTone(from[0]), y1 = yOfPitch(from[1]), x2 = tx ?? xOfTone(to[0]), y2 = yOfPitch(to[1]);
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
  return <path className={s[kind]} d={L(x1 + ux * 17, y1 + uy * 12, x2 - ux * 17, y2 - uy * 12, 300 + seed, 9, 1.1)} filter="url(#folio-pencil)" />;
}

/** a brace beside the first interval, so its size can be compared with what follows */
export function IntervalBrace({ a, b, label }: { a: number; b: number; label?: string }) {
  const y1 = yOfPitch(b), y2 = yOfPitch(a), x = xOfTone(0) - 34;
  return (
    <g className={s.brace} aria-hidden="true">
      <path d={hand.braceV(y1, y2, x, { depth: 9, left: true, seed: 5 })} filter="url(#folio-pencil)" />
      {label && <text className={s.tag} x={x - 8} y={y1 - 9} textAnchor="middle">{label}</text>}
    </g>
  );
}

/** the playhead, at `at` seconds */
export function Playhead({ at }: { at: number }) {
  if (at <= 0) return null;
  const x = xOfTime(at);
  return <path className={s.playhead} d={L(x, 30, x + 1.2, FIELD.h - 34, 900, 8, 0.6)} />;
}

/* ---- the lean: what one interval seems to ask for -------------------------- */

const WORDS: Record<Exclude<SizeClass, "neither">, Record<RelationKey, string>> = {
  small: { direction: "continue", size: "similar size", return: "return can compete", proximity: "nearby" },
  large: { direction: "reverse", size: "smaller", return: "return possible", proximity: "nearby" },
};

/**
 * Four tendencies drawn around the place the third tone will be. They are
 * qualitative: an arrow says which way, a brace says how much compared with
 * the first interval, a ring says how near, a dashed level says where the
 * first tone was. None of them aims at a pitch.
 */
export function Leans({ cls, a, b, labels = true, unsure, only, directionStamp, col }: { cls: SizeClass; a: number; b: number; labels?: boolean; unsure?: boolean; only?: RelationKey[]; directionStamp?: NarmourRelationStatus; col?: number }) {
  const yA = yOfPitch(a), yB = yOfPitch(b), x3 = col ?? xOfTone(2);
  const l = lean(cls);
  if (!l) {
    // neither small nor large: the record assigns no set of tendencies, so nothing is asserted
    return (
      <g className={s.leans} data-none aria-hidden="true">
        <path className={s.leanNone} d={hand.ring(x3, yB, 40, 28, { seed: 44, wobble: 0.05 })} />
        <text className={s.tag} x={x3} y={yB + 5} textAnchor="middle">?</text>
        {labels && <text className={s.tag} x={x3} y={yB + 50} textAnchor="middle">no lean drawn</text>}
      </g>
    );
  }
  const words = WORDS[cls as "small" | "large"];
  const has = (k: RelationKey) => !only || only.includes(k);
  const up = l.direction === "continue";
  const ab = Math.abs(yB - yA);
  const xd = x3 - 68, xr = x3 - 128, xs = x3 + 86;
  // direction — a short arrow up (continue) or down (reverse) from B's level
  const dPts: Pt[] = up ? [[xd, yB - 10], [xd - 9, yB - 36], [xd + 2, yB - 62]] : [[xd, yB + 10], [xd - 9, yB + 36], [xd + 2, yB + 62]];
  const dTip = dPts[2];
  // return — down to the level of the first tone, then along it
  const rEnd = x3 + 56;
  const rPts: Pt[] = [[xr, yB + 12], [xr + 6, (yB + yA) / 2 + 3], [xr + 18, yA - 9], [xr + 52, yA - 2]];
  // size — a brace as long as the first interval (similar) or a good deal shorter (smaller)
  const span = up ? ab : ab * 0.4;
  const sY1 = up ? yB - span : yB, sY2 = up ? yB : yB + span;
  return (
    <g className={s.leans} data-unsure={unsure || undefined} aria-hidden="true">
      {has("direction") && (
        <g className={s.leanDirection}>
          <path d={hand.curve(dPts, { seed: 51, wander: 0.5 })} filter="url(#folio-pencil)" />
          <path d={hand.arrowHead(dTip[0], dTip[1], up ? -Math.PI / 2 : Math.PI / 2, { size: 12, seed: 52 })} filter="url(#folio-pencil)" />
          {labels && <text className={s.tag} x={xd} y={up ? dTip[1] - 10 : dTip[1] + 20} textAnchor="middle">{words.direction}</text>}
          {directionStamp && <Stamp status={directionStamp} x={xd - 36} y={dTip[1] + (up ? 6 : -6)} seed={11} />}
        </g>
      )}
      {has("return") && (
        <g className={s.leanReturn}>
          <path d={hand.curve(rPts, { seed: 53, wander: 0.4 })} filter="url(#folio-pencil)" />
          <path className={s.leanLevel} d={`M${xr + 52} ${yA - 2}L${rEnd} ${yA - 2}`} />
          <path d={hand.arrowHead(rEnd, yA - 2, 0, { size: 11, seed: 54 })} filter="url(#folio-pencil)" />
          {labels && <text className={s.tag} x={(xr + 52 + rEnd) / 2} y={yA + 20} textAnchor="middle">{words.return}</text>}
        </g>
      )}
      {has("proximity") && (
        <g className={s.leanProximity}>
          <path d={hand.ring(x3, yB, 40, 28, { seed: 55, wobble: 0.05 })} filter="url(#folio-pencil)" />
          {labels && <text className={s.tag} x={x3} y={yB + 4} textAnchor="middle">{words.proximity}</text>}
        </g>
      )}
      {has("size") && (
        <g className={s.leanSize}>
          <path d={hand.braceV(sY1, sY2, xs, { depth: 9, left: false, seed: 56 })} filter="url(#folio-pencil)" />
          {labels && <text className={s.tag} x={xs + 27} y={(sY1 + sY2) / 2 + 4} textAnchor="start">{words.size}</text>}
        </g>
      )}
    </g>
  );
}

/* ---- verdicts: three shapes, so no verdict rests on colour ------------------ */

/** realised is a filled disc, denied is a cross, not strongly diagnostic is a dashed ring */
export function Stamp({ status, x, y, seed = 0 }: { status: NarmourRelationStatus; x: number; y: number; seed?: number }) {
  if (status === "REALIZED") {
    return (
      <g className={s.stamp} data-status={status}>
        <circle cx={x} cy={y} r="6.5" className={s.stampFill} />
        <path d={hand.ring(x, y, 8.5, 8.5, { seed: 60 + seed, wobble: 0.05 })} className={s.stampInk} filter="url(#folio-pencil)" />
      </g>
    );
  }
  if (status === "DENIED") {
    return (
      <g className={s.stamp} data-status={status}>
        <path d={hand.line(x - 7, y - 7, x + 7, y + 7, { seed: 61 + seed, wander: 0.6, segments: 3 })} className={s.stampInk} filter="url(#folio-pencil)" />
        <path d={hand.line(x + 7, y - 7, x - 7, y + 7, { seed: 62 + seed, wander: 0.6, segments: 3 })} className={s.stampInk} filter="url(#folio-pencil)" />
      </g>
    );
  }
  return (
    <g className={s.stamp} data-status={status}>
      <path d={hand.ring(x, y, 7.5, 7.5, { seed: 63 + seed, wobble: 0.06 })} className={s.stampDash} />
    </g>
  );
}

/** the four small pictograms that head a row of verdicts — the same marks as the lean drawn round the third tone */
export function RelationIcon({ k, x, y }: { k: RelationKey; x: number; y: number }) {
  return (
    <g className={s.icon} data-relation={k} aria-hidden="true" transform={`translate(${x} ${y})`}>
      {k === "direction" && (<><path d="M-6 6 Q-1 0 4 -6" /><path d="M-2 -6 L4 -6 L4 0" /></>)}
      {k === "size" && <path d="M-3 -8 Q1 -8 1 -4 L1 -1 Q1 0 4 0 Q1 0 1 1 L1 4 Q1 8 -3 8" />}
      {k === "return" && (<><path d="M5 -6 Q-5 -6 -5 1 Q-5 7 3 7" strokeDasharray="2 2.6" /><path d="M0 4 L4 7 L0 10" /></>)}
      {k === "proximity" && <ellipse cx="0" cy="0" rx="7" ry="5.5" strokeDasharray="1.6 2.6" />}
    </g>
  );
}

export const PIP_GAP = 30;

/** the four pictograms that head the columns of verdicts */
export function PipHeader({ x, y }: { x: number; y: number }) {
  return (
    <g className={s.pips} aria-hidden="true">
      {RELATION_KEYS.map((k, i) => <RelationIcon key={k} k={k} x={x + i * PIP_GAP} y={y} />)}
    </g>
  );
}

/** the verdict stamps of one continuation, in the record's fixed order */
export function PipRow({ x, y, statuses, seed = 0 }: { x: number; y: number; statuses: (NarmourRelationStatus | null)[]; seed?: number }) {
  return (
    <g className={s.pips} aria-hidden="true">
      {RELATION_KEYS.map((k, i) => statuses[i] ? <Stamp key={k} status={statuses[i]!} x={x + i * PIP_GAP} y={y} seed={seed + i * 3} /> : null)}
    </g>
  );
}
