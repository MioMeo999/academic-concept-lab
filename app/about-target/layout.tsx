import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { Sprite } from "@/app/concept-lab/_components/Sprite";
import "./about-target.css";

const reading = localFont({
  src: [
    { path: "../concept-lab/_fonts/Newsreader.ttf", style: "normal", weight: "200 800" },
    { path: "../concept-lab/_fonts/Newsreader-Italic.ttf", style: "italic", weight: "200 800" },
  ],
  variable: "--about-read",
  display: "swap",
});

const machinery = localFont({
  src: "../concept-lab/_fonts/InstrumentSans.ttf",
  weight: "400 700",
  variable: "--about-sans",
  display: "swap",
});

const script = localFont({
  src: "../concept-lab/_fonts/Caveat.ttf",
  weight: "400 700",
  variable: "--about-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "About preview",
  description: "How Academic Concept Lab makes academic knowledge visible and traceable.",
  robots: { index: false, follow: false },
};

const NAV = [
  ["/concept-lab", "Home"],
  ["/library-target", "Library"],
  ["/saved-target", "Saved"],
  ["/about-target", "About"],
] as const;

function TargetNav({ footer = false }: { footer?: boolean }) {
  return (
    <nav className={footer ? "about-footer-nav" : "about-site-nav"} aria-label={footer ? "Footer" : "Main"}>
      {NAV.map(([href, label]) => (
        <Link key={href} href={href} aria-current={href === "/about-target" ? "page" : undefined}>{label}</Link>
      ))}
    </nav>
  );
}

export default function AboutTargetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`about-target ${reading.variable} ${machinery.variable} ${script.variable}`}>
      <Sprite />
      <a className="about-skip" href="#about-main">Skip to About content</a>
      <header className="about-header">
        <div className="about-shell about-header-inner">
          <Link className="about-brand" href="/concept-lab" aria-label="Academic Concept Lab home">
            <span className="about-brand-mark" aria-hidden="true">✦</span>
            <span>Academic Concept Lab</span>
          </Link>
          <span className="about-motto">ideas drawn out · knowledge in context · research made visible</span>
          <TargetNav />
        </div>
      </header>
      <main id="about-main">{children}</main>
      <footer className="about-footer">
        <div className="about-shell about-footer-inner">
          <span>Academic Concept Lab</span>
          <TargetNav footer />
          <span>See the idea · follow the claim · return to the source.</span>
        </div>
      </footer>
    </div>
  );
}
