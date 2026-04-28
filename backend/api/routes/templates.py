"""
api/routes/templates.py
Returns hardcoded templates — no database needed.
"""
from fastapi import APIRouter
from services.template_service import TEMPLATES

router = APIRouter()

@router.get("")
async def list_templates():
    return {"templates": TEMPLATES}

@router.get("/{template_id}")
async def get_template(template_id: str):
    from fastapi import HTTPException
    t = next((t for t in TEMPLATES if t["id"] == template_id), None)
    if not t:
        raise HTTPException(status_code=404, detail="Template not found")
    return t