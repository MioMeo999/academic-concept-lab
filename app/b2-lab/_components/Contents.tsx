"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const routes = [
  ["/b2-lab/material", "Material"],
  ["/b2-lab/tonal-hierarchy", "Tonal Hierarchy"],
  ["/b2-lab/itpra", "ITPRA"],
  ["/b2-lab/ipa", "IPA"],
];
export function ExperimentNav() {
  const pathname = usePathname();
  return <nav className="b2-experiment-nav" aria-label="Experimental readings">{routes.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav>;
}
export function Contents({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  useEffect(() => {
    const update = () => {
      const nearest = items.reduce((last, item) => {
        const element = document.getElementById(item.id);
        return element && element.getBoundingClientRect().top <= 170 ? item.id : last;
      }, items[0]?.id ?? "");
      setActive(nearest);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items]);
  return <nav className="b2-contents" aria-label="Contents of this reading"><span>In this reading</span>{items.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>{item.title}</a>)}</nav>;
}
