import Link from "next/link";

const readings = [
  { href: "material", title: "Material with meaning", note: "Four operations, each accountable to a real distinction.", mode: "The material inquiry" },
  { href: "tonal-hierarchy", title: "Tonal Hierarchy", note: "One physical note; a contextual role that changes.", mode: "Condition / relation" },
  { href: "itpra", title: "Huron’s ITPRA", note: "Parallel responses and a later reading that can return.", mode: "Simultaneity / revision" },
  { href: "ipa", title: "Interpretative Phenomenological Analysis", note: "One case, close reading, and the particular kept in view.", mode: "Idiographic practice" },
];
export default function B2Index() {
  return <main id="b2-main" className="b2-main b2-index"><header className="b2-index-title"><p className="b2-eyebrow">Academic Concept Lab · Phase B2</p><h1>Different knowledge.<br /><em>A shared responsibility.</em></h1><p>Four isolated prototypes explore material explanation and critical apparatus. Each follows its own intellectual structure. Their visual success remains a question for review.</p></header><ol className="b2-index-readings">{readings.map((reading, i) => <li key={reading.href}><span className="b2-index-number">0{i + 1}</span><div><span className="b2-eyebrow">{reading.mode}</span><h2><Link href={`/b2-lab/${reading.href}`}>{reading.title}<span aria-hidden="true">↗</span></Link></h2><p>{reading.note}</p></div></li>)}</ol></main>;
}
