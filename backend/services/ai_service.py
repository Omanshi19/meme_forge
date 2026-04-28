from dotenv import load_dotenv
load_dotenv()

import os
import json
import re
from typing import List
from models.meme import MemeTone

TONE_INSTRUCTIONS = {
    MemeTone.gen_z:      "Write in Gen Z brainrot style. Use 'no cap', 'fr fr', 'lowkey', 'slay', 'bussin', 'it's giving', 'understood the assignment'. Be chaotic and unhinged.",
    MemeTone.sarcastic:  "Be extremely sarcastic and passive aggressive. Say the complete opposite of what you mean. Drip with irony.",
    MemeTone.dark:       "Write dark humor. Morbid, nihilistic, bleak but clever. Think: existential dread meets comedy.",
    MemeTone.programmer: "Write programmer humor. Reference: bugs, Stack Overflow, git blame, 'works on my machine', leetcode, deadline, coffee, production crashes, copy-pasting from Stack Overflow.",
    MemeTone.corporate:  "Write corporate satire. Use buzzwords: synergy, bandwidth, circle back, pivot, move the needle, low-hanging fruit, take this offline.",
    MemeTone.relatable:  "Write universally relatable humor. Self-deprecating, painfully accurate about everyday life struggles. Everyone has felt this.",
    MemeTone.nerd:       "Write nerd humor. Reference science, math, physics, anime, Lord of the Rings, Star Wars, Marvel, coding theory.",
}


async def generate_captions(
    prompt: str,
    tone: MemeTone,
    template_name: str,
    template_tags: List[str],
) -> dict:
    api_key = os.getenv("GROQ_API_KEY", "")
    if not api_key:
        print("⚠️  GROQ_API_KEY not set. Using fallback.")
        return _fallback_captions(prompt, tone)

    try:
        from groq import Groq
        client = Groq(api_key=api_key)
        tone_instruction = TONE_INSTRUCTIONS.get(tone, TONE_INSTRUCTIONS[MemeTone.relatable])

        user_prompt = f"""You are the funniest meme writer on the internet. You write captions that make people laugh out loud and share immediately.

MEME TEMPLATE: "{template_name}"
USER'S IDEA: "{prompt}"
HUMOR TONE: {tone_instruction}

Write a HILARIOUS and CLEVER meme caption for this template based on the user's idea.

Rules:
- Top text sets up the situation (max 8 words)
- Bottom text delivers the punchline (max 8 words)  
- Make it genuinely funny, not generic
- Use the tone instruction strictly
- Think about what makes this template funny (e.g. Drake = rejecting one thing, preferring another)
- Be specific and creative, not generic

Reply ONLY with this JSON, nothing else:
{{"top_text": "setup here", "bottom_text": "punchline here"}}"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": user_prompt}],
            max_tokens=120,
            temperature=1.0,
        )

        raw = response.choices[0].message.content.strip()
        raw = re.sub(r"```json|```", "", raw).strip()
        
        # Find JSON in response
        match = re.search(r'\{.*?\}', raw, re.DOTALL)
        if match:
            raw = match.group()
        
        data = json.loads(raw)
        return {
            "top_text":    data.get("top_text", "")[:80],
            "bottom_text": data.get("bottom_text", "")[:80],
        }

    except Exception as e:
        print(f"⚠️  Groq caption generation failed: {e}")
        return _fallback_captions(prompt, tone)


def _fallback_captions(prompt: str, tone: MemeTone) -> dict:
    words = prompt.split()
    mid = len(words) // 2 or 1
    top    = " ".join(words[:mid]).capitalize()
    bottom = " ".join(words[mid:]).capitalize() or "Me pretending it's fine"
    return {"top_text": top, "bottom_text": bottom}