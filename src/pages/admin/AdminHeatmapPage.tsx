import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import { ArrowLeft, Thermometer, TrendingUp, MapPin } from 'lucide-react';
import { useDemoControls } from '../../contexts/DemoStateContext';
import { demandHeatmapData, getDemandHeatmapByLevel, divisionList } from '../../lib/mock-data';
import type { DemandLevel } from '../../types';

declare module 'leaflet' {
  function heatLayer(
    latlngs: Array<[number, number, number]>,
    options?: {
      radius?: number;
      blur?: number;
      maxZoom?: number;
      max?: number;
      minOpacity?: number;
      gradient?: Record<number, string>;
    }
  ): L.Layer;
}

const bangladeshCenter: [number, number] = [23.8103, 90.4125];

interface HeatmapLayerProps {
  points: Array<{ lat: number; lng: number; intensity: number }>;
}

function HeatmapLayer({ points }: HeatmapLayerProps) {
  const map = useMap();
  const heatLayerRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
    }

    const heatData: Array<[number, number, number]> = points.map((p) => [
      p.lat,
      p.lng,
      p.intensity,
    ]);

    heatLayerRef.current = L.heatLayer(heatData, {
      radius: 35,
      blur: 25,
      maxZoom: 10,
      max: 1,
      minOpacity: 0.4,
      gradient: {
        0.0: '#3b82f6',
        0.25: '#06b6d4',
        0.5: '#10b981',
        0.75: '#f59e0b',
        1.0: '#ef4444',
      },
    });

    heatLayerRef.current.addTo(map);

    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, points]);

  return null;
}

const divisionCoords: Record<string, { lat: number; lng: number }> = {
  Dhaka: { lat: 23.8103, lng: 90.4125 },
  Chittagong: { lat: 22.3569, lng: 91.7832 },
  Khulna: { lat: 22.8456, lng: 89.5403 },
  Sylhet: { lat: 24.8949, lng: 91.8687 },
  Rajshahi: { lat: 24.3745, lng: 88.6042 },
  Barisal: { lat: 22.7010, lng: 90.3535 },
  Rangpur: { lat: 25.7439, lng: 89.2752 },
  Mymensingh: { lat: 24.7471, lng: 90.4203 },
};

export function AdminHeatmapPage() {
  const { demandLevel, setDemandLevel } = useDemoControls();
  const [selectedDemandLevel, setSelectedDemandLevel] = useState<DemandLevel>(demandLevel);

  const heatmapPoints = getDemandHeatmapByLevel(selectedDemandLevel);

  const handleDemandChange = (level: DemandLevel) => {
    setSelectedDemandLevel(level);
    setDemandLevel(level);
  };

  const getDivisionIntensity = (division: string) => {
    const coords = divisionCoords[division];
    if (!coords) return 0;

    const nearbyPoints = heatmapPoints.filter((p) => {
      const distance = Math.sqrt(
        Math.pow(p.lat - coords.lat, 2) + Math.pow(p.lng - coords.lng, 2)
      );
      return distance < 1;
    });

    if (nearbyPoints.length === 0) return 0;
    return nearbyPoints.reduce((sum, p) => sum + p.intensity, 0) / nearbyPoints.length;
  };

  const sortedDivisions = divisionList
    .map((d) => ({ name: d, intensity: getDivisionIntensity(d) }))
    .sort((a, b) => b.intensity - a.intensity);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Demand Heatmap</h1>
        <p className="text-gray-600">Visualize product demand intensity across Bangladesh</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Demand Level Simulation</h3>
            <p className="text-sm text-gray-500">Adjust to see how demand changes across regions</p>
          </div>
          <div className="flex gap-2">
            {(['low', 'medium', 'high'] as DemandLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => handleDemandChange(level)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedDemandLevel === level
                    ? level === 'high'
                      ? 'bg-red-500 text-white'
                      : level === 'medium'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <MapContainer
              center={bangladeshCenter}
              zoom={7}
              className="h-[600px] w-full"
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <HeatmapLayer points={heatmapPoints} />
            </MapContainer>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Intensity Legend</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Low</span>
              <div className="flex-1 h-4 rounded-full" style={{
                background: 'linear-gradient(to right, #3b82f6, #06b6d4, #10b981, #f59e0b, #ef4444)'
              }} />
              <span className="text-sm text-gray-500">High</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Thermometer className="w-5 h-5 mr-2 text-red-500" />
              Demand Overview
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Data Points</span>
                <span className="font-semibold">{demandHeatmapData.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Demand Level</span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  selectedDemandLevel === 'high' ? 'bg-red-100 text-red-700' :
                  selectedDemandLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {selectedDemandLevel.charAt(0).toUpperCase() + selectedDemandLevel.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Coverage</span>
                <span className="font-semibold">8 Divisions</span>
              </div>
            </div>
          </div>

          {/* Division Rankings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Division Rankings
            </h3>
            <div className="space-y-3">
              {sortedDivisions.map((division, index) => (
                <div key={division.name} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-200 text-gray-600' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{division.name}</span>
                      <span className="text-xs text-gray-500">
                        {Math.round(division.intensity * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: `${division.intensity * 100}%`,
                          backgroundColor: division.intensity > 0.7 ? '#ef4444' :
                            division.intensity > 0.5 ? '#f59e0b' :
                            division.intensity > 0.3 ? '#10b981' : '#3b82f6'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Zones */}
          <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Top Hot Zones
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Dhaka Metro Area</span>
                <span className="font-semibold">95%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Narayanganj Industrial</span>
                <span className="font-semibold">92%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Chittagong Port</span>
                <span className="font-semibold">90%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Gazipur Zone</span>
                <span className="font-semibold">89%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
