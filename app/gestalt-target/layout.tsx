import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./target.css";

const reading = localFont({
  src: [
    { path: "../b2-lab/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../b2-lab/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--target-reading",
  display: "swap",
});

const labels = localFont({
  src: "../b2-lab/_fonts/InstrumentSans.ttf",
  variable: "--target-labels",
  weight: "400 700",
  display: "swap",
});

const hand = localFont({
  src: "../b2-lab/_fonts/Caveat.ttf",
  variable: "--target-hand",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gestalt Principles in Music · Academic Concept Lab",
  description: "An isolated theory-page preview for the Academic Concept Lab Gestalt record.",
  robots: { index: false, follow: false },
};

export default function GestaltTargetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`gestalt-target ${reading.variable} ${labels.variable} ${hand.variable}`}>
      <a className="target-skip" href="#gestalt-target-main">Skip to the reading</a>
      <header className="target-masthead">
        <Link className="target-wordmark" href="/concept-lab" aria-label="Academic Concept Lab home">
          <svg className="target-mark" width="29" height="29" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M20 3c2.8 6.6 4.3 9.4 9.8 10.1-5.4 1.3-7.6 3.9-9.8 10.6-2.2-6.7-4.4-9.3-9.8-10.6C15.7 12.4 17.2 9.6 20 3z" fill="#E24E1B" />
            <path d="M20 23.7c2.1 5.9 3.7 8.4 8.6 9.1-4.8 1.1-6.8 3.1-8.6 7.1-1.8-4-3.8-6-8.6-7.1 4.9-.7 6.5-3.2 8.6-9.1z" fill="#2E7D8F" opacity=".82" />
          </svg>
          <span>Academic Concept Lab</span>
        </Link>
        <nav className="target-nav" aria-label="Main">
          <Link href="/concept-lab">Home</Link>
          <Link href="/concept-lab/library">Library</Link>
          <Link href="/concept-lab/saved">Saved</Link>
          <Link href="/concept-lab/about">About</Link>
        </nav>
        <span className="target-search" aria-hidden="true">⌕</span>
        <span className="target-edition">Ideas, drawn together.</span>
      </header>
      <aside className="visual-language-rail" aria-label="Visual language used in this prototype">
        <div className="rail-section rail-palette">
          <p className="rail-heading">COLOUR PALETTE</p>
          <div className="rail-swatches">
            <span className="rail-swatch rail-cobalt"><i aria-hidden="true" />Cobalt</span>
            <span className="rail-swatch rail-sky"><i aria-hidden="true" />Sky</span>
            <span className="rail-swatch rail-teal"><i aria-hidden="true" />Teal</span>
            <span className="rail-swatch rail-emerald"><i aria-hidden="true" />Emerald</span>
            <span className="rail-swatch rail-ochre"><i aria-hidden="true" />Ochre</span>
            <span className="rail-swatch rail-vermilion"><i aria-hidden="true" />Vermilion</span>
          </div>
        </div>
        <div className="rail-section rail-material">
          <p className="rail-heading">MATERIAL &amp; TEXTURE</p>
          <div className="material-samples" aria-label="Paper, graphite, and marker textures">
            <span className="paper-stack" aria-hidden="true"><i /><i /><i /></span>
            <span className="material-pencil" aria-hidden="true" />
            <span className="material-ink" aria-hidden="true" />
            <span className="material-label">paper · graphite · marker</span>
          </div>
        </div>
        <div className="rail-section rail-marks">
          <p className="rail-heading">ANNOTATION LANGUAGE</p>
          <div className="rail-marks-list">
            <span><b className="mark-circle" aria-hidden="true" />circle <small>key idea</small></span>
            <span><b className="mark-highlight" aria-hidden="true" />highlight <small>key term</small></span>
            <span><b className="mark-arrow" aria-hidden="true">→</b>arrow <small>relation</small></span>
            <span><b className="mark-star" aria-hidden="true">✦</b>star <small>important</small></span>
          </div>
        </div>
        <div className="rail-section rail-spirit">
          <p className="rail-heading">VISUAL SPIRIT</p>
          <p className="rail-hand">Pure white canvas<br />Handwritten &amp; sketched<br />Concepts become visible</p>
        </div>
      </aside>
      {children}
      <footer className="target-footer">
        <span>Academic Concept Lab</span>
        <span>Ideas, drawn together.</span>
        <span>Prototype for human review · production untouched</span>
      </footer>
    </div>
  );
}
