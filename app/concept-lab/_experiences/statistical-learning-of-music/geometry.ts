import type { StatisticalStream, StatisticalWorld } from "@/content/types";

/* ---------------------------------------------------------------------------
   Statistical Learning of Music: what a tally of a stream would show.

   Nothing here models a listener. These are the counts anyone could make of
   the record's own constructed stream and of its two constructed exposure
   histories — how often each tone occurs, how often each tone is followed by
   each other tone — and a plain rule for reading them. The record is explicit
   that the counter is a teaching representation, not a claim that listeners
   tally events, and that the stream shows information a learner could use,
   not that the visitor learned it.
   ------------------------------------------------------------------------- */

export const TONES = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

/** what has been heard after the first `n` tones of a sequence */
export type Tally = {
  n: number;
  /** how often each tone has occurred */
  freq: Record<string, number>;
  /** how often each tone has been followed by another tone */
  followed: Record<string, number>;
  /** how often each ordered pair has occurred, keyed "AB" */
  pairs: Record<string, number>;
};

export function tallyAt(seq: string[], n: number): Tally {
  const heard = seq.slice(0, Math.max(0, Math.min(n, seq.length)));
  const freq: Record<string, number> = {};
  const followed: Record<string, number> = {};
  const pairs: Record<string, number> = {};
  heard.forEach((tone, i) => {
    freq[tone] = (freq[tone] ?? 0) + 1;
    const next = heard[i + 1];
    if (next !== undefined) {
      followed[tone] = (followed[tone] ?? 0) + 1;
      pairs[tone + next] = (pairs[tone + next] ?? 0) + 1;
    }
  });
  return { n: heard.length, freq, followed, pairs };
}

/** "0.11 (4/36)" — the form the record writes a probability in */
export const fmt = (count: number, of: number) => `${(of ? count / of : 0).toFixed(2)} (${count}/${of})`;

export const shareOf = (t: Tally, tone: string) => (t.n ? (t.freq[tone] ?? 0) / t.n : 0);
export const tpOf = (t: Tally, from: string, to: string) => (t.followed[from] ? (t.pairs[from + to] ?? 0) / t.followed[from] : 0);

/**
 * At each junction i (tone i → tone i+1), how probable — given what has been
 * heard — was the tone that actually came next? A run of high values is a
 * stretch where each tone reliably brought the next; a low value is a place
 * where several things could have followed.
 */
export function junctions(seq: string[], n: number): number[] {
  const t = tallyAt(seq, n);
  const out: number[] = [];
  for (let i = 0; i < t.n - 1; i++) out.push(tpOf(t, seq[i], seq[i + 1]));
  return out;
}

/** a dip: a junction strictly less probable than the junctions on either side of it */
export function dips(js: number[]): number[] {
  return js.flatMap((p, i) => (i > 0 && i < js.length - 1 && p < js[i - 1] && p < js[i + 1] ? [i] : []));
}

/** the junctions where the hidden units really end — every junction after a unit but the last */
export function unitEnds(unitSequence: string[]): number[] {
  const out: number[] = [];
  let at = 0;
  unitSequence.forEach((unit, k) => {
    at += unit.length;
    if (k < unitSequence.length - 1) out.push(at - 1);
  });
  return out;
}

/** what the dips found after `n` tones, set beside where the units really end */
export function reading(seq: string[], unitSequence: string[], n: number) {
  const js = junctions(seq, n);
  const cuts = dips(js);
  const actual = unitEnds(unitSequence).filter((j) => j <= js.length - 1);
  return { junctions: js, cuts, actual, found: cuts.filter((c) => actual.includes(c)), missed: actual.filter((a) => !cuts.includes(a)), spurious: cuts.filter((c) => !actual.includes(c)) };
}

/** the stretches between cuts, as the tones they hold */
export function chunks(seq: string[], n: number, cuts: number[]): { from: number; to: number; tones: string }[] {
  const end = Math.min(n, seq.length);
  const out: { from: number; to: number; tones: string }[] = [];
  let from = 0;
  for (const c of [...cuts, end - 1]) {
    const to = c;
    out.push({ from, to, tones: seq.slice(from, to + 1).join("") });
    from = c + 1;
  }
  return out.filter((c) => c.to >= c.from);
}

/** the ledger as a grid: for each tone given, how often each tone followed */
export function grid(seq: string[], n: number) {
  const t = tallyAt(seq, n);
  return { tally: t, rows: TONES.map((from) => TONES.map((to) => ({ from, to, count: t.pairs[from + to] ?? 0, opportunities: t.followed[from] ?? 0, p: tpOf(t, from, to) }))) };
}

/** tally strokes: groups of five (four upright and one across) and what is left over */
export const tallyGroups = (n: number) => ({ full: Math.floor(n / 5), rest: n % 5 });

/* ---- two exposure histories ---------------------------------------------- */

export const SOURCES = ["X", "W"];
export const TARGETS = ["Y", "Z"];

export const totalFrom = (w: StatisticalWorld, from: string) => w.pairs.filter((p) => p.from === from).reduce((s, p) => s + p.count, 0);
export const totalTo = (w: StatisticalWorld, to: string) => w.pairs.filter((p) => p.to === to).reduce((s, p) => s + p.count, 0);
export const countOf = (w: StatisticalWorld, from: string, to: string) => w.pairs.find((p) => p.from === from && p.to === to)?.count ?? 0;
export const conditional = (w: StatisticalWorld, from: string, to: string) => (totalFrom(w, from) ? countOf(w, from, to) / totalFrom(w, from) : 0);

/** the pair sounding at `at` seconds into a world's exposure (each pair is two tones) */
export function pairSounding(w: StatisticalWorld, at: number, playing: boolean): { from: string; to: string } | undefined {
  if (!playing || !w.events.length) return undefined;
  const i = w.events.findIndex((e) => at >= e.start && at <= e.start + e.duration);
  if (i < 0) return undefined;
  const k = Math.floor(i / 2) * 2;
  return { from: w.sequence[k], to: w.sequence[k + 1] };
}

/** the stream's tones in the order the record plays them */
export const streamTones = (s: StatisticalStream) => s.noteSequence;

/* ---- the flow of an exposure history: sources on the left, outcomes on the right ---- */

export const FLOW = { scale: 5, leftX: 104, rightX: 536, nodeW: 30, top: [46, 196] as const };

export type FlowBand = { from: string; to: string; count: number; ly: number; ry: number; h: number };

/** bands as ribbons: each source's outflow is stacked in its own node, each outcome's inflow in its own */
export function flowBands(w: StatisticalWorld): FlowBand[] {
  return w.pairs.map((p) => {
    const si = SOURCES.indexOf(p.from), ti = TARGETS.indexOf(p.to);
    const before = (from: string, to: string) => TARGETS.slice(0, TARGETS.indexOf(to)).reduce((s, x) => s + countOf(w, from, x), 0);
    const above = (from: string, to: string) => SOURCES.slice(0, SOURCES.indexOf(from)).reduce((s, x) => s + countOf(w, x, to), 0);
    return { from: p.from, to: p.to, count: p.count, ly: FLOW.top[si] + before(p.from, p.to) * FLOW.scale, ry: FLOW.top[ti] + above(p.from, p.to) * FLOW.scale, h: p.count * FLOW.scale };
  });
}
