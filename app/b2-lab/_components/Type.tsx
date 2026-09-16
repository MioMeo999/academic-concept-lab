import { Fragment, type ReactNode } from "react";

// Canonical rich text is rendered afresh. No production classes or UI are imported.
function decode(text: string) {
  return text.replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");
}
export function Rich({ text }: { text: string }) {
  const tokens = text.replace(/<\/?span\b[^>]*>/gi, "").split(/(<\/?(?:b|strong|i|em)>)/g);
  const stack: { tag: string; nodes: ReactNode[] }[] = [{ tag: "root", nodes: [] }];
  tokens.forEach((token, index) => {
    if (/^<(?:b|strong|i|em)>$/.test(token)) stack.push({ tag: token.slice(1, -1), nodes: [] });
    else if (/^<\/(?:b|strong|i|em)>$/.test(token) && stack.length > 1) {
      const entry = stack.pop()!;
      stack[stack.length - 1].nodes.push(entry.tag === "b" || entry.tag === "strong" ? <strong key={index}>{entry.nodes}</strong> : <em key={index}>{entry.nodes}</em>);
    } else stack[stack.length - 1].nodes.push(<Fragment key={index}>{decode(token.replace(/<[^>]*>/g, ""))}</Fragment>);
  });
  while (stack.length > 1) { const entry = stack.pop()!; stack[stack.length - 1].nodes.push(...entry.nodes); }
  return <>{stack[0].nodes}</>;
}
export function Note({ children, glyph = "✦", className = "" }: { children: ReactNode; glyph?: string; className?: string }) {
  return <p className={`b2-note ${className}`}><span className="b2-glyph" aria-hidden="true">{glyph}</span><span>{children}</span></p>;
}
export function SectionLead({ n, title, children }: { n: string; title: string; children?: ReactNode }) {
  return <div className="b2-section-lead"><span className="b2-section-number">{n}</span><h2>{title}</h2>{children ? <div className="b2-lede">{children}</div> : null}</div>;
}
export function OperationMeaning({ meaning, not, equivalent }: { meaning: string; not: string; equivalent: string }) {
  return <dl className="b2-meaning"><div><dt>What it means</dt><dd>{meaning}</dd></div><div><dt>What it does not mean</dt><dd>{not}</dd></div><div><dt>Text equivalent</dt><dd>{equivalent}</dd></div></dl>;
}
