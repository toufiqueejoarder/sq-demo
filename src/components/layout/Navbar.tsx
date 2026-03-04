import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Zap, User, LayoutDashboard } from 'lucide-react';
import { useDemoControls } from '../../contexts/DemoStateContext';

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/distributors', label: 'Distributors' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, setRole } = useDemoControls();

  const handlePortalClick = (role: 'distributor' | 'admin', path: string) => {
    setRole(role);
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SQ Industrial</span>
            </Link>

            <div className="hidden md:flex items-center ml-10 space-x-1">
              {publicLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/rfq"
              className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
            >
              Request Quote
            </Link>
            <button
              onClick={() => handlePortalClick('distributor', '/distributor')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <User className="w-4 h-4" />
              Distributor Portal
            </button>
            <button
              onClick={() => handlePortalClick('admin', '/admin')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin Panel
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.to)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-200 my-2" />
            <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">
              Portals
            </p>
            <button
              onClick={() => {
                handlePortalClick('distributor', '/distributor');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <User className="w-4 h-4" />
              Distributor Portal
            </button>
            <button
              onClick={() => {
                handlePortalClick('admin', '/admin');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin Panel
            </button>

            <div className="border-t border-gray-200 my-2" />
            <Link
              to="/rfq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg text-center"
            >
              Request Quote
            </Link>
            <div className="px-4 py-2 text-xs text-gray-400">
              Viewing as: <span className="font-medium uppercase">{currentRole}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
