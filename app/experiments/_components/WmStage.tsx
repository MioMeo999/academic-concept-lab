"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AudioEvent, AudioPreset } from "@/content/types";
import { accent, solidFill, type Accent } from "./wm";

/* ---------------------------------------------------------------------------
   The interaction stage.

   The educational contract is copied from the production component and must
   not drift: a named set of controlled presets, the manipulated variable and
   the held constants stated in words, a visual timeline that shows the timing
   as timing, marked candidate boundaries, and a text route to everything for
   anyone who cannot or will not play audio.

   What is new is only the presentation: a wide low-chrome stage, colour-filled
   preset controls, bars instead of dots so a 480 ms gap is visible as a gap,
   and the boundary labels written by hand.
   ------------------------------------------------------------------------- */

let activePlayback: (() => void) | null = null;
let activePlaybackOwner: symbol | null = null;

function frequencyFor(pitch: number) {
  return 440 * Math.pow(2, (pitch - 69) / 12);
}

const W = 720;
const PAD_L = 30;
const PAD_R = 18;
const TOP = 34;
const BOTTOM = 116;
const BAR = 15;

function Track({ events, markers, tone }: { events: AudioEvent[]; markers?: { after: number; label: string }[]; tone: Accent }) {
  const pitches = events.map((event) => event.pitch);
  const min = Math.min(...pitches);
  const max = Math.max(...pitches);
  const span = Math.max(max - min, 1);
  const total = Math.max(...events.map((event) => event.start + event.duration), 1);
  const scaleX = (t: number) => PAD_L + (t / total) * (W - PAD_L - PAD_R);
  const y = (pitch: number) => TOP + (1 - (pitch - min) / span) * (BOTTOM - TOP - BAR);

  const markerText = markers?.length
    ? `; candidate boundaries marked ${markers.map((m) => `${m.label} after event ${String(m.after).padStart(2, "0")}`).join(" and ")}`
    : "";

  return (
    <svg
      viewBox={`0 0 ${W} 168`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Timeline of ${events.length} events. Horizontal position is time, vertical position is pitch, and each bar is one tone${markerText}.`}
      style={accent(tone)}
    >
      <line x1={PAD_L - 8} x2={W - PAD_R + 4} y1={BOTTOM + 12} y2={BOTTOM + 12} stroke="var(--wm-line)" strokeWidth={1.5} />

      {events.map((event, index) => {
        const x = scaleX(event.start);
        const w = Math.max(scaleX(event.start + event.duration) - x, 8);
        return (
          <g key={`${event.pitch}-${event.start}-${index}`}>
            <rect x={x} y={y(event.pitch)} width={w} height={BAR} rx={3} fill="var(--wm-c)" />
            <text x={x + w / 2} y={BOTTOM + 30} textAnchor="middle" fontSize={13} fill="var(--wm-mute)" fontFamily="ui-monospace, Consolas, monospace">
              {String(index + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}

      {(markers ?? []).map((marker) => {
        const left = events[marker.after - 1];
        const right = events[marker.after];
        const time = right ? (left.start + left.duration + right.start) / 2 : (left?.start ?? 0) + (left?.duration ?? 0);
        const x = scaleX(time);
        return (
          <g key={`${marker.after}-${marker.label}`}>
            <line x1={x} x2={x} y1={20} y2={BOTTOM + 18} stroke="var(--wm-ink)" strokeWidth={1.6} strokeDasharray="5 4" />
            <text x={x} y={16} textAnchor="middle" fontSize={24} fill="var(--wm-c-ink)" fontFamily="'Patrick Hand', cursive">
              {marker.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function WmStage({
  title,
  description,
  presets,
  tones,
}: {
  title: string;
  description: string;
  presets: AudioPreset[];
  /** experiment accent per preset, in the same order */
  tones: Accent[];
}) {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<number | null>(null);
  const ownerRef = useRef<symbol>(Symbol("wm-stage"));

  const preset = presets[selected] ?? presets[0];
  const tone = tones[selected] ?? "ink";

  const stop = useCallback(() => {
    sourcesRef.current.forEach((source) => {
      try { source.stop(); } catch { /* already stopped */ }
      source.disconnect();
    });
    sourcesRef.current = [];
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setPlaying(false);
    if (activePlaybackOwner === ownerRef.current) {
      activePlayback = null;
      activePlaybackOwner = null;
    }
  }, []);

  useEffect(() => () => {
    stop();
    contextRef.current?.close();
  }, [stop]);

  const play = useCallback(async () => {
    activePlayback?.();
    stop();

    const events = preset?.events ?? [];
    const AudioContextConstructor = window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor || !events.length) {
      setUnavailable(true);
      return;
    }

    const context = contextRef.current ?? new AudioContextConstructor();
    contextRef.current = context;
    try {
      await context.resume();
    } catch {
      setUnavailable(true);
      return;
    }

    const start = context.currentTime + 0.03;
    events.forEach((event) => {
      const duration = Math.max(event.duration, 0.08);
      const when = start + Math.max(event.start, 0);
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequencyFor(event.pitch), when);
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(0.12, when + Math.min(0.035, duration / 3));
      gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(when);
      oscillator.stop(when + duration + 0.02);
      sourcesRef.current.push(oscillator);
    });

    activePlayback = stop;
    activePlaybackOwner = ownerRef.current;
    setPlaying(true);
    timerRef.current = window.setTimeout(() => {
      sourcesRef.current = [];
      timerRef.current = null;
      setPlaying(false);
      if (activePlaybackOwner === ownerRef.current) {
        activePlayback = null;
        activePlaybackOwner = null;
      }
    }, (Math.max(...events.map((event) => event.start + event.duration), 0) * 1000) + 180);
  }, [preset, stop]);

  if (!preset) return null;

  return (
    <div className="wm-stage" style={accent(tone)}>
      <div className="wm-stage-head">
        <div>
          <span className="wm-label">Controlled presets</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="wm-stage-count" aria-live="polite">
          {String(selected + 1).padStart(2, "0")} / {String(presets.length).padStart(2, "0")}
        </span>
      </div>

      <div className="wm-tabs" role="group" aria-label={`${title} presets`}>
        {presets.map((option, index) => (
          <button
            key={option.label}
            type="button"
            className="wm-tab"
            style={{ ["--wm-tab-c" as string]: solidFill(tones[index] ?? "ink") }}
            aria-pressed={index === selected}
            onClick={() => { stop(); setSelected(index); }}
          >
            <span className="dot" aria-hidden="true" />
            {option.label}
          </button>
        ))}
      </div>

      <dl className="wm-spec wm-stage-spec" style={{ marginTop: "1.15rem" }}>
        <div className="wm-spec-row">
          <dt>Manipulated</dt>
          <dd aria-live="polite">{preset.variable}</dd>
        </div>
        <div className="wm-spec-row">
          <dt>Held constant</dt>
          <dd>{preset.controls}</dd>
        </div>
      </dl>

      <div className="wm-track">
        <Track key={preset.label} events={preset.events} markers={preset.markers} tone={tone} />
        <div className="wm-track-legend">
          <span>← time →</span>
          <span>↑ pitch</span>
          <span>dashed rule = candidate boundary</span>
        </div>
      </div>

      <div className="wm-controls">
        <button type="button" className="wm-play" onClick={() => void play()} aria-label={`${playing ? "Replay" : "Play"} ${preset.label}`}>
          {playing ? "Replay" : "Play"}
        </button>
        <button type="button" className="wm-stop" onClick={stop} disabled={!playing}>Stop</button>
        <span className="wm-state" aria-live="polite">{playing ? "playing" : unavailable ? "audio unavailable" : "ready"}</span>
      </div>

      <details className="wm-details">
        <summary>Read the perceptual alternatives instead</summary>
        <p>{preset.body}</p>
        <p><b>Manipulated:</b> {preset.variable}</p>
        <p><b>Held constant:</b> {preset.controls}</p>
      </details>
    </div>
  );
}
