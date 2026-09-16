import Link from "next/link";
import type { ReactNode } from "react";

const NAV = [
  { href: "/visual-reinvention", short: "Index" },
  { href: "/visual-reinvention/grammar", short: "1 · Grammar" },
  { href: "/visual-reinvention/itpra", short: "2 · ITPRA" },
  { href: "/visual-reinvention/tonal-hierarchy", short: "3 · Tonal" },
  { href: "/visual-reinvention/quiet", short: "4 · Quiet" },
  { href: "/visual-reinvention/rhythm", short: "5 · Rhythm" },
];

export function Topbar({ here }: { here: string }) {
  return (
    <nav className="vr-topbar" aria-label="Prototypes">
      <span className="vr-topbar__crumb">Phase B2 prototype · not production</span>
      <span className="vr-topbar__spacer" />
      {NAV.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          className="vr-topbar__crumb"
          aria-current={n.href === here ? "page" : undefined}
          style={n.href === here ? { color: "var(--vr-ink)", fontWeight: 600 } : undefined}
        >
          {n.short}
        </Link>
      ))}
    </nav>
  );
}

export function Masthead({
  kicker,
  title,
  lede,
  testing,
}: {
  kicker: string;
  title: ReactNode;
  lede: ReactNode;
  testing?: ReactNode;
}) {
  return (
    <header className="vr-masthead">
      <span className="vr-label vr-masthead__kicker">{kicker}</span>
      <h1 className="vr-display">{title}</h1>
      <p className="vr-lede">{lede}</p>
      {testing ? (
        <div className="vr-declare">
          <strong>What this prototype is testing. </strong>
          {testing}
        </div>
      ) : null}
    </header>
  );
}

export function Section({
  id,
  label,
  children,
}: {
  id?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="vr-section" id={id}>
      <div className="vr-section__head">
        <span className="vr-label">{label}</span>
      </div>
      {children}
    </section>
  );
}

/** Constructed-example declaration. Every teaching construction on these pages
 *  states its manipulated variable, its held constants and its boundary. */
export function Constructed({
  manipulated,
  held,
  boundary,
}: {
  manipulated: string;
  held: string;
  boundary: string;
}) {
  return (
    <div className="vr-declare vr-declare--constructed">
      <strong>▲ Constructed teaching example. </strong>
      <span>
        <b>Changed:</b> {manipulated} <b>Held constant:</b> {held} <b>Cannot establish:</b> {boundary}
      </span>
    </div>
  );
}
