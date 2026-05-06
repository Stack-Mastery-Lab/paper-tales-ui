import type { Order } from '../../types/order';

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 mb-4">
        <span className="text-lg font-bold text-gray-800">Pedido #{order.id}</span>
        <span className="text-sm text-gray-500">{order.date}</span>
        <span 
          className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${
            order.status === 'completado' ? 'bg-green-100 text-green-700' : 
            order.status === 'enviado' ? 'bg-blue-100 text-blue-700' : 
            'bg-yellow-100 text-yellow-700'
          }`}
        >
          {order.status}
        </span>
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {order.items.map((item) => (
          <li key={item.bookId} className="text-sm bg-gray-50 px-4 py-3 rounded-lg flex justify-between items-center gap-4">
            <span className="font-medium text-gray-700 truncate" title={item.title}>
              {item.title}
            </span>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-gray-500 font-medium">x{item.quantity}</span>
              <span className="font-bold text-gray-800 w-16 text-right">${item.price}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
        <span className="text-base font-medium text-gray-600">Total:</span>
        <span className="text-xl font-bold text-gray-800">${order.total}</span>
      </div>
    </div>
  );
};