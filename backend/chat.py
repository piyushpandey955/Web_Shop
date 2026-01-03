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
    if not api_key:
        return {"response": f"Mock AI: I received '{request.message}'. (Configure GOOGLE_API_KEY for real AI)"}
    
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(request.message)
        return {"response": response.text}
    except Exception as e:
        # In production log this, don't expose 500 details always
        print(f"Error calling Gemini: {e}")
        raise HTTPException(status_code=500, detail=str(e))
