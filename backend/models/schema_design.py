"""
MemeForge AI — MongoDB Atlas Schema Design
==========================================
Collections and their document structures.
"""

# ─────────────────────────────────────────────────────────────────────────────
# Collection: memes
# Stores every generated meme
# ─────────────────────────────────────────────────────────────────────────────
MEME_SCHEMA = {
    "_id": "ObjectId (auto)",
    "user_id": "ObjectId | None (null = anonymous)",
    "prompt": "string — original user input",
    "tone": "string — enum: gen_z | sarcastic | dark | programmer | corporate | relatable",
    "template_id": "string — references meme_templates._id",
    "template_name": "string — e.g. 'Drake Hotline Bling'",
    "top_text": "string",
    "bottom_text": "string",
    "image_url": "string — hosted URL (Cloudinary or local /static/)",
    "virality_score": "float 0–100 — AI-predicted virality",
    "is_favorite": "bool",
    "variations": [
        {
            "template_id": "string",
            "top_text": "string",
            "bottom_text": "string",
            "image_url": "string",
        }
    ],
    "created_at": "datetime",
    "updated_at": "datetime",
}

# ─────────────────────────────────────────────────────────────────────────────
# Collection: meme_templates
# Pre-loaded meme templates with metadata
# ─────────────────────────────────────────────────────────────────────────────
TEMPLATE_SCHEMA = {
    "_id": "string — slug e.g. 'drake-hotline-bling'",
    "name": "string — display name",
    "image_url": "string — base template image",
    "text_zones": [
        {
            "id": "string — 'top' | 'bottom' | 'left' | 'right' | custom",
            "x": "int — pixel offset from left",
            "y": "int — pixel offset from top",
            "width": "int",
            "height": "int",
            "font_size": "int",
            "color": "string — hex e.g. '#FFFFFF'",
            "stroke_color": "string",
        }
    ],
    "tags": ["string — e.g. 'comparison', 'reaction', 'programmer'"],
    "popularity_score": "int",
    "use_count": "int",
    "created_at": "datetime",
}

# ─────────────────────────────────────────────────────────────────────────────
# Collection: users
# ─────────────────────────────────────────────────────────────────────────────
USER_SCHEMA = {
    "_id": "ObjectId",
    "email": "string — unique",
    "username": "string — unique",
    "password_hash": "string",
    "avatar_url": "string | None",
    "meme_count": "int",
    "favorite_count": "int",
    "created_at": "datetime",
    "last_login": "datetime",
}

# ─────────────────────────────────────────────────────────────────────────────
# Collection: prompt_suggestions
# Seed data for homepage prompt ideas
# ─────────────────────────────────────────────────────────────────────────────
SUGGESTION_SCHEMA = {
    "_id": "ObjectId",
    "text": "string",
    "category": "string — programmer | student | relationship | work",
    "use_count": "int",
}

# ─────────────────────────────────────────────────────────────────────────────
# Indexes to create on Atlas
# ─────────────────────────────────────────────────────────────────────────────
INDEXES = {
    "memes": [
        {"fields": ["user_id"], "type": "ascending"},
        {"fields": ["created_at"], "type": "descending"},
        {"fields": ["template_id"], "type": "ascending"},
        {"fields": ["is_favorite"], "type": "ascending"},
    ],
    "meme_templates": [
        {"fields": ["popularity_score"], "type": "descending"},
        {"fields": ["tags"], "type": "text"},
    ],
    "users": [
        {"fields": ["email"], "type": "unique"},
        {"fields": ["username"], "type": "unique"},
    ],
}
