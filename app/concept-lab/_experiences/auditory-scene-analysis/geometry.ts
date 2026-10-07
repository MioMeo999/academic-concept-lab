import type { AudioEvent } from "@/content/types";

/* ---------------------------------------------------------------------------
   The plane every figure on the Auditory Scene Analysis page is drawn on: time
   runs left to right, pitch runs upward, and a tone event is a short dash. What
   the page teaches is how a listener draws connections over such a plane — a
   line across time for a stream, a brace at one moment for a fused sound — so
   the plane stays the same while the connections change.

   It is a teaching plane, not a spectrogram: nothing on it is a measurement.
   ------------------------------------------------------------------------- */

export type Pt = [number, number];

export const PLANE = { w: 640, h: 300, x0: 58, x1: 626, y0: 30, y1: 262 };
export type Axis = { tMax: number; pMin: number; pMax: number };

/** the plane of the stream splitter: six seconds, and two octaves of pitch from G♯3 to G♯5 */
export const STREAM_AXIS: Axis = { tMax: 6, pMin: 56, pMax: 80 };

export const xOf = (t: number, ax: Axis) => PLANE.x0 + (t / ax.tMax) * (PLANE.x1 - PLANE.x0);
export const yOf = (p: number, ax: Axis) => PLANE.y1 - ((p - ax.pMin) / (ax.pMax - ax.pMin)) * (PLANE.y1 - PLANE.y0);

/** the middle of an event, in the plane */
export const centre = (e: AudioEvent, ax: Axis): Pt => [xOf(e.start + e.duration / 2, ax), yOf(e.pitch, ax)];

/** the events on either side of the middle pitch: a low stream and a high one */
export function bands(events: AudioEvent[]) {
  const ps = events.map((e) => e.pitch);
  const mid = (Math.min(...ps) + Math.max(...ps)) / 2;
  return { low: events.filter((e) => e.pitch <= mid), high: events.filter((e) => e.pitch > mid), mid };
}

export const totalOf = (events: AudioEvent[]) => Math.max(...events.map((e) => e.start + e.duration), 0);
