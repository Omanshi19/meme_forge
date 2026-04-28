"use client";

import { motion } from "framer-motion";
import { Heart, Download, Trash2, Share2, TrendingUp } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import toast from "react-hot-toast";
import type { MemeDocument } from "@/types";
import { toggleFavorite, deleteMeme } from "@/lib/api";
import { useState } from "react";

interface MemeCardProps {
  meme: MemeDocument;
  onDelete?: (id: string) => void;
  onFavoriteToggle?: (id: string, val: boolean) => void;
  index?: number;
}

export default function MemeCard({ meme, onDelete, onFavoriteToggle, index = 0 }: MemeCardProps) {
  const [isFav, setIsFav] = useState(meme.is_favorite);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFavorite = async () => {
    const next = !isFav;
    setIsFav(next);
    try {
      await toggleFavorite(meme._id, next);
      onFavoriteToggle?.(meme._id, next);
    } catch {
      setIsFav(!next);
      toast.error("Failed to update favorite");
    }
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(meme.image_url);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `memeforge-${meme._id}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Meme downloaded!");
    } catch {
      toast.error("Download failed");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: meme.image_url, title: "Check this meme!" });
    } else {
      navigator.clipboard.writeText(meme.image_url);
      toast.success("Link copied!");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMeme(meme._id);
      onDelete?.(meme._id);
      toast.success("Meme deleted");
    } catch {
      toast.error("Delete failed");
      setIsDeleting(false);
    }
  };

  const viralityColor =
    meme.virality_score > 80 ? "text-neon-pink" :
    meme.virality_score > 60 ? "text-neon-purple" :
    "text-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="glass group relative overflow-hidden rounded-2xl hover:border-neon-purple/30 transition-all duration-300"
    >
      {/* Meme image */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-forge-card">
        <img
          src={meme.image_url}
          alt={meme.prompt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Virality badge */}
        <div className={clsx(
          "absolute top-2 right-2 flex items-center gap-1 glass px-2 py-1 rounded-lg text-xs font-bold",
          viralityColor
        )}>
          <TrendingUp size={10} />
          {meme.virality_score.toFixed(0)}%
        </div>

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-forge-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <ActionBtn icon={Heart}     filled={isFav}   color="pink"   onClick={handleFavorite} />
          <ActionBtn icon={Download}                   color="cyan"   onClick={handleDownload} />
          <ActionBtn icon={Share2}                     color="purple" onClick={handleShare}   />
          <ActionBtn icon={Trash2}    loading={isDeleting} color="red" onClick={handleDelete} />
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-gray-400 truncate">{meme.prompt}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs font-mono text-neon-purple/70">{meme.template_name}</span>
          <span className="text-xs text-gray-500">
            {new Date(meme.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Sub component ──────────────────────────────────────────────────────────────

function ActionBtn({
  icon: Icon,
  filled,
  color,
  loading,
  onClick,
}: {
  icon: React.ElementType;
  filled?: boolean;
  color: "pink" | "cyan" | "purple" | "red";
  loading?: boolean;
  onClick: () => void;
}) {
  const colorMap = {
    pink:   "hover:bg-neon-pink/20   hover:text-neon-pink",
    cyan:   "hover:bg-neon-cyan/20   hover:text-neon-cyan",
    purple: "hover:bg-neon-purple/20 hover:text-neon-purple",
    red:    "hover:bg-red-500/20     hover:text-red-400",
  };
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={clsx(
        "p-2 rounded-lg glass transition-all duration-200 text-gray-400",
        colorMap[color],
        filled && color === "pink" && "text-neon-pink bg-neon-pink/20"
      )}
    >
      <Icon size={16} />
    </button>
  );
}
