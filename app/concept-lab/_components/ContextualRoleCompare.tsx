"use client";

import { useState, type CSSProperties } from "react";
import type { TonalContext, TonalProbe } from "@/content/types";
import { AudioExample } from "./AudioExample";

function contextEnd(events: TonalContext["events"]) {
  return Math.max(...events.map((event) => event.start + event.duration), 0);
}

export function ContextualRoleCompare({ probe, contexts, description }: { probe: TonalProbe; contexts: TonalContext[]; description: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const context = contexts[selectedIndex] ?? contexts[0];
  if (!context) return null;
  const events = [...context.events, { pitch: probe.midi, start: contextEnd(context.events) + 0.5, duration: 0.5 }];

  return (
    <div className="tonal-role-compare" style={{ "--tonal-colour": context.colour } as CSSProperties}>
      <div className="tonal-interaction-heading"><div><p className="k">CONTROLLED COMPARISON</p><p className="tonal-interaction-title">Same note. Different home.</p><p className="tonal-interaction-description">{description}</p></div><span className="tonal-interaction-state" aria-live="polite">{String(selectedIndex + 1).padStart(2, "0")} / {String(contexts.length).padStart(2, "0")}</span></div>
      <div className="tonal-role-buttons" role="group" aria-label="Choose a tonal context">
        {contexts.map((option, index) => <button type="button" aria-pressed={index === selectedIndex} key={option.id} onClick={() => setSelectedIndex(index)}>{option.label}</button>)}
      </div>
      <div className="tonal-role-result" aria-live="polite">
        <div><span className="k">PHYSICAL PROBE HELD CONSTANT</span><strong>{probe.note}</strong><p>{context.body}</p><small>{context.controls}</small></div>
        <AudioExample key={`${context.id}-${probe.pitchClass}`} label={`${context.label} + ${probe.note}`} events={events} description={`Hear ${context.label}, then the same ${probe.note} probe.`} colour={context.colour} />
      </div>
      <div className="tonal-role-reading"><span className="k">CONTEXTUAL ROLE</span><strong>{context.role}</strong><p>{probe.body}</p></div>
      <details className="tonal-static-fallback"><summary>Read the comparison without audio</summary><p>{context.label}: {probe.note} functions as {context.role?.toLowerCase()}.</p><p><b>Changed:</b> tonal context. <b>Held constant:</b> probe pitch, register, timbre, loudness, context length, delay, and probe duration.</p></details>
    </div>
  );
}
