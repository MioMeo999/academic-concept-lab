import type { AudioEvent, NarmourCandidate, NarmourRelation, NarmourRelationStatus, NarmourStimulusFamily } from "@/content/types";

/* ---------------------------------------------------------------------------
   Narmour's Implication–Realization: the pitch × time field.

   Three tones in time, left to right, against pitch, bottom to top. Two are
   heard; the third has not arrived. Everything the page draws — the interval
   between the first two, the leans that interval seems to have, the three
   continuations, the verdicts — is placed in these coordinates, so any figure
   can be laid over another and keep to the same tones.

   Nothing here is a model of expectation. Whether an interval is small, large
   or neither is the record's own convention (small ≤ 5 semitones, large ≥ 7,
   six neither), and what a small or large interval tends to invite is what
   the record says it tends to invite. The geometry only places those words.
   ------------------------------------------------------------------------- */

export type Pt = [number, number];

export const FIELD = {
  w: 640,
  h: 320,
  yBase: 300,
  dy: 19,
  pMin: 58,
  pMax: 72,
  tone: [118, 288, 458] as const,
  /** onset to onset, in seconds, as the record's stimuli are timed */
  ioi: 0.6,
};

export const yOfPitch = (pitch: number) => FIELD.yBase - (pitch - FIELD.pMin) * FIELD.dy;
export const xOfTone = (k: 0 | 1 | 2) => FIELD.tone[k];
/** where the playhead stands, in the field's x, `t` seconds into a stimulus */
export const xOfTime = (t: number) => FIELD.tone[0] + (t / FIELD.ioi) * (FIELD.tone[1] - FIELD.tone[0]);

const NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
export const noteName = (pitch: number) => `${NAMES[pitch % 12]}${Math.floor(pitch / 12) - 1}`;

/* ---- how big is the first interval? --------------------------------------- */

export type SizeClass = "small" | "neither" | "large";
export const SMALL_MAX = 5;
export const LARGE_MIN = 7;

/** the record's operational convention — a tested convention, not a biological switch */
export function sizeClass(semitones: number): SizeClass {
  const n = Math.abs(semitones);
  return n <= SMALL_MAX ? "small" : n >= LARGE_MIN ? "large" : "neither";
}

/** what an ascending interval of this class tends to invite, as the record words it */
export type Lean = {
  direction: "continue" | "reverse";
  size: "similar" | "smaller";
  return: "competes" | "possible";
  proximity: "nearby";
};

export function lean(cls: SizeClass): Lean | null {
  if (cls === "small") return { direction: "continue", size: "similar", return: "competes", proximity: "nearby" };
  if (cls === "large") return { direction: "reverse", size: "smaller", return: "possible", proximity: "nearby" };
  return null;
}

/* ---- the four relations the record checks each continuation against ------- */

export type RelationKey = "direction" | "size" | "return" | "proximity";
export const RELATION_KEYS: RelationKey[] = ["direction", "size", "return", "proximity"];
export const RELATION_LABEL: Record<RelationKey, string> = {
  direction: "REGISTRAL-DIRECTION IMPLICATION",
  size: "INTERVALLIC-DIFFERENCE IMPLICATION",
  return: "REGISTRAL RETURN",
  proximity: "PROXIMITY",
};

export const relationOf = (c: NarmourCandidate, key: RelationKey): NarmourRelation | undefined => c.relations.find((r) => r.label === RELATION_LABEL[key]);

/** the four verdicts in a fixed order, so a continuation can be read at a glance */
export const signature = (c: NarmourCandidate): (NarmourRelationStatus | null)[] => RELATION_KEYS.map((k) => relationOf(c, k)?.status ?? null);

export const STATUS_WORD: Record<NarmourRelationStatus, string> = {
  REALIZED: "realised",
  DENIED: "denied",
  "NOT STRONGLY DIAGNOSTIC": "not strongly diagnostic",
};

/* ---- the same movement, a different verdict ------------------------------- */

export const MOVEMENTS = ["up → up", "up → down"] as const;
export type Movement = (typeof MOVEMENTS)[number];

export type Verdict = {
  family: NarmourStimulusFamily;
  movement: Movement;
  candidate: NarmourCandidate;
  status: NarmourRelationStatus;
  /** every continuation in the family that makes this movement gets the same direction verdict */
  consistent: boolean;
};

/** for each family and physical movement, the registral-direction verdict the record gives it */
export function verdictGrid(families: NarmourStimulusFamily[]): Verdict[] {
  const out: Verdict[] = [];
  for (const family of families) {
    for (const movement of MOVEMENTS) {
      const same = family.candidates.filter((c) => c.physicalMovement === movement);
      const first = same[0];
      const status = first && relationOf(first, "direction")?.status;
      if (!first || !status) continue;
      out.push({ family, movement, candidate: first, status, consistent: same.every((c) => relationOf(c, "direction")?.status === status) });
    }
  }
  return out;
}

/* ---- playing ------------------------------------------------------------------ */

/** which of the three tones is sounding, `at` seconds in */
export function soundingTone(events: AudioEvent[], at: number, playing: boolean): 0 | 1 | 2 | undefined {
  if (!playing) return undefined;
  const i = events.findIndex((e) => at >= e.start && at <= e.start + e.duration);
  return i === 0 || i === 1 || i === 2 ? i : undefined;
}

/** a continuation's three pitches */
export const pitchesOf = (c: NarmourCandidate) => c.events.map((e) => e.pitch);

/** a tiny contour of any pitch list, scaled into w × h with padding, for a table row's glyph */
export function contourPoints(pitches: number[], w: number, h: number, pad = 5): Pt[] {
  const lo = Math.min(...pitches), hi = Math.max(...pitches);
  const span = Math.max(hi - lo, 4);
  return pitches.map((p, i) => [pad + (i * (w - 2 * pad)) / Math.max(pitches.length - 1, 1), h - pad - ((p - lo) / span) * (h - 2 * pad)] as Pt);
}
