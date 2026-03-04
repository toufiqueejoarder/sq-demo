import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Package,
  Check,
  X,
  Filter,
  Zap,
} from 'lucide-react';
import { useDistributors, useProducts } from '../../contexts/DemoStateContext';
import { categoryList } from '../../lib/mock-data';
import type { Category } from '../../types';

export function DistributorInventoryPage() {
  const { getCurrentDistributor, currentDistributorId, toggleInventory } = useDistributors();
  const { products } = useProducts();

  const distributorId = currentDistributorId || '';
  const distributor = getCurrentDistributor();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'available' | 'unavailable'>('all');

  if (!distributor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Distributor Not Found</h1>
        <p className="text-gray-500">Unable to load inventory information.</p>
      </div>
    );
  }

  const inventoryMap = new Map(distributor.inventory.map((i) => [i.productId, i.available]));

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const isAvailable = inventoryMap.get(product.id) ?? false;
    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'available' && isAvailable) ||
      (stockFilter === 'unavailable' && !isAvailable);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const availableCount = distributor.inventory.filter((i) => i.available).length;
  const unavailableCount = products.length - availableCount;

  const handleToggle = (productId: string) => {
    toggleInventory(distributorId, productId);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
        <p className="text-gray-600">
          Toggle product availability for {distributor.name}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setStockFilter('all')}
          className={`p-4 rounded-xl border transition-all ${
            stockFilter === 'all' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
          <p className="text-sm text-gray-500">Total Products</p>
        </button>
        <button
          onClick={() => setStockFilter('available')}
          className={`p-4 rounded-xl border transition-all ${
            stockFilter === 'available' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className="text-3xl font-bold text-green-600">{availableCount}</p>
          <p className="text-sm text-gray-500">Available</p>
        </button>
        <button
          onClick={() => setStockFilter('unavailable')}
          className={`p-4 rounded-xl border transition-all ${
            stockFilter === 'unavailable' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className="text-3xl font-bold text-red-600">{unavailableCount}</p>
          <p className="text-sm text-gray-500">Unavailable</p>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as Category | 'all')}
              className="pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categoryList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => {
          const isAvailable = inventoryMap.get(product.id) ?? false;

          return (
            <div
              key={product.id}
              className={`bg-white rounded-xl border p-4 transition-all ${
                isAvailable ? 'border-green-200' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-8 h-8 text-slate-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-blue-600">{product.category}</p>
                  <p className="text-xs text-gray-400">SKU: {product.sku}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isAvailable ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Available
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 mr-1" />
                      Unavailable
                    </>
                  )}
                </span>

                <button
                  onClick={() => handleToggle(product.id)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isAvailable ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isAvailable ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
