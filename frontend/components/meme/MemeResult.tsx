"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, Share2, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import type { GeneratedMeme } from "@/types";

interface Props { meme: GeneratedMeme; onRegenerate: () => void; }

export default function MemeResult({ meme, onRegenerate }: Props) {
  const [idx, setIdx] = useState(0);
  const all = [
    { template_name: meme.template_name, top_text: meme.top_text, bottom_text: meme.bottom_text, image_url: meme.image_url },
    ...meme.variations,
  ];
  const current = all[idx] ?? all[0];
  const viralColor = meme.virality_score > 80 ? "#FF6B4A" : meme.virality_score > 60 ? "#FFB800" : "#9A7A6A";

  const handleDownload = async () => {
    try {
      const res = await fetch(current.image_url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `memeforge-${meme.meme_id}.png`; a.click();
      URL.revokeObjectURL(url);
      toast.success("Downloaded! 🎉");
    } catch { toast.error("Download failed — try right-clicking the image"); }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: current.image_url, title: "Check this meme!" });
    } else {
      navigator.clipboard.writeText(current.image_url);
      toast.success("Link copied!");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="summer-card" style={{ overflow: "hidden" }}>

      {/* Header */}
      <div style={{ padding: "20px 24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #F0D9A0" }}>
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: "#2C1810" }}>Your Meme is Ready! 🔥</h3>
          <p style={{ fontSize: 12, color: "#9A7A6A", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{current.template_name}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#FFF3C4", border: "2px solid #F0D9A0", borderRadius: 50, padding: "6px 14px" }}>
          <TrendingUp size={13} color={viralColor} />
          <span style={{ fontSize: 13, fontWeight: 700, color: viralColor, fontFamily: "'DM Sans', sans-serif" }}>{meme.virality_score}% viral</span>
        </div>
      </div>

      {/* Image */}
      <div style={{ position: "relative", background: "#F5E6C0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 280 }}>
        <AnimatePresence mode="wait">
          <motion.img key={idx} src={current.image_url} alt={current.top_text}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ width: "100%", objectFit: "contain", maxHeight: 380 }} />
        </AnimatePresence>
        {all.length > 1 && (
          <>
            <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}
              style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "2px solid #F0D9A0", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: idx === 0 ? 0.3 : 1 }}>
              <ChevronLeft size={16} color="#2C1810" />
            </button>
            <button onClick={() => setIdx(Math.min(all.length - 1, idx + 1))} disabled={idx === all.length - 1}
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "2px solid #F0D9A0", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: idx === all.length - 1 ? 0.3 : 1 }}>
              <ChevronRight size={16} color="#2C1810" />
            </button>
          </>
        )}
      </div>

      {/* Captions */}
      <div style={{ padding: "14px 24px", background: "#FFFBF0", borderTop: "2px solid #F0D9A0", borderBottom: "2px solid #F0D9A0" }}>
        <p style={{ fontSize: 13, color: "#2C1810", fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>
          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#9A7A6A", marginRight: 8 }}>Top</span>{current.top_text}
        </p>
        <p style={{ fontSize: 13, color: "#2C1810", fontFamily: "'DM Sans', sans-serif" }}>
          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#9A7A6A", marginRight: 8 }}>Bot</span>{current.bottom_text}
        </p>
      </div>

      {/* Dots */}
      {all.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "12px 0", borderBottom: "2px solid #F0D9A0" }}>
          {all.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 8, height: 8, borderRadius: 50, border: "none", cursor: "pointer", background: i === idx ? "linear-gradient(135deg, #FFB800, #FF6B4A)" : "#F0D9A0", transition: "all 0.2s" }} />
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ padding: 16, display: "flex", gap: 10 }}>
        <button onClick={handleDownload} className="btn-sun" style={{ flex: 1, padding: "12px 0", fontSize: 14, justifyContent: "center" }}>
          <Download size={15} /> Download
        </button>
        <button onClick={handleShare} className="btn-ghost" style={{ flex: 1, padding: "12px 0", fontSize: 14, justifyContent: "center" }}>
          <Share2 size={15} /> Share
        </button>
        <button onClick={onRegenerate} className="btn-ghost" style={{ padding: "12px 16px" }} title="Regenerate">
          <RefreshCw size={15} />
        </button>
      </div>
    </motion.div>
  );
}