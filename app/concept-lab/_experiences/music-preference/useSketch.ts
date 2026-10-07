"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SKETCH_SECONDS, sketch, type Quality, type Voice } from "./sound";

/* ---------------------------------------------------------------------------
   Hear a sketch.

   A short synthesised sound with the character the record paraphrases for one
   of the five qualities. Nothing plays until the reader asks; every sketch is
   quiet, runs for the same length, and goes through a compressor so the
   loudest cannot surprise anyone. It is not one of the study's excerpts.
   ------------------------------------------------------------------------- */

export type SketchState = "idle" | "playing" | "unavailable";

const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

/** a soft-clipping curve: the more drive, the more the wave is squared off */
const driveCurve = (drive: number) => {
  const curve = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    const x = (i / 255) * 2 - 1;
    curve[i] = Math.tanh(drive * x) / Math.tanh(drive);
  }
  return curve;
};

function voice(ctx: AudioContext, out: AudioNode, noise: AudioBuffer, v: Voice, start: number) {
  const t = start + v.t;
  const env = ctx.createGain();
  env.connect(out);
  const attack = v.attack ?? 0.01;
  const release = v.release ?? 0.08;
  if (v.kind === "kick") {
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(48, t + 0.12);
    env.gain.setValueAtTime(v.gain, t);
    env.gain.exponentialRampToValueAtTime(0.0001, t + v.dur);
    osc.connect(env);
    osc.start(t);
    osc.stop(t + v.dur + 0.02);
    return;
  }
  if (v.kind === "hat") {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const high = ctx.createBiquadFilter();
    high.type = "highpass";
    high.frequency.value = 6500;
    env.gain.setValueAtTime(v.gain, t);
    env.gain.exponentialRampToValueAtTime(0.0001, t + v.dur);
    src.connect(high);
    high.connect(env);
    src.start(t, 0, v.dur + 0.02);
    return;
  }
  const osc = ctx.createOscillator();
  osc.type = v.wave ?? "sine";
  osc.frequency.value = hz(v.midi ?? 60);
  let node: AudioNode = osc;
  if (v.drive) {
    const shaper = ctx.createWaveShaper();
    shaper.curve = driveCurve(v.drive);
    osc.connect(shaper);
    node = shaper;
  }
  node.connect(env);
  env.gain.setValueAtTime(0.0001, t);
  env.gain.linearRampToValueAtTime(v.gain, t + attack);
  env.gain.setValueAtTime(v.gain, Math.max(t + attack, t + v.dur - 0.01));
  env.gain.linearRampToValueAtTime(0.0001, t + v.dur + release);
  osc.start(t);
  osc.stop(t + v.dur + release + 0.02);
}

export function useSketch() {
  const [state, setState] = useState<SketchState>("idle");
  const [playing, setPlaying] = useState<Quality | null>(null);
  const [at, setAt] = useState(0);
  const ctxRef = useRef<AudioContext | null>(null);
  const frame = useRef(0);
  const timer = useRef(0);

  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
    window.clearTimeout(timer.current);
    const ctx = ctxRef.current;
    ctxRef.current = null;
    if (ctx) void ctx.close().catch(() => {});
    setPlaying(null);
    setAt(0);
    setState((s) => (s === "unavailable" ? s : "idle"));
  }, []);

  const play = useCallback((quality: Quality) => {
    stop();
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) throw new Error("no audio");
      const ctx = new Ctx();
      ctxRef.current = ctx;
      const out = ctx.createDynamicsCompressor();
      out.threshold.value = -18;
      out.ratio.value = 6;
      out.connect(ctx.destination);
      const noise = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.2), ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const start = ctx.currentTime + 0.06;
      for (const v of sketch(quality)) voice(ctx, out, noise, v, start);
      const began = performance.now();
      setPlaying(quality);
      setState("playing");
      const tick = () => {
        const s = (performance.now() - began) / 1000;
        setAt(Math.min(s, SKETCH_SECONDS));
        if (s < SKETCH_SECONDS) frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
      timer.current = window.setTimeout(stop, (SKETCH_SECONDS + 0.5) * 1000);
    } catch {
      ctxRef.current = null;
      setPlaying(null);
      setState("unavailable");
    }
  }, [stop]);

  useEffect(() => () => {
    cancelAnimationFrame(frame.current);
    window.clearTimeout(timer.current);
    const ctx = ctxRef.current;
    if (ctx) void ctx.close().catch(() => {});
  }, []);

  return { state, playing, at, play, stop };
}
