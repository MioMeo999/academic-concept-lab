"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { AudioEvent, AudioMarker, AudioNote } from "@/content/types";

let activePlayback: (() => void) | null = null;
let activePlaybackOwner: symbol | null = null;

function frequencyFor(pitch: number) {
  return 440 * Math.pow(2, (pitch - 69) / 12);
}

function notesToEvents(notes: AudioNote[]): AudioEvent[] {
  let start = 0;
  return notes.map((note) => {
    const duration = Math.max(note.beats * 0.42, 0.08);
    const event = { pitch: note.pitch, start, duration };
    start += duration;
    return event;
  });
}

function AudioPitchLine({ events, markers = [] }: { events: AudioEvent[]; markers?: AudioMarker[] }) {
  const pitches = events.map((event) => event.pitch);
  const min = Math.min(...pitches, 60);
  const max = Math.max(...pitches, 72);
  const span = Math.max(max - min, 1);
  const total = Math.max(...events.map((event) => event.start + event.duration), 1);
  const points = events.map((event) => {
    const x = 10 + ((event.start + event.duration / 2) / total) * 180;
    const y = 34 - ((event.pitch - min) / span) * 24;
    return `${x},${y}`;
  }).join(" ");

  const markerDescription = markers.length ? `; marked boundaries: ${markers.map((marker) => marker.label).join(", ")}` : "";

  return (
    <svg className="music-pitch-line" viewBox="0 0 200 44" role="img" aria-label={`Visual pitch contour of the example${markerDescription}`}>
      <path d="M8 37c42 2 91 1 184 0" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".25" />
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      {events.map((event, index) => {
        const x = 10 + ((event.start + event.duration / 2) / total) * 180;
        const y = 34 - ((event.pitch - min) / span) * 24;
        return <circle key={`${event.pitch}-${event.start}-${index}`} cx={x} cy={y} r="2.8" fill="currentColor" />;
      })}
      {markers.map((marker) => {
        const left = events[marker.after - 1];
        const right = events[marker.after];
        const time = right ? (left.start + right.start) / 2 : (left?.start ?? 0) + (left?.duration ?? 0);
        const x = 10 + (time / total) * 180;
        return (
          <g key={`${marker.after}-${marker.label}`}>
            <line x1={x} x2={x} y1="6" y2="39" stroke={marker.colour ?? "var(--red)"} strokeWidth="1.5" strokeDasharray="3 2" />
            <text x={x} y="5" textAnchor="middle" fill={marker.colour ?? "currentColor"} fontSize="5" fontFamily="var(--cat)">{marker.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function AudioExample({
  label,
  notes,
  events,
  description,
  colour = "var(--teal)",
  markers,
}: {
  label: string;
  notes?: AudioNote[];
  events?: AudioEvent[];
  description: string;
  colour?: string;
  markers?: AudioMarker[];
}) {
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<number | null>(null);
  const ownerRef = useRef<symbol>(Symbol("audio-example"));
  const scheduledEvents = events ?? notesToEvents(notes ?? []);

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

    const AudioContextConstructor = window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor || !scheduledEvents.length) {
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
    scheduledEvents.forEach((event) => {
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
    }, (Math.max(...scheduledEvents.map((event) => event.start + event.duration), 0) * 1000) + 180);
  }, [scheduledEvents, stop]);

  return (
    <div className="music-audio" style={{ "--music-colour": colour } as CSSProperties}>
      <div className="music-audio-top">
        <div>
          <p className="music-audio-label">{label}</p>
          <p className="music-audio-description">{description}</p>
        </div>
        <span className="music-audio-state" aria-live="polite">{playing ? "playing" : unavailable ? "audio unavailable" : "ready"}</span>
      </div>
      <AudioPitchLine events={scheduledEvents} markers={markers} />
      <div className="music-audio-controls">
        <button type="button" className="music-audio-play" onClick={() => void play()} aria-label={`${playing ? "Replay" : "Play"} ${label}`}>
          {playing ? "Replay" : "Play"}
        </button>
        <button type="button" className="music-audio-stop" onClick={stop} disabled={!playing}>Stop</button>
      </div>
      <p className="music-audio-fallback"><b>Hear it as a contour:</b> {description}</p>
    </div>
  );
}
