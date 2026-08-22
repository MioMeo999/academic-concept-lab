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
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: `-${headerOffsetPx}px 0px -55% 0px`, threshold: [0, 0.1, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
