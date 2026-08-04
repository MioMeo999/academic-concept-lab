import type { Metadata } from "next";
import { Cloud, Divider, Icon, SecHead } from "../_components/Sketch";
import { Crumbs } from "../_components/RecordShell";

export const metadata: Metadata = { title: "About & how we cite" };

const SHAPE = `// content/theory.ts
export const conservationOfResources: TheoryRecord = {
  id: "conservation-of-resources",     // stable; used by saved state + links
  kind: "theory",                      // "theory" | "study" -> picks the template
  slug: "conservation-of-resources",   // URL segment
  title: "Conservation of Resources",
  hook: "...",                         // the one question the record answers
  oneSentence: "...",
  discipline: "ob",                    // key into DISCIPLINES
  topics: ["stress", "..."],           // feeds library search
  facts: ["...", "..."],               // chips on the library card

  ideaLede: "...",                     // opens section 01
  originsNote: "...",
  origins: [ ... ],                    // the trail
  oversimplifications: [ ... ],        // "don't conclude"
  qualifications: [ ... ],             // "still open"
  minimumReading: [ ... ],
  fullSources: [ ... ],
  provenance: [ ... ],                 // required on every record

  // optional blocks - include only the ones this theory needs:
  // demo, categories, pathways, demandTypes, interactions,
  // expansions, coreProcesses, fitTargets, workAdjustment
};

// then add it to content/records.ts
export const RECORDS = [ ..., conservationOfResources ];`;

const MARKS = [
  ["●", "var(--red)", "Directly reported / source-grounded", "Citations, samples, designs, dates and study-level conclusions, grounded in the published source."],
  ["■", "var(--teal)", "Plain-language paraphrase", "Restated without reproducing article text."],
  ["▲", "var(--pen-3)", "Original diagram / teaching analogy", "Editorial reconstruction. No published figure or table is reproduced, and an analogy never calculates an outcome."],
  ["✦", "var(--pen-3)", "Editorial interpretation", "Our reading, marked as ours — a learning aid, not a finding."],
  ["?", "var(--pen-3)", "Contested / unresolved", "Where no settled answer exists, the gap is shown rather than filled."],
];

export default function AboutPage() {
  return (
    <div className="wrap">
      <Crumbs items={[{ label: "Home", href: "/concept-lab" }, { label: "About" }]} />

      <section className="hero" style={{ paddingTop: "1.2rem" }}>
        <h1 className="title" style={{ fontSize: "clamp(1.9rem,5.4vw,3rem)" }}>About &amp; how we cite</h1>
        <p className="lede" style={{ marginTop: ".9rem" }}>
          A platform for reading academic work properly — theory explained until you can see it, evidence presented with its method still attached.
        </p>
      </section>

      <Divider />

      <section>
        <SecHead num="01" title="How we cite" colour="var(--red)" />
        <p className="body">
          Every claim on every record carries a mark saying where it came from. Nothing is written from memory, and nothing invented has ever been added to fill a gap.
          Where the literature does not agree, the record says so instead of picking a side.
        </p>
        <div className="prov" style={{ marginTop: "1rem", maxWidth: 900 }}>
          {MARKS.map(([glyph, colour, label, note]) => (
            <div className="prov-item" key={label}>
              <span className="g" style={{ color: colour }}>{glyph}</span>
              <div>
                <h4>{label}</h4>
                <p>{note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section>
        <SecHead num="02" title="How the site is built" colour="var(--teal)" />
        <p className="body">
          Two record kinds, one shell. <b>Theory</b> and <b>empirical study</b> use different templates because they are different objects — but they share the header,
          breadcrumbs, contents rail, saved state, library card and provenance block.
        </p>
        <p className="body" style={{ marginTop: ".8rem" }}>
          The theory template is <b>section-driven</b>: each block renders only if the record carries data for it, and section numbers and the contents rail are generated
          from whatever survives. That is why Person–Environment Fit runs to nine sections and Job Demands–Resources to eleven, off one template — a theory with dual
          pathways and a challenge/hindrance split does not have to be forced into the shape of one about correspondence.
        </p>
        <div className="grid2" style={{ marginTop: "1rem" }}>
          <div className="sk-box tight tilt-l2">
            <h3 style={{ fontSize: "1rem" }}>Routes</h3>
            <div className="read" style={{ fontSize: ".87rem", lineHeight: 1.7, color: "var(--pen-2)", marginTop: ".4rem" }}>
              <code>/concept-lab</code> home<br />
              <code>/concept-lab/library</code> browse + filter<br />
              <code>/concept-lab/saved</code> starred records<br />
              <code>/concept-lab/theory/[slug]</code> theory record<br />
              <code>/concept-lab/study/[slug]</code> study record<br />
              <code>/concept-lab/about</code> this page
            </div>
          </div>
          <div className="sk-box tight tilt-r2">
            <h3 style={{ fontSize: "1rem" }}>What scales</h3>
            <div style={{ marginTop: ".4rem" }}>
              {[
                "The library is the only surface that grows. No record ever enters the main nav.",
                "Cards, filters and search read from the record objects — nothing is hand-listed.",
                "Drawn elements are a fixed kit, so a new record costs no new illustration.",
              ].map((t) => (
                <div className="bullet" key={t}>
                  <Icon id="i-check" style={{ color: "var(--teal)" }} />
                  <span className="read" style={{ fontSize: ".86rem", lineHeight: 1.55, color: "var(--pen-2)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section>
        <SecHead num="03" title="Adding a record" colour="var(--teal)" />
        <p className="body">
          Append one object to <code>content/theory.ts</code> (or <code>content/paper.ts</code>) and list it in <code>content/records.ts</code>. It then appears in the
          library, in search, in the filters, in saved, and on the other records’ “elsewhere” block — with no template, route or navigation change.
        </p>
        <pre className="code" style={{ marginTop: "1rem" }}>{SHAPE}</pre>
        <div className="tilt-r2" style={{ marginTop: "1.1rem", maxWidth: 640 }}>
          <Cloud colour="#E24E1B">
            <div style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
              <Icon id="i-warn" style={{ width: 24, height: 24, color: "var(--red)", flex: "none" }} />
              <p className="read" style={{ fontSize: ".9rem", lineHeight: 1.55, color: "var(--pen-2)" }}>
                A record without a filled <code>provenance</code> array should not ship. It is the one field that makes the rest trustworthy.
              </p>
            </div>
          </Cloud>
        </div>
      </section>
    </div>
  );
}
