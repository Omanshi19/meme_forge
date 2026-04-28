import Link from "next/link";
import { Zap } from "lucide-react";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import Navbar from "@/components/layout/Navbar";
import { PROMPT_SUGGESTIONS } from "@/types";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--sand)", position: "relative" }}>
      <AnimatedBackground />
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: 800, margin: "0 auto", padding: "140px 24px 80px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", border: "2px solid #F0D9A0", borderRadius: 50, padding: "8px 20px", marginBottom: 32, boxShadow: "0 2px 12px rgba(255,184,0,0.15)" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF6B4A", display: "inline-block" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#7A5C4A", fontFamily: "'DM Sans', sans-serif" }}>
            AI-Powered Meme Generation — Actually Funny ✨
          </span>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24, color: "#2C1810" }}>
          Turn Any Idea Into<br />
          <span className="gradient-sun">a Viral Meme</span>
        </h1>

        <p style={{ fontSize: 18, color: "#7A5C4A", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          Type a funny idea, pick your humor style, and let AI do the rest. Trending templates. Witty captions. Instant results.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/generator" style={{ textDecoration: "none" }}>
            <button className="btn-sun" style={{ padding: "16px 36px", fontSize: 16 }}>
              <Zap size={18} /> Start Memeing Free
            </button>
          </Link>
          <Link href="/gallery" style={{ textDecoration: "none" }}>
            <button className="btn-ghost" style={{ padding: "16px 32px", fontSize: 16 }}>
              See Gallery →
            </button>
          </Link>
        </div>

        <div style={{ position: "absolute", top: 110, left: "4%", fontSize: 40, opacity: 0.5 }} className="animate-float">☀️</div>
        <div style={{ position: "absolute", top: 180, right: "4%", fontSize: 32, opacity: 0.4, animationDelay: "1.2s" }} className="animate-float">🌊</div>
        <div style={{ position: "absolute", top: 280, left: "1%", fontSize: 26, opacity: 0.35, animationDelay: "2s" }} className="animate-float">🌺</div>
      </section>

      {/* Ticker */}
      <div style={{ overflow: "hidden", padding: "16px 0", background: "white", borderTop: "2px solid #F0D9A0", borderBottom: "2px solid #F0D9A0", marginBottom: 80, position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", gap: 40, whiteSpace: "nowrap" }} className="animate-ticker">
          {[...PROMPT_SUGGESTIONS, ...PROMPT_SUGGESTIONS].map((s, i) => (
            <span key={i} style={{ fontSize: 14, color: "#9A7A6A", fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>
              <span style={{ color: "#FFB800", marginRight: 8 }}>☀️</span>{s}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: 1000, margin: "0 auto 80px", padding: "0 24px" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, textAlign: "center", color: "#2C1810", marginBottom: 48 }}>
          Why <span className="gradient-sun">MemeForge</span>?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {[
            { icon: "🤖", title: "AI Caption Generation", desc: "Gemini AI writes punchy captions tailored to your vibe — Gen Z, dark, sarcastic, programmer humor and more." },
            { icon: "📈", title: "Trending Templates",    desc: "Auto-selects the best meme template that matches your idea from a curated library of viral formats." },
            { icon: "🎨", title: "3 Variations Instantly", desc: "Get 3 unique meme variations per generation. Mix and match until you find the perfect one." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="summer-card" style={{ padding: 28 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: "#2C1810", marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 14, color: "#7A5C4A", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: 800, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ background: "linear-gradient(135deg, #FFB800 0%, #FF6B4A 100%)", borderRadius: 32, padding: "60px 40px", textAlign: "center", boxShadow: "0 20px 60px rgba(255,107,74,0.3)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔥</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "white", marginBottom: 16 }}>
            Ready to go viral?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>
            No account needed. No credit card. Just type and meme.
          </p>
          <Link href="/generator" style={{ textDecoration: "none" }}>
            <button style={{ background: "white", color: "#FF6B4A", border: "none", borderRadius: 50, padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
              <Zap size={18} /> Generate Your First Meme
            </button>
          </Link>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: 24, borderTop: "2px solid #F0D9A0", color: "#9A7A6A", fontSize: 13, fontFamily: "'DM Sans', sans-serif", position: "relative", zIndex: 10 }}>
        Made with ☀️ by MemeForge AI
      </footer>
    </div>
  );
}