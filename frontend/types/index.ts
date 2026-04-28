// types/index.ts — All shared TypeScript interfaces

export type MemeTone =
  | "gen_z"
  | "sarcastic"
  | "dark"
  | "programmer"
  | "corporate"
  | "relatable"
  | "nerd";

export interface MemeVariation {
  template_id:   string;
  template_name: string;
  top_text:      string;
  bottom_text:   string;
  image_url:     string;
}

export interface GeneratedMeme {
  meme_id:        string;
  prompt:         string;
  top_text:       string;
  bottom_text:    string;
  image_url:      string;
  template_name:  string;
  virality_score: number;
  variations:     MemeVariation[];
}

export interface MemeDocument {
  _id:            string;
  prompt:         string;
  tone:           MemeTone;
  template_id:    string;
  template_name:  string;
  top_text:       string;
  bottom_text:    string;
  image_url:      string;
  virality_score: number;
  is_favorite:    boolean;
  variations:     MemeVariation[];
  created_at:     string;
}

export interface MemeTemplate {
  id:               string;
  name:             string;
  image_url:        string;
  tags:             string[];
  popularity_score: number;
  use_count:        number;
}

export interface GenerateMemePayload {
  prompt:   string;
  tone:     MemeTone;
  category?: string;
  user_id?: string;
}

export const TONE_CONFIG: Record<MemeTone, { label: string; emoji: string; color: string }> = {
  gen_z:      { label: "Gen Z",      emoji: "💀", color: "from-pink-500 to-purple-500"  },
  sarcastic:  { label: "Sarcastic",  emoji: "🙄", color: "from-yellow-500 to-orange-500" },
  dark:       { label: "Dark",       emoji: "🖤", color: "from-gray-700 to-gray-900"     },
  programmer: { label: "Programmer", emoji: "💻", color: "from-cyan-500 to-blue-500"    },
  corporate:  { label: "Corporate",  emoji: "📊", color: "from-blue-500 to-indigo-500"  },
  relatable:  { label: "Relatable",  emoji: "😭", color: "from-purple-500 to-pink-500"  },
  nerd:       { label: "Nerd",       emoji: "🤓", color: "from-green-500 to-teal-500"   },
};

export const PROMPT_SUGGESTIONS = [
  "When your code works but you don't know why",
  "Me vs. my productivity on a Monday",
  "When the professor says the exam is easy",
  "That feeling when you finally fix a bug after 6 hours",
  "When someone says 'it'll only take 5 minutes'",
  "Me trying to explain my life choices",
  "When Stack Overflow doesn't have the answer",
  "My brain at 3am vs 9am",
];
