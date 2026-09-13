"use client";

import { usePathname } from "next/navigation";

export function AboutSkipLink() {
  const pathname = usePathname();
  if (pathname !== "/concept-lab/about") return null;
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("about-main");
    if (!target) return;
    event.preventDefault();
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "start" });
    window.history.replaceState(null, "", "#about-main");
  }
  return <a className="about-skip" href="#about-main" onClick={handleClick}>Skip to About content</a>;
}
