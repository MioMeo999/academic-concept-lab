"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* ---------------------------------------------------------------------------
   The site's conceit is that everything is drawn, so the entrance animation is
   the drawing itself: outlines ink in along their own path, and highlighter
   wipes across rather than fading up. Nothing here is a generic fade-in.

   Two safeguards:

   - The "hidden" starting state lives under `.anim-ready`, which only this
     component adds. Without JavaScript nothing is ever hidden, so the page is
     complete either way.
   - Everything is inside a `prefers-reduced-motion: no-preference` query in
     the stylesheet, so a reader who has asked for stillness gets it.
   ------------------------------------------------------------------------- */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector(".acl");
    if (!root) return;

    const wants = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!wants) return;

    root.classList.add("anim-ready");

    const targets = Array.from(root.querySelectorAll("[data-draw], [data-reveal]"));
    if (!targets.length) return;

    const show = (el: Element) => el.classList.add("is-in");

    // Anything already on screen is revealed straight away, by geometry rather
    // than by observer. Two reasons: the hero should never flash hidden, and
    // IntersectionObserver does not fire while a document is hidden — a
    // background tab would otherwise sit there with an invisible masthead.
    const onScreen = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.92 && r.bottom > 0;
    };
    targets.forEach((t) => { if (onScreen(t)) show(t); });

    const rest = targets.filter((t) => !t.classList.contains("is-in"));
    if (!rest.length) return;

    // No observer available: show everything rather than hide it. Content must
    // never end up stranded because an enhancement failed.
    if (typeof IntersectionObserver === "undefined") {
      rest.forEach(show);
      return;
    }

    // A shallow observer: mark once on entry, then stop watching. Re-drawing
    // on every scroll past would be noise, not delight.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    rest.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
