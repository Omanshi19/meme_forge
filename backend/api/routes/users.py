"""
api/routes/users.py
Stub — no database version.
"""
from fastapi import APIRouter
router = APIRouter()

@router.get("")
async def users_stub():
    return {"message": "Users endpoint — database not connected"}