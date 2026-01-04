import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer({ isOpen, onClose }) {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()
    const navigate = useNavigate()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[60] overflow-hidden">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="absolute inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                <div className="w-screen max-w-md pointer-events-auto">
                    <div className="flex h-full flex-col bg-white shadow-xl animate-slide-in-right">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-slate-900">Shopping Cart</h2>
                                <div className="ml-3 flex h-7 items-center">
                                    <button type="button" className="-m-2 p-2 text-slate-400 hover:text-slate-500" onClick={onClose}>
                                        <span className="sr-only">Close panel</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                {cartItems.length === 0 ? (
                                    <p className="text-center text-slate-500 py-10">Your cart is empty.</p>
                                ) : (
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-slate-200">
                                            {cartItems.map((product) => (
                                                <li key={product.id} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-200">
                                                        <img src={product.image} alt={product.title} className="h-full w-full object-contain object-center p-2" />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-slate-900">
                                                                <h3 className="line-clamp-2 pr-4" title={product.title}>{product.title}</h3>
                                                                <p className="ml-4">${(product.price * product.quantity).toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <div className="flex items-center gap-2 border border-slate-300 rounded-lg p-1">
                                                                <button
                                                                    onClick={() => updateQuantity(product.id, -1)}
                                                                    className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded"
                                                                >-</button>
                                                                <span className="w-4 text-center">{product.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(product.id, 1)}
                                                                    className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded"
                                                                >+</button>
                                                            </div>

                                                            <button type="button" onClick={() => removeFromCart(product.id)} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-slate-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-slate-900">
                                <p>Subtotal</p>
                                <p>${cartTotal.toFixed(2)}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-slate-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <button
                                    onClick={() => {
                                        if (cartItems.length > 0) {
                                            onClose()
                                            navigate('/payment')
                                        }
                                    }}
                                    disabled={cartItems.length === 0}
                                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Checkout
                                </button>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-slate-500">
                                <p>
                                    or{' '}
                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={onClose}>
                                        Continue Shopping <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
