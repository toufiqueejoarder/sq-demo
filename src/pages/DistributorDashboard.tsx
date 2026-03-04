import { Link } from 'react-router-dom';
import { FileText, Package, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useLeads, useDistributors, useProducts } from '../contexts/DemoStateContext';

export function DistributorDashboard() {
  const { leads, getLeadsByDistributor } = useLeads();
  const { getCurrentDistributor, currentDistributorId } = useDistributors();
  const { products } = useProducts();

  const distributor = getCurrentDistributor();
  const distributorId = currentDistributorId || '';
  const assignedLeads = getLeadsByDistributor(distributorId);

  const newLeads = assignedLeads.filter((l) => l.status === 'assigned');
  const activeLeads = assignedLeads.filter((l) => ['contacted', 'qualified'].includes(l.status));
  const convertedLeads = assignedLeads.filter((l) => l.status === 'converted');

  const availableProducts = distributor?.inventory.filter((i) => i.available).length || 0;

  const recentLeads = [...assignedLeads]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Distributor Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {distributor?.contactPerson || 'Distributor'}
        </p>
        {distributor && (
          <p className="text-sm text-gray-500 mt-1">
            {distributor.name} &mdash; {distributor.division}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{newLeads.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">New Leads</h3>
          <p className="text-xs text-gray-400">Awaiting contact</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{activeLeads.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Active Leads</h3>
          <p className="text-xs text-gray-400">In progress</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{convertedLeads.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Converted</h3>
          <p className="text-xs text-gray-400">This period</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {availableProducts}/{products.length}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Products Available</h3>
          <Link to="/distributor/inventory" className="text-xs text-blue-600 hover:underline">
            Manage Inventory →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Assigned Leads</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>

          {recentLeads.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No leads assigned yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {lead.companyName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {lead.customerName} &bull; {lead.division}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        lead.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : lead.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {lead.priority}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        lead.status === 'assigned'
                          ? 'bg-blue-100 text-blue-700'
                          : lead.status === 'contacted'
                          ? 'bg-purple-100 text-purple-700'
                          : lead.status === 'qualified'
                          ? 'bg-indigo-100 text-indigo-700'
                          : lead.status === 'converted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link
            to="/distributor/leads"
            className="block mt-4 text-center text-sm text-blue-600 hover:underline"
          >
            View All Leads
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <Link
              to="/distributor/leads"
              className="block w-full px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors text-center"
            >
              View All Assigned Leads
            </Link>
            <Link
              to="/distributor/inventory"
              className="block w-full px-4 py-3 bg-gray-50 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              Manage Inventory
            </Link>
          </div>

          {distributor && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Coverage Area</h3>
              <div className="flex flex-wrap gap-2">
                {distributor.coverageArea.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
