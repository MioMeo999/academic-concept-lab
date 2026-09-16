import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./aet-rebuild.css";

const reading = localFont({
  src: [
    { path: "../surface/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../surface/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--aetr-reading",
  display: "swap",
});

const labels = localFont({
  src: "../surface/_fonts/InstrumentSans.ttf",
  weight: "400 700",
  variable: "--aetr-labels",
  display: "swap",
});

const hand = localFont({
  src: "../surface/_fonts/Caveat.ttf",
  weight: "400 700",
  variable: "--aetr-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Affective Events Theory · a day made of events",
  description: "An isolated learning experience for Affective Events Theory.",
  robots: { index: false, follow: false },
};

function Mark() {
  return <span className="aetr-mark" aria-hidden="true"><i /><i /></span>;
}

export default function AETRebuildLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`aetr-root ${reading.variable} ${labels.variable} ${hand.variable}`}>
      <a className="aetr-skip" href="#aetr-main">Skip to the reading</a>
      <header className="aetr-header">
        <div className="aetr-header-inner">
          <Link className="aetr-brand" href="/concept-lab" aria-label="Academic Concept Lab home"><Mark /><span>Academic Concept Lab</span></Link>
          <span className="aetr-motto">ideas drawn out · time kept visible</span>
          <nav aria-label="Main navigation">
            <Link href="/concept-lab">Home</Link>
            <Link href="/concept-lab/library">Library</Link>
            <Link href="/concept-lab/saved">Saved</Link>
            <Link href="/concept-lab/about">About</Link>
          </nav>
        </div>
      </header>
      <main id="aetr-main">{children}</main>
      <footer className="aetr-footer">
        <span>Academic Concept Lab</span>
        <span>the day is made of events</span>
        <span>isolated prototype · production untouched</span>
      </footer>
    </div>
  );
}
