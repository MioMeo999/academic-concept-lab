import type { CSSProperties, ReactNode } from "react";
import { ART_FRAGMENTS, type ArtFragmentName } from "./art-library";
import system from "./system.module.css";

export function SectionHeading({ id, number, eyebrow, title, children }: {
  id: string; number: string; eyebrow: string; title: ReactNode; children?: ReactNode;
}) {
  return <header className={system.sectionHeading}>
    <div>
      <p className={system.eyebrow}><span>{number}</span>{eyebrow}</p>
      <h2 className={system.heading} id={id}>{title}</h2>
    </div>
    {children && <div className={system.orientation}>{children}</div>}
  </header>;
}

/** A responsive CSS viewport into an authored source; no raster manipulation,
 * invented marks or essential labels in images. Source files remain intact. */
export function ArtFragment({ name, className = "", caption, decorative = false }: {
  name: ArtFragmentName; className?: string; caption?: string; decorative?: boolean;
}) {
  const asset = ART_FRAGMENTS[name];
  const [x, y, width, height] = asset.crop;
  const cropStyle = {
    aspectRatio: `${width} / ${height}`,
    "--crop-width": `${asset.width / width * 100}%`,
    "--crop-height": `${asset.height / height * 100}%`,
    "--crop-left": `${-x / width * 100}%`,
    "--crop-top": `${-y / height * 100}%`,
  } as CSSProperties;
  return <figure className={`${system.art} ${className}`} style={{ "--fragment-ratio": width / height } as CSSProperties} data-art-fragment={name} aria-hidden={decorative || undefined}>
    <div className={system.crop} style={cropStyle}>
      {/* CSS clips the original at a documented aspect ratio; the current runtime has no image optimiser. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset.src} width={asset.width} height={asset.height} alt={decorative ? "" : asset.alt} loading="lazy" decoding="async" />
    </div>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}
