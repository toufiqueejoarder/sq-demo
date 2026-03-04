import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, Mail, Building2, Package, Filter, List, Map as MapIcon } from 'lucide-react';
import { useDistributors, useProducts } from '../contexts/DemoStateContext';
import { divisionList } from '../lib/mock-data';
import type { BangladeshDivision, Distributor } from '../types';

const bangladeshCenter: [number, number] = [23.8103, 90.4125];
const defaultZoom = 7;

function createCustomIcon(isActive: boolean) {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: ${isActive ? '#3b82f6' : '#9ca3af'};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useMemo(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

interface DistributorPopupProps {
  distributor: Distributor;
  availableCount: number;
  totalProducts: number;
}

function DistributorPopup({ distributor, availableCount, totalProducts }: DistributorPopupProps) {
  return (
    <div className="min-w-[250px]">
      <h3 className="font-bold text-gray-900 text-lg mb-1">{distributor.name}</h3>
      <p className="text-blue-600 text-sm font-medium mb-3">{distributor.division} Division</p>
      
      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center text-gray-600">
          <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{distributor.contactPerson}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{distributor.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{distributor.email}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Inventory Status</span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            availableCount > totalProducts / 2 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {availableCount}/{totalProducts} Products
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(availableCount / totalProducts) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Coverage Area:</p>
        <div className="flex flex-wrap gap-1">
          {distributor.coverageArea.slice(0, 4).map((area) => (
            <span key={area} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DistributorsPage() {
  const { distributors, getDistributorsByDivision } = useDistributors();
  const { products } = useProducts();
  const [selectedDivision, setSelectedDivision] = useState<BangladeshDivision | 'all'>('all');
  const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const filteredDistributors =
    selectedDivision === 'all'
      ? distributors
      : getDistributorsByDivision(selectedDivision);

  const mapCenter: [number, number] = selectedDistributor
    ? [selectedDistributor.location.lat, selectedDistributor.location.lng]
    : selectedDivision !== 'all'
    ? [filteredDistributors[0]?.location.lat || bangladeshCenter[0], filteredDistributors[0]?.location.lng || bangladeshCenter[1]]
    : bangladeshCenter;

  const mapZoom = selectedDistributor ? 12 : selectedDivision !== 'all' ? 10 : defaultZoom;

  const getAvailableCount = (distributor: Distributor) => {
    return distributor.inventory.filter((i) => i.available).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Distributor</h1>
          <p className="text-gray-600">
            Locate authorized distributors across all 8 divisions of Bangladesh
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedDivision}
                  onChange={(e) => {
                    setSelectedDivision(e.target.value as BangladeshDivision | 'all');
                    setSelectedDistributor(null);
                  }}
                  className="pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="all">All Divisions</option>
                  {divisionList.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>
              <span className="flex items-center text-sm text-gray-500 px-4 py-3 bg-gray-50 rounded-xl">
                <Package className="w-4 h-4 mr-2" />
                {filteredDistributors.length} Distributor{filteredDistributors.length !== 1 ? 's' : ''} Found
              </span>
            </div>
            <div className="flex border border-gray-300 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-3 flex items-center ${viewMode === 'map' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <MapIcon className="w-5 h-5 mr-2" />
                Map
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 flex items-center ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5 mr-2" />
                List
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  className="h-[500px] w-full"
                  scrollWheelZoom={true}
                >
                  <MapController center={mapCenter} zoom={mapZoom} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredDistributors.map((distributor) => (
                    <Marker
                      key={distributor.id}
                      position={[distributor.location.lat, distributor.location.lng]}
                      icon={createCustomIcon(distributor.isActive)}
                      eventHandlers={{
                        click: () => setSelectedDistributor(distributor),
                      }}
                    >
                      <Popup>
                        <DistributorPopup
                          distributor={distributor}
                          availableCount={getAvailableCount(distributor)}
                          totalProducts={products.length}
                        />
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Sidebar List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {filteredDistributors.map((distributor) => (
                <button
                  key={distributor.id}
                  onClick={() => setSelectedDistributor(distributor)}
                  className={`w-full text-left bg-white rounded-xl border p-4 transition-all hover:shadow-md ${
                    selectedDistributor?.id === distributor.id
                      ? 'border-blue-500 ring-2 ring-blue-100'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{distributor.name}</h3>
                      <span className="text-sm text-blue-600">{distributor.division}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      distributor.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {distributor.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Package className="w-4 h-4 mr-1" />
                    {getAvailableCount(distributor)}/{products.length} products available
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDistributors.map((distributor) => (
              <div
                key={distributor.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{distributor.name}</h3>
                    <span className="inline-flex items-center text-sm text-blue-600 font-medium">
                      <MapPin className="w-3 h-3 mr-1" />
                      {distributor.division}
                    </span>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    distributor.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {distributor.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="space-y-3 text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{distributor.contactPerson}</span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 mt-0.5 text-gray-400" />
                    <span>{distributor.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{distributor.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="truncate">{distributor.email}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Inventory</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getAvailableCount(distributor)}/{products.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(getAvailableCount(distributor) / products.length) * 100}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {distributor.coverageArea.map((area) => (
                      <span key={area} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
