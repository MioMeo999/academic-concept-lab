import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { Sprite } from "@/app/concept-lab/_components/Sprite";
import { SiteNav } from "@/app/concept-lab/_components/SiteNav";
import "./library-target.css";

const reading = localFont({
  src: [
    { path: "../concept-lab/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../concept-lab/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--library-read",
  display: "swap",
});

const machinery = localFont({
  src: "../concept-lab/_fonts/InstrumentSans.ttf",
  weight: "400 700",
  variable: "--library-sans",
  display: "swap",
});

const script = localFont({
  src: "../concept-lab/_fonts/Caveat.ttf",
  weight: "400 700",
  variable: "--library-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Library preview",
  description: "The Academic Concept Lab working index prototype.",
  robots: { index: false, follow: false },
};

export default function LibraryTargetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`library-target ${reading.variable} ${machinery.variable} ${script.variable}`}>
      <Sprite />
      <a className="library-skip" href="#library-main">Skip to the working index</a>
      <header className="library-header">
        <div className="library-shell library-header-inner">
          <Link className="library-brand" href="/concept-lab" aria-label="Academic Concept Lab home">
            <span className="library-brand-mark" aria-hidden="true">✦</span>
            <span>Academic Concept Lab</span>
          </Link>
          <span className="library-motto">ideas drawn out · knowledge in context · research made visible</span>
          <SiteNav />
        </div>
      </header>
      <main id="library-main">{children}</main>
      <footer className="library-footer">
        <div className="library-shell library-footer-inner">
          <span>Academic Concept Lab</span>
          <span>think / connect / see theories / a more visible academic world</span>
          <span>Knowledge is a shared canvas.</span>
        </div>
      </footer>
    </div>
  );
}
