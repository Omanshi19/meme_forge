"use client";
import type { MemeTone } from "@/types";
import { TONE_CONFIG } from "@/types";

interface Props { selected: MemeTone; onChange: (t: MemeTone) => void; }

export default function ToneSelector({ selected, onChange }: Props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {(Object.keys(TONE_CONFIG) as MemeTone[]).map((tone) => {
        const { label, emoji } = TONE_CONFIG[tone];
        return (
          <button key={tone} onClick={() => onChange(tone)} className={`tone-pill ${selected === tone ? "active" : ""}`}>
            {emoji} {label}
          </button>
        );
      })}
    </div>
  );
}