import { useState } from 'react'
import ProductList from './components/ProductList'
import ChatWidget from './components/ChatWidget'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-indigo-100 to-purple-100 skew-y-3 -z-10 origin-top-left" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Sellix
          </h1>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Products</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Deals</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
          </nav>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            Cart (0)
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Curated Tech for You
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the latest gadgets and accessories powered by our AI assistant.
          </p>
        </div>

        <ProductList />
      </main>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default App
