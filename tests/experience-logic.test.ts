import assert from "node:assert/strict";
import test from "node:test";
import { dependences, powerReading } from "../app/concept-lab/_experiences/social-exchange-theory/power";
import { next, place, ROOM_SLOTS, ROUNDS, snapshot, STAGES, type Snapshot, type Stage } from "../app/concept-lab/_experiences/person-organisation-fit/population";
import { CROWDED, PLAN, SEATS, SPARSE, TALK_CROWDED, TALK_SPARSE, chairAt, deskLinks, sightPairs } from "../app/concept-lab/_experiences/workplace-design/geometry";
import { bands, centre, STREAM_AXIS } from "../app/concept-lab/_experiences/auditory-scene-analysis/geometry";
import { auditorySceneAnalysis } from "../content/auditory-scene-analysis";
import { FIELD, LARGE_MIN, MOVEMENTS, RELATION_KEYS, SMALL_MAX, lean, noteName, relationOf, signature, sizeClass, soundingTone, verdictGrid, xOfTime, yOfPitch } from "../app/concept-lab/_experiences/narmours-implication-realization-theory/geometry";
import { narmoursImplicationRealizationTheory } from "../content/narmours-implication-realization-theory";
import { conditional, dips, fmt, grid, junctions, pairSounding, reading, tallyAt, tallyGroups, totalFrom, totalTo, tpOf, unitEnds } from "../app/concept-lab/_experiences/statistical-learning-of-music/geometry";
import { statisticalLearningOfMusic } from "../content/statistical-learning-of-music";
import { SIGMA, WINDOW, contextAt, density, envelopePoints, ladderRungs, omissionSlots, precisionOf, residual, standardised, xOfMs, yOfDensity } from "../app/concept-lab/_experiences/predictive-processing-in-music/geometry";
import { predictiveProcessingInMusic } from "../content/predictive-processing-in-music";
import { FACTORS, MAP, ROPE, fitState, knots, laneOf, rope, shortAuthors, spreadY, strandAt, xOfYear } from "../app/concept-lab/_experiences/music-preference/geometry";
import { KICK_STEPS, QUALITIES, SKETCH_SECONDS, sketchStats, traceStats } from "../app/concept-lab/_experiences/music-preference/sound";
import { musicPreference } from "../content/music-preference";

/* The redesigned experiences carry small pieces of teaching logic. They are
   pure functions so that an academic claim they make can be tested directly,
   rather than only by whatever state the page happens to render first. */

test("power–dependence follows Emerson: the power of B over A is A's dependence on B", () => {
  // A gets high value through B and has few alternatives; B has many alternatives and gets little from A.
  const aDependsHeavily = { aValue: 2, aAlt: 2, bValue: 0, bAlt: 0 };
  assert.deepEqual(dependences(aDependsHeavily), { aOnB: 4, bOnA: 0 });
  assert.equal(powerReading(aDependsHeavily).balance, "B has more relational power");
  // The mirror image: B depends more on A, so A has the power.
  const bDependsHeavily = { aValue: 0, aAlt: 0, bValue: 2, bAlt: 2 };
  assert.equal(powerReading(bDependsHeavily).balance, "A has more relational power");
});

test("power balance and mutual dependence are separate questions", () => {
  const bothHigh = { aValue: 2, aAlt: 2, bValue: 2, bAlt: 2 };
  const bothLow = { aValue: 0, aAlt: 0, bValue: 0, bAlt: 0 };
  assert.equal(powerReading(bothHigh).balance, "balanced power");
  assert.equal(powerReading(bothLow).balance, "balanced power");
  assert.equal(powerReading(bothHigh).mutual, "high mutual dependence");
  assert.equal(powerReading(bothLow).mutual, "low mutual dependence");
  // Unequal dependence is never called balanced, whatever the totals.
  assert.notEqual(powerReading({ aValue: 1, aAlt: 0, bValue: 0, bAlt: 0 }).balance, "balanced power");
});

test("alternatives lower dependence and value raises it", () => {
  const scarce = dependences({ aValue: 1, aAlt: 2, bValue: 1, bAlt: 2 });
  const plentiful = dependences({ aValue: 1, aAlt: 0, bValue: 1, bAlt: 0 });
  assert.ok(scarce.aOnB > plentiful.aOnB && scarce.bOnA > plentiful.bOnA);
  const valued = dependences({ aValue: 2, aAlt: 1, bValue: 0, bAlt: 1 });
  assert.ok(valued.aOnB > valued.bOnA);
});

/* ---- Person–Organisation fit: the Attraction–Selection–Attrition toy ------ */

const every = (): Snapshot[] => {
  const out: Snapshot[] = [];
  let at: { round: number; stage: Stage } | null = { round: 1, stage: "start" };
  while (at) { out.push(snapshot(at.round, at.stage)); at = next(at.round, at.stage); }
  return out;
};

test("the toy opens mixed: four kinds in the room, and a crowd of twelve with three of each", () => {
  const s = snapshot(1, "start");
  assert.deepEqual(s.counts, [4, 3, 3, 2]);
  assert.equal(s.kinds, 4);
  const pool = s.people.filter((p) => p.where === "pool");
  assert.equal(pool.length, 12);
  for (const mark of [0, 1, 2, 3]) assert.equal(pool.filter((p) => p.mark === mark).length, 3);
});

test("each stage applies its own rule to what the stage before left behind", () => {
  const a = snapshot(1, "attraction");
  assert.deepEqual(a.info.seenAtDoor, [0, 1], "candidates look for the two most common marks in the room");
  const queue = a.people.filter((p) => p.where === "queue");
  assert.equal(queue.length, a.info.applicants);
  assert.ok(queue.every((p) => a.info.seenAtDoor.includes(p.mark)), "only candidates who see someone like them apply");

  const s = snapshot(1, "selection");
  assert.equal(s.info.preferred, 0, "the organisation prefers the room's most common mark");
  assert.equal(s.info.admitted, 3);
  assert.equal(s.info.turnedAway, s.info.applicants - s.info.admitted);
  assert.deepEqual(s.counts, [7, 3, 3, 2]);
  assert.equal(s.people.filter((p) => p.where === "queue").length, 0, "nobody is left standing in the queue");

  const t = snapshot(1, "attrition");
  assert.deepEqual(t.info.left, [0, 0, 0, 2], "the smallest minority leaves");
  assert.deepEqual(t.counts, [7, 3, 3, 0]);
});

test("three rounds sort the room down to one kind, and nothing in the toy asks whether that is good", () => {
  assert.deepEqual(snapshot(1, "attrition").counts, [7, 3, 3, 0]);
  assert.deepEqual(snapshot(2, "attrition").counts, [10, 3, 0, 0]);
  assert.deepEqual(snapshot(3, "attrition").counts, [13, 0, 0, 0]);
  assert.deepEqual([1, 2, 3].map((r) => snapshot(r, "attrition").kinds), [3, 2, 1]);
});

test("a fresh crowd arrives each round, while the room and the people who left carry over", () => {
  const end = snapshot(1, "attrition");
  const open = snapshot(2, "start");
  const inRoom = (s: Snapshot) => s.people.filter((p) => p.where === "room").map((p) => `${p.id}@${p.slot}`).sort();
  assert.deepEqual(inRoom(open), inRoom(end));
  assert.equal(open.people.filter((p) => p.where === "gone").length, end.people.filter((p) => p.where === "gone").length);
  const pool = open.people.filter((p) => p.where === "pool");
  assert.equal(pool.length, 12);
  assert.ok(pool.every((p) => p.id.startsWith("p2-")), "the crowd is new people, not last round's leftovers");
});

test("nobody stands on top of anybody, and the room never overflows", () => {
  for (const snap of every()) {
    const seen = new Set<string>();
    for (const p of snap.people) {
      const key = `${p.where}:${p.slot}`;
      assert.ok(!seen.has(key), `${key} holds two people in round ${snap.round} ${snap.stage}`);
      seen.add(key);
      if (p.where === "room") assert.ok(p.slot >= 0 && p.slot < ROOM_SLOTS);
      const at = place(p);
      assert.ok(at.x > 0 && at.x < 1000 && at.y > 0 && at.y < 880, "every person is drawn inside the figure");
    }
  }
});

test("stepping visits every state once, in order, and stops after the third round's attrition", () => {
  const all = every();
  assert.equal(all.length, ROUNDS * STAGES.length);
  assert.deepEqual([all[0].round, all[0].stage], [1, "start"]);
  assert.deepEqual([all.at(-1)!.round, all.at(-1)!.stage], [ROUNDS, "attrition"]);
  assert.equal(next(ROUNDS, "attrition"), null);
});

/* ---- Workplace Design: the one office plan every figure re-reads ------------ */

test("the office seats twelve; the spacious room is part of the cramped one, and every talker sits in the room they talk in", () => {
  assert.equal(SEATS.length, 12);
  assert.deepEqual(CROWDED, SEATS.map((seat) => seat.id));
  assert.ok(SPARSE.every((id) => CROWDED.includes(id)));
  assert.ok(TALK_SPARSE.every((id) => SPARSE.includes(id)), "in the spacious room, only people who are there can talk");
  assert.ok(TALK_CROWDED.every((id) => CROWDED.includes(id)));
});

test("everyone sits inside the walls, and a cramped room has more people in sight of one another than a spacious one", () => {
  for (const seat of SEATS) {
    const [x, y] = chairAt(seat);
    assert.ok(x > PLAN.x0 && x < PLAN.x1 && y > PLAN.y0 && y < PLAN.y1, `seat ${seat.id} is inside the room`);
  }
  assert.ok(sightPairs(CROWDED).length > sightPairs(SPARSE).length);
});

test("desks link to their right-hand and lower neighbours only: nine along the rows, eight down the columns", () => {
  assert.equal(deskLinks().length, 9 + 8);
});

/* ---- Auditory Scene Analysis: the plane the tones are drawn on ---------------- */

test("every stream-splitter setting splits into the same eight low tones and four high ones, and none of them leaves the plane", () => {
  for (const preset of auditorySceneAnalysis.asa!.opening.presets) {
    const { low, high } = bands(preset.events);
    assert.equal(low.length, 8, `${preset.label}: eight A tones`);
    assert.equal(high.length, 4, `${preset.label}: four B tones`);
    for (const e of preset.events) {
      const [x, y] = centre(e, STREAM_AXIS);
      assert.ok(x > 0 && x < 640 && y > 0 && y < 300, `${preset.label}: a tone falls off the plane`);
    }
  }
});

test("a faster, wider setting is denser in time and higher in pitch on the same axes", () => {
  const [close, , far] = auditorySceneAnalysis.asa!.opening.presets;
  const span = (events: { start: number; duration: number }[]) => Math.max(...events.map((e) => e.start + e.duration));
  assert.ok(span(far.events) < span(close.events));
  assert.ok(Math.max(...far.events.map((e) => e.pitch)) > Math.max(...close.events.map((e) => e.pitch)));
});

/* ---- Narmour's Implication–Realization: the field and its verdicts -------------- */

const narmour = narmoursImplicationRealizationTheory.narmour!;
const everyCandidate = narmour.families.flatMap((f) => f.candidates);

test("an interval is small up to five semitones, large from seven, and neither at six — the record's convention, not a biological switch", () => {
  assert.equal(SMALL_MAX, 5);
  assert.equal(LARGE_MIN, 7);
  for (let n = 1; n <= 5; n++) assert.equal(sizeClass(n), "small", `${n} semitones`);
  assert.equal(sizeClass(6), "neither");
  for (let n = 7; n <= 12; n++) assert.equal(sizeClass(n), "large", `${n} semitones`);
  // the record's two teaching intervals sit on either side of the tritone
  assert.deepEqual(narmour.families.map((f) => sizeClass(f.semitones)), ["small", "large"]);
});

test("a small interval leans on and stays near, a large one leans back to something smaller, and six leans neither way", () => {
  assert.deepEqual(lean(sizeClass(2)), { direction: "continue", size: "similar", return: "competes", proximity: "nearby" });
  assert.deepEqual(lean(sizeClass(7)), { direction: "reverse", size: "smaller", return: "possible", proximity: "nearby" });
  assert.equal(lean(sizeClass(6)), null);
});

test("every one of the record's continuations carries the four relations, once each and in the same order", () => {
  assert.equal(everyCandidate.length, 6);
  for (const c of everyCandidate) {
    assert.equal(c.relations.length, RELATION_KEYS.length, c.label);
    for (const key of RELATION_KEYS) assert.ok(relationOf(c, key), `${c.label} has its ${key} relation`);
    assert.equal(signature(c).length, 4);
    assert.ok(signature(c).every((s) => s !== null), `${c.label} has a verdict for each relation`);
  }
});

test("a continuation's three tones are the family's two, then one more: the implicative interval never changes", () => {
  for (const f of narmour.families) {
    for (const c of f.candidates) {
      assert.equal(c.events.length, 3);
      assert.equal(c.events[0].pitch, 60, "every stimulus opens on C4");
      assert.equal(c.events[1].pitch - c.events[0].pitch, f.semitones, `${c.label} keeps ${f.interval}`);
      // the record times its stimuli at a 0.6 s onset-to-onset interval, 0.42 s long
      c.events.forEach((e, i) => { assert.equal(e.start, i * FIELD.ioi); assert.equal(e.duration, 0.42); });
    }
  }
  assert.equal(noteName(60), "C4");
  assert.equal(noteName(69), "A4");
});

test("the same physical movement gets a different registral-direction verdict after a small and after a large interval, and the pair alone decides it", () => {
  const grid = verdictGrid(narmour.families);
  assert.equal(grid.length, MOVEMENTS.length * narmour.families.length);
  assert.ok(grid.every((v) => v.consistent), "every continuation with the same movement in a family gets the same verdict");
  for (const movement of MOVEMENTS) {
    const [small, large] = ["small", "large"].map((k) => grid.find((v) => v.movement === movement && v.family.label.toLowerCase().startsWith(k))!);
    assert.notEqual(small.status, large.status, `${movement}: the verdict flips between the two families`);
  }
  const at = (fam: string, movement: string) => grid.find((v) => v.family.label.toLowerCase().startsWith(fam) && v.movement === movement)!.status;
  assert.equal(at("small", "up → up"), "REALIZED");
  assert.equal(at("large", "up → up"), "DENIED");
  assert.equal(at("small", "up → down"), "DENIED");
  assert.equal(at("large", "up → down"), "REALIZED");
});

test("the field keeps every continuation on the page, and the playhead crosses the three tones in order", () => {
  for (const c of everyCandidate) for (const e of c.events) {
    const y = yOfPitch(e.pitch);
    assert.ok(y > 20 && y < FIELD.yBase + 4, `${c.label}: ${noteName(e.pitch)} is inside the field`);
  }
  // the dial's highest second tone (an octave above C4) is still on the page
  assert.ok(yOfPitch(72) > 0);
  assert.equal(xOfTime(0), FIELD.tone[0]);
  assert.equal(xOfTime(FIELD.ioi), FIELD.tone[1]);
  const events = narmour.families[0].candidates[0].events;
  assert.equal(soundingTone(events, 0.1, true), 0);
  assert.equal(soundingTone(events, 0.7, true), 1);
  assert.equal(soundingTone(events, 1.3, true), 2);
  assert.equal(soundingTone(events, 0.5, true), undefined, "between tones nothing is sounding");
  assert.equal(soundingTone(events, 0.1, false), undefined);
});

/* ---- Statistical Learning of Music: what a tally of the stream shows ------------ */

const statistical = statisticalLearningOfMusic.statistical!;
const stream = statistical.hiddenLanguage.stream;
const seq = stream.noteSequence;
const [worldA, worldB] = statistical.worlds.worlds;

test("the page's own tally of the stream is the record's tally: every frequency and every transition, to the digit", () => {
  const full = tallyAt(seq, seq.length);
  assert.equal(full.n, 36);
  for (const f of stream.eventFrequencies) {
    assert.equal(full.freq[f.label], f.count, `${f.label} count`);
    assert.equal(fmt(f.count, full.n), f.share, `${f.label} share`);
  }
  for (const tr of stream.transitions) {
    assert.equal(full.pairs[tr.from + tr.to], tr.count, `${tr.from}→${tr.to} count`);
    assert.equal(full.followed[tr.from], tr.opportunities, `${tr.from}→${tr.to} opportunities`);
    assert.equal(fmt(full.pairs[tr.from + tr.to], full.followed[tr.from]), tr.probability, `${tr.from}→${tr.to} probability`);
  }
});

test("every tone is exactly as common as every other, and yet what follows a tone is not the same for every tone", () => {
  const full = tallyAt(seq, seq.length);
  const counts = Object.values(full.freq);
  assert.equal(counts.length, 9);
  assert.ok(counts.every((c) => c === counts[0]), "equal frequencies");
  // inside a unit the next tone is fixed; across a boundary several tones could follow
  for (const tr of stream.transitions) {
    const p = tpOf(full, tr.from, tr.to);
    if (tr.kind === "within") assert.equal(p, 1, `${tr.from}→${tr.to} is certain`);
    else assert.ok(p > 0 && p < 1, `${tr.from}→${tr.to} is uncertain`);
  }
  // B is as common as any tone, always follows A, and never follows C
  assert.equal(tpOf(full, "A", "B"), 1);
  assert.equal(tpOf(full, "C", "B"), 0);
  const g = grid(seq, seq.length);
  assert.equal(g.rows.length, 9);
  assert.ok(g.rows.every((row) => row.reduce((s, c) => s + c.p, 0) > 0.999 && row.reduce((s, c) => s + c.p, 0) < 1.001), "each row of the ledger sums to one");
});

test("the hidden units end where the record says they do, and the sound gives nothing away at those places", () => {
  assert.equal(stream.unitSequence.join(""), seq.join(""), "the unit order is the tone order");
  assert.deepEqual(unitEnds(stream.unitSequence), [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32]);
  // the record's own audit: intervals inside units and across boundaries look alike
  assert.equal(stream.withinAudit.mean, stream.boundaryAudit.mean);
  assert.ok(stream.events.every((e, i) => e.start === i * 0.32 && e.duration === 0.24), "the same timing on every tone, boundary or not");
});

test("the dips in what-came-next find the units — but only once the stream has run long enough, and never in the wrong place", () => {
  const end = reading(seq, stream.unitSequence, seq.length);
  assert.deepEqual(end.cuts, unitEnds(stream.unitSequence));
  assert.equal(end.found.length, 11);
  assert.equal(end.missed.length + end.spurious.length, 0);
  // early on every tone has only ever been followed by one thing, so nothing stands out
  assert.deepEqual(dips(junctions(seq, 12)), []);
  assert.ok(reading(seq, stream.unitSequence, 12).missed.length > 0);
  // later, some but not all of the boundaries heard so far have been found
  const mid = reading(seq, stream.unitSequence, 18);
  assert.ok(mid.found.length > 0 && mid.missed.length > 0);
  // and a cut is never made where a unit does not end
  for (let n = 2; n <= seq.length; n++) assert.equal(reading(seq, stream.unitSequence, n).spurious.length, 0, `n = ${n}`);
});

test("two exposure histories: the same totals, opposite conditional probabilities", () => {
  for (const w of [worldA, worldB]) {
    assert.equal(totalFrom(w, "X"), 20);
    assert.equal(totalFrom(w, "W"), 20);
    assert.equal(totalTo(w, "Y"), 20, `${w.label}: Y total`);
    assert.equal(totalTo(w, "Z"), 20, `${w.label}: Z total`);
  }
  assert.equal(conditional(worldA, "X", "Y"), 0.8);
  assert.equal(conditional(worldA, "X", "Z"), 0.2);
  assert.equal(conditional(worldB, "X", "Y"), 0.2);
  assert.equal(conditional(worldB, "X", "Z"), 0.8);
  for (const w of [worldA, worldB]) {
    w.conditionals.forEach((c) => assert.equal(fmt(c.count, c.opportunities), c.probability));
    // the matched marginals are the record's own
    w.marginalTotals.forEach((m) => assert.equal(m.count, 20));
  }
});

test("a world's pairs are heard two tones at a time, and tally strokes come in fives", () => {
  assert.equal(worldA.events.length, worldA.sequence.length);
  const first = pairSounding(worldA, 0.05, true);
  assert.deepEqual(first, { from: worldA.sequence[0], to: worldA.sequence[1] });
  assert.equal(pairSounding(worldA, 0.05, false), undefined);
  assert.deepEqual(tallyGroups(16), { full: 3, rest: 1 });
  assert.deepEqual(tallyGroups(4), { full: 0, rest: 4 });
});

/* ---- Predictive Processing in Music: the envelope of an expectation ---------------- */

const pp = predictiveProcessingInMusic.predictiveProcessing!;
const [ctxA, ctxB] = pp.precisionInteraction.contexts;

test("the same +120 ms displacement lies farther from the centre of the narrow envelope than of the broad one — and the record's own numbers say so", () => {
  assert.equal(ctxA.targetOffsetMs, ctxB.targetOffsetMs, "the physical event is held constant");
  assert.equal(ctxA.targetOffsetMs, 120);
  assert.equal(standardised(ctxA.targetOffsetMs, ctxA.sigmaMs).toFixed(2), "3.43");
  assert.equal(standardised(ctxB.targetOffsetMs, ctxB.sigmaMs).toFixed(2), "1.33");
  assert.ok(standardised(120, ctxA.sigmaMs) > standardised(120, ctxB.sigmaMs));
  // and in the Gaussian teaching form the narrower envelope is the more precise one
  assert.ok(ctxA.sigmaMs < ctxB.sigmaMs && precisionOf(ctxA.sigmaMs) > precisionOf(ctxB.sigmaMs));
});

test("an envelope holds the same total probability at any width: narrower means taller, not more", () => {
  for (const sigma of [SIGMA.min, ctxA.sigmaMs, ctxB.sigmaMs, SIGMA.max]) {
    let area = 0;
    for (let ms = -6 * sigma; ms < 6 * sigma; ms += 0.5) area += density(ms, sigma) * 0.5;
    assert.ok(Math.abs(area - 1) < 0.002, `σ = ${sigma}: area ${area.toFixed(4)}`);
  }
  assert.ok(density(0, ctxA.sigmaMs) > density(0, ctxB.sigmaMs));
  // the tallest envelope drawn — the narrowest — fits the plot; the broadest is still visible
  const peak = (sigma: number) => Math.min(...envelopePoints(sigma).map(([, y]) => y));
  assert.ok(peak(SIGMA.min) >= 40 && peak(SIGMA.max) < 252 - 8);
});

test("the drawing's window is symmetric about the expected onset, and the record's target sits inside it", () => {
  assert.equal(xOfMs(-WINDOW) < xOfMs(0) && xOfMs(0) < xOfMs(WINDOW), true);
  assert.equal(Math.round(xOfMs(0) - xOfMs(-WINDOW)), Math.round(xOfMs(WINDOW) - xOfMs(0)));
  assert.ok(ctxA.targetOffsetMs < WINDOW && yOfDensity(density(0, ctxA.sigmaMs)) < 252);
  assert.equal(contextAt(pp.precisionInteraction.contexts, ctxA.sigmaMs), 0);
  assert.equal(contextAt(pp.precisionInteraction.contexts, ctxB.sigmaMs), 1);
  assert.equal(contextAt(pp.precisionInteraction.contexts, 60), -1, "a width between the two contexts is on neither");
});

test("the ladder is drawn with the higher, slower level at the top and the sensory end at the bottom — the record lists the levels the other way", () => {
  const labels = pp.hierarchy.cards.map((c) => c.label);
  assert.match(labels[0], /LOWER/i, "the record starts at the fast, sensory end");
  assert.match(labels[labels.length - 1], /HIGHER/i, "and ends at the higher, slower level");
  const drawn = ladderRungs(labels);
  assert.match(drawn[0], /HIGHER/i, "the top rung is the higher, slower level");
  assert.match(drawn[drawn.length - 1], /LOWER/i, "the bottom rung, next to the sound, is the lower, faster level");
  assert.deepEqual(ladderRungs(drawn), labels, "reordering neither loses nor repeats a level");
});

test("an omitted expected note leaves a mismatch where a present one leaves none — the silence is what the model did not expect", () => {
  const nBefore = pp.omission.preceding.length;
  const present = omissionSlots(true, nBefore);
  const omitted = omissionSlots(false, nBefore);
  assert.equal(present.length, nBefore + 1);
  assert.deepEqual(present.map(residual), [...Array(nBefore).fill(0), 0]);
  assert.deepEqual(omitted.map(residual), [...Array(nBefore).fill(0), -1]);
  assert.equal(pp.omission.expected, "target note");
});

/* ---- Music Preference and Person–Music Fit: a field of two literatures, five strands, two ways of measuring ---- */

const mp = musicPreference;
type Q = (typeof QUALITIES)[number];

test("the map puts the record's seven works in its two literatures: the workplace studies, and the work on taste", () => {
  const lanes = mp.origins.map((o) => laneOf(o, mp.applied!));
  assert.equal(lanes.length, 7);
  assert.equal(lanes.filter((l) => l === "work").length, mp.applied!.length, "the workplace lane is exactly the record's applied studies");
  assert.equal(lanes.filter((l) => l === "taste").length, 4);
  // each applied study is found on the trail once, in the work lane
  for (const a of mp.applied!) {
    const hits = mp.origins.filter((o) => o.year === a.year && laneOf(o, mp.applied!) === "work");
    assert.equal(hits.length, 1, `${a.authors} (${a.year}) sits once in the workplace lane`);
  }
  assert.equal(laneOf({ year: "2011", author: "Rentfrow, Goldberg &amp; Levitin", work: "", contribution: "" }, mp.applied!), "taste", "the same year does not pull the taste work into the workplace lane");
});

test("author lines are shortened for the map without losing who they are", () => {
  assert.equal(shortAuthors("Haake"), "Haake");
  assert.equal(shortAuthors("Rentfrow &amp; Gosling"), "Rentfrow & Gosling");
  assert.equal(shortAuthors("Rentfrow, Goldberg &amp; Levitin"), "Rentfrow et al.");
  assert.equal(shortAuthors("Oldham, Cummings, Mischel, Schmidtke &amp; Zhou"), "Oldham et al.");
  assert.equal(shortAuthors("Schäfer &amp; Sedlmeier"), "Schäfer & Sedlmeier");
});

test("the map runs in time: later works stand further right, and the two 2011 works stand one above the other", () => {
  const ks = knots(mp.origins, mp.applied!);
  for (let i = 1; i < ks.length; i++) assert.ok(ks[i].x >= ks[i - 1].x, "the trail is chronological");
  const y2011 = ks.filter((k) => k.year === 2011);
  assert.equal(y2011.length, 2);
  assert.equal(y2011[0].x, y2011[1].x, "the same year, the same place along the page");
  assert.notEqual(y2011[0].y, y2011[1].y, "one in each literature");
  for (const k of ks) assert.ok(k.x >= MAP.x0 && k.x <= MAP.x1);
  assert.equal(xOfYear(MAP.from), MAP.x0);
  assert.equal(xOfYear(MAP.to), MAP.x1);
});

test("close-set works keep their year labels apart: neighbours in one literature alternate in height", () => {
  const ks = knots(mp.origins, mp.applied!);
  for (const lane of ["taste", "work"] as const) {
    const line = ks.filter((k) => k.lane === lane);
    for (let i = 1; i < line.length; i++) {
      if (Math.abs(line[i].x - line[i - 1].x) < 40) assert.notEqual(line[i].tier, line[i - 1].tier, `${line[i - 1].year} and ${line[i].year} sit close together and must not share a label height`);
    }
  }
  assert.equal(ks.find((k) => k.year === 1995)!.tier, 0);
});

test("five strands stay apart on the left, twist round one another in the rope, and never coincide", () => {
  // apart, in order
  for (let i = 1; i < ROPE.n; i++) assert.ok(spreadY(i) > spreadY(i - 1));
  // at every place along the rope no two strands share both a height and a depth
  for (let x = ROPE.ropeTo; x <= ROPE.xEnd; x += 6) {
    for (let a = 0; a < ROPE.n; a++) for (let b = a + 1; b < ROPE.n; b++) {
      const A = strandAt(a, x), B = strandAt(b, x);
      assert.ok(Math.abs(A.y - B.y) + Math.abs(A.z - B.z) * ROPE.R > 3, `strands ${a} and ${b} are told apart at x = ${x}`);
    }
  }
  // every pair of strands crosses at least once in the rope: it is a weave, not a bundle
  for (let a = 0; a < ROPE.n; a++) for (let b = a + 1; b < ROPE.n; b++) {
    let crossings = 0, last = 0;
    for (let x = ROPE.ropeTo; x <= ROPE.xEnd; x += 2) {
      const d = Math.sign(strandAt(a, x).y - strandAt(b, x).y);
      if (d && last && d !== last) crossings += 1;
      if (d) last = d;
    }
    assert.ok(crossings >= 1, `strands ${a} and ${b} cross`);
  }
  // before the rope there is no depth to speak of
  for (let i = 0; i < ROPE.n; i++) assert.equal(strandAt(i, ROPE.xStart).z, 0);
  assert.equal(rope(30).length, ROPE.n * 30);
});

test("each of the five qualities is drawn with the character the record paraphrases", () => {
  const t = Object.fromEntries(QUALITIES.map((k) => [k, traceStats(k)])) as Record<Q, ReturnType<typeof traceStats>>;
  // Mellow: smooth, slow-moving, low-arousal — the gentlest trace, with few turns
  assert.ok(t.M.amplitude < t.I.amplitude / 2 && t.M.reversals < 8);
  // Unpretentious: straightforward, unadorned — a straight line, and nothing else
  assert.equal(t.U.strands, 1); assert.equal(t.U.reversals, 0);
  // Sophisticated: complex, inventive — the most independent lines
  assert.ok(t.S.strands > Math.max(t.M.strands, t.U.strands, t.I.strands, t.C.strands));
  // Intense: loud, forceful, high-energy — the tallest and the most agitated
  assert.ok(t.I.amplitude > Math.max(t.M.amplitude, t.U.amplitude, t.S.amplitude) && t.I.reversals > 5 * Math.max(1, t.M.reversals));
  // Contemporary: rhythmic and percussive — struck marks on a grid, no continuous line
  assert.equal(t.C.strands, 0); assert.ok(t.C.beats >= 16);
  assert.deepEqual(QUALITIES, mp.demo!.options as Q[], "the five drawn are the record's five, in its order");
  assert.deepEqual(mp.demo!.facets!.map((f) => f.initial), QUALITIES);
});

test("each synthesised sketch has the paraphrased character, runs to one length, and stays quiet enough to be safe", () => {
  const s = Object.fromEntries(QUALITIES.map((k) => [k, sketchStats(k)])) as Record<Q, ReturnType<typeof sketchStats>>;
  // Mellow moves least, Intense and Contemporary most
  assert.ok(s.M.density < Math.min(s.U.density, s.S.density, s.I.density, s.C.density));
  assert.ok(s.I.density > 3 * s.M.density && s.C.density > 3 * s.M.density);
  // Intense is the loudest: forceful, distorted
  assert.ok(s.I.peak > Math.max(s.M.peak, s.U.peak, s.S.peak, s.C.peak));
  // Sophisticated uses the most different notes; Unpretentious the fewest
  assert.ok(s.S.pitches > 2 * Math.max(s.M.pitches, s.U.pitches, s.I.pitches, s.C.pitches));
  assert.equal(s.U.pitches, 2);
  // Contemporary is struck and gridded: a kick on the syncopated pattern
  assert.ok(s.C.percussive >= KICK_STEPS.length);
  assert.equal(s.M.percussive + s.U.percussive + s.S.percussive + s.I.percussive, 0);
  for (const k of QUALITIES) {
    assert.ok(s[k].ends <= SKETCH_SECONDS + 0.05, `${k} ends within the shared length`);
    assert.ok(s[k].overlap <= 0.45, `${k} never sounds louder than the ceiling: ${s[k].overlap.toFixed(2)}`);
    assert.ok(s[k].lowest >= 36, `${k} stays out of the rumble`);
  }
});

test("the two ways of measuring give the record's two structures: four factors from genre names, five from excerpts", () => {
  assert.equal(FACTORS.names, 4);
  assert.equal(FACTORS.excerpts, 5);
  assert.match(mp.models![0].body, /four-factor/);
  assert.match(mp.models![1].name, /five-factor/);
  assert.match(mp.models![0].note ?? "", /genre labels/);
  assert.match(mp.models![1].note ?? "", /musical excerpts/);
  assert.equal(FACTORS.excerpts, mp.demo!.facets!.length, "the five drawn blocks are the five MUSIC dimensions");
});

test("a fit is the person's side and the situation's side together, and neither alone settles it", () => {
  assert.deepEqual(fitState("person"), { person: true, situation: false, joined: false });
  assert.deepEqual(fitState("situation"), { person: false, situation: true, joined: false });
  assert.deepEqual(fitState("both"), { person: true, situation: true, joined: true });
  assert.equal(mp.categories!.length, 2);
  assert.match(mp.categoriesLede!, /Neither side alone settles the outcome/);
});
