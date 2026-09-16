import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./aet-target.css";

const reading = localFont({
  src: [
    { path: "../surface/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../surface/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--aet-reading",
  display: "swap",
});

const labels = localFont({
  src: "../surface/_fonts/InstrumentSans.ttf",
  weight: "400 700",
  variable: "--aet-labels",
  display: "swap",
});

const hand = localFont({
  src: "../surface/_fonts/Caveat.ttf",
  weight: "400 700",
  variable: "--aet-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Affective Events Theory · visual study",
  description: "An isolated temporal visual study of Affective Events Theory.",
  robots: { index: false, follow: false },
};

function Mark() {
  return <span className="aet-brand-mark" aria-hidden="true"><i /><i /></span>;
}

export default function AETTargetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`aet-root ${reading.variable} ${labels.variable} ${hand.variable}`}>
      <a className="aet-skip" href="#aet-main">Skip to the reading</a>
      <header className="aet-header">
        <div className="aet-header-inner">
          <Link className="aet-brand" href="/concept-lab" aria-label="Academic Concept Lab home"><Mark /><span>Academic Concept Lab</span></Link>
          <span className="aet-motto">ideas drawn out · time kept visible</span>
          <nav aria-label="Main navigation">
            <Link href="/concept-lab">Home</Link>
            <Link href="/concept-lab/library">Library</Link>
            <Link href="/concept-lab/saved">Saved</Link>
            <Link href="/concept-lab/about">About</Link>
          </nav>
        </div>
      </header>
      <main id="aet-main">{children}</main>
      <footer className="aet-footer">
        <span>Academic Concept Lab</span>
        <span>Type set knowledge · draw the change</span>
        <span>Isolated prototype · production untouched</span>
      </footer>
    </div>
  );
}
