import Image from "next/image";

export type MacrostructureReading = "map" | "beneath";

const macrostructureLabel =
  "Illustrated Affective Events Theory macrostructure: one workplace and one person move through a stable context, a work event, an affective reaction, situated behaviour, a quieter work attitude, and later judgement-driven behaviour. Dispositions shape reaction context and time gives the sequence its temporal frame. The illustration teaches the lived sequence; the relationship ledger states the organising relationships without implying effect sizes or deterministic causation.";

const relationships = [
  ["Work-environment features", "Work events"],
  ["Work-environment features", "Work attitudes"],
  ["Work events", "Affective reactions"],
  ["Affective reactions", "Work attitudes"],
  ["Affective reactions", "Affect-driven behaviour"],
  ["Work attitudes", "Judgment-driven behaviour"],
] as const;

export function AETRelationshipLedger() {
  return (
    <section className="aev-relationship-ledger" aria-labelledby="aev-ledger-title">
      <div className="aev-ledger-heading">
        <p className="aev-label" id="aev-ledger-title">relationship ledger · the structure held in words</p>
        <p>Read the drawing as experience; use the ledger to check the canonical architecture.</p>
      </div>
      <ul className="aev-ledger-list">
        {relationships.map(([from, to]) => (
          <li key={`${from}-${to}`}><span>{from}</span><i aria-hidden="true">→</i><b>{to}</b></li>
        ))}
      </ul>
      <ul className="aev-ledger-context" aria-label="Contextual relationships">
        <li><span>Dispositions</span><i aria-hidden="true">shape</i><b>affective reaction context</b></li>
        <li><span>Time / cycles</span><i aria-hidden="true">provide</i><b>temporal context</b></li>
      </ul>
    </section>
  );
}

function Mark({
  className,
  label,
  note,
}: {
  className: string;
  label: string;
  note: string;
}) {
  return <div className={`aev-spread-mark ${className}`}><b>{label}</b><span>{note}</span></div>;
}

export default function AETIllustratedMacrostructure({
  mode = "map",
  className = "",
}: {
  mode?: MacrostructureReading;
  className?: string;
}) {
  return (
    <div className={`aev-illustrated-spread mode-${mode} ${className}`.trim()} role="group" aria-label={macrostructureLabel}>
      <div className="aev-spread-time" aria-hidden="true">
        <span><b>08:15</b> the field holds</span>
        <span><b>10:43</b> an event lands</span>
        <span><b>11:02</b> reaction in the person</span>
        <span><b>later</b> evaluation and action</span>
      </div>
      <p className="aev-spread-context spread-time-note">time gives the drawing its order —<br />not an outcome of reaction</p>
      <div className="aev-spread-visual">
        <div className="aev-spread-art-desktop">
          <Image
            src="/aet-visual-rebuild-assets/aet-macrostructure-illustrated-workday-cinematography.png"
            alt="A single continuous coloured-pencil and graphite workplace drawing showing one person moving through a stable work context, an event, reaction, response, evaluation and later action."
            width={1672}
            height={941}
            unoptimized
            loading="eager"
          />
        </div>
        <div className="aev-spread-art-mobile" aria-hidden="true">
          <div><Image src="/aet-visual-rebuild-assets/aet-macrostructure-illustrated-workday-cinematography.png" alt="" width={1672} height={941} unoptimized loading="eager" /></div>
          <div><Image src="/aet-visual-rebuild-assets/aet-macrostructure-illustrated-workday-cinematography.png" alt="" width={1672} height={941} unoptimized loading="eager" /></div>
          <div><Image src="/aet-visual-rebuild-assets/aet-macrostructure-illustrated-workday-cinematography.png" alt="" width={1672} height={941} unoptimized loading="eager" /></div>
          <div><Image src="/aet-visual-rebuild-assets/aet-macrostructure-illustrated-workday-cinematography.png" alt="" width={1672} height={941} unoptimized loading="eager" /></div>
          <div><Image src="/aet-visual-rebuild-assets/aet-macrostructure-illustrated-workday-cinematography.png" alt="" width={1672} height={941} unoptimized loading="eager" /></div>
          <div><Image src="/aet-visual-rebuild-assets/aet-macrostructure-illustrated-workday-cinematography.png" alt="" width={1672} height={941} unoptimized loading="eager" /></div>
        </div>

        <Mark className="mark-environment" label="work-environment features" note="the enduring field" />
        <Mark className="mark-event" label="work event" note="a change within the field · 10:43" />
        <Mark className="mark-reaction" label="affective reaction" note="gesture · posture · what mattered here?" />
        <Mark className="mark-affect" label="affect-driven behaviour" note="nearer · quicker · situated" />
        <Mark className="mark-attitude" label="work attitude" note="a more settled evaluation" />
        <Mark className="mark-judgement" label="judgment-driven behaviour" note="deliberate action after reflection" />

        <aside className="aev-spread-context spread-dispositions">
          <span>goals · concerns · prior experience</span>
          <b>dispositions shape reaction context</b>
        </aside>
        <div className="aev-spread-annotation-layer" aria-live="polite">
          <span className="annotation-appraisal">appraisal?</span>
          <span className="annotation-attention">attention?</span>
          <span className="annotation-regulation">emotion regulation?</span>
          <span className="annotation-motivation">motivation?</span>
          <span className="annotation-event">event structure</span>
          <span className="annotation-context">contextual moderation</span>
        </div>
      </div>
      <p className="aev-spread-boundary">Later process work asks what happens between the relationships. Weiss &amp; Cropanzano (1996) give the organising map; later work elaborates the questions beneath it.</p>
      <p className="aev-spread-note">same working field · a moment turns · the person carries it forward</p>
    </div>
  );
}
