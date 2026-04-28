"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Zap, Image, Clock, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/generator", label: "Generate", icon: Zap },
  { href: "/gallery",   label: "Gallery",  icon: Image },
  { href: "/history",   label: "History",  icon: Clock },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: "rgba(255,251,240,0.9)", backdropFilter: "blur(16px)", borderBottom: "2px solid #F0D9A0", position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🔥</span>
          <span style={{ fontFamily: "'Pacifico', cursive", fontSize: 20, color: "#FF6B4A" }}>MemeForge</span>
          <span style={{ fontSize: 11, fontWeight: 700, background: "linear-gradient(135deg, #FFB800, #FF6B4A)", color: "white", padding: "2px 8px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif" }}>AI</span>
        </Link>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {LINKS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} style={{
              textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
              padding: "8px 18px", borderRadius: 50, fontSize: 14, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
              background: pathname === href ? "linear-gradient(135deg, #FFB800, #FF6B4A)" : "transparent",
              color: pathname === href ? "white" : "#7A5C4A",
              boxShadow: pathname === href ? "0 3px 12px rgba(255,107,74,0.3)" : "none",
            }}>
              <Icon size={14} />{label}
            </Link>
          ))}
        </div>

        <Link href="/generator" style={{ textDecoration: "none" }}>
          <button className="btn-sun" style={{ padding: "10px 24px", fontSize: 14 }}>
            <Zap size={14} /> Make a Meme
          </button>
        </Link>
      </div>
    </nav>
  );
}