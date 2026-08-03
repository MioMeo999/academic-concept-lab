import type { Metadata } from "next";
import { PrototypePage } from "../../PrototypeLab";
export const metadata: Metadata = { title: "Tuned Out or Dialed In · Illustrated Learning Journal" };
export default function Page() { return <PrototypePage prototype="illustrated-journal" mode="study" />; }
