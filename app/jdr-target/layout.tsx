import type { ReactNode } from "react";
import localFont from "next/font/local";
import "../surface/surface.css";
import "./jdr-target.css";

const reading = localFont({
  src: [
    { path: "../surface/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../surface/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--sf-newsreader",
  display: "swap",
});

const machinery = localFont({
  src: "../surface/_fonts/InstrumentSans.ttf",
  weight: "400 700",
  variable: "--sf-instrument",
  display: "swap",
});

const hand = localFont({
  src: "../surface/_fonts/Caveat.ttf",
  weight: "400 700",
  variable: "--sf-caveat",
  display: "swap",
});

export default function JDRTargetLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`sf-root jdr-root ${reading.variable} ${machinery.variable} ${hand.variable}`}>
      <a className="sf-skip" href="#jdr-main">Skip to the reading</a>
      {children}
    </div>
  );
}
