"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  ["/concept-lab", "Home"],
  ["/concept-lab/library", "Library"],
  ["/concept-lab/saved", "Saved"],
  ["/concept-lab/about", "About"],
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/concept-lab") return pathname === href;
  if (href === "/concept-lab/library") {
    return pathname === href || /^\/concept-lab\/(?:theory|study|method|mechanism)(?:\/|$)/.test(pathname);
  }
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteNav({ footer = false }: { footer?: boolean }) {
  const pathname = usePathname() ?? "/concept-lab";
  const currentPath = pathname.replace(/\/+$/, "") || "/concept-lab";

  return (
    <nav className={footer ? undefined : "site"} aria-label={footer ? "Footer" : "Main"}>
      {NAV.map(([href, label]) => (
        <Link key={href} href={href} aria-current={isActive(currentPath, href) ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
