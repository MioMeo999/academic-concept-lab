"use client";

/* ---------------------------------------------------------------------------
   TONAL ISLANDS — the two places on this record where interaction does
   epistemic work.

   ContextShift — the theory's core claim is relational: one physical pitch,
   four tonal jobs. Only a switch can make that felt rather than stated.

   TonalField — the qualitative profile as an attraction field: stability is
   drawn as pigment density and distance from the mass, never as bar height,
   because the record is explicit that height ≠ frequency, loudness or liking.

   Both islands keep a static reading path: the page prints the complete
   comparison and the complete profile as ordinary content beneath them.
   ------------------------------------------------------------------------- */

import { useState } from "react";
import { Contours, INK, Mass, Ring } from "../../_components/marks";

/* ------------------------------------------------------------ context shift */

export type ShiftContext = {
  id: string;
  label: string;
  short: string;
  body: string;
  role: string;
  colour: string;
  /** 0 = the probe sits on the mass itself; 1 = outside the field entirely */
  distance: number;
};

export function ContextShift({ contexts }: { contexts: ShiftContext[] }) {
  const [active, setActive] = useState(0);
  const ctx = contexts[active];

  const W = 940;
  const H = 400;
  const cx = W / 2;
  const cy = H / 2;
  // the C probe's deposit travels outward as its role weakens
  const px = cx + ctx.distance * 300;
  const py = cy - ctx.distance * 60;

  return (
    <div className="ps-island">
      <div className="ps-island-controls" role="group" aria-label="Choose the tonal context for the same C4 probe">
        {contexts.map((c, i) => (
          <button
            key={c.id}
            type="button"
            className="ps-key ps-island-control"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            <strong>{c.short}</strong>
            <small>{i === 0 ? "home" : `job ${i + 1}`}</small>
          </button>
        ))}
      </div>

      <div className="ps-scroller">
        <div style={{ position: "relative", width: "100%", minWidth: 600, maxWidth: W, height: H, marginTop: 10 }}>
          <Contours width={W} height={H} colour={ctx.colour} seed={910} rings={5} opacity={0.5}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          <Mass size={96} colour={ctx.colour} seed={911} density={1.15}
            style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
          <span className="ps-meta" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, 56px)", color: ctx.colour }}>
            {ctx.label.split(" · ")[0]}
          </span>

          {/* the same physical probe, deposited where this context puts it */}
          <div style={{ position: "absolute", left: `${(px / W) * 100}%`, top: `${(py / H) * 100}%`, transform: "translate(-50%, -50%)" }}>
            <Mass size={44} colour={INK.charcoal} seed={912} density={0.8} />
            <span className="ps-hand-sm" style={{ position: "absolute", left: 40, top: -14, whiteSpace: "nowrap", color: INK.charcoal }}>
              the same C4
            </span>
          </div>

          {ctx.distance > 0.9 ? (
            <span className="ps-hand-sm" style={{ position: "absolute", right: "2%", bottom: "4%", color: INK.violet, transform: "rotate(-1.5deg)" }}>
              outside the collection — the field barely reaches it
            </span>
          ) : null}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(18px, 3vw, 48px)", marginTop: 24 }}>
        <div>
          <p className="ps-meta" style={{ color: ctx.colour, marginBottom: 8 }}>{ctx.label}</p>
          <p className="ps-h3">
            C becomes <span style={{ color: ctx.colour }}>{ctx.role}</span>
          </p>
          <p className="ps-body" style={{ marginTop: 10, maxWidth: "46ch" }}>{ctx.body}</p>
        </div>
        <p className="ps-hand" style={{ alignSelf: "end", maxWidth: "26ch" }}>
          same pitch. same register. same timbre. only the key moved.
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- tonal field */

export type FieldItem = {
  pitchClass: string;
  note: string;
  role: string;
  level: "anchor" | "triad" | "diatonic" | "nondiatonic";
  body: string;
};

const LEVEL_GEOMETRY: Record<FieldItem["level"], { radius: number; size: number; density: number; colour: string }> = {
  anchor: { radius: 0, size: 58, density: 1.3, colour: INK.vermilion },
  triad: { radius: 118, size: 40, density: 0.95, colour: INK.teal },
  diatonic: { radius: 196, size: 28, density: 0.7, colour: INK.ochre },
  nondiatonic: { radius: 262, size: 20, density: 0.5, colour: INK.violet },
};

export function TonalField({ items }: { items: FieldItem[] }) {
  const [active, setActive] = useState(0);
  const sel = items[active];

  const W = 940;
  const H = 480;
  const cx = W / 2;
  const cy = H / 2;

  return (
    <div className="ps-island">
      <div className="ps-scroller">
        <div style={{ position: "relative", width: "100%", minWidth: 640, maxWidth: W, height: H }}>
          <Contours width={W} height={H} colour={INK.graphite} seed={920} rings={4} opacity={0.42}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

          {items.map((item, i) => {
            const g = LEVEL_GEOMETRY[item.level];
            const angle = -Math.PI / 2 + i * (Math.PI / 6);
            const x = cx + Math.cos(angle) * g.radius;
            const y = cy + Math.sin(angle) * g.radius * 0.66;
            const isActive = i === active;
            return (
              <button
                key={item.pitchClass}
                type="button"
                className="ps-key"
                aria-pressed={isActive}
                aria-label={`${item.pitchClass} — ${item.role}`}
                onClick={() => setActive(i)}
                style={{
                  position: "absolute",
                  left: `${(x / W) * 100}%`,
                  top: `${(y / H) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  display: "grid",
                  justifyItems: "center",
                  gap: 2,
                  padding: 8,
                  minWidth: 44,
                  minHeight: 44,
                }}
              >
                {isActive ? (
                  <Ring width={g.size + 22} height={g.size + 22} colour={g.colour} seed={930 + i} weight={1.4}
                    style={{ position: "absolute", left: "50%", top: "38%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
                ) : null}
                <Mass size={g.size} colour={g.colour} seed={940 + i} density={g.density} />
                <span className="ps-meta" style={{ color: isActive ? g.colour : "var(--soft)", fontSize: 10 }}>{item.pitchClass}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(18px, 3vw, 48px)", marginTop: 26 }}>
        <div>
          <p className="ps-meta" style={{ color: LEVEL_GEOMETRY[sel.level].colour, marginBottom: 8 }}>
            {sel.note} · {sel.level === "anchor" ? "the anchor" : sel.level}
          </p>
          <p className="ps-h3">{sel.pitchClass} — {sel.role}</p>
          <p className="ps-body" style={{ marginTop: 10, maxWidth: "46ch" }}>{sel.body}</p>
        </div>
        <div>
          <p className="ps-hand" style={{ maxWidth: "28ch" }}>
            stability is drawn as density and distance — never as height.
          </p>
          <p className="ps-small" style={{ marginTop: 10, maxWidth: "44ch" }}>
            A qualitative teaching representation of relative tonal fit in a C-major context.
            It carries no numerical profile values, and no frequency, loudness, probability or
            pleasantness axis.
          </p>
        </div>
      </div>
    </div>
  );
}
