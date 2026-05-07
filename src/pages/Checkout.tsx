import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ShoppingBag, Monitor, Book as BookIcon, ArrowLeft, CheckCircle } from 'lucide-react';
import type { Book } from '../types';

interface CheckoutContext {
  cartBooks: Book[];
  clearCart: () => void;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cartBooks, clearCart } = useOutletContext<CheckoutContext>();

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const subtotal = cartBooks.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0);
  const total = Math.max(0, subtotal - discount);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    switch (code) {
      case 'A':
        setDiscount(subtotal * 0.1);
        setCouponMessage({ text: 'Descuento aplicado: 10%', ok: true });
        break;
      case 'B':
        setDiscount(subtotal * 0.2);
        setCouponMessage({ text: 'Descuento aplicado: 20%', ok: true });
        break;
      case 'C':
        setDiscount(5);
        setCouponMessage({ text: 'Descuento aplicado: $5', ok: true });
        break;
      default:
        setDiscount(0);
        setCouponMessage({ text: 'Cupón inválido', ok: false });
    }
  };

  const handleConfirmPayment = () => {
    window.alert('¡Tu pedido ha sido realizado con éxito! Gracias por tu compra en Paper Tales.');
    clearCart();
    navigate('/');
  };

  if (cartBooks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
        <ShoppingBag size={64} className="text-gray-300" />
        <p className="text-xl font-bold text-gray-700">Tu carrito está vacío</p>
        <p className="text-gray-500 text-sm">Agrega libros antes de proceder al pago.</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft size={18} />
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-6 text-sm"
      >
        <ArrowLeft size={16} />
        Volver a la tienda
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Resumen de tu pedido</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        {cartBooks.map((item, index) => (
          <div
            key={item.id}
            className={`flex gap-4 p-5 ${index !== cartBooks.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <img
              src={item.coverUrl}
              alt={item.title}
              className="w-16 h-22 object-cover rounded-lg shadow-md shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-sm leading-tight">{item.title}</h3>
                <p className="text-xs text-indigo-500 font-medium mt-0.5">{item.author}</p>
                <div className="mt-2">
                  {item.format.toUpperCase() === 'DIGITAL' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                      <Monitor size={10} /> Digital
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 px-2 py-0.5 rounded">
                      <BookIcon size={10} /> Físico
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">
                  {item.format.toUpperCase() === 'DIGITAL'
                    ? 'Licencia única'
                    : `Cantidad: ${item.quantity ?? 1}`}
                </span>
                <div className="text-right">
                  {(item.quantity ?? 1) > 1 && (
                    <p className="text-xs text-gray-400">${item.price.toFixed(2)} c/u</p>
                  )}
                  <p className="text-sm font-bold text-gray-900">
                    ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Cupón de descuento</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Ingresa tu cupón"
            className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={applyCoupon}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
          >
            Aplicar
          </button>
        </div>
        {couponMessage && (
          <p className={`mt-2 text-sm font-medium ${couponMessage.ok ? 'text-green-600' : 'text-red-500'}`}>
            {couponMessage.text}
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6 space-y-3">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal ({cartBooks.length} {cartBooks.length === 1 ? 'artículo' : 'artículos'})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Descuento</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-gray-500">
          <span>Envío</span>
          <span className="text-green-600 font-medium">Gratis</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-2xl font-black text-indigo-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handleConfirmPayment}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
      >
        <CheckCircle size={20} />
        Confirmar pedido
      </button>

      <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest mt-4">
        Compra segura con Paper Tales
      </p>
    </div>
  );
};

export default Checkout;
