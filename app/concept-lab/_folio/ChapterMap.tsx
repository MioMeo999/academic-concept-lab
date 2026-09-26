"use client";

import { useEffect, useId, useRef, useState } from "react";
import s from "./folio.module.css";

export type Chapter = { id: string; num: string; label: string };

/**
 * The chapter map follows the reader down a long record. On wide screens it
 * is a quiet ribbon of chapter names; on narrow screens it folds into one
 * line saying where you are, and opens into the full list. The active chapter
 * is marked with aria-current and a drawn tick, never by colour alone.
 */
export function ChapterMap({ chapters, label }: { chapters: Chapter[]; label: string }) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const listId = useId();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = (navRef.current?.getBoundingClientRect().height ?? 48) + 40;
      const current = sections.reduce((latest, section) => (section.getBoundingClientRect().top <= marker ? section : latest), sections[0]);
      setActive(current.id);
      const top = navRef.current?.getBoundingClientRect().top ?? 1;
      setStuck(top <= 0.5);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [chapters]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const index = Math.max(0, chapters.findIndex((c) => c.id === active));
  const current = chapters[index];

  return (
    <nav ref={navRef} className={s.map} data-chapter-map data-stuck={stuck || undefined} aria-label="Chapters in this record">
      <div className={s.mapInner}>
        <span className={s.mapTitle} aria-hidden={!stuck}>{label}</span>
        <button
          type="button"
          className={s.mapToggle}
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={s.mapToggleNum}>{current?.num} / {String(chapters.length).padStart(2, "0")}</span>
          <span className={s.mapToggleLabel}>{current?.label}</span>
          <span className={s.mapToggleHint}>{open ? "close" : "chapters"}</span>
        </button>
        <ol id={listId} className={s.mapList} data-open={open || undefined}>
          {chapters.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-current={active === c.id ? "location" : undefined} onClick={() => setOpen(false)}>
                <span className={s.mapNum}>{c.num}</span>
                <span className={s.mapLabel}>{c.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
