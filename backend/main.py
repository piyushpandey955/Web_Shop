from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import sys
import os
from products import router as products_router
from chat import router as chat_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # Allow specific origins to handle credentials properly
    allow_origins=[
        "http://localhost:5173", 
        "https://web-shop-roan-ten.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products_router, prefix="/api")
app.include_router(chat_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
