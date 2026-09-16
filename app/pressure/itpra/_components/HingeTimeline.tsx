"use client";

/* ---------------------------------------------------------------------------
   HINGE TIMELINE — the ITPRA record's one full-pigment instrument.

   The theory is temporal: five response systems arranged around an outcome
   onset. The composition is therefore bands around a hinge, and the
   interaction is tracing one band at a time — because the hardest
   distinction in the record is that these are five different questions
   asked of one moment, not five stages of one process.

   The complete table of windows is printed by the page beneath the island,
   so the static reading path loses nothing.
   ------------------------------------------------------------------------- */

import { useState, type CSSProperties } from "react";
import { Band, Hinge, INK } from "../../_components/marks";

export type Window_ = {
  key: string;
  label: string;
  epoch: string;
  question: string;
  body: string;
  function_: string;
  boundary: string;
  colour: string;
  start: number; // percent of the track
  end: number;
};

export function HingeTimeline({ windows }: { windows: Window_[] }) {
  const [active, setActive] = useState(1); // tension: the band that leans on the hinge
  const sel = windows[active];

  const TRACK_LEFT = 168; // px reserved for labels
  const HINGE = 70; // percent

  return (
    <div className="ps-island">
      <div className="ps-scroller">
        <div style={{ position: "relative", width: "100%", minWidth: 680, maxWidth: 980, paddingTop: 6 }}>
          {/* time axis annotation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: TRACK_LEFT,
              marginBottom: 14,
            }}
          >
            <span className="ps-meta">before</span>
            <span className="ps-meta" style={{ color: "var(--ink)", marginRight: `${100 - HINGE}%`, transform: "translateX(50%)" }}>
              outcome onset
            </span>
            <span className="ps-meta">after</span>
          </div>

          <div style={{ position: "relative" }}>
            {/* the hinge itself, spanning all bands */}
            <Hinge
              height={windows.length * 62 + 10}
              colour={INK.charcoal}
              seed={810}
              weight={2.2}
              style={{
                position: "absolute",
                left: `calc(${TRACK_LEFT}px + (100% - ${TRACK_LEFT}px) * ${HINGE / 100})`,
                top: -4,
                transform: "translateX(-50%)",
                pointerEvents: "none",
              }}
            />

            {windows.map((w, i) => {
              const isActive = i === active;
              return (
                <button
                  key={w.key}
                  type="button"
                  className="ps-key"
                  aria-pressed={isActive}
                  onClick={() => setActive(i)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `${TRACK_LEFT - 18}px minmax(0, 1fr)`,
                    gap: 18,
                    alignItems: "center",
                    width: "100%",
                    minHeight: 54,
                    padding: "4px 0",
                    opacity: isActive ? 1 : 0.62,
                  }}
                >
                  <span style={{ textAlign: "right" }}>
                    <span className="ps-meta" style={{ display: "block", color: isActive ? w.colour : "var(--soft)" }}>
                      {w.label}
                    </span>
                    <span className="ps-hand-sm" style={{ color: isActive ? "var(--ink)" : "var(--faint)" }}>{w.epoch}</span>
                  </span>
                  <span style={{ position: "relative", display: "block", height: 34 }}>
                    <Band
                      width={800}
                      height={34}
                      colour={w.colour}
                      seed={820 + i}
                      opacity={isActive ? 0.95 : 0.55}
                      style={{
                        position: "absolute",
                        left: `${w.start}%`,
                        width: `${w.end - w.start}%`,
                        top: 0,
                      }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(18px, 3vw, 48px)", marginTop: 28 }}>
        <div>
          <p className="ps-hand" style={{ color: sel.colour, fontSize: 26 }}>“{sel.question}”</p>
          <p className="ps-body" style={{ marginTop: 12, maxWidth: "46ch" }}>{sel.body}</p>
        </div>
        <div className="ps-flow" style={{ "--flow": "10px" } as CSSProperties}>
          <p className="ps-small">
            <strong style={{ color: "var(--ink)" }}>proposed function · </strong>
            {sel.function_}
          </p>
          <p className="ps-small">
            <strong style={{ color: "var(--ink)" }}>kept distinct from · </strong>
            {sel.boundary}
          </p>
        </div>
      </div>
    </div>
  );
}
