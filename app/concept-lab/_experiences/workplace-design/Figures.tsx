"use client";

import { useState } from "react";
import Image from "next/image";
import type { Expansion, Interaction, TheoryDemo } from "@/content/types";
import { Glyph } from "../../_folio/Folio";
import { Rich } from "../../_components/Sketch";
import s from "./wp.module.css";

const ROOM = "/visual-language/theories/wp/wp-architectural-cutaway-v2.webp";
type Condition = "layout" | "noise" | "privacy" | "density" | "light" | "furniture";

const CONDITIONS: { key: Condition; position: string; zoom: number; description: string }[] = [
  { key: "layout", position: "50% 50%", zoom: 1, description: "Configuration: who sits near whom, what is visible, and how the space is arranged." },
  { key: "noise", position: "54% 18%", zoom: 1.34, description: "Noise and acoustics: sound level matters, but so does whether speech can be understood." },
  { key: "privacy", position: "18% 39%", zoom: 1.42, description: "Privacy has distinct visual and acoustic sides: being unseen and being unheard." },
  { key: "density", position: "52% 54%", zoom: 1.38, description: "Density can be counted; crowding names the experience of sharing space." },
  { key: "light", position: "84% 34%", zoom: 1.38, description: "Light and temperature are ambient conditions that employees may have little control over." },
  { key: "furniture", position: "51% 58%", zoom: 1.5, description: "Furniture and workstation: the immediate physical support around the body doing the work." },
];
const ENCLOSURE_STATES: readonly ThreeStateIndex[] = [0, 1, 2];

function ConditionMark({ condition }: { condition: Condition }) {
  return (
    <svg className={s.conditionMark} data-condition={condition} viewBox="0 0 80 48" aria-hidden="true" focusable="false">
      <g data-mark="layout">
        <path className={s.markEcho} d="M8 12 C25 11 29 18 41 19 S58 13 72 14" />
        <path className={s.markLine} d="M7 15 C24 14 30 21 42 22 S59 16 72 17" />
        <path className={s.markAccent} d="m43 22 8 8m-8-8 10-1" />
      </g>
      <g data-mark="noise">
        <path className={s.markEcho} d="M7 13c7-8 12 8 19 0s12 8 19 0 12 8 19 0" />
        <path className={s.markAccent} d="M8 22c7-8 12 8 19 0s12 8 19 0 12 8 19 0" />
        <path className={s.markLine} d="M9 31c7-8 12 8 19 0s12 8 19 0 12 8 19 0" />
      </g>
      <g data-mark="privacy">
        <path className={s.markLine} d="M12 36V19c0-10 12-16 23-14m9 0c11 0 20 7 20 17v14" />
        <path className={s.markEcho} d="M8 38V18C8 5 20 0 31 2m17 0c13 2 22 9 22 21v15" />
        <path className={s.markAccent} d="M34 5h6m-6 28h6" />
      </g>
      <g data-mark="density">
        <path className={s.markEcho} d="M10 25c2-10 14-14 21-7 6 6 1 16-7 18-8 2-15-3-14-11Zm25-12c4-8 15-9 20-2 5 7 0 15-8 16-8 1-15-6-12-14Zm12 19c1-9 11-14 19-9 7 4 7 14-1 18-8 4-18 0-18-9Z" />
        <path className={s.markAccent} d="M14 24c2-6 8-8 12-4m15-9c4-4 10-3 13 1m1 23c4 1 8-1 10-4" />
      </g>
      <g data-mark="light">
        <path className={s.markEcho} d="M43 26 69 9M46 29 73 19M47 33 75 31M43 37 68 43" />
        <path className={s.markAccent} d="m50 18 4-8m4 20h13m-19 12-5 7" />
        <path className={s.markLine} d="M8 37c13-2 20-4 28-8" />
      </g>
      <g data-mark="furniture">
        <path className={s.markEcho} d="M9 28c18-6 43-6 62 0M14 32c17-5 36-5 54 0" />
        <path className={s.markLine} d="M11 25c18-6 42-6 59 0M17 29c16-4 34-4 50 0" />
        <path className={s.markAccent} d="M20 31v10m43-10v10M16 42h51" />
      </g>
    </svg>
  );
}

export function RoomMixer({ elements }: { elements: Expansion[] }) {
  if (elements.length !== CONDITIONS.length) throw new Error("Workplace Design requires six physical-environment conditions");
  const [focus, setFocus] = useState<Condition>("layout");
  const current = CONDITIONS.find((condition) => condition.key === focus);
  if (!current) throw new Error(`Workplace Design is missing condition ${focus}`);
  const conditionIndex = CONDITIONS.findIndex((condition) => condition.key === focus);
  const selectedElement = elements[conditionIndex];
  if (!selectedElement) throw new Error(`Workplace Design is missing the text for ${focus}`);

  return (
    <div className={s.roomRead}>
      <figure className={s.roomCrop} data-focus={focus}>
        <div className={s.roomWindow}>
          <Image src={ROOM} width={1536} height={1024} sizes="(max-width: 700px) 100vw, 56vw" alt={`A crop of an imagined workplace, shifting attention to ${selectedElement.title.toLowerCase()}. The picture is not a measured environment.`} style={{ objectPosition: current.position, transformOrigin: current.position, transform: `scale(${current.zoom})` }} loading="lazy" unoptimized />
        </div>
        <figcaption><Glyph g="▲" /> The same imagined workplace, read from a different point of attention. The drawing gives no measured setting or finding.</figcaption>
      </figure>
      <div className={s.conditionChooser} role="group" aria-label="Choose a physical condition to inspect">
        {elements.map((element, index) => {
          const condition = CONDITIONS[index];
          if (!condition) return null;
          return (
            <button key={element.title} type="button" aria-pressed={condition.key === focus} onClick={() => setFocus(condition.key)}>
              <span>{element.title}</span>
              <small>{element.body}</small>
            </button>
          );
        })}
      </div>
      <div className={s.conditionReading} data-condition={focus} aria-live="polite" aria-atomic="true">
        <ConditionMark condition={focus} />
        <div><span>Attention turns to</span><strong>{selectedElement.title}</strong></div>
        <p>{current.description}</p>
      </div>
    </div>
  );
}

export function WorkspaceStress({ steps, caption }: { steps: string[]; caption: string }) {
  const [index, setIndex] = useState(0);
  const current = steps[index] ?? steps[0] ?? "The proposed explanation is not available.";
  return (
    <div className={s.stressRead}>
      <div className={s.stressStates} role="group" aria-label="Read the proposed workspace-stress account">
        {steps.map((step, i) => (
          <button key={step} type="button" aria-pressed={i === index} onClick={() => setIndex(i)}>
            <span aria-hidden="true">0{i + 1}</span>{step}
          </button>
        ))}
      </div>
      <div className={s.stressCurrent} aria-live="polite" aria-atomic="true">
        <p className={s.smallHead}>In view</p>
        <p>{current}</p>
      </div>
      <p className={s.editorialCaution}><Glyph g="▲" /> {caption}</p>
    </div>
  );
}

type ThreeStateIndex = 0 | 1 | 2;

export function Tradeoff({ demo, interactions }: { demo: TheoryDemo; interactions: Interaction[] }) {
  const [index, setIndex] = useState<ThreeStateIndex>(0);
  if (demo.type !== "dual-path" || !demo.states || !demo.roads) throw new Error("Workplace Design requires its two-road enclosure reading");
  const selected = demo.states[index];
  const selectedOption = demo.options[index];
  if (!selected || !selectedOption) throw new Error(`Workplace Design is missing enclosure state ${index}`);
  const [communication, privacy] = demo.roads;
  if (!communication || !privacy) throw new Error("Workplace Design requires communication and privacy readings");

  return (
    <div className={s.tradeoff}>
      <figure className={s.tradeoffImage} data-state={index}>
        <div className={s.tradeoffWindow}>
          <Image src="/visual-language/theories/wp/wp-access-and-exposure-v1.webp" width={1536} height={1024} sizes="(max-width: 700px) 100vw, 48vw" alt="A pencil plan fragment with two workstations on either side of an opening. A blue route passes through the opening while an ochre sightline crosses both sides." loading="lazy" unoptimized />
        </div>
        <figcaption><Glyph g="▲" /> One constructed plan fragment: the blue line marks a possible contact route and the ochre line a sightline. Both cross the same opening; neither is a measured consequence.</figcaption>
      </figure>
      <div className={s.tradeoffRead}>
        <div className={s.enclosureChoices} role="group" aria-label={demo.label}>
          {ENCLOSURE_STATES.map((stateIndex) => {
            const option = demo.options[stateIndex];
            if (!option) throw new Error(`Workplace Design is missing enclosure option ${stateIndex}`);
            return (
              <button key={option} type="button" aria-pressed={stateIndex === index} onClick={() => setIndex(stateIndex)}>{option}</button>
            );
          })}
        </div>
        <p className={s.tradeoffCurrent} aria-live="polite" aria-atomic="true">{selected.t}</p>
        <div className={s.tradeoffDimensions}>
          <p><b>{communication.label}</b><span>{communication.sub}</span></p>
          <p><b>{privacy.label}</b><span>{privacy.sub}</span></p>
        </div>
      </div>
      <ol className={s.tradeoffNotes}>
        {interactions.map((item, i) => (
          <li key={item.title} data-current={i === 2 || undefined}>
            <p>{item.kicker}</p><h3>{item.title}</h3><Rich as="p" html={item.body} />
          </li>
        ))}
      </ol>
      <p className={s.editorialCaution}><Glyph g="▲" /> {demo.caption} Neither line is a quantity, and no office type is assigned an optimum.</p>
    </div>
  );
}
