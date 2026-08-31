import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import api from '../api/axios';
import { clearCart } from '../redux/cartSlice';

const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 149 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const payload = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: {
          address: '123 Market Street',
          city: 'New York',
          postalCode: '10001',
          country: 'USA',
        },
        paymentMethod: 'Cash on Delivery',
        itemsPrice: subtotal,
        shippingPrice: shipping,
        totalPrice: total,
      };

      const { data } = await api.post('/orders', payload);
      dispatch(clearCart());
      navigate('/orders');
      console.log('Order created:', data);
    } catch (error) {
      console.error('Checkout failed', error);
      alert(error.response?.data?.message || 'Checkout failed');
    }
  };

  if (!cartItems.length) {
    return (
      <div className="card p-10 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="btn-primary mt-6">
          Shop now
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>

      <aside className="card h-fit p-6">
        <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>

        <div className="mt-6 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatINR(shipping)}</span>
          </div>
          <div className="border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
            <div className="flex justify-between">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
        </div>

        <button onClick={handleCheckout} className="btn-primary mt-6 w-full">
          Proceed to Checkout
        </button>
      </aside>
    </div>
  );
};

export default CartPage;
