/* ---------------------------------------------------------------------------
   PRESSURE · record one — Tonal Hierarchy

   Intellectual structure: attraction. A centre that organises everything
   around it. The composition is therefore mass and contour: pigment wound
   densest at the tonic, thinning with distance, with pitch classes deposited
   in the field the centre casts.

   The content is the live record's own — every claim, finding, qualification
   and source is taken from content/tonal-hierarchy.ts unaltered. What is new
   is the pressure: where this page leans on pigment, and where it lets the
   scholarship go quiet.
   ------------------------------------------------------------------------- */

import type { Metadata } from "next";
import Link from "next/link";
import { tonalHierarchy as T } from "../../../content/tonal-hierarchy";
import { RECORDS, recordHref } from "../../../content/records";
import { Arrow, Contours, Grain, Hatch, INK, Mass, Ring, Rule, Tick } from "../_components/marks";
import {
  Folio, Head, LedgerRow, MarginGlyphs, Movement, Note, ProvenanceLedger,
  References, Scope, html,
} from "../_components/shell";
import { ContextShift, TonalField, type ShiftContext } from "./_components/TonalIslands";

export const metadata: Metadata = {
  title: "Tonal Hierarchy · Pressure · Academic Concept Lab",
  description: "The Krumhansl tradition composed as mass and contour — an isolated visual exploration.",
};

/* The record stores colours as production custom properties; this page owns
   its pigments, so the mapping happens once, here. */
const pigment = (c: string): string =>
  ({
    "var(--teal)": INK.teal,
    "var(--red)": INK.vermilion,
    "var(--gold-deep)": INK.ochre,
    "var(--plum-deep)": INK.violet,
    "var(--pen-3)": INK.graphite,
  })[c] ?? INK.graphite;

/* One physical pitch, four tonal jobs — data from the record's same-note
   comparison, distance assigned by role strength (a teaching geometry). */
const TN = T.tonal!;

const SHIFT_CONTEXTS: ShiftContext[] = TN.sameNote.contexts.map((c) => ({
  id: c.id,
  label: c.label,
  short: c.label.split(" · ")[0],
  body: c.body,
  role: c.role ?? "",
  colour: pigment(c.colour),
  distance:
    c.id === "c-major-cadence" ? 0 :
    c.id === "a-minor-cadence" ? 0.34 :
    c.id === "f-major-cadence" ? 0.62 : 0.95,
}));

const FIELD_ITEMS = TN.profile.items.map((p) => ({
  pitchClass: p.pitchClass,
  note: p.note,
  role: p.role,
  level: p.level,
  body: p.body,
}));

export default function TonalHierarchyPage() {
  const related = T.relatedTo!
    .map((rel) => ({ rel, record: RECORDS.find((r) => r.id === rel.recordId) }))
    .filter((x) => x.record);

  return (
    <main className="ps-root">
      <Grain />
      <div className="ps-canvas">
        {/* ---------------------------------------------------------- masthead */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, paddingTop: 26, flexWrap: "wrap" }}>
          <span className="ps-meta" style={{ color: "var(--ink)", letterSpacing: "0.2em" }}>
            <Link href="/pressure" style={{ color: "inherit", textDecoration: "none" }}>Pressure</Link>
            {" · record one"}
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
              <p className="ps-meta" style={{ marginBottom: 24 }}>theory record · psychology of music · structure: attraction</p>
              <h1 className="ps-title" style={{ fontSize: "clamp(46px, 7.5vw, 108px)", maxWidth: "11ch" }}>
                Tonal <em>Hierarchy</em>
              </h1>
              <p className="ps-lede" style={{ marginTop: 30, maxWidth: "34ch" }}>{T.hook}</p>
              <p className="ps-body" style={{ marginTop: 18, maxWidth: "52ch" }}>{T.oneSentence}</p>
              <MarginGlyphs glyphs={[
                { glyph: "●", colour: INK.vermilion, label: "source-grounded" },
                { glyph: "■", colour: INK.teal, label: "paraphrase" },
                { glyph: "▲", colour: INK.ochre, label: "teaching construction" },
                { glyph: "✦", label: "editorial synthesis" },
                { glyph: "?", label: "open" },
              ]} />
            </div>
            <div style={{ position: "relative", height: 320 }} aria-hidden="true">
              <Contours width={380} height={320} colour={INK.vermilion} seed={101} rings={5} opacity={0.5}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              <Mass size={110} colour={INK.vermilion} seed={102} density={1.25}
                style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
              <span className="ps-hand" style={{ position: "absolute", right: 0, bottom: 10, transform: "rotate(-2deg)", maxWidth: "12ch" }}>
                a centre the other tones lean toward
              </span>
            </div>
          </div>
        </section>

        {/* ------------------------------------------- 01 · the question · P2 */}
        <Movement id="m-question" pressure={2}>
          <Head num="01" kicker="the question" title="Which note feels like home?" pressure={2} seed={111} />
          <MarginGlyphs glyphs={[{ glyph: "▲", colour: INK.ochre, label: "constructed teaching example" }]} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(24px, 4vw, 64px)" }}>
            <p className="ps-lede" style={{ maxWidth: "44ch" }}>{TN.opening.lede}</p>
            <div>
              <div className="ps-cards">
                {TN.context.cards.slice(0, 4).map((c, i) => (
                  <div key={c.label}>
                    <Hatch width={72} height={18} colour={pigment(c.colour)} seed={120 + i} angle={-38} gap={2.6} opacity={0.9}
                      style={{ display: "block", marginBottom: 12 }} />
                    <p className="ps-card-label" style={{ color: pigment(c.colour) }}>{c.label}</p>
                    <p className="ps-small" style={{ color: "var(--body)" }}>{c.body}</p>
                  </div>
                ))}
              </div>
              <Note style={{ marginTop: 26 }}>{TN.context.note}</Note>
            </div>
          </div>
          <Note tone="caution" style={{ marginTop: 24 }}>{TN.opening.note}</Note>
        </Movement>

        {/* -------------------------------- 02 · one pitch, four jobs · P3 */}
        <Movement id="m-contexts" pressure={3}>
          <Head num="02" kicker="the relational claim" title="One pitch, four jobs" pressure={3} colour={INK.vermilion} seed={131} />
          <MarginGlyphs glyphs={[{ glyph: "▲", colour: INK.ochre, label: "constructed context comparison" }]} />
          <p className="ps-lede" style={{ maxWidth: "52ch", marginBottom: 34 }}>{TN.sameNote.lede}</p>

          <ContextShift contexts={SHIFT_CONTEXTS} />

          {/* static reading path: the complete comparison, printed */}
          <div className="ps-cards" style={{ marginTop: 40 }}>
            {SHIFT_CONTEXTS.map((c) => (
              <div key={c.id} style={{ borderTop: `2px solid ${c.colour}`, paddingTop: 12 }}>
                <p className="ps-card-label" style={{ color: c.colour }}>{c.label}</p>
                <p className="ps-small"><strong style={{ color: "var(--ink)" }}>C → {c.role}.</strong> {c.body}</p>
              </div>
            ))}
          </div>
          <Note style={{ marginTop: 26 }}>{TN.sameNote.note}</Note>
        </Movement>

        {/* ----------------------------- 03 · the field of stability · P4 */}
        <Movement id="m-field" pressure={4}>
          <Head num="03" kicker="the centrepiece · full pigment" title="The field of stability" pressure={4} colour={INK.vermilion} seed={141} />
          <MarginGlyphs glyphs={[
            { glyph: "▲", colour: INK.ochre, label: "teaching representation" },
            { glyph: "✦", label: "editorial arrangement" },
          ]} />
          <p className="ps-lede" style={{ maxWidth: "54ch", marginBottom: 12 }}>{TN.profile.lede}</p>
          <p className="ps-hand" style={{ margin: "18px 0 30px", maxWidth: "30ch", transform: "rotate(-1deg)" }}>
            press hardest where the theory is most itself: the centre.
          </p>

          <TonalField items={FIELD_ITEMS} />

          {/* static reading path: the whole profile, printed as a ledger */}
          <div style={{ marginTop: 44, borderTop: "1px solid var(--hair)" }}>
            {FIELD_ITEMS.map((p) => (
              <div key={p.pitchClass} style={{ display: "grid", gridTemplateColumns: "52px 150px minmax(0,1fr)", gap: 16, padding: "9px 0", borderBottom: "1px solid var(--hair)", alignItems: "baseline" }}>
                <span className="ps-num" style={{ color: "var(--ink)" }}>{p.pitchClass}</span>
                <span className="ps-meta" style={{ fontSize: 9.5 }}>{p.level}</span>
                <span className="ps-small">{p.role} — {p.body}</span>
              </div>
            ))}
          </div>
          <Note style={{ marginTop: 26 }}>{TN.profile.note}</Note>
        </Movement>

        {/* ---------------------------------- 04 · what a profile is · P2 */}
        <Movement id="m-measurement" pressure={2}>
          <Head num="04" kicker="measurement, kept honest" title="Rating is not profile is not stability" pressure={2} seed={151} />
          <MarginGlyphs glyphs={[{ glyph: "■", colour: INK.teal, label: "faithful paraphrase" }]} />
          <p className="ps-lede" style={{ maxWidth: "52ch", marginBottom: 34 }}>{TN.measurement.lede}</p>
          <div style={{ borderTop: "1px solid var(--hair)" }}>
            {TN.measurement.cards.map((c, i) => (
              <div key={c.label} style={{ display: "grid", gridTemplateColumns: "44px minmax(0,1fr)", gap: 18, padding: "18px 0", borderBottom: "1px solid var(--hair)" }}>
                <span className="ps-num" style={{ paddingTop: 4, color: pigment(c.colour) }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="ps-card-label" style={{ color: pigment(c.colour) }}>{c.label}</p>
                  <p className="ps-body" style={{ maxWidth: "68ch" }}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Note style={{ marginTop: 26 }}>{TN.measurement.note}</Note>
        </Movement>

        {/* ---------------------------------- 05 · key neighbourhoods · P3 */}
        <Movement id="m-neighbourhood" pressure={3}>
          <Head num="05" kicker="one level up" title="Keys have neighbourhoods" pressure={3} colour={INK.teal} seed={161} />
          <MarginGlyphs glyphs={[{ glyph: "■", colour: INK.teal, label: "faithful explanation" }]} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(28px, 4vw, 72px)", alignItems: "start" }}>
            <div>
              <p className="ps-lede" style={{ maxWidth: "44ch" }}>{TN.neighbourhood.lede}</p>
              {/* the local map, drawn: C at the centre of its four neighbours */}
              <div style={{ position: "relative", height: 300, marginTop: 30 }} aria-hidden="true">
                <Contours width={360} height={300} colour={INK.teal} seed={171} rings={4} opacity={0.45}
                  style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 360, height: 300 }} />
                <Mass size={72} colour={INK.vermilion} seed={172} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
                <span className="ps-meta" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, 44px)", color: INK.vermilion }}>C major</span>
                {[
                  { label: "G major", sub: "fifth-related", x: "78%", y: "18%", c: INK.teal },
                  { label: "F major", sub: "fifth-related", x: "8%", y: "60%", c: INK.teal },
                  { label: "A minor", sub: "relative", x: "70%", y: "72%", c: INK.ochre },
                  { label: "C minor", sub: "parallel", x: "14%", y: "10%", c: INK.violet },
                ].map((n, i) => (
                  <div key={n.label} style={{ position: "absolute", left: n.x, top: n.y, transform: "translate(-50%, -50%)", textAlign: "center" }}>
                    <Mass size={30} colour={n.c} seed={180 + i} density={0.7} style={{ margin: "0 auto" }} />
                    <p className="ps-meta" style={{ color: n.c, marginTop: 2 }}>{n.label}</p>
                    <p className="ps-hand-sm" style={{ fontSize: 15 }}>{n.sub}</p>
                  </div>
                ))}
              </div>
              <Note style={{ marginTop: 18 }}>{TN.neighbourhood.note}</Note>
            </div>
            <div style={{ borderTop: "1px solid var(--hair)" }}>
              {TN.neighbourhood.levels.map((l) => (
                <div key={l.label} style={{ padding: "16px 0", borderBottom: "1px solid var(--hair)" }}>
                  <p className="ps-card-label">{l.label}</p>
                  <p className="ps-body">{l.body}</p>
                  <p className="ps-small" style={{ marginTop: 8 }}>{l.relations.join("  ·  ")}</p>
                </div>
              ))}
            </div>
          </div>
        </Movement>

        {/* -------------------------------------- 06 · home can move · P3 */}
        <Movement id="m-dynamics" pressure={3}>
          <Head num="06" kicker="tonal organisation is dynamic" title="Home can move" pressure={3} colour={INK.cobalt} seed={191} />
          <MarginGlyphs glyphs={[{ glyph: "▲", colour: INK.ochre, label: "progressive teaching visual" }]} />
          <p className="ps-lede" style={{ maxWidth: "52ch", marginBottom: 36 }}>{TN.dynamics.lede}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(20px, 3vw, 44px)", alignItems: "start" }}>
            {TN.dynamics.states.map((s, i) => (
              <div key={s.label} style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <Ring width={34} height={34} colour={pigment(s.colour)} seed={200 + i} weight={1.5} opacity={0.4 + i * 0.3} />
                  <Arrow x1={2} y1={12} x2={30} y2={12} bow={i === 1 ? -6 : 4} colour={INK.ghost} seed={210 + i} width={34} height={24} weight={1.2} />
                </div>
                <p className="ps-card-label" style={{ color: pigment(s.colour) }}>{s.label}</p>
                <p className="ps-body">{s.body}</p>
              </div>
            ))}
          </div>
          <Note style={{ marginTop: 30 }}>{TN.dynamics.note}</Note>
        </Movement>

        {/* ------------------------- 07 · development and culture · P2 */}
        <Movement id="m-boundaries" pressure={2}>
          <Head num="07" kicker="where the hierarchy comes from" title="Learned, and bounded by culture" pressure={2} seed={221} />
          <MarginGlyphs glyphs={[
            { glyph: "●", colour: INK.vermilion, label: "source-grounded findings" },
            { glyph: "?", label: "bounded" },
          ]} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(28px, 4vw, 72px)" }}>
            <div>
              <p className="ps-meta" style={{ marginBottom: 16 }}>development · Krumhansl &amp; Keil</p>
              <p className="ps-body" style={{ maxWidth: "48ch", marginBottom: 20 }}>{TN.development.lede}</p>
              {TN.development.cards.map((c) => (
                <div key={c.label} style={{ padding: "12px 0", borderTop: "1px solid var(--hair)" }}>
                  <p className="ps-card-label" style={{ color: pigment(c.colour) }}>{c.label}</p>
                  <p className="ps-small" style={{ color: "var(--body)" }}>{c.body}</p>
                </div>
              ))}
              <Note style={{ marginTop: 18 }}>{TN.development.note}</Note>
            </div>
            <div>
              <p className="ps-meta" style={{ marginBottom: 16 }}>culture · North Indian rags</p>
              <p className="ps-body" style={{ maxWidth: "48ch", marginBottom: 20 }}>{TN.culture.lede}</p>
              {TN.culture.cards.map((c) => (
                <div key={c.label} style={{ padding: "12px 0", borderTop: "1px solid var(--hair)" }}>
                  <p className="ps-card-label" style={{ color: pigment(c.colour) }}>{c.label}</p>
                  <p className="ps-small" style={{ color: "var(--body)" }}>{c.body}</p>
                </div>
              ))}
              <Note tone="caution" style={{ marginTop: 18 }}>{TN.culture.note}</Note>
            </div>
          </div>
        </Movement>

        {/* ------------------------------- 08 · profile ≠ process · P1 */}
        <Movement id="m-process" pressure={1}>
          <Head num="08" kicker="a caution · quiet" title="A profile is not a process" pressure={1} seed={231} />
          <MarginGlyphs glyphs={[{ glyph: "?", label: "under-specified" }]} />
          <div style={{ maxWidth: 860 }}>
            <p className="ps-lede" style={{ maxWidth: "52ch", marginBottom: 30 }}>{TN.process.lede}</p>
            <div className="ps-cards">
              {TN.process.cards.map((c) => (
                <div key={c.label} style={{ borderTop: `2px solid ${pigment(c.colour)}`, paddingTop: 12 }}>
                  <p className="ps-card-label" style={{ color: pigment(c.colour) }}>{c.label}</p>
                  <p className="ps-small" style={{ color: "var(--body)" }}>{c.body}</p>
                </div>
              ))}
            </div>
            <Note tone="caution" style={{ marginTop: 26 }}>{TN.process.note}</Note>
          </div>
        </Movement>

        {/* ------------------------------------- 09 · evidence ledger · P1 */}
        <Movement id="m-evidence" pressure={1}>
          <Head num="09" kicker="evidence · the ledger" title="What was tested, what was found, what was not" pressure={1} seed={241} width={860} />
          <MarginGlyphs glyphs={[{ glyph: "●", colour: INK.vermilion, label: "reported findings" }]} />
          <p className="ps-body" style={{ maxWidth: "56ch", marginBottom: 34 }}>
            Seven entries, kept welded to their designs. A finding stays attached to what was
            measured — and each entry says, in the third column, what it did not establish.
          </p>
          <div className="ps-ledger">
            {T.evidenceXrays!.map((e, i) => (
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
        </Movement>

        {/* ---------------------------------------------- 10 · scope · P1 */}
        <Movement id="m-scope" pressure={1}>
          <Head num="10" kicker="scope" title="What it explains, and where it stops" pressure={1} seed={251} width={800} />
          <MarginGlyphs glyphs={[{ glyph: "■", colour: INK.teal, label: "faithful boundary" }]} />
          <p className="ps-lede" style={{ maxWidth: "52ch", marginBottom: 36 }}>{TN.scope.lede}</p>
          <Scope explains={TN.scope.explains} stops={TN.scope.stops} note={TN.scope.note} />
        </Movement>

        {/* -------------------------------------- 11 · what it is not · P1 */}
        <Movement id="m-not" pressure={1}>
          <Head num="11" kicker="oversimplifications, struck" title="Do not leave with these" pressure={1} seed={261} />
          <MarginGlyphs glyphs={[{ glyph: "✦", label: "editorial correction" }]} />
          <p className="ps-body" style={{ maxWidth: "52ch", marginBottom: 26 }}>{T.oversimplificationsLede}</p>
          <ul className="ps-strike-list">
            {T.oversimplifications.map((o) => (
              <li key={o}><span className="ps-struck" dangerouslySetInnerHTML={html(o)} /></li>
            ))}
          </ul>
        </Movement>

        {/* -------------------------------------------- 12 · lineage · P2 */}
        <Movement id="m-lineage" pressure={2}>
          <Head num="12" kicker="lineage" title="A branching history, not a ladder" pressure={2} seed={271} />
          <MarginGlyphs glyphs={[{ glyph: "✦", label: "editorial arrangement of sources" }]} />
          <p className="ps-lede" style={{ maxWidth: "52ch", marginBottom: 30 }}>{TN.lineage.lede}</p>
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
          <Note style={{ marginTop: 24 }}>{TN.lineage.note}</Note>
        </Movement>

        {/* ----------------------------------------- 13 · provenance · P1 */}
        <Movement id="m-provenance" pressure={1}>
          <Head num="13" kicker="provenance" title="Where every claim on this page came from" pressure={1} seed={281} width={820} />
          <MarginGlyphs glyphs={[{ glyph: "●", colour: INK.vermilion, label: "the contract itself" }]} />
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

        {/* --------------------------------------------- 14 · sources · P0 */}
        <Movement id="m-sources" pressure={0}>
          <Head num="14" kicker="sources" title={T.minimumReadingLabel} pressure={0} seed={291} />
          <References
            label="minimum reading, then the canonical synthesis — contribution noted for each"
            items={[...T.minimumReading, ...T.fullSources]}
          />
          <div style={{ marginTop: 44, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <Tick size={12} seed={295} />
            <p className="ps-small">Related records, kept apart on purpose:</p>
            {related.map(({ rel, record }) => (
              <Link key={rel.recordId} href={recordHref(record!)} className="ps-link" style={{ fontSize: 14 }}>
                {record!.title} — {rel.relation}
              </Link>
            ))}
          </div>
        </Movement>

        <Folio left="Pressure · record one · Tonal Hierarchy" right="content: the live record · composition: mass & contour" />
      </div>
    </main>
  );
}
