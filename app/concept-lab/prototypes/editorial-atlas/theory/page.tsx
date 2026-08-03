import type { Metadata } from "next";
import { PrototypePage } from "../../PrototypeLab";
export const metadata: Metadata = { title: "Person–Environment Fit · Living Editorial Atlas" };
export default function Page() { return <PrototypePage prototype="editorial-atlas" mode="theory" />; }
