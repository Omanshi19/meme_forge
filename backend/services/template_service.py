from dotenv import load_dotenv
load_dotenv()

from typing import Optional, List
import random

TEMPLATES = [
    {
        "id": "drake-hotline-bling",
        "name": "Drake Hotline Bling",
        "image_url": "https://i.imgflip.com/30b1gx.jpg",
        "text_zones": [],
        "tags": ["comparison", "preference", "rejection", "programmer", "relatable", "choosing", "vs"],
        "popularity_score": 100,
    },
    {
        "id": "distracted-boyfriend",
        "name": "Distracted Boyfriend",
        "image_url": "https://i.imgflip.com/1ur9b0.jpg",
        "text_zones": [],
        "tags": ["distraction", "temptation", "relatable", "programmer", "ignoring", "attracted"],
        "popularity_score": 95,
    },
    {
        "id": "this-is-fine",
        "name": "This Is Fine",
        "image_url": "https://i.imgflip.com/wxica.jpg",
        "text_zones": [],
        "tags": ["stress", "disaster", "programmer", "relatable", "student", "chaos", "fine", "burning"],
        "popularity_score": 92,
    },
    {
        "id": "woman-yelling-cat",
        "name": "Woman Yelling at Cat",
        "image_url": "https://i.imgflip.com/345v97.jpg",
        "text_zones": [],
        "tags": ["argument", "reaction", "funny", "relatable", "angry", "denial", "yelling"],
        "popularity_score": 93,
    },
    {
        "id": "gru-plan",
        "name": "Gru's Plan",
        "image_url": "https://i.imgflip.com/26am.jpg",
        "text_zones": [],
        "tags": ["plan", "backfire", "programmer", "relatable", "mistake", "oops", "unexpected"],
        "popularity_score": 88,
    },
    {
        "id": "two-buttons",
        "name": "Two Buttons",
        "image_url": "https://i.imgflip.com/1g8my4.jpg",
        "text_zones": [],
        "tags": ["decision", "dilemma", "programmer", "stress", "choice", "sweating", "both"],
        "popularity_score": 90,
    },
    {
        "id": "roll-safe",
        "name": "Roll Safe",
        "image_url": "https://i.imgflip.com/1h7in3.jpg",
        "text_zones": [],
        "tags": ["loophole", "smart", "lazy", "programmer", "relatable", "genius", "avoid", "trick"],
        "popularity_score": 83,
    },
    {
        "id": "galaxy-brain",
        "name": "Galaxy Brain",
        "image_url": "https://i.imgflip.com/2wifvo.jpg",
        "text_zones": [],
        "tags": ["big brain", "logic", "smart", "nerd", "programmer", "overthinking", "galaxy"],
        "popularity_score": 80,
    },
    {
        "id": "expanding-brain",
        "name": "Expanding Brain",
        "image_url": "https://i.imgflip.com/1jwhww.jpg",
        "text_zones": [],
        "tags": ["escalation", "smart", "nerd", "levels", "upgrade", "next level", "evolution"],
        "popularity_score": 82,
    },
    {
        "id": "surprised-pikachu",
        "name": "Surprised Pikachu",
        "image_url": "https://i.imgflip.com/2kbn1e.jpg",
        "text_zones": [],
        "tags": ["surprised", "obvious", "consequence", "predictable", "shocked", "really", "expected"],
        "popularity_score": 91,
    },
    {
        "id": "uno-reverse",
        "name": "UNO Reverse Card",
        "image_url": "https://i.imgflip.com/3lmzyx.jpg",
        "text_zones": [],
        "tags": ["reverse", "comeback", "payback", "karma", "nope", "turn around", "gen z"],
        "popularity_score": 78,
    },
    {
        "id": "panik-kalm",
        "name": "Panik Kalm Panik",
        "image_url": "https://i.imgflip.com/3qqmuh.jpg",
        "text_zones": [],
        "tags": ["panic", "calm", "anxiety", "student", "exam", "programmer", "relief", "stress"],
        "popularity_score": 86,
    },
    {
        "id": "always-has-been",
        "name": "Wait It's All Ohio / Always Has Been",
        "image_url": "https://i.imgflip.com/46e43q.jpg",
        "text_zones": [],
        "tags": ["revelation", "always", "truth", "astronaut", "discovery", "gen z", "dark"],
        "popularity_score": 79,
    },
    {
        "id": "brain-on-fire",
        "name": "Monkey Puppet",
        "image_url": "https://i.imgflip.com/3bg5b8.jpg",
        "text_zones": [],
        "tags": ["awkward", "caught", "side eye", "uncomfortable", "relatable", "noticed", "oops"],
        "popularity_score": 85,
    },
]

TONE_TEMPLATE_BIAS = {
    "gen_z":      ["uno-reverse", "always-has-been", "surprised-pikachu", "monkey-puppet", "distracted-boyfriend"],
    "sarcastic":  ["roll-safe", "gru-plan", "drake-hotline-bling", "woman-yelling-cat", "panik-kalm"],
    "dark":       ["this-is-fine", "always-has-been", "expanding-brain", "galaxy-brain", "panik-kalm"],
    "programmer": ["this-is-fine", "two-buttons", "roll-safe", "drake-hotline-bling", "gru-plan"],
    "corporate":  ["two-buttons", "drake-hotline-bling", "distracted-boyfriend", "roll-safe", "panik-kalm"],
    "relatable":  ["distracted-boyfriend", "panik-kalm", "surprised-pikachu", "woman-yelling-cat", "this-is-fine"],
    "nerd":       ["galaxy-brain", "expanding-brain", "roll-safe", "always-has-been", "gru-plan"],
}


async def pick_best_templates(
    db,
    prompt: str,
    category: Optional[str],
    n: int = 3,
) -> List[dict]:
    prompt_lower = prompt.lower()

    # Score each template
    scored = []
    for t in TEMPLATES:
        score = 0
        for tag in t["tags"]:
            if tag in prompt_lower:
                score += 3
        # partial word match
        words = prompt_lower.split()
        for word in words:
            for tag in t["tags"]:
                if word in tag or tag in word:
                    score += 1
        scored.append((score, t))

    scored.sort(key=lambda x: (x[0], x[1]["popularity_score"]), reverse=True)

    # Get top matches
    top_matches = [t for _, t in scored[:6]]

    # Shuffle slightly so we don't always return same 3
    random.shuffle(top_matches)

    return top_matches[:n]