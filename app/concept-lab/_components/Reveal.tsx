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

    const targets = Array.from(root.querySelectorAll("[data-draw], [data-reveal]"));
    if (!targets.length) return;

    const show = (el: Element) => el.classList.add("is-in");
    const showAll = () => targets.forEach(show);
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    // Anything already on screen is revealed straight away, by geometry rather
    // than by observer. Two reasons: the hero should never flash hidden, and
    // IntersectionObserver does not fire while a document is hidden — a
    // background tab would otherwise sit there with an invisible masthead.
    const onScreen = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.92 && r.bottom > 0;
    };
    const start = () => {
      observer?.disconnect();
      observer = null;
      root.classList.remove("anim-ready");

      // Reduced motion and background tabs should always receive the finished
      // page. This also handles a reader changing the OS setting mid-session.
      if (!media.matches || document.visibilityState === "hidden") {
        showAll();
        return;
      }

      root.classList.add("anim-ready");
      targets.forEach((target) => { if (onScreen(target)) show(target); });
      const rest = targets.filter((target) => !target.classList.contains("is-in"));
      if (!rest.length) return;

      // A shallow observer: mark once on entry, then stop watching. Re-drawing
      // on every scroll past would be noise, not delight.
      if (typeof IntersectionObserver === "undefined") {
        showAll();
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              show(entry.target);
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      rest.forEach((target) => observer?.observe(target));
    };

    const scheduleStart = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(start);
    };

    scheduleStart();
    media.addEventListener?.("change", scheduleStart);
    document.addEventListener("visibilitychange", scheduleStart);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      media.removeEventListener?.("change", scheduleStart);
      document.removeEventListener("visibilitychange", scheduleStart);
      root.classList.remove("anim-ready");
    };
  }, [pathname]);

  return null;
}
