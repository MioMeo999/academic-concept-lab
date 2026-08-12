import type { CSSProperties, ElementType, ReactNode } from "react";

/* ---------------------------------------------------------------------------
   The drawn vocabulary. A fixed kit of parts every record is assembled from,
   so a new record costs no new illustration.
   ------------------------------------------------------------------------- */

/** Content carries inline markup (<b>, <i>, <span class="hl">) on purpose —
 *  emphasis is editorial, so it lives with the words rather than the template. */
export function Rich({
  html,
  as: Tag = "span",
  ...rest
}: {
  html: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /* labels a stacked table cell on small screens (see .code-row/.measure-row) */
  "data-label"?: string;
}) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Icon({ id, style, className }: { id: string; style?: CSSProperties; className?: string }) {
  return (
    <svg aria-hidden="true" style={style} className={className}>
      <use href={`#${id}`} />
    </svg>
  );
}

export function Divider() {
  return (
    <svg className="divider" data-draw="" viewBox="0 0 400 14" preserveAspectRatio="none" aria-hidden="true">
      <path d="M2 8c20-8 40 6 60-1s40 7 60 0 40 6 60-1 40 7 60 0 40 6 60-1 30 5 46-1" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" pathLength={1} data-ink="" />
    </svg>
  );
}

/** viewBox is trimmed to the path's real extents (y 2..58) so the drawn banner
 *  fills its container instead of stopping short under a wrapped title. */
export function Banner({ children, tilt = "tilt-l2" }: { children: ReactNode; tilt?: string }) {
  return (
    <span className={`banner ${tilt}`}>
      <svg viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true" data-draw="">
        <path d="M4 9c130-6 262-7 392-1 3 16 3 32 0 49-130 6-266 6-392 0-3-16-3-32 0-48z" fill="none" stroke="#1C1B19" strokeWidth={2.8} strokeLinejoin="round" vectorEffect="non-scaling-stroke" pathLength={1} data-ink="" />
        <path d="M11 14c126-5 254-6 380-1" fill="none" stroke="#1C1B19" strokeWidth={1.5} opacity={0.33} vectorEffect="non-scaling-stroke" pathLength={1} data-ink="" />
      </svg>
      <span>{children}</span>
    </span>
  );
}

/** The path must fill its viewBox. An inset path stretched to the container
 *  draws a cloud SMALLER than the text it is meant to hold. */
export function Cloud({ children, colour = "#E24E1B", className = "" }: { children: ReactNode; colour?: string; className?: string }) {
  return (
    <div className={`cloud ${className}`}>
      <svg className="frame" viewBox="0 0 340 100" preserveAspectRatio="none" aria-hidden="true" data-draw="">
        <path
          d="M18 32C18 14 44 2 66 11 84 -1 112 1 124 13 144 1 174 1 192 13 214 1 246 3 258 15 284 6 320 12 324 32 338 42 338 62 324 74 322 92 288 101 264 91 244 101 210 101 192 91 172 101 138 101 120 91 96 101 58 97 52 83 24 85 4 67 8 49 2 43 6 36 18 32Z"
          fill="none" stroke={colour} strokeWidth={2.4} strokeLinejoin="round" vectorEffect="non-scaling-stroke"
          pathLength={1} data-ink=""
        />
      </svg>
      {children}
    </div>
  );
}

export function Ribbon({ text, fill, stroke, tilt = "" }: { text: string; fill: string; stroke: string; tilt?: string }) {
  return (
    <span className={`ribbon ${tilt}`}>
      <svg viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 5c64-3 130-4 194-1 1 10 1 21 0 31-64 3-130 3-194 0-1-10-1-20 0-30z" fill={fill} stroke={stroke} strokeWidth={2} strokeLinejoin="round" />
      </svg>
      <span>{text}</span>
    </span>
  );
}

const STRIKES = [
  "M2 8C24 3 48 11 72 6c16-3 32 4 46-1",
  "M2 7c22 5 46-4 70 1 16 3 32-3 46 2",
  "M2 9c24-6 48 6 72 0 15-4 31 3 44-2",
  "M2 6c22 6 46-3 70 2 16 3 31-4 46 1",
  "M2 9c24-6 46 5 70 1 16-3 32 4 46-2",
];

export function Strike({ text, i = 0 }: { text: string; i?: number }) {
  return (
    <span className="strike" style={{ fontSize: ".94rem" }}>
      {text}
      <svg viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true">
        <path d={STRIKES[i % STRIKES.length]} fill="none" stroke="#E24E1B" strokeWidth={2.2} strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Bullet({ icon, colour, html, size = ".93rem" }: { icon: string; colour: string; html: string; size?: string }) {
  return (
    <div className="bullet">
      <Icon id={icon} style={{ color: colour }} />
      <Rich className="read" style={{ fontSize: size, lineHeight: 1.55, color: "var(--pen-2)" }} html={html} />
    </div>
  );
}

export function SecHead({ num, title, colour }: { num: string; title: string; colour: string }) {
  return (
    <div className="sec-hd">
      <svg style={{ width: 38, height: 38, flex: "none" }} viewBox="0 0 40 40" aria-hidden="true" data-draw="">
        <path d="M20 3.5c9.4-.2 16.8 7 16.5 16.4-.3 9.2-7.3 16.4-16.5 16.2C10.6 35.9 3.6 28.8 3.5 19.8 3.4 10.5 10.7 3.7 20 3.5z" fill="none" stroke={colour} strokeWidth={2.4} pathLength={1} data-ink="" />
        <text x={20} y={26} textAnchor="middle" fontSize={15} fontWeight={700} fill={colour} fontFamily="Ink Free, Comic Sans MS, cursive">{num}</text>
      </svg>
      <h2>{title}</h2>
    </div>
  );
}

export function ArrowSmall({ colour }: { colour: string }) {
  return (
    <svg className="arw" viewBox="0 0 26 20" aria-hidden="true" style={{ color: colour }}>
      <path d="M3 10c6-.3 13-.4 19 0" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
      <path d="M16 5c2.6 2 5 3.8 7 5-2 1.2-4.2 3-6.4 5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GoArrow() {
  return (
    <svg viewBox="0 0 40 20" aria-hidden="true">
      <path d="M4 10c10-.3 21-.4 31 0" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
      <path d="M27 4c3.4 2.4 6.6 4.4 9.4 6-2.8 1.6-5.6 3.6-8.4 6" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function pad2(n: number) {
  return n < 10 ? `0${n}` : String(n);
}
