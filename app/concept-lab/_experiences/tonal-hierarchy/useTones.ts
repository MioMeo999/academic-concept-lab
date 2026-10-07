"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AudioEvent, TonalContext } from "@/content/types";

/* Synthetic tones for the tonal-hierarchy lab. The synthesis matches what the
   record's contexts document in their `controls` text: triangle tones, a
   fixed 0.12 peak gain, the probe arriving 500 ms after the context ends and
   held for 500 ms. One sound plays at a time across the page. */

let stopActive: (() => void) | null = null;

const freq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

export function contextThenProbe(context: TonalContext, midi: number): AudioEvent[] {
  const end = Math.max(...context.events.map((e) => e.start + e.duration), 0);
  return [...context.events, { pitch: midi, start: end + 0.5, duration: 0.5 }];
}

export function useTones() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodes = useRef<OscillatorNode[]>([]);
  const timer = useRef<number | null>(null);

  const stop = useCallback(() => {
    nodes.current.forEach((n) => { try { n.stop(); } catch { /* already stopped */ } n.disconnect(); });
    nodes.current = [];
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    setPlaying(null);
  }, []);

  useEffect(() => () => { stop(); ctxRef.current?.close(); }, [stop]);

  const play = useCallback(async (id: string, events: AudioEvent[]) => {
    stopActive?.();
    stop();
    const Ctor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor || !events.length) { setUnavailable(true); return; }
    const ctx = ctxRef.current ?? new Ctor();
    ctxRef.current = ctx;
    try { await ctx.resume(); } catch { setUnavailable(true); return; }
    const t0 = ctx.currentTime + 0.03;
    for (const e of events) {
      const d = Math.max(e.duration, 0.08);
      const when = t0 + Math.max(e.start, 0);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq(e.pitch), when);
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(0.12, when + Math.min(0.035, d / 3));
      gain.gain.exponentialRampToValueAtTime(0.0001, when + d);
      osc.connect(gain).connect(ctx.destination);
      osc.start(when);
      osc.stop(when + d + 0.02);
      nodes.current.push(osc);
    }
    stopActive = stop;
    setPlaying(id);
    const total = Math.max(...events.map((e) => e.start + e.duration), 0);
    timer.current = window.setTimeout(() => { nodes.current = []; timer.current = null; setPlaying(null); }, total * 1000 + 180);
  }, [stop]);

  return { play, stop, playing, unavailable };
}
