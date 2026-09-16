import type { CSSProperties } from "react";

type PigmentTone = "blue" | "red" | "yellow" | "teal" | "green" | "violet";

const palette: Record<PigmentTone, string> = {
  blue: "#245fd0",
  red: "#e84e36",
  yellow: "#efbd27",
  teal: "#168e89",
  green: "#2f936d",
  violet: "#7352c5",
};

const strokes = [
  "M0 20 C38 4 73 29 112 16 S187 9 222 21 S277 31 320 13",
  "M-8 31 C28 16 62 41 101 27 S176 18 214 31 S274 43 329 23",
  "M4 43 C43 28 76 51 118 37 S185 32 226 43 S278 53 315 35",
  "M-10 55 C31 40 70 65 113 50 S183 47 222 57 S278 66 330 47",
  "M8 68 C42 52 77 75 120 63 S190 59 230 70 S274 78 312 62",
];

const hatchLines = [
  "M34 8l-24 59",
  "M76 7L51 68",
  "M118 6L94 69",
  "M160 7l-24 61",
  "M202 5l-24 62",
  "M244 8l-24 60",
  "M286 6l-24 61",
];

export function PigmentField({
  tone,
  className = "",
  style,
}: {
  tone: PigmentTone;
  className?: string;
  style?: CSSProperties;
}) {
  const colour = palette[tone];

  return (
    <svg
      className={`pigment-field pigment-field-${tone} ${className}`}
      viewBox="0 0 320 86"
      aria-hidden="true"
      focusable="false"
      style={{ "--pigment": colour, ...style } as CSSProperties}
    >
      <g fill="none" stroke="var(--pigment)" strokeLinecap="round" strokeLinejoin="round">
        {strokes.map((d, index) => (
          <path key={`stroke-${index}`} d={d} strokeWidth={index === 2 ? 7 : index % 2 ? 3.2 : 4.8} opacity={0.14 + index * 0.05} />
        ))}
        {hatchLines.map((d, index) => (
          <path key={`hatch-${index}`} d={d} strokeWidth={1.6} opacity={0.12 + (index % 3) * 0.04} />
        ))}
        <path d="M14 27c35-18 84-15 131-2s91 15 162-7" strokeWidth="2" opacity=".38" strokeDasharray="2 9" />
        <path d="M18 61c39-15 78-8 116 2s96 16 170-8" strokeWidth="1.5" opacity=".32" strokeDasharray="1 7" />
      </g>
    </svg>
  );
}
