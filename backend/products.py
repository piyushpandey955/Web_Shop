from fastapi import APIRouter
import requests

router = APIRouter()

@router.get("/products")
async def get_products():
    response = requests.get("https://fakestoreapi.com/products")
    # Return directly, acts as proxy
    return response.json()
