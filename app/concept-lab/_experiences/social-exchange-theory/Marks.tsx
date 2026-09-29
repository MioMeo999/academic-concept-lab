import * as hand from "../../_folio/hand";
import s from "./set.module.css";

/* Shared marks for the exchange diagrams: two rails (each actor's own line)
   and the strands that pass between them. Everything here is presentation —
   the words that give a mark its meaning are live HTML beside the figure. */

export type Tone = "give" | "answer" | "pos" | "neg" | "ghost" | "ink" | "group";

/** A pencil strand: the same line laid three times, slightly offset, as a hand does. */
export function Strand({ d, tone, weight = 1, dash, opacity = 1, className }: { d: string; tone: Tone; weight?: number; dash?: string; opacity?: number; className?: string }) {
  const passes: [number, number, number][] = [[0, 3.2, 1], [1.7, 1.9, 0.6], [-1.5, 1.4, 0.5]];
  return (
    <g className={[s.strand, className].filter(Boolean).join(" ")} data-tone={tone} style={{ opacity }}>
      {passes.map(([dy, w, o], i) => (
        <path key={i} d={d} transform={`translate(0 ${dy})`} strokeWidth={w * weight} opacity={o} strokeDasharray={dash} filter="url(#folio-pencil)" />
      ))}
    </g>
  );
}

/** An open arrowhead, in the tone of the strand it ends. */
export function Head({ x, y, angle, tone, seed = 1, size = 13, opacity = 1 }: { x: number; y: number; angle: number; tone: Tone; seed?: number; size?: number; opacity?: number }) {
  return <path className={s.head} data-tone={tone} d={hand.arrowHead(x, y, angle, { size, seed })} style={{ opacity }} filter="url(#folio-pencil)" />;
}

/** An actor's own line. */
export function Rail({ y, seed, x0 = 28, x1 = 872, d, className }: { y: number; seed: number; x0?: number; x1?: number; d?: string; className?: string }) {
  return <path className={[s.rail, className].filter(Boolean).join(" ")} d={d ?? hand.line(x0, y, x1, y, { seed, wander: 1.5, segments: 14 })} filter="url(#folio-graphite)" />;
}

/** An actor: a ring and a pressed dot on their line. Ghosted when not yet specified. */
export function Anchor({ x, y, letter, on = true, seed = 1 }: { x: number; y: number; letter?: string; on?: boolean; seed?: number }) {
  return (
    <g className={s.anchor} data-on={on || undefined}>
      <path d={hand.ring(x, y, 24, 22, { seed, wobble: 0.08, overlap: 0.16 })} filter="url(#folio-pencil)" />
      <circle cx={x} cy={y} r="4.6" />
      {letter && <text x={x} y={y - 34} textAnchor="middle" className={s.svgLetter}>{letter}</text>}
    </g>
  );
}

/** A small paper tag, laid along a strand — a token that passes, or a term that binds. */
export function Tag({ x, y, w = 48, h = 26, rot = 0, text, tone = "ink", on = true }: { x: number; y: number; w?: number; h?: number; rot?: number; text?: string; tone?: "ink" | "ochre"; on?: boolean }) {
  return (
    <g className={s.tag} data-tone={tone} data-on={on || undefined} transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect className={s.tagFill} x={-w / 2} y={-h / 2} width={w} height={h} />
      <path d={hand.line(-w / 2, -h / 2, w / 2, -h / 2, { seed: 3, wander: 0.7 }) + hand.line(w / 2, -h / 2, w / 2, h / 2, { seed: 4, wander: 0.7 }) + hand.line(w / 2, h / 2, -w / 2, h / 2, { seed: 5, wander: 0.7 }) + hand.line(-w / 2, h / 2, -w / 2, -h / 2, { seed: 6, wander: 0.7 })} filter="url(#folio-pencil)" />
      {text && <text x="0" y="5" textAnchor="middle" className={s.svgTag}>{text}</text>}
    </g>
  );
}
