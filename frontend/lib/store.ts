// lib/store.ts — Zustand global state

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GeneratedMeme, MemeDocument, MemeTone } from "@/types";

interface MemeStore {
  // Generator state
  prompt:       string;
  tone:         MemeTone;
  isGenerating: boolean;
  currentMeme:  GeneratedMeme | null;
  selectedVariationIndex: number;

  // History
  history:      MemeDocument[];

  // Actions
  setPrompt:    (p: string) => void;
  setTone:      (t: MemeTone) => void;
  setGenerating:(v: boolean) => void;
  setCurrentMeme: (m: GeneratedMeme | null) => void;
  setVariation: (i: number) => void;
  addToHistory: (m: MemeDocument) => void;
  clearHistory: () => void;
}

export const useMemeStore = create<MemeStore>()(
  persist(
    (set) => ({
      prompt:       "",
      tone:         "relatable",
      isGenerating: false,
      currentMeme:  null,
      selectedVariationIndex: 0,
      history:      [],

      setPrompt:    (prompt)   => set({ prompt }),
      setTone:      (tone)     => set({ tone }),
      setGenerating:(isGenerating) => set({ isGenerating }),
      setCurrentMeme: (currentMeme) => set({ currentMeme, selectedVariationIndex: 0 }),
      setVariation: (selectedVariationIndex) => set({ selectedVariationIndex }),
      addToHistory: (meme) =>
        set((state) => ({
          history: [meme, ...state.history].slice(0, 50),   // keep last 50
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "memeforge-store",
      partialize: (state) => ({ history: state.history, tone: state.tone }),
    }
  )
);
