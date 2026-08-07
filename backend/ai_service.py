import os
import json
from dotenv import load_dotenv

load_dotenv()

MOCK_AI = os.getenv("MOCK_AI", "1")


SYSTEM_PROMPT = """
Instructions:
You are an AI assistant that analyzes notes.

Context:
The note belongs to an internal knowledge base.

Input:
The user will provide note content.

Constraints:
Return ONLY valid JSON.
No explanation.
No markdown.
No extra text.

Output Format:
{
  "tags": ["tag1", "tag2", "tag3"],
  "summary": "One sentence summary."
}
"""

def get_ai_response(
    user_message: str,
    system_prompt: str
):

    if MOCK_AI == "1":

        words = user_message.lower().split()

        tags = []

        for word in words:

            clean = word.strip(".,!?")

            if len(clean) > 4 and clean not in tags:
                tags.append(clean)

            if len(tags) == 3:
                break

        summary = " ".join(
            user_message.split()[:20]
        )

        return json.dumps({
            "tags": tags,
            "summary": summary
        })

    raise Exception(
        "Real AI not configured."
    )