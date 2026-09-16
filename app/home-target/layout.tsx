import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./target.css";

const reading = localFont({
  src: [
    { path: "../concept-lab/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../concept-lab/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--home-newsreader",
  display: "swap",
});

const machinery = localFont({
  src: "../concept-lab/_fonts/InstrumentSans.ttf",
  weight: "400 700",
  variable: "--home-instrument",
  display: "swap",
});

const script = localFont({
  src: "../concept-lab/_fonts/Caveat.ttf",
  weight: "400 700",
  variable: "--home-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Academic Concept Lab — home preview",
  description: "A visual home page preview for Academic Concept Lab.",
  robots: { index: false, follow: false },
};

function Mark({ kind }: { kind: "circle" | "square" | "triangle" | "star" | "question" }) {
  if (kind === "circle") return <span className="mark-shape mark-circle" aria-hidden="true" />;
  if (kind === "square") return <span className="mark-shape mark-square" aria-hidden="true" />;
  if (kind === "triangle") return <span className="mark-shape mark-triangle" aria-hidden="true" />;
  if (kind === "star") return <span className="mark-shape mark-star" aria-hidden="true">✦</span>;
  return <span className="mark-question" aria-hidden="true">?</span>;
}

function Header() {
  return (
    <header className="home-header">
      <div className="home-header-inner">
        <Link className="home-brand" href="/home-target" aria-label="Academic Concept Lab home preview">
          <span className="brand-spark" aria-hidden="true">✦</span>
          <span>Academic Concept Lab</span>
        </Link>
        <nav className="home-nav" aria-label="Preview navigation">
          <Link href="/concept-lab/library?kind=theory">Theories</Link>
          <Link href="#disciplines">Fields</Link>
          <Link href="#kinds">Map</Link>
          <Link href="/concept-lab/about">About</Link>
        </nav>
        <div className="home-search" aria-label="Search placeholder">
          <span className="search-icon" aria-hidden="true" />
          <span>Search theories, concepts, people …</span>
        </div>
        <span className="header-note">Ideas, drawn together.<i aria-hidden="true" /></span>
      </div>
    </header>
  );
}

function AtlasSketch() {
  return (
    <svg className="atlas-sketch" viewBox="0 0 780 590" role="img" aria-labelledby="atlas-title atlas-desc">
      <title id="atlas-title">A hand-drawn atlas of connected ideas</title>
      <desc id="atlas-desc">Colored circles, orbit lines, and a profile sketch suggest theories connected across disciplines.</desc>
      <defs>
        <filter id="rough-line" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" /></filter>
      </defs>
      <g fill="none" strokeLinecap="round" filter="url(#rough-line)">
        <ellipse cx="448" cy="304" rx="264" ry="226" stroke="#9ab7e6" strokeWidth="1.3" strokeDasharray="7 9" />
        <ellipse cx="448" cy="304" rx="200" ry="270" stroke="#b5c9e7" strokeWidth="1.1" transform="rotate(25 448 304)" />
        <ellipse cx="455" cy="308" rx="320" ry="137" stroke="#ecc45c" strokeWidth="1.1" transform="rotate(-22 455 308)" />
        <ellipse cx="462" cy="305" rx="307" ry="118" stroke="#f28b83" strokeWidth="1" transform="rotate(35 462 305)" />
        <path d="M205 390c89-110 150-197 282-248 111-43 195-23 239 22" stroke="#3e73ca" strokeWidth="2.2" />
        <path d="M168 423c92-54 166-48 249-22 106 34 207 22 303-70" stroke="#e85b52" strokeWidth="1.8" />
        <path d="M197 166c87 56 132 81 222 92 123 14 209-43 298-92" stroke="#e7b839" strokeWidth="1.8" />
        <path d="M269 112c-5 75 30 128 92 162 60 33 120 32 181 3 73-35 101-95 103-170" stroke="#87bfe0" strokeWidth="1.4" />
        <path d="M275 428c52-89 79-156 66-235-8-49-36-76-78-89" stroke="#20a388" strokeWidth="1.5" />
        <path d="M382 130c-38 39-62 94-59 153 4 77 53 126 118 139 68 14 137-13 174-71" stroke="#8958d5" strokeWidth="1.7" />
      </g>
      <g fill="#17233b" opacity=".78">
        <circle cx="203" cy="390" r="5" /><circle cx="290" cy="151" r="4" /><circle cx="594" cy="123" r="5" /><circle cx="701" cy="343" r="4" /><circle cx="627" cy="486" r="4" /><circle cx="350" cy="510" r="4" />
      </g>
      <g fill="#2873d1" stroke="#1654ab" strokeWidth="1">
        <circle cx="257" cy="267" r="19" opacity=".82" /><circle cx="594" cy="232" r="24" opacity=".77" /><circle cx="397" cy="420" r="18" opacity=".74" />
      </g>
      <g fill="#ef554b" stroke="#d13d35" strokeWidth="1"><circle cx="530" cy="349" r="28" opacity=".76" /><circle cx="677" cy="270" r="17" opacity=".7" /></g>
      <g fill="#f0bf2c" stroke="#df9d17" strokeWidth="1"><circle cx="404" cy="165" r="22" opacity=".74" /><circle cx="230" cy="470" r="16" opacity=".7" /></g>
      <g fill="#2ea889" stroke="#1d806e" strokeWidth="1"><circle cx="643" cy="412" r="21" opacity=".75" /><circle cx="329" cy="337" r="12" opacity=".7" /></g>
      <g fill="#8757d8" stroke="#6940ae" strokeWidth="1"><circle cx="509" cy="499" r="20" opacity=".66" /><circle cx="705" cy="179" r="12" opacity=".65" /></g>
      <g fill="none" stroke="#29384f" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M407 164c-42 22-89 65-108 116-17 45-10 84 12 113 21 28 47 42 75 49l-21 26 35 6 39-12c23-6 44-20 56-39 18-27 24-70 15-109-9-38-29-75-49-105-13-20-28-36-54-45z" />
        <path d="M402 182c18-14 49-19 75-4 23 13 47 39 62 66-28-6-48-1-68 11-23 14-44 15-70 4-25-10-42-28-55-54 18-8 36-14 56-23z" fill="#f3b8a9" opacity=".5" />
        <path d="M353 292c32-24 73-26 105-11 33 15 54 42 66 81-10 13-22 26-37 36-33 22-75 28-111 13-39-16-66-51-74-88 12-11 31-21 51-31z" fill="#ffbc77" opacity=".42" />
        <path d="M340 370c29 7 61 7 91-5 36-13 65-37 80-70" stroke="#2873d1" strokeWidth="3" />
        <path d="M370 414c25-25 48-37 79-42" stroke="#ef554b" strokeWidth="2.7" />
        <path d="M352 443c54 16 109 11 157-23" stroke="#f0bf2c" strokeWidth="2" />
      </g>
      <g fontFamily="var(--home-caveat)" fontSize="20" fill="#234e91">
        <text x="85" y="123" transform="rotate(-8 85 123)">ideas cross disciplines</text>
        <text x="606" y="75" transform="rotate(8 606 75)">a richer picture</text>
        <text x="630" y="535" transform="rotate(-7 630 535)">same ideas. more ways to see them.</text>
        <text x="106" y="526" transform="rotate(6 106 526)">connections worth following</text>
        <text x="470" y="98">Cognitive Science</text><text x="641" y="264">Psychology</text><text x="630" y="424">Neuroscience</text><text x="213" y="472">Music Psychology</text>
      </g>
      <g strokeLinecap="round"><path d="M90 143l142-23" stroke="#ef554b" strokeWidth="2" /><path d="M605 93l130-15" stroke="#f0bf2c" strokeWidth="2" /><path d="M625 551l112-21" stroke="#2970d1" strokeWidth="2" /></g>
    </svg>
  );
}

function DisciplineSketch({ kind }: { kind: "work" | "music" }) {
  if (kind === "work") {
    return (
      <svg className="discipline-sketch" viewBox="0 0 480 420" aria-hidden="true">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M62 329h332M92 292h248M116 258h200" stroke="#55729c" strokeWidth="1.4" />
          <path d="M79 334V192m64 142V160m70 174V130m74 204V167m66 167V194" stroke="#9ab1d2" strokeWidth="1.2" strokeDasharray="4 6" />
          <path d="M101 188c24-52 80-52 105-4m-26 52c22-41 67-52 105-19m-3-64c43-31 84-15 111 24" stroke="#f05a53" strokeWidth="2" />
          <path d="M79 227c56-42 109-45 166-10 47 29 92 24 162-31" stroke="#2c72cb" strokeWidth="2" />
          <path d="M102 126c65 4 142 17 222-23 36-18 64-25 92-6" stroke="#e4b52f" strokeWidth="1.8" />
        </g>
        <g fill="#244d86" opacity=".9"><circle cx="101" cy="188" r="11"/><circle cx="206" cy="184" r="9"/><circle cx="289" cy="165" r="10"/><circle cx="376" cy="127" r="11"/></g>
        <g stroke="#283b58" fill="none" strokeWidth="2"><circle cx="156" cy="292" r="13"/><path d="M156 305v54m-18-28h36m-28 50 10-22 10 22"/><circle cx="280" cy="288" r="13"/><path d="M280 301v55m-18-28h36m-28 51 10-23 10 23"/></g>
        <g fontFamily="var(--home-caveat)" fontSize="24" fill="#234e91"><text x="25" y="94">people</text><text x="22" y="120">in systems</text><text x="335" y="379">work is a human system</text></g>
      </svg>
    );
  }
  return (
    <svg className="discipline-sketch" viewBox="0 0 480 420" aria-hidden="true">
      <g fill="none" strokeLinecap="round"><path d="M33 234c67-11 113-57 163-76 53-21 111-20 191 21" stroke="#2b73d0" strokeWidth="2"/><path d="M27 291c84-22 142-17 209-3 61 13 133-6 210-59" stroke="#ef554b" strokeWidth="2"/><path d="M49 170c80-23 154-25 216 5 58 27 100 28 170-3" stroke="#e7b52c" strokeWidth="2"/><ellipse cx="252" cy="236" rx="178" ry="137" stroke="#9fb8dd" strokeWidth="1.2" strokeDasharray="5 8"/></g>
      <path d="M176 303c-35-20-55-49-57-84-2-45 28-78 67-97 36-18 85-20 116 1 24 16 36 41 41 69 6 36-3 74-24 99-20 24-49 35-79 34l-39 27 6-34c-12-2-22-7-31-15z" fill="#f7b8a6" opacity=".38" stroke="#233b5b" strokeWidth="2.2"/>
      <path d="M208 157c26-31 57-42 91-30 18 7 38 23 48 43-35-7-57-5-83 12-24 16-48 14-76-3 4-8 12-16 20-22z" fill="#f2c343" opacity=".52" stroke="#e3a82c" strokeWidth="2"/>
      <g fill="#2d71d0" stroke="#1b559f" strokeWidth="1"><circle cx="126" cy="128" r="16"/><circle cx="370" cy="154" r="22"/><circle cx="386" cy="312" r="18"/></g>
      <g fill="#ef554b" stroke="#d64038" strokeWidth="1"><circle cx="112" cy="300" r="18"/><circle cx="341" cy="359" r="22"/></g>
      <g fontFamily="var(--home-caveat)" fontSize="23" fill="#234e91"><text x="45" y="90">sound</text><text x="22" y="116">perception</text><text x="365" y="95">music connects</text><text x="342" y="120">mind + body</text><text x="35" y="385">we hear patterns</text></g>
      <g fill="#253b5a"><path d="M393 203h9v44h-9zM386 203h23l-12-15z"/><path d="M426 269h9v39h-9zM419 269h23l-12-15z"/></g>
    </svg>
  );
}

function KindSketch({ kind }: { kind: "theory" | "mechanism" | "method" | "study" }) {
  if (kind === "theory") return <svg className="kind-sketch" viewBox="0 0 220 150" aria-hidden="true"><path d="M26 125 103 22l78 103z" fill="#8cb4f1" fillOpacity=".24" stroke="#2469c5" strokeWidth="2"/><path d="M103 22v103M26 125l70-37 85 37M44 98l59-76" fill="none" stroke="#426993" strokeWidth="1.3"/><path d="M103 35l92 22" stroke="#ed5c54" strokeWidth="2"/><path d="M102 51l92 28" stroke="#ecc039" strokeWidth="2"/><text x="21" y="145" fontFamily="var(--home-caveat)" fontSize="17" fill="#245397">a lens on the world</text></svg>;
  if (kind === "mechanism") return <svg className="kind-sketch" viewBox="0 0 220 150" aria-hidden="true"><g fill="none" stroke="#2469c5" strokeWidth="8"><circle cx="82" cy="76" r="34" strokeDasharray="24 7"/><circle cx="144" cy="77" r="22" stroke="#ef6755" strokeDasharray="19 6"/></g><path d="M43 39c-19 11-29 28-30 49m163-51c18 16 25 32 27 53" fill="none" stroke="#ecc039" strokeWidth="2"/><path d="m31 29 16 9-16 10m151 2 15-11-15-10" fill="none" stroke="#2d72cd" strokeWidth="2"/><text x="42" y="143" fontFamily="var(--home-caveat)" fontSize="17" fill="#245397">a pathway between things</text></svg>;
  if (kind === "method") return <svg className="kind-sketch" viewBox="0 0 220 150" aria-hidden="true"><path d="m36 108 25-75 105 20-27 75z" fill="#f2bd47" fillOpacity=".22" stroke="#3c6490" strokeWidth="2"/><path d="M61 33 48 95l90 17M87 38l-13 65m41-60-13 67" fill="none" stroke="#2768c7" strokeWidth="1.6"/><circle cx="171" cy="45" r="27" fill="#e85c56" fillOpacity=".26" stroke="#e85c56" strokeWidth="2"/><text x="32" y="143" fontFamily="var(--home-caveat)" fontSize="17" fill="#245397">a practice for inquiry</text></svg>;
  return <svg className="kind-sketch" viewBox="0 0 220 150" aria-hidden="true"><g fill="none" strokeWidth="2"><path d="M29 114 61 25l125 29-34 89z" fill="#8cb4f1" fillOpacity=".24" stroke="#356292"/><path d="M61 25 93 9l119 28-26 17M93 9l-32 16" stroke="#ef6755"/><path d="M54 94 171 120M59 80l111 24" stroke="#e9b935"/><path d="M123 47h44v28h-44z" stroke="#e85c56"/></g><text x="25" y="148" fontFamily="var(--home-caveat)" fontSize="17" fill="#245397">an argument from evidence</text></svg>;
}

function ShelfSketch() {
  return <svg className="shelf-sketch" viewBox="0 0 620 360" role="img" aria-label="Hand-drawn stack of books and a globe labelled with provenance ideas"><g fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M83 264 398 247 523 306 202 337z" fill="#c9d8e9" fillOpacity=".28" stroke="#35577f" strokeWidth="2"/><path d="M80 217 390 200l119 57-311 34z" fill="#9cc2ee" fillOpacity=".22" stroke="#35577f" strokeWidth="2"/><path d="M88 169 391 154l120 45-310 33z" fill="#f0bb48" fillOpacity=".22" stroke="#35577f" strokeWidth="2"/><path d="M100 123 406 111l112 43-315 24z" fill="#f28a79" fillOpacity=".24" stroke="#35577f" strokeWidth="2"/><path d="M173 92 425 78l81 31-268 16z" fill="#f2d260" fillOpacity=".28" stroke="#35577f" strokeWidth="2"/><path d="M145 115 452 99M129 160l302-14M109 207l307-16M95 253l304-17" stroke="#2b71c9" strokeWidth="1.4"/><circle cx="470" cy="171" r="105" fill="#9fc0ef" fillOpacity=".19" stroke="#2d639b" strokeWidth="2"/><ellipse cx="470" cy="171" rx="105" ry="39" stroke="#e85b52" strokeWidth="1.5"/><ellipse cx="470" cy="171" rx="48" ry="105" stroke="#e7b42d" strokeWidth="1.5"/><path d="M385 163c51-23 115-30 170-9M393 215c58 24 115 21 163 1" stroke="#2b74cd" strokeWidth="1.5"/><path d="M312 55c35-24 76-32 111-28M541 80c28 15 45 35 56 65" stroke="#809bc0" strokeWidth="1.3" strokeDasharray="5 8"/></g><g fontFamily="var(--home-caveat)" fontSize="22" fill="#234e91"><text x="14" y="50">origins</text><text x="8" y="77">evidence</text><text x="534" y="164">people</text><text x="529" y="192">connections</text><text x="377" y="345">a more visible academic world</text></g><path d="M13 88l81-23M531 203l79-20" stroke="#ef554b" strokeWidth="2"/></svg>;
}

function ProvenanceMarks() {
  const marks = [
    { kind: "circle" as const, label: "Source-grounded", body: "Directly supported by a specific source such as a paper, book, or verifiable reference.", note: "Supported by a source." },
    { kind: "square" as const, label: "Paraphrase", body: "A faithful rephrasing of ideas from a source, in our own words.", note: "Based on a source, paraphrased." },
    { kind: "triangle" as const, label: "Teaching analogy", body: "An illustrative example used to explain a concept more clearly.", note: "A teaching analogy, not a direct claim." },
    { kind: "star" as const, label: "Editorial", body: "Our synthesis or interpretation, drawing on multiple sources.", note: "An editorial interpretation." },
    { kind: "question" as const, label: "Contested", body: "A claim that is debated, uncertain, or has competing perspectives.", note: "See different views." },
  ];
  return <div className="provenance-mark-grid">{marks.map((mark) => <article className="provenance-mark" key={mark.label}><Mark kind={mark.kind} /><h3>{mark.label}</h3><p>{mark.body}</p><span className="provenance-note">“{mark.note}”</span></article>)}</div>;
}

export default function HomeTargetLayout({ children }: { children: React.ReactNode }) {
  return <div className={`home-target ${reading.variable} ${machinery.variable} ${script.variable}`}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <main id="main-content">{children}</main>
    <footer className="home-footer"><div className="footer-brand"><span className="brand-spark" aria-hidden="true">✦</span>Academic Concept Lab</div><span>think&nbsp; / &nbsp;connect&nbsp; / &nbsp;see theories&nbsp; / &nbsp;a more visible academic world</span><span>Knowledge is a shared canvas.</span></footer>
  </div>;
}

export { AtlasSketch, DisciplineSketch, KindSketch, ProvenanceMarks, ShelfSketch };
