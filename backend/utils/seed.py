"""
utils/seed.py
Seeds the database with popular meme templates on first startup.
Uses Imgflip's free public templates.
"""

from datetime import datetime

MEME_TEMPLATES_SEED = [
    {
        "id": "drake-hotline-bling",
        "name": "Drake Hotline Bling",
        "image_url": "https://i.imgflip.com/30b1gx.jpg",
        "text_zones": [
            {"id": "top",    "x": 290, "y": 20,  "width": 280, "height": 200, "font_size": 36, "color": "#000000", "stroke_color": "#FFFFFF"},
            {"id": "bottom", "x": 290, "y": 260, "width": 280, "height": 200, "font_size": 36, "color": "#000000", "stroke_color": "#FFFFFF"},
        ],
        "tags": ["comparison", "preference", "rejection", "programmer", "relatable"],
        "popularity_score": 100,
        "use_count": 0,
    },
    {
        "id": "distracted-boyfriend",
        "name": "Distracted Boyfriend",
        "image_url": "https://i.imgflip.com/1ur9b0.jpg",
        "text_zones": [
            {"id": "top",    "x": 320, "y": 170, "width": 150, "height": 60, "font_size": 28, "color": "#FFFFFF", "stroke_color": "#000000"},
            {"id": "bottom", "x": 10,  "y": 230, "width": 140, "height": 60, "font_size": 28, "color": "#FFFFFF", "stroke_color": "#000000"},
        ],
        "tags": ["distraction", "temptation", "comparison", "relatable", "programmer"],
        "popularity_score": 95,
        "use_count": 0,
    },
    {
        "id": "two-buttons",
        "name": "Two Buttons",
        "image_url": "https://i.imgflip.com/1g8my4.jpg",
        "text_zones": [
            {"id": "top",    "x": 20,  "y": 10,  "width": 180, "height": 80, "font_size": 28, "color": "#000000", "stroke_color": "#FFFFFF"},
            {"id": "bottom", "x": 200, "y": 10,  "width": 180, "height": 80, "font_size": 28, "color": "#000000", "stroke_color": "#FFFFFF"},
        ],
        "tags": ["decision", "dilemma", "choice", "programmer", "relatable", "stress"],
        "popularity_score": 90,
        "use_count": 0,
    },
    {
        "id": "change-my-mind",
        "name": "Change My Mind",
        "image_url": "https://i.imgflip.com/24y43o.jpg",
        "text_zones": [
            {"id": "top", "x": 120, "y": 200, "width": 350, "height": 100, "font_size": 32, "color": "#000000", "stroke_color": "#FFFFFF"},
            {"id": "bottom", "x": 120, "y": 300, "width": 350, "height": 60, "font_size": 26, "color": "#444444", "stroke_color": "#FFFFFF"},
        ],
        "tags": ["opinion", "debate", "argument", "bold", "statement"],
        "popularity_score": 85,
        "use_count": 0,
    },
    {
        "id": "this-is-fine",
        "name": "This Is Fine",
        "image_url": "https://i.imgflip.com/wxica.jpg",
        "text_zones": [
            {"id": "top",    "x": 20, "y": 10,  "width": 250, "height": 60,  "font_size": 30, "color": "#FFFFFF", "stroke_color": "#000000"},
            {"id": "bottom", "x": 20, "y": 200, "width": 250, "height": 60,  "font_size": 30, "color": "#FFFFFF", "stroke_color": "#000000"},
        ],
        "tags": ["stress", "disaster", "fine", "programmer", "relatable", "work", "student"],
        "popularity_score": 92,
        "use_count": 0,
    },
    {
        "id": "galaxy-brain",
        "name": "Galaxy Brain",
        "image_url": "https://i.imgflip.com/2wifvo.jpg",
        "text_zones": [
            {"id": "top",    "x": 170, "y": 10,  "width": 250, "height": 50, "font_size": 26, "color": "#000000", "stroke_color": "#FFFFFF"},
            {"id": "bottom", "x": 170, "y": 360, "width": 250, "height": 50, "font_size": 26, "color": "#FFFFFF", "stroke_color": "#000000"},
        ],
        "tags": ["big brain", "logic", "smart", "galaxy", "nerd", "programmer"],
        "popularity_score": 80,
        "use_count": 0,
    },
    {
        "id": "expanding-brain",
        "name": "Expanding Brain",
        "image_url": "https://i.imgflip.com/1jwhww.jpg",
        "text_zones": [
            {"id": "top",    "x": 10, "y": 10,  "width": 200, "height": 80,  "font_size": 24, "color": "#000000", "stroke_color": "#FFFFFF"},
            {"id": "bottom", "x": 10, "y": 370, "width": 200, "height": 80,  "font_size": 24, "color": "#FFFFFF", "stroke_color": "#000000"},
        ],
        "tags": ["escalation", "smart", "nerd", "comparison", "big brain"],
        "popularity_score": 82,
        "use_count": 0,
    },
    {
        "id": "gru-plan",
        "name": "Gru's Plan",
        "image_url": "https://i.imgflip.com/26am.jpg",
        "text_zones": [
            {"id": "top",    "x": 20, "y": 10,  "width": 260, "height": 80, "font_size": 28, "color": "#000000", "stroke_color": "#FFFFFF"},
            {"id": "bottom", "x": 20, "y": 280, "width": 260, "height": 80, "font_size": 28, "color": "#000000", "stroke_color": "#FFFFFF"},
        ],
        "tags": ["plan", "backfire", "fail", "programmer", "relatable", "irony"],
        "popularity_score": 88,
        "use_count": 0,
    },
    {
        "id": "woman-yelling-cat",
        "name": "Woman Yelling at Cat",
        "image_url": "https://i.imgflip.com/345v97.jpg",
        "text_zones": [
            {"id": "top",    "x": 10,  "y": 10,  "width": 260, "height": 120, "font_size": 30, "color": "#FFFFFF", "stroke_color": "#000000"},
            {"id": "bottom", "x": 270, "y": 10,  "width": 260, "height": 120, "font_size": 30, "color": "#FFFFFF", "stroke_color": "#000000"},
        ],
        "tags": ["argument", "reaction", "denial", "cat", "relatable", "funny"],
        "popularity_score": 93,
        "use_count": 0,
    },
    {
        "id": "roll-safe",
        "name": "Roll Safe Think About It",
        "image_url": "https://i.imgflip.com/1h7in3.jpg",
        "text_zones": [
            {"id": "top",    "x": 20, "y": 10,  "width": 520, "height": 70, "font_size": 30, "color": "#FFFFFF", "stroke_color": "#000000"},
            {"id": "bottom", "x": 20, "y": 280, "width": 520, "height": 70, "font_size": 30, "color": "#FFFFFF", "stroke_color": "#000000"},
        ],
        "tags": ["loophole", "smart", "lazy", "logic", "programmer", "relatable"],
        "popularity_score": 83,
        "use_count": 0,
    },
]


async def seed_templates(db=None):
    """
    Insert meme templates if collection is empty.
    Called on app startup.
    """
    from utils.database import get_db
    if db is None:
        try:
            db = get_db()
        except Exception:
            print("⚠️  Skipping seed: DB not ready")
            return

    count = await db["meme_templates"].count_documents({})
    if count > 0:
        print(f"✅ Templates already seeded ({count} found). Skipping.")
        return

    now = datetime.utcnow()
    docs = [{**t, "created_at": now} for t in MEME_TEMPLATES_SEED]
    await db["meme_templates"].insert_many(docs)
    print(f"🌱 Seeded {len(docs)} meme templates.")
