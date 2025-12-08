import google.generativeai as genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Configure your API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_marketing_content(business_name: str, description: str = None) -> dict:
    """
    Sends business info to Gemini and returns structured marketing JSON
    """
    prompt = f"""
You are a world-class marketing expert for small local businesses.

Business Name: {business_name}
Description: {description or "No description provided"}

Your job is to generate ONLY VALID JSON with this exact structure:

{{
  "needs_clarification": false,
  "clarification_question": "",
  "business_type": "",
  "industry": "",
  "target_audience": "",
  "services_or_products": "",
  "brand_tone": "",
  "facebook_posts": [],
  "instagram_captions": [],
  "google_ads": {{
    "headlines": [],
    "descriptions": []
  }},
  "product_or_service_description": "",
  "seo_keywords": [],
  "hashtags": [],
  "tone_guidelines": ""
}}

RULES:
1. Fill all fields dynamically based on the business name and description.
2. If the name is vague (e.g. "Bella's Place"), set "needs_clarification": true and ask ONE short question.
3. Generate exactly:
   - 3 Facebook posts (100–180 chars)
   - 3 Instagram captions (emotional + CTA)
   - 3 Google ad headlines (≤30 chars)
   - 3 Google ad descriptions (≤90 chars)
   - 1 product/service description (3–4 sentences)
   - 15 SEO keywords (include long-tail)
   - 20 hashtags (5 broad, 10 niche, 5 local/trending)
4. Return ONLY clean JSON.
"""

    try:
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",  # Force JSON
                temperature=0.7,
                top_p=0.95,
            )
        )

        cleaned_text = response.text.strip()
        # Remove code fences if present
        if cleaned_text.startswith("```"):
            cleaned_text = cleaned_text.split("```")[1].strip()
            if cleaned_text.startswith("json"):
                cleaned_text = cleaned_text[4:].strip()

        return json.loads(cleaned_text)

    except Exception as e:
        raise Exception(f"Error generating marketing content: {str(e)}")
