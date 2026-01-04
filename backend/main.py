from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import sys
import os

# Add current directory to path so imports work when running from root (Vercel)
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from products import router as products_router
from chat import router as chat_router
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products_router, prefix="/api")
app.include_router(chat_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
