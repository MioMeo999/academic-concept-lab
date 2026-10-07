import { seeded, type Pt } from "./draw";

/* ---------------------------------------------------------------------------
   Five qualities of sound.

   The record paraphrases the five MUSIC dimensions as qualities of sound —
   unhurried and soft-edged, plain and unadorned, complex and inventive, loud
   and forceful, rhythmic and percussive — and says in so many words that a
   dimension is not a list of genres. So each is drawn here as a trace of a
   sound with that character, and can be heard as a short synthesised sketch of
   it. Neither is a measurement, a spectrogram, or one of the study's own
   excerpts: they are teaching drawings of the paraphrased characters.
   ------------------------------------------------------------------------- */

export type Quality = "M" | "U" | "S" | "I" | "C";
export const QUALITIES: Quality[] = ["M", "U", "S", "I", "C"];

/** every trace is this wide, with its centre line at y = 0 */
export const TRACE_W = 600;

export type Beat = { x: number; h: number; kind: "hit" | "hat" | "tick" };
export type Trace = {
  /** the lines of the trace, from left to right */
  strokes: Pt[][];
  /** upright marks standing on the centre line: a plain beat, or percussive hits */
  beats: Beat[];
  /** a faint centre line under everything */
  base: boolean;
};

const across = (step: number, fn: (x: number) => number): Pt[] => {
  const out: Pt[] = [];
  for (let x = 0; x <= TRACE_W + 1e-9; x += step) out.push([x, fn(x)]);
  return out;
};

/** the percussive pattern: two bars of sixteen steps, syncopated */
export const KICK_STEPS = [0, 3, 6, 10, 12, 16, 19, 22, 26, 28];
export const HAT_STEPS = [2, 4, 8, 11, 14, 18, 20, 24, 27, 30];
export const STEP_W = 18;

export function trace(quality: Quality): Trace {
  switch (quality) {
    case "M":
      // one long, slow, low swell that settles: soft-edged, unhurried
      return { strokes: [across(5, (x) => 30 * Math.sin(x / 46 + 0.3) * (0.95 - 0.3 * (x / TRACE_W)))], beats: [], base: true };
    case "U":
      // a plain line and an even beat: nothing added for effect
      return { strokes: [[[0, 0], [TRACE_W, 0]]], beats: Array.from({ length: 6 }, (_, i) => ({ x: 50 + i * 100, h: 18, kind: "tick" as const })), base: false };
    case "S":
      // three lines at three paces, crossing again and again: complex, inventive
      return {
        strokes: [
          across(4, (x) => 46 * Math.sin(x / 20 + 0.4)),
          across(4, (x) => 6 + 34 * Math.sin(x / 31 + 2)),
          across(4, (x) => -8 + 22 * Math.sin(x / 13 + 1)),
        ],
        beats: [],
        base: false,
      };
    case "I": {
      // tall, jagged, close-set strokes: loud and forceful
      const r = seeded(5);
      const jag: Pt[] = [[0, 0]];
      for (let x = 10, up = true; x < TRACE_W; x += 11, up = !up) jag.push([x, (up ? -1 : 1) * (26 + r() * 62)]);
      jag.push([TRACE_W, 0]);
      return { strokes: [jag], beats: [], base: true };
    }
    case "C": {
      // evenly gridded, syncopated hits, some tall and some short: rhythmic, percussive
      const beats: Beat[] = [
        ...KICK_STEPS.map((s) => ({ x: 12 + s * STEP_W, h: 60, kind: "hit" as const })),
        ...HAT_STEPS.map((s) => ({ x: 12 + s * STEP_W, h: 22, kind: "hat" as const })),
      ];
      return { strokes: [], beats, base: true };
    }
  }
}

/** each drawing, in words, for the figure's text alternative */
export const TRACE_ALT: Record<Quality, string> = {
  M: "one long, slow, low swell that settles",
  U: "a plain straight line with an even beat standing on it",
  S: "three lines at three paces, crossing again and again",
  I: "tall, jagged, close-set strokes",
  C: "struck marks on a syncopated grid, some tall and some short",
};

/** what a trace looks like, in numbers: used to keep each drawing true to the character it draws */
export function traceStats(quality: Quality) {
  const t = trace(quality);
  const all = t.strokes.flat();
  const amplitude = Math.max(0, ...all.map(([, y]) => Math.abs(y)), ...t.beats.map((b) => b.h));
  const line = t.strokes[0] ?? [];
  let reversals = 0;
  for (let i = 2; i < line.length; i++) {
    const a = line[i - 1][1] - line[i - 2][1];
    const b = line[i][1] - line[i - 1][1];
    if (a !== 0 && b !== 0 && Math.sign(a) !== Math.sign(b)) reversals += 1;
  }
  return { amplitude, reversals, strands: t.strokes.length, beats: t.beats.length };
}

/* ---- the sketches: short synthesised sounds with the paraphrased character ---- */

export type Voice = {
  /** seconds from the start */
  t: number;
  /** how long it is held, in seconds */
  dur: number;
  kind: "tone" | "kick" | "hat";
  midi?: number;
  gain: number;
  wave?: "sine" | "triangle" | "sawtooth" | "square";
  /** distortion, 0 for none */
  drive?: number;
  attack?: number;
  release?: number;
};

/** every sketch runs for the same length, so the playhead moves at one pace */
export const SKETCH_SECONDS = 4.4;

const run = (t0: number, step: number, midis: number[], rest: Omit<Voice, "t" | "midi" | "kind">): Voice[] =>
  midis.map((midi, i) => ({ t: t0 + i * step, midi, kind: "tone" as const, ...rest }));

export function sketch(quality: Quality): Voice[] {
  switch (quality) {
    case "M":
      // three soft sine tones blooming one over another, slowly
      return [
        { t: 0, dur: 3, kind: "tone", midi: 60, gain: 0.06, wave: "sine", attack: 0.9, release: 1.1 },
        { t: 0.6, dur: 2.6, kind: "tone", midi: 64, gain: 0.055, wave: "sine", attack: 0.9, release: 1.1 },
        { t: 1.2, dur: 2.1, kind: "tone", midi: 67, gain: 0.05, wave: "sine", attack: 0.9, release: 1.1 },
        { t: 2, dur: 1.3, kind: "tone", midi: 72, gain: 0.03, wave: "sine", attack: 0.8, release: 0.9 },
      ];
    case "U":
      // one plain pulse on two notes: straightforward, nothing added
      return run(0, 0.55, [60, 60, 55, 55, 60, 60, 55, 55], { dur: 0.42, gain: 0.085, wave: "triangle", attack: 0.01, release: 0.12 });
    case "S":
      // two lines at different paces, wide leaps, few repeated notes: complex, inventive
      return [
        ...run(0, 0.27, [72, 78, 75, 82, 77, 84, 80, 73, 79, 86, 81, 74, 83, 76, 88, 80], { dur: 0.24, gain: 0.048, wave: "triangle", attack: 0.01, release: 0.1 }),
        ...run(0, 0.43, [48, 55, 51, 58, 50, 57, 53, 60, 52, 59], { dur: 0.4, gain: 0.05, wave: "sine", attack: 0.02, release: 0.14 }),
      ];
    case "I":
      // a driving, distorted low pulse with stabs above it: loud and forceful
      return [
        ...run(0, 0.22, [40, 40, 43, 40, 40, 45, 40, 40, 43, 40, 40, 46, 40, 40, 43, 40, 40, 45, 47, 40], { dur: 0.18, gain: 0.11, wave: "sawtooth", drive: 5, attack: 0.005, release: 0.05 }),
        ...run(0, 1.1, [64, 64, 67, 64], { dur: 0.3, gain: 0.07, wave: "sawtooth", drive: 5, attack: 0.005, release: 0.08 }),
      ];
    case "C": {
      // kick and hat on a syncopated grid, with short synthetic stabs: rhythmic, percussive
      const step = SKETCH_SECONDS / 32;
      return [
        ...KICK_STEPS.map((s) => ({ t: s * step, dur: 0.16, kind: "kick" as const, gain: 0.16 })),
        ...HAT_STEPS.map((s) => ({ t: s * step, dur: 0.05, kind: "hat" as const, gain: 0.05 })),
        ...[4, 7, 11, 20, 23, 27].map((s, i) => ({ t: s * step, dur: 0.1, kind: "tone" as const, midi: [72, 75, 79][i % 3], gain: 0.035, wave: "square" as const, attack: 0.005, release: 0.04 })),
      ];
    }
  }
}

/** what a sketch is made of, in numbers: used to keep each one true to the character it sketches */
export function sketchStats(quality: Quality) {
  const voices = sketch(quality);
  const tones = voices.filter((v) => v.kind === "tone");
  const strength = (v: Voice) => v.gain * (1 + (v.drive ?? 0) / 5);
  // the most that sounds at once, by summing the gain of everything held at each onset
  let overlap = 0;
  for (const v of voices) overlap = Math.max(overlap, voices.filter((o) => o.t <= v.t && o.t + o.dur + (o.release ?? 0) > v.t).reduce((sum, o) => sum + o.gain, 0));
  return {
    events: voices.length,
    density: voices.length / SKETCH_SECONDS,
    peak: Math.max(...voices.map(strength)),
    pitches: new Set(tones.map((v) => v.midi)).size,
    percussive: voices.filter((v) => v.kind !== "tone").length,
    ends: Math.max(...voices.map((v) => v.t + v.dur + (v.release ?? 0))),
    overlap,
    lowest: Math.min(...tones.map((v) => v.midi ?? 127), 127),
  };
}
