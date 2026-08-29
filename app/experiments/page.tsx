import type { Metadata } from "next";
import Link from "next/link";
import { MARKS, Underlined, accent, type Accent, type Mark } from "./_components/wm";

export const metadata: Metadata = { title: "Wide Margin — visual study" };

const SURFACES: { href: string; num: string; title: string; body: string; tone: Accent }[] = [
  {
    href: "/experiments/gestalt-visual-study",
    num: "01",
    title: "Gestalt Principles in Music",
    body: "The full theory record, retypeset. Same 23 sections, same wording, same sources, same two audio interactions — a new visual system around them.",
    tone: "blue",
  },
  {
    href: "/experiments/home",
    num: "02",
    title: "Home",
    body: "The landing page with its production copy, curation and counts, rebuilt in the new language.",
    tone: "green",
  },
  {
    href: "/experiments/library",
    num: "03",
    title: "Library",
    body: "Search, kind and discipline filters, and discipline grouping — the scaling surface, restyled.",
    tone: "violet",
  },
];

const SPECIMENS: { mark: Mark; label: string }[] = [
  { mark: "●", label: "source-grounded claim" },
  { mark: "■", label: "empirical finding" },
  { mark: "▲", label: "constructed teaching example" },
  { mark: "✦", label: "Concept Lab synthesis" },
  { mark: "?", label: "open or debated" },
];

export default function ExperimentIndex() {
  return (
    <div className="wm-shell">
      <section className="wm-home-hero">
        <span className="wm-label">Experimental visual language · v0</span>
        <h1 className="wm-home-title" style={{ marginTop: ".8rem" }}>
          Wide <em>Margin</em>
        </h1>
        <p className="wm-cover-q" style={accent("red")}>
          What if the notebook were <Underlined>properly typeset</Underlined>?
        </p>
        <p className="wm-home-sub">
          A parallel visual study of Academic Concept Lab. The reading type is a clean editorial sans; the
          handwriting is kept for the things a person actually writes by hand — numbers, questions, annotations,
          a circle round what matters. Colour is bound to provenance rather than to decoration.
        </p>
        <p className="wm-why" style={{ marginTop: "1.2rem", maxWidth: "52ch" }}>
          Nothing here touches the live site. Delete <code>app/experiments/</code> and the study is gone.
        </p>
      </section>

      <section>
        <div className="wm-sechead"><h2>Three surfaces</h2></div>
        <div className="wm-doors" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(19rem,100%),1fr))" }}>
          {SURFACES.map((surface) => (
            <Link className="wm-door" key={surface.href} href={surface.href} style={accent(surface.tone)}>
              <span className="n">{surface.num}</span>
              <h3>{surface.title}</h3>
              <p>{surface.body}</p>
              <span className="go">Open →</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="wm-sechead"><h2>The one rule</h2></div>
        <p className="wm-lede" style={{ marginTop: ".5rem" }}>
          Each of the five provenance marks owns one accent colour, and keeps it everywhere it appears. A section
          number is coloured by the kind of claim the section makes, so the colour rhythm running down a record is a
          readable summary of its evidence — and every mark is written out in words as well, so nothing depends on
          colour alone.
        </p>
        <div className="wm-key-list" style={{ marginTop: "1.4rem" }}>
          {SPECIMENS.map((specimen) => (
            <div className="wm-key-item" key={specimen.label} style={accent(MARKS[specimen.mark].accent)}>
              <span className="g" aria-hidden="true">{specimen.mark}</span>
              <span>{specimen.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="wm-sechead"><h2>Where production still lives</h2></div>
        <div className="wm-panel">
          <p className="wm-lede">
            The canonical routes are unchanged and this study is not merged. Compare them side by side.
          </p>
          <div className="wm-pills" style={{ marginTop: "1.2rem" }}>
            <a className="wm-pill" href="https://academic-concept-lab.vercel.app/concept-lab">Live home ↗</a>
            <a className="wm-pill" href="https://academic-concept-lab.vercel.app/concept-lab/library">Live library ↗</a>
            <a className="wm-pill" href="https://academic-concept-lab.vercel.app/concept-lab/theory/gestalt-principles-in-music">Live Gestalt record ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}
