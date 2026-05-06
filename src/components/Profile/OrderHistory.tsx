import ordersData from '../../data/orders.json';
import type { Order } from '../../types/order';
import { OrderCard } from './OrderCard';

interface OrderHistoryProps {
  userId: number;
}

export const OrderHistory = ({ userId }: OrderHistoryProps) => {
  const allOrders = ordersData as Order[];

  const userOrders = allOrders
    .filter((order) => order.userId === userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <section>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 pb-4 border-b border-gray-200 tracking-tight">
        Últimos pedidos
      </h2>

      {userOrders.length === 0 ? (
        <p className="text-gray-500 italic">No tienes pedidos aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
};