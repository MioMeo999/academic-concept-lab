"use client";

import { useEffect, useRef, useState } from "react";
import type { AudioEvent } from "@/content/types";

export function Audio({ events, label = "Listen", peakGain = 0.12 }: { events: AudioEvent[]; label?: string; peakGain?: number }) {
  const current = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const generation = useRef(0);
  const [status, setStatus] = useState("Ready to listen");
  const [playing, setPlaying] = useState(false);
  function cancel() {
    generation.current += 1;
    if (timer.current) clearTimeout(timer.current);
    if (current.current) void current.current.close().catch(() => {});
    current.current = null;
  }
  useEffect(() => () => cancel(), []);
  async function play() {
    cancel();
    const ticket = generation.current;
    try {
      const context = new AudioContext();
      current.current = context;
      await context.resume();
      if (ticket !== generation.current) return;
      const origin = context.currentTime + 0.05;
      for (const event of events) {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "triangle";
        oscillator.frequency.value = 440 * 2 ** ((event.pitch - 69) / 12);
        gain.gain.setValueAtTime(0, origin + event.start);
        gain.gain.linearRampToValueAtTime(peakGain, origin + event.start + 0.012);
        gain.gain.setValueAtTime(peakGain, origin + event.start + Math.max(0.012, event.duration - 0.055));
        gain.gain.linearRampToValueAtTime(0, origin + event.start + event.duration);
        oscillator.connect(gain); gain.connect(context.destination);
        oscillator.start(origin + event.start);
        oscillator.stop(origin + event.start + event.duration + 0.01);
      }
      setPlaying(true); setStatus("Playing the constructed example");
      const duration = Math.max(...events.map(event => event.start + event.duration));
      timer.current = setTimeout(() => {
        if (ticket !== generation.current) return;
        cancel(); setPlaying(false); setStatus("Playback complete. The written explanation remains below.");
      }, (duration + 0.15) * 1000);
    } catch {
      cancel(); setPlaying(false); setStatus("Audio is unavailable. All conditions and relationships are described in text.");
    }
  }
  return <div className="b2-audio"><button type="button" onClick={play} disabled={playing}><span aria-hidden="true">▷</span> {label}</button><button type="button" disabled={!playing} onClick={() => { cancel(); setPlaying(false); setStatus("Playback stopped"); }}>Stop</button><span className="b2-audio-status" role="status">{status}</span></div>;
}
