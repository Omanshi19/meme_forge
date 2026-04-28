"use client";
import { motion } from "framer-motion";

const EMOJIS = ["☀️","🌊","🍉","🌺","🐚","🌴","🍋","🦋","🌸","⭐"];

export default function AnimatedBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,184,0,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "-15%", left: "-10%", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,74,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", top: "40%", left: "30%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,184,255,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {EMOJIS.map((emoji, i) => (
        <motion.span key={i}
          style={{ position: "absolute", fontSize: 24 + (i % 3) * 8, left: `${8 + (i * 9) % 84}%`, top: `${5 + (i * 11) % 80}%`, opacity: 0.1, userSelect: "none" }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, -6, 0], opacity: [0.06, 0.15, 0.06] }}
          transition={{ duration: 4.5 + i * 0.6, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}>
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}