import Link from "next/link";
import Image from "next/image";
import { gestaltPrinciplesInMusic as record } from "@/content/gestalt-principles-in-music";
import { GroupingStudio } from "./GroupingStudioTarget";

const gestalt = record.gestalt!;
const relatedTo = record.relatedTo ?? [];
const distributedPrinciples = [
  gestalt.proximity.cards[0],
  gestalt.similarity.cards[0],
  gestalt.continuation.options[0],
  gestalt.closure.cards[0],
  gestalt.laws.cards[2],
  gestalt.laws.cards[1],
];

function RichText({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function ReferenceGroupingFigure() {
  return (
    <svg className="reference-grouping-figure" viewBox="0 0 900 430" role="img" aria-labelledby="reference-grouping-title reference-grouping-desc">
      <title id="reference-grouping-title">From sounds to perceived music</title>
      <desc id="reference-grouping-desc">Colored sound events are gathered into three hand-drawn groups, then translated into three musical phrases.</desc>
      <defs>
        <pattern id="ref-pencil-blue" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(24)"><path d="M0 0V8" stroke="#0b61ff" strokeWidth="1" opacity=".34" /></pattern>
        <pattern id="ref-pencil-red" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(24)"><path d="M0 0V8" stroke="#e64b3c" strokeWidth="1" opacity=".34" /></pattern>
        <pattern id="ref-pencil-teal" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(24)"><path d="M0 0V8" stroke="#0aa58a" strokeWidth="1" opacity=".34" /></pattern>
        <marker id="ref-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M1 1L9 5L1 9" fill="none" stroke="#172438" strokeWidth="1.4" /></marker>
      </defs>
      <path d="M24 52C155 8 280 26 390 60C470 85 530 63 620 36" className="reference-pencil-trace trace-blue" />
      <path d="M25 57C150 18 280 35 390 68C472 93 535 74 625 47" className="reference-pencil-trace trace-blue soft" />
      <g className="reference-sound-field">
        <path d="M34 126C124 74 279 77 371 130C416 156 430 213 379 252C293 317 113 300 40 237C8 210 7 153 34 126Z" className="reference-wash wash-blue" />
        <path d="M40 132C130 85 270 91 357 137C403 160 414 209 372 241C286 306 123 288 48 230C17 206 14 156 40 132Z" className="reference-loop loop-blue" />
        <path d="M53 138C140 94 266 101 348 144C388 166 399 203 365 231C282 287 137 277 62 222" className="reference-loop loop-blue second" />
        {[74,112,151,192,234,278,321].map((x, index) => <circle key={`blue-${x}`} cx={x} cy={index % 2 ? 145 : 166} r="12" className="reference-note note-blue-fill" />)}
        {[93,135,175,218,262,305,345].map((x, index) => <circle key={`blue-low-${x}`} cx={x} cy={index % 2 ? 214 : 232} r="8" className="reference-note note-blue-fill soft-note" />)}
        <text x="58" y="112" className="reference-hand ref-blue">Similarity</text>
      </g>
      <g className="reference-sound-field">
        <path d="M54 305C143 276 279 283 366 321C414 343 431 385 386 408C297 452 118 439 42 392C8 370 15 319 54 305Z" className="reference-wash wash-red" />
        <path d="M58 310C144 285 274 291 359 327C404 348 416 379 378 401C288 443 131 428 51 383C19 365 25 324 58 310Z" className="reference-loop loop-red" />
        {[92,138,185,229,277,323].map((x, index) => <circle key={`red-${x}`} cx={x} cy={index % 2 ? 335 : 353} r="11" className="reference-note note-red-fill" />)}
        <text x="71" y="300" className="reference-hand ref-red">Proximity</text>
      </g>
      <g className="reference-sound-field">
        <path d="M247 178C326 143 441 145 517 181C566 205 580 246 536 276C462 326 313 319 252 276C212 248 211 198 247 178Z" className="reference-wash wash-teal" />
        <path d="M255 183C329 153 435 157 509 188C553 207 565 242 527 268C453 316 322 308 261 271C225 248 224 204 255 183Z" className="reference-loop loop-teal" />
        {[282,323,365,410,451,492].map((x, index) => <circle key={`teal-${x}`} cx={x} cy={index % 2 ? 211 : 229} r="10" className="reference-note note-teal-fill" />)}
        <text x="291" y="174" className="reference-hand ref-teal">Common fate</text>
      </g>
      <path d="M538 216C594 215 617 213 661 206" className="reference-arrow" markerEnd="url(#ref-arrow)" />
      <text x="528" y="198" className="reference-hand ref-ink">grouping</text>
      <g className="reference-score">
        <text x="682" y="80" className="reference-hand ref-ink">a melody emerges</text>
        <path d="M650 119H872M650 127H872M650 135H872M650 143H872M650 151H872" className="reference-staff" />
        <path d="M650 204H872M650 212H872M650 220H872M650 228H872M650 236H872" className="reference-staff" />
        <path d="M650 289H872M650 297H872M650 305H872M650 313H872M650 321H872" className="reference-staff" />
        <path d="M672 141L672 99M712 133L712 87M752 151L752 104M792 128L792 77M832 116L832 70" className="reference-stem stem-blue" />
        <path d="M672 141L712 133L752 151L792 128L832 116" className="reference-melody melody-blue" />
        <circle cx="672" cy="141" r="6" className="reference-score-dot dot-blue" /><circle cx="712" cy="133" r="6" className="reference-score-dot dot-blue" /><circle cx="752" cy="151" r="6" className="reference-score-dot dot-blue" /><circle cx="792" cy="128" r="6" className="reference-score-dot dot-blue" /><circle cx="832" cy="116" r="6" className="reference-score-dot dot-blue" />
        <path d="M672 227L672 185M712 219L712 174M752 229L752 184M792 211L792 164M832 198L832 153" className="reference-stem stem-red" />
        <path d="M672 227L712 219L752 229L792 211L832 198" className="reference-melody melody-red" />
        <circle cx="672" cy="227" r="6" className="reference-score-dot dot-red" /><circle cx="712" cy="219" r="6" className="reference-score-dot dot-red" /><circle cx="752" cy="229" r="6" className="reference-score-dot dot-red" /><circle cx="792" cy="211" r="6" className="reference-score-dot dot-red" /><circle cx="832" cy="198" r="6" className="reference-score-dot dot-red" />
        <path d="M672 317L672 278M712 308L712 264M752 318L752 277M792 300L792 254M832 286L832 244" className="reference-stem stem-teal" />
        <path d="M672 317L712 308L752 318L792 300L832 286" className="reference-melody melody-teal" />
        <circle cx="672" cy="317" r="6" className="reference-score-dot dot-teal" /><circle cx="712" cy="308" r="6" className="reference-score-dot dot-teal" /><circle cx="752" cy="318" r="6" className="reference-score-dot dot-teal" /><circle cx="792" cy="300" r="6" className="reference-score-dot dot-teal" /><circle cx="832" cy="286" r="6" className="reference-score-dot dot-teal" />
      </g>
      <text x="46" y="424" className="reference-hand ref-ink">from sounds …</text><text x="686" y="362" className="reference-hand ref-ink">… to perceived music</text>
    </svg>
  );
}

function KeyPrinciplesSketch() {
  const principles = [...gestalt.laws.cards, ...gestalt.proximity.cards];
  return (
    <div className="key-principles-sketch">
      {principles.map((card) => (
        <article className="key-principle" key={card.label}>
          <span className="key-principle-ring" style={{ borderColor: card.colour, color: card.colour }} aria-hidden="true" />
          <div><h3>{card.label}</h3><p>{card.body}</p></div>
        </article>
      ))}
    </div>
  );
}

function EvidenceGlance() {
  const studies = [
    { label: gestalt.deliege.evidence.label, lede: gestalt.deliege.lede },
    { label: gestalt.frankland.evidence.label, lede: gestalt.frankland.lede },
    { label: "experience boundary", lede: gestalt.culture.lede },
  ];
  return (
    <aside className="evidence-glance" aria-labelledby="evidence-glance-title">
      <div className="glance-head"><div><p className="eyebrow">EVIDENCE AT A GLANCE</p><h3 id="evidence-glance-title">What supports the picture?</h3></div><a href="#evidence">View all <span aria-hidden="true">→</span></a></div>
      <ol>
        {studies.map((study, index) => (
          <li key={`${study.label}-${index}`}><span className="glance-number">0{index + 1}</span><div><strong>{study.label}</strong><p>{study.lede}</p></div><span className={`glance-overlap overlap-${index + 1}`} aria-hidden="true" /></li>
        ))}
      </ol>
      <div className="glance-books" aria-hidden="true"><span>▤</span><span>▤</span><span>▤</span></div>
    </aside>
  );
}

function WhyItMatters() {
  return (
    <article className="why-it-matters" aria-labelledby="why-title">
      <div><p className="eyebrow">WHY IT MATTERS</p><h3 id="why-title">The listener<br /><em>organises experience.</em></h3><p>{gestalt.problem.lede}</p></div>
      <svg className="why-sketch" viewBox="0 0 240 180" role="img" aria-label="Hand-drawn head and sound lines representing perceptual organisation">
        <path d="M91 151C65 139 48 115 51 86C53 59 74 34 101 29C128 24 152 38 164 59C176 81 172 113 151 135C133 155 110 163 91 151Z" className="why-head" />
        <path d="M92 148C78 124 87 100 104 83C120 67 123 53 109 37M111 145C126 121 123 100 139 80C151 65 155 55 148 43" className="why-brain" />
        <path d="M22 72H55M15 86H51M24 100H55M178 71H219M181 87H228M176 103H217" className="why-sound" />
        <circle cx="94" cy="63" r="7" className="why-dot dot-blue" /><circle cx="131" cy="108" r="7" className="why-dot dot-red" /><circle cx="112" cy="92" r="7" className="why-dot dot-teal" />
        <path d="M78 22L94 13L108 23" className="why-arrow" />
      </svg>
    </article>
  );
}

function MiniDemoCard() {
  return (
    <section className="mini-demo-card" aria-labelledby="mini-demo-title">
      <div className="mini-demo-heading"><div><p className="eyebrow">INTERACTIVE DEMO</p><h2 id="mini-demo-title">Experience grouping<br /><em>in real time.</em></h2></div><span>Reset ↻</span></div>
      <p className="mini-demo-deck">Click to change the highlighted notes and hear how similarity affects grouping.</p>
      <div className="mini-demo-tabs" aria-hidden="true"><span className="is-active">Similarity</span><span>Proximity</span><span>Closure</span><span>Ambiguity</span></div>
      <svg className="mini-demo-score" viewBox="0 0 340 115" role="img" aria-labelledby="mini-score-title mini-score-desc">
        <title id="mini-score-title">A small interactive grouping score preview</title>
        <desc id="mini-score-desc">Blue notes are grouped together by a hand-drawn boundary on five staff lines.</desc>
        <path d="M14 35H326M14 42H326M14 49H326M14 56H326M14 63H326" className="mini-staff" />
        <path d="M30 49C74 14 139 16 176 45C209 70 268 75 313 42" className="mini-loop" />
        {[38,82,126,171,216,261,306].map((x, index) => <g key={x}><line x1={x} y1="58" x2={x} y2={index % 2 ? 25 : 34} className="mini-stem" /><circle cx={x} cy={index % 2 ? 42 : 51} r="4.8" className={index < 5 ? "mini-note mini-note-blue" : "mini-note mini-note-grey"} /></g>)}
      </svg>
      <a className="mini-demo-link" href="#experiment">Play <span aria-hidden="true">▶</span><span className="mini-demo-divider" aria-hidden="true" /> Hear the grouping</a>
    </section>
  );
}

function WholePartFigure() {
  return (
    <svg className="whole-figure" viewBox="0 0 700 330" role="img" aria-labelledby="whole-title whole-desc">
      <title id="whole-title">One central event in two organisations</title>
      <desc id="whole-desc">One shared event, 65, is held between two organisations. The same mark becomes a local ending in one whole and a continuing line in the other.</desc>
      <path d="M38 155C128 82 240 103 307 149C334 168 354 198 379 213" className="whole-brush whole-brush-teal" />
      <path d="M370 118C449 76 559 102 671 174" className="whole-brush whole-brush-red" />
      <path d="M40 267C130 230 231 251 304 272" className="whole-brush whole-brush-gold" />
      <line x1="350" y1="46" x2="350" y2="286" className="whole-axis" />
      <text x="350" y="26" textAnchor="middle" className="whole-axis-label">the event stays the same</text>
      <g className="whole-case case-a">
        <ellipse cx="181" cy="160" rx="129" ry="73" className="whole-wash" />
        <ellipse cx="181" cy="160" rx="131" ry="77" />
        <path d="M67 127C108 100 196 99 254 130C279 143 285 181 260 205C218 246 119 235 73 201C47 182 45 145 67 127Z" className="whole-rough" />
        <text x="50" y="72" className="whole-case-label">ORGANISATION A</text>
        <text x="50" y="99" className="whole-case-copy">a local ending</text>
        <text x="74" y="173">60 · 62 · 64</text>
        <text x="285" y="173">— 67 · 69</text>
        <path d="M240 121 C276 101 301 109 318 132" />
        <text x="210" y="243" className="whole-role">the boundary is available here</text>
      </g>
      <g className="whole-case case-b">
        <ellipse cx="519" cy="160" rx="129" ry="73" className="whole-wash" />
        <ellipse cx="519" cy="160" rx="131" ry="77" />
        <path d="M406 128C453 99 544 105 603 132C642 150 646 188 612 212C568 242 466 232 419 199C390 178 383 146 406 128Z" className="whole-rough" />
        <text x="388" y="72" className="whole-case-label">ORGANISATION B</text>
        <text x="388" y="99" className="whole-case-copy">a continuing line</text>
        <text x="412" y="173">60 · 62 — 64</text>
        <text x="618" y="173">· 67 · 69</text>
        <path d="M576 121 C611 102 633 111 652 132" />
        <text x="486" y="243" className="whole-role">the same event carries on</text>
      </g>
      <g className="whole-shared-event" aria-label="shared event 65">
        <path d="M276 173C302 157 326 157 350 173C374 157 398 157 424 173" className="shared-event-bridge" />
        <circle cx="350" cy="173" r="25" className="shared-event-wash" />
        <text x="350" y="181" textAnchor="middle" className="central-event shared-event-text">65</text>
        <text x="350" y="115" textAnchor="middle" className="shared-event-label">same event · different role</text>
      </g>
      <g className="whole-notes" aria-hidden="true">
        <text x="92" y="119">♪</text><text x="124" y="110">♩</text><text x="224" y="211">♪</text>
        <text x="452" y="111">♪</text><text x="580" y="211">♩</text><text x="618" y="187">♪</text>
      </g>
      <text x="350" y="310" textAnchor="middle" className="whole-hand-note">relations redraw the role of the part</text>
    </svg>
  );
}

function CueOrbit() {
  return (
    <svg className="cue-orbit" viewBox="0 0 460 245" aria-hidden="true">
      <path d="M53 107C69 47 167 21 226 64C275 98 260 167 202 190C128 220 39 180 53 107Z" className="orbit-loop orbit-blue" />
      <path d="M205 70C253 26 355 44 384 104C409 157 349 205 280 187C230 173 185 117 205 70Z" className="orbit-loop orbit-red" />
      <path d="M124 119C179 84 278 89 318 132C345 161 312 215 243 221C171 228 97 182 124 119Z" className="orbit-loop orbit-teal" />
      <path d="M81 123C126 111 168 113 207 128M252 128C290 118 331 118 370 132" className="orbit-arrow" />
      <circle cx="224" cy="128" r="18" className="orbit-centre" />
      <text x="224" y="125" textAnchor="middle" className="orbit-centre-label">one</text>
      <text x="224" y="140" textAnchor="middle" className="orbit-centre-label">event</text>
      <text x="86" y="77" className="orbit-label orbit-label-blue">similarity</text>
      <text x="310" y="77" className="orbit-label orbit-label-red">proximity</text>
      <text x="103" y="199" className="orbit-label orbit-label-teal">common fate</text>
      <text x="295" y="201" className="orbit-label orbit-label-gold">continuation</text>
      <text x="16" y="232" className="orbit-note">no cue works alone</text>
    </svg>
  );
}

function HistorySketch() {
  return (
    <svg className="history-sketch" viewBox="0 0 1060 180" aria-hidden="true">
      <path d="M86 117C188 117 233 82 324 82C413 82 432 130 510 130C588 130 617 55 704 55C791 55 835 101 968 101" className="history-thread history-thread-blue" />
      <path d="M324 82C344 43 373 30 419 23M510 130C553 162 591 165 634 153M704 55C735 25 772 22 812 24" className="history-thread history-thread-red" />
      <path d="M86 117L71 110M86 117L72 124M968 101L953 94M968 101L953 108" className="history-arrow" />
      <circle cx="324" cy="82" r="9" className="history-dot history-dot-teal" /><circle cx="510" cy="130" r="9" className="history-dot history-dot-gold" /><circle cx="704" cy="55" r="9" className="history-dot history-dot-red" />
      <text x="56" y="157" className="history-hand history-hand-blue">broad perceptual question</text>
      <text x="344" y="45" className="history-hand history-hand-red">musical adaptation</text>
      <text x="541" y="174" className="history-hand history-hand-gold">tests and reformulations</text>
      <text x="744" y="51" className="history-hand history-hand-plum">experience matters</text>
    </svg>
  );
}

function EvidenceStamp({ tone }: { tone: "blue" | "red" | "teal" }) {
  return (
    <svg className={`evidence-stamp stamp-${tone}`} viewBox="0 0 100 62" aria-hidden="true">
      <path d="M8 39C14 17 36 9 54 18C73 27 89 14 94 30C98 45 79 54 61 49C43 44 19 56 8 39Z" />
      <path d="M14 35C24 18 40 17 54 25C67 33 79 22 87 32" className="stamp-line" />
      <circle cx="26" cy="34" r="4" /><circle cx="48" cy="27" r="4" /><circle cx="73" cy="35" r="4" />
    </svg>
  );
}

function LineageRail() {
  return (
    <div className="lineage-rail" role="group" aria-label="Historical lineage from Gestalt to later musical tests">
      {gestalt.lineage.nodes.map((node, index) => (
        <div className="lineage-node" key={node.label}>
          <span className="lineage-number">0{index + 1}</span>
          <span className="lineage-marker" style={{ background: node.colour }} aria-hidden="true" />
          <p className="lineage-label">{node.label}</p>
          <p>{node.body}</p>
          {index < gestalt.lineage.nodes.length - 1 && <span className="lineage-arrow" aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  );
}

export function GestaltTargetContent() {
  return (
    <div className="gestalt-target-content">
      <section className="target-hero" id="overview" aria-labelledby="page-title">
        <nav className="reference-toc" aria-label="Record sections">
          <p>READ THE RECORD</p>
          <a className="is-current" href="#overview"><span>01</span>Overview</a>
          <a href="#experiment"><span>02</span>In music</a>
          <a href="#whole"><span>03</span>Key principles</a>
          <a href="#evidence"><span>04</span>Evidence</a>
          <a href="#apparatus"><span>05</span>Limits</a>
        </nav>
        <div className="hero-copy">
          <p className="eyebrow">THEORIES / MUSIC PSYCHOLOGY / PERCEPTION</p>
          <h1 id="page-title">Gestalt Principles<br /><em>in Music</em></h1>
          <p className="hero-deck">How we hear the whole — more than the sum of the parts.</p>
          <p className="hero-lede">{record.oneSentence}</p>
          <div className="hero-actions">
            <a className="ink-button" href="#experiment">Try the sound experiment <span aria-hidden="true">→</span></a>
            <a className="quiet-button" href="#evidence">Read the evidence</a>
          </div>
          <p className="margin-note note-blue">Patterns<br />make groups.</p>
        </div>
        <div className="hero-art">
          <Image
            className="gestalt-hero-artwork"
            src="/visual-language/home/home-music-signal-wide.webp"
            alt="Coloured-pencil study of a listening profile, musical notes, and sound events gathering into groups"
            width={800}
            height={474}
            priority
            unoptimized
          />
          <div className="hero-art-overlay" aria-hidden="true"><ReferenceGroupingFigure /></div>
        </div>
        <aside className="hero-aside" aria-label="Record framing">
          <p className="quote-mark">“</p>
          <p className="hero-quote">{record.hook}</p>
          <p className="aside-label"><span className="provenance provenance-source">●</span> record question</p>
          <div className="hero-facts">
            {record.facts.map((fact) => <span key={fact}>{fact}</span>)}
          </div>
          <MiniDemoCard />
        </aside>
      </section>

      <nav className="section-map" aria-label="On this page">
        <span>Trace the question</span>
        <a href="#experiment">01 · Events to groups</a>
        <a href="#whole">02 · Whole / part</a>
        <a href="#history">03 · A branching history</a>
        <a href="#evidence">04 · Evidence and limits</a>
      </nav>

      <section className="reference-overview-grid" aria-labelledby="principles-title">
        <div className="reference-overview-copy"><p className="eyebrow">OVERVIEW</p><h2 id="principles-title">The whole has<br /><em>a different character.</em></h2><p>{gestalt.problem.lede}</p><p className="editorial-note"><span className="provenance provenance-source">●</span> {gestalt.problem.note}</p></div>
        <div className="reference-principles"><div className="reference-subhead"><p className="eyebrow">KEY PRINCIPLES</p><p>{gestalt.laws.lede}</p></div><KeyPrinciplesSketch /></div>
        <div className="reference-overview-side"><WhyItMatters /><EvidenceGlance /></div>
      </section>

      <section id="experiment" className="target-section experiment-section" aria-labelledby="experiment-title">
        <div className="section-heading">
          <div><p className="eyebrow">CONTROLLED TEACHING EXAMPLE</p><h2 id="experiment-title">Move one cue.<br /><em>Watch the candidate boundary move.</em></h2></div>
          <p>{gestalt.opening.lede}</p>
        </div>
        <div className="reference-study-grid">
          <div className="reference-sketch-panel">
            <div className="experiment-sketch" role="group" tabIndex={0} aria-label="Hand-drawn cue study">
          <div className="experiment-sketch-copy"><p className="eyebrow">READ THE MARKS</p><p>One sound event can join a different group when its neighbours, timing, or direction change.</p><p className="hand-caption">the boundary is a percept, not a line in the score</p></div>
          <svg className="notation-sketch" viewBox="0 0 620 210" role="img" aria-labelledby="notation-title notation-desc">
            <title id="notation-title">Two candidate groupings of the same sound events</title>
            <desc id="notation-desc">Colored hand-drawn loops show one possible grouping around the same sequence of notes, while a second loop proposes another boundary.</desc>
            <path d="M38 66H574M38 75H574M38 84H574M38 93H574" className="notation-staff" />
            <path d="M72 62V132M160 62V132M249 62V132M336 62V132M424 62V132M511 62V132" className="notation-stem" />
            <path d="M42 47C118 5 225 13 296 56C359 94 459 103 563 59" className="notation-loop notation-loop-blue" />
            <path d="M47 51C126 16 219 21 290 63C366 108 468 112 570 65" className="notation-loop notation-loop-blue second" />
            <path d="M102 142C177 112 285 113 352 149C409 179 494 176 551 139" className="notation-loop notation-loop-red" />
            <path d="M110 147C185 123 280 123 347 158C416 193 495 187 559 146" className="notation-loop notation-loop-red second" />
            {[72,160,249,336,424,511].map((x, index) => <circle key={x} cx={x} cy={index % 2 ? 73 : 88} r="8" className={index < 3 ? "notation-dot notation-dot-blue" : "notation-dot notation-dot-red"} />)}
            <text x="50" y="31" className="notation-label notation-label-blue">grouping A</text><text x="464" y="198" className="notation-label notation-label-red">grouping B</text>
            <text x="273" y="25" className="notation-note">same notes</text><text x="267" y="203" className="notation-note">different whole</text>
          </svg>
            </div>
          </div>
          <div className="reference-demo-panel">
            <div className="reference-panel-heading"><div><p className="eyebrow">INTERACTIVE DEMO</p><h3>Experience grouping<br /><em>in real time.</em></h3></div><span className="reset-mark">reset ↻</span></div>
            <GroupingStudio opening={gestalt.opening} conflict={gestalt.conflict} />
          </div>
        </div>
        <p className="hand-margin experiment-margin" aria-hidden="true">A small shift can reorganise the whole.</p>
      </section>

      <section id="whole" className="target-section whole-section" aria-labelledby="whole-title-heading" tabIndex={0}>
        <div className="split-heading">
          <p className="section-index">02</p>
          <div><p className="eyebrow">RELATIONAL PERCEPTION</p><h2 id="whole-title-heading">The part changes<br /><em>with the whole.</em></h2></div>
          <p>{gestalt.whole.lede}</p>
        </div>
        <WholePartFigure />
        <div className="whole-material-field" aria-hidden="true">
          <Image src="/visual-language/home/home-music-signal-wide.webp" alt="" width={800} height={474} unoptimized />
        </div>
        <p className="figure-caption"><span className="provenance provenance-synthesis">✦</span> {gestalt.whole.note}</p>
        <p className="hand-margin whole-margin" aria-hidden="true">Same event.<br />New role.</p>
      </section>

      <section className="cue-field target-section" aria-labelledby="cue-title">
        <div className="cue-intro"><p className="eyebrow">A FAMILY OF CUES</p><h2 id="cue-title">Grouping is a negotiation<br /><em>between relations.</em></h2><p>{gestalt.laws.lede}</p><div className="cue-material-field" aria-hidden="true"><Image src="/visual-language/home/home-music-signal-wide.webp" alt="" width={800} height={474} unoptimized /></div><CueOrbit /></div>
        <div className="cue-list">
          {distributedPrinciples.map((card, index) => (
            <article className="cue-item" key={card.label}>
              <span className="cue-number">0{index + 1}</span><span className="cue-colour" style={{ background: card.colour }} aria-hidden="true" />
              <h3>{card.label}</h3><p>{card.body}</p>
            </article>
          ))}
        </div>
        <p className="cue-note"><span className="provenance provenance-source">●</span> {gestalt.laws.note}</p>
      </section>

      <section id="history" className="target-section history-section" aria-labelledby="history-title" tabIndex={0}>
        <div className="split-heading history-heading"><p className="section-index">03</p><div><p className="eyebrow">HISTORY WITHOUT A STRAIGHT LINE</p><h2 id="history-title">A broad idea<br /><em>becomes many questions.</em></h2></div><p>{gestalt.lineage.lede}</p></div>
        <HistorySketch />
        <LineageRail />
        <div className="pragnanz-block">
          <div><p className="eyebrow">THE UNFINISHED WORD</p><h3>Prägnanz, with<br /><em>its problem intact.</em></h3></div>
          <div className="pragnanz-copy"><p>{gestalt.pragnanz.historical}</p><p>{gestalt.pragnanz.problem}</p><div className="later-terms" role="group" aria-label="Later reformulations of the problem">{gestalt.pragnanz.later.map((term) => <span key={term}>{term}</span>)}</div><p className="editorial-note"><span className="provenance provenance-question">?</span> {gestalt.pragnanz.note}</p></div>
        </div>
        <p className="hand-margin history-margin" aria-hidden="true">No straight line.<br />A branching history.</p>
      </section>

      <section id="evidence" className="target-section evidence-section" aria-labelledby="evidence-title">
        <div className="split-heading"><p className="section-index">04</p><div><p className="eyebrow">QUIET SCHOLARSHIP</p><h2 id="evidence-title">What the evidence<br /><em>can actually carry.</em></h2></div><p>{record.trailLede}</p></div>
        <div className="evidence-ledger">
          {[gestalt.deliege, gestalt.frankland].map((study, index) => (
            <article className="evidence-entry" key={study.evidence.title}>
              <div className="evidence-index"><span>0{index + 1}</span><EvidenceStamp tone={index === 0 ? "blue" : "red"} /></div>
              <div className="evidence-main"><p className="eyebrow"><span className="provenance provenance-finding">■</span> {study.evidence.label}</p><h3>{study.evidence.title}</h3><p>{study.lede}</p><dl><div><dt>{study.evidence.testedLabel}</dt><dd>{study.evidence.tested}</dd></div><div><dt>{study.evidence.foundLabel}</dt><dd>{study.evidence.found}</dd></div><div><dt>does not test</dt><dd>{study.evidence.notTested}</dd></div></dl></div>
            </article>
          ))}
          <article className="evidence-entry evidence-entry-culture"><div className="evidence-index"><span>03</span><EvidenceStamp tone="teal" /></div><div className="evidence-main"><p className="eyebrow"><span className="provenance provenance-finding">■</span> experience boundary</p><h3>Iversen, Patel &amp; Ohgushi (2008)</h3><p>{gestalt.culture.lede}</p><div className="culture-steps">{gestalt.culture.cards.map((card, index) => <div key={card.label}><span>{index + 1}</span><strong>{card.label}</strong><p>{card.body}</p></div>)}</div></div></article>
        </div>
        <p className="hand-margin evidence-margin" aria-hidden="true">Different studies.<br />Different questions.</p>
      </section>

      <section id="apparatus" className="target-section apparatus-section" aria-labelledby="apparatus-title">
        <div className="apparatus-head"><p className="eyebrow">THE STOPPING POINT</p><h2 id="apparatus-title">Useful at the boundary.<br /><em>Careful beyond it.</em></h2><p>{gestalt.scope.lede}</p></div>
        <div className="scope-columns"><div><h3>It can help explain</h3><ul>{gestalt.scope.explains.map((item) => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}</ul></div><div><h3>It does not settle</h3><ul>{gestalt.scope.stops.map((item) => <li key={item}><span aria-hidden="true">—</span>{item}</li>)}</ul></div></div>
        <p className="scope-note"><span className="provenance provenance-synthesis">✦</span> {gestalt.scope.note}</p>
      </section>

      <section id="provenance" className="target-section provenance-section" aria-labelledby="provenance-title">
        <div className="provenance-head"><p className="eyebrow">PROVENANCE / SOURCES / RELATIONS</p><p className="provenance-accessible-label">Where every claim came from</p><h2 id="provenance-title">Keep the marks<br /><em>attached to the claims.</em></h2></div>
        <div className="provenance-grid">
          {record.provenance.map((item) => <div className="provenance-row" key={item.glyph}><span className="provenance-glyph" aria-hidden="true">{item.glyph}</span><div><h3>{item.label}</h3><p>{item.note}</p></div></div>)}
        </div>
        <div className="reading-trail"><div><p className="eyebrow">MINIMUM READING</p>{record.minimumReading.slice(0, 4).map((source) => <p key={source.citation}><RichText html={source.citation} /></p>)}</div><div><p className="eyebrow">RELATED RECORDS</p>{relatedTo.map((related) => <Link className="related-link" href={`/concept-lab/theory/${related.recordId}`} key={related.recordId}>{related.relation} <span aria-hidden="true">→</span></Link>)}</div></div>
      </section>

      <section className="closing-note" aria-label="Prototype note"><p className="hand-note">Different theories.<br />A richer picture.</p><p>{record.qualifications[0]} {record.qualifications[2]}</p></section>
    </div>
  );
}

