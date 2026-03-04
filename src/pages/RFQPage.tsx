import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Send, CheckCircle } from 'lucide-react';
import { useProducts, useLeads } from '../contexts/DemoStateContext';
import { divisionList } from '../lib/mock-data';
import type { BangladeshDivision } from '../types';

export function RFQPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products, getProductById } = useProducts();
  const { createLead } = useLeads();

  const preselectedProductId = searchParams.get('product') || '';
  const preselectedProduct = preselectedProductId ? getProductById(preselectedProductId) : undefined;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    productId: preselectedProductId,
    customerName: '',
    companyName: '',
    email: '',
    phone: '',
    division: '' as BangladeshDivision | '',
    quantity: 1,
    message: preselectedProduct
      ? `I am interested in ${preselectedProduct.name}. Please provide a quotation.`
      : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productId || !formData.division) return;

    createLead({
      productId: formData.productId,
      customerName: formData.customerName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      division: formData.division as BangladeshDivision,
      district: formData.division as string,
      quantity: formData.quantity,
      message: formData.message,
      status: 'new',
      assignedDistributorId: null,
      priority: 'medium',
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Submitted</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your inquiry. Our team will review your request and 
          a distributor will contact you shortly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                productId: '',
                customerName: '',
                companyName: '',
                email: '',
                phone: '',
                division: '',
                quantity: 1,
                message: '',
              });
            }}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Another Request
          </button>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Request a Quote</h1>
        <p className="text-gray-600">
          Fill out the form below and we'll connect you with an authorized distributor
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product *
            </label>
            <select
              required
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} ({product.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter company name"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Message
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="Any specific requirements or questions..."
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Quote Request
          </button>
        </div>
      </form>
    </div>
  );
}
