"use client";

/* ---------------------------------------------------------------------------
   WHEN CUES COMPETE — the loudest movement on the page.

   Three conditions. In the third, a temporal gap pulls the boundary one way
   while a register break pulls it the other. The reader can lean their
   attention toward either cue and watch the field reorganise underneath it.

   Boundary identity is fixed once and never moves: X is teal, Y is ochre,
   everywhere they appear. Consistent encoding is the only reason a reader can
   trust a comparison.

   Nothing the reader does here is recorded. The record is explicit that the
   conditions make cue competition observable without collecting a perceptual
   answer, and a page that quietly scored the reader would be making a claim
   the content does not support.
   ------------------------------------------------------------------------- */

import { useCallback, useEffect, useRef, useState } from "react";
import { FieldPlot, type PlotBoundary, type PlotGroup } from "./FieldPlot";
import { INK, Ring, Wash } from "./marks";
import { playEvents, type Ev } from "./audio";

export type ConflictPreset = {
  label: string;
  body: string;
  events: Ev[];
  variable: string;
  controls: string;
  markers?: { after: number; label: string }[];
};

const CUE = {
  X: { colour: INK.teal, name: "X", cue: "temporal gap" },
  Y: { colour: INK.ochre, name: "Y", cue: "register break" },
} as const;

type Lean = "both" | "X" | "Y";

export function ConflictLab({
  presets,
  question,
  note,
}: {
  presets: ConflictPreset[];
  question: string;
  note: string;
}) {
  const [active, setActive] = useState(0);
  const [lean, setLean] = useState<Lean>("both");
  const [lit, setLit] = useState<number | null>(null);
  const [played, setPlayed] = useState<number[]>([]);
  const handle = useRef<{ stop: () => void } | null>(null);

  useEffect(() => () => handle.current?.stop(), []);

  const preset = presets[active];
  const both = (preset.markers ?? []).length > 1;

  const run = useCallback(
    (index: number) => {
      handle.current?.stop();
      setActive(index);
      setPlayed([]);
      setLit(null);
      const p = presets[index];
      const h = playEvents(p.events, {
        onEvent: (i) => {
          setLit(i);
          setPlayed((prev) => (prev.includes(i) ? prev : [...prev, i]));
        },
        onEnd: () => setLit(null),
      });
      handle.current = h;
    },
    [presets],
  );

  const faded = (label: string) => both && lean !== "both" && lean !== label;

  const boundaries: PlotBoundary[] = (preset.markers ?? []).map((m) => ({
    after: m.after,
    label: m.label,
    colour: m.label === "Y" ? CUE.Y.colour : CUE.X.colour,
    faded: faded(m.label),
  }));

  const groups: PlotGroup[] = (preset.markers ?? []).flatMap((m, i) => {
    const colour = m.label === "Y" ? CUE.Y.colour : CUE.X.colour;
    const row = both ? i : 0;
    const f = faded(m.label);
    return [
      { from: 0, to: m.after - 1, colour, row, faded: f, label: i === 0 ? undefined : undefined },
      { from: m.after, to: preset.events.length - 1, colour, row, faded: f },
    ];
  });

  return (
    <div>
      <div className="pf-conflict">
        {/* ---- the three conditions, as an editorial list ------------------ */}
        <div>
          <p className="pf-meta" style={{ marginBottom: 18 }}>three conditions</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {presets.map((p, i) => {
              const on = i === active;
              const marks = (p.markers ?? []).map((m) => m.label).join(" + ");
              return (
                <button
                  key={p.label}
                  type="button"
                  className="pf-play"
                  onClick={() => run(i)}
                  aria-pressed={on}
                  style={{ position: "relative", padding: "11px 4px 13px" }}
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--display)",
                      fontSize: 21,
                      fontWeight: 500,
                      letterSpacing: "-0.015em",
                      color: on ? INK.charcoal : "#93938c",
                      lineHeight: 1.12,
                      transition: "color 180ms",
                    }}
                  >
                    {p.label}
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: 5,
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      color: on ? (marks.includes("+") ? INK.vermilion : marks === "Y" ? CUE.Y.colour : CUE.X.colour) : "#b3b3ac",
                    }}
                  >
                    boundary {marks || "—"}
                  </span>
                  {on ? (
                    <Ring
                      width={240}
                      height={54}
                      colour={INK.charcoal}
                      seed={410 + i}
                      weight={1}
                      opacity={0.5}
                      style={{
                        position: "absolute",
                        left: -10,
                        top: 2,
                        width: "calc(100% + 20px)",
                        height: "calc(100% - 4px)",
                        pointerEvents: "none",
                      }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <p className="pf-hand" style={{ marginTop: 26, color: INK.cobalt, fontSize: 24 }}>
            {question}
          </p>
          <p className="pf-small" style={{ marginTop: 8, fontSize: 13 }}>
            Nothing you decide here is collected or scored. There is no correct answer to submit.
          </p>
        </div>

        {/* ---- the field ---------------------------------------------------- */}
        <div style={{ position: "relative" }}>
          {both ? (
            <Wash
              width={560}
              height={260}
              colour={INK.vermilion}
              seed={888}
              opacity={0.17}
              blur={30}
              style={{
                position: "absolute",
                left: "22%",
                top: "2%",
                width: "54%",
                height: "82%",
                pointerEvents: "none",
              }}
            />
          ) : null}

          <div className="pf-scroller">
          <FieldPlot
            events={preset.events}
            groups={groups}
            boundaries={boundaries}
            lit={lit}
            played={played}
            colour={INK.graphite}
            width={640}
            height={264}
            seed={520 + active * 11}
            pitchRange={[58, 81]}
            guides={[{ pitch: 79, label: "register of the break in B and C" }]}
            axisNote="pitch axis held across all three conditions"
          />
          </div>

          {both ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 26, alignItems: "center" }}>
              <span className="pf-meta">lean your attention</span>
              {(
                [
                  ["X", `follow the ${CUE.X.cue}`, CUE.X.colour],
                  ["Y", `follow the ${CUE.Y.cue}`, CUE.Y.colour],
                  ["both", "hold both at once", INK.vermilion],
                ] as const
              ).map(([key, text, c]) => {
                const on = lean === key;
                return (
                  <button
                    key={key}
                    type="button"
                    className="pf-key"
                    onClick={() => setLean(key as Lean)}
                    aria-pressed={on}
                    style={{
                      fontFamily: "var(--print)",
                      fontSize: 16,
                      color: on ? c : "#a0a099",
                      borderBottom: on ? `1.5px solid ${c}` : "1.5px solid transparent",
                      paddingBottom: 2,
                      transition: "color 160ms",
                    }}
                  >
                    {text}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      {/* ---- condition detail ------------------------------------------------ */}
      <div className="pf-conflict-detail">
        <div>
          <p className="pf-meta" style={{ marginBottom: 9, color: INK.vermilion }}>
            what varies · {preset.variable}
          </p>
          <p className="pf-body">{preset.body}</p>
        </div>
        <div>
          <p className="pf-meta" style={{ marginBottom: 9 }}>documented controls</p>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11.5, lineHeight: 1.72, color: "var(--soft)", margin: 0 }}>
            {preset.controls}
          </p>
        </div>
      </div>

      <p className="pf-note pf-note--warn" style={{ marginTop: 28, maxWidth: 660 }}>{note}</p>

      <style>{`
        .pf-conflict {
          display: grid;
          grid-template-columns: 250px minmax(0, 1fr);
          gap: clamp(26px, 4vw, 66px);
          align-items: start;
        }
        .pf-conflict-detail {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          gap: clamp(20px, 3vw, 52px);
          margin-top: 40px;
        }
        @media (max-width: 860px) {
          .pf-conflict { grid-template-columns: minmax(0, 1fr); }
          .pf-conflict-detail { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>
    </div>
  );
}
