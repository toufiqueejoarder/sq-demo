import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Package,
  ChevronDown,
  Check,
  Home,
  LogOut,
  MapPin,
  Building2,
} from 'lucide-react';
import { useDistributors, useDemoControls } from '../../contexts/DemoStateContext';

const navItems = [
  { to: '/distributor', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/distributor/leads', label: 'Assigned Leads', icon: FileText },
  { to: '/distributor/inventory', label: 'Inventory', icon: Package },
];

export function DistributorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const { distributors, currentDistributorId, getCurrentDistributor, setDistributor } = useDistributors();
  const { setRole } = useDemoControls();
  
  const currentDistributor = getCurrentDistributor();

  const isActive = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleDistributorSwitch = (distributorId: string) => {
    setDistributor(distributorId);
    setDropdownOpen(false);
  };

  const handleSignOut = () => {
    setRole('public');
    navigate('/');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Distributor Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {currentDistributor?.name.charAt(0) || 'D'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentDistributor?.name || 'Select Distributor'}
              </p>
              <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {currentDistributor?.division || 'No location'}
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
              <div className="p-2">
                <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase">
                  Switch Distributor
                </p>
                {distributors.map((dist) => (
                  <button
                    key={dist.id}
                    onClick={() => handleDistributorSwitch(dist.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      dist.id === currentDistributorId
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      dist.id === currentDistributorId
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {dist.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{dist.name}</p>
                      <p className="text-xs text-gray-500 truncate">{dist.division}</p>
                    </div>
                    {dist.id === currentDistributorId && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {currentDistributor && (
          <div className="mt-3 px-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Building2 className="w-3.5 h-3.5" />
              <span>{currentDistributor.contactPerson}</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to, item.exact);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Website
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
