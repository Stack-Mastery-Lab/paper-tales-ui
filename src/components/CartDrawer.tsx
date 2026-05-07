import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Monitor, Book as BookIcon, ArrowRight } from 'lucide-react';
import type { Book } from '../types';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: Book[];
    onRemove: (id: number) => void;
    onUpdateQuantity: (id: number, delta: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
    isOpen,
    onClose,
    items,
    onRemove,
    onUpdateQuantity
}) => {

    const navigate = useNavigate();
    const subtotal = items.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-100 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Panel Lateral (Drawer) */}
            <aside
                className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-101 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Cabecera del Carrito */}
                <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <ShoppingBag className="text-indigo-600" size={24} />
                            {items.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {items.length}
                                </span>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Mi Carrito</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                        aria-label="Cerrar carrito"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Cuerpo: Lista de Libros */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                                <ShoppingBag size={40} className="text-gray-300" />
                            </div>
                            <div>
                                <p className="text-gray-800 font-semibold text-lg">Tu carrito está vacío</p>
                                <p className="text-gray-500 text-sm">¡Parece que aún no has elegido tu próxima lectura!</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
                            >
                                Volver a la tienda
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-6 last:border-0 group">
                                {/* Portada */}
                                <div className="relative shrink-0">
                                    <img
                                        src={item.coverUrl}
                                        alt={item.title}
                                        className="w-20 h-28 object-cover rounded-lg shadow-md"
                                    />
                                </div>

                                {/* Info del Libro */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">{item.title}</h4>
                                            <button
                                                onClick={() => onRemove(item.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors ml-2"
                                                title="Eliminar libro"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2 mt-2">
                                            {item.format.toUpperCase() === 'DIGITAL' ? (
                                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                                                    <Monitor size={12} /> Digital
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 px-2 py-0.5 rounded">
                                                    <BookIcon size={12} /> Físico
                                                </span>
                                            )}

                                            <span className="text-xs text-gray-500">$ {item.price?.toFixed(2)}</span>
                                            
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end mt-2">
                                        {/* Controles de cantidad */}
                                        {item.format.toUpperCase() === 'FISICO' ? (
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                                    className="p-1.5 hover:bg-gray-50 text-gray-600 disabled:opacity-20"
                                                    disabled={(item.quantity ?? 1) <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-3 text-xs font-bold text-gray-700 min-w-7.5 text-center">
                                                    {item.quantity ?? 1}
                                                </span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                                    className="p-1.5 hover:bg-gray-50 text-gray-600"
                                                    disabled={item.stock != null && (item.quantity ?? 1) >= item.stock}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-[11px] text-green-600 font-medium">Licencia única</span>
                                        )}

                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-900">
                                                ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pie: Resumen y Checkout */}
                {items.length > 0 && (
                    <div className="p-6 bg-gray-50 border-t space-y-4">
                        <div className="flex justify-between items-center text-gray-800">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-black text-2xl text-indigo-600">${subtotal.toFixed(2)}</span>
                        </div>

                        <button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
                            onClick={() => { onClose(); navigate('/checkout'); }}
                        >
                            Ir al Pago
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                            Compra segura con Relatos de Papel
                        </p>
                    </div>
                )}
            </aside>
        </>
    );
};