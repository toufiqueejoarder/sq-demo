import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Zap,
  Check,
  X,
  Download,
  Send,
  MapPin,
  Phone,
  Mail,
  Building2,
  CheckCircle,
  Share2,
  Heart,
} from 'lucide-react';
import { useProducts, useLeads, useDistributors } from '../contexts/DemoStateContext';
import { divisionList } from '../lib/mock-data';
import { Modal } from '../components/ui/Modal';
import type { BangladeshDivision } from '../types';

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { getProductById } = useProducts();
  const { createLead } = useLeads();
  const { distributors } = useDistributors();
  const product = productId ? getProductById(productId) : undefined;

  const [isRFQModalOpen, setIsRFQModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    companyName: '',
    email: '',
    phone: '',
    division: '' as BangladeshDivision | '',
    quantity: 1,
    message: '',
  });

  const handleSubmitRFQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !formData.division) return;

    createLead({
      productId: product.id,
      customerName: formData.customerName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      division: formData.division as BangladeshDivision,
      district: formData.division,
      quantity: formData.quantity,
      message: formData.message || `Inquiry for ${product.name}`,
      status: 'new',
      assignedDistributorId: null,
      priority: 'medium',
    });

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      companyName: '',
      email: '',
      phone: '',
      division: '',
      quantity: 1,
      message: '',
    });
    setIsSubmitted(false);
    setIsRFQModalOpen(false);
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-500 mb-8">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedDistributors = distributors.filter((d) =>
    d.inventory.some((i) => i.productId === product.id && i.available)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/products"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center relative overflow-hidden">
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <Zap className={`w-40 h-40 text-slate-300 ${product.images && product.images[0] ? 'hidden' : ''}`} />
              {product.featured && (
                <span className="absolute top-6 left-6 px-4 py-2 bg-yellow-500 text-yellow-900 text-sm font-bold rounded-xl shadow-lg">
                  FEATURED
                </span>
              )}
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                <button className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <Heart className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-lg uppercase tracking-wider mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-400 mb-6">SKU: {product.sku}</p>

            <div className="flex items-center gap-3 mb-6">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${
                  product.inStock
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {product.inStock ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    In Stock
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Out of Stock
                  </>
                )}
              </span>
              <span className="text-sm text-gray-500">
                Available at {relatedDistributors.length} distributor(s)
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">{product.description}</p>

            {/* Price Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 mb-8 text-white">
              <p className="text-slate-400 text-sm mb-2">Price Range</p>
              <p className="text-3xl font-bold mb-2">
                ৳{product.priceRange.min.toLocaleString()} - ৳{product.priceRange.max.toLocaleString()}
              </p>
              <p className="text-slate-400 text-sm">
                Final price depends on specifications, quantity, and delivery location
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setIsRFQModalOpen(true)}
                className="flex-1 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Request Quote
              </button>
              <button className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </button>
            </div>

            <Link
              to="/distributors"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Find Distributor Near You
            </Link>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Technical Specifications</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div
                  key={key}
                  className={`flex items-center justify-between p-5 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } ${index < Object.entries(product.specifications).length - 2 ? 'border-b border-gray-100' : ''}`}
                >
                  <span className="text-gray-600 font-medium">{key}</span>
                  <span className="text-gray-900 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Available Distributors */}
        {relatedDistributors.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Available at These Distributors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDistributors.slice(0, 3).map((distributor) => (
                <div
                  key={distributor.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{distributor.name}</h3>
                      <span className="text-sm text-blue-600">{distributor.division}</span>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      In Stock
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      {distributor.contactPerson}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {distributor.phone}
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {distributor.email}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RFQ Modal */}
      <Modal
        isOpen={isRFQModalOpen}
        onClose={resetForm}
        title={isSubmitted ? 'Quote Request Submitted' : `Request Quote: ${product.name}`}
        size="lg"
      >
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your quote request has been submitted. Our team will review it and 
              a distributor will contact you within 24 hours.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitRFQ} className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600">Requesting quote for:</p>
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category} • SKU: {product.sku}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="+880-1X-XXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Division *
                </label>
                <select
                  required
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value as BangladeshDivision })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select division</option>
                  {divisionList.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Requirements
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                placeholder="Any specific requirements, delivery timeline, etc."
              />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Request
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
