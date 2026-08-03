import type { Metadata } from "next";
import { PrototypePage } from "../../PrototypeLab";
export const metadata: Metadata = { title: "Person–Environment Fit · Illustrated Learning Journal" };
export default function Page() { return <PrototypePage prototype="illustrated-journal" mode="theory" />; }
