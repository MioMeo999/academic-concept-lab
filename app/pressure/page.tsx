/* The exploration's front sheet: the hypothesis, the pressure scale, and the
   two records that test it. Deliberately an argument, not a portal. */

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Arrow, Band, Contours, Gauge, Grain, Hatch, Hinge, INK, Mass, Rule } from "./_components/marks";
import { Folio, type Pressure } from "./_components/shell";

export const metadata: Metadata = {
  title: "Pressure · Academic Concept Lab",
  description:
    "An isolated visual exploration: pigment density tracks epistemic work. Two theories, two compositions, one hand.",
};

const SCALE: { level: Pressure; name: string; use: string }[] = [
  { level: 4, name: "full pigment", use: "the theory's own structure, drawn — the moment the page leans hardest" },
  { level: 3, name: "working", use: "explanation with drawn intervention — diagrams, comparisons, teaching constructions" },
  { level: 2, name: "composed", use: "organised typography with one drawn accent — distinctions, definitions, lineage" },
  { level: 1, name: "ledger", use: "quiet scholarship in graphite — evidence, scope, provenance, qualifications" },
  { level: 0, name: "canonical", use: "references — type, hanging indents, registration marks, nothing else" },
];

/* The pressure maps of the two records — the rhythm of each page, declared
   before the page begins, so a hundred records could be paced and reviewed
   systematically rather than intuitively. */
const TONAL_MAP: { n: string; p: Pressure; label: string }[] = [
  { n: "01", p: 2, label: "the question" },
  { n: "02", p: 3, label: "one pitch, four jobs" },
  { n: "03", p: 4, label: "the field of stability" },
  { n: "04", p: 2, label: "what a profile is" },
  { n: "05", p: 3, label: "key neighbourhoods" },
  { n: "06", p: 3, label: "home can move" },
  { n: "07", p: 2, label: "development & culture" },
  { n: "08", p: 1, label: "profile ≠ process" },
  { n: "09", p: 1, label: "evidence ledger" },
  { n: "10", p: 1, label: "scope" },
  { n: "11", p: 1, label: "what it is not" },
  { n: "12", p: 2, label: "lineage" },
  { n: "13", p: 1, label: "provenance" },
  { n: "14", p: 0, label: "sources" },
];

const ITPRA_MAP: { n: string; p: Pressure; label: string }[] = [
  { n: "01", p: 2, label: "before / after" },
  { n: "02", p: 4, label: "the hinge" },
  { n: "03", p: 3, label: "nothing happened" },
  { n: "04", p: 2, label: "five questions" },
  { n: "05", p: 3, label: "P + R together" },
  { n: "06", p: 2, label: "four sources" },
  { n: "07", p: 3, label: "mixed feelings" },
  { n: "08", p: 1, label: "evidence ledger" },
  { n: "09", p: 1, label: "scope" },
  { n: "10", p: 1, label: "what it is not" },
  { n: "11", p: 2, label: "lineage" },
  { n: "12", p: 1, label: "provenance" },
  { n: "13", p: 0, label: "sources" },
];

function PressureMap({ map, colour }: { map: { n: string; p: Pressure; label: string }[]; colour: string }) {
  return (
    <ol style={{ listStyle: "none", margin: "26px 0 0", padding: 0, borderTop: "1px solid var(--hair)" }}>
      {map.map((m) => (
        <li
          key={m.n}
          style={{
            display: "grid",
            gridTemplateColumns: "34px 30px minmax(0, 1fr)",
            gap: 12,
            alignItems: "center",
            padding: "7px 0",
            borderBottom: "1px solid var(--hair)",
          }}
        >
          <span className="ps-num">{m.n}</span>
          <Gauge level={m.p} colour={m.p >= 3 ? colour : INK.graphite} seed={500 + m.n.charCodeAt(1) + m.p} />
          <span className="ps-small" style={{ color: m.p >= 3 ? "var(--body)" : "var(--soft)" }}>{m.label}</span>
        </li>
      ))}
    </ol>
  );
}

export default function Page() {
  return (
    <main className="ps-root">
      <Grain />
      <div className="ps-canvas">
        {/* ---------------------------------------------------------- masthead */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, paddingTop: 26, flexWrap: "wrap" }}>
          <span className="ps-meta" style={{ color: "var(--ink)", letterSpacing: "0.2em" }}>Academic Concept Lab</span>
          <span className="ps-meta">Pressure · isolated exploration · production untouched</span>
        </div>
        <Rule width={1200} seed={11} opacity={0.3} style={{ width: "100%", height: 4, display: "block", marginTop: 12 }} />

        {/* --------------------------------------------------------- hypothesis */}
        <section style={{ paddingTop: "clamp(64px, 12vh, 140px)", paddingBottom: "clamp(56px, 9vh, 120px)" }}>
          <p className="ps-meta" style={{ marginBottom: 26 }}>a visual hypothesis, tested on two theories</p>
          <h1 className="ps-title" style={{ maxWidth: "12ch" }}>
            The <em>pressure</em> of thought
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(28px, 4vw, 72px)",
              marginTop: "clamp(44px, 7vh, 84px)",
              maxWidth: 1080,
            }}
          >
            <p className="ps-lede" style={{ maxWidth: "37ch" }}>
              Academic Concept Lab should behave visually like a thinking surface under variable
              pressure. Pigment is heaviest where the theory does conceptual work — a centre of
              attraction, a hinge in time — and fades to graphite where the scholarship turns
              reportorial. The hand never leaves the page.
            </p>
            <div className="ps-flow" style={{ "--flow": "14px" } as CSSProperties}>
              <p className="ps-body" style={{ maxWidth: "42ch" }}>
                Quiet is drawn, not defaulted. Evidence, scope, provenance and references are
                composed at low pressure with the same pencil — so they belong unmistakably to the
                Lab without pretending to be the dramatic parts.
              </p>
              <p className="ps-body" style={{ maxWidth: "42ch" }}>
                Structure draws itself. Each theory&rsquo;s intellectual shape selects a composition
                primitive; the mark grammar stays constant, so a hundred records could share one
                hand without sharing one layout.
              </p>
            </div>
          </div>

          <p className="ps-hand" style={{ marginTop: "clamp(40px, 6vh, 64px)", maxWidth: "24ch", transform: "rotate(-1.2deg)" }}>
            colour is not emphasis here. colour is how hard the thinking is pressing.
          </p>
        </section>

        {/* ------------------------------------------------------- the scale */}
        <section style={{ paddingBottom: "clamp(64px, 10vh, 130px)" }}>
          <Rule width={900} seed={21} opacity={0.4} weight={1.3} style={{ width: "100%", maxWidth: 900, height: 4, display: "block", marginBottom: 30 }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
            <span className="ps-num">§1</span>
            <span className="ps-meta">the instrument</span>
          </div>
          <h2 className="ps-h2" style={{ marginTop: 12 }}>A pressure scale, not a style guide</h2>
          <p className="ps-body" style={{ marginTop: 18, maxWidth: "58ch" }}>
            Every section of every record declares a pressure before it is composed. The sequence
            of pressures is the page&rsquo;s rhythm — loud and quiet are planned as one argument,
            and the plan can be reviewed, compared and kept consistent across a growing library.
          </p>

          <div style={{ marginTop: 40, borderTop: "1px solid var(--hair)" }}>
            {SCALE.map((s) => (
              <div
                key={s.level}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 44px minmax(120px, 0.32fr) minmax(0, 1fr)",
                  gap: "clamp(10px, 2vw, 26px)",
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom: "1px solid var(--hair)",
                }}
              >
                <span className="ps-num">P{s.level}</span>
                <Gauge level={s.level} colour={s.level >= 3 ? INK.vermilion : INK.graphite} seed={600 + s.level} />
                <span className="ps-h3" style={{ fontSize: "clamp(17px, 1.4vw, 21px)" }}>{s.name}</span>
                <span className="ps-small">{s.use}</span>
              </div>
            ))}
          </div>
          <p className="ps-hand-sm" style={{ marginTop: 22, maxWidth: "46ch" }}>
            the gauge recurs in every section head — the reader can always see how hard the page is pressing, and why.
          </p>
        </section>

        {/* -------------------------------------------- record one · attraction */}
        <section style={{ paddingBottom: "clamp(64px, 10vh, 130px)" }}>
          <Rule width={900} colour={INK.vermilion} seed={31} opacity={0.65} weight={1.5} style={{ width: "100%", maxWidth: 900, height: 4, display: "block", marginBottom: 30 }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
            <span className="ps-num">§2</span>
            <span className="ps-meta" style={{ color: "var(--vermilion)" }}>record one · structure: attraction</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(28px, 4vw, 72px)", marginTop: 26, alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <Link href="/pressure/tonal-hierarchy" className="ps-h2" style={{ textDecoration: "none", color: "var(--ink)" }}>
                  Tonal Hierarchy
                </Link>
                <Arrow x1={4} y1={22} x2={52} y2={20} bow={-9} colour={INK.vermilion} seed={33} width={62} height={40} weight={1.5} />
              </div>
              <p className="ps-body" style={{ marginTop: 18, maxWidth: "48ch" }}>
                Which note feels like home — and what changes when the context changes? A theory of
                centre and pull composes as <strong>mass and contour</strong>: a dense pigment core
                for the tonic, attraction rings for the field it casts, pitch classes deposited
                nearer or farther from home.
              </p>
              <p className="ps-small" style={{ marginTop: 14, maxWidth: "52ch" }}>
                The Krumhansl tradition, from the live record — probe-tone logic, the same pitch in
                four keys, key neighbourhoods, seven evidence entries, and the full quiet apparatus.
              </p>
              <div style={{ position: "relative", marginTop: 34, width: 300, height: 150 }}>
                <Contours width={300} height={150} colour={INK.vermilion} seed={41} rings={4} opacity={0.55} style={{ position: "absolute", inset: 0 }} />
                <Mass size={64} colour={INK.vermilion} seed={42} style={{ position: "absolute", left: 118, top: 43 }} />
                <span className="ps-hand-sm" style={{ position: "absolute", right: 6, top: 8, transform: "rotate(2deg)" }}>
                  home, pressed hard
                </span>
              </div>
            </div>
            <div>
              <p className="ps-meta" style={{ marginBottom: 4 }}>pressure map · fourteen sections</p>
              <PressureMap map={TONAL_MAP} colour={INK.vermilion} />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ record two · hinge */}
        <section style={{ paddingBottom: "clamp(72px, 11vh, 150px)" }}>
          <Rule width={900} colour={INK.cobalt} seed={51} opacity={0.65} weight={1.5} style={{ width: "100%", maxWidth: 900, height: 4, display: "block", marginBottom: 30 }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
            <span className="ps-num">§3</span>
            <span className="ps-meta" style={{ color: "var(--cobalt)" }}>record two · structure: temporal hinge</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(28px, 4vw, 72px)", marginTop: 26, alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <Link href="/pressure/itpra" className="ps-h2" style={{ textDecoration: "none", color: "var(--ink)" }}>
                  Huron&rsquo;s ITPRA
                </Link>
                <Arrow x1={4} y1={22} x2={52} y2={20} bow={-9} colour={INK.cobalt} seed={53} width={62} height={40} weight={1.5} />
              </div>
              <p className="ps-body" style={{ marginTop: 18, maxWidth: "48ch" }}>
                Expectation is not one feeling. A theory of what unfolds around an anticipated
                outcome composes as <strong>bands around a hinge</strong>: imagination reaching far
                left, tension tightening toward the moment, prediction and reaction breaking
                together on the right, appraisal trailing.
              </p>
              <p className="ps-small" style={{ marginTop: 14, maxWidth: "52ch" }}>
                The live record again — the five response systems, the on-time/delayed comparison,
                four expectation sources, contrastive valence, six evidence entries, and the same
                quiet apparatus at the same low pressure.
              </p>
              <div style={{ position: "relative", marginTop: 34, width: 300, height: 120 }}>
                <Band width={196} height={30} colour={INK.teal} seed={61} opacity={0.7} style={{ position: "absolute", left: 0, top: 14 }} />
                <Band width={120} height={30} colour={INK.ochre} seed={62} opacity={0.8} style={{ position: "absolute", left: 76, top: 48 }} />
                <Hinge height={104} colour={INK.charcoal} seed={63} style={{ position: "absolute", left: 196, top: 8 }} />
                <Band width={86} height={30} colour={INK.vermilion} seed={64} opacity={0.8} style={{ position: "absolute", left: 212, top: 48 }} />
                <span className="ps-hand-sm" style={{ position: "absolute", right: 0, top: 0, transform: "rotate(1.6deg)" }}>
                  the moment, drawn twice
                </span>
              </div>
            </div>
            <div>
              <p className="ps-meta" style={{ marginBottom: 4 }}>pressure map · thirteen sections</p>
              <PressureMap map={ITPRA_MAP} colour={INK.cobalt} />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- creed */}
        <section style={{ paddingBottom: "clamp(56px, 8vh, 110px)" }}>
          <Rule width={720} seed={71} opacity={0.3} style={{ width: "100%", maxWidth: 720, height: 4, display: "block", marginBottom: 30 }} />
          <div className="ps-flow" style={{ "--flow": "18px", maxWidth: 640 } as CSSProperties}>
            <p className="ps-small">
              Both records carry the live record&rsquo;s own content — every claim, finding,
              qualification and source — under the Lab&rsquo;s existing provenance glyphs
              (● ■ ▲ ✦ ?), decoded in each record&rsquo;s provenance ledger.
            </p>
            <p className="ps-small">
              Nothing here touches production routes, templates or earlier explorations. The
              experiment exists to be previewed, compared, revised, abandoned or selectively
              migrated — never deployed over what is live.
            </p>
            <Hatch width={190} height={14} colour={INK.teal} seed={81} angle={-38} gap={2.8} opacity={0.7} style={{ display: "block", marginTop: 8 }} />
          </div>
        </section>

        <Folio left="Academic Concept Lab · Pressure" right="an isolated visual exploration · branch explore/pressure" />
      </div>
    </main>
  );
}
