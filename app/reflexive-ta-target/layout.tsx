import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./reflexive-ta.css";

const reading = localFont({
  src: [
    { path: "../surface/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../surface/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--rta-reading",
  display: "swap",
});
const labels = localFont({ src: "../surface/_fonts/InstrumentSans.ttf", weight: "400 700", variable: "--rta-labels", display: "swap" });
const hand = localFont({ src: "../surface/_fonts/Caveat.ttf", weight: "400 700", variable: "--rta-hand", display: "swap" });

export const metadata: Metadata = {
  title: "Reflexive Thematic Analysis · patterns made through interpretation",
  description: "An isolated Academic Concept Lab method prototype for reflexive thematic analysis.",
  robots: { index: false, follow: false },
};

function Mark() {
  return <span className="rta-brand-mark" aria-hidden="true"><i /><i /></span>;
}

export default function ReflexiveTATargetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`rta-root ${reading.variable} ${labels.variable} ${hand.variable}`}>
      <a className="rta-skip" href="#rta-main">Skip to the method</a>
      <header className="rta-header">
        <div className="rta-header-inner">
          <Link className="rta-brand" href="/concept-lab" aria-label="Academic Concept Lab home"><Mark /><span>Academic Concept Lab</span></Link>
          <span className="rta-motto">ideas drawn out · methods kept visible</span>
          <nav aria-label="Main navigation">
            <Link href="/concept-lab">Home</Link>
            <Link href="/concept-lab/library">Library</Link>
            <Link href="/concept-lab/saved">Saved</Link>
            <Link href="/concept-lab/about">About</Link>
          </nav>
        </div>
      </header>
      <main id="rta-main">{children}</main>
      <footer className="rta-footer"><span>Academic Concept Lab</span><span>analysis leaves traces</span><span>isolated method prototype · production untouched</span></footer>
    </div>
  );
}
