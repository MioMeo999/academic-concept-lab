"use client";

/* ---------------------------------------------------------------------------
   THE FIRST PENCIL MARK

   This is a constructed teaching interaction, not a perceptual test. The
   reader makes a provisional grouping claim by placing a boundary, then
   changes the lens through which the same eight events are read. The content
   stays honest: no answer is scored, and no grouping is presented as a fact.
   ------------------------------------------------------------------------- */

import { useMemo, useState } from "react";
import type { PlotEvent } from "./FieldPlot";
import { EventMark, Hatch, INK, Ring, SpanBracket } from "./marks";

type Lens = "proximity" | "similarity" | "whole";

const LENSES: Record<Lens, {
  label: string;
  short: string;
  colour: string;
  prompt: string;
  explanation: string;
}> = {
  proximity: {
    label: "Proximity",
    short: "start with the space",
    colour: INK.teal,
    prompt: "Try a boundary. Click one of the gaps below.",
    explanation: "A longer interval can offer a boundary, but it does not force every listener to hear one there.",
  },
  similarity: {
    label: "Similarity",
    short: "follow the likeness",
    colour: INK.magenta,
    prompt: "Now ignore the space. Which events want to travel together?",
    explanation: "Repeated pitches are circled in pairs. Likeness can pull events together even when time points elsewhere.",
  },
  whole: {
    label: "Whole / part",
    short: "let the context move",
    colour: INK.ochre,
    prompt: "Move the boundary. Watch one event change its role.",
    explanation: "The event stays the same; its role can change with the whole it is organised into.",
  },
};

function repeatedGroups(events: PlotEvent[]) {
  const groups = new Map<number, number[]>();
  events.forEach((event, index) => {
    const group = groups.get(event.pitch) ?? [];
    group.push(index);
    groups.set(event.pitch, group);
  });
  return Array.from(groups.values()).filter((group) => group.length > 1);
}

export function GroupingPlayground({ events, colours }: { events: PlotEvent[]; colours: string[] }) {
  const [lens, setLens] = useState<Lens>("proximity");
  const [boundary, setBoundary] = useState(4);
  const current = LENSES[lens];
  const repeated = useMemo(() => repeatedGroups(events), [events]);

  const eventLabel = (index: number) => `event ${String(index + 1).padStart(2, "0")}`;
  const boundaryText = `after ${eventLabel(boundary - 1)}`;

  return (
    <section className="pf-playground" aria-labelledby="first-pencil-mark">
      <Hatch
        width={640}
        height={76}
        colour={current.colour}
        seed={760 + boundary}
        angle={-24}
        gap={3.2}
        opacity={0.15}
        style={{ position: "absolute", left: "-4%", top: 14, width: "56%", height: 80, pointerEvents: "none" }}
      />

      <div className="pf-playground-head">
        <div>
          <p className="pf-meta" style={{ color: current.colour, marginBottom: 10 }}>the first pencil mark</p>
          <h2 id="first-pencil-mark" className="pf-h2" style={{ maxWidth: "12ch" }}>
            Make a grouping claim.
          </h2>
        </div>
        <p className="pf-playground-intro">
          A group is not printed inside the sound. It is a possibility you draw into the relations between events.
        </p>
      </div>

      <div className="pf-playground-lenses" role="group" aria-label="Choose a way to look at the events">
        {(Object.keys(LENSES) as Lens[]).map((key) => {
          const option = LENSES[key];
          const active = key === lens;
          return (
            <button
              key={key}
              type="button"
              className="pf-playground-lens"
              aria-pressed={active}
              onClick={() => setLens(key)}
              style={{ color: active ? option.colour : "var(--soft)" }}
            >
              <span className="pf-playground-lens-dot" style={{ backgroundColor: option.colour }} aria-hidden="true" />
              <span>
                <strong>{option.label}</strong>
                <small>{option.short}</small>
              </span>
            </button>
          );
        })}
      </div>

      <div
        className={`pf-playground-board pf-playground-board--${lens}`}
        style={{ borderLeftColor: current.colour }}
      >
        <div className="pf-playground-board-copy">
          <p className="pf-meta" style={{ color: current.colour, marginBottom: 9 }}>looking through · {current.label}</p>
          <p className="pf-playground-prompt">{current.prompt}</p>
          <p className="pf-small" aria-live="polite">{current.explanation}</p>
        </div>

        <div
          className="pf-sketch"
          role="region"
          aria-label={`Eight sound events read through ${current.label}`}
          tabIndex={0}
        >
          <div className="pf-sketch-events">
            {events.map((event, index) => {
              const isWholePart = lens === "whole" && index === 3;
              const isRepeated = lens === "similarity" && repeated.some((group) => group.includes(index));
              const colour = colours[index] ?? INK.graphite;
              return (
                <div key={`${event.pitch}-${index}`} className="pf-sketch-event" style={{ gridColumn: `${index * 2 + 1}` }}>
                  <span className="pf-sketch-mark">
                    <EventMark size={38} colour={colour} seed={820 + index * 7} filled />
                    {isRepeated ? (
                      <Ring
                        width={54}
                        height={54}
                        colour={index % 2 === 0 ? INK.magenta : INK.violet}
                        seed={850 + index}
                        weight={1.3}
                        style={{ position: "absolute", inset: -8, width: 54, height: 54, pointerEvents: "none" }}
                      />
                    ) : null}
                    {isWholePart ? (
                      <Ring
                        width={62}
                        height={62}
                        colour={INK.ochre}
                        seed={884}
                        weight={1.5}
                        style={{ position: "absolute", inset: -12, width: 62, height: 62, pointerEvents: "none" }}
                      />
                    ) : null}
                  </span>
                  <span className="pf-sketch-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="pf-sketch-pitch">{event.pitch}</span>
                </div>
              );
            })}
          </div>

          <div className="pf-sketch-gaps" role="group" aria-label="Place a boundary between events">
            {events.slice(0, -1).map((_, index) => {
              const after = index + 1;
              const active = after === boundary;
              return (
                <button
                  key={after}
                  type="button"
                  className={`pf-sketch-gap${active ? " is-active" : ""}`}
                  style={{ gridColumn: `${after * 2}`, color: current.colour }}
                  aria-pressed={active}
                  aria-label={`Draw a boundary after ${eventLabel(index)}`}
                  onClick={() => setBoundary(after)}
                >
                  <span className="pf-sketch-gap-stroke" style={{ backgroundColor: active ? current.colour : "var(--hair)" }} aria-hidden="true" />
                  {active ? <span className="pf-sketch-gap-label">your line</span> : null}
                </button>
              );
            })}
          </div>

          <div className="pf-sketch-brackets" aria-hidden="true">
            <SpanBracket
              width={320}
              colour={current.colour}
              seed={900 + boundary}
              style={{ gridColumn: `1 / span ${boundary * 2 - 1}`, width: "100%", height: 20 }}
            />
            <SpanBracket
              width={320}
              colour={current.colour}
              seed={930 + boundary}
              style={{ gridColumn: `${boundary * 2 + 1} / span ${(events.length - boundary) * 2 - 1}`, width: "100%", height: 20 }}
            />
          </div>

          <p className="pf-sketch-reading" aria-live="polite">
            <span style={{ color: current.colour }}>you drew a provisional boundary {boundaryText}</span>
            <span>not an answer · a way of looking</span>
          </p>
        </div>
      </div>

      <p className="pf-playground-foot">
        The drawing changes the reading, not the sound. That distinction is the beginning of perceptual organisation.
      </p>
    </section>
  );
}
