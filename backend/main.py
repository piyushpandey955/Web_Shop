from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import sys
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Robust import strategy: try relative (for Vercel/Package), fallback to absolute (for Local/Script)
try:
    from .products import router as products_router
    from .chat import router as chat_router
except ImportError:
    from products import router as products_router
    from chat import router as chat_router

# Health Check
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Backend is running"}

app.include_router(products_router, prefix="/api")
app.include_router(chat_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
