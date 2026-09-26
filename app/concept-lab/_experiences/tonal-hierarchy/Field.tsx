"use client";

import type { CSSProperties, ReactNode } from "react";
import s from "./tonal.module.css";

/* ---------------------------------------------------------------------------
   The tonal field — the record's persistent object.

   Each pitch class keeps its own spoke (angle = chroma identity, C at the
   top). Its distance from home is its function in the current context. A
   pitch with no context sits on the rim, undifferentiated. Distance is a
   qualitative teaching representation of relative tonal centrality / fit:
   four broad levels, drawn as wide pencil bands because each level holds
   internal variation. No empirical profile value is shown or implied.
   ------------------------------------------------------------------------- */

export const PCS = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"] as const;
export type Level = "anchor" | "triad" | "diatonic" | "variable" | "nondiatonic" | "rim";

export const LEVEL_LABEL: Record<Level, string> = {
  anchor: "tonic",
  triad: "tonic-triad member",
  diatonic: "other diatonic tone",
  variable: "varies with the form of the minor scale",
  nondiatonic: "nondiatonic tone",
  rim: "no context yet",
};

const RADIUS: Record<Level, number> = { anchor: 0, triad: 170, diatonic: 290, variable: 350, nondiatonic: 410, rim: 455 };

/** Scale membership for a key: standard music-theory classification used as a
 *  teaching layout, not a rating. In minor, the sixth and seventh degrees vary
 *  between natural, harmonic and melodic forms, so they are not ranked. */
export function levelsFor(tonic: number, mode: "major" | "minor"): Level[] {
  return PCS.map((_, pc) => {
    const d = (pc - tonic + 12) % 12;
    if (d === 0) return "anchor";
    if (mode === "major") {
      if (d === 4 || d === 7) return "triad";
      if ([2, 5, 9, 11].includes(d)) return "diatonic";
      return "nondiatonic";
    }
    if (d === 3 || d === 7) return "triad";
    if (d === 2 || d === 5) return "diatonic";
    if ([8, 9, 10, 11].includes(d)) return "variable";
    return "nondiatonic";
  });
}

const pos = (pc: number, level: Level) => {
  const r = RADIUS[level];
  const t = -Math.PI / 2 + (pc * Math.PI) / 6;
  // Rounded so the server and client serialise identical style strings.
  return { x: Math.round((500 + Math.cos(t) * r) * 10) / 10, y: Math.round((500 + Math.sin(t) * r) * 10) / 10 };
};

export function TonalField({
  levels,
  tonicLabel,
  highlight,
  highlightLabel,
  selected,
  onSelect,
  audible,
  className,
  children,
  ariaLabel,
}: {
  /** null = no context: every tone on the rim. */
  levels: Level[] | null;
  tonicLabel?: string;
  highlight?: number;
  highlightLabel?: string;
  selected?: number | null;
  onSelect?: (pc: number) => void;
  /** Pitch classes that can be heard in the current exercise. */
  audible?: number[];
  className?: string;
  children?: ReactNode;
  ariaLabel: string;
}) {
  const organised = Boolean(levels);
  return (
    <div className={[s.field, className].filter(Boolean).join(" ")} data-organised={organised || undefined}>
      <div className={s.fieldArt} role="img" aria-label={ariaLabel}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/visual-language/theories/tonal/tonal-field.webp" srcSet="/visual-language/theories/tonal/tonal-field-600.webp 600w, /visual-language/theories/tonal/tonal-field.webp 1000w" sizes="(max-width: 760px) 92vw, 44vw" alt="" width={1000} height={1000} decoding="async" />
        <svg className={s.fieldRim} viewBox="0 0 1000 1000" aria-hidden="true">
          <circle cx="500" cy="500" r="455" filter="url(#folio-graphite)" />
        </svg>
        {organised && tonicLabel && <span className={s.homeLabel} aria-hidden="true">{tonicLabel}</span>}
      </div>
      <div className={s.tones} role={onSelect ? "group" : undefined} aria-label={onSelect ? "Pitch classes" : undefined}>
        {PCS.map((name, pc) => {
          const level = levels ? levels[pc] : "rim";
          const p = pos(pc, level);
          const common = {
            className: s.tone,
            "data-level": level,
            "data-highlight": highlight === pc || undefined,
            "data-selected": selected === pc || undefined,
            "data-audible": audible?.includes(pc) || undefined,
            style: { left: `${(p.x / 10).toFixed(2)}%`, top: `${(p.y / 10).toFixed(2)}%` } as CSSProperties,
          };
          const inner = (
            <>
              <span className={s.toneDot} aria-hidden="true">{level === "variable" ? "?" : ""}</span>
              <span className={s.toneName}>{name}</span>
              {highlight === pc && highlightLabel && <span className={s.toneTag} aria-hidden="true">{highlightLabel}</span>}
            </>
          );
          return onSelect ? (
            <button key={name} type="button" {...common} aria-pressed={selected === pc} aria-label={`${name}: ${LEVEL_LABEL[level]}`} onClick={() => onSelect(pc)}>{inner}</button>
          ) : (
            <span key={name} {...common}>{inner}<span className={s.sr}>: {LEVEL_LABEL[level]}</span></span>
          );
        })}
      </div>
      {children}
    </div>
  );
}
