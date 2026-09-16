# Academic Concept Lab — Interaction Grammar

This is the source of truth for theory-specific interaction inside the
Academic Concept Lab visual language. It complements `PAGE-BEHAVIOUR.md`,
`IMPLEMENTATION-RECIPES.md` and `ART-ASSET-STRATEGY.md`; it does not prescribe
a page template.

## Interactive Editorial Drawing

**Interactive Editorial Drawing** is a page behaviour in which live academic
content, theory-specific interaction, typography, spatial organisation and
authored drawing operate as one explanatory system.

It is not:

```text
TEXT + STATIC ILLUSTRATION
```

or:

```text
TEXT + BUTTONS + IMAGE SWAP
```

It is:

```text
LIVE ACADEMIC CONTENT
+ THEORY-SPECIFIC INTERACTION
+ DRAWN VISUAL SYSTEM
```

It may also be understood as a **Living Research Diagram**. The interaction
must make a theoretical relationship perceptible; the drawing must remain
material and meaningful; formal scholarship must remain live HTML.

## The three layers

### Live HTML

Keep claims, definitions, explanations, qualifications, evidence,
limitations, sources and provenance selectable, searchable, accessible,
readable and semantically structured. Important academic wording must not be
locked inside an image.

### Art layer

Use authored or generated coloured-pencil, graphite, pigment, figure,
construction, annotation, route and field material where expressive
materiality carries the idea. Artwork may be a field, crop, fragment, state
layer, figure, relational trace or environmental context. It is not
automatically a finished UI surface.

### Interactive layer

Use semantic HTML controls with lightweight SVG, Canvas, CSS or JavaScript
only where the reader needs to compare, toggle, reveal, reclassify, change
context, trace a relationship, switch an interpretation, alter a conceptual
condition or inspect simultaneous processes.

Visual migration must preserve useful interaction already present in the
academic experience. Do not flatten a dynamic theory page into static art for
the sake of visual consistency.

## Start from the conceptual change

Before deciding what artwork to make, ask **what can the reader explore?** For
each theory, identify:

- what changes;
- what stays constant;
- what can be compared;
- what can switch context;
- what can coexist;
- what can be revealed;
- what relationship can be manipulated; and
- what misconception the interaction could expose.

Then record the interaction's stable reference and changed interpretation:

| Keep present | Change or reinterpret |
| --- | --- |
| the same workplace, person, job, demand, effort, event or source | attention, context, process focus, demand type, resource condition, grouping or interpretation |

The stable reference prevents a comparison from accidentally becoming a new
scenario. Ask whether the interaction could only make sense for this theory.
If it could be moved unchanged to many unrelated pages, it is probably too
generic.

## Focus without disappearance

Focus does not necessarily mean removal. When a theory says that states or
processes coexist, a non-focused state should remain as a residual trace:

- reduced pigment or opacity;
- graphite without the coloured emphasis;
- lower annotation density;
- a faint route or softened boundary; or
- a quieter spatial presence.

Use disappearance only when disappearance is conceptually correct. This keeps
`A AND B` or “focus on A while B remains present” from being misread as `A OR
B`.

## Transform relationships, not just visibility

Where the theory supports it, state changes should alter a relationship rather
than merely reveal or hide content. Useful behaviours include lines redrawing,
routes opening or narrowing, relationships strengthening, annotations
emerging, contextual links changing, spatial emphasis migrating, pigment
entering or receding, classifications shifting and competing organisations
reorganising.

Do not default to `display: none` / `display: block` when a relational change
would teach the concept more accurately.

Validated JD–R examples are interaction logic, not reusable templates:

- one condition changes category when the work context changes;
- two processes coexist rather than form opposite ends of one scale;
- the same effort travels through conceptually different routes; and
- a resource changes the relationship between conditions without removing the
  original demand.

Future theories must discover their own equivalent behaviour.

## Controls, motion and access

Controls should be semantic, visible and discoverable while belonging to the
theory field. They may appear as field-edge labels, route selectors, editorial
tabs, margin handles, conceptual forks or labels embedded in a quiet drawing
region. Do not hide the UI to make it look more artistic.

Every state must provide keyboard operation, logical focus order, visible
focus, adequate touch targets, an obvious non-colour state indication and a
screen-reader announcement such as `aria-pressed` or an equivalent live
description.

Motion is justified only when it explains theory: line redrawing, route
opening, route narrowing, pigment appearing or receding, annotation emerging,
focus migration or relational emphasis. Avoid decorative parallax, floating
elements, universal scroll reveals and motion in quiet scholarship. Every
transition should answer: **what conceptual change is this making visible?**

Always support `prefers-reduced-motion`; the interaction and its explanation
must remain fully functional without transition effects.

## Shared language, discovered geometry

The shared visual language includes editorial serif typography, restrained
metadata, a white canvas, graphite, coloured pencil, construction marks,
handwritten intellectual annotation, live HTML and quiet scholarship.

Page geometry must come from the theory. Grouping, whole/part, competing
organisation, ambiguity, proximity, continuity, perceptual fields, one
workplace, simultaneous currents, divergent return, buffering and changed
relationships are examples of conceptual geometry, not a universal layout.

## Discovery surfaces and reader intention

A collection, index or discovery surface may recompose when the reader's
intention changes meaningfully. Do not assume one fixed composition should
survive every search, filter or navigation state. The Library benchmark names
three useful intentions without making them a universal template:

> **ONE LIBRARY · THREE READING INTENTIONS**

- **Explore** — browse and discover through orientation, knowledge territories,
  generous scanning space and a grouped index.
- **Find** — retrieve something quickly through direct search/filter utility,
  immediate counts and compact results; discovery material gets out of the
  way.
- **Enter a field** — understand one territory through field orientation,
  discipline-specific organisation, branches, conceptual families or learning
  routes where the knowledge supports them.

> **INFORMATION DENSITY SHOULD FOLLOW READER INTENT.**

Explore can use compact
editorial scanning, Find can use the highest utility density, and an entered
field can breathe where structure and orientation matter. This is intentional
density, not a fixed CSS scale, and it must not alter canonical content.

When a collection becomes primarily navigational, open editorial index entries
may scale better than repeated self-contained cards. Prioritise title,
question or hook, kind, field or branch context, important status, Save and
Open; leave secondary facts to the full record. The goal is **scan before
opening, depth after opening**, not minimalism for its own sake. Cards remain
appropriate when self-contained comparison or preview is useful.

> **RECORDS HAVE DIALECTS, NOT MINI-POSTERS.**

Records can have dialects rather than mini-posters: typography, small colour
marks, metadata hierarchy, evidence/process cues and subtle graphic language
can distinguish kinds without bespoke illustrations, frames or independent
mini-layouts. A shared Library system also need not flatten fields into one
structure: conceptual presentation groups, research threads and learning paths,
or a simpler orientation plus index may each be the truthful organisation.

The Library intentionally works without major authored artwork. Typography,
white space, rules, small marks, metadata, grouping and interaction state can
carry the visual intensity. Information architecture itself may be the visual
expression; do not add artwork merely to make a discovery page feel designed.
Discovery surfaces expected to grow should scale through data-driven grouping
and typography rather than unique artwork, manual positioning or a fixed map.
Lightweight field anchors may become useful at much larger scale, but they are
a future option, not a current requirement.

### Personal return surfaces

A personal collection is a return surface, not a smaller discovery surface by
default. The distinction is:

| Shared Library | Personal Saved pile |
| --- | --- |
| discover, compare, narrow, enter fields | recognise, resume, remove, continue |

> **A SMALL WORKING SET · RETURN WITH ALMOST NO FRICTION**

Saved demonstrates the sequence **KEEP → RECOGNISE → RETURN → CONTINUE**. Keep
the entry useful for recognition — title, question or hook, field, kind, useful
status, saved state and a direct return action — without repeating the full
record or inheriting search, maps, filters and discovery controls. The rule is
**RECOGNITION BEFORE RE-EXPLANATION**.

> **PERSONAL COLLECTIONS SHOULD EARN COMPLEXITY.**

Personal collections should earn complexity as their real scale and data model
require it. Do not add folders, tags, notes, priorities, reading state,
progress, sorting, timestamps or cloud sync in anticipation of future use.

Grouping should respond to cognitive need, not available metadata. A small or
homogeneous set can remain one continuous canonical-order pile; a larger,
diverse set may use light grouping when it materially improves recognition.
Numeric thresholds belong to a benchmark implementation, not to the visual
system as a universal law.

Do not imply chronology when persistence stores only record IDs. Avoid labels
such as “recently saved”, “newest” or “latest”, and do not simulate recency by
reordering canonical records. Design intentionally for zero, one and many
items: invitation to begin, a meaningful working set, and a recognisable pile.

Removing an item is a primary state change. Update the count immediately,
close gaps naturally, announce the change accessibly, preserve sensible focus
and move cleanly to the empty state after the final removal. The return action
should outrank collection management; remove/save controls are secondary to
**RETURN TO RECORD**.

Saved needs little visual machinery: typography, white space, graphite rules,
one restrained saved-state colour, small marginalia and editorial record rows.
No major authored artwork is required. The collection becomes personal through
selection and state, not decorative illustration.

### Drawn once · read many ways

A sufficiently rich authored visual field may function as a persistent
conceptual world. Instead of commissioning a complete illustration for every
section, inspect that world through crops, fragments, object-position shifts,
live overlays, residual traces, local annotations, target changes and
viewpoint changes. The artwork behaves as a place; the reader moves through
that place by changing how it is read.

This is one available strategy, not a universal rule. It is appropriate when:

- the theory has one stable world or scenario;
- several conceptual relationships can be examined within that same world;
- a persistent visual reference helps comparison; and
- repeated full illustrations would create poster-series repetition.

Choose a different authored asset when sections genuinely require different
environments, the theory changes conceptual world, one artwork would force
unrelated concepts into a false unity, or new art is genuinely necessary.

The transferable rule is:

> **theory-specific geometry + theory-specific interaction > repeated theory-page template**

Interactive intensity should also change across the page. A useful sequence
may move from expansive to exploratory, conceptual, comparative or relational,
then curated and quiet scholarship. Evidence, limitations, sources and
provenance often need quieter treatment; not every section needs artwork or
interaction.

## Benchmarks

- **Home** is the site-level benchmark: knowledge atlas, expansive opening and
  overall density rhythm.
- **Gestalt** is the Music Psychology benchmark: grouping, whole/part,
  relational perception and perceptual fields.
- **JD–R** is the Organisational Behaviour benchmark: workplace conditions,
  parallel currents, effort, support and changed relationships.
- **Person–Environment Fit** is the Organisational Behaviour benchmark for
  persistent authored-world / relational correspondence: one person remains
  inside one environment while correspondence questions, crops and viewpoints
  change. Its transferable lesson is that authored artwork can function as
  world, fragment, crop and interaction substrate; essential meaning stays in
  live HTML and raster handwriting remains marginalia. Do not copy its
  workplace composition into future pages.
- **Library** is the knowledge discovery / mode-aware information-density
  benchmark: one canonical collection, three reading intentions — Explore
  (space), Find (speed) and Enter a field (structure). It demonstrates that
  field structure and density can follow reader intent without changing
  canonical records or becoming a page template.
- **Saved** is the personal working-set / return-continuity benchmark:
  **A SMALL WORKING SET · RETURN WITH ALMOST NO FRICTION**. It demonstrates
  recognition, direct return, reversible removal and truthful persistence
  without inheriting the Library's full discovery architecture.

These roles describe transferable design problems, not reusable compositions or
interaction mechanics. Future pages inherit the global shell, typography,
spacing, material language, provenance language, art-intensity logic and quiet
scholarship, then find their own geometry and interaction.

## Early failure checks

Stop and rethink when a page repeats:

```text
TITLE + PARAGRAPH + LARGE ARTWORK
```

or:

```text
PILL CONTROLS + STATIC IMAGE SWAP
```

Other failures include treating authored art as the automatic final UI,
flattening an existing interactive learning experience, adding generic
animation, copying Gestalt or JD–R geometry, or reducing academic nuance to
make state changes easier to implement.

Before review, ask:

- Is canonical content, qualification, limitation, evidence and provenance
  intact?
- What can the reader explore, and does it explain the theory?
- What remains constant and what changes?
- Does focus accidentally imply disappearance?
- Is the interaction qualitative rather than a misleading quantitative claim?
- Is artwork acting as material, or sitting on the page as a poster?
- Do the drawing field and annotations respond meaningfully to state?
- Are controls discoverable, accessible and obvious without colour alone?
- Does motion explain a conceptual change and remain correct with reduced
  motion?
- Does the page eventually become quiet enough for scholarship?
