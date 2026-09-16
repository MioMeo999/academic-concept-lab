# Academic Concept Lab — Reusable AI Design Brief

You are working on **Academic Concept Lab**, an interactive academic atlas for theories, evidence, mechanisms, methods and conceptual relationships.

The project should feel like:

> **A serious contemporary academic publication that has become a living research surface.**

> **A contemporary academic atlas, typeset by a designer, annotated by a researcher, and structured by the theory itself.**

Core relationship: **TYPESET KNOWLEDGE + DRAWN THINKING**.

For theory pages, read `INTERACTION-GRAMMAR.md` before designing. Academic
Concept Lab uses **Interactive Editorial Drawing**: live academic content,
theory-specific interaction, typography, spatial organisation and authored
drawing operate as one explanatory system. Keep claims, definitions,
qualifications, evidence, limitations, sources and provenance live in HTML;
use interaction to make a theory's relationships explorable; use artwork as
material, state layer, field, crop or trace rather than assuming it is a
finished UI surface.

The accepted Home Hero is the current visual benchmark. Preserve it. Use the
shared foundations and intensity levels in `DESIGN-SYSTEM.md` for subsequent
work: clarity before decoration, one dominant art gesture per section, and
mostly Quiet, Trace or Fragment compositions below an immersive opening.

Formal academic content must remain precise, readable and editorial. Drawing appears where intellectual work is happening: grouping, comparing, connecting, questioning, revising, ambiguity, boundaries, uncertainty, conceptual relationships, competing interpretations and synthesis.

Use a clean white canvas. Materiality should live mainly in the marks: coloured pencil, graphite, dry pigment, repeated strokes, pressure variation, hatching, cross-hatching, pigment masses, overlap, smudging, erasure, ghost construction, partial boundaries and imperfect contours.

## Approved benchmarks

The current benchmarks share visual DNA but solve different conceptual
problems:

- **Home** — the site-level knowledge atlas: expansive opening, clear entry,
  and the reference rhythm from rich territory to quiet scholarship.
- **Gestalt** — the Music Psychology benchmark: grouping, whole/part,
  relational perception and perceptual fields.
- **JD–R** — the Organisational Behaviour benchmark: workplace conditions,
  parallel currents, effort, support and changed relationships. Its validated
  interaction lessons are focus without disappearance, contextual
  reclassification, simultaneous processes, shared origin with divergent
  return, and relationship change without removing the condition.
- **Person–Environment Fit** — the persistent authored-world benchmark:
  **DRAWN ONCE · READ MANY WAYS** through crops, fragments and live readings.
- **Library** — the knowledge-discovery / mode-aware information-density
  benchmark: **ONE LIBRARY · THREE READING INTENTIONS** — Explore (space),
  Find (speed) and Enter a field (structure).

Do not copy any benchmark's exact layout. Future theory pages inherit the
global shell, typography, spacing, material language, provenance language,
art-intensity logic and quiet-scholarship behaviour, then discover geometry
from the theory itself.

Colour behaves like drawing material, not generic UI accent colour.

Different theories may generate different compositions. Do not use one universal hero + cards + diagram template.

Do not flatten an existing interactive theory experience into static artwork.
First determine what stays constant, what changes, what can coexist and what
misconception the interaction should expose. Then choose states, controls,
transitions, residual traces and relationship changes that could only make
sense for that theory. Keep the transition into evidence, limitations,
sources and provenance quieter.

Design the whole long page as a visual argument with changing intensity. Evidence, Scope, Limitations, Provenance, Sources and References should become quieter without becoming generic.

Avoid SaaS, dashboards, card grids, generic editorial portfolio design, glassmorphism, scrapbook, sticky notes, classroom worksheet aesthetics, beige/vintage notebook styling, children’s educational graphics, random doodles, decorative hand-drawn effects and normal website layouts with pencil illustrations pasted on top.

Before implementing, read the full visual-language docs. Use current project content as source of truth and visual references through **creative assimilation, not imitation**.

> **Do not merely style academic content. Invent a visual mode of scholarly thinking.**

## Art-direction implementation principle

Use:

> **ART FIRST, CODE SECOND.**

Do not force the frontend to procedurally simulate every expressive pencil or pigment image. For visually rich sections, prefer a hybrid system: generated/authored artwork for complex material drawing, HTML/CSS for scholarship and editorial structure, and lightweight SVG/Canvas/JS for interaction. Read `docs/visual-language/ART-ASSET-STRATEGY.md` before deciding how to implement major visual artwork.

When a conceptual moment requires expressive materiality, an authored or
generated art asset is preferred. Do not approximate an important art moment
with pseudo-pencil SVG/CSS merely because it is possible to code it.
