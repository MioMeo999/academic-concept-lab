import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./atlas.css";

/* Newsreader sets the scholarship: a contemporary text serif with a real
   italic and a weight axis wide enough to carry a display line at 300 and a
   caption at 600. Instrument Sans carries every label, control and apparatus
   note — the machinery of the publication, kept visibly separate from its
   voice. Caveat appears a handful of times per spread and never more. */
const reading = localFont({
  src: [
    { path: "./_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "./_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--at-newsreader",
  display: "swap",
});

const machinery = localFont({
  src: "./_fonts/InstrumentSans.ttf",
  weight: "400 700",
  variable: "--at-instrument",
  display: "swap",
});

const hand = localFont({
  src: "./_fonts/Caveat.ttf",
  weight: "400 700",
  variable: "--at-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Atlas — a visual direction for Academic Concept Lab",
    template: "%s · Concept Lab Atlas",
  },
  description:
    "An isolated visual exploration: typeset scholarship with drawn thinking over it. Not production, and not a published record.",
  robots: { index: false, follow: false },
};

export default function AtlasLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`at-root ${reading.variable} ${machinery.variable} ${hand.variable}`}>
      <a className="at-skip" href="#at-main">
        Skip to the reading
      </a>
      {children}
    </div>
  );
}
