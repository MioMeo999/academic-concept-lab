import type { TonalContext } from "@/content/types";

export const TONAL_SOUND = Object.freeze({ wave: "triangle" as const, peakGain: 0.12, contextEnd: 1.62, probeDelay: 0.5 });
export const HELD_PROBE = Object.freeze({ pitch: 60, start: 2.12, duration: 0.5 });

export function tonalSequence(context: Pick<TonalContext, "events">) {
  const end = Math.max(...context.events.map(event => event.start + event.duration));
  if (Math.abs(end - TONAL_SOUND.contextEnd) > 0.000001) throw new Error("The tonal comparison requires the same context duration.");
  return [...context.events, HELD_PROBE];
}
