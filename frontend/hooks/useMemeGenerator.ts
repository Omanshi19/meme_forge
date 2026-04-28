// hooks/useMemeGenerator.ts
// Wraps the generate API call + syncs to history store

import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { generateMeme } from "@/lib/api";
import { useMemeStore } from "@/lib/store";
import type { GeneratedMeme } from "@/types";

export function useMemeGenerator() {
  const [loading, setLoading] = useState(false);
  const { prompt, tone, setCurrentMeme, setGenerating, addToHistory } = useMemeStore();

  const generate = useCallback(async (overridePrompt?: string, overrideTone?: string) => {
    const p = overridePrompt || prompt;
    const t = (overrideTone || tone) as any;

    if (!p.trim() || p.trim().length < 3) {
      toast.error("Give me something to work with!");
      return null;
    }

    setLoading(true);
    setGenerating(true);
    setCurrentMeme(null);

    try {
      const result: GeneratedMeme = await generateMeme({ prompt: p.trim(), tone: t });
      setCurrentMeme(result);

      // Add to local history
      addToHistory({
        _id:            result.meme_id,
        prompt:         result.prompt,
        tone:           t,
        template_id:    result.meme_id,
        template_name:  result.template_name,
        top_text:       result.top_text,
        bottom_text:    result.bottom_text,
        image_url:      result.image_url,
        virality_score: result.virality_score,
        is_favorite:    false,
        variations:     result.variations,
        created_at:     new Date().toISOString(),
      });

      return result;
    } catch (err: any) {
      const msg = err?.response?.data?.detail || "Meme generation failed";
      toast.error(msg);
      return null;
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  }, [prompt, tone]);

  return { generate, loading };
}
