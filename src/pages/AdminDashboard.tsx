import { Link } from 'react-router-dom';
import { Package, Users, FileText, BarChart3, TrendingUp, Clock, Map, Settings } from 'lucide-react';
import { useProducts, useDistributors, useLeads } from '../contexts/DemoStateContext';

export function AdminDashboard() {
  const { products } = useProducts();
  const { distributors } = useDistributors();
  const { leads, getLeadStats } = useLeads();

  const stats = getLeadStats();
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const conversionRate = stats.total > 0
    ? ((stats.byStatus.converted / stats.total) * 100).toFixed(1)
    : '0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your industrial products platform</p>
        </div>
        <Link
          to="/demo-controls"
          className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Demo Controls
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{products.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <Link to="/admin/products" className="text-sm text-blue-600 hover:underline">
            Manage →
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{distributors.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Distributors</h3>
          <Link to="/admin/distributors" className="text-sm text-blue-600 hover:underline">
            Manage →
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
          <Link to="/admin/leads" className="text-sm text-blue-600 hover:underline">
            Manage →
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{conversionRate}%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
          <Link to="/admin/analytics" className="text-sm text-blue-600 hover:underline">
            View Analytics →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Lead Status Overview</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-3 ${
                    status === 'new' ? 'bg-blue-500' :
                    status === 'assigned' ? 'bg-yellow-500' :
                    status === 'contacted' ? 'bg-purple-500' :
                    status === 'qualified' ? 'bg-indigo-500' :
                    status === 'converted' ? 'bg-green-500' :
                    'bg-red-500'
                  }`} />
                  <span className="text-sm text-gray-600 capitalize">{status}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{lead.companyName}</p>
                  <p className="text-xs text-gray-500">{lead.customerName}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                  lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/admin/leads"
            className="block mt-4 text-center text-sm text-blue-600 hover:underline"
          >
            View All Leads
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          to="/admin/products"
          className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-center"
        >
          <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-blue-900">Manage Products</span>
        </Link>
        <Link
          to="/admin/analytics"
          className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-center"
        >
          <BarChart3 className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-green-900">View Analytics</span>
        </Link>
        <Link
          to="/admin/heatmap"
          className="p-4 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors text-center"
        >
          <Map className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-orange-900">Demand Heatmap</span>
        </Link>
        <Link
          to="/demo-controls"
          className="p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors text-center"
        >
          <Settings className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-purple-900">Demo Controls</span>
        </Link>
      </div>
    </div>
  );
}
