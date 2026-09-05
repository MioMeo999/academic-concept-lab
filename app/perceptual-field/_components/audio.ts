/* ---------------------------------------------------------------------------
   Synthesis for the teaching stimuli.

   The pitches, onsets, durations and peak gain are the record's own data;
   this module only sounds them, so what the reader sees drawn and what the
   reader hears cannot drift apart. Triangle tones, 0.12 peak gain, exactly as
   the record documents its controls.
   ------------------------------------------------------------------------- */

export type Ev = { pitch: number; start: number; duration: number };

const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

type Handle = {
  /** total sounding length in seconds */
  total: number;
  stop: () => void;
};

export function playEvents(
  events: Ev[],
  opts: { peak?: number; onEvent?: (index: number) => void; onEnd?: () => void } = {},
): Handle | null {
  const { peak = 0.12, onEvent, onEnd } = opts;

  const Ctor: typeof AudioContext | undefined =
    typeof window === "undefined"
      ? undefined
      : window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor || events.length === 0) return null;

  const ctx = new Ctor();
  void ctx.resume();

  const lead = 0.08;
  const t0 = ctx.currentTime + lead;
  const out = ctx.createGain();
  out.gain.value = 1;
  out.connect(ctx.destination);

  const timers: number[] = [];

  events.forEach((e, index) => {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = hz(e.pitch);
    const g = ctx.createGain();
    const on = t0 + e.start;
    g.gain.setValueAtTime(0.0001, on);
    g.gain.exponentialRampToValueAtTime(peak, on + 0.012);
    g.gain.setValueAtTime(peak, on + e.duration * 0.55);
    g.gain.exponentialRampToValueAtTime(0.0001, on + e.duration + 0.06);
    osc.connect(g).connect(out);
    osc.start(on);
    osc.stop(on + e.duration + 0.12);

    if (onEvent) {
      timers.push(window.setTimeout(() => onEvent(index), (lead + e.start) * 1000));
    }
  });

  const total = events.reduce((m, e) => Math.max(m, e.start + e.duration), 0) + 0.3;

  if (onEnd) timers.push(window.setTimeout(onEnd, (lead + total) * 1000));
  const closer = window.setTimeout(() => void ctx.close(), (lead + total + 0.4) * 1000);
  timers.push(closer);

  return {
    total,
    stop: () => {
      timers.forEach((t) => window.clearTimeout(t));
      try {
        void ctx.close();
      } catch {
        /* already closed */
      }
    },
  };
}
