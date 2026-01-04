import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Payment() {
    const { cartItems, cartTotal, clearCart } = useCart()
    const navigate = useNavigate()
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        if (cartItems.length === 0 && !showSuccess) {
            navigate('/')
        }
    }, [cartItems, navigate, showSuccess])

    const handlePayment = () => {
        // Simulate payment processing
        setTimeout(() => {
            setShowSuccess(true)
            clearCart()
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative">
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => navigate('/')}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center animate-fade-in-up">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
                        <p className="text-slate-500 mb-6">Thank you for your purchase. Your order has been placed.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-indigo-600 text-white rounded-lg py-2 font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Checkout</h1>

                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <div className="px-4 py-5 sm:px-6 border-b border-slate-200">
                        <h3 className="text-lg leading-6 font-medium text-slate-900">Order Summary</h3>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-slate-500">Items</dt>
                                <dd className="mt-1 text-sm text-slate-900">
                                    <ul className="divide-y divide-slate-200">
                                        {cartItems.map((item) => (
                                            <li key={item.id} className="py-2 flex justify-between">
                                                <span>{item.quantity}x {item.title}</span>
                                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                            <div className="sm:col-span-2 border-t border-slate-200 pt-4">
                                <div className="flex justify-between items-center">
                                    <dt className="text-base font-medium text-slate-900">Total Amount</dt>
                                    <dd className="text-2xl font-bold text-indigo-600">${cartTotal.toFixed(2)}</dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                    <div className="bg-slate-50 px-4 py-4 sm:px-6 flex justify-end gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Back to Shop
                        </button>
                        <button
                            onClick={handlePayment}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
