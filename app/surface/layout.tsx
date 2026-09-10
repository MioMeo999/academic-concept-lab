import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./surface.css";

/* Three voices, kept audibly separate.

   Newsreader carries the scholarship: a contemporary text serif with a real
   italic and a weight axis wide enough to run a display line at 330 and a
   caption at 620. Instrument Sans carries the machinery — labels, apparatus,
   registers, controls — so that the publication's own bookkeeping never
   disguises itself as the argument. Caveat is the hand, used a handful of
   times per page and never as a body face. */

const reading = localFont({
  src: [
    { path: "./_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "./_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--sf-newsreader",
  display: "swap",
});

const machinery = localFont({
  src: "./_fonts/InstrumentSans.ttf",
  weight: "400 700",
  variable: "--sf-instrument",
  display: "swap",
});

const hand = localFont({
  src: "./_fonts/Caveat.ttf",
  weight: "400 700",
  variable: "--sf-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Working Surface — a visual direction for Academic Concept Lab",
    template: "%s · The Working Surface",
  },
  description:
    "An isolated visual exploration: typeset scholarship with drawn thinking worked over it. Not production, and not a published record.",
  robots: { index: false, follow: false },
};

export default function SurfaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`sf-root ${reading.variable} ${machinery.variable} ${hand.variable}`}>
      <a className="sf-skip" href="#sf-main">Skip to the reading</a>
      {children}
    </div>
  );
}
