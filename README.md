# Sellix - Web Shop with AI Assistant

A modern e-commerce application built with **React, Vite, Tailwind CSS**, and **FastAPI**, featuring a fully functional shopping cart, checkout flow, and an integrated AI shopping assistant powered by **Google Generative AI (Gemini)**.

## Features

### 🛍️ E-Commerce
- **Product Catalog**: Browsable product listing fetching data from the Fake Store API.
- **Shopping Cart**: 
  - Add products to cart.
  - Adjust functionality (increase/decrease) via a slide-out drawer.
  - Real-time total calculation.
- **Checkout Process**: 
  - Dedicated payment page.
  - Mock "Payment Successful" overlay simulation.

### 🤖 AI Integration
- **Smart Assistant**: Integrated chat widget powered by Gemini (1.5 Flash).
- **Persona**: "Sellix Assistant" - a helpful guide for a general store selling electronics, fashion, and more.
- **Fallback Mode**: Robust error handling that switches to a mock responder if the API key is missing.

### 💻 Technical
- **Modern UI**: Responsive design with glassmorphism, gradients, and smooth animations using Tailwind CSS.
- **State Management**: React Context API (`CartContext`) for global cart state.
- **Routing**: Client-side routing with `react-router-dom`.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router, Lucide React (Icons)
- **Backend**: Python, FastAPI, Uvicorn
- **AI**: Google Generative AI (Gemini)

## Setup & Run

### Prerequisites
- Node.js (v18+)
- Python (v3.11+)

### Installation

1. **Backend Setup**:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
   *Optional: Create a `.env` file in `backend/` and add `GOOGLE_API_KEY=your_key` for real AI responses.*

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start Backend**:
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn main:app --reload --port 8000
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
- `backend/`: FastAPI application
    - `main.py`: Entry point
    - `chat.py`: AI Logic & System Prompt
    - `products.py`: Product API Proxy
- `frontend/`: React application
    - `src/components/`: Reusable UI (`ProductList`, `ChatWidget`, `CartDrawer`)
    - `src/pages/`: Page Components (`Payment`)
    - `src/context/`: Global State (`CartContext`)
