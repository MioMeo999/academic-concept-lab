import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./pe-fit-target.css";

const reading = localFont({
  src: [
    { path: "../concept-lab/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../concept-lab/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--pe-reading",
  display: "swap",
});

const labels = localFont({
  src: "../concept-lab/_fonts/InstrumentSans.ttf",
  variable: "--pe-labels",
  weight: "400 700",
  display: "swap",
});

const hand = localFont({
  src: "../concept-lab/_fonts/Caveat.ttf",
  variable: "--pe-hand",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Person–Environment Fit · Correspondence Field",
  description: "An isolated Academic Concept Lab prototype for exploring Person–Environment Fit as correspondence.",
  robots: { index: false, follow: false },
};

export default function PEFitTargetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`pefit-target ${reading.variable} ${labels.variable} ${hand.variable}`}>
      <a className="pefit-skip" href="#pefit-main">Skip to the reading</a>
      <header className="pefit-masthead">
        <Link className="pefit-wordmark" href="/concept-lab" aria-label="Academic Concept Lab home">
          <svg width="29" height="29" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M20 3c2.8 6.6 4.3 9.4 9.8 10.1-5.4 1.3-7.6 3.9-9.8 10.6-2.2-6.7-4.4-9.3-9.8-10.6C15.7 12.4 17.2 9.6 20 3z" fill="#e24e1b" />
            <path d="M20 23.7c2.1 5.9 3.7 8.4 8.6 9.1-4.8 1.1-6.8 3.1-8.6 7.1-1.8-4-3.8-6-8.6-7.1 4.9-.7 6.5-3.2 8.6-9.1z" fill="#2e7d8f" opacity=".82" />
          </svg>
          <span>Academic Concept Lab</span>
        </Link>
        <span className="pefit-motto">ideas drawn out · knowledge in context · research made visible</span>
        <nav className="pefit-nav" aria-label="Main">
          <Link href="/concept-lab">Home</Link>
          <Link href="/concept-lab/library">Library</Link>
          <Link href="/concept-lab/saved">Saved</Link>
          <Link href="/concept-lab/about">About</Link>
        </nav>
        <span className="pefit-search" aria-hidden="true">⌕</span>
        <span className="pefit-edition">Correspondence field / prototype</span>
      </header>
      {children}
      <footer className="pefit-footer">
        <span>Academic Concept Lab</span>
        <span>TYPESET KNOWLEDGE · DRAWN THINKING</span>
        <span>Isolated prototype · production untouched</span>
      </footer>
    </div>
  );
}
