import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Filter,
  Users,
  Calendar,
  Package,
  MapPin,
} from 'lucide-react';
import { useLeads, useProducts, useDistributors } from '../../contexts/DemoStateContext';
import { divisionList } from '../../lib/mock-data';
import { Modal } from '../../components/ui/Modal';
import type { LeadStatus, BangladeshDivision } from '../../types';

const statusOptions: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { value: 'assigned', label: 'Assigned', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'contacted', label: 'Contacted', color: 'bg-purple-100 text-purple-700' },
  { value: 'qualified', label: 'Qualified', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'converted', label: 'Converted', color: 'bg-green-100 text-green-700' },
  { value: 'lost', label: 'Lost', color: 'bg-red-100 text-red-700' },
];

export function AdminLeadsPage() {
  const { leads, updateLeadStatus, getLeadStats } = useLeads();
  const { getProductById } = useProducts();
  const { distributors, getDistributorsByDivision } = useDistributors();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [divisionFilter, setDivisionFilter] = useState<BangladeshDivision | 'all'>('all');
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const stats = getLeadStats();

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesDivision = divisionFilter === 'all' || lead.division === divisionFilter;
    return matchesSearch && matchesStatus && matchesDivision;
  });

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
  };

  const handleAssign = (leadId: string, distributorId: string) => {
    updateLeadStatus(leadId, 'assigned', distributorId);
    setAssignModalOpen(false);
    setSelectedLead(null);
  };

  const openAssignModal = (leadId: string) => {
    setSelectedLead(leadId);
    setAssignModalOpen(true);
  };

  const selectedLeadData = selectedLead ? leads.find((l) => l.id === selectedLead) : null;
  const availableDistributors = selectedLeadData
    ? getDistributorsByDivision(selectedLeadData.division)
    : [];

  const getStatusStyle = (status: LeadStatus) => {
    return statusOptions.find((s) => s.value === status)?.color || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/admin"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lead Management</h1>
        <p className="text-gray-600">View and manage all RFQ leads</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
        {statusOptions.map((status) => (
          <button
            key={status.value}
            onClick={() => setStatusFilter(status.value)}
            className={`p-3 rounded-xl border transition-all ${
              statusFilter === status.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <p className="text-2xl font-bold text-gray-900">{stats.byStatus[status.value]}</p>
            <p className="text-xs text-gray-500">{status.label}</p>
          </button>
        ))}
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
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'all')}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl outline-none appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Status</option>
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value as BangladeshDivision | 'all')}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl outline-none appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Divisions</option>
              {divisionList.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredLeads.length} of {leads.length} leads
      </p>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Lead</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Product</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Division</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Assigned To</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => {
                const product = getProductById(lead.productId);
                const assignedDistributor = lead.assignedDistributorId
                  ? distributors.find((d) => d.id === lead.assignedDistributorId)
                  : null;

                return (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{lead.companyName}</p>
                        <p className="text-sm text-gray-500">{lead.customerName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Package className="w-4 h-4 mr-2" />
                        {product?.name || 'Unknown'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {lead.division}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full border-0 cursor-pointer ${getStatusStyle(lead.status)}`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      {assignedDistributor ? (
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {assignedDistributor.name}
                        </div>
                      ) : (
                        <button
                          onClick={() => openAssignModal(lead.id)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Assign
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        lead.priority === 'high' ? 'bg-red-100 text-red-700' :
                        lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {lead.priority}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Modal */}
      <Modal
        isOpen={assignModalOpen}
        onClose={() => {
          setAssignModalOpen(false);
          setSelectedLead(null);
        }}
        title="Assign Lead to Distributor"
        size="md"
      >
        {selectedLeadData && (
          <div>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500">Assigning lead from:</p>
              <p className="font-semibold text-gray-900">{selectedLeadData.companyName}</p>
              <p className="text-sm text-gray-600">{selectedLeadData.division} Division</p>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Select a distributor in {selectedLeadData.division}:
            </p>

            <div className="space-y-2">
              {availableDistributors.length > 0 ? (
                availableDistributors.map((distributor) => (
                  <button
                    key={distributor.id}
                    onClick={() => handleAssign(selectedLeadData.id, distributor.id)}
                    className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <p className="font-semibold text-gray-900">{distributor.name}</p>
                    <p className="text-sm text-gray-500">{distributor.contactPerson}</p>
                  </button>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No distributors found in {selectedLeadData.division}
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
