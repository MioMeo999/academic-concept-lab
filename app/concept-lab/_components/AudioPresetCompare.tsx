"use client";

import { useState } from "react";
import type { AudioPreset } from "@/content/types";
import { AudioExample } from "./AudioExample";

export function AudioPresetCompare({
  title,
  description,
  presets,
}: {
  title: string;
  description: string;
  presets: AudioPreset[];
}) {
  const [selected, setSelected] = useState(0);
  const preset = presets[selected] ?? presets[0];
  if (!preset) return null;

  return (
    <div className="music-preset-compare">
      <div className="music-preset-heading">
        <div>
          <p className="k">controlled presets</p>
          <p className="music-preset-title">{title}</p>
          <p className="music-preset-description">{description}</p>
        </div>
        <span className="music-preset-count" aria-live="polite">{String(selected + 1).padStart(2, "0")} / {String(presets.length).padStart(2, "0")}</span>
      </div>

      <div className="music-preset-buttons" role="group" aria-label={`${title} presets`}>
        {presets.map((option, index) => (
          <button
            key={option.label}
            type="button"
            aria-pressed={index === selected}
            onClick={() => setSelected(index)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="music-preset-meta" aria-live="polite">
        <strong>{preset.variable}</strong>
        <span>{preset.controls}</span>
      </div>

      <AudioExample
        key={preset.label}
        label={preset.label}
        events={preset.events}
        description={preset.body}
        colour={preset.colour}
        markers={preset.markers}
      />

      <details className="music-static-fallback">
        <summary>Read the perceptual alternatives</summary>
        <p>{preset.body}</p>
        <p><b>Manipulated:</b> {preset.variable}</p>
        <p><b>Held constant:</b> {preset.controls}</p>
      </details>
    </div>
  );
}
