"use client";

/* ---------------------------------------------------------------------------
   THE OPENING EXPERIMENT

   The reader hears before they read. Two conditions differ in one thing: the
   position of a single larger gap. Everything else — pitches, order, timbre,
   duration, gain — is held, and the held constants are printed, because a
   teaching stimulus that hides its controls is a demonstration, not evidence.
   ------------------------------------------------------------------------- */

import { useCallback, useEffect, useRef, useState } from "react";
import { FieldPlot, type PlotBoundary, type PlotGroup } from "./FieldPlot";
import { INK, Ring, pigment } from "./marks";
import { playEvents, type Ev } from "./audio";

export type StimulusPreset = {
  label: string;
  body: string;
  events: Ev[];
  variable: string;
  controls: string;
  colour: string;
  markers?: { after: number; label: string }[];
};

export function Stimulus({ presets, note, eventColours }: { presets: StimulusPreset[]; note: string; eventColours?: string[] }) {
  const [active, setActive] = useState(0);
  const [lit, setLit] = useState<number | null>(null);
  const [played, setPlayed] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const handle = useRef<{ stop: () => void } | null>(null);

  useEffect(() => () => handle.current?.stop(), []);

  const preset = presets[active];
  const colour = pigment(preset.colour);

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
        onEnd: () => {
          setLit(null);
          setRunning(false);
        },
      });
      handle.current = h;
      setRunning(Boolean(h));
      if (!h) setLit(null);
    },
    [presets],
  );

  const boundaries: PlotBoundary[] = (preset.markers ?? []).map((m) => ({
    after: m.after,
    label: m.label,
    colour,
  }));

  const groups: PlotGroup[] = (preset.markers ?? []).flatMap((m) => [
    { from: 0, to: m.after - 1, colour, row: 0 },
    { from: m.after, to: preset.events.length - 1, colour, row: 0 },
  ]);

  return (
    <div>
      <div
        style={{ position: "relative" }}
        className="pf-scroller"
        role="region"
        aria-label="Eight-event sound field"
        tabIndex={0}
      >
        <FieldPlot
          events={preset.events}
          eventColours={eventColours}
          groups={groups}
          boundaries={boundaries}
          lit={lit}
          played={played}
          colour={colour}
          width={980}
          height={276}
          seed={active === 0 ? 41 : 77}
          pitchRange={[58, 71]}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(18px, 3vw, 44px)",
          marginTop: 30,
          alignItems: "flex-start",
        }}
      >
        {presets.map((p, i) => {
          const c = pigment(p.colour);
          const on = i === active;
          return (
            <button
              key={p.label}
              type="button"
              className="pf-play"
              onClick={() => run(i)}
              style={{ position: "relative", paddingBottom: 6 }}
              aria-pressed={on}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  fontFamily: "var(--display)",
                  fontSize: "clamp(20px, 2vw, 27px)",
                  fontWeight: 500,
                  letterSpacing: "-0.015em",
                  color: on ? INK.charcoal : "#62625b",
                  transition: "color 200ms",
                }}
              >
                <svg width="19" height="21" viewBox="0 0 19 21" aria-hidden="true">
                  <path
                    d="M2.4 1.8 L16.6 10.4 L2.2 19.2 Z"
                    fill={on ? c : "none"}
                    stroke={on ? c : "#a9a9a2"}
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    fillOpacity={running && on ? 0.9 : 0.55}
                  />
                </svg>
                {p.label}
              </span>
              {on ? (
                <Ring
                  width={230}
                  height={44}
                  colour={c}
                  seed={i === 0 ? 301 : 302}
                  weight={1.3}
                  style={{
                    position: "absolute",
                    left: -14,
                    top: -8,
                    width: "calc(100% + 28px)",
                    height: "calc(100% + 12px)",
                    pointerEvents: "none",
                  }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
          gap: "clamp(20px, 3vw, 52px)",
        }}
        className="pf-stim-detail"
      >
        <div>
          <p className="pf-meta" style={{ color: colour, marginBottom: 9 }}>
            what changes · {preset.variable}
          </p>
          <p className="pf-body">{preset.body}</p>
        </div>
        <div>
          <p className="pf-meta" style={{ marginBottom: 9 }}>held constant</p>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11.5,
              lineHeight: 1.72,
              color: "var(--soft)",
              margin: 0,
            }}
          >
            {preset.controls}
          </p>
        </div>
      </div>

      <div className="pf-drawing-key">
        <span className="pf-meta">drawing key</span>
        <p className="pf-small">
          Each event keeps the same pencil hue in both conditions. The gap moves; the coloured trace does not.
        </p>
      </div>

      <p className="pf-note pf-note--warn" style={{ marginTop: 26, maxWidth: 640 }}>
        {note}
      </p>

      <style>{`
        @media (max-width: 760px) {
          .pf-stim-detail { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
