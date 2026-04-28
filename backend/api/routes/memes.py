"""
api/routes/memes.py
Meme generation routes — no database version.
"""

from fastapi import APIRouter, HTTPException
from models.meme import (
    GenerateMemeRequest,
    GenerateMemeResponse,
    MemeVariation,
)
from meme_engine.generator import generate_meme
import uuid

router = APIRouter()


@router.post("/generate", response_model=GenerateMemeResponse)
async def generate(body: GenerateMemeRequest):
    """Generate meme(s) from a user prompt."""
    try:
        result = await generate_meme(
            prompt=body.prompt,
            tone=body.tone,
            category=body.category,
            db=None,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Meme generation failed: {e}")

    primary = result["primary"]

    return GenerateMemeResponse(
        meme_id=str(uuid.uuid4()),
        prompt=body.prompt,
        top_text=primary.top_text,
        bottom_text=primary.bottom_text,
        image_url=primary.image_url,
        template_name=primary.template_name,
        virality_score=result["virality_score"],
        variations=result["variations"],
    )