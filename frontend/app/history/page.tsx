"use client";
import { motion } from "framer-motion";
import { Trash2, Wand2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import { useMemeStore } from "@/lib/store";
import { TONE_CONFIG } from "@/types";

export default function HistoryPage() {
  const { history, clearHistory } = useMemeStore();

  return (
    <div style={{ minHeight: "100vh", background: "var(--sand)", position: "relative" }}>
      <AnimatedBackground />
      <Navbar />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 800, margin: "0 auto", padding: "108px 24px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 28 }}>📜</span>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, color: "#2C1810" }}>History</h1>
            </div>
            <p style={{ color: "#9A7A6A", fontFamily: "'DM Sans', sans-serif" }}>{history.length} memes generated this session</p>
          </div>
          {history.length > 0 && (
            <button onClick={clearHistory} className="btn-ghost" style={{ padding: "10px 20px", fontSize: 13 }}>
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: 64, marginBottom: 16 }}>💭</p>
            <p style={{ color: "#9A7A6A", fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>No history yet — go make some memes!</p>
            <Link href="/generator" style={{ textDecoration: "none" }}>
              <button className="btn-sun" style={{ padding: "14px 32px", fontSize: 15 }}>
                <Wand2 size={16} /> Forge a Meme
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {history.map((item, i) => (
              <motion.div key={`${item._id}-${i}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="summer-card" style={{ display: "flex", alignItems: "center", gap: 16, padding: 16 }}>
                <img src={item.image_url} alt={item.prompt} style={{ width: 60, height: 60, borderRadius: 12, objectFit: "cover", background: "#F0D9A0", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, color: "#2C1810", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.prompt}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 12, color: "#9A7A6A", fontFamily: "'DM Sans', sans-serif" }}>{item.template_name}</span>
                    <span style={{ fontSize: 12, color: "#FFB800", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                      {TONE_CONFIG[item.tone]?.emoji} {TONE_CONFIG[item.tone]?.label}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#FF6B4A", fontFamily: "'DM Sans', sans-serif" }}>{item.virality_score}% viral</p>
                  <p style={{ fontSize: 11, color: "#C4A882", fontFamily: "'DM Sans', sans-serif", marginTop: 3 }}>{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}