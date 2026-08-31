import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-4">
        <Link
          to={token ? '/' : '/login'}
          className="flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-pink-500 text-sm text-white shadow-lg">
            V
          </span>
          Velora
        </Link>

        {token && (
          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
              Home
            </Link>
            <Link to="/orders" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
              Orders
            </Link>
            <Link to="/cart" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
              Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {token ? (
            <button onClick={logout} className="btn-secondary">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
