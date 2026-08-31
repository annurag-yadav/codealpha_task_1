import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-700 p-8 text-white shadow-soft md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-violet-100">
              New season
            </p>
            <h1 className="max-w-xl text-4xl font-black tracking-tight md:text-5xl">
              Curated essentials for your everyday lifestyle.
            </h1>
            <p className="mt-4 max-w-xl text-base text-violet-100 md:text-lg">
              Discover elevated everyday essentials designed to make life smoother, smarter, and more beautiful.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn-primary bg-white text-violet-700 hover:bg-violet-50">
                Shop best sellers
              </button>
              <button className="btn-secondary border-white/30 bg-white/5 text-white hover:bg-white/10">
                Explore deals
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-violet-100">Fast shipping</p>
              <p className="mt-3 text-3xl font-bold">24h</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-violet-100">Top-rated</p>
              <p className="mt-3 text-3xl font-bold">4.9/5</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm sm:col-span-2 md:col-span-1 lg:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] text-violet-100">Free returns</p>
              <p className="mt-3 text-xl font-semibold">30-day easy returns on every order</p>
            </div>
          </div>
        </div>
      </section>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Featured collection</h2>
          <span className="text-sm text-slate-500">{products.length} premium picks</span>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="h-80 animate-pulse rounded-xl bg-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
