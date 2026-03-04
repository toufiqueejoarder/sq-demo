import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  MapPin,
  Phone,
  Mail,
  Building2,
  Package,
  Edit2,
  Filter,
} from 'lucide-react';
import { useDistributors, useProducts } from '../../contexts/DemoStateContext';
import { divisionList } from '../../lib/mock-data';
import { Modal } from '../../components/ui/Modal';
import type { BangladeshDivision, Distributor } from '../../types';

export function AdminDistributorsPage() {
  const { distributors, updateDistributor, getDistributorsByDivision } = useDistributors();
  const { products } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [divisionFilter, setDivisionFilter] = useState<BangladeshDivision | 'all'>('all');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingDistributor, setEditingDistributor] = useState<Distributor | null>(null);

  const filteredDistributors =
    divisionFilter === 'all'
      ? distributors.filter(
          (d) =>
            d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : getDistributorsByDivision(divisionFilter).filter(
          (d) =>
            d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const openEditModal = (distributor: Distributor) => {
    setEditingDistributor({ ...distributor });
    setEditModalOpen(true);
  };

  const handleSave = () => {
    if (editingDistributor) {
      updateDistributor(editingDistributor);
      setEditModalOpen(false);
      setEditingDistributor(null);
    }
  };

  const getInventoryStats = (distributor: Distributor) => {
    const available = distributor.inventory.filter((i) => i.available).length;
    return { available, total: products.length };
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Distributor Management</h1>
        <p className="text-gray-600">View and manage distributors across Bangladesh</p>
      </div>

      {/* Division Stats */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
        {divisionList.map((division) => {
          const count = distributors.filter((d) => d.division === division).length;
          return (
            <button
              key={division}
              onClick={() => setDivisionFilter(division)}
              className={`p-3 rounded-xl border text-center transition-all ${
                divisionFilter === division
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <p className="text-lg font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-500 truncate">{division}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search distributors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value as BangladeshDivision | 'all')}
              className="pl-10 pr-10 py-3 border border-gray-300 rounded-xl outline-none appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Divisions</option>
              {divisionList.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          {divisionFilter !== 'all' && (
            <button
              onClick={() => setDivisionFilter('all')}
              className="px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-xl"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredDistributors.length} of {distributors.length} distributors
      </p>

      {/* Distributors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDistributors.map((distributor) => {
          const { available, total } = getInventoryStats(distributor);

          return (
            <div
              key={distributor.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{distributor.name}</h3>
                    <span className="inline-flex items-center text-sm text-blue-600 font-medium">
                      <MapPin className="w-3 h-3 mr-1" />
                      {distributor.division}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      distributor.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {distributor.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => openEditModal(distributor)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-4 h-4 mr-3 text-gray-400" />
                    {distributor.contactPerson}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    {distributor.phone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="truncate">{distributor.email}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center text-sm text-gray-500">
                      <Package className="w-4 h-4 mr-1" />
                      Inventory
                    </span>
                    <span className="text-sm font-semibold">{available}/{total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(available / total) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {distributor.coverageArea.map((area) => (
                    <span key={area} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingDistributor(null);
        }}
        title="Edit Distributor"
        size="lg"
      >
        {editingDistributor && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={editingDistributor.name}
                  onChange={(e) => setEditingDistributor({ ...editingDistributor, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                <input
                  type="text"
                  value={editingDistributor.contactPerson}
                  onChange={(e) => setEditingDistributor({ ...editingDistributor, contactPerson: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingDistributor.email}
                  onChange={(e) => setEditingDistributor({ ...editingDistributor, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editingDistributor.phone}
                  onChange={(e) => setEditingDistributor({ ...editingDistributor, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={editingDistributor.address}
                onChange={(e) => setEditingDistributor({ ...editingDistributor, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingDistributor.isActive}
                  onChange={(e) => setEditingDistributor({ ...editingDistributor, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded mr-2"
                />
                <span className="text-sm text-gray-700">Active Distributor</span>
              </label>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                onClick={() => {
                  setEditModalOpen(false);
                  setEditingDistributor(null);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
