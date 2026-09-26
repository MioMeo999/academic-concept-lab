"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Choices } from "../../_folio/Choices";
import { Glyph } from "../../_folio/Folio";
import s from "./hpa.module.css";

const ART = "/visual-language/mechanisms/hpa";

/* Node positions as fractions of the 900 × 1500 cascade drawing
   (see scripts/art/scenes/hpa-cascade.js). Position means order only. */
export const STAGES = ["brain", "crh", "acth", "cortisol", "feedback"] as const;
export type Stage = (typeof STAGES)[number];

const SPOT: Record<Stage, { x: number; y: number; rx: number; ry: number }> = {
  brain: { x: 50, y: 12, rx: 54, ry: 16 },
  crh: { x: 50, y: 34, rx: 40, ry: 12 },
  acth: { x: 50, y: 55, rx: 40, ry: 12 },
  cortisol: { x: 50, y: 82, rx: 62, ry: 19 },
  feedback: { x: 86, y: 47, rx: 26, ry: 48 },
};

const LABELS: { stage: Stage; text: string; x: number; y: number; kind: "node" | "messenger" | "region" | "body" | "loop" }[] = [
  { stage: "brain", text: "prefrontal cortex", x: 36.7, y: 4.6, kind: "region" },
  { stage: "brain", text: "amygdala", x: 64.2, y: 6.6, kind: "region" },
  { stage: "brain", text: "hippocampus", x: 41.3, y: 13.1, kind: "region" },
  { stage: "brain", text: "brainstem", x: 60, y: 14.9, kind: "region" },
  { stage: "crh", text: "Hypothalamus", x: 37, y: 28.7, kind: "node" },
  { stage: "crh", text: "CRH", x: 56, y: 38.7, kind: "messenger" },
  { stage: "acth", text: "Anterior pituitary", x: 38, y: 48, kind: "node" },
  { stage: "acth", text: "ACTH", x: 57, y: 57.5, kind: "messenger" },
  { stage: "cortisol", text: "Adrenal cortex", x: 36, y: 67.3, kind: "node" },
  { stage: "cortisol", text: "cortisol", x: 55, y: 76.7, kind: "messenger" },
  { stage: "cortisol", text: "metabolism", x: 12, y: 90.5, kind: "body" },
  { stage: "cortisol", text: "immunity", x: 27, y: 97, kind: "body" },
  { stage: "cortisol", text: "cardiovascular", x: 67, y: 97, kind: "body" },
  { stage: "cortisol", text: "cognition", x: 82, y: 90.5, kind: "body" },
  { stage: "feedback", text: "negative feedback", x: 95.5, y: 44, kind: "loop" },
];

export type StepContent = { stage: Stage; kicker: string; title: string; body: ReactNode };

/**
 * The descent. The drawing stays in view while the reader walks down the
 * cascade; whichever step is being read is lit, and the rest of the system
 * stays on the sheet in a lifted tone — the axis is one system even when
 * attention is on one link of it.
 */
export function Descent({ steps, caption }: { steps: StepContent[]; caption: string }) {
  const [active, setActive] = useState<Stage>("brain");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const els = STAGES.map((st) => refs.current[st]).filter((el): el is HTMLElement => Boolean(el));
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.45;
      let current: Stage = "brain";
      for (const el of els) if (el.getBoundingClientRect().top <= mid) current = el.dataset.stage as Stage;
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  const go = (st: Stage) => {
    setActive(st);
    const el = refs.current[st];
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    (el.querySelector("h3") as HTMLElement | null)?.focus({ preventScroll: true });
  };

  const spot = SPOT[active];

  return (
    <div className={s.descent}>
      <div className={s.descentFigureCol}>
        <figure className={s.descentFigure} data-active={active} style={{ "--sx": `${spot.x}%`, "--sy": `${spot.y}%`, "--srx": `${spot.rx}%`, "--sry": `${spot.ry}%` } as CSSProperties}>
          <div className={s.cascadeArt}>
            <picture>
              <source media="(max-width: 760px)" srcSet={`${ART}/hpa-cascade-600.webp`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${ART}/hpa-cascade.webp`} width={900} height={1500} alt="" loading="lazy" decoding="async" />
            </picture>
            <span className={s.spotlight} aria-hidden="true" />
            {LABELS.map((l) => (
              <button
                key={l.text}
                type="button"
                className={s.cascadeLabel}
                data-kind={l.kind}
                data-on={l.stage === active || undefined}
                style={{ left: `${l.x}%`, top: `${l.y}%` } as CSSProperties}
                onClick={() => go(l.stage)}
                aria-label={`${l.text}: read this step`}
              >
                {l.text}
              </button>
            ))}
          </div>
          <figcaption className={s.cascadeCaption}><Glyph g="▲" /> {caption}</figcaption>
        </figure>
      </div>

      <ol className={s.steps}>
        {steps.map((st, i) => (
          <li
            key={st.stage}
            ref={(el) => { refs.current[st.stage] = el; }}
            data-stage={st.stage}
            data-on={st.stage === active || undefined}
            className={s.step}
          >
            <div className={s.stepPips} aria-hidden="true">
              {STAGES.map((p) => <span key={p} data-on={p === st.stage || undefined} />)}
            </div>
            <p className={s.stepKicker}><span>{String(i + 1).padStart(2, "0")}</span>{st.kicker}</p>
            <h3 tabIndex={-1}>{st.title}</h3>
            <div className={s.stepBody}>{st.body}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------------
   One drawn day, read two ways: as rhythm, and as the windows through which
   each measure looks at it. The curve is schematic — no concentrations, no
   axis values — because the record states none.
   --------------------------------------------------------------------- */

// Waking at x=80; the day runs to x=880; the next waking at x=960.
// One function draws the day, so the pulses always ride the same curve.
const DAY_PTS: [number, number][] = [[40, 196], [80, 170], [124, 80], [220, 108], [320, 140], [440, 172], [560, 200], [700, 228], [800, 244], [880, 248], [960, 196]];
function dayY(x: number) {
  const P = DAY_PTS;
  let i = 0;
  while (i < P.length - 2 && P[i + 1][0] < x) i++;
  const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
  const t = (x - p1[0]) / (p2[0] - p1[0]);
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
}
const r1 = (n: number) => Math.round(n * 10) / 10;
const pt = (x: number, y: number) => ` L${r1(x)} ${r1(y)}`;
const DAY = (() => {
  let d = `M40 ${r1(dayY(40))}`;
  for (let x = 44; x <= 960; x += 4) d += pt(x, dayY(x));
  return d;
})();
const PULSES = (() => {
  let d = `M80 ${r1(dayY(80))}`;
  for (let x = 84; x <= 124; x += 4) d += pt(x, dayY(x));
  // Pulses: a quick release, then a slower fall back toward the day's level.
  for (let x0 = 124; x0 < 880; x0 += 42) {
    const amp = 20 * (1 - (x0 - 124) / 900);
    d += pt(x0 + 6, dayY(x0 + 6) - amp);
    for (let k = 1; k <= 6; k++) {
      const x = x0 + 6 + (36 * k) / 6;
      d += pt(x, dayY(x) - amp * (1 - k / 6) + 3 * (k / 6));
    }
  }
  for (let x = 884; x <= 960; x += 4) d += pt(x, dayY(x));
  return d;
})();

type Rhythm = "circadian" | "car" | "ultradian";
type Measure = { method: string; tells: string; caution: string };

const WINDOWS: Record<string, ReactNode> = {
  "Salivary cortisol": (<g><path d="M420 40 L420 272" /><circle cx="420" cy={dayY(420)} r="7" /><text x="432" y="56">one moment</text></g>),
  "Blood cortisol": (<g><path d="M470 40 L470 272" /><circle cx="470" cy={dayY(470)} r="7" /><text x="482" y="56">one moment — and the needle</text></g>),
  "Urinary cortisol": (<g><path d="M300 262 L300 250 L640 250 L640 262" /><path d="M300 44 L640 44" className={s.winFaint} /><rect x="300" y="44" width="340" height="206" className={s.winWash} /><text x="306" y="36">integrated across a period</text></g>),
  "Hair cortisol": (<g><path d="M40 262 L40 250 L960 250 L960 262" /><rect x="40" y="44" width="920" height="206" className={s.winWash} /><path d="M40 30 C 20 30, 14 30, 4 30" /><path d="M14 22 L4 30 L14 38" /><text x="60" y="36">accumulated over months — this day is one of many</text></g>),
  "Cortisol awakening response": (<g><path d="M80 262 L80 250 L128 250 L128 262" />{[80, 96, 112, 128].map((x) => <circle key={x} cx={x} cy={dayY(x)} r="5.5" />)}<text x="138" y="60">waking → +30–45 min</text></g>),
  "Diurnal slope": (<g>{[130, 300, 520, 720, 860].map((x) => <circle key={x} cx={x} cy={dayY(x)} r="6" />)}<path d={`M130 ${dayY(130)} L860 ${dayY(860)}`} className={s.winDash} /><text x="560" y="150">the shape of the decline</text></g>),
  "Reactivity": (<g><path d="M520 44 L520 272" className={s.winDash} /><text x="528" y="36">a challenge</text><circle cx="500" cy={dayY(500)} r="6" /><circle cx="566" cy={dayY(566) - 26} r="6" /><path d={`M500 ${dayY(500)} C 522 ${dayY(500) - 40}, 546 ${dayY(566) - 44}, 566 ${dayY(566) - 26}`} /><text x="578" y="162">before → after</text></g>),
};

export function DayStrip({ mode, rhythmsLede, measures }: { mode: "rhythm" | "measure"; rhythmsLede?: ReactNode; measures?: Measure[] }) {
  const [rhythm, setRhythm] = useState<Rhythm>("circadian");
  const [measure, setMeasure] = useState<string>(measures?.[0]?.method ?? "");
  const m = measures?.find((x) => x.method === measure);

  const svg = (
    <svg viewBox="0 0 1000 300" className={s.daySvg} aria-hidden="true" data-mode={mode} data-rhythm={mode === "rhythm" ? rhythm : undefined}>
      <path className={s.dayAxis} d="M40 272 C 300 270, 700 274, 960 272" filter="url(#folio-graphite)" />
      {["waking", "morning", "midday", "evening", "night", "waking"].map((t, i) => (
        <text key={t + i} className={s.dayTick} x={[80, 240, 440, 700, 860, 960][i]} y={292} textAnchor="middle">{t}</text>
      ))}
      <path className={s.dayCurve} d={DAY} filter="url(#folio-pencil)" />
      <path className={s.dayPulses} d={PULSES} filter="url(#folio-pencil)" />
      {mode === "rhythm" && (
        <g className={s.carBracket}>
          <path d="M80 60 C 78 40, 128 40, 128 60" filter="url(#folio-graphite)" />
          <text x="104" y="30" textAnchor="middle">+30–45 min</text>
        </g>
      )}
      {mode === "measure" && m && <g className={s.window} key={m.method}>{WINDOWS[m.method]}</g>}
    </svg>
  );

  if (mode === "rhythm") {
    const read = {
      circadian: "Circadian — roughly a 24-hour pattern, generally higher around the start of the active period and declining across the day.",
      car: "Awakening response — the rise across the first 30–45 minutes after waking.",
      ultradian: "Ultradian — the same day, released as pulses rather than a smooth curve.",
    }[rhythm];
    return (
      <div className={s.day}>
        <figure className={s.dayFigure}>
          <div className={s.dayPan} tabIndex={0} role="group" aria-label="Schematic day; scroll sideways on small screens">{svg}</div>
          <figcaption className={s.dayCaption}><Glyph g="▲" /> Schematic day. No concentration is shown or implied; the shape carries direction and timing only.</figcaption>
        </figure>
        <div className={s.dayPanel}>
          {rhythmsLede}
          <Choices<Rhythm>
            label="Which timescale to read"
            value={rhythm}
            onChange={setRhythm}
            options={[
              { value: "circadian", label: "Circadian" },
              { value: "car", label: "Awakening response" },
              { value: "ultradian", label: "Ultradian pulses" },
            ]}
          />
          <p className={s.dayRead} aria-live="polite">{read}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={s.day} data-measure>
      <figure className={s.dayFigure}>
        {svg}
        <figcaption className={s.dayCaption}><Glyph g="▲" /> The same schematic day. The drawn window shows what span of time each measure looks through — not a value it would return.</figcaption>
      </figure>
      <div className={s.measurePanel}>
        <div className={s.measureList} role="group" aria-label="Choose a measure">
          {measures?.map((x) => (
            <button key={x.method} type="button" aria-pressed={x.method === measure} onClick={() => setMeasure(x.method)}>{x.method}</button>
          ))}
        </div>
        {m && (
          <dl className={s.measureRead} aria-live="polite">
            <div><dt>What it tells you</dt><dd>{m.tells}</dd></div>
            <div><dt>Handle with care</dt><dd>{m.caution}</dd></div>
          </dl>
        )}
      </div>
    </div>
  );
}
