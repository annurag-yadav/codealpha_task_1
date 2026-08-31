import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product._id}`} className="block overflow-hidden">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-60 w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{product.category}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{product.name}</h3>
          </div>
          <span className="text-lg font-bold text-emerald-600">{formatINR(product.price)}</span>
        </div>

        <div className="flex items-center gap-1 text-amber-400">
          <span>★</span>
          <span className="text-sm font-medium text-slate-700">{product.rating || 4.8}</span>
          <span className="text-xs text-slate-500">({product.numReviews || 10})</span>
        </div>

        <p className="line-clamp-3 text-sm text-slate-600">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">{product.stock} in stock</span>
          <button
            onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
            className="btn-primary"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
