from fastapi import APIRouter

import requests

router = APIRouter()

@router.get("/products")
async def get_products():
    """
    Fetches product data from EscuelaJS API.
    Includes an adapter to transform the data to match the frontend's expected schema.
    """
    try:
        url = "https://api.escuelajs.co/api/v1/products"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        raw_products = response.json()
        
        # Transform data to match existing styling/frontend expectations
        mapped_products = []
        for item in raw_products:
            # Extract first image or use placeholder
            image_url = item.get("images", [""])[0] if item.get("images") else "https://picsum.photos/400?grayscale"
            
            # Clean up image URL strings (EscuelaJS sometimes returns raw JSON strings in the list)
            if image_url.startswith('["') and image_url.endswith('"]'):
                 image_url = image_url[2:-2]

            mapped_item = {
                "id": item.get("id"),
                "title": item.get("title"),
                "price": item.get("price"),
                "description": item.get("description"),
                "category": item.get("category", {}).get("name", "General"), # Flatten object to string
                "image": image_url, 
                "rating": {"rate": 4.5, "count": 10} # Inject missing rating
            }
            mapped_products.append(mapped_item)
            
        return mapped_products

    except Exception as e:
        print(f"Error fetching from EscuelaJS: {e}")
        # Fallback to empty list or local error message if API fails
        return [{"id": 0, "title": "Error fetching data from API", "price": 0, "image": "", "category": "error"}]


