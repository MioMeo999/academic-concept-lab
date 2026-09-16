import type { Metadata } from "next";
import Image from "next/image";
import { rta } from "../../content/rta";
import RTAInteractive from "./_components/RTAInteractive";

export const metadata: Metadata = {
  title: "Reflexive Thematic Analysis · patterns made through interpretation",
  description: rta.oneSentence,
  robots: { index: false, follow: false },
};

function Rich({ html }: { html: string }) { return <span dangerouslySetInnerHTML={{ __html: html }} />; }

const qualityMarkers = [
  ["01", "methodological coherence", "Question, assumptions, sampling, analytic orientation and reporting should belong to the same method."],
  ["02", "rich engagement with data", "Read deeply enough to notice contradiction, context, silence, repetition and tension."],
  ["03", "well-developed themes", "Each theme needs a central organising concept, boundaries, distinctness and an analytic job."],
  ["04", "interpretive depth", "Quotes do not prove a theme by themselves. Explain what the wording, positioning and relation make visible."],
  ["05", "reflexive openness", "Show how the researcher’s standpoint and decisions shaped the reading without turning reflexivity into ritual."],
  ["06", "clear reporting", "Make the path from extract to code to theme inspectable, with quality language that fits reflexive TA."],
];

const misuseNotes = [
  "‘Emerged’ hides the researcher’s interpretive work.",
  "The interview schedule is not an analytic conclusion.",
  "Frequency and significance are not synonyms.",
  "A quotation needs interpretation, not only display.",
  "Too many themes can mean a topic was promoted without an organising concept.",
  "Independent coder agreement belongs to a different quality logic and should not be smuggled into reflexive TA as proof of validity.",
  "Quality language must fit the declared theoretical position; ‘objective’ or ‘bias-free’ undoes reflexive assumptions.",
];

const targetMisusesLede = "Seven recurring problems highlighted across Braun and Clarke’s methodological and quality guidance. This is an editorial teaching synthesis, not a ranked count from one review.";
const targetReportingSource = { citation: "Braun, V., &amp; Clarke, V. (2024). Supporting best practice in reflexive thematic analysis reporting in Palliative Medicine: A review of published research and introduction to the Reflexive Thematic Analysis Reporting Guidelines (RTARG). <i>Palliative Medicine, 38</i>(6), 608–616.", contribution: "Reporting guidance for methodologically coherent and reflexively open RTA accounts.", doi: "10.1177/02692163241234800" };
const targetCoreReading = rta.coreReading.some((source) => source.citation.includes("RTARG")) ? rta.coreReading : [...rta.coreReading.slice(0, 5), targetReportingSource, ...rta.coreReading.slice(5)];

export default function ReflexiveTATargetPage() {
  return (
    <div className="rta-page">
      <div className="rta-breadcrumb"><a href="/concept-lab">Methods</a><span>/</span><a href="/concept-lab/library">Qualitative analysis</a><span>/</span><b>Reflexive Thematic Analysis</b></div>

      <section className="rta-hero" aria-labelledby="rta-title">
        <div className="rta-hero-copy">
          <p className="rta-kicker"><span>01</span><span>METHOD / QUALITATIVE ANALYSIS</span></p>
          <h1 id="rta-title">Reflexive<br /><em>Thematic Analysis</em></h1>
          <p className="rta-hero-claim">Patterns are not simply<br /><em>waiting to be found.</em></p>
          <p className="rta-hero-lede"><Rich html={rta.oneSentence} /></p>
          <p className="rta-hand">analysis is made through interpretation</p>
          <a className="rta-enter" href="#rta-phases"><span aria-hidden="true">↘</span>Enter the worktable</a>
        </div>
        <div className="rta-hero-study">
          <div className="rta-interpretive-field" role="img" aria-label="A researcher inside an interpretive field, where data, position and context shape the reading">
            <Image className="rta-interpretive-art" src="/reflexive-ta-target-assets/rta-interpretive-field.png" alt="" aria-hidden="true" width={1774} height={887} priority unoptimized />
            <svg viewBox="0 0 620 420" aria-hidden="true">
              <path className="interpretive-orbit orbit-blue" d="M40 250 C120 80 330 24 548 136 S450 388 220 345 S46 270 40 250" />
              <path className="interpretive-orbit orbit-coral" d="M84 96 C198 205 310 126 430 182 S516 344 560 362" />
              <path className="interpretive-orbit orbit-ochre" d="M68 320 C160 190 270 228 348 82 S506 116 574 225" />
              <path className="interpretive-profile" d="M284 65 C249 74 231 105 238 139 C243 157 232 171 214 183 L234 190 L226 205 C241 212 245 226 247 242 C251 274 273 295 303 298 C331 301 350 285 359 261 C364 248 370 234 383 224 C392 217 396 208 389 202 L373 196 L375 180 C378 155 366 119 347 93 C331 72 308 62 284 65 Z" />
              <path className="interpretive-profile-detail" d="M268 84 C301 99 328 110 348 138 C363 160 364 188 350 218 M266 111 C292 121 313 139 319 164 M250 246 C270 259 289 264 311 259" />
              <path className="interpretive-thread thread-teal" d="M354 112 C410 87 444 105 470 146 S488 240 548 255" />
              <path className="interpretive-thread thread-violet" d="M331 278 C391 298 426 275 456 242 S517 201 578 205" />
              <circle className="interpretive-pigment pigment-coral" cx="464" cy="144" r="28" />
              <circle className="interpretive-pigment pigment-teal" cx="510" cy="262" r="20" />
              <circle className="interpretive-pigment pigment-ochre" cx="404" cy="83" r="16" />
            </svg>
            <span className="interpretive-label label-data">data</span>
            <span className="interpretive-label label-position">position</span>
            <span className="interpretive-label label-context">context</span>
            <span className="interpretive-label label-language">language</span>
            <span className="interpretive-note note-field">the researcher is already inside the reading</span>
            <span className="interpretive-note note-question">what becomes visible?</span>
            <span className="interpretive-paper paper-context">experience<br />theory<br />values</span>
          </div>
          <div className="rta-study-rule"><span>ORIGINAL TEACHING EXAMPLE</span><span>not published empirical data</span></div>
          <p className="rta-study-question">How does a researcher turn one account into a pattern of shared meaning?</p>
          <blockquote>“We stopped following the plan because they seemed tired. I wasn’t sure whether I was leading or accompanying. Only afterwards did I realise the dance had changed my playing.”</blockquote>
          <div className="rta-hero-marks" aria-hidden="true"><span className="hero-underline" /><span className="hero-loop" /><span className="hero-pencil">read it again</span><span className="hero-pencil hero-pencil-two">what changed?</span><svg viewBox="0 0 680 330"><path d="M20 276 C140 214 182 292 275 221 S430 205 650 72" /><path d="M92 120 C192 160 230 92 332 148 S510 185 620 150" /></svg></div>
          <div className="rta-formula"><span>DATA</span><i>×</i><span>RESEARCHER</span><i>×</i><span>QUESTION</span><i>×</i><span>POSITION</span><b>→</b><strong>INTERPRETATION</strong></div>
        </div>
      </section>

      <nav className="rta-contents" aria-label="On this page"><span>read the method</span><a href="#rta-reflexivity">reflexivity</a><a href="#rta-phases">six recursive phases</a><a href="#rta-theme">theme / not bucket</a><a href="#rta-lenses">analytic lenses</a><a href="#rta-misconceptions">misreadings</a><a href="#rta-quality">quality</a><a href="#rta-sources">sources</a></nav>

      <section className="rta-intro-strip" aria-labelledby="rta-intro-title">
        <div><p className="rta-kicker"><span>02</span><span>THE METHOD IN ONE SENTENCE</span></p><h2 id="rta-intro-title">A pattern of shared meaning,<br /><em>organised around a central concept.</em></h2></div>
        <div className="rta-intro-reading"><p><Rich html={rta.ideaLede} /></p><p className="rta-caption"><b>● Source-grounded.</b> The method’s claims are anchored in Braun &amp; Clarke’s cited work. The extract above is a constructed teaching example.</p><div className="rta-concept-map" aria-label="The analytic relationship between data, interpretation and theme"><div className="rta-code-fragments"><span>pressure</span><span>expectations</span><span>belonging</span><span>support</span></div><svg viewBox="0 0 900 360" aria-hidden="true"><path d="M120 180 C250 50 310 285 470 176 S705 62 814 152" /><path d="M117 230 C255 308 341 88 468 176 S684 318 816 202" /><path d="M170 112 C278 161 352 194 469 176 S626 135 742 260" /></svg><span className="rta-concept-node concept-data">DATA</span><span className="rta-concept-node concept-interpretation">INTERPRETATION</span><span className="rta-concept-node concept-theme">THEME</span><span className="rta-concept-core"><b>central organising<br />concept</b><small>a pattern of shared meaning</small></span><span className="rta-concept-note">a theme makes sense of data<br />through a perspective</span><span className="rta-concept-rubbed">topic-like grouping</span></div></div>
      </section>

      <RTAInteractive procedure={rta.procedure ?? []} themeContrast={rta.themeContrast ?? { weak: [], strong: [], note: "" }} themeLede={rta.themeContrastLede ?? "A theme is a pattern of shared meaning organised around a central concept."} />

      <section className="rta-commitments" id="rta-commitments" aria-labelledby="rta-commitments-title">
        <div className="rta-commitments-copy"><p className="rta-kicker"><span>08</span><span>WHAT MAKES IT REFLEXIVE</span></p><h2 id="rta-commitments-title">Five commitments.<br /><em>One analytic stance.</em></h2><p>{rta.commitmentsLede}</p><p className="rta-hand">subjectivity is a resource</p></div>
        <div className="rta-commitments-field">{(rta.commitments ?? []).map((item, index) => <article key={item.title} className={`commitment commitment-${index + 1}`}><span className="rta-commitment-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p><span className="commitment-trace" aria-hidden="true" /></article>)}</div>
      </section>

      <section className="rta-coding" id="rta-coding" aria-labelledby="rta-coding-title">
        <div className="rta-coding-head"><p className="rta-kicker"><span>09</span><span>READ THE SAME MATERIAL MORE PRECISELY</span></p><h2 id="rta-coding-title">A label names the topic.<br /><em>A code makes a claim.</em></h2><p>{rta.codingExamplesLede}</p></div>
        <div className="rta-coding-table"><div className="rta-coding-columns"><span>EXTRACT</span><span>TOPIC LABEL<small>describes</small></span><span>ANALYTIC CODE<small>interprets</small></span></div>{(rta.codingExamples ?? []).map((item, index) => <article key={item.extract}><blockquote>“{item.extract}”</blockquote><span className="rta-topic-chip">{item.weak}</span><span className={`rta-strong-code code-tone-${index}`}>{item.strong}</span></article>)}</div>
        <p className="rta-caption"><b>▲ Original teaching illustration.</b> These extracts and codes are constructed to show analytic movement, not drawn from a published dataset.</p>
      </section>

      <section className="rta-misconceptions" id="rta-misconceptions" aria-labelledby="rta-misconceptions-title">
        <div className="rta-misconceptions-head"><p className="rta-kicker"><span>10</span><span>MISTAKEN FOR REFLEXIVE TA</span></p><h2 id="rta-misconceptions-title">Some phrases carry<br /><em>another method inside them.</em></h2><p>{targetMisusesLede}</p></div>
        <div className="rta-edited-language">{(rta.misuses ?? []).map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><div className="rta-struck"><Rich html={item} /></div><p>{misuseNotes[index]}</p></article>)}<p className="rta-caption"><b>■ Editorial synthesis.</b> These seven recurring problems condense patterns discussed across the cited methodological and quality guidance; they are not a ranked prevalence count.</p></div>
      </section>

      <section className="rta-quality" id="rta-quality" aria-labelledby="rta-quality-title">
        <div className="rta-quality-head"><p className="rta-kicker"><span>11</span><span>QUALITY / REPORTING / RTARG</span></p><h2 id="rta-quality-title">A convincing analysis<br /><em>shows its working.</em></h2><p>{rta.craftLede}</p></div>
        <div className="rta-quality-sheet">
          <div className="rta-proof-inspection">
            <p className="rta-proof-label">INSPECT ONE ANALYTIC MOVE</p>
            <blockquote>“Only afterwards did I realise the dance had changed my playing.”</blockquote>
            <div className="rta-proof-path"><span>extract</span><b>→</b><span>recognising collaboration retrospectively</span><b>→</b><span>authority becoming relational</span></div>
            <div className="rta-proof-questions"><p>Where is the central organising concept?</p><p>What makes this interpretation plausible?</p><p>Can the reader inspect the path from extract → code → theme → claim?</p></div>
          </div>
          <div className="rta-quality-list">{qualityMarkers.map(([number, title, body]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div><i aria-hidden="true" /></article>)}</div>
        </div>
        <p className="rta-caption"><b>● Source-grounded / ■ editorial synthesis.</b> These checks translate quality and reporting guidance into a teaching proof sheet; they are not a mechanical scoring rubric.</p>
      </section>

      <section className="rta-qualifications" aria-labelledby="rta-qualifications-title"><div><p className="rta-kicker"><span>12</span><span>BOUNDARIES / QUALIFICATIONS</span></p><h2 id="rta-qualifications-title">Flexibility is not<br /><em>a licence to mix logics.</em></h2></div><ol>{rta.qualifications.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol></section>

      <section className="rta-sources" id="rta-sources" aria-labelledby="rta-sources-title"><div className="rta-sources-copy"><p className="rta-kicker"><span>13</span><span>CLAIMS / SOURCES / PROVENANCE</span></p><h2 id="rta-sources-title">The visual explains.<br /><em>The source supports.</em></h2><p>Constructed examples are marked as such. Methodological claims stay attached to the sources that support them.</p></div><div className="rta-source-list"><ol>{targetCoreReading.slice(0, 7).map((source, index) => <li key={source.citation}><span>{String(index + 1).padStart(2, "0")}</span><p><Rich html={source.citation} /></p><small>{source.contribution}</small></li>)}</ol><ul>{rta.provenance.map((item) => <li key={item.label}><span style={{ color: item.colour }}>{item.glyph}</span><div><b>{item.label}</b><p>{item.note}</p></div></li>)}</ul></div></section>

      <section className="rta-close"><p className="rta-hand">analysis leaves traces · keep the path visible</p><a href="/concept-lab/library">← Return to the atlas</a><span>Reflexive Thematic Analysis · isolated visual prototype</span></section>
    </div>
  );
}
