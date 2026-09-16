import type { ReactNode } from "react";
import Link from "next/link";
import localFont from "next/font/local";

const reading = localFont({
  src: [
    { path: "../../concept-lab/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../../concept-lab/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--rta-reading",
  display: "swap",
});
const labels = localFont({ src: "../../concept-lab/_fonts/InstrumentSans.ttf", weight: "400 700", variable: "--rta-labels", display: "swap" });
const hand = localFont({ src: "../../concept-lab/_fonts/Caveat.ttf", weight: "400 700", variable: "--rta-hand", display: "swap" });

export const rtaFontClassName = `${reading.variable} ${labels.variable} ${hand.variable}`;

function Mark() {
  return <span className="rta-brand-mark" aria-hidden="true"><i /><i /></span>;
}

type RTAFrameProps = {
  children: ReactNode;
  variant: "target" | "canonical";
  mainMode?: "main" | "div";
};

export default function RTAFrame({ children, variant, mainMode = "main" }: RTAFrameProps) {
  const content = mainMode === "main"
    ? <main id="rta-main">{children}</main>
    : <div id="rta-main">{children}</div>;

  return (
    <div className={`rta-root ${rtaFontClassName} ${variant === "canonical" ? "rta-canonical-host" : ""}`}>
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
      {content}
      <footer className="rta-footer">
        <span>Academic Concept Lab</span>
        <span>analysis leaves traces</span>
        <span>{variant === "target" ? "isolated method prototype · production untouched" : "Reflexive Thematic Analysis · Academic Concept Lab method"}</span>
      </footer>
    </div>
  );
}
