/* ---------------------------------------------------------------------------
   GESTALT PRINCIPLES IN MUSIC — Perceptual Field

   Designed from the record outward, on a blank white sheet.

   Three decisions shape everything else.

   1. The phenomenon comes before its name. A reader meets eight sound events
      and a movable gap before they meet a title, because this theory is about
      a percept that arrives before any concept is available to describe it.

   2. One set of eight events runs the whole length of the page in the margin,
      reorganised at every movement — by proximity, by similarity, in
      competition, nested, then abandoned. The material is constant; only the
      organisation changes. That is the theory, stated as a layout rather than
      as a sentence.

   3. Colour is an argument, not decoration. The first half is pigmented
      because it is about what a listener hears. From Prägnanz onward the
      page drains toward graphite, because the second half is about what the
      evidence will actually carry — and the record is insistent that these
      studies test later grouping rules, not classical Gestalt theory.

   Every claim, finding, qualification and source is the record's own. The
   editorial additions are the arrangement, the marks, and the decision about
   what deserves silence.
   ------------------------------------------------------------------------- */

import type { Metadata } from "next";
import Link from "next/link";
import { gestaltPrinciplesInMusic as G } from "../../../content/gestalt-principles-in-music";
import { RECORDS } from "../../../content/records";
import {
  Arrow, Brace, Ghost, Grain, Hatch, INK, OpenBoundary, PencilUnderline, Ring, Rule,
  Scumble, Strike, Wash, Wave, pigment,
} from "../_components/marks";
import { FieldPlot, type PlotGroup } from "../_components/FieldPlot";
import { FieldRail, type RailState } from "../_components/FieldRail";
import { PENCIL_TRACE, PencilPalette } from "../_components/PencilPalette";
import { GroupingPlayground } from "../_components/GroupingPlayground";
import { Stimulus } from "../_components/Stimulus";
import { ConflictLab } from "../_components/ConflictLab";
import { WholePart } from "../_components/WholePart";
import { Card, CardRow, Head, Movement, Note, html } from "../_components/shell";

export const metadata: Metadata = {
  title: "Gestalt Principles in Music · Perceptual Field",
  description:
    "How musical events become groups, boundaries and larger wholes — a perceptual tradition drawn out with its cues, its competition and its limits still attached.",
};

const g = G.gestalt!;

const titleOf = (id: string) =>
  RECORDS.find((r) => r.id === id)?.title ??
  id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

/* The constant material. Eight events, fixed once, carried down the margin. */
const FIELD = g.opening.presets[0].events;

/* A stable colour trace lets the reader recognise the same eight events while
   the grouping marks around them change. The colours are editorial, not an
   acoustic variable. */
const TRACE = PENCIL_TRACE.slice(0, FIELD.length);

/* Boundary identity, fixed for the whole page. */
const X = INK.teal;
const Y = INK.ochre;

/* Similarity is not proximity: repeated pitches, wherever they fall. */
const LIKE: string[] = FIELD.map((e) =>
  e.pitch === 65 ? INK.magenta : e.pitch === 67 ? INK.violet : "#c4c4bd",
);

const pair = (at: number, colour: string, row = 0, faded = false): PlotGroup[] => [
  { from: 0, to: at - 1, colour, row, faded },
  { from: at, to: FIELD.length - 1, colour, row, faded },
];

/* ------------------------------------------------------------------- rail */

const RAIL: RailState[] = [
  { id: "m-problem", num: "01", caption: "Eight events arrive. Nothing yet says where one thing ends." },
  {
    id: "m-whole", num: "02", caption: "One event, two wholes. Only the bracket moved.",
    groups: [...pair(4, X, 0), ...pair(2, INK.graphite, 1, true)],
  },
  { id: "m-proximity", num: "03", caption: "The wider gap offers a boundary.", groups: pair(4, X), boundaries: [{ after: 4, label: "B", colour: X }] },
  { id: "m-similarity", num: "04", caption: "Like with like — and likeness ignores the gap.", eventColours: LIKE },
  {
    id: "m-conflict", num: "05", caption: "Two cues. Two boundaries. No winner.",
    groups: [...pair(4, X, 0), ...pair(5, Y, 1)],
    boundaries: [{ after: 4, label: "X", colour: X }, { after: 5, label: "Y", colour: Y }],
  },
  {
    id: "m-laws", num: "06", caption: "It is also allowed to stay unresolved.",
    groups: [...pair(4, X, 0, true), ...pair(5, Y, 1, true)],
  },
  {
    id: "m-continuation", num: "07", caption: "What would carry the shape onward?",
    groups: [{ from: 0, to: 4, colour: X }, { from: 5, to: 7, colour: INK.graphite, dashed: true }],
  },
  { id: "m-closure", num: "08", caption: "Organised toward one bounded figure.", groups: [{ from: 0, to: 7, colour: X }] },
  { id: "m-pragnanz", num: "09", caption: "Which organisation is the good one? Never specified.", ghost: true },
  {
    id: "m-hierarchy", num: "10", caption: "Groups sit inside groups.",
    groups: [...pair(4, X, 0), { from: 0, to: 7, colour: Y, row: 1 }],
  },
  {
    id: "m-gttm", num: "11", caption: "Later, the same brackets get written as rules.",
    groups: [...pair(4, X, 0), { from: 0, to: 7, colour: Y, row: 1, dashed: true }],
  },
  { id: "m-deliege", num: "12", glyph: "■", glyphColour: INK.teal, glyphLabel: "source-grounded empirical finding", caption: "Bounded evidence about later grouping rules." },
  { id: "m-frankland", num: "13", glyph: "■", glyphColour: INK.teal, glyphLabel: "source-grounded empirical finding", caption: "Material- and task-specific, not a law." },
  { id: "m-culture", num: "14", glyph: "■", glyphColour: INK.teal, glyphLabel: "source-grounded empirical finding", caption: "A narrow boundary, carefully drawn." },
  { id: "m-scope", num: "15", glyph: "✦", glyphColour: INK.cobalt, glyphLabel: "concept lab synthesis", caption: "Where the account stops being useful." },
  { id: "m-not", num: "16", glyph: "●", glyphColour: INK.vermilion, glyphLabel: "source-grounded historical and theoretical claim", caption: "Fourteen shortcuts, each refused." },
  { id: "m-qual", num: "17", glyph: "▲", glyphColour: INK.ochre, glyphLabel: "constructed teaching and audio example", caption: "What this page built, and admits to building." },
  { id: "m-lineage", num: "18", glyph: "✦", glyphColour: INK.cobalt, glyphLabel: "concept lab synthesis", caption: "A branching history, not a ladder." },
  { id: "m-provenance", num: "19", glyph: "?", glyphColour: INK.cobalt, glyphLabel: "debated, broad, or under-specified", caption: "The marks in this margin, decoded." },
  { id: "m-origins", num: "20", glyph: "●", glyphColour: INK.vermilion, glyphLabel: "source-grounded historical and theoretical claim", caption: "Where each idea entered the record." },
  { id: "m-reading", num: "21", glyph: "●", glyphColour: INK.vermilion, glyphLabel: "source-grounded historical and theoretical claim", caption: "Six things, then everything else." },
  { id: "m-related", num: "22", glyph: "✦", glyphColour: INK.cobalt, glyphLabel: "concept lab synthesis", caption: "Different questions, deliberately kept apart." },
];

/* ------------------------------------------------------------------- page */

export default function Page() {
  return (
    <main className="pf-root">
      <Grain />

      {/* ================================================== running head === */}
      <div className="pf-canvas">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 20,
            paddingTop: 26,
            flexWrap: "wrap",
          }}
        >
          <span className="pf-meta" style={{ color: INK.charcoal, letterSpacing: "0.2em" }}>
            Academic Concept Lab
          </span>
          <span className="pf-meta">Perceptual Field · exploration no. 01</span>
        </div>
        <Rule width={1200} seed={11} opacity={0.3} style={{ width: "100%", height: 4, display: "block", marginTop: 12 }} />
      </div>

      {/* =================================================== 00 · opening === */}
      <div className="pf-canvas">
        <section style={{ paddingTop: "clamp(46px, 7vh, 84px)" }}>
          <div className="pf-grid" style={{ rowGap: 0 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <p className="pf-meta" style={{ marginBottom: 20 }}>
                music psychology · perceptual organisation · principle family
              </p>
            </div>

            <div style={{ gridColumn: "1 / -1", marginBottom: "clamp(28px, 4vh, 54px)" }}>
              <PencilPalette />
            </div>

            <div className="pf-open-lede">
              <p className="pf-lede" style={{ fontSize: "clamp(19px, 1.7vw, 25px)", lineHeight: 1.44, maxWidth: "36ch" }}>
                {g.opening.lede}
              </p>
            </div>

            <div className="pf-open-note">
              <p className="pf-hand" style={{ fontSize: "clamp(23px, 2.3vw, 31px)", lineHeight: 1.16 }}>
                Listen before you read.
                <br />
                The name of the theory
                <br />
                can wait.
              </p>
              <div style={{ marginTop: 12, marginLeft: 4 }}>
                <Arrow x1={8} y1={6} x2={62} y2={44} bow={16} colour={INK.cobalt} seed={31} width={80} height={54} weight={1.3} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: "clamp(28px, 4vh, 54px)", position: "relative" }}>
            {/* the field the events are deposited on */}
            <Wash
              width={1100}
              height={340}
              colour={INK.teal}
              seed={51}
              opacity={0.2}
              blur={24}
              style={{ position: "absolute", left: "-8%", top: "-14%", width: "116%", height: "96%", pointerEvents: "none" }}
            />
            <div style={{ position: "relative" }}>
              <Stimulus presets={g.opening.presets} note={g.opening.note} eventColours={TRACE} />
            </div>

            <GroupingPlayground events={FIELD} colours={TRACE} />
          </div>
        </section>
      </div>

      {/* ==================================================== the title ==== */}
      <div className="pf-canvas">
        <section style={{ paddingTop: "clamp(72px, 11vh, 150px)", paddingBottom: "clamp(20px, 3vh, 40px)" }}>
          <Rule width={1200} seed={12} colour={INK.charcoal} opacity={0.5} weight={1.4} style={{ width: "100%", height: 4, display: "block", marginBottom: "clamp(22px, 3vh, 40px)" }} />

          <p className="pf-meta" style={{ marginBottom: "clamp(16px, 2.5vh, 30px)" }}>
            what you have just been doing has a name
          </p>

          <h1 className="pf-title">
            <PencilUnderline colour={INK.teal} seed={421}>Gestalt</PencilUnderline> Principles
            <br />
            <em>in <PencilUnderline colour={INK.vermilion} seed={422}>Music</PencilUnderline></em>
          </h1>

          <div className="pf-grid" style={{ marginTop: "clamp(34px, 5vh, 62px)", rowGap: 30 }}>
            <div style={{ gridColumn: "1 / span 6" }} className="pf-hook-col">
              <p
                className="pf-display"
                style={{ fontSize: "clamp(22px, 2.4vw, 34px)", fontStyle: "italic", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.02em" }}
              >
                Where is the <PencilUnderline colour={INK.ochre} seed={423}>boundary?</PencilUnderline> Why do separate musical events become perceptual groups at all?
              </p>
            </div>
            <div style={{ gridColumn: "8 / span 5" }} className="pf-sentence-col">
              <p className="pf-body">{G.oneSentence}</p>
              <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ position: "relative", display: "inline-flex", padding: "5px 12px" }}>
                  <Ring width={230} height={34} colour={INK.vermilion} seed={44} weight={1.2}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
                  <span className="pf-stamp">{G.statusChip}</span>
                </span>
              </div>
            </div>
          </div>

          {/* the five facts, as a struck line of terms */}
          <div style={{ marginTop: "clamp(38px, 6vh, 70px)", display: "flex", flexWrap: "wrap", gap: "10px 26px", alignItems: "center" }}>
            {G.facts.map((f, i) => (
              <span key={f} style={{ display: "flex", alignItems: "center", gap: 26 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: "0.09em", color: INK.charcoal }}>
                  {f}
                </span>
                {i < G.facts.length - 1 ? (
                  <span style={{ color: "#cfcfc8", fontSize: 11 }}>/</span>
                ) : null}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* ================================================= the long page === */}
      <div className="pf-canvas">
        <div className="pf-spread">
          <div className="pf-rail">
            <FieldRail events={FIELD} states={RAIL} />
          </div>

          <div>
            {/* ------------------------------------------- 01 · the problem */}
            <Movement id="m-problem">
              <Head num="01" kicker="the problem" title="Sound does not arrive pre-divided" seed={101} />
              <p className="pf-lede" style={{ maxWidth: "44ch", marginBottom: 46 }}>{g.problem.lede}</p>
              <CardRow min={230}>
                {g.problem.cards.map((c, i) => (
                  <Card key={c.label} label={c.label} body={c.body} colour={c.colour} seed={110 + i * 9} />
                ))}
              </CardRow>
              <Note style={{ marginTop: 46 }}>{g.problem.note}</Note>
            </Movement>

            {/* ---------------------------------------------- 02 · the whole */}
            <Movement id="m-whole" tone="air">
              <Head num="02" kicker="whole and part" title="The part is changed by the whole it lands in" seed={102} />
              <p className="pf-lede" style={{ maxWidth: "48ch", marginBottom: 62 }}>{g.whole.lede}</p>
              <WholePart cases={g.whole.cases} />
              <Note style={{ marginTop: 54 }}>{g.whole.note}</Note>
            </Movement>

            {/* ------------------------------------------------ 03 · proximity
                The three cards are laid out by the very cue they describe:
                two sit close and read as a pair, the third is pushed away by
                a gap and reads as separate. */}
            <Movement id="m-proximity">
              <Head num="03" kicker="grouping factor · time" title="Proximity" seed={103} colour={X} />
              <p className="pf-lede" style={{ maxWidth: "46ch", marginBottom: 54 }}>{g.proximity.lede}</p>

              <div className="pf-grid" style={{ rowGap: 38 }}>
                <div style={{ gridColumn: "1 / span 3" }} className="pf-prox-a">
                  <Card label={g.proximity.cards[0].label} body={g.proximity.cards[0].body} colour={g.proximity.cards[0].colour} seed={131} />
                </div>
                <div style={{ gridColumn: "4 / span 3" }} className="pf-prox-b">
                  <Card label={g.proximity.cards[1].label} body={g.proximity.cards[1].body} colour={g.proximity.cards[1].colour} seed={132} />
                </div>
                <div style={{ gridColumn: "10 / span 3" }} className="pf-prox-c">
                  <Card label={g.proximity.cards[2].label} body={g.proximity.cards[2].body} colour={g.proximity.cards[2].colour} seed={133} />
                </div>
              </div>

              <div className="pf-prox-note" style={{ marginTop: 26 }}>
                <p className="pf-hand-sm" style={{ color: INK.graphite }}>
                  These three cards are spaced by the cue they describe. Two of them read as a pair
                  only because of the distance to the third.
                </p>
              </div>

              <Note style={{ marginTop: 46 }}>{g.proximity.note}</Note>
            </Movement>

            {/* ----------------------------------------------- 04 · similarity
                Here the spacing is deliberately even, so that likeness is the
                only thing left doing the grouping. */}
            <Movement id="m-similarity">
              <Head num="04" kicker="grouping factor · likeness" title="Similarity" seed={104} colour={INK.coral} />
              <p className="pf-lede" style={{ maxWidth: "46ch", marginBottom: 40 }}>{g.similarity.lede}</p>

              <div style={{ position: "relative", marginBottom: 44 }}>
                <Wash
                  width={880}
                  height={200}
                  colour={INK.magenta}
                  seed={57}
                  opacity={0.1}
                  blur={30}
                  style={{ position: "absolute", left: "-3%", top: "-10%", width: "106%", height: "110%", pointerEvents: "none" }}
                />
                <div
                  className="pf-scroller"
                  role="region"
                  aria-label="Similarity grouping sound field"
                  tabIndex={0}
                >
                  <FieldPlot
                    events={FIELD}
                    eventColours={LIKE}
                    width={880}
                    height={210}
                    seed={310}
                    pitchRange={[58, 71]}
                    colour={INK.graphite}
                  />
                </div>
                <p className="pf-hand-sm" style={{ marginTop: 6, color: INK.coral }}>
                  Two events share a pitch across the gap; two more share another. Likeness does not
                  care where the boundary was.
                </p>
              </div>

              <CardRow min={220} gap="clamp(24px, 3vw, 46px)">
                {g.similarity.cards.map((c, i) => (
                  <Card key={c.label} label={c.label} body={c.body} colour={c.colour} seed={140 + i * 7} />
                ))}
              </CardRow>
              <Note style={{ marginTop: 46 }}>{g.similarity.note}</Note>
            </Movement>

            {/* ------------------------------------------------- 05 · conflict
                The loudest movement. Everything before it has been building
                one cue at a time; here two of them pull at once. */}
            <Movement id="m-conflict" tone="air">
              <Rule width={1000} colour={INK.vermilion} seed={151} opacity={0.55} weight={1.6} style={{ width: "100%", height: 4, display: "block", marginBottom: 18 }} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 14 }}>
                <span className="pf-num">05</span>
                <span className="pf-meta" style={{ color: INK.vermilion }}>the central difficulty</span>
              </div>
              <h2 className="pf-h2" style={{ fontSize: "clamp(38px, 5.6vw, 78px)", maxWidth: "14ch", marginBottom: 34 }}>
                When cues compete
              </h2>
              <p className="pf-lede" style={{ maxWidth: "50ch", marginBottom: 56, fontSize: "clamp(19px, 1.55vw, 24px)" }}>
                {g.conflict.lede}
              </p>

              <ConflictLab
                presets={g.conflict.presets}
                question={g.conflict.question}
                note={g.conflict.note}
                eventColours={TRACE}
              />
            </Movement>

            {/* ----------------------------------------------------- 06 · laws */}
            <Movement id="m-laws">
              <Head num="06" kicker="what to call them" title="Tendencies, not laws" seed={106} />
              <p className="pf-lede" style={{ maxWidth: "48ch", marginBottom: 48 }}>{g.laws.lede}</p>
              <CardRow min={220}>
                {g.laws.cards.map((c, i) => (
                  <Card key={c.label} label={c.label} body={c.body} colour={c.colour} seed={160 + i * 6} />
                ))}
              </CardRow>
              <div style={{ marginTop: 40, maxWidth: 560, position: "relative" }}>
                <p className="pf-body" style={{ fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.02em", color: "#62625b", position: "relative", display: "inline-block", padding: "4px 0" }}>
                  if proximity X, then group Y — always
                  <Strike width={340} height={22} colour={INK.vermilion} seed={169}
                    style={{ position: "absolute", left: -6, top: "50%", transform: "translateY(-50%)", width: "calc(100% + 12px)" }} />
                </p>
                <p className="pf-hand-sm" style={{ marginTop: 8, color: INK.vermilion }}>
                  The record says explicitly: do not write this.
                </p>
              </div>
              <Note style={{ marginTop: 42 }}>{g.laws.note}</Note>
            </Movement>

            {/* --------------------------------------------- 07 · continuation */}
            <Movement id="m-continuation">
              <Head num="07" kicker="grouping factor · trajectory" title="Good continuation" seed={107} colour={INK.emerald} />
              <p className="pf-lede" style={{ maxWidth: "50ch", marginBottom: 50 }}>{g.continuation.lede}</p>
              <div style={{ display: "grid", gap: "clamp(22px, 3vw, 44px)", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                {g.continuation.options.map((c, i) => (
                  <div key={c.label} style={{ position: "relative" }}>
                    <Card label={c.label} body={c.body} colour={c.colour} seed={170 + i * 8} />
                  </div>
                ))}
              </div>
              <Note style={{ marginTop: 46 }}>{g.continuation.note}</Note>
            </Movement>

            {/* --------------------------------------------------- 08 · closure */}
            <Movement id="m-closure">
              <Head num="08" kicker="grouping factor · completion" title="Closure" seed={108} colour={INK.violet} />
              <div className="pf-grid" style={{ rowGap: 34 }}>
                <div style={{ gridColumn: "1 / span 6" }} className="pf-closure-a">
                  <p className="pf-lede" style={{ maxWidth: "42ch" }}>{g.closure.lede}</p>
                </div>
                <div style={{ gridColumn: "8 / span 5", position: "relative" }} className="pf-closure-b">
                  <div style={{ position: "relative", height: 130 }}>
                    <OpenBoundary width={300} height={130} colour={INK.violet} seed={181}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
                    <p className="pf-hand-sm" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: INK.violet, textAlign: "center", padding: 22, fontSize: 17 }}>
                      A configuration can be organised toward a bounded whole — without that whole
                      being a cadence.
                    </p>
                  </div>
                </div>
              </div>
              <CardRow min={220} style={{ marginTop: 48 }}>
                {g.closure.cards.map((c, i) => (
                  <Card key={c.label} label={c.label} body={c.body} colour={c.colour} seed={185 + i * 5} />
                ))}
              </CardRow>
              <Note style={{ marginTop: 44 }}>{g.closure.note}</Note>
            </Movement>

            {/* ------------------------------------------------- 09 · prägnanz
                The page goes quiet here. This is the unresolved centre of the
                tradition, and it is given air rather than an answer. */}
            <Movement id="m-pragnanz" tone="air">
              <Head num="09" kicker="the unfinished ambition" title="Prägnanz" seed={109} />

              <div className="pf-grid" style={{ rowGap: 40 }}>
                <div style={{ gridColumn: "1 / span 7" }} className="pf-prag-a">
                  <p className="pf-lede" style={{ maxWidth: "44ch", marginBottom: 40 }}>{g.pragnanz.lede}</p>

                  <p className="pf-meta" style={{ marginBottom: 10 }}>the historical statement</p>
                  <p className="pf-body" style={{ maxWidth: "50ch", marginBottom: 34 }}>{g.pragnanz.historical}</p>

                  <p className="pf-meta" style={{ marginBottom: 10, color: INK.vermilion }}>why it is not a mechanism</p>
                  <p className="pf-body" style={{ maxWidth: "50ch" }}>{g.pragnanz.problem}</p>
                </div>

                <div style={{ gridColumn: "9 / span 4", position: "relative" }} className="pf-prag-b">
                  <div style={{ position: "relative", marginBottom: 30 }}>
                    <Scumble width={190} height={190} colour={INK.graphite} seed={191} opacity={0.16} loops={30}
                      style={{ position: "absolute", left: "50%", top: -14, transform: "translateX(-50%)" }} />
                    <p style={{ position: "relative", fontFamily: "var(--display)", fontSize: 96, lineHeight: 1, color: INK.charcoal, textAlign: "center", margin: 0, opacity: 0.82 }}>
                      ?
                    </p>
                  </div>
                  <p className="pf-meta" style={{ marginBottom: 14 }}>later reformulations</p>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                    {g.pragnanz.later.map((term, i) => (
                      <li key={term} style={{ position: "relative", padding: "7px 12px" }}>
                        <Ghost width={220} height={34} seed={193 + i}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
                        <span style={{ position: "relative", fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: "0.06em", color: "#7d7d76" }}>
                          {term}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="pf-hand-sm" style={{ marginTop: 16, color: "#62625b", fontSize: 16 }}>
                    Drawn as ghosts: none of these is a classical Gestalt concept.
                  </p>
                </div>
              </div>

              <Note style={{ marginTop: 54 }}>{g.pragnanz.note}</Note>
            </Movement>

            {/* -------------------------------------------------- 10 · hierarchy */}
            <Movement id="m-hierarchy">
              <Head num="10" kicker="scaling up, carefully" title="Groups inside groups" seed={110} />
              <p className="pf-lede" style={{ maxWidth: "50ch", marginBottom: 48 }}>{g.hierarchy.lede}</p>

              <div style={{ display: "grid", gridTemplateColumns: "26px minmax(0, 1fr)", gap: 22 }}>
                <div style={{ paddingTop: 8 }}>
                  <Brace height={330} width={20} colour={INK.graphite} seed={201} weight={1.2}
                    style={{ height: "100%", maxHeight: 380 }} />
                </div>
                <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 26 }}>
                  {g.hierarchy.levels.map((c, i) => {
                    const col = pigment(c.colour);
                    return (
                      <li key={c.label} style={{ marginLeft: i * 26 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                          <Hatch width={30} height={11} colour={col} seed={205 + i} angle={-40} gap={2.4} opacity={0.9} style={{ flex: "none" }} />
                          <span className="pf-meta" style={{ color: col }}>{c.label}</span>
                        </div>
                        <p className="pf-body" style={{ maxWidth: "52ch" }}>{c.body}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <Note style={{ marginTop: 46 }}>{g.hierarchy.note}</Note>
            </Movement>

            {/* ------------------------------------------------------ 11 · gttm */}
            <Movement id="m-gttm">
              <Head num="11" kicker="a historical bridge" title="From tendency to written rule" seed={111} />
              <p className="pf-lede" style={{ maxWidth: "50ch", marginBottom: 52 }}>{g.gttm.lede}</p>

              <div className="pf-stages">
                {g.gttm.stages.map((c, i) => {
                  const col = pigment(c.colour);
                  return (
                    <div key={c.label} style={{ position: "relative" }}>
                      {i > 0 ? (
                        <div className="pf-stage-arrow">
                          <Arrow x1={2} y1={11} x2={22} y2={11} bow={-3} colour="#b7b7b0" seed={210 + i} width={26} height={22} weight={1.2} />
                        </div>
                      ) : null}
                      <span className="pf-num" style={{ display: "block", marginBottom: 10 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Rule width={200} colour={col} seed={215 + i} opacity={0.8} weight={1.6}
                        style={{ width: "100%", height: 4, display: "block", marginBottom: 12 }} />
                      <p className="pf-meta" style={{ color: col, marginBottom: 9 }}>{c.label}</p>
                      <p className="pf-small" style={{ color: "var(--body)" }}>{c.body}</p>
                    </div>
                  );
                })}
              </div>
              <Note style={{ marginTop: 46 }}>{g.gttm.note}</Note>
            </Movement>

            {/* ============================ the page changes instrument here ==
                From here the question is no longer what a listener hears but
                what the evidence carries. Pigment gives way to graphite. */}
            <Movement tone="tight">
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <Hatch width={120} height={26} colour={INK.graphite} seed={221} angle={-36} gap={3} opacity={0.5} />
                <p className="pf-meta" style={{ letterSpacing: "0.24em" }}>
                  part two · what the evidence carries
                </p>
              </div>
              <p className="pf-hand" style={{ marginTop: 20, color: "#62625b", maxWidth: "34ch" }}>
                The colour goes out of the page from here, because the studies ahead test later
                grouping rules — not classical Gestalt theory.
              </p>
            </Movement>

            {/* -------------------------------------------------- 12 · Deliège */}
            <Movement id="m-deliege">
              <Head num="12" kicker="evidence · x-ray" title="Deliège, 1987" seed={112} />
              <p className="pf-lede" style={{ maxWidth: "52ch", marginBottom: 44 }}>{g.deliege.lede}</p>
              <Xray x={g.deliege.evidence} seed={230} />
              <Note style={{ marginTop: 40 }}>{g.deliege.note}</Note>
            </Movement>

            {/* ----------------------------------------- 13 · Frankland & Cohen */}
            <Movement id="m-frankland">
              <Head num="13" kicker="evidence · x-ray" title="Frankland &amp; Cohen, 2004" seed={113} />
              <p className="pf-lede" style={{ maxWidth: "52ch", marginBottom: 44 }}>{g.frankland.lede}</p>
              <Xray x={g.frankland.evidence} seed={260} />
              <Note style={{ marginTop: 40 }}>{g.frankland.note}</Note>
            </Movement>

            {/* --------------------------------------------------- 14 · culture */}
            <Movement id="m-culture">
              <Head num="14" kicker="the experience boundary" title="Some grouping is shaped by what you have heard before" seed={114} width={800} />
              <p className="pf-lede" style={{ maxWidth: "52ch", marginBottom: 48 }}>{g.culture.lede}</p>
              <CardRow min={230}>
                {g.culture.cards.map((c, i) => (
                  <Card key={c.label} label={c.label} body={c.body} colour={c.colour} seed={280 + i * 6} />
                ))}
              </CardRow>
              <Note style={{ marginTop: 46 }}>{g.culture.note}</Note>
            </Movement>

            {/* ----------------------------------------------------- 15 · scope */}
            <Movement id="m-scope" tone="air">
              <Head num="15" kicker="scope" title="What it explains, and where it stops" seed={115} />
              <p className="pf-lede" style={{ maxWidth: "50ch", marginBottom: 56 }}>{g.scope.lede}</p>

              <div className="pf-scope">
                <div style={{ position: "relative", padding: "44px 40px 48px" }}>
                  <OpenBoundary width={420} height={420} colour={INK.cobalt} seed={301}
                    style={{ position: "absolute", inset: "-16px -26px", width: "calc(100% + 52px)", height: "calc(100% + 32px)", pointerEvents: "none" }} />
                  <p className="pf-meta" style={{ color: INK.cobalt, marginBottom: 18, position: "relative" }}>in scope</p>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, position: "relative", display: "flex", flexDirection: "column", gap: 11 }}>
                    {g.scope.explains.map((s) => (
                      <li key={s} style={{ display: "flex", gap: 11, alignItems: "baseline" }}>
                        <span style={{ color: INK.cobalt, fontSize: 9, flex: "none" }}>●</span>
                        <span className="pf-body" style={{ fontSize: 15.5 }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ padding: "34px 4px 36px" }}>
                  <p className="pf-meta" style={{ marginBottom: 18, color: "#62625b" }}>out of scope — for this record</p>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                    {g.scope.stops.map((s) => (
                      <li key={s} style={{ display: "flex", gap: 11, alignItems: "baseline" }}>
                        <span style={{ color: "#c6c6bf", fontSize: 9, flex: "none" }}>○</span>
                        <span className="pf-body" style={{ fontSize: 15.5, color: "#62625b" }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="pf-hand-sm" style={{ marginTop: 26, color: INK.cobalt }}>
                A permeable boundary, not a wall. What is outside it is still visible, and still real —
                it just belongs to a different record.
              </p>
              <Note style={{ marginTop: 34 }}>{g.scope.note}</Note>
            </Movement>

            {/* ------------------------------------------- 16 · what this is not
                Fourteen shortcuts, each struck through. The loudest quiet
                moment on the page: no colour except the refusals. */}
            <Movement id="m-not" tone="air">
              <Rule width={1000} colour={INK.vermilion} seed={321} opacity={0.5} weight={1.5}
                style={{ width: "100%", height: 4, display: "block", marginBottom: 18 }} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
                <span className="pf-num">16</span>
                <span className="pf-meta" style={{ color: INK.vermilion }}>corrections</span>
              </div>
              <h2 className="pf-h2" style={{ fontSize: "clamp(34px, 5vw, 68px)", maxWidth: "16ch", marginBottom: 26 }}>
                What this theory is not
              </h2>
              <p className="pf-lede" style={{ maxWidth: "46ch", marginBottom: 54 }}>{G.oversimplificationsLede}</p>

              <div className="pf-strike-wall">
                {G.oversimplifications.map((s, i) => (
                  <p key={i} className="pf-strike-item">
                    <span className="pf-struck" dangerouslySetInnerHTML={html(s)} />
                  </p>
                ))}
              </div>
            </Movement>

            {/* --------------------------------------------- 17 · qualifications */}
            <Movement id="m-qual">
              <Head num="17" kicker="qualifications" title="What this page built, and admits to building" seed={117} width={800} />
              <ol className="pf-quals">
                {G.qualifications.map((q, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "36px minmax(0, 1fr)", gap: 14, alignItems: "baseline" }}>
                    <span className="pf-num" style={{ color: INK.ochre }}>{String(i + 1).padStart(2, "0")}</span>
                    <p className="pf-body" style={{ maxWidth: "60ch" }}>{q}</p>
                  </li>
                ))}
              </ol>
            </Movement>

            {/* --------------------------------------------------- 18 · lineage */}
            <Movement id="m-lineage">
              <Head num="18" kicker="lineage" title="A branching history, not a ladder" seed={118} />
              <p className="pf-lede" style={{ maxWidth: "50ch", marginBottom: 54 }}>{g.lineage.lede}</p>
              <div className="pf-stages">
                {g.lineage.nodes.map((c, i) => {
                  const col = pigment(c.colour);
                  return (
                    <div key={c.label} style={{ position: "relative" }}>
                      {i > 0 ? (
                        <div className="pf-stage-arrow">
                          <Arrow x1={2} y1={11} x2={22} y2={11} bow={i === 3 ? 7 : -3} colour="#b7b7b0"
                            seed={340 + i} width={26} height={22} weight={1.2} dashed={i === 3} />
                        </div>
                      ) : null}
                      <Hatch width={44} height={13} colour={col} seed={345 + i} angle={-38} gap={2.5} opacity={0.85}
                        style={{ display: "block", marginBottom: 12 }} />
                      <p className="pf-meta" style={{ color: col, marginBottom: 9 }}>{c.label}</p>
                      <p className="pf-small" style={{ color: "var(--body)" }}>{c.body}</p>
                    </div>
                  );
                })}
              </div>
              <Note style={{ marginTop: 46 }}>{g.lineage.note}</Note>
            </Movement>

            {/* ------------------------------------------------ 19 · provenance */}
            <Movement id="m-provenance" tone="air">
              <Head num="19" kicker="provenance" title="The marks in the margin, decoded" seed={119} />
              <p className="pf-lede" style={{ maxWidth: "48ch", marginBottom: 12 }}>
                Every claim on this page carries a status. These five marks have been running down the
                left margin since the evidence began.
              </p>
              <p className="pf-hand-sm" style={{ marginBottom: 52, color: INK.cobalt }}>
                Where a claim came from is part of the claim.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {G.provenance.map((p, i) => {
                  const col = pigment(p.colour);
                  return (
                    <div key={p.label} className="pf-prov-row">
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                        <span style={{ fontSize: 26, lineHeight: 1, color: col, flex: "none", width: 28, fontFamily: "var(--display)" }}>
                          {p.glyph}
                        </span>
                        <p className="pf-h3" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.24 }}>{p.label}</p>
                      </div>
                      <p className="pf-small" style={{ maxWidth: "60ch" }}>{p.note}</p>
                      {i < G.provenance.length - 1 ? (
                        <Rule width={900} seed={360 + i} opacity={0.22}
                          style={{ gridColumn: "1 / -1", width: "100%", height: 4, display: "block", marginTop: 4 }} />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </Movement>

            {/* --------------------------------------------------- 20 · origins */}
            <Movement id="m-origins">
              <Head num="20" kicker="origins" title="Where each idea entered the record" seed={120} />
              <p className="pf-body" style={{ maxWidth: "58ch", marginBottom: 16 }}>{G.originsNote}</p>
              <p className="pf-small" style={{ maxWidth: "58ch", marginBottom: 56 }}>{G.trailLede}</p>

              <div>
                {G.origins.map((o, i) => (
                  <div key={o.year + o.author} className="pf-origin">
                    <div>
                      <span style={{ fontFamily: "var(--display)", fontSize: "clamp(30px, 3.4vw, 46px)", lineHeight: 1, color: INK.charcoal, letterSpacing: "-0.02em", fontWeight: 500 }}>
                        {o.year}
                      </span>
                    </div>
                    <div>
                      <p className="pf-h3" style={{ marginBottom: 3 }}>{o.author}</p>
                      <p style={{ fontFamily: "var(--read)", fontStyle: "italic", fontSize: 16, color: "#707069", margin: "0 0 10px" }}>
                        {o.work}
                      </p>
                      <p className="pf-small" style={{ color: "var(--body)", maxWidth: "56ch" }}>{o.contribution}</p>
                    </div>
                    {i < G.origins.length - 1 ? (
                      <Rule width={900} seed={370 + i} opacity={0.2}
                        style={{ gridColumn: "1 / -1", width: "100%", height: 4, display: "block", marginTop: 22 }} />
                    ) : null}
                  </div>
                ))}
              </div>
            </Movement>

            {/* --------------------------------------------------- 21 · sources */}
            <Movement id="m-reading" tone="air">
              <Head num="21" kicker="sources" title={G.minimumReadingLabel} seed={121} />

              <ol style={{ listStyle: "none", margin: "0 0 72px", padding: 0, display: "flex", flexDirection: "column", gap: 30 }}>
                {G.minimumReading.map((s, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr)", gap: 14 }}>
                    <span className="pf-num" style={{ paddingTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="pf-cite" style={{ maxWidth: "62ch" }} dangerouslySetInnerHTML={html(s.citation)} />
                      <p className="pf-small" style={{ marginTop: 7, maxWidth: "58ch", fontSize: 13.5 }}>{s.contribution}</p>
                      {s.doi ? (
                        <a
                          className="pf-link"
                          href={`https://doi.org/${s.doi}`}
                          style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.08em", display: "inline-block", marginTop: 8 }}
                        >
                          doi:{s.doi}
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>

              <p className="pf-meta" style={{ marginBottom: 26 }}>and the rest of the trail</p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 24 }}>
                {G.fullSources.map((s, i) => (
                  <li key={i} style={{ maxWidth: "62ch" }}>
                    <p className="pf-cite" style={{ fontSize: 13.5, color: "#5c5c55" }} dangerouslySetInnerHTML={html(s.citation)} />
                    <p className="pf-small" style={{ marginTop: 5, fontSize: 13 }}>{s.contribution}</p>
                  </li>
                ))}
              </ul>
            </Movement>

            {/* --------------------------------------------------- 22 · related */}
            <Movement id="m-related">
              <Head num="22" kicker="nearby records" title="Different questions, kept apart on purpose" seed={122} width={800} />
              <p className="pf-lede" style={{ maxWidth: "52ch", marginBottom: 50 }}>{G.relatedToLede}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                {(G.relatedTo ?? []).map((r) => (
                  <div key={r.recordId} className="pf-related">
                    <div>
                      <p className="pf-meta" style={{ marginBottom: 7 }}>{r.relation}</p>
                      <Link href={`/concept-lab/theory/${r.recordId}`} className="pf-h3 pf-link" style={{ background: "none", fontFamily: "var(--display)" }}>
                        {titleOf(r.recordId)}
                      </Link>
                    </div>
                    <p className="pf-body" style={{ maxWidth: "56ch" }}>{r.body}</p>
                  </div>
                ))}
              </div>
            </Movement>
          </div>
        </div>
      </div>

      {/* ======================================================= colophon === */}
      <div className="pf-canvas">
        <Rule width={1200} seed={900} opacity={0.35} style={{ width: "100%", height: 4, display: "block" }} />
        <footer className="pf-foot">
          <div>
            <p className="pf-meta" style={{ color: INK.charcoal, letterSpacing: "0.2em", marginBottom: 8 }}>
              Academic Concept Lab
            </p>
            <p className="pf-small" style={{ maxWidth: "42ch" }}>
              Perceptual Field — an isolated visual exploration. The theory content is the live
              record; the composition, the marks and the margin instrument are new.
            </p>
          </div>
          <p className="pf-hand" style={{ color: INK.cobalt, textAlign: "right" }}>
            Same eight events.
            <br />
            Twelve ways of hearing them.
          </p>
        </footer>
      </div>

      {/* --------------------------------------------------- page-local rules */}
      <style>{`
        .pf-open-lede { grid-column: 1 / span 6; }
        .pf-open-note { grid-column: 8 / span 4; padding-top: 4px; }
        .pf-strike-wall {
          column-count: 2;
          column-gap: clamp(30px, 5vw, 78px);
        }
        .pf-strike-wall > * { break-inside: avoid; }
        .pf-stages {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(20px, 2.6vw, 40px);
        }
        .pf-stage-arrow {
          position: absolute;
          left: calc(-1 * clamp(20px, 2.6vw, 40px) - 2px);
          top: 0;
          width: 26px;
        }
        .pf-scope {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(28px, 4vw, 64px);
          align-items: start;
        }
        .pf-quals {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .pf-prov-row {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.25fr);
          gap: clamp(20px, 3vw, 48px);
          padding: 20px 0;
          align-items: start;
        }
        .pf-origin {
          display: grid;
          grid-template-columns: 150px minmax(0, 1fr);
          gap: clamp(18px, 2.5vw, 40px);
          padding-bottom: 22px;
          align-items: start;
        }
        .pf-related {
          display: grid;
          grid-template-columns: 260px minmax(0, 1fr);
          gap: clamp(20px, 3vw, 48px);
          align-items: start;
        }
        @media (max-width: 900px) {
          .pf-open-lede, .pf-open-note,
          .pf-hook-col, .pf-sentence-col,
          .pf-prox-a, .pf-prox-b, .pf-prox-c,
          .pf-closure-a, .pf-closure-b,
          .pf-prag-a, .pf-prag-b { grid-column: 1 / -1 !important; }
          .pf-strike-wall { column-count: 1; }
          .pf-stages { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 34px; }
          .pf-stage-arrow { display: none; }
          .pf-scope { grid-template-columns: minmax(0, 1fr); }
          .pf-prov-row, .pf-origin, .pf-related { grid-template-columns: minmax(0, 1fr); gap: 10px; }
          .pf-origin { padding-bottom: 6px; }
        }
        @media (max-width: 560px) {
          .pf-stages { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>
    </main>
  );
}

/* ---------------------------------------------------------------- evidence
   The X-ray. Four rows a study normally publishes, and one row it normally
   does not: what the study did *not* test. That row is drawn as negative
   space — a dashed boundary around ground the evidence never covered —
   because on this record the limits of a finding are the finding.
   ------------------------------------------------------------------------ */

function Xray({
  x,
  seed,
}: {
  x: NonNullable<typeof G.gestalt>["deliege"]["evidence"];
  seed: number;
}) {
  const rows: { label: string; value: string; tone?: "normal" }[] = [
    ...(x.design ? [{ label: "design", value: x.design }] : []),
    { label: x.testedLabel, value: x.tested },
    { label: x.foundLabel, value: x.found },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 10 }}>
        <p className="pf-h3" style={{ fontSize: 22 }}>{x.title}</p>
        <span className="pf-meta" style={{ color: INK.teal }}>{x.label}</span>
      </div>
      <p className="pf-cite" style={{ maxWidth: "62ch", color: "#5c5c55", marginBottom: 26 }}
        dangerouslySetInnerHTML={html(x.citation)} />

      <Rule width={900} seed={seed} opacity={0.35} style={{ width: "100%", height: 4, display: "block" }} />

      {rows.map((r, i) => (
        <div key={r.label} className="pf-xray-row">
          <p className="pf-meta" style={{ paddingTop: 3 }}>{r.label}</p>
          <p className="pf-body" style={{ maxWidth: "58ch" }}>{r.value}</p>
          {i === rows.length - 1 ? null : null}
        </div>
      ))}

      {/* the row that is usually missing */}
      <div style={{ position: "relative", marginTop: 22, padding: "24px 26px 26px" }}>
        <Ghost width={800} height={160} colour="#b4b4ac" seed={seed + 5}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
        <Hatch width={800} height={160} colour="#cfcfc7" seed={seed + 9} angle={-40} gap={5.5} opacity={0.75}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
        <div style={{ position: "relative" }} className="pf-xray-row">
          <p className="pf-meta" style={{ color: INK.vermilion, paddingTop: 3 }}>what it did not test</p>
          <div>
            <p className="pf-body" style={{ maxWidth: "58ch", color: "#6f6f68" }}>{x.notTested}</p>
            <div style={{ marginTop: 12 }}>
              <Wave width={190} colour="#b9b9b1" seed={seed + 12} amp={1.6} />
            </div>
          </div>
        </div>
      </div>

      {x.doi ? (
        <a
          className="pf-link"
          href={`https://doi.org/${x.doi}`}
          style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.08em", display: "inline-block", marginTop: 22 }}
        >
          doi:{x.doi}
        </a>
      ) : null}
    </div>
  );
}
