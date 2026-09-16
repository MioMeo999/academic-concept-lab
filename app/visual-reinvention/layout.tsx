import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MarkDefs } from "./_components/Marks";
import "./vr.css";

export const metadata: Metadata = {
  title: "Visual reinvention — Phase B2 prototypes",
  description:
    "Isolated visual prototypes for the Academic Concept Lab visual reinvention. Not production. Not a published record.",
  robots: { index: false, follow: false },
};

export default function VisualReinventionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="vr-root">
      <MarkDefs />
      {children}
    </div>
  );
}
