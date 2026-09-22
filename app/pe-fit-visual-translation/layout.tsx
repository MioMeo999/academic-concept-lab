import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { Sprite } from "../concept-lab/_components/Sprite";
import "./pe-fit-visual-translation.css";

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
  title: "Person–Environment Fit · Visual Translation Lab",
  description:
    "An isolated Academic Concept Lab Phase 3 prototype: one working world, repeatedly re-read through Person–Environment Fit.",
  robots: { index: false, follow: false },
};

export default function PEFitVisualTranslationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`pe-vt ${reading.variable} ${labels.variable} ${hand.variable}`}>
      <Sprite />
      <a className="pe-vt-skip" href="#pefit-main">
        Skip to the reading
      </a>

      <header className="pe-vt-site">
        <div className="pe-vt-site-inner">
          <Link className="pe-vt-brand" href="/concept-lab" aria-label="Academic Concept Lab home">
            <svg width="28" height="28" viewBox="0 0 40 40" aria-hidden="true">
              <path
                d="M20 3c2.8 6.6 4.3 9.4 9.8 10.1-5.4 1.3-7.6 3.9-9.8 10.6-2.2-6.7-4.4-9.3-9.8-10.6C15.7 12.4 17.2 9.6 20 3z"
                fill="#d94f32"
              />
              <path
                d="M20 23.7c2.1 5.9 3.7 8.4 8.6 9.1-4.8 1.1-6.8 3.1-8.6 7.1-1.8-4-3.8-6-8.6-7.1 4.9-.7 6.5-3.2 8.6-9.1z"
                fill="#237d7a"
                opacity=".82"
              />
            </svg>
            <span>Academic Concept Lab</span>
          </Link>

          <span className="pe-vt-motto">TYPESET KNOWLEDGE · DRAWN THINKING</span>

          <nav className="pe-vt-nav" aria-label="Main">
            <Link href="/concept-lab">Home</Link>
            <Link href="/concept-lab/library">Library</Link>
            <Link href="/concept-lab/saved">Saved</Link>
            <Link href="/concept-lab/about">About</Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="pe-vt-footer">
        <div>
          <strong>Academic Concept Lab</strong>
          <span>Person–Environment Fit · Phase 3 isolated prototype</span>
        </div>
        <p>Prototype branch only · canonical record and Production remain untouched.</p>
      </footer>
    </div>
  );
}
