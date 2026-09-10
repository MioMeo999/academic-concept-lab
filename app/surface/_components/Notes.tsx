/**
 * Surface — the annotation language, in the text flow.
 *
 * Everything here marks up running prose the way a reader marks up a page:
 * a highlighter swipe, a ring round a term, a wavering underline, a star in
 * the margin. The mark always sits *behind* the type — never over it — so the
 * words stay at full contrast and the page still reads with the drawing gone.
 *
 * The vocabulary is deliberately small and each mark means one thing, because
 * a page where anything can be marked any way marks nothing:
 *
 *   ring       a key term, the first time it matters
 *   highlight  a phrase worth carrying away
 *   underline  emphasis inside a sentence
 *   strike     a formulation the record explicitly rejects
 *   star       something significant enough to look up
 *   question   an open problem the record leaves open
 */

import type { ReactNode } from "react";
import { rng } from "../_lib/pigment";
import { burstPts, pencil, ringPts, runPts, squigglePts, toPath } from "../_lib/pencil";
import type { Hue } from "./Pigment";

const ink = (h: Hue) => `var(--pg-${h})`;

/* ------------------------------------------------------------- inline -- */

function Behind({ children, mark, variant }: { children: ReactNode; mark: ReactNode; variant?: string }) {
  return (
    <span className={variant ? `nt nt-${variant}` : "nt"}>
      <span className="nt-mark" aria-hidden="true">{mark}</span>
      <span className="nt-word">{children}</span>
    </span>
  );
}

/** A highlighter swipe. Overshoots the word at both ends, as a real one does. */
export function Hi({ children, c = "lemon", seed = 13 }: { children: ReactNode; c?: Hue; seed?: number }) {
  return (
    <Behind
      mark={
        <svg viewBox="0 0 100 34" preserveAspectRatio="none" focusable="false">
          <g style={{ mixBlendMode: "multiply", color: ink(c) }}>
            {[0, 1, 2].map((i) => (
              <path key={i} d={toPath(runPts(-2, 18 + (i - 1) * 7, 102, 18 + (i - 1) * 7, seed + i * 23, 2.4))}
                stroke="currentColor" strokeWidth={10} strokeOpacity={i === 1 ? 0.34 : 0.26}
                fill="none" strokeLinecap="round" />
            ))}
          </g>
        </svg>
      }
    >
      {children}
    </Behind>
  );
}

/** Two or three laps round a term. The commonest annotation there is. */
export function Ring({ children, c = "vermilion", seed = 31 }: { children: ReactNode; c?: Hue; seed?: number }) {
  return (
    <Behind
      variant="ring"
      mark={
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" focusable="false">
          <g style={{ mixBlendMode: "multiply", color: ink(c) }}>
            {ringPts(46, 15, seed, 2, 0.11).flatMap((run, k) =>
              pencil(run, { seed: seed + k * 31, passes: 2, broken: 0.22, weight: 2.2, opacity: 0.74 })
                .map((q, j) => (
                  <path key={`${k}-${j}`} d={q.d} transform="translate(50 20)" stroke="currentColor"
                    strokeWidth={q.w} strokeOpacity={q.o} fill="none" strokeLinecap="round"
                    strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                )))}
          </g>
        </svg>
      }
    >
      {children}
    </Behind>
  );
}

/** A wavering underline. Emphasis inside a sentence. */
export function Ul({ children, c = "cobalt", seed = 17 }: { children: ReactNode; c?: Hue; seed?: number }) {
  return (
    <Behind
      mark={
        <svg viewBox="0 0 100 34" preserveAspectRatio="none" focusable="false">
          <g style={{ mixBlendMode: "multiply", color: ink(c) }}>
            {pencil(squigglePts(96, seed, 7, 1.5), { seed, passes: 2, broken: 0.2, weight: 2, opacity: 0.78 })
              .map((q, j) => (
                <path key={j} d={q.d} transform="translate(2 28)" stroke="currentColor"
                  strokeWidth={q.w} strokeOpacity={q.o} fill="none" strokeLinecap="round"
                  vectorEffect="non-scaling-stroke" />
              ))}
          </g>
        </svg>
      }
    >
      {children}
    </Behind>
  );
}

/** A formulation the record rejects. Used only on the "do not conclude" list. */
export function Strike({ children, c = "vermilion", seed = 23 }: { children: ReactNode; c?: Hue; seed?: number }) {
  const r = rng(seed);
  return (
    <Behind
      mark={
        <svg viewBox="0 0 100 34" preserveAspectRatio="none" focusable="false">
          <g style={{ mixBlendMode: "multiply", color: ink(c) }}>
            {[0, 1].map((i) => (
              <path key={i} d={toPath(runPts(1 + r() * 3, 17 + i * 1.6, 99 - r() * 3, 16.4 + i * 1.6, seed + i * 19, 1.1))}
                stroke="currentColor" strokeWidth={2} strokeOpacity={i ? 0.4 : 0.74} fill="none"
                strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        </svg>
      }
    >
      {children}
    </Behind>
  );
}

/** A star in the margin. Significant enough to look up. */
export function Star({ c = "vermilion", seed = 41, size = 15 }: { c?: Hue; seed?: number; size?: number }) {
  return (
    <span className="nt-star" aria-hidden="true">
      <svg viewBox="-20 -20 40 40" width={size} height={size} focusable="false">
        <g style={{ mixBlendMode: "multiply", color: ink(c) }}>
          {burstPts(16, seed, 8).flatMap((run, k) =>
            pencil(run, { seed: seed + k * 13, passes: 1, broken: 0, weight: 2, opacity: 0.85 })
              .map((q, j) => (
                <path key={`${k}-${j}`} d={q.d} stroke="currentColor" strokeWidth={q.w}
                  strokeOpacity={q.o} fill="none" strokeLinecap="round" />
              )))}
        </g>
      </svg>
    </span>
  );
}

/** An open problem the record leaves open. */
export function Query({ c = "violet", size = 17 }: { c?: Hue; size?: number }) {
  return (
    <span className="nt-star" aria-hidden="true">
      <svg viewBox="0 0 24 30" width={(size * 24) / 30} height={size} focusable="false">
        <g style={{ mixBlendMode: "multiply", color: ink(c) }} fill="none" stroke="currentColor"
          strokeWidth={2.4} strokeLinecap="round" strokeOpacity={0.85}>
          <path d="M5.5 8.5C5 4 9 2 12.2 2.4c3.4.4 5.6 2.6 5.3 5.6-.3 3.2-4.4 4.1-5.2 6.6-.3.9-.3 1.7-.2 2.5" />
          <path d="M11.6 23.6c.1 0 .2 0 .3.1" />
        </g>
      </svg>
    </span>
  );
}

/* -------------------------------------------------------------- blocks -- */

/**
 * Key terms as ringed pills — the row the reference sheets put at the foot of
 * a spread. Each term gets its own pigment; the colours distinguish terms from
 * one another and encode nothing else.
 */
export function TermRow({ terms }: { terms: { label: string; hue: Hue }[] }) {
  return (
    <ul className="nt-terms">
      {terms.map((t, i) => (
        <li key={t.label}>
          <span className="nt-pill">
            <span className="nt-pill-mark" aria-hidden="true">
              <svg viewBox="0 0 120 44" preserveAspectRatio="none" focusable="false">
                <g style={{ mixBlendMode: "multiply", color: ink(t.hue) }}>
                  {ringPts(56, 17, 200 + i * 37, 2, 0.1).flatMap((run, k) =>
                    pencil(run, { seed: 200 + i * 37 + k * 29, passes: 2, broken: 0.2, weight: 2, opacity: 0.78 })
                      .map((q, j) => (
                        <path key={`${k}-${j}`} d={q.d} transform="translate(60 22)" stroke="currentColor"
                          strokeWidth={q.w} strokeOpacity={q.o} fill="none" strokeLinecap="round"
                          strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                      )))}
                </g>
              </svg>
            </span>
            <span className="nt-pill-word">{t.label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A numbered sequence with a big coloured numeral, the way a set of steps gets
 * written out by hand. Only used where the content really is ordered.
 */
export function Steps({ items }: { items: { head: string; body: ReactNode; hue: Hue }[] }) {
  return (
    <ol className="nt-steps">
      {items.map((s, i) => (
        <li key={s.head}>
          <span className="nt-num" style={{ color: ink(s.hue) }} aria-hidden="true">{i + 1}</span>
          <div>
            <h4><Ul c={s.hue} seed={60 + i * 11}>{s.head}</Ul></h4>
            <p>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * The legend for the annotation language. Shown once, on the conventions page,
 * so a reader can learn the marks rather than guess at them.
 */
export function AnnotationKey() {
  const rows: { mark: ReactNode; name: string; means: string }[] = [
    { mark: <Ring c="vermilion" seed={11}>term</Ring>, name: "Ring", means: "a key term, the first time it matters" },
    { mark: <Hi c="lemon" seed={13}>phrase</Hi>, name: "Highlight", means: "a phrase worth carrying away" },
    { mark: <Ul c="cobalt" seed={17}>emphasis</Ul>, name: "Underline", means: "emphasis inside a sentence" },
    { mark: <Strike c="vermilion" seed={19}>rejected</Strike>, name: "Strike", means: "a formulation the record rejects" },
    { mark: <span><Star c="ochre" seed={23} /></span>, name: "Star", means: "significant enough to look up" },
    { mark: <span><Query c="violet" /></span>, name: "Question", means: "an open problem, left open" },
  ];
  return (
    <ul className="nt-key">
      {rows.map((r) => (
        <li key={r.name}>
          <span className="nt-key-mark">{r.mark}</span>
          <span className="nt-key-name">{r.name}</span>
          <span className="nt-key-means">{r.means}</span>
        </li>
      ))}
    </ul>
  );
}
