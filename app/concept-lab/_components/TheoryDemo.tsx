"use client";

import { useState } from "react";
import type { TheoryDemo as Demo } from "@/content/types";

/* Teaching analogies. Direction of relationship only — no magnitude is shown
   and none is implied. See each demo's caption. */
const DEMOS = {
  "scale-pair": [
    { a: 1.3, b: 0.74, t: "What the person needs exceeds what the setting supplies. Correspondence is low on this dimension — strain is the usual consequence." },
    { a: 1, b: 1, t: "Needs and supplies correspond. Neither side is straining against the other — and neither one is “better”. Correspondence is a relationship, not a virtue either side owns." },
    { a: 0.74, b: 1.3, t: "The setting supplies more than the person needs. More is not automatically better — what matters is what is being compared with what." },
  ],
  "dual-path": [
    { strain: 0.92, motiv: 0.18, t: "Demands keep drawing effort and nothing offsets the cost. This is the health-impairment route: sustained effort, exhaustion, and over time, health complaints." },
    { strain: 0.55, motiv: 0.55, t: "Resources begin to buffer — the same demands cost less. The motivational route becomes available alongside the strain route, not instead of it." },
    { strain: 0.24, motiv: 0.9, t: "Demands are still high, but plentiful resources both blunt the strain and count for more than they would in an easy job. The demands are what make the resources matter." },
  ],
} as const;

function Road({ label, sub, colour, weight, icon }: { label: string; sub: string; colour: string; weight: number; icon: string }) {
  return (
    <div style={{ flex: 1, minWidth: 180 }}>
      <div style={{ display: "flex", alignItems: "center", gap: ".45rem" }}>
        <svg style={{ width: 24, height: 24, color: colour, flex: "none" }} aria-hidden="true"><use href={`#${icon}`} /></svg>
        <span style={{ fontSize: ".95rem", fontWeight: 700, color: colour }}>{label}</span>
      </div>
      <svg viewBox="0 0 200 26" style={{ width: "100%", height: 26, marginTop: ".3rem", overflow: "visible" }} aria-hidden="true">
        <path d="M4 15c40-9 84 7 126-2 26-6 48 3 66-1" fill="none" stroke={colour}
          strokeWidth={(2 + weight * 7).toFixed(1)} strokeLinecap="round" style={{ transition: "stroke-width .45s ease" }} />
      </svg>
      <p className="k" style={{ marginTop: ".15rem" }}>{sub}</p>
    </div>
  );
}

export function TheoryDemo({ demo }: { demo: Demo }) {
  const [i, setI] = useState(demo.start ?? 1);
  const clamp = (n: number, len: number) => Math.min(Math.max(n, 0), len - 1);

  const seg = (
    <div className="seg" role="group" aria-label={demo.label}>
      {demo.options.map((o, n) => (
        <button key={o} type="button" aria-pressed={n === i} onClick={() => setI(n)}>{o}</button>
      ))}
    </div>
  );

  if (demo.type === "scale-pair") {
    const states = DEMOS["scale-pair"];
    const s = states[clamp(i, states.length)];
    return (
      <div className="sk-box tilt-l" style={{ marginTop: "1.1rem", textAlign: "center" }}>
        <div className="stage">
          <figure>
            <svg width={70} height={146} viewBox="0 0 40 40" style={{ color: "var(--red)", overflow: "visible", transform: `scaleY(${s.a})` }} aria-hidden="true"><use href="#i-person" /></svg>
            <figcaption className="k" style={{ color: "var(--red)" }}>person</figcaption>
          </figure>
          <svg width={84} height={146} viewBox="0 0 40 40" style={{ overflow: "visible" }} aria-hidden="true"><use href="#i-door" /></svg>
          <figure>
            <svg width={70} height={146} viewBox="0 0 40 40" style={{ color: "var(--teal)", overflow: "visible", transform: `scaleY(${s.b})` }} aria-hidden="true"><use href="#i-person" /></svg>
            <figcaption className="k" style={{ color: "var(--teal)" }}>setting</figcaption>
          </figure>
        </div>
        <svg viewBox="0 0 200 26" style={{ width: "min(100%,280px)", height: 26, marginTop: ".4rem" }} aria-hidden="true">
          <path d="M28 16c34-12 110-12 144 0" fill="none" stroke="#1C1B19" strokeWidth={2.4} strokeLinecap="round" />
          <path d="M36 9c-4 2.8-7 5-8.6 7 3 .8 6 2.2 8.8 4M164 9c4 2.8 6.8 5 8.4 7-3 .8-5.8 2.2-8.6 4" fill="none" stroke="#1C1B19" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <span className="circled">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
              <path d="M49 3c26-1 47 5 48 15 1 11-20 18-47 18C24 36 4 29 4 18 4 8 25 3 49 3" fill="none" stroke="#E24E1B" strokeWidth={2.3} />
            </svg>
            <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--red)" }}>{demo.centre}</span>
          </span>
        </div>
        {seg}
        <p className="read" style={{ fontSize: ".92rem", lineHeight: 1.55, marginTop: ".75rem", maxWidth: "52ch", marginInline: "auto", color: "var(--pen-2)" }}>{s.t}</p>
        <p className="k" style={{ marginTop: ".6rem" }}>{demo.caption}</p>
      </div>
    );
  }

  const states = DEMOS["dual-path"];
  const s = states[clamp(i, states.length)];
  return (
    <div className="sk-box tilt-l" style={{ marginTop: "1.1rem" }}>
      <div style={{ display: "flex", gap: "1.4rem", flexWrap: "wrap", justifyContent: "center", textAlign: "left" }}>
        <Road label="health impairment" sub="demands → effort → exhaustion" colour="var(--red)" weight={s.strain} icon="i-warn" />
        <Road label="motivational" sub="resources → engagement → commitment" colour="var(--teal)" weight={s.motiv} icon="i-star" />
      </div>
      <div style={{ textAlign: "center" }}>{seg}</div>
      <p className="read" style={{ fontSize: ".92rem", lineHeight: 1.55, marginTop: ".75rem", maxWidth: "56ch", marginInline: "auto", color: "var(--pen-2)", textAlign: "center" }}>{s.t}</p>
      <p className="k" style={{ marginTop: ".6rem", textAlign: "center" }}>{demo.caption}</p>
    </div>
  );
}
