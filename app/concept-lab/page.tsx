import Link from "next/link";
import { RECORDS, KIND } from "@/content/records";
import { DISCIPLINES } from "@/content/disciplines";
import type { RecordKind } from "@/content/types";
import { Banner, Divider, Icon } from "./_components/Sketch";
import { RecordCard } from "./_components/RecordCard";

/* ---------------------------------------------------------------------------
   A landing page has one job: tell someone what this is, what is in it, why it
   can be trusted, and how to get in. The previous version explained the
   architecture in prose and then showed the first four records by registry
   order, which is neither curation nor navigation.

   So: the four kinds become doors with live counts, the provenance system
   gets surfaced rather than mentioned, and the records shown are chosen rather
   than sliced.
   ------------------------------------------------------------------------- */

const KIND_ORDER: RecordKind[] = ["theory", "mechanism", "method", "study"];

const DIALECT: Record<RecordKind, { icon: string; line: string; blurb: string }> = {
  theory: {
    icon: "i-door",
    line: "A theory is a lens",
    blurb: "Nothing in it happened — no sample, no date, no result. It has to demonstrate rather than report.",
  },
  study: {
    icon: "i-eye",
    line: "A study is an argument",
    blurb: "It happened once, to particular people, in one place — and it could be wrong. Method stays welded to finding.",
  },
  method: {
    icon: "i-person",
    line: "A method is a practice",
    blurb: "You do not learn one by reading about it. The page has to work at the desk, beside real material.",
  },
  mechanism: {
    icon: "i-star",
    line: "A mechanism is a pathway",
    blurb: "Not why something happens, but through what. A biological route the psychology has to travel down.",
  },
};

/** Chosen, not sliced: one way in per kind, with the reason it is the way in. */
const START_HERE: { id: string; why: string }[] = [
  { id: "person-environment-fit", why: "The framework three other records hang off. Start here and the rest of the library has a spine." },
  { id: "ipa", why: "The most hands-on record on the site — a method you could start using on a transcript this week." },
  { id: "tuned-out-or-dialed-in", why: "The only evidence record so far, and the clearest example of method kept welded to finding." },
  { id: "hpa-axis", why: "Where the psychology meets the body — and the one record that is a physical system rather than an idea." },
];

const MARKS: { glyph: string; colour: string; label: string }[] = [
  { glyph: "●", colour: "var(--red)", label: "Source-grounded" },
  { glyph: "■", colour: "var(--teal)", label: "Paraphrase" },
  { glyph: "▲", colour: "var(--pen-3)", label: "Teaching analogy" },
  { glyph: "✦", colour: "var(--pen-3)", label: "Editorial" },
  { glyph: "?", colour: "var(--pen-3)", label: "Contested" },
];

export default function ConceptLabHome() {
  const counts = KIND_ORDER.map((k) => ({ kind: k, n: RECORDS.filter((r) => r.kind === k).length }));
  const disciplineCounts = Object.values(DISCIPLINES)
    .map((d) => ({ d, n: RECORDS.filter((r) => r.discipline === d.id).length }))
    .filter((x) => x.n > 0);
  const starters = START_HERE.map((s) => ({ ...s, record: RECORDS.find((r) => r.id === s.id) })).filter((s) => s.record);

  return (
    <div className="wrap">
      <section className="hero" data-reveal="hl">
        <Banner>
          <h1 className="title">Academic Concept&nbsp;Lab</h1>
        </Banner>
        <p className="tagline">
          Theory, evidence and method — <span className="hl">drawn out</span> until you can actually see them.
        </p>
        <p className="lede" style={{ marginTop: "1rem" }}>
          Academic work explained without being flattened. Every claim on every page carries a mark saying where it came from — and where it does not,
          the page says so.
        </p>

        <div className="stat-strip" aria-label="What is in the library">
          <span><b>{RECORDS.length}</b> records</span>
          <span><b>{counts.length}</b> kinds</span>
          <span><b>{disciplineCounts.length}</b> disciplines</span>
        </div>
      </section>

      <Divider />

      {/* The architecture, made navigable rather than described. */}
      <section>
        <span className="k">four kinds of record — pick a way in</span>
        <div className="doors">
          {counts.map(({ kind, n }) => {
            const k = KIND[kind];
            const d = DIALECT[kind];
            return (
              <Link className={`door ${k.cls}`} href={`/concept-lab/library?kind=${kind}`} key={kind} data-reveal="rise">
                <span className="door-top">
                  <Icon id={d.icon} style={{ width: 30, height: 30, color: k.colour }} />
                  <span className="door-count" style={{ color: k.colour }}>
                    {n}<small>{n === 1 ? " record" : " records"}</small>
                  </span>
                </span>
                <span className="door-line" style={{ color: k.colour }}>{d.line}</span>
                <span className="door-blurb">{d.blurb}</span>
                <span className="door-go" style={{ color: k.colour }}>{k.nav} →</span>
              </Link>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* Four ways in, chosen for a reason that is stated. */}
      <section>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "clamp(1.4rem,3.6vw,1.9rem)" }}>Start here</h2>
          <Link className="quiet-link" href="/concept-lab/library" style={{ fontSize: ".92rem" }}>See all {RECORDS.length} records →</Link>
        </div>
        <p className="lede" style={{ marginTop: ".4rem" }}>
          One of each kind, picked because of what it shows you — not because it came first.
        </p>
        <div className="lib" style={{ marginTop: "1.2rem" }}>
          {starters.map((s) => (
            <div key={s.id} data-reveal="rise">
              <RecordCard record={s.record!} />
              <p className="starter-why">{s.why}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* The differentiator, shown instead of mentioned. */}
      <section>
        <span className="k">why you can check it</span>
        <div className="sk-box tilt-l2" style={{ marginTop: ".8rem" }}>
          <p className="read" style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--pen-2)", maxWidth: "62ch" }}>
            Nothing here is written from memory. Every claim carries one of five marks, so you can always see whether you are reading the source,
            our paraphrase of it, a teaching device, our own reading, or an open question the literature has not settled.
          </p>
          <div className="marks-row">
            {MARKS.map((m) => (
              <span className="mark-chip" key={m.label}>
                <span style={{ color: m.colour, fontSize: "1rem" }}>{m.glyph}</span>
                {m.label}
              </span>
            ))}
          </div>
          <Link href="/concept-lab/about" className="chip grey" style={{ textDecoration: "none", fontSize: ".88rem", marginTop: "1rem", display: "inline-flex" }}>
            How we cite →
          </Link>
        </div>
      </section>

      <Divider />

      <section style={{ paddingBottom: "1rem" }}>
        <span className="k">or browse by discipline</span>
        <div style={{ display: "flex", gap: ".45rem", flexWrap: "wrap", marginTop: ".7rem" }}>
          {disciplineCounts.map(({ d, n }) => (
            <Link className="disc-chip" href={`/concept-lab/library?discipline=${d.id}`} key={d.id}>
              {d.name}<span className="disc-n">{n}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
