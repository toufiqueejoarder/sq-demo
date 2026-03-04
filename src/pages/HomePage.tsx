import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Shield,
  Truck,
  Award,
  Factory,
  Building2,
  Lightbulb,
  Cable,
  CircuitBoard,
  ShieldCheck,
  MapPin,
  Users,
  Package,
  TrendingUp,
  CheckCircle,
  User,
  LayoutDashboard,
} from 'lucide-react';
import { useProducts, useDistributors, useLeads, useDemoControls } from '../contexts/DemoStateContext';
import { categoryList } from '../lib/mock-data';

const categoryIcons: Record<string, React.ReactNode> = {
  'Power Transformers': <Zap className="w-8 h-8" />,
  'Distribution Transformers': <CircuitBoard className="w-8 h-8" />,
  'Industrial Cables': <Cable className="w-8 h-8" />,
  'Control Cables': <Cable className="w-8 h-8" />,
  'Switchgear': <Lightbulb className="w-8 h-8" />,
  'Protection Systems': <ShieldCheck className="w-8 h-8" />,
};

const industries = [
  { name: 'Power Generation', icon: <Zap className="w-6 h-6" />, desc: 'Grid-scale transformers & protection' },
  { name: 'Manufacturing', icon: <Factory className="w-6 h-6" />, desc: 'Industrial automation & control' },
  { name: 'Commercial', icon: <Building2 className="w-6 h-6" />, desc: 'Building electrical systems' },
  { name: 'Infrastructure', icon: <Lightbulb className="w-6 h-6" />, desc: 'Public utilities & services' },
];

export function HomePage() {
  const navigate = useNavigate();
  const { products, getFeaturedProducts, getProductsByCategory } = useProducts();
  const { distributors } = useDistributors();
  const { leads } = useLeads();
  const { setRole } = useDemoControls();
  const featuredProducts = getFeaturedProducts();

  const handlePortalClick = (role: 'distributor' | 'admin', path: string) => {
    setRole(role);
    navigate(path);
  };

  const stats = [
    { value: products.length + '+', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { value: distributors.length, label: 'Distributors', icon: <Users className="w-5 h-5" /> },
    { value: leads.length + '+', label: 'Leads Generated', icon: <TrendingUp className="w-5 h-5" /> },
    { value: '8', label: 'Divisions Covered', icon: <MapPin className="w-5 h-5" /> },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Trusted Industrial Partner
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Powering Bangladesh's
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Industrial Future</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                Premium power transformers, distribution systems, industrial cables, 
                and protection equipment. Serving industries across all 8 divisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30"
                >
                  Browse Catalog
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/rfq"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-500 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl border border-white/10 flex items-center justify-center backdrop-blur">
                  <div className="text-center">
                    <Zap className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                    <p className="text-slate-400">Industrial Equipment</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <div className="text-center text-white">
                    <span className="text-2xl font-bold">25+</span>
                    <p className="text-xs">Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">IEC Certified</h3>
              <p className="text-sm text-gray-500">International standards</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">5-Year Warranty</h3>
              <p className="text-sm text-gray-500">Comprehensive coverage</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-500">Nationwide logistics</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Expert Support</h3>
              <p className="text-sm text-gray-500">24/7 technical help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored electrical solutions for every sector of Bangladesh's growing economy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
                  {industry.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-sm text-gray-500">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Product Categories
              </h2>
              <p className="text-lg text-gray-600">
                Complete range of industrial electrical equipment
              </p>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryList.map((category) => {
              const categoryProducts = getProductsByCategory(category);
              return (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {categoryIcons[category]}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{category}</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {categoryProducts.length} products available
                    </p>
                    <span className="inline-flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">Top picks from our catalog</p>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              View Catalog
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 6).map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <Zap className={`w-16 h-16 text-slate-300 group-hover:text-blue-500 transition-colors ${product.images && product.images[0] ? 'hidden' : ''}`} />
                  {product.featured && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span>{product.specifications['Capacity'] || product.specifications['Voltage Rating']}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      product.inStock 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ৳{(product.priceRange.min / 1000).toFixed(0)}K+
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted Across Bangladesh
            </h2>
            <p className="text-blue-200 text-lg">
              Delivering excellence in industrial electrical solutions
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distributor Locator Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Find a Distributor Near You
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We have authorized distributors across all 8 divisions of Bangladesh, 
                ensuring quick access to products and expert local support.
              </p>
              <ul className="space-y-4 mb-8">
                {['Dhaka', 'Chittagong', 'Khulna', 'Sylhet'].map((division) => (
                  <li key={division} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    {division} Division Coverage
                  </li>
                ))}
              </ul>
              <Link
                to="/distributors"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                View Distributor Map
                <MapPin className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl h-80 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <p className="text-slate-600 font-medium">Interactive Map</p>
                <p className="text-sm text-slate-500">8 Divisions • {distributors.length} Distributors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Access Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Access Your Portal
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Distributors and administrators can access their dedicated dashboards to manage leads, inventory, and analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Distributor Portal Card */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-colors group">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Distributor Portal</h3>
              <p className="text-slate-400 mb-6">
                Access your assigned leads, manage inventory availability, and track your performance metrics.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  View and manage assigned leads
                </li>
                <li className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Toggle product availability
                </li>
                <li className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Track conversion rates
                </li>
              </ul>
              <button
                onClick={() => handlePortalClick('distributor', '/distributor')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-colors"
              >
                <User className="w-5 h-5" />
                Access Distributor Portal
              </button>
            </div>

            {/* Admin Panel Card */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-emerald-500 transition-colors group">
              <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Admin Panel</h3>
              <p className="text-slate-400 mb-6">
                Full access to product management, distributor oversight, lead tracking, and analytics dashboards.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Manage products and inventory
                </li>
                <li className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  View all leads and analytics
                </li>
                <li className="flex items-center text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Demand heatmap visualization
                </li>
              </ul>
              <button
                onClick={() => handlePortalClick('admin', '/admin')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                Access Admin Panel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Power Your Next Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a custom quote for your industrial electrical needs. 
            Our team responds within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/rfq"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
