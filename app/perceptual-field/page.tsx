/* Entry point for the exploration. Deliberately small: the work is the
   record page, not this index. */

import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Grain, Hatch, INK, Rule } from "./_components/marks";

export const metadata: Metadata = {
  title: "Perceptual Field · Academic Concept Lab",
  description: "An isolated visual exploration: theory content and visual language conceived together.",
};

export default function Page() {
  return (
    <div className="pf-root">
      <Grain />
      <div className="pf-canvas">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, paddingTop: 26, flexWrap: "wrap" }}>
          <span className="pf-meta" style={{ color: INK.charcoal, letterSpacing: "0.2em" }}>Academic Concept Lab</span>
          <span className="pf-meta">Perceptual Field · isolated exploration</span>
        </div>
        <Rule width={1200} seed={11} opacity={0.3} style={{ width: "100%", height: 4, display: "block", marginTop: 12 }} />

        <section style={{ paddingTop: "clamp(60px, 12vh, 130px)", paddingBottom: "clamp(60px, 12vh, 130px)" }}>
          <p className="pf-meta" style={{ marginBottom: 26 }}>a greenfield visual experiment</p>
          <h1 className="pf-title" style={{ fontSize: "clamp(48px, 8.5vw, 122px)", maxWidth: "11ch" }}>
            Perceptual <em>Field</em>
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(28px, 4vw, 64px)", marginTop: "clamp(40px, 6vh, 76px)", maxWidth: 980 }}>
            <p className="pf-lede" style={{ maxWidth: "36ch" }}>
              One record, designed from a blank sheet — as though the Lab had never been visually
              designed before. The theory suggests the composition; the composition is not applied
              to the theory afterwards.
            </p>
            <p className="pf-body" style={{ maxWidth: "40ch" }}>
              Nothing here touches production, the canonical record templates, or any earlier
              exploration. The academic content is the live record, unaltered: every claim, finding,
              qualification and source is the record&rsquo;s own.
            </p>
          </div>

          <div style={{ marginTop: "clamp(54px, 9vh, 110px)" }}>
            <Rule width={900} colour={INK.charcoal} seed={22} opacity={0.4} weight={1.3}
              style={{ width: "100%", maxWidth: 900, height: 4, display: "block", marginBottom: 30 }} />
            <p className="pf-meta" style={{ marginBottom: 18 }}>first record</p>
            <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
              <Link
                href="/perceptual-field/gestalt-principles-in-music"
                className="pf-h2"
                style={{ textDecoration: "none", color: INK.charcoal, fontSize: "clamp(28px, 3.6vw, 50px)" }}
              >
                Gestalt Principles in Music
              </Link>
              <Arrow x1={4} y1={22} x2={52} y2={20} bow={-9} colour={INK.vermilion} seed={33} width={62} height={40} weight={1.5} />
            </div>
            <p className="pf-body" style={{ marginTop: 20, maxWidth: "50ch" }}>
              How musical events become groups, boundaries and larger wholes — through cues that
              cooperate, compete, and sometimes settle nothing at all.
            </p>
            <Hatch width={210} height={16} colour={INK.teal} seed={41} angle={-38} gap={2.8} opacity={0.8}
              style={{ display: "block", marginTop: 30 }} />
          </div>
        </section>
      </div>
    </div>
  );
}
