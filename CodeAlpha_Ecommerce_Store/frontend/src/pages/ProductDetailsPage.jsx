import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../api/axios';
import { addToCart } from '../redux/cartSlice';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="h-80 animate-pulse rounded-xl bg-slate-200" />;
  }

  if (!product) {
    return <div className="card p-8 text-center">Product not found.</div>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="card overflow-hidden p-4">
        <img src={product.image} alt={product.name} className="h-[500px] w-full rounded-xl object-cover" />
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{product.category}</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">{product.name}</h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-brand-600">${product.price}</span>
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        <p className="text-slate-600">{product.description}</p>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700">Quantity</label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-20 rounded border border-slate-300 px-3 py-2 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              dispatch(addToCart({ ...product, quantity: qty }));
              navigate('/cart');
            }}
            className="btn-primary"
          >
            Add to Cart
          </button>
          <button onClick={() => navigate('/')} className="btn-secondary">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
