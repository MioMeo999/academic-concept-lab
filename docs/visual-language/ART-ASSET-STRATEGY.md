# Academic Concept Lab — Art Asset Strategy

This document defines when Academic Concept Lab should use generated or authored artwork instead of trying to recreate every expressive mark procedurally in frontend code.

The project’s visual ambition is too materially rich to be reduced to CSS decoration or a universal SVG drawing engine.

The default implementation model is therefore:

> **ART FIRST, CODE SECOND.**

More precisely:

> **Generated / authored artwork + editorial HTML/CSS + lightweight interactive SVG/Canvas where interaction genuinely requires it.**

## 1. Why this strategy exists

The visual language depends on qualities that coding models often simplify into technical geometry: coloured-pencil pressure, layered pigment, human drawing irregularity, erased residue, expressive figures, brains, bodies, books, landscapes, objects, conceptual scenes, dense but controlled visual composition, overlapping hand-worked marks, and artistic variation between sections.

These qualities are often better created as artwork than as thousands of procedurally generated SVG paths. Do not force frontend code to imitate illustration when illustration is the correct medium.

## 2. The three-layer model

### Editorial layer — HTML / CSS
Use for titles, body text, captions, section hierarchy, evidence, scope, limitations, provenance, references, navigation, layout and responsive behaviour. This layer carries scholarship.

### Art layer — generated or authored image assets
Use for complex coloured-pencil illustrations, expressive conceptual scenes, human figures, heads / brains / bodies, books / landscapes / environments, dense pigment compositions, non-interactive theory imagery and atmospheric but meaningful drawn structures. This layer carries material richness and visual identity.

### Interactive layer — SVG / Canvas / JavaScript
Use only when the visual must respond to the reader: comparison, hover/focus reveal, changing context, boundary movement, highlighting a relation, toggling interpretations, tracing provenance or interactive conceptual maps. This layer carries behaviour.

## 3. Hybrid is usually preferred

For many Concept Lab sections, the strongest implementation will be hybrid: a generated coloured-pencil artwork as the visual base, lightweight SVG overlays for interactive relationships, HTML labels for accessible text, and semantic controls/provenance in HTML.

## 4. When to use artwork instead of procedural drawing

Prefer a generated or authored art asset when the image contains human figures, brains, bodies, landscapes, books or other expressive scenes; when visual richness depends on layered pencil pressure or pigment accumulation; when the same effect would require hundreds or thousands of SVG paths; when procedural output looks clean, technical, schematic or repetitive; or when the visual is primarily explanatory rather than interactive.

## 5. When procedural drawing is appropriate

Use SVG / Canvas / CSS when the reader must manipulate the visual, exact comparison matters, geometry carries functional meaning, or accessibility benefits from structured relationships in the DOM. Procedural drawing should support the art direction, not replace it.

## 6. Asset-generation requirements

Generated artwork should follow the Academic Concept Lab visual language: clean white ground or transparent background where possible; contemporary editorial feeling; coloured pencil + graphite + dry pigment; visible pressure variation; layered and overlapping strokes; selective hatching and cross-hatching; ghost construction; erasure and rubbed traces where meaningful; imperfect contours; chromatic richness without children’s-illustration styling; no fake notebook paper; no scrapbook props by default; no glossy vector rendering; no 3D-render aesthetic; no generic stock-illustration look.

Artwork should feel like **research drawing**, not decoration.

## 7. Asset composition rule

Do not generate isolated decorative objects and scatter them around the page. Every asset should have a clear intellectual role. Before generating an asset, define what idea or relation it represents, what section it belongs to, what should remain typeset, what should remain interactive, what the artwork should make more visible, and what it must not imply.

## 8. Avoid baking too much text into images

Important academic content should stay in HTML. Avoid putting long paragraphs, citations, evidence tables or critical labels inside raster images. Use images mainly for conceptual visualisation, material drawing, expressive structure and supporting visual metaphor.

## 9. Responsive strategy

Artwork should survive responsive layout. Prefer transparent or clean-edge assets, breathing room around important content, clear focal regions, separable foreground/background where possible, alternative crops when necessary, and mobile-specific placement rather than simply shrinking desktop artwork.

## 10. Performance strategy

Optimise assets appropriately. Prefer WebP / AVIF where suitable, responsive image sizes, lazy-loading below the fold, sensible compression and preloading only key above-the-fold art. Do not replace one performance problem with another.

## 11. Repository asset structure

Recommended:

```text
public/
  visual-language/
    home/
    theories/
    disciplines/
    record-kinds/
    scholarship/
```

Keep art assets separate from implementation code.

## 12. AI agent rule

When designing a page, explicitly decide: what should be typeset, what should be artwork, what should be interactive, and what should remain quiet. Do not assume that all visual expression must be generated in code.

If a procedural implementation looks schematic, repetitive, technical or materially weak, switch to a hybrid art-asset approach.

## 13. Final rule

> **Do not procedurally recreate expressive artwork when an art asset can carry the visual language more convincingly.**

The goal is not to prove that the browser can simulate coloured pencil. The goal is to make Academic Concept Lab visually convincing.
