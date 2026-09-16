import type { ReactNode } from "react";
import Link from "next/link";
import localFont from "next/font/local";

const reading = localFont({
  src: [
    { path: "../../surface/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../../surface/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--aev-reading",
  display: "swap",
});
const labels = localFont({ src: "../../surface/_fonts/InstrumentSans.ttf", weight: "400 700", variable: "--aev-labels", display: "swap" });
const hand = localFont({ src: "../../surface/_fonts/Caveat.ttf", weight: "400 700", variable: "--aev-hand", display: "swap" });

function Mark() {
  return <span className="aev-mark" aria-hidden="true"><i /><i /></span>;
}

type AETFrameProps = {
  children: ReactNode;
  variant: "target" | "canonical";
  mainMode?: "main" | "div";
};

export const aetFontClassName = `${reading.variable} ${labels.variable} ${hand.variable}`;

export default function AETFrame({ children, variant, mainMode = "main" }: AETFrameProps) {
  const content = mainMode === "main"
    ? <main id="aev-main">{children}</main>
    : <div id="aev-main">{children}</div>;

  return (
    <div className={`aev-root ${aetFontClassName} ${variant === "canonical" ? "aev-canonical-host" : ""}`}>
      <a className="aev-skip" href="#aev-main">Skip to the reading</a>
      <header className="aev-header"><div className="aev-header-inner">
        <Link className="aev-brand" href="/concept-lab" aria-label="Academic Concept Lab home"><Mark /><span>Academic Concept Lab</span></Link>
        <span className="aev-motto">ideas drawn out · events kept visible</span>
        <nav aria-label="Main navigation"><Link href="/concept-lab">Home</Link><Link href="/concept-lab/library">Library</Link><Link href="/concept-lab/saved">Saved</Link><Link href="/concept-lab/about">About</Link></nav>
      </div></header>
      {content}
      <footer className="aev-footer"><span>Academic Concept Lab</span><span>the day is made of events</span><span>{variant === "target" ? "isolated visual rebuild · production untouched" : "Affective Events Theory · Academic Concept Lab theory"}</span></footer>
    </div>
  );
}
