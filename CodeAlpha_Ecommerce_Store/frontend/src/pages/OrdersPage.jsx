import { useEffect, useState } from 'react';
import api from '../api/axios';

const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="h-40 animate-pulse rounded-xl bg-slate-200" />;
  }

  if (!orders.length) {
    return (
      <div className="card p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">No orders yet</h2>
        <p className="mt-3 text-slate-600">Your placed orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="card p-6">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Order ID</p>
              <p className="font-semibold text-slate-900">{order._id}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Status</p>
              <p className="font-semibold text-brand-600">{order.status}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Total</p>
              <p className="font-semibold text-slate-900">{formatINR(order.totalPrice)}</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {order.items.map((item) => (
              <div key={`${order._id}-${item.product}`} className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-slate-800">{formatINR(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
