import type { Metadata } from "next";
import Link from "next/link";
import { KIND, RECORDS } from "@/content/records";
import { DISCIPLINES } from "@/content/disciplines";
import type { RecordKind } from "@/content/types";
import { getBranchesForDiscipline, getDisciplineOrientation, getDisciplineRecordCount } from "@/content/atlas";
import { WmRecordCard } from "../_components/WmRecordCard";
import { MARKS, Underlined, accent, pad2, type Accent, type Mark } from "../_components/wm";

export const metadata: Metadata = { title: "Home" };

/* ---------------------------------------------------------------------------
   The production landing page, retypeset. Copy, curation, counts, doors and
   the provenance strip are all lifted unchanged from
   app/concept-lab/page.tsx — this is a visual study, not a content edit.
   ------------------------------------------------------------------------- */

const KIND_ORDER: RecordKind[] = ["theory", "mechanism", "method", "study"];

const KIND_ACCENT: Record<RecordKind, Accent> = {
  theory: "blue",
  mechanism: "violet",
  method: "amber",
  study: "red",
};

const DIALECT: Record<RecordKind, { line: string; blurb: string }> = {
  theory: {
    line: "A theory is a lens",
    blurb: "Nothing in it happened — no sample, no date, no result. It has to demonstrate rather than report.",
  },
  study: {
    line: "A study is an argument",
    blurb: "It happened once, to particular people, in one place — and it could be wrong. Method stays welded to finding.",
  },
  method: {
    line: "A method is a practice",
    blurb: "You do not learn one by reading about it. The page has to work at the desk, beside real material.",
  },
  mechanism: {
    line: "A mechanism is a pathway",
    blurb: "Not why something happens, but through what. A biological route the psychology has to travel down.",
  },
};

const START_HERE: { id: string; why: string }[] = [
  { id: "person-environment-fit", why: "The framework three other records hang off. Start here and the rest of the library has a spine." },
  { id: "ipa", why: "The most hands-on record on the site — a method you could start using on a transcript this week." },
  { id: "tuned-out-or-dialed-in", why: "The only evidence record so far, and the clearest example of method kept welded to finding." },
  { id: "hpa-axis", why: "Where the psychology meets the body — and the one record that is a physical system rather than an idea." },
];

const MARK_LIST: { glyph: Mark; label: string }[] = [
  { glyph: "●", label: "Source-grounded" },
  { glyph: "■", label: "Paraphrase" },
  { glyph: "▲", label: "Teaching analogy" },
  { glyph: "✦", label: "Editorial" },
  { glyph: "?", label: "Contested" },
];

export default function WideMarginHome() {
  const counts = KIND_ORDER.map((kind) => ({ kind, n: RECORDS.filter((record) => record.kind === kind).length }));
  const disciplineCounts = Object.values(DISCIPLINES)
    .map((discipline) => ({ discipline, n: RECORDS.filter((record) => record.discipline === discipline.id).length }))
    .filter((entry) => entry.n > 0);
  const majorDisciplines = ["ob", "music-psych"]
    .map((id) => ({ discipline: DISCIPLINES[id], n: getDisciplineRecordCount(RECORDS, id), orientation: getDisciplineOrientation(id) }))
    .filter((entry) => entry.discipline && entry.n > 0);
  const secondary = disciplineCounts.filter(({ discipline }) => !majorDisciplines.some((major) => major.discipline.id === discipline.id));
  const starters = START_HERE
    .map((entry) => ({ ...entry, record: RECORDS.find((record) => record.id === entry.id) }))
    .filter((entry) => entry.record);

  return (
    <div className="wm-shell">
      <section className="wm-home-hero wm-cover-grid">
        <div>
          <h1 className="wm-home-title">Academic Concept Lab</h1>
          <p className="wm-home-tag" style={accent("red")}>
            Theory, evidence and method — <span className="wm-hand" style={{ color: "var(--wm-red-ink)" }}><Underlined>drawn out</Underlined></span> until
            you can actually see them.
          </p>
          <p className="wm-home-sub">
            Academic work explained without being flattened. Every claim on every page carries a mark saying where it
            came from — and where it does not, the page says so.
          </p>
        </div>

        <div className="wm-counts is-stack">
          <div style={accent("blue")}><b>{RECORDS.length}</b><span>records</span></div>
          <div style={accent("violet")}><b>{counts.length}</b><span>kinds of record</span></div>
          <div style={accent("green")}><b>{disciplineCounts.length}</b><span>disciplines</span></div>
          <div style={accent("amber")}><b>5</b><span>provenance marks on every claim</span></div>
        </div>
      </section>

      <section>
        <div className="wm-sechead">
          <h2>Explore by discipline</h2>
          <Link href="/experiments/library">Open the library →</Link>
        </div>
        <p className="wm-lede" style={{ marginTop: ".6rem" }}>
          Start with the field that frames your question. Each surface opens the live library, where records remain
          traceable to their kind and evidence.
        </p>

        <div className="wm-doors" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(22rem,100%),1fr))" }}>
          {majorDisciplines.map(({ discipline, n, orientation }, index) => (
            <Link
              className="wm-door"
              key={discipline.id}
              href={`/experiments/library?discipline=${discipline.id}`}
              style={accent(index === 0 ? "green" : "blue")}
            >
              <span className="n">{pad2(index + 1)}<small>{n} {n === 1 ? "record" : "records"}</small></span>
              <h3 style={{ fontSize: "1.25rem" }}>{discipline.name}</h3>
              <p>{orientation?.summary}</p>
              {orientation?.themes?.length ? (
                <p className="m wm-label" style={{ marginTop: ".7rem" }}>{orientation.themes.join(" · ")}</p>
              ) : null}
              {discipline.id === "music-psych" && (
                <p className="wm-why" style={{ marginTop: ".6rem" }}>
                  {getBranchesForDiscipline(discipline.id).length} current branches in the atlas
                </p>
              )}
              <span className="go">Explore {discipline.short} →</span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "1.6rem" }}>
          <span className="wm-label">Also in the lab</span>
          <div className="wm-pills" style={{ marginTop: ".6rem" }}>
            {secondary.map(({ discipline, n }) => (
              <Link className="wm-pill" key={discipline.id} href={`/experiments/library?discipline=${discipline.id}`}>
                {discipline.name}
                <span className="wm-label" style={{ letterSpacing: ".06em" }}>{n}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wm-sechead">
          <h2>Four kinds of record</h2>
          <Link href="/experiments/library">Pick a way in →</Link>
        </div>
        <div className="wm-doors">
          {counts.map(({ kind, n }) => (
            <Link className="wm-door" key={kind} href={`/experiments/library?kind=${kind}`} style={accent(KIND_ACCENT[kind])}>
              <span className="n">{n}<small>{n === 1 ? "record" : "records"}</small></span>
              <h3>{DIALECT[kind].line}</h3>
              <p>{DIALECT[kind].blurb}</p>
              <span className="go">{KIND[kind].nav} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="wm-sechead">
          <h2>Start here</h2>
          <Link href="/experiments/library">See all {RECORDS.length} records →</Link>
        </div>
        <p className="wm-lede" style={{ marginTop: ".5rem" }}>
          One of each kind, picked because of what it shows you — not because it came first.
        </p>
        <div className="wm-cards">
          {starters.map((entry) => (
            <WmRecordCard key={entry.id} record={entry.record!} why={entry.why} />
          ))}
        </div>
      </section>

      <section>
        <div className="wm-sechead"><h2>Why you can check it</h2></div>
        <div className="wm-panel">
          <p className="wm-lede" style={{ maxWidth: "62ch" }}>
            Nothing here is written from memory. Every claim carries one of five marks, so you can always see whether
            you are reading the source, our paraphrase of it, a teaching device, our own reading, or an open question
            the literature has not settled.
          </p>
          <div className="wm-key-list" style={{ marginTop: "1.4rem" }}>
            {MARK_LIST.map((mark) => (
              <div className="wm-key-item" key={mark.label} style={accent(MARKS[mark.glyph].accent)}>
                <span className="g" aria-hidden="true">{mark.glyph}</span>
                <span>{mark.label}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1.3rem" }}>
            <a className="wm-stop" href="https://academic-concept-lab.vercel.app/concept-lab/about" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              How we cite ↗
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
