import type { Metadata } from "next";
import "./preview.css";

export const metadata: Metadata = {
  title: "Academic Concept Lab · visual preview set",
  description: "An isolated visual exploration of the Academic Concept Lab atlas and theory records.",
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
