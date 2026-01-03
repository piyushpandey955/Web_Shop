# Sellix - Web Shop with AI Assistant

A modern web shop application built with **React, Vite, Tailwind CSS**, and **FastAPI**, featuring an integrated AI shopping assistant powered by **Google Generative AI (Gemini)**.

## Features
- **Modern UI/UX**: Responsive design with glassmorphism effects and smooth animations using Tailwind CSS.
- **Product Catalog**: Fetches real product data from the Fake Store API.
- **AI Shopping Assistant**: Interactive chat widget that answers questions about products (uses Gemini API with a fallback to a mock system).
- **Backend Proxy**: FastAPI backend handling API requests and CORS.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Python, FastAPI, Uvicorn
- **AI**: Google Generative AI (Gemini)

## Setup & Run

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)

### Installation

1. **Backend**:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   # Optional: Add GOOGLE_API_KEY to .env for real AI response
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start Backend**:
   ```bash
   # From root directory
   source backend/venv/bin/activate
   uvicorn backend.main:app --reload --port 8000
   ```

2. **Start Frontend**:
   ```bash
   # From root directory
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
- `backend/`: FastAPI application, API endpoints (`products.py`, `chat.py`).
- `frontend/`: React application, components (`ProductList.jsx`, `ChatWidget.jsx`).
