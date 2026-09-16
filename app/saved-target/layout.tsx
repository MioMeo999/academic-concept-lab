import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { Sprite } from "@/app/concept-lab/_components/Sprite";
import "./saved-target.css";

const reading = localFont({
  src: [
    { path: "../concept-lab/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../concept-lab/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--saved-read",
  display: "swap",
});

const machinery = localFont({
  src: "../concept-lab/_fonts/InstrumentSans.ttf",
  weight: "400 700",
  variable: "--saved-sans",
  display: "swap",
});

const script = localFont({
  src: "../concept-lab/_fonts/Caveat.ttf",
  weight: "400 700",
  variable: "--saved-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saved preview",
  description: "A quiet working pile for ideas kept close in Academic Concept Lab.",
  robots: { index: false, follow: false },
};

const NAV = [
  ["/concept-lab", "Home"],
  ["/library-target", "Library"],
  ["/saved-target", "Saved"],
  ["/concept-lab/about", "About"],
] as const;

function TargetNav({ footer = false }: { footer?: boolean }) {
  return <nav className={footer ? "saved-footer-nav" : "saved-site-nav"} aria-label={footer ? "Footer" : "Main"}>{NAV.map(([href, label]) => <Link key={href} href={href} aria-current={href === "/saved-target" ? "page" : undefined}>{label}</Link>)}</nav>;
}

export default function SavedTargetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`saved-target ${reading.variable} ${machinery.variable} ${script.variable}`}>
      <Sprite />
      <a className="saved-skip" href="#saved-main">Skip to your working pile</a>
      <header className="saved-header">
        <div className="saved-shell saved-header-inner">
          <Link className="saved-brand" href="/concept-lab" aria-label="Academic Concept Lab home">
            <span className="saved-brand-mark" aria-hidden="true">✦</span>
            <span>Academic Concept Lab</span>
          </Link>
          <span className="saved-motto">ideas drawn out · knowledge in context · research made visible</span>
          <TargetNav />
        </div>
      </header>
      <main id="saved-main">{children}</main>
      <footer className="saved-footer">
        <div className="saved-shell saved-footer-inner">
          <span>Academic Concept Lab</span>
          <TargetNav footer />
          <span>Knowledge is a shared canvas.</span>
        </div>
      </footer>
    </div>
  );
}
