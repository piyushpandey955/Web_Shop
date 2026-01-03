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
        
        # Simple system prompt context injection
        system_context = "You are a helpful shopping assistant for Sellix, a all kinds of product shop. Answer questions about any kind of products. Be concise and friendly."
        full_prompt = f"{system_context}\nUser: {request.message}\nAssistant:"
        
        response = model.generate_content(full_prompt)
        return {"response": response.text}
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return {"response": f"Mock AI (Fallback): I received '{request.message}'. (Real AI failed: {str(e)[:50]}...)"}
