import Link from "next/link";
import { personEnvironmentFit as record } from "@/content/theory";
import { PEFitInteractive } from "./_components/PEFitInteractive";

const primaryArt = "/pe-fit-target-assets/pe-fit-C-editorial-research-drawing.png";

function RichText({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function PEFitTargetPage() {
  return (
    <main id="pefit-main">
      <section className="pefit-hero" id="overview" aria-labelledby="pefit-title">
        <div className="pefit-hero-copy">
          <p className="pefit-eyebrow">THEORY / ORGANISATIONAL BEHAVIOUR / CORRESPONDENCE</p>
          <h1 id="pefit-title">Person–<br /><em>Environment</em> Fit</h1>
          <p className="pefit-hook">{record.hook}</p>
          <p className="pefit-lede"><RichText html={record.oneSentence} /></p>
          <div className="pefit-hero-note"><span>the field is shared</span><span>the relation is inspectable</span><span>the score is absent</span></div>
          <div className="pefit-facts" aria-label="Record facts"><div><strong>2</strong><span>forms of<br />correspondence</span></div><div><strong>4</strong><span>fit<br />targets</span></div><div><strong>1909 → 2008</strong><span>historical<br />trail</span></div></div>
          <Link className="pefit-enter" href="#correspondence"><span aria-hidden="true">↗</span>Enter the field</Link>
        </div>
        <div className="pefit-hero-field pefit-opening-world">
          <div className="pefit-hero-artwork">
            <img src={primaryArt} alt="A coloured-pencil workplace scene showing one person between tasks, colleagues and organisational context." loading="eager" />
            <svg className="pefit-hero-live-overlay" viewBox="0 0 1536 1024" aria-hidden="true">
              <path d="M180 470C420 300 570 300 760 470" className="pefit-live-trace pefit-live-trace-coral" />
              <path d="M760 470C980 330 1170 330 1370 490" className="pefit-live-trace pefit-live-trace-teal" />
              <path d="M755 490C920 470 1080 510 1260 620" className="pefit-live-trace pefit-live-trace-violet" />
              <text x="825" y="280" className="pefit-live-label">fit lives between them</text>
            </svg>
          </div>
          <div className="pefit-hero-field-note pefit-hero-note-one">one person · inside one working world</div>
          <div className="pefit-hero-field-note pefit-hero-note-two">fit lives between them</div>
        </div>
      </section>

      <PEFitInteractive record={record} />

      <section className="pefit-scholarship" id="trail" aria-labelledby="trail-title">
        <div className="pefit-section-kicker"><span>05</span><span>THE TRAIL</span></div>
        <div className="pefit-quiet-heading"><div><h2 id="trail-title">A framework with<br /><em>more than one beginning.</em></h2><p>{record.originsNote}</p></div><p className="pefit-hand">no single doorway<br />into the literature</p></div>
        <div className="pefit-origin-list">{record.origins.map((origin) => <article key={origin.year}><span>{origin.year}</span><div><h3>{origin.author}</h3><p className="pefit-origin-work"><RichText html={origin.work} /></p><p>{origin.contribution}</p></div></article>)}</div>
      </section>

      <section className="pefit-scholarship pefit-limit-section" id="limits" aria-labelledby="limits-title">
        <div className="pefit-section-kicker"><span>06</span><span>DON’T CONCLUDE</span></div>
        <div className="pefit-quiet-heading"><div><h2 id="limits-title">What the field<br /><em>does not settle.</em></h2><p>{record.oversimplificationsLede}</p></div><p className="pefit-hand">a visual balance<br />is still an analogy</p></div>
        <ol className="pefit-limit-list">{record.oversimplifications.map((item, index) => <li key={item}><span>0{index + 1}</span><p><RichText html={item} /></p></li>)}</ol>
      </section>

      <section className="pefit-scholarship" id="open" aria-labelledby="open-title">
        <div className="pefit-section-kicker"><span>07</span><span>STILL OPEN</span></div>
        <div className="pefit-quiet-heading"><div><h2 id="open-title">Correspondence<br /><em>needs its conditions.</em></h2><p>These qualifications keep the relationship visible without turning it into a universal prediction.</p></div></div>
        <ul className="pefit-qualification-list">{record.qualifications.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="pefit-scholarship pefit-reading-section" id="reading" aria-labelledby="reading-title">
        <div className="pefit-section-kicker"><span>08</span><span>{record.minimumReadingLabel ?? "IF YOU READ THREE THINGS"}</span></div>
        <div className="pefit-quiet-heading"><div><h2 id="reading-title">Three ways into<br /><em>the correspondence.</em></h2></div><p className="pefit-hand">read slowly · compare<br />what each source measured</p></div>
        <ol className="pefit-reading-list">{record.minimumReading.map((source, index) => <li key={source.citation}><span>0{index + 1}</span><div><p><RichText html={source.citation} /></p><small>{source.contribution}</small>{source.doi && <a href={`https://doi.org/${source.doi}`}>doi ↗</a>}</div></li>)}</ol>
      </section>

      <section className="pefit-scholarship pefit-sources-section" id="sources" aria-labelledby="sources-title">
        <div className="pefit-section-kicker"><span>09</span><span>SOURCES / PROVENANCE</span></div>
        <div className="pefit-quiet-heading"><div><h2 id="sources-title">Keep the relation<br /><em>attached to the claim.</em></h2><p>Dates, distinctions and boundaries remain traceable to the sources that establish them.</p></div></div>
        <ol className="pefit-source-list">{record.fullSources.map((source, index) => <li key={source.citation}><span>0{index + 1}</span><div><p><RichText html={source.citation} /></p><small>{source.contribution}</small>{source.doi && <a href={`https://doi.org/${source.doi}`}>doi ↗</a>}</div></li>)}</ol>
        <ul className="pefit-provenance-list" aria-label="Provenance marks">{record.provenance.map((item) => <li key={item.label}><span style={{ color: item.colour }}>{item.glyph}</span><div><strong>{item.label}</strong><p>{item.note}</p></div></li>)}</ul>
      </section>

      <div className="pefit-back"><Link href="/concept-lab/library">← Return to the atlas</Link><span>Person–Environment Fit · isolated visual/interaction prototype</span></div>
    </main>
  );
}
