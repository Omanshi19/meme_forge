# MemeForge AI 🔥

---
> AI-powered meme generation platform — turn any idea into a viral meme in seconds.
---

## 🚀 Tech Stack

<p align="center">
![Next JS](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=for-the-badge&logo=framer&logoColor=blue)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) 
![Claude API](https://img.shields.io/badge/Claude_AI-D97757?style=for-the-badge&logo=anthropic&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) 
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-001E2B?style=for-the-badge&logo=mongodb&logoColor=00ED64)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)
![Pillow](https://img.shields.io/badge/Pillow-8A2BE2?style=for-the-badge&logo=python&logoColor=white) 
![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=auth0&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
</p>
---
## Photos 

<img width="1440" height="808" alt="image" src="https://github.com/user-attachments/assets/e352d52d-cd79-40fd-b6ee-ebea5701c977" />
---
<img width="1440" height="808" alt="image" src="https://github.com/user-attachments/assets/1a4b2245-e622-4e18-bb3e-a7af687afca0" />


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
| AI Layer    | Grox API (caption generation)         |
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

---

Developed by - Omanshi Kaushal
