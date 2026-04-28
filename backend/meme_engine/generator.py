"""
meme_engine/generator.py
Core pipeline: prompt → AI caption → template selection → image render → return URLs
"""

from dotenv import load_dotenv
load_dotenv()

import os
import uuid
import asyncio
from typing import Optional
from PIL import Image, ImageDraw, ImageFont
import textwrap
import httpx

from services.ai_service import generate_captions
from services.template_service import pick_best_templates
from models.meme import MemeVariation, MemeTone


STATIC_DIR = "static/memes"
BASE_URL = os.getenv("BACKEND_URL", "http://localhost:8000")


async def generate_meme(
    prompt: str,
    tone: MemeTone,
    category: Optional[str],
    db,
    num_variations: int = 3,
) -> dict:
    """Full meme generation pipeline."""

    # Step 1: Pick best matching templates
    templates = await pick_best_templates(db, prompt, category, n=num_variations)
    if not templates:
        raise ValueError("No meme templates found.")

    # Step 2: Generate captions for each template via AI
    caption_tasks = [
        generate_captions(prompt, tone, t["name"], t.get("tags", []))
        for t in templates
    ]
    captions_list = await asyncio.gather(*caption_tasks)

    # Step 3: Render each meme image
    variations: list[MemeVariation] = []
    for template, captions in zip(templates, captions_list):
        image_url = await render_meme_image(
            template_image_url=template.get("image_url", ""),
            top_text=captions["top_text"],
            bottom_text=captions["bottom_text"],
        )
        variations.append(MemeVariation(
            template_id=template["id"],
            template_name=template["name"],
            top_text=captions["top_text"],
            bottom_text=captions["bottom_text"],
            image_url=image_url,
        ))

    primary = variations[0]
    virality = _predict_virality(prompt, primary.top_text, primary.bottom_text)

    return {
        "primary":        primary,
        "variations":     variations[1:],
        "virality_score": virality,
    }


async def render_meme_image(
    template_image_url: str,
    top_text: str,
    bottom_text: str,
) -> str:
    """Download template image, overlay text, save and return URL."""

    # Download the template image
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.get(template_image_url)
            resp.raise_for_status()
            tmp_path = f"/tmp/{uuid.uuid4()}.jpg"
            with open(tmp_path, "wb") as f:
                f.write(resp.content)
            img = Image.open(tmp_path).convert("RGBA")
    except Exception as e:
        print(f"⚠️  Failed to download template image: {e}")
        # Create a blank placeholder image
        img = Image.new("RGBA", (600, 400), color=(200, 200, 200, 255))

    draw = ImageDraw.Draw(img)
    width, height = img.size

    font_path = _get_font_path()
    font_size = max(28, width // 14)

    _draw_meme_text(draw, top_text,    width, height, font_path, font_size, position="top")
    _draw_meme_text(draw, bottom_text, width, height, font_path, font_size, position="bottom")

    # Save rendered image
    output_filename = f"{uuid.uuid4()}.png"
    output_path = os.path.join(STATIC_DIR, output_filename)
    os.makedirs(STATIC_DIR, exist_ok=True)
    img.convert("RGB").save(output_path, "PNG")

    return f"{BASE_URL}/static/memes/{output_filename}"


def _draw_meme_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    img_width: int,
    img_height: int,
    font_path: str,
    font_size: int,
    position: str = "top",
):
    """Draw classic impact-style meme text with black outline."""
    if not text:
        return

    # Load font
    font = None
    if font_path:
        try:
            font = ImageFont.truetype(font_path, font_size)
        except Exception:
            font = None
    if font is None:
        font = ImageFont.load_default()

    # Wrap text to fit image width
    max_chars = max(10, img_width // (font_size // 2))
    lines = textwrap.wrap(text.upper(), width=max_chars)
    if not lines:
        return

    line_height = font_size + 10
    total_text_height = line_height * len(lines)

    if position == "top":
        start_y = 10
    else:
        start_y = img_height - total_text_height - 10

    stroke_width = max(2, font_size // 12)

    for i, line in enumerate(lines):
        # Measure text width to center it
        bbox = draw.textbbox((0, 0), line, font=font)
        text_w = bbox[2] - bbox[0]
        x = (img_width - text_w) // 2
        y = start_y + i * line_height

        # Draw black outline in 8 directions
        for dx in [-stroke_width, 0, stroke_width]:
            for dy in [-stroke_width, 0, stroke_width]:
                if dx == 0 and dy == 0:
                    continue
                draw.text((x + dx, y + dy), line, font=font, fill=(0, 0, 0, 255))

        # Draw white text on top
        draw.text((x, y), line, font=font, fill=(255, 255, 255, 255))


def _get_font_path() -> str:
    """Find any usable font on Mac or Linux."""
    candidates = [
        "/System/Library/Fonts/Supplemental/Impact.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf",
        "/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            print(f"✅ Using font: {p}")
            return p
    print("⚠️  No font found, using default")
    return ""


def _predict_virality(prompt: str, top: str, bottom: str) -> float:
    """Heuristic virality score 0-100."""
    combined = f"{prompt} {top} {bottom}".lower()
    score = 50.0
    if len(combined) > 20:  score += 5
    if "?" in combined:     score += 8
    if "!" in combined:     score += 6
    caps_ratio = sum(1 for c in combined if c.isupper()) / max(len(combined), 1)
    score += caps_ratio * 10
    keywords = ["when", "me", "nobody", "literally", "every", "this", "why", "how"]
    score += sum(3 for kw in keywords if kw in combined)
    return round(min(score, 99.9), 1)