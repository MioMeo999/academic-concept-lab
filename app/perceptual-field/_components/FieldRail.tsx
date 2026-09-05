"use client";

/* ---------------------------------------------------------------------------
   THE RAIL — the same eight events, reorganised all the way down the page.

   This is the page's argument in its margin. One set of eight sound events is
   fixed at the top and never replaced. As the reader moves through the
   movements, the brackets over those events are redrawn: by proximity, then
   by similarity, then in competition, then nested, then abandoned.

   The material is constant; only the organisation changes. A reader who never
   reads a caption still absorbs that.

   Halfway down the page the argument stops being about what a listener hears
   and starts being about what the evidence will carry, so the rail changes
   instrument too: the brackets retire and the record's own provenance marks
   take their place.
   ------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { FieldPlot, type PlotBoundary, type PlotEvent, type PlotGroup } from "./FieldPlot";
import { INK, Rule } from "./marks";

export type RailState = {
  id: string;
  num: string;
  caption: string;
  groups?: PlotGroup[];
  boundaries?: PlotBoundary[];
  eventColours?: string[];
  ghost?: boolean;
  /** second half: the record's own provenance glyph replaces the field */
  glyph?: string;
  glyphColour?: string;
  glyphLabel?: string;
};

export function FieldRail({ events, states }: { events: PlotEvent[]; states: RailState[] }) {
  const [activeId, setActiveId] = useState<string>(states[0]?.id ?? "");

  useEffect(() => {
    const nodes = states
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) seen.add(entry.target.id);
          else seen.delete(entry.target.id);
        });
        // the first state, in document order, currently crossing the band
        const next = states.find((s) => seen.has(s.id));
        if (next) setActiveId(next.id);
      },
      { rootMargin: "-38% 0px -56% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [states]);

  const state = states.find((s) => s.id === activeId) ?? states[0];
  if (!state) return null;

  const isRecord = Boolean(state.glyph);

  return (
    <div className="pf-rail-inner" aria-hidden="true">
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
        <span className="pf-num" style={{ color: INK.charcoal, opacity: 0.55 }}>{state.num}</span>
        <span className="pf-meta" style={{ fontSize: 9, letterSpacing: "0.2em" }}>
          {isRecord ? "the record" : "the field"}
        </span>
      </div>

      <Rule width={200} seed={1201} opacity={0.3} style={{ width: "100%", height: 4, display: "block" }} />

      <div style={{ minHeight: 128, paddingTop: 18 }}>
        {isRecord ? (
          <div style={{ paddingTop: 6 }}>
            <div
              style={{
                fontSize: 40,
                lineHeight: 1,
                color: state.glyphColour ?? INK.graphite,
                fontFamily: "var(--display)",
              }}
            >
              {state.glyph}
            </div>
            {state.glyphLabel ? (
              <p
                className="pf-meta"
                style={{ marginTop: 14, fontSize: 9.5, letterSpacing: "0.14em", lineHeight: 1.7, color: "#8a8a83" }}
              >
                {state.glyphLabel}
              </p>
            ) : null}
          </div>
        ) : (
          <div style={{ opacity: state.ghost ? 0.34 : 1, transition: "opacity 320ms" }}>
            <FieldPlot
              events={events}
              groups={state.groups ?? []}
              boundaries={state.boundaries ?? []}
              eventColours={state.eventColours}
              colour={INK.graphite}
              width={200}
              height={74}
              seed={1300}
              compact
              showIndices={false}
              pitchRange={[58, 81]}
            />
          </div>
        )}
      </div>

      <p
        key={state.id}
        className="pf-hand-sm"
        style={{
          color: isRecord ? "#8a8a83" : INK.cobalt,
          fontSize: 17,
          lineHeight: 1.28,
          animation: "pf-rail-in 420ms ease both",
        }}
      >
        {state.caption}
      </p>

      <style>{`
        @keyframes pf-rail-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
