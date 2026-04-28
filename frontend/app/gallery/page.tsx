"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import { listMemes } from "@/lib/api";
import type { MemeDocument } from "@/types";

export default function GalleryPage() {
  const [memes, setMemes]     = useState<MemeDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listMemes({ page: 1, limit: 20 })
      .then((d) => setMemes(d.memes))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--sand)", position: "relative" }}>
      <AnimatedBackground />
      <Navbar />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "108px 24px 60px" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>🖼️</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, color: "#2C1810" }}>Meme Gallery</h1>
          </div>
          <p style={{ color: "#9A7A6A", fontFamily: "'DM Sans', sans-serif" }}>{memes.length} memes forged so far</p>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <Loader2 size={32} color="#FFB800" style={{ animation: "spin 1s linear infinite" }} />
          </div>
        ) : memes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: 64, marginBottom: 16 }}>🗿</p>
            <p style={{ color: "#9A7A6A", fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>No memes yet. Be the first!</p>
            <Link href="/generator" style={{ textDecoration: "none" }}>
              <button className="btn-sun" style={{ padding: "14px 32px", fontSize: 15 }}>Make a Meme</button>
            </Link>
          </div>
        ) : (
          <div style={{ columns: "2 280px", gap: 20 }}>
            {memes.map((meme, i) => (
              <motion.div key={meme._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="summer-card" style={{ marginBottom: 20, breakInside: "avoid", overflow: "hidden" }}>
                <img src={meme.image_url} alt={meme.prompt} style={{ width: "100%", display: "block", borderRadius: "22px 22px 0 0" }} />
                <div style={{ padding: "12px 16px" }}>
                  <p style={{ fontSize: 12, color: "#7A5C4A", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{meme.prompt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: "#FFB800", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{meme.virality_score}% viral</span>
                    <span style={{ fontSize: 11, color: "#C4A882", fontFamily: "'DM Sans', sans-serif" }}>{new Date(meme.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}