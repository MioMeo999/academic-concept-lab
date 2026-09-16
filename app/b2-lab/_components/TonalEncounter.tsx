"use client";

import { useState } from "react";
import type { TonalContext } from "@/content/types";
import { HELD_PROBE, TONAL_SOUND, tonalSequence } from "../_lib/tonal-audio";
import { Pigment, Intervention } from "./Pigment";
import { Audio } from "./Audio";
import { Note } from "./Type";

const tones = ["cobalt", "ochre", "emerald", "vermilion"];
const roleNames = ["Tonic", "Dominant", "Mediant", "Chromatic tone"];

export function TonalEncounter({ contexts, compact = false }: { contexts: TonalContext[]; compact?: boolean }) {
  const [selected, setSelected] = useState(0);
  const context = contexts[selected];
  return <div className={`b2-tonal-encounter ${compact ? "b2-compact" : ""}`}>
    <div className="b2-context-controls" role="group" aria-label="Choose the preceding tonal context">{contexts.map((item, i) => <button key={item.id} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}><span className="b2-control-number">0{i + 1}</span><span>{item.label.split(" · ")[0]}<small>{item.label.split(" · ")[1]}</small></span></button>)}</div>
    <div className={`b2-tonal-field b2-field-${tones[selected]}`}>
      <div className="b2-tonal-context"><span className="b2-eyebrow">Changed context</span><h3>{context.label.split(" · ")[0]}</h3><p>{context.body}</p></div>
      <div className="b2-held-note" data-probe-midi={HELD_PROBE.pitch} data-probe-start={HELD_PROBE.start} data-probe-duration={HELD_PROBE.duration}>
        <Pigment tone={tones[selected]} seed={14} sweep className="b2-context-pigment" />
        <span className="b2-eyebrow">Same physical note</span><span className="b2-c4">C<sub>4</sub></span><span className="b2-held-caption">MIDI 60 · 500 ms<br />triangle tone · identical gain</span>
      </div>
      <div className="b2-tonal-role" aria-live="polite" aria-atomic="true"><span className="b2-eyebrow">Contextual role</span><h3>{roleNames[selected]}</h3><p>{context.role}</p><Intervention tone={tones[selected]}>the relation changes</Intervention></div>
    </div>
    <Audio key={context.id} events={tonalSequence(context)} peakGain={TONAL_SOUND.peakGain} label={`Hear ${context.label.split(" · ")[0]}, then C4`} />
    <Note glyph="▲">Constructed comparison. Only the preceding tonal context changes. Pitch, register, timbre, gain, context length, delay and probe duration stay fixed. No rating, ability judgement or universal listener response is inferred.</Note>
    {!compact ? <><p className="b2-audio-spec">Audio conditions: three 420-ms triads, 180-ms gaps, peak gain 0.12 per triangle component, then a 500-ms delay and the same 500-ms C4 probe.</p><div className="b2-context-transcript"><h3>All four readings, without sound</h3><dl>{contexts.map((item, i) => <div key={item.id}><dt>{item.label}</dt><dd><strong>C4: {roleNames[i].toLowerCase()}.</strong> {item.role}. {item.body}</dd></div>)}</dl></div></> : <p className="b2-small">Text equivalent: C4 is tonic in C major, dominant in F major, a tonic-triad member in A minor, and nondiatonic in D major.</p>}
  </div>;
}
