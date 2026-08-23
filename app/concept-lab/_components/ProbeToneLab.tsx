"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { TonalContext, TonalProbe } from "@/content/types";
import { AudioExample } from "./AudioExample";

function contextEnd(events: TonalContext["events"]) {
  return Math.max(...events.map((event) => event.start + event.duration), 0);
}

function contextAndProbe(context: TonalContext, probe: TonalProbe) {
  return [...context.events, { pitch: probe.midi, start: contextEnd(context.events) + 0.5, duration: 0.5 }];
}

export function ProbeToneLab({
  title = "Probe-Tone Lab",
  description,
  context,
  probes,
  allowRatings = false,
  showRoles = true,
}: {
  title?: string;
  description: string;
  context: TonalContext;
  probes: TonalProbe[];
  allowRatings?: boolean;
  showRoles?: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [revealed, setRevealed] = useState(showRoles);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const selected = probes[selectedIndex] ?? probes[0];
  const sequence = useMemo(() => selected ? contextAndProbe(context, selected) : [], [context, selected]);
  if (!selected) return null;

  const ratedCount = Object.keys(ratings).length;

  return (
    <div className="tonal-probe-lab" style={{ "--tonal-colour": context.colour } as CSSProperties}>
      <div className="tonal-interaction-heading">
        <div>
          <p className="k">constructed method reconstruction</p>
          <p className="tonal-interaction-title">{title}</p>
          <p className="tonal-interaction-description">{description}</p>
        </div>
        <span className="tonal-interaction-state" aria-live="polite">{String(selectedIndex + 1).padStart(2, "0")} / {String(probes.length).padStart(2, "0")}</span>
      </div>

      <div className="tonal-context-panel">
        <div>
          <span className="k">TONAL CONTEXT</span>
          <strong>{context.label}</strong>
          <p>{context.body}</p>
          <small>{context.controls}</small>
        </div>
        <AudioExample label="Play context" events={context.events} description="Hear the context before choosing a probe." colour={context.colour} />
      </div>

      <div className="tonal-probe-grid" role="group" aria-label={`${title} probe tones`}>
        {probes.map((probe, index) => (
          <button
            type="button"
            className="tonal-probe-button"
            aria-pressed={index === selectedIndex}
            aria-label={`Choose ${probe.note}, ${probe.pitchClass}`}
            key={probe.pitchClass}
            onClick={() => { setSelectedIndex(index); if (!showRoles) setRevealed(false); }}
          >
            <span>{probe.note}</span>
            <small>{probe.pitchClass}</small>
          </button>
        ))}
      </div>

      <div className="tonal-selected-probe" aria-live="polite">
        <div className="tonal-selected-probe-heading">
          <div>
            <span className="k">PROBE TONE</span>
            <strong>{selected.note}</strong>
          </div>
          <span className="tonal-probe-question">How well does this tone fit what you just heard?</span>
        </div>
        <AudioExample key={`${context.id}-${selected.pitchClass}`} label="Context + probe" events={sequence} description={`Hear ${context.label}, then the ${selected.note} probe.`} colour={selected.colour} />
        {allowRatings && (
          <div className="tonal-rating-panel">
            <span className="k">RATE FIT — OPTIONAL</span>
            <p>1 = weak fit · 7 = strong fit. This is a teaching comparison, not a measure of musical ability.</p>
            <div className="tonal-rating-buttons" role="group" aria-label={`Optional fit rating for ${selected.note}`}>
              {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                <button type="button" aria-pressed={ratings[selected.pitchClass] === rating} key={rating} onClick={() => setRatings((current) => ({ ...current, [selected.pitchClass]: rating }))}>{rating}</button>
              ))}
            </div>
          </div>
        )}
        {!showRoles && !revealed && <button type="button" className="tonal-reveal-button" onClick={() => setRevealed(true)}>Reveal a teaching interpretation</button>}
        {(showRoles || revealed) && <div className="tonal-role-reveal"><span className="k">TEACHING INTERPRETATION</span><strong>{selected.role}</strong><p>{selected.body}</p></div>}
      </div>

      {allowRatings && ratedCount > 0 && (
        <div className="tonal-exploratory-profile" aria-label="Your exploratory profile">
          <div className="tonal-profile-heading"><span className="k">YOUR EXPLORATORY PROFILE</span><span>{ratedCount} of {probes.length} probes rated</span></div>
          <p>This local pattern is learner-generated teaching data, not a published tonal hierarchy or diagnostic score.</p>
          <div className="tonal-personal-bars">
            {probes.map((probe) => <div className="tonal-personal-bar" key={probe.pitchClass}><span>{probe.note}</span><i style={{ "--tonal-profile-width": `${(ratings[probe.pitchClass] ?? 0) * 14.28}%` } as CSSProperties} /><small>{ratings[probe.pitchClass] ?? "—"}</small></div>)}
          </div>
        </div>
      )}

      <details className="tonal-static-fallback">
        <summary>Read the context and probe method</summary>
        <p><b>Context:</b> {context.body}</p>
        <p><b>Probe:</b> {selected.note} ({selected.pitchClass}). {selected.body}</p>
        <p><b>Held constant:</b> {context.controls}</p>
      </details>
    </div>
  );
}
