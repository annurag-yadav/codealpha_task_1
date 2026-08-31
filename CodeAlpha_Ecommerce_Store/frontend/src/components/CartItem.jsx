import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
        <p className="text-sm text-slate-600">${item.price} each</p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-600">Qty</label>
        <input
          type="number"
          min="1"
          max={item.stock || 10}
          value={item.quantity}
          onChange={(e) =>
            dispatch(
              updateQuantity({
                id: item._id,
                quantity: Number(e.target.value),
              })
            )
          }
          className="w-16 rounded border border-slate-300 px-2 py-1.5 outline-none ring-0"
        />
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={() => dispatch(removeFromCart(item._id))}
          className="mt-2 text-sm font-medium text-red-600 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
