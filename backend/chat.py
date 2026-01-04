from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat(request: ChatRequest):
    api_key = os.getenv("GOOGLE_API_KEY")
    print(f"DEBUG: API Key present: {bool(api_key)}, Length: {len(api_key) if api_key else 0}")
    
    if not api_key or len(api_key.strip()) == 0:
        return {"response": f"Mock AI: I received '{request.message}'. (Configure GOOGLE_API_KEY for real AI)"}
    
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Enhanced system prompt for Sellix
        system_context = """
        You are the intelligent shopping assistant for Sellix, a premium web shop that sells a wide variety of high-quality products ranging from electronics and fashion to home goods and lifestyle items.

        Your responsibilities:
        1.  **Product Advice**: Help users find the perfect product for their needs. If they ask for recommendations (e.g., "gift for dad", "summer outfit", "gaming laptop"), ask clarifying questions to narrow down their preferences.
        2.  **Order Support**: Assist with general questions about shipping, returns, and how to use the cart/checkout features.
        3.  **Tone & Style**: Be friendly, professional, and enthusiastic. Keep answers concise but helpful. Use emojis sparingly to add a human touch.
        4.  **Checkout Guidance**: If a user says they want to buy something, guide them to click the "Add to Cart" button on the product card and then proceed to the "Checkout" button in the cart drawer.

        Restrictions:
        - Do not hallucinate specific prices or stock levels if you don't have that data. Instead, encourage the user to browse the "Products" section for live details.
        - If asked about competitors (e.g., Amazon, eBay), politely steer the conversation back to why Sellix is a great choice (e.g., curated selection, great support).

        Now, please answer the user's inquiry based on this persona.
        """
        full_prompt = f"{system_context}\nUser: {request.message}\nAssistant:"
        
        response = model.generate_content(full_prompt)
        return {"response": response.text}
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return {"response": f"Mock AI (Fallback): I received '{request.message}'. (Real AI failed: {str(e)[:50]}...)"}
