"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AudioEvent } from "@/content/types";

/* ---------------------------------------------------------------------------
   Synthetic tones for the redesigned music pages.

   The synthesis matches what each record's audio presets document in their
   `controls` text: triangle tones with a fixed 0.12 peak gain. One sound plays
   at a time across the whole page. While a sound plays, `at` follows the
   clock in seconds so a figure can draw a playhead — unless the reader has
   asked for reduced motion, in which case only `playing` changes and the
   figure stays still.
   ------------------------------------------------------------------------- */

let stopActive: (() => void) | null = null;

const freq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

export function useTones() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [at, setAt] = useState(0);
  const [unavailable, setUnavailable] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodes = useRef<OscillatorNode[]>([]);
  const timer = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  const stop = useCallback(() => {
    nodes.current.forEach((n) => { try { n.stop(); } catch { /* already stopped */ } n.disconnect(); });
    nodes.current = [];
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
    setPlaying(null);
    setAt(0);
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
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!still) {
      const tick = () => {
        setAt(Math.max(0, ctx.currentTime - t0));
        raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    }
    timer.current = window.setTimeout(() => {
      nodes.current = [];
      timer.current = null;
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = null;
      setPlaying(null);
      setAt(0);
    }, total * 1000 + 180);
  }, [stop]);

  return { play, stop, playing, at, unavailable };
}
