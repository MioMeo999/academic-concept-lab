/**
 * SVG filters that let code-drawn diagrams share the pencil's material:
 * `folio-pencil` roughens a stroke's edge and breaks it on the paper tooth;
 * `folio-graphite` is a softer version for construction lines. Rendered once
 * per folio. Filters change texture only — never position or meaning.
 */
export function PencilDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        <filter id="folio-pencil" x="-4%" y="-8%" width="108%" height="116%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="1.9" numOctaves="1" seed="11" result="tooth" />
          <feColorMatrix in="tooth" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.1 0 0 0 1.72" result="catch" />
          <feComposite in="rough" in2="catch" operator="in" />
        </filter>
        <filter id="folio-graphite" x="-4%" y="-8%" width="108%" height="116%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="7" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.2" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="1" seed="2" result="tooth" />
          <feColorMatrix in="tooth" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.6 0 0 0 1.85" result="catch" />
          <feComposite in="rough" in2="catch" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
