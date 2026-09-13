import type { Metadata } from "next";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description: "How Academic Concept Lab makes academic knowledge visible and traceable.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <div className="about-target about-production">{children}</div>;
}
