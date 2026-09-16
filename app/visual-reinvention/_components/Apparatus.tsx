"use client";

/**
 * The apparatus: interventions that attach to specific claims and stay
 * attributable.
 *
 * Attachment is carried three ways, so it survives without the drawing:
 *   1. the anchored phrase is marked in the text;
 *   2. the note quotes the phrase it attaches to;
 *   3. on wide screens a drawn leader connects the two.
 *
 * The drawn leader is decoration-free but it is also not load-bearing: it is
 * aria-hidden, and the quoted phrase carries the same attachment in text and
 * at narrow widths. Filtering by voice is the digital-native operation — it is
 * how a reader asks "which of these statements is Concept Lab's own?".
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { GLYPHS, GLYPH_MEANING, type GlyphKey } from "./Marks";
import { leader } from "../_lib/marks";

export type Note = {
  id: string;
  kind: GlyphKey;
  /** The phrase in the column this intervention attaches to. */
  anchor: string;
  body: ReactNode;
  voice: string;
};

type Ctx = {
  active: string | null;
  setActive: (id: string | null) => void;
  visible: Set<GlyphKey>;
  scope: string;
};

const ApparatusCtx = createContext<Ctx | null>(null);

const ORDER: GlyphKey[] = ["source", "finding", "constructed", "synthesis", "unresolved"];

/** A phrase in the running text that an intervention attaches to. */
export function Anchor({ id, children }: { id: string; children: ReactNode }) {
  const ctx = useContext(ApparatusCtx);
  const active = ctx?.active === id;
  return (
    <button
      type="button"
      className={`vr-anchor${active ? " vr-anchor--active" : ""}`}
      data-vr-anchor={ctx ? `${ctx.scope}:${id}` : undefined}
      aria-describedby={ctx ? `${ctx.scope}-note-${id}` : undefined}
      aria-pressed={active}
      onClick={() => ctx?.setActive(active ? null : id)}
      // Inline, so an anchored phrase breaks across lines like the prose it is
      // part of. Set here rather than in the stylesheet because the UA button
      // default was winning in this build.
      style={{ display: "inline" }}
    >
      {children}
    </button>
  );
}

export function ApparatusSpread({
  notes,
  children,
  filterLabel = "Show interventions by voice",
}: {
  notes: Note[];
  children: ReactNode;
  filterLabel?: string;
}) {
  const scope = useId().replace(/:/g, "");
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState<Set<GlyphKey>>(() => new Set(ORDER));
  const [paths, setPaths] = useState<{ id: string; d: string }[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [layout, setLayout] = useState<{ tops: { id: string; top: number }[]; height: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const colRef = useRef<HTMLDivElement | null>(null);
  const sigRef = useRef<string>("");

  const kinds = useMemo(() => ORDER.filter((k) => notes.some((n) => n.kind === k)), [notes]);
  const shown = useMemo(() => notes.filter((n) => visible.has(n.kind)), [notes, visible]);

  /**
   * One pass that does both jobs: park every note beside the claim it attaches
   * to, then draw the leader between them. Notes stacked in an undifferentiated
   * sidebar are a sidebar; notes level with their anchors are an apparatus.
   */
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const col = colRef.current;
    if (!wrap || !col) return;
    const wide = window.matchMedia("(min-width: 62.0625rem)").matches;
    const rect = wrap.getBoundingClientRect();
    if (!wide) {
      setBox({ w: 0, h: 0 });
      setPaths([]);
      setLayout(null);
      return;
    }

    const colRect = col.getBoundingClientRect();
    const colLeft = colRect.left - rect.left;
    // Note tops are set inside the notes container, whose own origin sits
    // below the filter control — anchor positions are measured against the
    // wrapper, so the offset has to come back out.
    const colTop = colRect.top - rect.top;
    const placed: { id: string; top: number }[] = [];
    const measured: { id: string; anchorTop: number; anchorRight: number; anchorMid: number; h: number }[] = [];

    const orphans: { id: string; h: number }[] = [];
    shown.forEach((n) => {
      const a = wrap.querySelector<HTMLElement>(`[data-vr-anchor="${scope}:${n.id}"]`);
      const b = wrap.querySelector<HTMLElement>(`[data-vr-note-hook="${scope}:${n.id}"]`);
      if (!b) return;
      if (!a) {
        // An intervention with nothing to attach to still has to be placed, or
        // it overlaps the ones that do. It gets no leader: attachment it does
        // not have must not be drawn.
        orphans.push({ id: n.id, h: b.offsetHeight });
        return;
      }
      const ar = a.getBoundingClientRect();
      measured.push({
        id: n.id,
        anchorTop: ar.top - rect.top,
        anchorRight: ar.right - rect.left,
        anchorMid: ar.top - rect.top + ar.height * 0.82,
        h: b.offsetHeight,
      });
    });

    measured.sort((p, q) => p.anchorTop - q.anchorTop);
    let cursor = 0;
    for (const m of measured) {
      const top = Math.max(cursor, m.anchorTop - colTop - 3);
      placed.push({ id: m.id, top });
      cursor = top + m.h + 20;
    }
    for (const o of orphans) {
      placed.push({ id: o.id, top: cursor });
      cursor += o.h + 20;
    }

    /**
     * An apparatus taller than the prose it annotates stretches the grid row
     * and opens a void under the text. Close the gaps first; if the notes
     * still cannot fit, that is an editorial fact — this passage carries more
     * intervention than its prose can support — and it is left visible rather
     * than hidden.
     */
    const colEl = wrap.querySelector<HTMLElement>(".vr-column");
    const avail = (colEl?.offsetHeight ?? 0) - colTop + (colEl?.offsetTop ?? 0);
    const heights = [...measured.map((m) => m.h), ...orphans.map((o) => o.h)];
    const totalH = heights.reduce((a, b) => a + b, 0);
    if (avail > 0 && cursor > avail && heights.length > 1) {
      const gap = (avail - totalH) / (heights.length - 1);
      if (gap >= 8) {
        let y = 0;
        for (let i = 0; i < placed.length; i += 1) {
          placed[i].top = Math.round(y);
          y += heights[i] + gap;
        }
        cursor = Math.round(y - gap);
      }
    }

    const nextPaths = measured.map((m, i) => {
      const top = placed.find((p) => p.id === m.id)?.top ?? 0;
      return {
        id: m.id,
        d: leader(m.anchorRight + 3, m.anchorMid, colLeft - 6, colTop + top + 9, i + 7),
      };
    });

    // The layout changes the wrapper's height, which the ResizeObserver sees.
    // Without this guard the two would chase each other.
    const sig = JSON.stringify([Math.round(rect.width), placed, nextPaths]);
    if (sig === sigRef.current) return;
    sigRef.current = sig;

    setBox({ w: rect.width, h: rect.height });
    setLayout({ tops: placed, height: cursor });
    setPaths(nextPaths);
  }, [scope, shown]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 250); // after webfont settle
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [measure]);

  const toggle = (k: GlyphKey) =>
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next.size === 0 ? new Set(ORDER) : next;
    });

  return (
    <ApparatusCtx.Provider value={{ active, setActive, visible, scope }}>
      <div ref={wrapRef} style={{ position: "relative" }}>
        {box.w > 0 ? (
          <svg
            aria-hidden="true"
            focusable="false"
            width={box.w}
            height={box.h}
            viewBox={`0 0 ${box.w} ${box.h}`}
            style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}
          >
            <g filter="url(#vr-tooth-fine)">
              {paths.map((p) => (
                <path
                  key={p.id}
                  d={p.d}
                  fill="none"
                  stroke={active === p.id ? "var(--vr-cobalt)" : "var(--vr-hair-strong)"}
                  strokeWidth={active === p.id ? 1.5 : 0.9}
                  opacity={active && active !== p.id ? 0.28 : 0.95}
                />
              ))}
            </g>
          </svg>
        ) : null}

        <div className="vr-spread">
          {children}
          <aside className="vr-margin">
            <fieldset className="vr-controls">
              <legend className="vr-label vr-controls__legend">{filterLabel}</legend>
              <div className="vr-switch vr-switch--filter">
                {kinds.map((k) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={visible.has(k)}
                    onClick={() => toggle(k)}
                    title={GLYPH_MEANING[k]}
                  >
                    <span aria-hidden="true">{GLYPHS[k]}</span>{" "}
                    <span style={{ fontSize: "0.68rem" }}>{GLYPH_MEANING[k].split(/[:,]/)[0]}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div
              className="vr-apparatus"
              ref={colRef}
              style={layout ? { position: "relative", display: "block", height: layout.height } : undefined}
            >
              {notes.map((n) => {
                const top = layout?.tops.find((t) => t.id === n.id)?.top;
                return (
                <div
                  key={n.id}
                  className="vr-note"
                  id={`${scope}-note-${n.id}`}
                  hidden={!visible.has(n.kind)}
                  data-vr-note-hook={`${scope}:${n.id}`}
                  style={{
                    ...(layout && top !== undefined
                      ? ({ position: "absolute", top, left: 0, right: 0 } as const)
                      : {}),
                    ...(active && active !== n.id ? { opacity: 0.55 } : {}),
                  }}
                >
                  <span className={`vr-glyph vr-glyph--${n.kind}`} aria-hidden="true">
                    {GLYPHS[n.kind]}
                  </span>
                  <div className="vr-note__body">
                    <span className="vr-sr">{GLYPH_MEANING[n.kind]}. Attached to: </span>
                    <span className="vr-note__anchor">{n.anchor}</span>
                    {n.body}
                    <span className="vr-note__voice">{n.voice}</span>
                  </div>
                </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </ApparatusCtx.Provider>
  );
}
