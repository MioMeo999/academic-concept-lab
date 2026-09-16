/** B2-only marks. Deterministic hatching carries no measurement or provenance code. */
export function Pigment({ tone = "cobalt", seed = 1, className = "", sweep = false }: { tone?: string; seed?: number; className?: string; sweep?: boolean }) {
  const jitter = (n: number) => { const x = Math.sin(n * 12.9898 + seed * 78.233) * 43758.5453; return x - Math.floor(x); };
  return <svg className={`b2-pigment b2-pigment-${tone} ${className}`} viewBox="0 0 600 180" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    {Array.from({ length: 126 }, (_, i) => {
      const x = 8 + i * 4.55 + jitter(i) * 9;
      const y = 14 + jitter(i + 310) * 24 + (sweep ? Math.sin(i / 24) * 23 : 0);
      const endY = 140 + jitter(i + 700) * 22;
      return <path key={i} d={`M${x.toFixed(1)},${y.toFixed(1)} Q${(x - 37 + jitter(i + 90) * 17).toFixed(1)},${(82 + jitter(i + 80) * 12).toFixed(1)} ${(x - 64 + jitter(i + 120) * 22).toFixed(1)},${endY.toFixed(1)}`} fill="none" stroke="currentColor" strokeWidth={(0.6 + jitter(i + 32) * 1.6).toFixed(1)} opacity={(0.2 + jitter(i + 46) * 0.48).toFixed(2)} strokeLinecap="round" strokeDasharray={i % 4 === 0 ? "9 3 20 2 4 2" : undefined} />;
    })}
    {Array.from({ length: 15 }, (_, i) => <path key={`cross-${i}`} d={`M${20 + i * 33},${28 + jitter(i + 6) * 60} l${80 + jitter(i + 8) * 180},${30 + jitter(i) * 20}`} stroke="currentColor" strokeWidth="0.65" opacity="0.22" fill="none" />)}
  </svg>;
}

export function Intervention({ children, tone = "cobalt", className = "" }: { children: React.ReactNode; tone?: string; className?: string }) {
  return <span className={`b2-intervention b2-tone-${tone} ${className}`}>{children}<svg viewBox="0 0 240 20" preserveAspectRatio="none" aria-hidden="true"><path d="M3 11 Q69 5 129 10 T236 4 M9 16 Q120 10 229 12" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg></span>;
}
