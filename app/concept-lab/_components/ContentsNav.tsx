"use client";

import { useEffect, useState } from "react";

type Toc = [string, string, string][];

export function ContentsNav({ toc }: { toc: Toc }) {
  const [activeId, setActiveId] = useState(toc[0]?.[2] ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = toc
      .map(([, , id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const headerOffset = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-offset")
      .trim() || "5rem";
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const headerOffsetPx = headerOffset.endsWith("rem")
      ? parseFloat(headerOffset) * rootFontSize
      : parseFloat(headerOffset);
    const updateActive = () => {
      const marker = headerOffsetPx + 24;
      const current = sections.reduce(
        (latest, section) => section.getBoundingClientRect().top <= marker ? section : latest,
        sections[0],
      );
      setActiveId(current.id);
    };
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [toc]);

  const link = ([num, label, id]: [string, string, string]) => (
    <a
      href={`#${id}`}
      aria-current={activeId === id ? "location" : undefined}
      onClick={() => setMobileOpen(false)}
    >
      <span className="num">{num}</span>
      {label}
    </a>
  );

  return (
    <>
      <details
        className="contents-m"
        open={mobileOpen}
        onToggle={(event) => setMobileOpen(event.currentTarget.open)}
      >
        <summary>
          <span className="cat">Contents — {toc.length} sections</span>
        </summary>
        <ol>
          {toc.map((entry) => <li key={entry[2]}>{link(entry)}</li>)}
        </ol>
      </details>
      <aside className="contents" aria-label="Contents">
        <span className="cat">Contents</span>
        <ol>
          {toc.map((entry) => <li key={entry[2]}>{link(entry)}</li>)}
        </ol>
      </aside>
    </>
  );
}
