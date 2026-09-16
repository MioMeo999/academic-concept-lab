/**
 * Shared drawing primitives for the Phase B2 prototypes.
 *
 * These are material behaviours, not a claim-class cipher. No component here
 * means anything on its own; each page states in text what a mark is doing
 * (calibration 2). Colour is drawing material, not a provenance key.
 *
 * Every figure that uses these must supply a text equivalent. `Figure` below
 * enforces that by requiring a caption and an alt statement.
 */
import type { ReactNode } from "react";
import { hatch, passes, partialBoundary, stipple, type HatchOptions } from "../_lib/marks";

/** Shared filter defs. Grain lives in the mark: the tooth filter is only ever
 *  applied to drawn marks, never to a background. */
export function MarkDefs() {
  return (
    <svg aria-hidden="true" focusable="false" className="vr-defs" width="0" height="0">
      <defs>
        <filter id="vr-tooth" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="vr-tooth-fine" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="0.9" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Held marks.
            These two are defined once for the whole prototype set and placed
            with <use>. A held mark is therefore mechanically identical
            wherever it appears — it is re-used, never re-drawn. A hand-varied
            constant would be a lie about constancy. */}
        <g id="vr-event" filter="url(#vr-tooth-fine)" fill="none" strokeLinecap="round">
          <path d="M0 -13 C 0.7 -5 -0.6 4 0.3 13" stroke="currentColor" strokeWidth="2.7" />
          <path d="M0 -13 C -0.4 -5 0.8 4 -0.2 13" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
        </g>
        <g id="vr-probe" filter="url(#vr-tooth-fine)" fill="none" strokeLinecap="round">
          <path d="M-11.5 0.4 L 11.5 -0.3" stroke="currentColor" strokeWidth="3.2" />
          <path d="M-9.8 -1.9 L 9.6 -1.5" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
          <path d="M0.2 -9.4 L -0.1 9.2" stroke="currentColor" strokeWidth="1.8" />
        </g>
      </defs>
    </svg>
  );
}

type HatchFieldProps = HatchOptions & {
  colour: string;
  /** Overall opacity multiplier for the accumulated field. */
  strength?: number;
  clipId?: string;
};

/**
 * An accumulated field. Tone is reached by repetition, never declared: the
 * darkness of this element is the number of passes it took.
 *
 * The stroke wander is geometric, not filtered — see marks.ts. A displacement
 * filter over a field this size is not affordable, and the mark should carry
 * its own tooth rather than wear one.
 */
export function HatchField({ colour, strength = 1, clipId, ...opts }: HatchFieldProps) {
  const { angle, cx, cy, segments } = hatch(opts);
  return (
    <g clipPath={clipId ? `url(#${clipId})` : undefined}>
      <g transform={`rotate(${angle} ${cx} ${cy})`}>
        {segments.map((s, i) => (
          <polyline
            key={i}
            points={s.pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ")}
            fill="none"
            stroke={colour}
            strokeWidth={s.w}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={Math.min(1, s.p * strength)}
          />
        ))}
      </g>
    </g>
  );
}

/**
 * An accumulated field with a soft extent.
 *
 * Two lessons from the Mark Library are doing the work. Tone is reached by
 * repetition, so the field is built from several passes at different angles
 * rather than one ruled screen — a single-angle hatch reads as wallpaper.
 * And a field of thought does not have a rectangular edge, so the passes are
 * masked with a gradient: the extent fades rather than stopping.
 *
 * Density here is amount of material laid down. It is not evidential strength,
 * and the page that uses it says so.
 */
export function PigmentField({
  id,
  x,
  y,
  w,
  h,
  colour,
  angles = [26, -12],
  gap = 4.2,
  seed = 1,
  strength = 1,
  broken = 0.3,
  soft = 0.42,
  pressure = [0.14, 0.42],
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  colour: string;
  angles?: number[];
  gap?: number;
  seed?: number;
  strength?: number;
  broken?: number;
  /** 0 = hard rectangular edge, 1 = fully diffuse. */
  soft?: number;
  pressure?: [number, number];
}) {
  const maskId = `${id}-mask`;
  const gradId = `${id}-grad`;
  return (
    <g>
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset={`${Math.round((1 - soft) * 100)}%`} stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse" x={x - 4} y={y - 4} width={w + 8} height={h + 8}>
          <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} fill={`url(#${gradId})`} />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        {angles.map((angle, i) => (
          <HatchField
            key={i}
            x={x - 2}
            y={y - 2}
            w={w + 4}
            h={h + 4}
            angle={angle}
            gap={gap * (1 + i * 0.35)}
            seed={seed + i * 101}
            jitter={1.6}
            broken={broken + i * 0.12}
            weight={0.95 - i * 0.12}
            pressure={pressure}
            colour={colour}
            strength={strength * (i === 0 ? 1 : 0.78)}
          />
        ))}
      </g>
    </g>
  );
}

/**
 * A path drawn more than once. The `d` is re-used, not re-authored, so a
 * "held" mark is mechanically identical wherever it appears.
 */
export function MultiPass({
  d,
  colour,
  width = 1.4,
  count = 2,
  seed = 2,
  spread = 0.7,
  opacity = 1,
  fill = "none",
  dash,
}: {
  d: string;
  colour: string;
  width?: number;
  count?: number;
  seed?: number;
  spread?: number;
  opacity?: number;
  fill?: string;
  dash?: string;
}) {
  return (
    <g filter="url(#vr-tooth)" opacity={opacity}>
      {passes(count, seed, spread).map((p, i) => (
        <path
          key={i}
          d={d}
          transform={`translate(${p.dx} ${p.dy})`}
          stroke={colour}
          strokeWidth={width * (i === 0 ? 1 : 0.85)}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dash}
          fill={fill}
          strokeOpacity={p.o}
          fillOpacity={p.o}
        />
      ))}
    </g>
  );
}

/**
 * A boundary deliberately left unclosed. Used where a record states a scope or
 * a defeasible category. The page must say what the open side means.
 */
export function PartialBoundary({
  x,
  y,
  w,
  h,
  open = "right",
  colour = "var(--vr-graphite)",
  width = 1.2,
  seed = 9,
  inset = 14,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  open?: "right" | "left" | "bottom" | "top";
  colour?: string;
  width?: number;
  seed?: number;
  inset?: number;
}) {
  return <MultiPass d={partialBoundary(x, y, w, h, open, inset)} colour={colour} width={width} count={2} seed={seed} />;
}

/**
 * A prior or superseded state, kept inspectable. Reduced pressure means
 * *earlier*, never *false* — every use is accompanied by that statement in
 * text, and this component is never used as ambient texture.
 */
export function RetainedTrace({ children, label }: { children: ReactNode; label: string }) {
  return (
    <g className="vr-trace" opacity={0.52} aria-hidden="true" data-retained={label}>
      {children}
    </g>
  );
}

/** Discrete deposits, for cases where the record's own language counts events. */
export function Stipple({
  x,
  y,
  w,
  h,
  count,
  colour,
  seed = 5,
  strength = 1,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  count: number;
  colour: string;
  seed?: number;
  strength?: number;
}) {
  return (
    <g filter="url(#vr-tooth-fine)">
      {stipple(x, y, w, h, count, seed).map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={colour} fillOpacity={Math.min(1, s.p * strength)} />
      ))}
    </g>
  );
}

/**
 * Figure wrapper. A drawing may not exist here without a caption stating what
 * it shows and a text equivalent carrying the same distinction, per the
 * content survival checklist.
 */
export function Figure({
  children,
  caption,
  equivalent,
  tone = "loud",
}: {
  children: ReactNode;
  caption: ReactNode;
  equivalent: string;
  tone?: "loud" | "quiet";
}) {
  return (
    <figure className={`vr-figure vr-figure--${tone}`}>
      <div className="vr-figure__plate" role="img" aria-label={equivalent}>
        {children}
      </div>
      <figcaption className="vr-figure__caption">{caption}</figcaption>
    </figure>
  );
}

/** Canonical provenance glyphs. Text and glyph are authoritative; drawing may
 *  attach or spatialise them but never replaces them. */
export const GLYPHS = {
  source: "●",
  finding: "■",
  constructed: "▲",
  synthesis: "✦",
  unresolved: "?",
} as const;

export type GlyphKey = keyof typeof GLYPHS;

export const GLYPH_MEANING: Record<GlyphKey, string> = {
  source: "Source-grounded theory, framework, historical or model claim",
  finding: "Source-grounded empirical finding or faithful explanation",
  constructed: "Constructed teaching example: states what is manipulated and held",
  synthesis: "Concept Lab synthesis or editorial arrangement",
  unresolved: "Bounded, debated, under-specified or unresolved",
};

export function Glyph({ kind }: { kind: GlyphKey }) {
  return (
    <span className={`vr-glyph vr-glyph--${kind}`} aria-hidden="true">
      {GLYPHS[kind]}
    </span>
  );
}
