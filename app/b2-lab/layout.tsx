import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { ExperimentNav } from "./_components/Contents";
import "./b2.css";

const reading = localFont({ src: [
  { path: "./_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
  { path: "./_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
], variable: "--b2-reading", display: "swap" });
const labels = localFont({ src: "./_fonts/InstrumentSans.ttf", variable: "--b2-labels", weight: "400 700", display: "swap" });
const intervention = localFont({ src: "./_fonts/Caveat.ttf", variable: "--b2-hand", weight: "400 700", display: "swap" });

export const metadata: Metadata = {
  title: "Visual inquiry · Phase B2",
  description: "Isolated studies in material explanation and scholarly accountability.",
  robots: { index: false, follow: false },
};

export default function B2Layout({ children }: { children: React.ReactNode }) {
  return <div className={`b2 ${reading.variable} ${labels.variable} ${intervention.variable}`}>
    <a className="b2-skip" href="#b2-main">Skip to the reading</a>
    <header className="b2-masthead">
      <Link className="b2-wordmark" href="/b2-lab">Academic<br />Concept Lab<span className="b2-wordmark-dot" aria-hidden="true">✳</span></Link>
      <div className="b2-edition"><span>Visual inquiry</span><span>B2 · experimental edition</span></div>
      <ExperimentNav />
    </header>
    {children}
    <footer className="b2-footer"><Link href="/b2-lab">Academic Concept Lab</Link><p>Ideas, with their sources still attached.</p><span>Isolated prototype · human review pending</span></footer>
  </div>;
}
