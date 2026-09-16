import Link from "next/link";

type Mark = {
  glyph: string;
  className: string;
  label: string;
  means: string;
  boundary: string;
};

const FORMS = [
  {
    glyph: "○",
    className: "about-kind-theory",
    label: "Theory",
    line: "A lens for understanding.",
    question: "What lens helps us interpret this?",
    detail: "A theory gives us a way of looking. It organises a phenomenon without pretending to be the event itself.",
  },
  {
    glyph: "□",
    className: "about-kind-study",
    label: "Study",
    line: "An argument from evidence.",
    question: "What did researchers actually examine and find?",
    detail: "A study keeps its design, evidence, result and limitation together so a claim cannot float free.",
  },
  {
    glyph: "△",
    className: "about-kind-method",
    label: "Method",
    line: "A practice for inquiry.",
    question: "How can this be investigated?",
    detail: "A method is something researchers do: a disciplined way to produce, interpret or challenge evidence.",
  },
  {
    glyph: "◌",
    className: "about-kind-mechanism",
    label: "Mechanism",
    line: "A pathway between things.",
    question: "Through what process might it happen?",
    detail: "A mechanism names the route through which one condition can become another, keeping the connection inspectable.",
  },
] as const;

const MARKS: Mark[] = [
  {
    glyph: "●",
    className: "about-mark-source",
    label: "Directly reported / source-grounded",
    means: "Citations, samples, designs, dates and study-level conclusions grounded in published sources.",
    boundary: "It does not mean the Lab has independently repeated the work.",
  },
  {
    glyph: "■",
    className: "about-mark-paraphrase",
    label: "Plain-language paraphrase",
    means: "Source material restated without reproducing article text.",
    boundary: "It does not turn our wording into a quotation from the source.",
  },
  {
    glyph: "▲",
    className: "about-mark-analogy",
    label: "Original diagram / teaching analogy",
    means: "An editorial reconstruction used to make a relationship visible.",
    boundary: "It is not automatically a published figure, validated measurement or empirical result.",
  },
  {
    glyph: "✦",
    className: "about-mark-editorial",
    label: "Editorial interpretation",
    means: "The Lab’s reading, synthesis or explanatory framing.",
    boundary: "It is a learning aid, not a finding attributed to an original author.",
  },
  {
    glyph: "?",
    className: "about-mark-contested",
    label: "Contested / unresolved",
    means: "A question where the literature does not settle one answer.",
    boundary: "The gap is not silently filled by confidence, colour or drawing.",
  },
];

const PROCESS = [
  ["01", "Question", "What are we trying to understand?"],
  ["02", "Source literature", "What has been published, measured or argued?"],
  ["03", "Distinctions / disagreements", "Where do concepts separate, overlap or remain unsettled?"],
  ["04", "Plain-language explanation", "How can the idea be made readable without losing its boundary?"],
  ["05", "Visual / interactive teaching", "What can drawing, comparison or interaction make easier to see?"],
  ["06", "Limits / qualifications", "What should the reader not conclude?"],
  ["07", "Provenance / sources", "Can the reader follow the claim back?"],
] as const;

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="about-section-label"><span>{number}</span><span>{children}</span></p>;
}

function KindMark({ glyph, className }: { glyph: string; className: string }) {
  return <span className={`about-kind-glyph ${className}`} aria-hidden="true">{glyph}</span>;
}

function PaperFragment({ className, children }: { className: string; children: React.ReactNode }) {
  return <span className={`about-paper ${className}`}>{children}</span>;
}

export default function AboutTargetPage() {
  return (
    <div className="about-page about-shell">
      <section className="about-opening" aria-labelledby="about-title">
        <div className="about-opening-copy">
          <SectionLabel number="01">What the Lab is</SectionLabel>
          <h1 id="about-title">The <em>Lab.</em></h1>
          <p className="about-opening-thesis">Ideas, drawn with their evidence attached.</p>
          <p className="about-opening-lede">Academic Concept Lab is a visual learning atlas for theories, studies, mechanisms and research methods. It turns academic literature into explorable records without separating explanation from the evidence, limits and sources behind it.</p>
          <p className="about-trail-line"><span>See the idea.</span> <span>Follow the claim.</span> <span>Return to the source.</span></p>
        </div>
        <div className="about-opening-field" aria-label="A quiet source trail from paper to record">
          <PaperFragment className="about-paper-back">published source<br /><small>question · design · finding</small></PaperFragment>
          <PaperFragment className="about-paper-middle">working notes<br /><small>distinction / limit</small></PaperFragment>
          <PaperFragment className="about-paper-front">a visible record<br /><small>claim · mark · source</small></PaperFragment>
          <span className="about-opening-trace about-trace-one" aria-hidden="true" />
          <span className="about-opening-trace about-trace-two" aria-hidden="true" />
          <span className="about-hand-note">follow the claim<br />back through the evidence</span>
        </div>
      </section>

      <section className="about-section about-forms" aria-labelledby="forms-title">
        <div className="about-section-heading">
          <div><SectionLabel number="02">Four ways of knowing</SectionLabel><h2 id="forms-title">Different objects need<br /><em>different questions.</em></h2></div>
          <p>Academic Concept Lab distinguishes the kind of work a record is doing before asking the reader to explore it.</p>
        </div>
        <ol className="about-form-list">
          {FORMS.map((form) => <li key={form.label} className="about-form-entry"><KindMark glyph={form.glyph} className={form.className} /><div><h3>{form.label}</h3><p className="about-form-line">{form.line}</p><p>{form.detail}</p><p className="about-form-question">{form.question}</p></div></li>)}
        </ol>
      </section>

      <section className="about-section about-process" aria-labelledby="process-title">
        <div className="about-process-intro"><SectionLabel number="03">From source to record</SectionLabel><h2 id="process-title">Nothing loses<br /><em>its trail.</em></h2><p>Turning literature into a record is not a shortcut around the source. It is a visible sequence of questions, distinctions, explanations and limits.</p><p className="about-hand-note about-process-note">a research desk<br />still has edges</p></div>
        <div className="about-desk" aria-label="The stages from source literature to a traceable record">
          <div className="about-desk-fragments" aria-hidden="true"><PaperFragment className="about-desk-source">SOURCE<br /><small>published work</small></PaperFragment><PaperFragment className="about-desk-note">note / compare<br /><small>where does it hold?</small></PaperFragment><PaperFragment className="about-desk-record">RECORD<br /><small>claim + limits</small></PaperFragment></div>
          <ol className="about-process-list">{PROCESS.map(([number, title, detail]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{detail}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="about-section about-marks" aria-labelledby="marks-title">
        <div className="about-section-heading"><div><SectionLabel number="04">What the marks mean</SectionLabel><h2 id="marks-title">Not every mark means<br /><em>the same kind of knowing.</em></h2></div><p>A mark is a claim legend in the margin. It tells you what kind of statement you are reading — and where that statement stops.</p></div>
        <div className="about-mark-list">{MARKS.map((mark) => <article className="about-mark-entry" key={mark.label}><KindMark glyph={mark.glyph} className={mark.className} /><div className="about-mark-main"><h3>{mark.label}</h3><p><b>What it means</b>{mark.means}</p><p className="about-mark-boundary"><b>What it does not mean</b>{mark.boundary}</p></div></article>)}</div>
      </section>

      <section className="about-section about-drawing" aria-labelledby="drawing-title">
        <div className="about-drawing-heading"><SectionLabel number="05">The drawing explains · the source supports</SectionLabel><h2 id="drawing-title">A visual can make<br /><em>a relationship visible.</em></h2><p>It cannot make a claim true by looking convincing.</p></div>
        <div className="about-drawing-columns"><article><span className="about-column-mark about-column-drawing" aria-hidden="true">✦</span><h3>The drawing explains.</h3><p>Authored drawings and diagrams can reconstruct a relationship for teaching. An interactive state can clarify a theory by changing what the reader notices, compares or follows.</p><ul><li>Visual distance, colour and balance are explanatory choices.</li><li>A diagram can show a possible route without measuring an outcome.</li><li>Important academic claims remain live, selectable text.</li></ul></article><article><span className="about-column-mark about-column-source" aria-hidden="true">●</span><h3>The source supports.</h3><p>Published work carries the evidence, design, finding, qualification and uncertainty. Provenance stays attached to the claim so the reader can follow the explanation back.</p><ul><li>Published figures are not silently recast as Lab artwork.</li><li>Interaction does not create empirical evidence.</li><li>A persuasive image does not replace a source.</li></ul></article></div>
      </section>

      <section className="about-section about-unresolved" aria-labelledby="unresolved-title">
        <div className="about-unresolved-mark" aria-hidden="true">?</div>
        <div><SectionLabel number="06">What we leave unresolved</SectionLabel><h2 id="unresolved-title">A gap is still<br /><em>information.</em></h2><p>Where the literature does not agree, the record says so rather than silently choosing a side. Qualifications stay attached to claims. Missing evidence is not filled by a drawing, and an editorial explanation does not erase uncertainty.</p><ul><li>Disagreement remains disagreement.</li><li>Oversimplifications are surfaced.</li><li>A theory’s history is not forced into one founder when the sources do not support that story.</li></ul></div>
      </section>

      <section className="about-section about-journey" aria-labelledby="journey-title">
        <div className="about-section-heading"><div><SectionLabel number="07">How to move through the Lab</SectionLabel><h2 id="journey-title">Follow a question<br /><em>wherever it leads.</em></h2></div><p>The surfaces have different jobs. Together they let you orient, discover, return and understand how knowledge is represented.</p></div>
        <ol className="about-journey-list"><li><Link href="/concept-lab"><span className="about-journey-number">01</span><strong>Home</strong><em>Orient</em><p>See the Lab as a whole.</p><span aria-hidden="true">→</span></Link></li><li><Link href="/library-target"><span className="about-journey-number">02</span><strong>Library</strong><em>Discover</em><p>Find a question. Follow a thread. Enter a field.</p><span aria-hidden="true">→</span></Link></li><li><Link href="/saved-target"><span className="about-journey-number">03</span><strong>Saved</strong><em>Return</em><p>Keep a thought close and continue later.</p><span aria-hidden="true">→</span></Link></li><li><Link href="/concept-lab/library"><span className="about-journey-number">04</span><strong>Record</strong><em>Explore</em><p>Follow claims, limits and sources.</p><span aria-hidden="true">→</span></Link></li><li><Link href="#about-title"><span className="about-journey-number">05</span><strong>About</strong><em>Understand</em><p>See how the Lab represents knowledge.</p><span aria-hidden="true">↑</span></Link></li></ol>
      </section>

      <section className="about-closing" aria-label="Closing thought"><p>Read forward through the explanation.<br /><em>Read backward through the evidence.</em></p><span className="about-hand-note">keep asking<br />where it came from</span></section>
    </div>
  );
}
