import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { addToCart } = useCart()

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || '/api';
        fetch(`${apiUrl}/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch products", err)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
                    <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-slate-50 p-4 flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-sm font-semibold text-slate-900 mb-1 line-clamp-2" title={product.title}>
                            {product.title}
                        </h3>
                        <p className="text-xs text-slate-500 mb-4 capitalize">{product.category}</p>
                        <div className="mt-auto flex items-center justify-between">
                            <span className="text-lg font-bold text-indigo-600">${product.price}</span>
                            <button
                                onClick={() => addToCart(product)}
                                className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
