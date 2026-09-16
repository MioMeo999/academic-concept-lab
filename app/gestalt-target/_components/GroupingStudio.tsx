"use client";

import { useMemo, useRef, useState } from "react";

type EventPoint = { pitch: number; start: number; duration: number };
type Marker = { after: number; label: string };
type Preset = {
  label: string;
  body: string;
  events: EventPoint[];
  variable: string;
  controls: string;
  colour: string;
  markers?: Marker[];
};

type GroupingStudioProps = {
  opening: { presets: Preset[]; note: string };
  conflict: { presets: Preset[]; question: string; note: string };
};

const palette = ["#0b61ff", "#0aa58a", "#e64b3c", "#e8ab25"];

function midiToFrequency(pitch: number) {
  return 440 * Math.pow(2, (pitch - 69) / 12);
}

export function GroupingStudio({ opening, conflict }: GroupingStudioProps) {
  const [mode, setMode] = useState<"gap" | "conflict">("gap");
  const [selected, setSelected] = useState(0);
  const audioContext = useRef<AudioContext | null>(null);

  const presets = mode === "gap" ? opening.presets : conflict.presets;
  const active = presets[selected] ?? presets[0];
  const maxStart = Math.max(...active.events.map((event) => event.start + event.duration), 2);
  const minPitch = Math.min(...active.events.map((event) => event.pitch), 55) - 2;
  const maxPitch = Math.max(...active.events.map((event) => event.pitch), 80) + 2;
  const markerPositions = useMemo(() => {
    return (active.markers ?? []).map((marker) => {
      const event = active.events[marker.after - 1];
      const next = active.events[marker.after];
      const x = event && next ? ((event.start + event.duration / 2 + next.start) / 2 / maxStart) * 620 : 0;
      return { ...marker, x };
    });
  }, [active, maxStart]);
  const firstBoundary = markerPositions[0]?.x ?? 310;
  const secondBoundary = markerPositions[1]?.x ?? 0;

  function chooseMode(nextMode: "gap" | "conflict") {
    setMode(nextMode);
    setSelected(0);
  }

  function play() {
    if (typeof window === "undefined") return;
    const AudioContextCtor = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;
    const context = audioContext.current ?? new AudioContextCtor();
    audioContext.current = context;
    void context.resume();
    const startAt = context.currentTime + 0.04;
    active.events.forEach((event) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.value = midiToFrequency(event.pitch);
      gain.gain.setValueAtTime(0.0001, startAt + event.start);
      gain.gain.exponentialRampToValueAtTime(0.12, startAt + event.start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + event.start + event.duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(startAt + event.start);
      oscillator.stop(startAt + event.start + event.duration + 0.03);
    });
  }

  return (
    <section className="grouping-studio" aria-labelledby="studio-title">
      <div className="studio-topline">
        <div>
          <p className="eyebrow">A small sound experiment</p>
          <h2 id="studio-title">Same events. A different organisation.</h2>
        </div>
        <button className="play-button" type="button" onClick={play} aria-label={`Play ${active.label}`}>
          <span aria-hidden="true">▶</span> Play tones
        </button>
      </div>

      <div className="studio-switcher" role="group" aria-label="Choose the comparison">
        <button type="button" className={mode === "gap" ? "is-selected" : ""} aria-pressed={mode === "gap"} onClick={() => chooseMode("gap")}>
          Temporal spacing
        </button>
        <button type="button" className={mode === "conflict" ? "is-selected" : ""} aria-pressed={mode === "conflict"} onClick={() => chooseMode("conflict")}>
          Cue conflict
        </button>
      </div>

      <div className="studio-body">
        <div className="studio-controls" role="group" aria-label={`${mode === "gap" ? "Temporal spacing" : "Cue conflict"} conditions`}>
          {presets.map((preset, index) => (
            <button
              type="button"
              key={preset.label}
              className={selected === index ? "condition is-active" : "condition"}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <span className="condition-dot" style={{ backgroundColor: palette[index] }} aria-hidden="true" />
              <span>
                <strong>{preset.label}</strong>
                <small>{preset.variable}</small>
              </span>
            </button>
          ))}
        </div>

        <div className="studio-visual" role="group" tabIndex={0} aria-label="Scrollable sound-event diagram">
          <svg className="event-score" viewBox="0 0 700 280" role="img" aria-labelledby="score-title score-desc">
            <title id="score-title">A sequence of eight synthetic sound events</title>
            <desc id="score-desc">The selected condition is shown as coloured points on a field. Boundary candidates are marked between events.</desc>
            <ellipse cx={40 + firstBoundary / 2} cy="135" rx={Math.max(firstBoundary / 2 - 18, 52)} ry="86" className="score-group score-group-teal" />
            <ellipse cx={40 + (firstBoundary + 620) / 2} cy="135" rx={Math.max((620 - firstBoundary) / 2 - 18, 52)} ry="86" className="score-group score-group-red" />
            {secondBoundary > 0 && <ellipse cx={40 + (firstBoundary + secondBoundary) / 2} cy="135" rx={Math.max((secondBoundary - firstBoundary) / 2 - 14, 34)} ry="78" className="score-group score-group-gold" />}
            <line x1="40" y1="214" x2="660" y2="214" className="score-axis" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((tick) => (
              <line key={tick} x1={40 + (tick / 7) * 620} y1="210" x2={40 + (tick / 7) * 620} y2="218" className="score-tick" />
            ))}
            {active.events.map((event, index) => {
              const x = 40 + (event.start / maxStart) * 620;
              const y = 196 - ((event.pitch - minPitch) / (maxPitch - minPitch)) * 150;
              const next = active.events[index + 1];
              const nextX = next ? 40 + (next.start / maxStart) * 620 : x + 38;
              return (
                <g key={`${event.pitch}-${event.start}`}>
                  <line x1={x} y1={214} x2={x} y2={y + 8} className="event-stem" />
                  <circle cx={x} cy={y} r="8" className="event-point" />
                  {next && <line x1={x + 8} y1={y} x2={nextX - 8} y2={196 - ((next.pitch - minPitch) / (maxPitch - minPitch)) * 150} className="event-join" />}
                  <text x={x} y="245" textAnchor="middle" className="event-number">{String(index + 1).padStart(2, "0")}</text>
                </g>
              );
            })}
            {markerPositions.map((marker) => (
              <g key={`${marker.label}-${marker.after}`}>
                <line x1={40 + marker.x} y1="33" x2={40 + marker.x} y2="222" className="boundary-line" />
                <text x={40 + marker.x} y="22" textAnchor="middle" className="boundary-label">{marker.label}</text>
              </g>
            ))}
            <text x="40" y="270" className="axis-label">time →</text>
            <text x="660" y="270" textAnchor="end" className="axis-label">same synthetic palette · selected condition</text>
          </svg>
          <div className="studio-caption" aria-live="polite">
            <p><strong>{active.label}</strong> {active.body}</p>
            <p className="caption-meta"><span className="provenance provenance-teaching">▲</span> {active.controls}</p>
          </div>
        </div>
      </div>
      <p className="studio-note"><span className="provenance provenance-teaching">▲</span> {mode === "gap" ? opening.note : conflict.note}</p>
      {mode === "conflict" && <p className="studio-question">{conflict.question}</p>}
    </section>
  );
}
