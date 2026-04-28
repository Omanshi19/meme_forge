"""
models/meme.py
Pydantic v2 models for request/response validation.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class MemeTone(str, Enum):
    gen_z        = "gen_z"
    sarcastic    = "sarcastic"
    dark         = "dark"
    programmer   = "programmer"
    corporate    = "corporate"
    relatable    = "relatable"
    nerd         = "nerd"


class TextZone(BaseModel):
    id:           str
    x:            int
    y:            int
    width:        int
    height:       int
    font_size:    int   = 48
    color:        str   = "#FFFFFF"
    stroke_color: str   = "#000000"


class MemeTemplate(BaseModel):
    id:               str
    name:             str
    image_url:        str
    text_zones:       List[TextZone]
    tags:             List[str]     = []
    popularity_score: int           = 0
    use_count:        int           = 0


class MemeVariation(BaseModel):
    template_id:   str
    template_name: str
    top_text:      str
    bottom_text:   str
    image_url:     str


class MemeDocument(BaseModel):
    id:              Optional[str]        = Field(None, alias="_id")
    user_id:         Optional[str]        = None
    prompt:          str
    tone:            MemeTone             = MemeTone.relatable
    template_id:     str
    template_name:   str
    top_text:        str
    bottom_text:     str
    image_url:       str
    virality_score:  float               = 0.0
    is_favorite:     bool                = False
    variations:      List[MemeVariation] = []
    created_at:      datetime            = Field(default_factory=datetime.utcnow)


# ── Request / Response DTOs ───────────────────────────────────────────────────

class GenerateMemeRequest(BaseModel):
    prompt:   str        = Field(..., min_length=3, max_length=500)
    tone:     MemeTone   = MemeTone.relatable
    category: Optional[str] = None   # e.g. "programmer", "student"
    user_id:  Optional[str] = None

    model_config = {"json_schema_extra": {
        "example": {
            "prompt": "When your code works but you don't know why",
            "tone": "programmer",
        }
    }}


class GenerateMemeResponse(BaseModel):
    meme_id:        str
    prompt:         str
    top_text:       str
    bottom_text:    str
    image_url:      str
    template_name:  str
    virality_score: float
    variations:     List[MemeVariation]


class FavoriteMemeRequest(BaseModel):
    meme_id:    str
    is_favorite: bool


class MemeListResponse(BaseModel):
    memes: List[MemeDocument]
    total: int
    page:  int
    limit: int
