import React from 'react';
import { X } from 'lucide-react';

type PaymentMethod = 'tarjeta' | 'paypal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  coupon: string;
  setCoupon: (value: string) => void;
  discount: number;
  couponMessage: string | null;
  subtotal: number;
  total: number;
  applyCoupon: () => void;
  onConfirm: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  paymentMethod,
  setPaymentMethod,
  coupon,
  setCoupon,
  discount,
  couponMessage,
  subtotal,
  total,
  applyCoupon,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-150 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-150 flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-2xl rounded-3xl sm:rounded-4xl bg-white shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 gap-3 sm:gap-0">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[.3em] text-gray-500">Pago</p>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Finaliza tu compra</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors shrink-0"
              aria-label="Cerrar pago"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-700">Elige tu medio de pago</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('tarjeta')}
                  className={`rounded-2xl border p-3 sm:p-4 text-left transition ${paymentMethod === 'tarjeta' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white'}`}
                >
                  <span className="block text-xs uppercase tracking-[.2em] text-gray-500">Tarjeta</span>
                  <span className="mt-2 block font-semibold text-sm sm:text-base text-gray-900">Visa / Mastercard</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`rounded-2xl border p-3 sm:p-4 text-left transition ${paymentMethod === 'paypal' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white'}`}
                >
                  <span className="block text-xs uppercase tracking-[.2em] text-gray-500">PayPal</span>
                  <span className="mt-2 block font-semibold text-sm sm:text-base text-gray-900">Pago rápido</span>
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cupón de descuento</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="XYZ123"
                  className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="rounded-2xl bg-indigo-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition whitespace-nowrap"
                >
                  Aplicar
                </button>
              </div>
              {couponMessage && (
                <p className={`mt-3 text-sm ${discount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {couponMessage}
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-3 sm:p-4 space-y-3">
              <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs sm:text-sm text-green-600">
                  <span>Descuento</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-base sm:text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onConfirm}
              className="w-full rounded-2xl bg-indigo-600 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-white font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition"
            >
              Pagar con {paymentMethod === 'tarjeta' ? 'Tarjeta' : 'PayPal'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
