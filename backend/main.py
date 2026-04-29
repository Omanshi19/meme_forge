from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from api.routes import memes, templates, users, health

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(title="MemeForge AI API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("static/memes", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(health.router,    prefix="/api",           tags=["health"])
app.include_router(memes.router,     prefix="/api/memes",     tags=["memes"])
app.include_router(templates.router, prefix="/api/templates", tags=["templates"])
app.include_router(users.router,     prefix="/api/users",     tags=["users"])
