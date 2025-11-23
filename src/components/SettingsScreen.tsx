import { useState } from 'react';
import { ArrowLeft, ChevronDown, Moon, Wifi, Map } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [offlineMode, setOfflineMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mapType, setMapType] = useState('satellite');
  const [defaultUnit, setDefaultUnit] = useState('sqft');

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
            <ArrowLeft size={20} />
          </button>
          <span>Settings</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-700">General</h3>
          </div>

          {/* Offline Mode */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Wifi size={20} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Offline Mode</div>
                <div className="text-sm text-gray-500">Save maps for offline use</div>
              </div>
            </div>
            <button
              onClick={() => setOfflineMode(!offlineMode)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                offlineMode ? 'bg-[#2E7D32]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                  offlineMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Dark Mode */}
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Moon size={20} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Dark Mode</div>
                <div className="text-sm text-gray-500">Switch to dark theme</div>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                darkMode ? 'bg-[#2E7D32]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Map Settings */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-700">Map Settings</h3>
          </div>

          {/* Map Type */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Map size={20} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Map Type</div>
                <div className="text-sm text-gray-500">Choose default map view</div>
              </div>
            </div>
            <div className="relative ml-14">
              <select
                value={mapType}
                onChange={(e) => setMapType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none cursor-pointer"
              >
                <option value="normal">Normal</option>
                <option value="satellite">Satellite</option>
                <option value="terrain">Terrain</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Default Unit */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📏</span>
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Default Unit</div>
                <div className="text-sm text-gray-500">Preferred measurement unit</div>
              </div>
            </div>
            <div className="relative ml-14">
              <select
                value={defaultUnit}
                onChange={(e) => setDefaultUnit(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none cursor-pointer"
              >
                <option value="sqft">Square Feet</option>
                <option value="sqm">Square Meters</option>
                <option value="sqyd">Square Yards</option>
                <option value="acre">Acre</option>
                <option value="hectare">Hectare</option>
                <option value="bigha">Bigha</option>
                <option value="guntha">Guntha</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        {/* Measurement Settings */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-700">Measurement</h3>
          </div>

          {/* Precision */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🎯</span>
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Precision Level</div>
                <div className="text-sm text-gray-500">Decimal places in results</div>
              </div>
            </div>
            <div className="relative ml-14">
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none cursor-pointer">
                <option value="2">2 decimal places</option>
                <option value="4">4 decimal places</option>
                <option value="6">6 decimal places</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Auto-save */}
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg">💾</span>
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Auto-save Plots</div>
                <div className="text-sm text-gray-500">Automatically save measurements</div>
              </div>
            </div>
            <button
              className="w-12 h-7 rounded-full transition-colors relative bg-[#2E7D32]"
            >
              <div className="w-5 h-5 bg-white rounded-full absolute top-1 translate-x-6" />
            </button>
          </div>
        </div>

        {/* Region Settings */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-700">Region</h3>
          </div>

          <div className="px-6 py-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📍</span>
              </div>
              <div className="flex-1">
                <div className="text-gray-900">State/Region</div>
                <div className="text-sm text-gray-500">For accurate local units</div>
              </div>
            </div>
            <div className="relative ml-14">
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none cursor-pointer">
                <option value="up">Uttar Pradesh</option>
                <option value="wb">West Bengal</option>
                <option value="bihar">Bihar</option>
                <option value="mh">Maharashtra</option>
                <option value="ka">Karnataka</option>
                <option value="tn">Tamil Nadu</option>
                <option value="gj">Gujarat</option>
                <option value="rj">Rajasthan</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        {/* Reset Settings */}
        <button className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl hover:bg-gray-200 transition-colors">
          Reset to Defaults
        </button>

        <div className="pb-6" />
      </div>
    </div>
  );
}
