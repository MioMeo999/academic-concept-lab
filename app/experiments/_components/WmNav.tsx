"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS: [string, string][] = [
  ["/experiments", "Overview"],
  ["/experiments/home", "Home"],
  ["/experiments/library", "Library"],
  ["/experiments/gestalt-visual-study", "Gestalt record"],
];

export function WmNav() {
  const pathname = usePathname();
  return (
    <nav className="wm-nav" aria-label="Experiment">
      {ITEMS.map(([href, label]) => (
        <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
