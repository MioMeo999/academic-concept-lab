import type { Metadata } from "next";
import "./second-pass.css";

export const metadata: Metadata = {
  title: "Academic Concept Lab · second visual pass",
  description: "A deeper isolated visual exploration with authored conceptual drawings and scholarly structure.",
  robots: { index: false, follow: false },
};

export default function SecondPassLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
