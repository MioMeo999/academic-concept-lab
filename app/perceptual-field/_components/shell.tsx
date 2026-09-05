/* ---------------------------------------------------------------------------
   Page furniture. Server components — no interactivity, no state.

   Every rule, every card edge and every emphasis on this page is a drawn
   stroke rather than a CSS border, so the furniture lives here rather than in
   the stylesheet.
   ------------------------------------------------------------------------- */

import type { CSSProperties, ReactNode } from "react";
import { Hatch, INK, Rule, pigment } from "./marks";

/* ---------------------------------------------------------------- movement */

export function Movement({
  id,
  children,
  tone = "normal",
  style,
}: {
  id?: string;
  children: ReactNode;
  tone?: "normal" | "tight" | "air";
  style?: CSSProperties;
}) {
  return (
    <section
      id={id}
      className={`pf-movement${tone === "tight" ? " pf-movement--tight" : tone === "air" ? " pf-movement--air" : ""}`}
      style={style}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------- movement head */

export function Head({
  num,
  kicker,
  title,
  colour = INK.charcoal,
  seed = 70,
  width = 720,
}: {
  num: string;
  kicker?: string;
  title: ReactNode;
  colour?: string;
  seed?: number;
  width?: number;
}) {
  return (
    <header style={{ marginBottom: 30 }}>
      {/* A section rule carries the movement's pigment, so the colour arc of
          the page is legible from the rules alone. */}
      <Rule
        width={width}
        colour={colour}
        seed={seed}
        opacity={colour === INK.charcoal ? 0.32 : 0.72}
        weight={colour === INK.charcoal ? 1 : 1.5}
        style={{ width: "100%", height: 4, display: "block", marginBottom: 16 }}
      />
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
        <span className="pf-num" style={{ flex: "none" }}>{num}</span>
        {kicker ? (
          <span className="pf-meta" style={{ color: colour === INK.charcoal ? undefined : colour }}>
            {kicker}
          </span>
        ) : null}
      </div>
      <h2 className="pf-h2" style={{ marginTop: 12, maxWidth: "18ch" }}>{title}</h2>
    </header>
  );
}

/* -------------------------------------------------------------------- card */

export function Card({
  label,
  body,
  colour,
  seed = 80,
  size = "normal",
}: {
  label: string;
  body: string;
  colour: string;
  seed?: number;
  size?: "normal" | "large";
}) {
  const c = pigment(colour);
  return (
    <article style={{ position: "relative", paddingTop: 4 }}>
      <Hatch
        width={84}
        height={22}
        colour={c}
        seed={seed}
        angle={-38}
        gap={2.3}
        opacity={1}
        weight={1.15}
        style={{ display: "block", marginBottom: 14 }}
      />
      <p className="pf-meta" style={{ color: c, marginBottom: 9, letterSpacing: "0.16em" }}>
        {label}
      </p>
      <p
        className={size === "large" ? "pf-lede" : "pf-body"}
        style={{ color: "var(--body)" }}
      >
        {body}
      </p>
    </article>
  );
}

export function CardRow({
  children,
  min = 220,
  gap = "clamp(24px, 3vw, 52px)",
  style,
}: {
  children: ReactNode;
  min?: number;
  gap?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------- note */

/** The record's own editorial note on a section — always kept, never merged
    into the body text, because the qualification is part of the claim. */
export function Note({ children, warn = true, style }: { children: ReactNode; warn?: boolean; style?: CSSProperties }) {
  return (
    <p className={`pf-note${warn ? " pf-note--warn" : ""}`} style={{ maxWidth: 660, ...style }}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------- html */

export const html = (s: string) => ({ __html: s });
