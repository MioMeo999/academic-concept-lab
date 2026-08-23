"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { AudioNote } from "@/content/types";

let activePlayback: (() => void) | null = null;
let activePlaybackOwner: symbol | null = null;

function frequencyFor(pitch: number) {
  return 440 * Math.pow(2, (pitch - 69) / 12);
}

function AudioPitchLine({ notes }: { notes: AudioNote[] }) {
  const pitches = notes.map((note) => note.pitch);
  const min = Math.min(...pitches, 60);
  const max = Math.max(...pitches, 72);
  const span = Math.max(max - min, 1);
  const points = notes.map((note, index) => {
    const x = 10 + (index / Math.max(notes.length - 1, 1)) * 180;
    const y = 34 - ((note.pitch - min) / span) * 24;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg className="music-pitch-line" viewBox="0 0 200 44" role="img" aria-label="Visual pitch contour of the example">
      <path d="M8 37c42 2 91 1 184 0" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".25" />
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      {notes.map((note, index) => {
        const x = 10 + (index / Math.max(notes.length - 1, 1)) * 180;
        const y = 34 - ((note.pitch - min) / span) * 24;
        return <circle key={`${note.pitch}-${index}`} cx={x} cy={y} r="2.8" fill="currentColor" />;
      })}
    </svg>
  );
}

export function AudioExample({
  label,
  notes,
  description,
  colour = "var(--teal)",
}: {
  label: string;
  notes: AudioNote[];
  description: string;
  colour?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<number | null>(null);
  const ownerRef = useRef<symbol>(Symbol("audio-example"));

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
    if (!AudioContextConstructor) {
      setUnavailable(true);
      return;
    }

    const context = contextRef.current ?? new AudioContextConstructor();
    contextRef.current = context;
    await context.resume();

    const start = context.currentTime + 0.03;
    let offset = 0;
    notes.forEach((note) => {
      const duration = Math.max(note.beats * 0.42, 0.08);
      const when = start + offset;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequencyFor(note.pitch), when);
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(0.16, when + Math.min(0.035, duration / 3));
      gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(when);
      oscillator.stop(when + duration + 0.02);
      sourcesRef.current.push(oscillator);
      offset += duration;
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
    }, offset * 1000 + 160);
  }, [notes, stop]);

  return (
    <div className="music-audio" style={{ "--music-colour": colour } as CSSProperties}>
      <div className="music-audio-top">
        <div>
          <p className="music-audio-label">{label}</p>
          <p className="music-audio-description">{description}</p>
        </div>
        <span className="music-audio-state" aria-live="polite">{playing ? "playing" : unavailable ? "audio unavailable" : "ready"}</span>
      </div>
      <AudioPitchLine notes={notes} />
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
