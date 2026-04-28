// lib/api.ts — Typed API client

import axios from "axios";
import type { GenerateMemePayload, GeneratedMeme, MemeDocument, MemeTemplate } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${BASE}/api`,
  timeout: 30_000,
});

// ── Memes ─────────────────────────────────────────────────────────────────────

export async function generateMeme(payload: GenerateMemePayload): Promise<GeneratedMeme> {
  const { data } = await api.post<GeneratedMeme>("/memes/generate", payload);
  return data;
}

export async function listMemes(params?: {
  user_id?: string;
  page?: number;
  limit?: number;
}): Promise<{ memes: MemeDocument[]; total: number; page: number; limit: number }> {
  const { data } = await api.get("/memes", { params });
  return data;
}

export async function getMeme(meme_id: string): Promise<MemeDocument> {
  const { data } = await api.get(`/memes/${meme_id}`);
  return data;
}

export async function toggleFavorite(meme_id: string, is_favorite: boolean) {
  const { data } = await api.patch("/memes/favorite", { meme_id, is_favorite });
  return data;
}

export async function deleteMeme(meme_id: string) {
  const { data } = await api.delete(`/memes/${meme_id}`);
  return data;
}

// ── Templates ────────────────────────────────────────────────────────────────

export async function listTemplates(): Promise<{ templates: MemeTemplate[] }> {
  const { data } = await api.get("/templates");
  return data;
}

// ── Health ───────────────────────────────────────────────────────────────────

export async function checkHealth(): Promise<boolean> {
  try {
    await api.get("/health");
    return true;
  } catch {
    return false;
  }
}
