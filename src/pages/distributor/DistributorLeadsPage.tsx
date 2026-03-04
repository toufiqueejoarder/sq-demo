import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Filter,
  Phone,
  Mail,
  Building2,
  Calendar,
  Package,
  ChevronDown,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
} from 'lucide-react';
import { useLeads, useProducts, useDistributors } from '../../contexts/DemoStateContext';
import type { LeadStatus } from '../../types';

const statusOptions: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'assigned', label: 'Assigned', color: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Contacted', color: 'bg-purple-100 text-purple-700' },
  { value: 'qualified', label: 'Qualified', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'converted', label: 'Converted', color: 'bg-green-100 text-green-700' },
  { value: 'lost', label: 'Lost', color: 'bg-red-100 text-red-700' },
];

export function DistributorLeadsPage() {
  const { getLeadsByDistributor, updateLeadStatus } = useLeads();
  const { getProductById } = useProducts();
  const { currentDistributorId } = useDistributors();

  const distributorId = currentDistributorId || '';
  const assignedLeads = getLeadsByDistributor(distributorId);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  const filteredLeads = assignedLeads.filter((lead) => {
    const matchesSearch =
      lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
  };

  const getStatusStyle = (status: LeadStatus) => {
    return statusOptions.find((s) => s.value === status)?.color || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: LeadStatus) => {
    switch (status) {
      case 'converted':
        return <CheckCircle className="w-4 h-4" />;
      case 'lost':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/distributor"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assigned Leads</h1>
        <p className="text-gray-600">Manage and update the status of leads assigned to you</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, company, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'all')}
              className="pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Status</option>
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {statusOptions.map((status) => {
          const count = assignedLeads.filter((l) => l.status === status.value).length;
          return (
            <button
              key={status.value}
              onClick={() => setStatusFilter(status.value)}
              className={`p-4 rounded-xl border transition-all ${
                statusFilter === status.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-500">{status.label}</p>
            </button>
          );
        })}
      </div>

      {/* Results */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredLeads.length} of {assignedLeads.length} leads
      </p>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => {
          const product = getProductById(lead.productId);
          const isExpanded = expandedLead === lead.id;

          return (
            <div
              key={lead.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{lead.companyName}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-1 ${getStatusStyle(lead.status)}`}>
                        {getStatusIcon(lead.status)}
                        {lead.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        lead.priority === 'high' ? 'bg-red-100 text-red-700' :
                        lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {lead.priority} priority
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Building2 className="w-4 h-4 mr-1" />
                        {lead.customerName}
                      </span>
                      <span className="flex items-center">
                        <Package className="w-4 h-4 mr-1" />
                        {product?.name || 'Unknown Product'}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {lead.phone}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {lead.email}
                        </div>
                      </div>

                      <h4 className="font-semibold text-gray-900 mt-4 mb-3">Message</h4>
                      <div className="flex items-start text-sm text-gray-600">
                        <MessageSquare className="w-4 h-4 mr-2 mt-0.5" />
                        <p>{lead.message}</p>
                      </div>

                      <div className="mt-4">
                        <span className="text-sm text-gray-500">Quantity: </span>
                        <span className="font-semibold">{lead.quantity} units</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Update Status</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {statusOptions.map((status) => (
                          <button
                            key={status.value}
                            onClick={() => handleStatusChange(lead.id, status.value)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                              lead.status === status.value
                                ? `${status.color} border-transparent`
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {status.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No leads found</h3>
          <p className="text-gray-500">
            {assignedLeads.length === 0
              ? 'No leads have been assigned to you yet'
              : 'Try adjusting your filters'}
          </p>
        </div>
      )}
    </div>
  );
}
