import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SQ Industrial</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Leading provider of industrial electrical equipment in Bangladesh. 
              Power transformers, distribution systems, cables, and protection solutions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=power-transformers" className="text-sm hover:text-white transition-colors">
                  Power Transformers
                </Link>
              </li>
              <li>
                <Link to="/products?category=distribution-transformers" className="text-sm hover:text-white transition-colors">
                  Distribution Transformers
                </Link>
              </li>
              <li>
                <Link to="/products?category=industrial-cables" className="text-sm hover:text-white transition-colors">
                  Industrial Cables
                </Link>
              </li>
              <li>
                <Link to="/products?category=switchgear" className="text-sm hover:text-white transition-colors">
                  Switchgear
                </Link>
              </li>
              <li>
                <Link to="/products?category=protection-systems" className="text-sm hover:text-white transition-colors">
                  Protection Systems
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/distributors" className="text-sm hover:text-white transition-colors">
                  Find a Distributor
                </Link>
              </li>
              <li>
                <Link to="/rfq" className="text-sm hover:text-white transition-colors">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link to="/distributor" className="text-sm hover:text-white transition-colors">
                  Distributor Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  45 Motijheel Commercial Area<br />
                  Dhaka 1000, Bangladesh
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+880-2-8123456</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">info@sq-industrial.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} SQ Industrial. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Demo Platform &mdash; For demonstration purposes only
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
