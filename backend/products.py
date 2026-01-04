from fastapi import APIRouter
import requests

router = APIRouter()

@router.get("/products")
async def get_products():
    try:
        # Add User-Agent to avoid some bot blocks
        headers = {"User-Agent": "Mozilla/5.0 (compatible; WebShop/1.0)"}
        response = requests.get("https://fakestoreapi.com/products", headers=headers, timeout=10)
        
        response.raise_for_status() # Raise error for 4xx/5xx
        return response.json()
    except Exception as e:
        print(f"Error fetching products: {e}")
        # If response content exists but isn't JSON, print it for debugging
        if 'response' in locals():
            print(f"Response status: {response.status_code}")
            print(f"Response content snippet: {response.text[:200]}")
        
        # Fallback Mock Data so the app doesn't break
        return [
             {
                "id": 1,
                "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                "price": 109.95,
                "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                "rating": {"rate": 3.9, "count": 120}
            },
            {
                "id": 2,
                "title": "Mens Casual Premium Slim Fit T-Shirts ",
                "price": 22.3,
                "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                "rating": {"rate": 4.1, "count": 259}
            },
             {
                "id": 3,
                "title": "Solid Gold Petite Micropave ",
                "price": 168,
                "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
                "category": "jewelery",
                "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
                "rating": {"rate": 3.9, "count": 70}
            }
        ]
