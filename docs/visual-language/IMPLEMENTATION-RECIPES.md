# Academic Concept Lab — Implementation Recipes

This translates the visual language into practical web implementation guidance. Use the simplest implementation that preserves the visual idea.

## General approach

Prefer:
- semantic HTML for scholarship
- CSS for layout, spacing, type and restrained surface effects
- SVG for content-aware conceptual drawing
- Canvas only when dense/dynamic mark-making genuinely benefits from it
- generated raster assets for selected complex expressive illustrations that code cannot reproduce convincingly

Do not rebuild every artistic mark from thousands of paths simply because it is possible.

## Typography

Use an editorial serif for titles and major statements, a highly readable text face for body/evidence/references, and a handwritten face only for selective annotations and researcher voice.

Do not use handwriting for long academic prose.

## Pencil construction

A convincing pencil mark can be made from multiple related strokes rather than one clean SVG line. Use 2–6 similar strokes, low opacity, slight offsets, uneven width, local gaps and pressure variation.

## Pigment masses

Prefer multiple short strokes, scattered hatch groups, semi-transparent overlays, broken masks and layered passes rather than a flat coloured rectangle.

Useful techniques may include `mix-blend-mode: multiply`, SVG masks/clip paths and repeated path groups, but no single technique should become the whole visual language.

## Imperfect circles and contours

Use repeated offset arcs, Bézier distortion, incomplete paths, uneven opacity and irregular closure when a mark is intended to feel drawn.

## Erasure and ghosting

Use masked transparency, white scratch-back strokes, partial clipping, low-opacity guides, broken edges and residue.

## Annotation placement

Anchor annotations to the ideas they refer to. Prefer short notes, connector lines, underlines, brackets and local marks. Margin is a natural home, but not a prison.

## Colour

Treat colour as pigment rather than component theming. Avoid rules such as blue card = theory, green card = method unless a true legend is required.

Use local, theory-driven colour choices with accumulation, overlap, pressure and fading.

## Layout

Use precise editorial layout underneath: strong columns, controlled reading measure, deliberate white space, clear hierarchy, asymmetry where useful and responsive recomposition.

Avoid equal-height cards, generic three-column feature grids, repeated left-text/right-image layouts and excessive rounded containers.

## Illustration strategy

Three valid modes:

### Code-drawn
Best for simple conceptual diagrams, interactive relationships, changing states and controlled comparisons.

### Generated/raster
Best for complex expressive conceptual art, human figures, dense pencil scenes and motifs that are hard to reproduce convincingly in code.

### Hybrid
Often best for Concept Lab: generated coloured-pencil artwork + code-drawn relational overlays + typeset labels + HTML provenance/interaction.

The site does not need to prove that every artistic mark can be procedurally generated.

## Performance

Do not sacrifice the page for a drawing engine. If a technique creates thousands of paths, multi-megabyte markup, fragile responsive behaviour or poor scrolling, simplify it.

The goal is convincing materiality, not procedural purity.

## Accessibility

All meaningful visuals need non-visual equivalents. Do not rely on colour, hover, motion, audio or spatial position alone. Use captions, semantic headings, keyboard access, visible focus, reduced-motion support and text equivalents. Decorative marks should be `aria-hidden`.

## AI implementation rule

Before implementing, identify the intellectual problem, conceptual structure, evidence boundary, interaction intent and visual intensity of the section. Then choose the material treatment.

Do not start by selecting a component template.

# 16. Art asset decision

For any major visual section, explicitly decide whether it should be code-drawn, generated/authored artwork, or hybrid. Use `ART-ASSET-STRATEGY.md` as the authority for this decision. Do not default to procedural SVG simply because the implementation is happening in a coding environment.
