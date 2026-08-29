"use client";

import { useEffect, useState } from "react";
import { accent, type Accent } from "./wm";

export type IndexEntry = { num: string; label: string; id: string; accent: Accent };

/* The learning structure is never hidden to make the page look quieter: the
   desktop index is a thin editorial list, and the phone gets the same list
   behind a summary that always shows where you are. */
export function WmIndex({ entries }: { entries: IndexEntry[] }) {
  const [activeId, setActiveId] = useState(entries[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    /* Measured, not assumed: the header wraps to two rows on a phone. */
    const headerHeight = () => document.querySelector(".wm-top")?.getBoundingClientRect().height ?? 80;

    const update = () => {
      /* must sit below where an anchor click lands, or the section you just
         jumped to is not yet marked current */
      const marker = headerHeight() + 60;
      const current = sections.reduce(
        (latest, section) => (section.getBoundingClientRect().top <= marker ? section : latest),
        sections[0],
      );
      setActiveId(current.id);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; update(); });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [entries]);

  const activeIndex = Math.max(0, entries.findIndex((entry) => entry.id === activeId));
  const active = entries[activeIndex] ?? entries[0];
  const total = String(entries.length).padStart(2, "0");

  const link = (entry: IndexEntry) => (
    <a
      href={`#${entry.id}`}
      style={accent(entry.accent)}
      aria-current={entry.id === activeId ? "location" : undefined}
      onClick={() => setOpen(false)}
    >
      <span className="n">{entry.num}</span>
      <span>{entry.label}</span>
    </a>
  );

  return (
    <>
      <details className="wm-index-m" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
        <summary>
          <span className="wm-label">Contents</span>
          <span className="wm-now">{active ? `${active.num} / ${total} · ${active.label}` : `01 / ${total}`}</span>
        </summary>
        <ol>{entries.map((entry) => <li key={entry.id}>{link(entry)}</li>)}</ol>
      </details>

      <nav className="wm-index" aria-label="Contents">
        <span className="wm-label">Contents · {total}</span>
        <ol>{entries.map((entry) => <li key={entry.id}>{link(entry)}</li>)}</ol>
      </nav>
    </>
  );
}
