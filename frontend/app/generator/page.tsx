"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Sparkles, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import ToneSelector from "@/components/meme/ToneSelector";
import MemeResult from "@/components/meme/MemeResult";
import { useMemeStore } from "@/lib/store";
import { generateMeme } from "@/lib/api";
import { PROMPT_SUGGESTIONS } from "@/types";

const LOADING_MSGS = [
  "Teaching AI what's funny... 😂",
  "Scanning the internet for vibes...",
  "Selecting the most cursed template...",
  "Crafting your masterpiece...",
  "Almost there — stay with me! ☀️",
];

export default function GeneratorPage() {
  const { prompt, tone, currentMeme, isGenerating, setPrompt, setTone, setGenerating, setCurrentMeme } = useMemeStore();
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MSGS[0]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || prompt.trim().length < 3) {
      toast.error("Give me something to work with!");
      return;
    }
    setGenerating(true);
    setCurrentMeme(null);
    let i = 0;
    const iv = setInterval(() => { i = (i + 1) % LOADING_MSGS.length; setLoadingMsg(LOADING_MSGS[i]); }, 1800);
    try {
      const result = await generateMeme({ prompt: prompt.trim(), tone });
      setCurrentMeme(result);
      toast.success("Meme forged! 🔥");
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "Generation failed. Is the backend running?");
    } finally {
      clearInterval(iv);
      setGenerating(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sand)", position: "relative" }}>
      <AnimatedBackground />
      <Navbar />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "108px 24px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, color: "#2C1810", marginBottom: 12 }}>
            Forge Your <span className="gradient-sun">Meme</span>
          </h1>
          <p style={{ color: "#7A5C4A", fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>
            Type a funny idea · Pick a vibe · Get a banger ☀️
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" }}>

          {/* Input Panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="summer-card" style={{ padding: 28 }}>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "#9A7A6A", display: "block", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
                Your Funny Idea
              </label>
              <div style={{ position: "relative" }}>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
                  placeholder="When your code works but you don't know why..."
                  rows={4}
                  maxLength={500}
                  className="summer-input"
                />
                <span style={{ position: "absolute", bottom: 12, right: 14, fontSize: 11, color: "#9A7A6A", fontFamily: "'DM Sans', sans-serif" }}>
                  {prompt.length}/500
                </span>
              </div>

              <button onClick={() => setShowSuggestions(!showSuggestions)}
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#FFB800", fontWeight: 600, background: "none", border: "none", cursor: "pointer", marginTop: 10, fontFamily: "'DM Sans', sans-serif" }}>
                <Sparkles size={12} /> Need inspiration?
                <ChevronDown size={12} style={{ transform: showSuggestions ? "rotate(180deg)" : "none", transition: "0.2s" }} />
              </button>

              <AnimatePresence>
                {showSuggestions && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginTop: 10, overflow: "hidden" }}>
                    {PROMPT_SUGGESTIONS.map((s) => (
                      <button key={s} onClick={() => { setPrompt(s); setShowSuggestions(false); }}
                        style={{ fontSize: 12, padding: "6px 14px", borderRadius: 50, background: "#FFF3C4", border: "2px solid #F0D9A0", color: "#7A5C4A", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "#9A7A6A", display: "block", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                Humor Style
              </label>
              <ToneSelector selected={tone} onChange={setTone} />
            </div>

            <button onClick={handleGenerate} disabled={isGenerating} className="btn-sun"
              style={{ width: "100%", padding: "16px", fontSize: 16, justifyContent: "center" }}>
              {isGenerating ? (
                <>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                  {loadingMsg}
                </>
              ) : (
                <><Wand2 size={18} /> Forge Meme</>
              )}
            </button>

            <p style={{ fontSize: 12, color: "#9A7A6A", textAlign: "center", marginTop: 12, fontFamily: "'DM Sans', sans-serif" }}>
              Press <kbd style={{ background: "#F0D9A0", padding: "2px 8px", borderRadius: 6, fontSize: 11 }}>⌘ Enter</kbd> to generate
            </p>
          </motion.div>

          {/* Result Panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <AnimatePresence mode="wait">
              {currentMeme ? (
                <MemeResult key="result" meme={currentMeme} onRegenerate={handleGenerate} />
              ) : (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="summer-card"
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, textAlign: "center", minHeight: 420 }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }} className="animate-float">☀️</div>
                  <p style={{ color: "#9A7A6A", fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                    Your meme will appear here
                  </p>
                  <p style={{ color: "#C4A882", fontSize: 13, marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                    Type an idea and hit <strong style={{ color: "#FF6B4A" }}>Forge Meme</strong>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .grid-cols-1 { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}