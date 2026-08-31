import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post('/auth/login', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center py-10">
      <div className="mx-auto flex max-w-5xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
        <div className="hidden w-1/2 bg-gradient-to-br from-slate-900 via-indigo-900 to-emerald-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 flex items-center gap-3 text-2xl font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg">V</span>
              Velora
            </div>
            <h2 className="max-w-sm text-4xl font-bold leading-tight">Welcome back to smarter shopping.</h2>
            <p className="mt-4 max-w-sm text-sm text-slate-200">
              Access your saved carts, order history, and curated essentials every day.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-200">Why shoppers love us</p>
            <p className="mt-3 text-lg font-medium">Fast delivery • Trusted products • Easy returns</p>
          </div>
        </div>

        <div className="w-full p-8 sm:p-10 lg:w-1/2">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">Account access</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Login</h2>
            <p className="mt-2 text-sm text-slate-500">Sign in to continue your shopping journey</p>
          </div>

          {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-base font-semibold hover:from-emerald-700 hover:to-teal-700">
              Login to your account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            New here?{' '}
            <Link to="/register" className="font-semibold text-emerald-600 transition hover:text-emerald-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
