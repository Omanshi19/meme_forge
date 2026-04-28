# MemeForge AI — Complete Deployment Guide

## Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB Atlas account (free tier)
- Anthropic API key (Claude)
- Railway account (backend)
- Vercel account (frontend)

---

## 1. Local Development Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# → Fill in MONGODB_URI and ANTHROPIC_API_KEY in .env

uvicorn main:app --reload --port 8000
# API docs: http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

npm run dev
# App: http://localhost:3000
```

---

## 2. MongoDB Atlas Setup

1. Create a free cluster at https://cloud.mongodb.com
2. Create a database user (username + password)
3. Whitelist IP: `0.0.0.0/0` (allow all — or your Railway IP)
4. Get the connection string:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/memeforge
   ```
5. Paste into backend `.env` as `MONGODB_URI`

The app will auto-seed meme templates on first startup.

---

## 3. Deploy Backend to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli
railway login

cd backend
railway init          # creates a new project
railway up            # deploys

# Set environment variables in Railway dashboard:
# MONGODB_URI        = your Atlas connection string
# ANTHROPIC_API_KEY  = sk-ant-...
# BACKEND_SECRET_KEY = a strong random string
# BACKEND_URL        = https://your-app.railway.app  (your Railway URL)
```

Or deploy via GitHub:
1. Push repo to GitHub
2. Railway → New Project → Deploy from GitHub repo
3. Select the `backend/` directory as root
4. Add env vars in the Railway dashboard

---

## 4. Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel
cd frontend
vercel                # follow prompts

# Set environment variables:
# NEXT_PUBLIC_API_URL = https://your-backend.railway.app
```

Or deploy via GitHub:
1. Vercel → New Project → Import from GitHub
2. Set Root Directory to `frontend/`
3. Add `NEXT_PUBLIC_API_URL` env var pointing to Railway backend

---

## 5. Verify Deployment

```bash
# Check backend health
curl https://your-backend.railway.app/api/health
# Expected: {"status":"ok","service":"MemeForge AI Backend"}

# Check templates seeded
curl https://your-backend.railway.app/api/templates
# Expected: JSON with 10 meme templates
```

---

## 6. Environment Variable Reference

### Backend (.env)
| Variable             | Description                        |
|----------------------|------------------------------------|
| MONGODB_URI          | MongoDB Atlas connection string    |
| MONGODB_DB_NAME      | Database name (default: memeforge) |
| ANTHROPIC_API_KEY    | Claude API key                     |
| BACKEND_SECRET_KEY   | JWT signing secret                 |
| BACKEND_URL          | Your Railway deployment URL        |

### Frontend (.env.local)
| Variable              | Description                      |
|-----------------------|----------------------------------|
| NEXT_PUBLIC_API_URL   | FastAPI backend URL              |

---

## 7. Folder → Deployment Mapping

```
memeforge-ai/
├── backend/   →  Railway  (Python FastAPI)
└── frontend/  →  Vercel   (Next.js)
```

Both services connect to the same MongoDB Atlas cluster.
