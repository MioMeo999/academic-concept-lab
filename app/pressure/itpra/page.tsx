/* ---------------------------------------------------------------------------
   PRESSURE · record two — Huron's ITPRA Theory of Expectation

   Intellectual structure: a temporal hinge. Five response systems arranged
   around one outcome onset. The composition is therefore bands around a
   hinge: imagination reaching far left, tension tightening toward the
   moment, prediction and reaction breaking together on the right, appraisal
   trailing long after.

   The content is the live record's own — every claim, finding, qualification
   and source is taken from content/hurons-itpra-theory-of-expectation.ts
   unaltered. Same hand as record one; a different composition, because the
   theory has a different shape.
   ------------------------------------------------------------------------- */

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { huronsItpraTheory as T } from "../../../content/hurons-itpra-theory-of-expectation";
import { RECORDS, recordHref } from "../../../content/records";
import { Arrow, Band, Grain, Hatch, Hinge, INK, Mass, Rule, Tick } from "../_components/marks";
import {
  Folio, Head, LedgerRow, MarginGlyphs, Movement, Note, ProvenanceLedger,
  References, Scope, html,
} from "../_components/shell";
import { HingeTimeline, type Window_ } from "./_components/HingeTimeline";

export const metadata: Metadata = {
  title: "Huron’s ITPRA · Pressure · Academic Concept Lab",
  description: "ITPRA composed as bands around a hinge — an isolated visual exploration.",
};

const pigment = (c: string): string =>
  ({
    "var(--teal)": INK.teal,
    "var(--red)": INK.vermilion,
    "var(--gold-deep)": INK.ochre,
    "var(--plum-deep)": INK.violet,
    "var(--pen-3)": INK.graphite,
  })[c] ?? INK.graphite;

const HURON = T.huron!;

const WINDOWS: Window_[] = HURON.timeline.windows.map((w) => ({
  key: w.key,
  label: w.label,
  epoch: w.epoch,
  question: w.question,
  body: w.body,
  function_: w.function,
  boundary: w.boundary,
  colour: pigment(w.colour),
  start: w.start,
  end: w.end,
}));

/* The on-time / delayed comparison, drawn. Notes are deposits on a 6-second
   track; the delay is a hatched silence between the expected and the actual
   onset. A constructed teaching example — the record's own — drawn, not
   played, in this exploration. */
function TimingTrack({
  label,
  notes,
  colour,
  expectedAt,
  actualAt,
  markerLabel,
  seed,
}: {
  label: string;
  notes: { t: number; pitch: string }[];
  colour: string;
  expectedAt: number;
  actualAt: number;
  markerLabel: string;
  seed: number;
}) {
  const SPAN = 6; // seconds shown
  const pct = (t: number) => (t / SPAN) * 100;
  return (
    <div>
      <p className="ps-card-label" style={{ color: colour }}>{label}</p>
      <div className="ps-scroller">
        <div style={{ position: "relative", minWidth: 560, height: 120, marginTop: 12, borderBottom: "1px solid var(--hair)" }}>
          {/* the silence where something was expected */}
          {actualAt > expectedAt ? (
            <Hatch
              width={120}
              height={74}
              colour={INK.ochre}
              seed={seed + 1}
              angle={-42}
              gap={4}
              opacity={0.5}
              style={{
                position: "absolute",
                left: `${pct(expectedAt)}%`,
                width: `${pct(actualAt) - pct(expectedAt)}%`,
                top: 8,
              }}
            />
          ) : null}

          {notes.map((n, i) => (
            <div key={i} style={{ position: "absolute", left: `${pct(n.t)}%`, top: 34, transform: "translateX(-50%)", textAlign: "center" }}>
              <Mass size={26} colour={INK.charcoal} seed={seed + 10 + i} density={0.75} style={{ margin: "0 auto" }} />
              <span className="ps-meta" style={{ fontSize: 9 }}>{n.pitch}</span>
            </div>
          ))}

          {/* expected vs actual onset */}
          <Hinge height={92} colour={actualAt > expectedAt ? INK.ochre : colour} seed={seed + 2} weight={1.6}
            style={{ position: "absolute", left: `${pct(expectedAt)}%`, top: 6, transform: "translateX(-50%)" }} />
          {actualAt > expectedAt ? (
            <Hinge height={92} colour={colour} seed={seed + 3} weight={2.2}
              style={{ position: "absolute", left: `${pct(actualAt)}%`, top: 6, transform: "translateX(-50%)" }} />
          ) : null}
          <span className="ps-hand-sm" style={{ position: "absolute", left: `${pct(expectedAt)}%`, bottom: -6, transform: "translateX(-50%) rotate(-1deg)", color: actualAt > expectedAt ? INK.ochre : colour, whiteSpace: "nowrap" }}>
            {markerLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ItpraPage() {
  const H = T.huron!;
  const related = T.relatedTo!
    .map((rel) => ({ rel, record: RECORDS.find((r) => r.id === rel.recordId) }))
    .filter((x) => x.record);

  const onTime = H.opening.timing.presets[0];
  const delayed = H.opening.timing.presets[1];
  const pitchNames = ["C4", "E4", "G4", "G4", "C5"];

  return (
    <main className="ps-root">
      <Grain />
      <div className="ps-canvas">
        {/* ---------------------------------------------------------- masthead */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, paddingTop: 26, flexWrap: "wrap" }}>
          <span className="ps-meta" style={{ color: "var(--ink)", letterSpacing: "0.2em" }}>
            <Link href="/pressure" style={{ color: "inherit", textDecoration: "none" }}>Pressure</Link>
            {" · record two"}
          </span>
          <span className="ps-meta">
            canonical record ·{" "}
            <Link href={recordHref(T)} className="ps-link">{recordHref(T)}</Link>
          </span>
        </div>
        <Rule width={1200} seed={11} opacity={0.3} style={{ width: "100%", height: 4, display: "block", marginTop: 12 }} />

        {/* --------------------------------------------------------------- hero */}
        <section style={{ padding: "clamp(60px, 10vh, 120px) 0 clamp(48px, 7vh, 90px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(280px, 0.75fr)", gap: "clamp(28px, 5vw, 80px)", alignItems: "center" }}>
            <div>
              <p className="ps-meta" style={{ marginBottom: 24 }}>theory record · psychology of music · structure: temporal hinge</p>
              <h1 className="ps-title" style={{ fontSize: "clamp(46px, 7.5vw, 108px)", maxWidth: "12ch" }}>
                Expectation is not <em>one feeling</em>
              </h1>
              <p className="ps-lede" style={{ marginTop: 30, maxWidth: "36ch" }}>
                Huron&rsquo;s ITPRA theory of expectation
              </p>
              <p className="ps-body" style={{ marginTop: 16, maxWidth: "52ch" }}>{T.oneSentence}</p>
              <MarginGlyphs glyphs={[
                { glyph: "●", colour: INK.teal, label: "Huron's theory" },
                { glyph: "■", colour: INK.vermilion, label: "empirical evidence" },
                { glyph: "▲", colour: INK.ochre, label: "teaching construction" },
                { glyph: "✦", colour: INK.violet, label: "editorial synthesis" },
                { glyph: "?", label: "open" },
              ]} />
            </div>
            <div style={{ position: "relative", height: 260 }} aria-hidden="true">
              <Band width={230} height={34} colour={INK.teal} seed={301} opacity={0.65} style={{ position: "absolute", left: 0, top: 30 }} />
              <Band width={150} height={34} colour={INK.ochre} seed={302} opacity={0.8} style={{ position: "absolute", left: 96, top: 74 }} />
              <Hinge height={220} colour={INK.charcoal} seed={303} weight={2.2} style={{ position: "absolute", left: 236, top: 10 }} />
              <Band width={110} height={34} colour={INK.vermilion} seed={304} opacity={0.85} style={{ position: "absolute", left: 254, top: 74 }} />
              <Band width={140} height={30} colour={INK.violet} seed={305} opacity={0.55} style={{ position: "absolute", left: 254, top: 118 }} />
              <span className="ps-hand" style={{ position: "absolute", right: 0, bottom: 0, transform: "rotate(-2deg)", maxWidth: "13ch" }}>
                one moment, five questions
              </span>
            </div>
          </div>
        </section>

        {/* ---------------------------------------- 01 · before / after · P2 */}
        <Movement id="m-opening" pressure={2}>
          <Head num="01" kicker="the opening distinction" title="Before and after are different countries" pressure={2} seed={311} width={820} />
          <MarginGlyphs glyphs={[{ glyph: "●", colour: INK.teal, label: "Huron's framework" }]} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(24px, 4vw, 64px)", alignItems: "end" }}>
            <p className="ps-lede" style={{ maxWidth: "46ch" }}>{H.opening.lede}</p>
            <div>
              <p className="ps-hand" style={{ fontSize: 26, maxWidth: "22ch" }}>“{H.opening.question}”</p>
              <Note style={{ marginTop: 18 }}>{H.opening.note}</Note>
            </div>
          </div>
        </Movement>

        {/* ------------------------------------------- 02 · the hinge · P4 */}
        <Movement id="m-hinge" pressure={4}>
          <Head num="02" kicker="the centrepiece · full pigment" title="Five systems around one hinge" pressure={4} colour={INK.cobalt} seed={321} />
          <MarginGlyphs glyphs={[
            { glyph: "✦", colour: INK.violet, label: "teaching synthesis" },
            { glyph: "●", colour: INK.teal, label: "Huron's architecture" },
          ]} />
          <p className="ps-lede" style={{ maxWidth: "54ch", marginBottom: 12 }}>{H.timeline.lede}</p>
          <p className="ps-hand" style={{ margin: "18px 0 30px", maxWidth: "32ch", transform: "rotate(-1deg)" }}>
            press hardest at the hinge — it is where the theory lives.
          </p>

          <HingeTimeline windows={WINDOWS} />

          {/* static reading path: every window, printed */}
          <div style={{ marginTop: 44, borderTop: "1px solid var(--hair)" }}>
            {WINDOWS.map((w) => (
              <div key={w.key} style={{ display: "grid", gridTemplateColumns: "170px minmax(0,1fr)", gap: 18, padding: "12px 0", borderBottom: "1px solid var(--hair)", alignItems: "baseline" }}>
                <span className="ps-meta" style={{ color: w.colour }}>{w.label}</span>
                <span className="ps-small">
                  <strong style={{ color: "var(--ink)" }}>{w.question}</strong> — {w.body}{" "}
                  <span style={{ color: "var(--faint)" }}>({w.epoch}; proposed function: {w.function_}; not {w.boundary})</span>
                </span>
              </div>
            ))}
          </div>
          <Note style={{ marginTop: 26 }}>{H.timeline.note}</Note>
        </Movement>

        {/* ------------------------------ 03 · nothing happened · P3 */}
        <Movement id="m-timing" pressure={3}>
          <Head num="03" kicker="the smallest useful manipulation" title="What changed while nothing happened?" pressure={3} colour={INK.ochre} seed={331} width={840} />
          <MarginGlyphs glyphs={[{ glyph: "▲", colour: INK.ochre, label: "controlled teaching example" }]} />
          <p className="ps-lede" style={{ maxWidth: "52ch", marginBottom: 34 }}>{H.opening.timing.lede}</p>

          <div className="ps-flow" style={{ "--flow": "38px" } as CSSProperties}>
            <TimingTrack
              label={onTime.label}
              notes={onTime.events.map((e, i) => ({ t: e.start, pitch: pitchNames[i] }))}
              colour={INK.teal}
              expectedAt={4}
              actualAt={4}
              markerLabel="expected = actual"
              seed={340}
            />
            <TimingTrack
              label={delayed.label}
              notes={delayed.events.map((e, i) => ({ t: e.start, pitch: pitchNames[i] }))}
              colour={INK.vermilion}
              expectedAt={4}
              actualAt={5.5}
              markerLabel="expected onset — and nothing"
              seed={350}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(20px, 3vw, 48px)", marginTop: 40 }}>
            <p className="ps-body" style={{ maxWidth: "48ch" }}>{delayed.body}</p>
            <p className="ps-hand" style={{ maxWidth: "24ch" }}>
              the shaded silence is the theory&rsquo;s subject: preparation with nothing yet to react to.
            </p>
          </div>
          <Note style={{ marginTop: 24 }}>{H.opening.timing.note}</Note>
        </Movement>

        {/* -------------------------------------- 04 · five questions · P2 */}
        <Movement id="m-systems" pressure={2}>
          <Head num="04" kicker="the vocabulary" title="Five systems, five questions" pressure={2} seed={361} />
          <MarginGlyphs glyphs={[{ glyph: "■", colour: INK.vermilion, label: "faithful explanation" }]} />
          <p className="ps-lede" style={{ maxWidth: "54ch", marginBottom: 34 }}>{H.overview.lede}</p>
          <div className="ps-cards">
            {H.overview.cards.map((c, i) => (
              <div key={c.label}>
                <Hatch width={72} height={18} colour={pigment(c.colour)} seed={370 + i} angle={-38} gap={2.6} opacity={0.9}
                  style={{ display: "block", marginBottom: 12 }} />
                <p className="ps-card-label" style={{ color: pigment(c.colour) }}>{c.label}</p>
                <p className="ps-small" style={{ color: "var(--body)" }}>{c.body}</p>
              </div>
            ))}
          </div>
          <Note style={{ marginTop: 28 }}>{H.overview.note}</Note>
        </Movement>

        {/* ------------------------------------ 05 · P + R together · P3 */}
        <Movement id="m-parallel" pressure={3}>
          <Head num="05" kicker="against the acronym" title="P and R break together" pressure={3} colour={INK.vermilion} seed={381} />
          <MarginGlyphs glyphs={[{ glyph: "●", colour: INK.teal, label: "Huron, explicitly" }]} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(24px, 4vw, 64px)", alignItems: "start" }}>
            <div>
              <p className="ps-lede" style={{ maxWidth: "46ch" }}>{H.parallel.lede}</p>
              <p className="ps-h3" style={{ marginTop: 26, fontSize: "clamp(20px, 2vw, 30px)" }}>
                <span className="ps-struck">I → T → P → R → A, in order, every time</span>
              </p>
              <p className="ps-hand-sm" style={{ marginTop: 14, maxWidth: "30ch" }}>
                the acronym is a memory aid, not a conveyor belt.
              </p>
            </div>
            <div className="ps-cards" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
              {H.parallel.cards.map((c) => (
                <div key={c.label} style={{ borderTop: `2px solid ${pigment(c.colour)}`, paddingTop: 12 }}>
                  <p className="ps-card-label" style={{ color: pigment(c.colour) }}>{c.label}</p>
                  <p className="ps-small" style={{ color: "var(--body)" }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
          <Note style={{ marginTop: 28 }}>{H.parallel.note}</Note>
        </Movement>

        {/* --------------------------------------- 06 · four sources · P2 */}
        <Movement id="m-sources-of" pressure={2}>
          <Head num="06" kicker="a parallel layer" title="Where expectations come from" pressure={2} seed={391} />
          <MarginGlyphs glyphs={[{ glyph: "●", colour: INK.teal, label: "Huron's distinction" }]} />
          <p className="ps-lede" style={{ maxWidth: "54ch", marginBottom: 30 }}>{H.sourcesOfExpectation.lede}</p>
          <div style={{ borderTop: "1px solid var(--hair)" }}>
            {H.sourcesOfExpectation.sources.map((s) => (
              <div key={s.label} style={{ display: "grid", gridTemplateColumns: "minmax(120px, 0.3fr) minmax(0, 1fr)", gap: 18, padding: "15px 0", borderBottom: "1px solid var(--hair)" }}>
                <div>
                  <p className="ps-card-label" style={{ color: pigment(s.colour) }}>{s.label}</p>
                  <p className="ps-hand-sm" style={{ fontSize: 16 }}>{s.question}</p>
                </div>
                <div>
                  <p className="ps-body">{s.body}</p>
                  <p className="ps-small" style={{ marginTop: 4 }}>{s.memory}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30 }}>
            <p className="ps-meta" style={{ marginBottom: 14 }}>one event, two verdicts — the deceptive cadence</p>
            <div className="ps-cards">
              {H.schematicVeridical.cards.map((c) => (
                <div key={c.label} style={{ borderTop: `2px solid ${pigment(c.colour)}`, paddingTop: 12 }}>
                  <p className="ps-card-label" style={{ color: pigment(c.colour) }}>{c.label}</p>
                  <p className="ps-small" style={{ color: "var(--body)" }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
          <Note style={{ marginTop: 26 }}>{H.sourcesOfExpectation.note}</Note>
        </Movement>

        {/* ------------------------------------- 07 · mixed feelings · P3 */}
        <Movement id="m-valence" pressure={3}>
          <Head num="07" kicker="contrastive valence" title="The systems need not agree" pressure={3} colour={INK.violet} seed={401} />
          <MarginGlyphs glyphs={[{ glyph: "●", colour: INK.teal, label: "Huron's proposal" }, { glyph: "?", label: "not a universal pathway" }]} />
          <p className="ps-lede" style={{ maxWidth: "54ch", marginBottom: 36 }}>{H.valence.lede}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "clamp(20px, 3vw, 40px)" }}>
            {H.valence.steps.map((s, i) => (
              <div key={s.label}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <Band width={64} height={20} colour={pigment(s.colour)} seed={410 + i} opacity={0.55 + i * 0.15} />
                  {i < H.valence.steps.length - 1 ? (
                    <Arrow x1={2} y1={10} x2={26} y2={10} bow={-4} colour={INK.ghost} seed={420 + i} width={28} height={20} weight={1.2} />
                  ) : null}
                </div>
                <p className="ps-card-label" style={{ color: pigment(s.colour) }}>{s.label}</p>
                <p className="ps-small" style={{ color: "var(--body)" }}>{s.body}</p>
              </div>
            ))}
          </div>
          <Note tone="caution" style={{ marginTop: 30 }}>{H.valence.note}</Note>
        </Movement>

        {/* ------------------------------------- 08 · evidence ledger · P1 */}
        <Movement id="m-evidence" pressure={1}>
          <Head num="08" kicker="evidence · the ledger" title="Convergent evidence, carefully bounded" pressure={1} seed={431} width={840} />
          <MarginGlyphs glyphs={[{ glyph: "■", colour: INK.vermilion, label: "study summaries" }]} />
          <p className="ps-body" style={{ maxWidth: "56ch", marginBottom: 34 }}>{H.evidence.lede}</p>
          <div className="ps-ledger">
            {H.evidence.items.map((e, i) => (
              <LedgerRow
                key={e.title}
                index={String(i + 1).padStart(2, "0")}
                title={e.title}
                label={e.label}
                citation={e.citation}
                testedLabel={e.testedLabel}
                tested={e.tested}
                foundLabel={e.foundLabel}
                found={e.found}
                notTested={e.notTested}
                doi={e.doi}
              />
            ))}
          </div>
          <Note style={{ marginTop: 26 }}>{H.evidence.note}</Note>
        </Movement>

        {/* ---------------------------------------------- 09 · scope · P1 */}
        <Movement id="m-scope" pressure={1}>
          <Head num="09" kicker="scope" title="A vocabulary, not a complete theory of emotion" pressure={1} seed={441} width={860} />
          <MarginGlyphs glyphs={[{ glyph: "?", label: "open to refinement" }]} />
          <p className="ps-lede" style={{ maxWidth: "52ch", marginBottom: 36 }}>{H.scope.lede}</p>
          <Scope explains={H.scope.explains} stops={H.scope.stops} note={H.scope.note} />
        </Movement>

        {/* -------------------------------------- 10 · what it is not · P1 */}
        <Movement id="m-not" pressure={1}>
          <Head num="10" kicker="oversimplifications, struck" title="Do not leave with these" pressure={1} seed={451} />
          <MarginGlyphs glyphs={[{ glyph: "✦", label: "editorial correction" }]} />
          <p className="ps-body" style={{ maxWidth: "52ch", marginBottom: 26 }}>{T.oversimplificationsLede}</p>
          <ul className="ps-strike-list">
            {T.oversimplifications.map((o) => (
              <li key={o}><span className="ps-struck" dangerouslySetInnerHTML={html(o)} /></li>
            ))}
          </ul>
        </Movement>

        {/* -------------------------------------------- 11 · lineage · P2 */}
        <Movement id="m-lineage" pressure={2}>
          <Head num="11" kicker="lineage" title="From Meyer&rsquo;s implication to learned probability" pressure={2} seed={461} width={840} />
          <MarginGlyphs glyphs={[{ glyph: "✦", label: "editorial arrangement of sources" }]} />
          <p className="ps-lede" style={{ maxWidth: "52ch", marginBottom: 30 }}>{T.trailLede}</p>
          <div>
            {T.origins.map((o) => (
              <div key={o.work} className="ps-origin">
                <span className="ps-origin-year">{o.year}</span>
                <div>
                  <p className="ps-body"><strong style={{ color: "var(--ink)" }}>{o.author}</strong> — {o.work}</p>
                  <p className="ps-small" style={{ marginTop: 4 }}>{o.contribution}</p>
                </div>
              </div>
            ))}
          </div>
        </Movement>

        {/* ----------------------------------------- 12 · provenance · P1 */}
        <Movement id="m-provenance" pressure={1}>
          <Head num="12" kicker="provenance" title="Where every claim on this page came from" pressure={1} seed={471} width={820} />
          <MarginGlyphs glyphs={[{ glyph: "●", colour: INK.teal, label: "the contract itself" }]} />
          <ProvenanceLedger items={T.provenance.map((p) => ({ ...p, colour: pigment(p.colour) }))} />
          <div style={{ marginTop: 34 }}>
            <p className="ps-meta" style={{ marginBottom: 14 }}>qualifications the record carries</p>
            <ul className="ps-scope-list" style={{ maxWidth: 720 }}>
              {T.qualifications.map((q) => (
                <li key={q} className="ps-small" style={{ color: "var(--body)" }}>{q}</li>
              ))}
            </ul>
          </div>
        </Movement>

        {/* --------------------------------------------- 13 · sources · P0 */}
        <Movement id="m-sources" pressure={0}>
          <Head num="13" kicker="sources" title={T.minimumReadingLabel} pressure={0} seed={481} />
          <References label="the record's full source list — contribution noted for each" items={T.fullSources} />
          <div style={{ marginTop: 44, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <Tick size={12} seed={495} />
            <p className="ps-small">Neighbouring records, different questions:</p>
            {related.map(({ rel, record }) => (
              <Link key={rel.recordId} href={recordHref(record!)} className="ps-link" style={{ fontSize: 14 }}>
                {record!.title} — {rel.relation}
              </Link>
            ))}
          </div>
        </Movement>

        <Folio left="Pressure · record two · Huron’s ITPRA" right="content: the live record · composition: bands & hinge" />
      </div>
    </main>
  );
}
