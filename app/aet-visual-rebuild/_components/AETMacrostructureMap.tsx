const macrostructureLabel = "Affective Events Theory macrostructure: work-environment features connect to work events and work attitudes; work events connect to affective reactions; affective reactions connect to work attitudes and affect-driven behaviour; work attitudes connect to judgement-driven behaviour; dispositions and time provide contextual conditions. The drawn connections are organising relationships, not effect sizes or proof of causation.";

export default function AETMacrostructureMap({ className = "" }: { className?: string }) {
  return <div className={`aev-macro-map ${className}`.trim()} role="img" aria-label={macrostructureLabel}>
    <svg viewBox="0 0 900 420" aria-hidden="true">
      <path d="M122 142C235 78 270 94 374 142" className="aev-map-trace aev-map-blue" />
      <path d="M122 142C260 34 520 38 686 142" className="aev-map-trace aev-map-ochre" />
      <path d="M374 142C424 157 446 196 492 198" className="aev-map-trace aev-map-red" />
      <path d="M492 198C570 166 613 166 686 142" className="aev-map-trace aev-map-red" />
      <path d="M492 198C575 249 617 270 700 292" className="aev-map-trace aev-map-red" />
      <path d="M686 142C758 164 800 238 824 334" className="aev-map-trace aev-map-teal" />
      <path d="M230 346C340 305 380 304 492 198" className="aev-map-trace aev-map-violet aev-map-context-line" />
      <path d="M76 356C250 324 500 338 852 356" className="aev-map-trace aev-map-sky aev-map-context-band" />
      <path d="M360 139l14 3-10 9" className="aev-map-arrow aev-map-blue" />
      <path d="M673 140l13 2-9 10" className="aev-map-arrow aev-map-ochre" />
      <path d="M480 197l13 1-9 10" className="aev-map-arrow aev-map-red" />
      <path d="M677 140l12 3-9 9" className="aev-map-arrow aev-map-red" />
      <path d="M691 286l10 7-12 6" className="aev-map-arrow aev-map-red" />
      <path d="M815 324l10 10-12 5" className="aev-map-arrow aev-map-teal" />
    </svg>
    <div className="aev-complete-map-nodes">
      <span className="map-node-features">work-environment<br />features</span>
      <span className="map-node-events">work<br />events</span>
      <span className="map-node-reactions">affective<br />reactions</span>
      <span className="map-node-attitudes">work<br />attitudes</span>
      <span className="map-node-affect-behaviour">affect-driven<br />behaviour</span>
      <span className="map-node-judgement">judgement-driven<br />behaviour</span>
      <span className="map-node-dispositions">dispositions<br /><small>reaction context</small></span>
      <span className="map-node-time">time / cycles<br /><small>temporal context</small></span>
    </div>
    <p className="aev-hand">relationships, not effect sizes</p>
  </div>;
}
