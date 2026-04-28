# MemeForge AI 🔥

> AI-powered meme generation platform — turn any idea into a viral meme in seconds.

---

## Architecture Overview

```
memeforge-ai/
├── frontend/                    # Next.js 14 App Router
│   ├── app/
│   │   ├── page.tsx             # Homepage / Landing
│   │   ├── layout.tsx           # Root layout
│   │   ├── generator/
│   │   │   └── page.tsx         # Meme generator UI
│   │   ├── gallery/
│   │   │   └── page.tsx         # Meme gallery / history
│   │   └── history/
│   │       └── page.tsx         # User meme history
│   ├── components/
│   │   ├── ui/                  # Reusable base UI (buttons, inputs, cards)
│   │   ├── meme/                # Meme-specific components
│   │   ├── layout/              # Navbar, footer, sidebar
│   │   └── animations/          # Framer Motion animation wrappers
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # API clients, utilities
│   ├── types/                   # TypeScript interfaces
│   └── styles/                  # Global CSS + Tailwind config
│
├── backend/                     # FastAPI Python backend
│   ├── api/
│   │   └── routes/              # Route handlers (memes, templates, users)
│   ├── services/                # Business logic layer
│   ├── models/                  # Pydantic + MongoDB models
│   ├── meme_engine/             # Core meme generation pipeline
│   └── utils/                   # Helpers, constants
│
├── templates/
│   └── meme_templates/          # Base meme image files (.jpg/.png)
│
└── assets/                      # Fonts, icons, static assets
```

---

## Tech Stack

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Frontend    | Next.js 14, TypeScript, Tailwind, Framer Motion |
| Backend     | FastAPI, Python 3.11+                   |
| AI Layer    | Claude API (caption generation)         |
| Image       | Pillow (PIL), OpenCV                    |
| Database    | MongoDB Atlas                           |
| Auth        | NextAuth.js (JWT)                       |
| Deployment  | Vercel (FE), Railway (BE), Atlas (DB)   |

---

## Phases

| Phase | Description              | Status |
|-------|--------------------------|--------|
| 1     | Architecture & Setup     | ✅     |
| 2     | FastAPI Backend          | ✅     |
| 3     | Next.js Frontend         | ✅     |
| 4     | Frontend-Backend Integration | ✅ |
| 5     | Deployment               | ✅     |
